/* Lector de la foto de resultados: App.leerResultados(file, onProgreso) -> { titulo, filas: [{ posicion, kart, nombre, puntos }], texto }.
   Usa Tesseract.js (incluido en js/vendor/tesseract, se carga recién la primera vez). La foto se prepara en un canvas:
   se agranda, se pasa a grises y se deja el texto negro sobre blanco (las planillas suelen tener letras claras sobre una foto). */
(function () {
  const BASE = new URL('js/vendor/tesseract/', location.href).href;
  let cargando = null;
  let worker = null;

  function cargarScript() {
    if (window.Tesseract) return Promise.resolve();
    return cargando || (cargando = new Promise((ok, mal) => {
      const s = document.createElement('script');
      s.src = BASE + 'tesseract.min.js';
      s.onload = () => ok();
      s.onerror = () => { cargando = null; mal(new Error('No se pudo cargar el lector de fotos. Revisá la conexión y probá de nuevo.')); };
      document.head.appendChild(s);
    }));
  }

  async function obtenerWorker(onProgreso) {
    await cargarScript();
    if (worker) return worker;
    worker = await window.Tesseract.createWorker('spa', 1, {
      workerPath: BASE + 'worker.min.js',
      corePath: BASE + 'core/',
      langPath: BASE + 'lang/',
      logger: (m) => { if (onProgreso && m && typeof m.progress === 'number') onProgreso(m.status, m.progress); },
    });
    await worker.setParameters({ tessedit_pageseg_mode: '6', preserve_interword_spaces: '1' });
    return worker;
  }

  function imagenDe(file) {
    return new Promise((ok, mal) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); ok(img); };
      img.onerror = () => { URL.revokeObjectURL(url); mal(new Error('No se pudo abrir la foto. Probá con un JPG o PNG.')); };
      img.src = url;
    });
  }

  /* Preparación de la foto. Se prueban varias versiones (la luz de cada foto es distinta) y se usa la que más filas lee:
     - Otsu: un corte de brillo calculado para esa foto.
     - Local: el corte se calcula por zonas (sirve con sombras, reflejos o fotos a una pantalla).
     - Grises: solo se estira el contraste y Tesseract decide.
     En todas el texto queda oscuro sobre fondo claro (si las letras son claras, se invierte). */
  function grises(img) {
    const escala = Math.min(4, Math.max(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight)));
    const w = Math.round(img.naturalWidth * escala), h = Math.round(img.naturalHeight * escala);
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true });
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, 0, 0, w, h);
    const px = g.getImageData(0, 0, w, h).data;
    const l = new Uint8ClampedArray(w * h);
    for (let i = 0, j = 0; j < l.length; i += 4, j++) l[j] = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    return { w, h, l };
  }
  function otsu(l) {
    const hist = new Array(256).fill(0);
    for (let i = 0; i < l.length; i++) hist[l[i]]++;
    let suma = 0; for (let i = 0; i < 256; i++) suma += i * hist[i];
    let sB = 0, wB = 0, max = 0, corte = 128;
    for (let t = 0; t < 256; t++) {
      wB += hist[t]; if (!wB) continue;
      const wF = l.length - wB; if (!wF) break;
      sB += t * hist[t];
      const mB = sB / wB, mF = (suma - sB) / wF, v = wB * wF * (mB - mF) * (mB - mF);
      if (v > max) { max = v; corte = t; }
    }
    return corte;
  }
  function lienzo(w, h, valor) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d');
    const d = g.createImageData(w, h);
    for (let j = 0, i = 0; j < w * h; j++, i += 4) { const v = valor(j); d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    g.putImageData(d, 0, 0);
    return cv;
  }
  /* Enderezar: se prueba girar entre -8° y 8° y se elige el ángulo en que las filas de texto quedan más "parejas"
     (la suma por renglón varía más cuando las líneas están horizontales). */
  function anguloTorcido(img) {
    const lado = 700, k = lado / Math.max(img.naturalWidth, img.naturalHeight);
    const w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true });
    let mejor = 0, maxVar = -1;
    for (let a = -8; a <= 8; a += 1) {
      g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
      g.translate(w / 2, h / 2); g.rotate(a * Math.PI / 180); g.drawImage(img, -w / 2, -h / 2, w, h);
      const px = g.getImageData(0, 0, w, h).data;
      const filas = new Float64Array(h);
      for (let y = 0; y < h; y++) { let sF = 0; for (let x = 0; x < w; x += 2) { const i = (y * w + x) * 4; const v = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]; sF += v; } filas[y] = sF; }
      let dif = 0; for (let y = 1; y < h; y++) dif += (filas[y] - filas[y - 1]) ** 2;
      if (dif > maxVar) { maxVar = dif; mejor = a; }
    }
    return mejor;
  }
  function girar(img, grados) {
    if (!grados) return img;
    const rad = grados * Math.PI / 180, w = img.naturalWidth, h = img.naturalHeight;
    const W = Math.round(Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad))), H = Math.round(Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad)));
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    g.translate(W / 2, H / 2); g.rotate(rad); g.drawImage(img, -w / 2, -h / 2);
    cv.naturalWidth = W; cv.naturalHeight = H;
    return cv;
  }

  function versiones(img) {
    const { w, h, l } = grises(img);
    const corte = otsu(l);
    let claros = 0; for (let i = 0; i < l.length; i++) if (l[i] > corte) claros++;
    const letrasClaras = claros < l.length / 2;   // el texto es lo que menos ocupa
    const esTexto = (v, c) => (letrasClaras ? v > c : v < c);
    // Otsu
    const vOtsu = lienzo(w, h, (j) => (esTexto(l[j], corte) ? 0 : 255));
    // Local (Bradley): compara cada punto con el promedio de su zona
    const integ = new Float64Array((w + 1) * (h + 1));
    for (let y = 0; y < h; y++) { let fila = 0; for (let x = 0; x < w; x++) { fila += l[y * w + x]; integ[(y + 1) * (w + 1) + x + 1] = integ[y * (w + 1) + x + 1] + fila; } }
    const r = Math.max(8, Math.round(Math.max(w, h) / 40)), k = 0.12;
    const vLocal = lienzo(w, h, (j) => {
      const x = j % w, y = (j - x) / w;
      const x0 = Math.max(0, x - r), x1 = Math.min(w - 1, x + r), y0 = Math.max(0, y - r), y1 = Math.min(h - 1, y + r);
      const n = (x1 - x0 + 1) * (y1 - y0 + 1);
      const s = integ[(y1 + 1) * (w + 1) + x1 + 1] - integ[y0 * (w + 1) + x1 + 1] - integ[(y1 + 1) * (w + 1) + x0] + integ[y0 * (w + 1) + x0];
      const m = s / n;
      return (letrasClaras ? l[j] > m * (1 + k) && l[j] > 60 : l[j] < m * (1 - k)) ? 0 : 255;
    });
    // Grises con contraste estirado (percentiles 2 y 98)
    const orden = Array.from(l.filter((_, i) => i % 7 === 0)).sort((a, b) => a - b);
    const lo = orden[Math.floor(orden.length * 0.02)], hi = Math.max(lo + 1, orden[Math.floor(orden.length * 0.98)]);
    const vGris = lienzo(w, h, (j) => { const v = Math.max(0, Math.min(255, (l[j] - lo) * 255 / (hi - lo))); return letrasClaras ? 255 - v : v; });
    return [vOtsu, vLocal, vGris];
  }

  /* Una fila de la planilla: "<puesto> <kart> <apellido y nombre> <puntos>".
     El lector a veces confunde números con letras o les pega signos, así que se lee con tolerancia:
     los puntos son el último número de la fila, el nombre son las palabras antes, y los números de adelante, puesto y kart.
     Como la planilla viene ordenada, el puesto final es el orden de las filas. */
  const DIGITO = { O: '0', o: '0', D: '0', Q: '0', l: '1', I: '1', i: '1', '|': '1', Z: '2', z: '2', A: '4', S: '5', s: '5', G: '6', T: '7', B: '8', g: '9' };
  function aNumero(tok) {
    const t = String(tok).replace(/[^0-9A-Za-z|]/g, '');
    if (!t || t.length > 4) return null;
    const c = t.split('').map(ch => (/\d/.test(ch) ? ch : DIGITO[ch])).join('');
    return /^\d+$/.test(c) && /\d/.test(t) || (/^\d+$/.test(c) && t.length === 1) ? c : null;
  }
  function interpretarLinea(linea, dentroDeTabla) {
    const l = linea.replace(/[|¦!\[\]{}()"'“”‘’]/g, ' ').replace(/[,](?=\d)/g, '.').replace(/\s+/g, ' ').trim();
    const fin = /(\d{1,4}(?:\.\d{1,2})?)[^\dA-Za-zÁÉÍÓÚÑáéíóúñ]*$/.exec(l);
    if (!fin) return null;
    // se descartan los signos sueltos (—, +, :, .) que el lector agrega entre columnas
    const antes = l.slice(0, fin.index).trim().split(' ').filter(t => /[0-9A-Za-zÁÉÍÓÚÑÜáéíóúñü]/.test(t));
    // el nombre: las últimas palabras con letras (al menos una de 3 letras)
    let k = antes.length;
    while (k > 0 && /[A-Za-zÁÉÍÓÚÑÜáéíóúñü]{2,}/.test(antes[k - 1]) && aNumero(antes[k - 1]) == null) k--;
    const palabras = antes.slice(k).map(p => p.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü'.-]/g, '')).filter(p => p.length >= 2);
    if (!palabras.length || !palabras.some(p => p.length >= 3)) return null;
    const nums = antes.slice(0, k).map(aNumero).filter(x => x != null);
    // Una fila arranca con el puesto o el kart; si no se pudieron leer, se acepta igual dentro de la tabla (el puesto sale del orden)
    if (!nums.length && !dentroDeTabla) return null;
    if (!nums.length) return { posicion: null, kart: '', nombre: palabras.join(' '), puntos: +fin[1] };
    return {
      posicion: nums.length > 1 ? +nums[0] : null,
      kart: nums.length > 1 ? nums[nums.length - 1] : nums[0],
      nombre: palabras.join(' '),
      puntos: +fin[1],
    };
  }
  function interpretar(texto) {
    const filas = [];
    let titulo = '';
    String(texto || '').split('\n').forEach((linea) => {
      const f = interpretarLinea(linea, filas.length > 0);
      if (f) { filas.push(f); return; }
      const l = linea.replace(/\s+/g, ' ').trim();
      // Título de la categoría: una línea en mayúsculas antes de las filas (ej. "110CC ESCUELA")
      if (!filas.length && /^[0-9A-ZÁÉÍÓÚÑ .]{6,}$/.test(l) && /[A-Z]{4,}/.test(l) && !/CAMPEONATO/.test(l)) titulo = l;
    });
    // La planilla viene ordenada: un puesto que no se pudo leer (o quedó fuera de orden) es el anterior + 1
    filas.forEach((f, i) => {
      const ant = i ? filas[i - 1].posicion : 0;
      if (f.posicion == null || f.posicion <= ant || f.posicion > ant + 3) {
        // con un solo número adelante, ese número era el puesto y no el kart
        if (f.posicion == null && +f.kart === ant + 1 && filas.length > 3) f.kart = '';
        f.posicion = ant + 1;
      }
    });
    return { titulo, filas };
  }

  App.leerResultados = async function (file, onProgreso) {
    if (!file) throw new Error('No elegiste ninguna foto.');
    const original = await imagenDe(file);
    const w = await obtenerWorker(onProgreso);
    const img = girar(original, anguloTorcido(original));
    const vs = versiones(img);
    let mejor = null;
    for (let i = 0; i < vs.length; i++) {
      if (onProgreso) onProgreso('recognizing text', i / vs.length);
      const { data } = await w.recognize(vs[i]);
      const r = interpretar(data.text);
      r.texto = data.text;
      if (!mejor || r.filas.length > mejor.filas.length) mejor = r;
    }
    return mejor;
  };
  App.interpretarResultados = interpretar;
})();
