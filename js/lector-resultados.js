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

  /* Rayas verticales de la planilla (separan puesto, kart, nombre y puntos): el lector las lee como un 1, una / o un !
     y le suma números al kart ("| 45 |" → "145"). Una raya es una columna finita donde se repite, fila tras fila, un trazo
     vertical de la altura del texto; un 1 de verdad no cae siempre en el mismo lugar. La primera letra de los nombres
     (alineados a la izquierda) también se repite en el mismo lugar, pero está pegada al resto de la letra: solo se borra
     un trazo finito que tiene espacio libre a los dos lados.
     Antes se borran los bordes horizontales de cada fila (líneas largas): así los bordes de los costados quedan sueltos
     y también se borran (si no, el lector les suma un 1 al puesto). */
  function rayas(w, h, esTexto) {
    const L = Math.max(10, Math.round(Math.max(w, h) * 0.015)), Lmax = L * 5;
    const borrar = new Uint8Array(w * h);
    const m = new Uint8Array(w * h);
    for (let j = 0; j < m.length; j++) m[j] = esTexto(j) ? 1 : 0;
    const largo = Math.round(w * 0.2);
    for (let y = 0; y < h; y++) {
      let run = 0;
      for (let x = 0; x <= w; x++) {
        if (x < w && m[y * w + x]) run++;
        else {
          if (run >= largo) for (let xx = x - run; xx < x; xx++) { m[y * w + xx] = 0; borrar[y * w + xx] = 1; }
          run = 0;
        }
      }
    }
    const esT = (j) => m[j] === 1;
    const P = new Float64Array(w);
    for (let x = 0; x < w; x++) {
      let run = 0;
      for (let y = 0; y <= h; y++) {
        if (y < h && esT(y * w + x)) run++;
        else { if (run >= L && run <= Lmax) P[x] += run; run = 0; }
      }
    }
    let max = 0; for (let x = 0; x < w; x++) if (P[x] > max) max = P[x];
    if (!max) return borrar;
    const grosorMax = Math.max(3, Math.round(w * 0.006)), libre = Math.max(4, Math.round(L * 0.35));
    const t = (x, y) => x >= 0 && x < w && esT(y * w + x);
    // un trazo de y0 a y1 en la columna x: ¿es una raya suelta? (finita y sin nada pegado a los costados)
    function esRaya(x, y0, y1) {
      let gruesas = 0, tocadas = 0;
      for (let y = y0; y < y1; y++) {
        let a = x, b = x;
        while (t(a - 1, y) && x - a < grosorMax) a--;
        while (t(b + 1, y) && b - x < grosorMax) b++;
        if (b - a + 1 > grosorMax) gruesas++;
        for (let d = 2; d <= libre; d++) if (t(a - d, y) || t(b + d, y)) { tocadas++; break; }
      }
      const n = y1 - y0;
      return gruesas <= n * 0.2 && tocadas <= n * 0.1;
    }
    function borrarTrazo(x, y0, y1) {
      for (let y = y0; y < y1; y++) {
        let a = x, b = x;
        while (t(a - 1, y) && x - a <= grosorMax) a--;
        while (t(b + 1, y) && b - x <= grosorMax) b++;
        for (let xx = Math.max(0, a - 1); xx <= Math.min(w - 1, b + 1); xx++) borrar[y * w + xx] = 1;
      }
    }
    /* Por columna, los trazos sueltos que tiene. Una raya de la planilla aparece en casi todas las filas en la misma columna;
       una l, una t o un 1 sueltos aparecen en una o dos filas en ese lugar. */
    const sueltos = new Array(w);
    let C = 0;
    for (let x = 0; x < w; x++) {
      sueltos[x] = [];
      if (!P[x] || P[x] < max * 0.15) continue;
      let run = 0;
      for (let y = 0; y <= h; y++) {
        if (y < h && esT(y * w + x)) run++;
        else { if (run >= L && run <= Lmax && esRaya(x, y - run, y)) sueltos[x].push([y - run, y]); run = 0; }
      }
      if (sueltos[x].length > C) C = sueltos[x].length;
    }
    if (C < 4) return borrar;
    for (let x = 0; x < w; x++) if (sueltos[x].length >= C * 0.6) sueltos[x].forEach(([y0, y1]) => borrarTrazo(x, y0, y1));
    return borrar;
  }

  function versiones(img) {
    const { w, h, l } = grises(img);
    const corte = otsu(l);
    let claros = 0; for (let i = 0; i < l.length; i++) if (l[i] > corte) claros++;
    const letrasClaras = claros < l.length / 2;   // el texto es lo que menos ocupa
    const esTexto = (v, c) => (letrasClaras ? v > c : v < c);
    const borrar = rayas(w, h, (j) => esTexto(l[j], corte));
    const fondo = (valor) => (j) => (borrar[j] ? 255 : valor(j));
    // Otsu
    const vOtsu = lienzo(w, h, fondo((j) => (esTexto(l[j], corte) ? 0 : 255)));
    // Local (Bradley): compara cada punto con el promedio de su zona
    const integ = new Float64Array((w + 1) * (h + 1));
    for (let y = 0; y < h; y++) { let fila = 0; for (let x = 0; x < w; x++) { fila += l[y * w + x]; integ[(y + 1) * (w + 1) + x + 1] = integ[y * (w + 1) + x + 1] + fila; } }
    const r = Math.max(8, Math.round(Math.max(w, h) / 40)), k = 0.12;
    const vLocal = lienzo(w, h, fondo((j) => {
      const x = j % w, y = (j - x) / w;
      const x0 = Math.max(0, x - r), x1 = Math.min(w - 1, x + r), y0 = Math.max(0, y - r), y1 = Math.min(h - 1, y + r);
      const n = (x1 - x0 + 1) * (y1 - y0 + 1);
      const s = integ[(y1 + 1) * (w + 1) + x1 + 1] - integ[y0 * (w + 1) + x1 + 1] - integ[(y1 + 1) * (w + 1) + x0] + integ[y0 * (w + 1) + x0];
      const m = s / n;
      return (letrasClaras ? l[j] > m * (1 + k) && l[j] > 60 : l[j] < m * (1 - k)) ? 0 : 255;
    }));
    // Grises con contraste estirado (percentiles 2 y 98)
    const orden = Array.from(l.filter((_, i) => i % 7 === 0)).sort((a, b) => a - b);
    const lo = orden[Math.floor(orden.length * 0.02)], hi = Math.max(lo + 1, orden[Math.floor(orden.length * 0.98)]);
    const vGris = lienzo(w, h, fondo((j) => { const v = Math.max(0, Math.min(255, (l[j] - lo) * 255 / (hi - lo))); return letrasClaras ? 255 - v : v; }));
    return [vOtsu, vLocal, vGris];
  }

  /* Una fila de la planilla: "<puesto> <kart> <apellido y nombre> <puntos>".
     El lector a veces confunde números con letras o les pega signos, así que se lee con tolerancia:
     los puntos son el último número de la fila, el nombre son las palabras antes, y los números de adelante, puesto y kart.
     Como la planilla viene ordenada, el puesto final es el orden de las filas. */
  const DIGITO = { O: '0', o: '0', D: '0', Q: '0', l: '1', I: '1', i: '1', '|': '1', Z: '2', z: '2', A: '4', S: '5', s: '5', G: '6', T: '7', B: '8', g: '9' };
  function aNumero(tok) {
    // una l, I o | pegada a un número es la raya de la columna, no un 1 ("134l" es el 134)
    const t = String(tok).replace(/[^0-9A-Za-z|]/g, '').replace(/^[lIi|]+(?=\d)/, '').replace(/(\d)[lIi|]+$/, '$1');
    if (!t || t.length > 4) return null;
    const c = t.split('').map(ch => (/\d/.test(ch) ? ch : DIGITO[ch])).join('');
    return /^\d+$/.test(c) && /\d/.test(t) || (/^\d+$/.test(c) && t.length === 1) ? c : null;
  }
  function interpretarLinea(linea, dentroDeTabla) {
    const l = linea.replace(/[|¦!\[\]{}()"'“”‘’]/g, ' ').replace(/[,](?=\d)/g, '.').replace(/\s+/g, ' ').trim()
      // puesto y kart separados por un punto en vez de un espacio: "24.703 Diab Karen" → "24 703"
      .replace(/^(\D{0,3}\d{1,3})[.·](\d{2,3}) /, '$1 $2 ')
      // medio punto mal leído al final: "35.S", "35,s", "35½" → 35.5
      .replace(/(\d)\s*[.,·]\s*[sS]\s*$/, '$1.5').replace(/(\d)\s*½\s*$/, '$1.5');
    const fin = /(\d{1,4}(?:\.\d{1,2})?)[^\dA-Za-zÁÉÍÓÚÑáéíóúñ]*$/.exec(l);
    if (!fin) {
      /* Puntos ilegibles ("10 29 Russo Ambar a"): dentro de la tabla la fila se acepta igual, sin puntos, para no perder
         al piloto. Se sacan las letras sueltas del final, que son los puntos mal leídos. */
      if (!dentroDeTabla || /\s0$/.test(l)) return null;
      const sinBasura = l.replace(/(\s+\S{1,2})+$/, '');
      const f = sinBasura !== l || /[A-Za-zÁÉÍÓÚÑÜáéíóúñü]$/.test(l) ? interpretarLinea(sinBasura + ' 0', true) : null;
      return f && f.posicion != null ? Object.assign(f, { puntos: null }) : null;
    }
    // se descartan los signos sueltos (—, +, :, .) que el lector agrega entre columnas
    const antes = l.slice(0, fin.index).trim().split(' ').filter(t => /[0-9A-Za-zÁÉÍÓÚÑÜáéíóúñü]/.test(t));
    /* Puntos con decimales: el lector suele perder el punto y separa "35.5" en "35 5" (o "35 . 5"). Si justo después del nombre
       vienen dos números y el último es un solo dígito, son un solo puntaje. Sin esto la fila quedaba sin nombre y se descartaba. */
    let puntos = fin[1];
    if (/^\d$/.test(puntos) && antes.length >= 2 && /^\d{1,3}$/.test(antes[antes.length - 1]) && /[A-Za-zÁÉÍÓÚÑÜáéíóúñü]{2,}/.test(antes[antes.length - 2])) {
      puntos = antes.pop() + '.' + puntos;
    }
    // el nombre: las últimas palabras con letras (al menos una de 3 letras); acepta iniciales ("Dilupio Juan M.")
    let k = antes.length;
    while (k > 0 && (/[A-Za-zÁÉÍÓÚÑÜáéíóúñü]{2,}/.test(antes[k - 1]) || /^[A-ZÁÉÍÓÚÑ]\.$/.test(antes[k - 1])) && aNumero(antes[k - 1]) == null) k--;
    const palabras = antes.slice(k).map(p => p.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü'.-]/g, '')).filter(p => p.length >= 2);
    if (!palabras.length || !palabras.some(p => p.length >= 3)) return null;
    const nums = antes.slice(0, k).map(aNumero).filter(x => x != null);
    // Una fila arranca con el puesto o el kart; si no se pudieron leer, se acepta igual dentro de la tabla (el puesto sale del orden)
    if (!nums.length && !dentroDeTabla) return null;
    if (!nums.length) return { posicion: null, kart: '', nombre: palabras.join(' '), puntos: +puntos };
    return {
      posicion: nums.length > 1 ? +nums[0] : null,
      kart: nums.length > 1 ? nums[nums.length - 1] : nums[0],
      nombre: palabras.join(' '),
      puntos: +puntos,
    };
  }
  /* Dígitos de más en el kart: el puesto pegado adelante cuando no se leyó aparte ("540" en el puesto 5 era el kart 40)
     y la raya de la columna leída como un 1 en un kart de 4 cifras ("1341" era el 134). El número leído tal cual queda
     en kartLeido, para compararlo con los karts de los inscriptos. */
  function limpiarKart(kart, puestoPegado) {
    let k = String(kart || '');
    const p = puestoPegado == null ? '' : String(puestoPegado);
    if (p && k.startsWith('1' + p) && k.length - p.length >= 3) k = k.slice(p.length + 1);   // con el borde de la fila leído como 1 ("13177" en el 31)
    else if (p && k.startsWith(p) && k.length - p.length >= 2) k = k.slice(p.length);
    if (k.length >= 4 && k.endsWith('1')) k = k.slice(0, -1);
    if (k.length >= 4 && k.startsWith('1')) k = k.slice(1);
    return k;
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
    /* La planilla viene ordenada y sin saltos: puesto = número de fila + un desplazamiento (la foto puede arrancar en el puesto 12).
       El desplazamiento sale de lo que dicen la mayoría de los puestos leídos cerca de cada fila; así un puesto mal leído
       (o una fila cortada en el borde de la foto) no arrastra a los demás. */
    // el borde izquierdo de la fila a veces se lee como un 1 pegado al puesto ("125" en el puesto 25)
    filas.forEach((f) => { if (f.posicion >= 100 && String(f.posicion)[0] === '1') f.posicion = +String(f.posicion).slice(1); });
    const desp = filas.map((f, i) => (f.posicion != null && f.posicion >= 1 && f.posicion <= 150 ? f.posicion - i : null));
    const moda = (xs) => { const c = {}; let m = null; xs.forEach(x => { if (x == null) return; c[x] = (c[x] || 0) + 1; if (m == null || c[x] > c[m]) m = x; }); return m; };
    const general = moda(desp);
    filas.forEach((f, i) => {
      const cerca = moda(desp.slice(Math.max(0, i - 2), i + 3));
      const votosCerca = desp.slice(Math.max(0, i - 2), i + 3).filter(x => x === cerca).length;
      const d = cerca != null && votosCerca >= 2 ? cerca : general != null ? general : 1;
      const nueva = Math.max(1, i + d);
      // con un solo número adelante, ese número era el puesto y no el kart
      if (f.posicion == null && +f.kart === nueva && filas.length > 3) f.kart = '';
      f.kartLeido = f.kart;
      f.kart = limpiarKart(f.kart, f.posicion == null ? nueva : null);
      f.posicion = nueva;
    });
    return { titulo, filas };
  }

  App.leerResultados = async function (file, onProgreso) {
    if (!file) throw new Error('No elegiste ninguna foto.');
    const original = await imagenDe(file);
    const w = await obtenerWorker(onProgreso);
    const img = girar(original, anguloTorcido(original));
    const vs = versiones(img);
    const lecturas = [];
    for (let i = 0; i < vs.length; i++) {
      if (onProgreso) onProgreso('recognizing text', i / vs.length);
      const { data } = await w.recognize(vs[i]);
      const r = interpretar(data.text);
      r.texto = data.text;
      lecturas.push(r);
    }
    return combinar(lecturas);
  };

  /* Cada versión de la foto se lee por separado y cada una se equivoca en lugares distintos. Se juntan las filas de las
     distintas lecturas que son del mismo piloto (nombre parecido y puesto cercano) y de cada una se queda el kart, el nombre
     y los puntos que más lecturas repiten; si empatan, gana la lectura que leyó más filas. Una fila que se perdió en una
     lectura no se pierde en el resultado si otra la leyó. */
  function distancia(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const clave = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
  const parecido = (a, b) => (!a || !b) ? 0 : 1 - distancia(a, b) / Math.max(a.length, b.length);
  function combinar(lecturas) {
    const orden = lecturas.slice().sort((a, b) => b.filas.length - a.filas.length);
    const mejor = orden[0];
    const grupos = [];
    orden.forEach((r, n) => r.filas.forEach((f, i) => {
      const k = clave(f.nombre);
      let g = null, gp = 0;
      grupos.forEach((x) => {
        if (x.lecturas.has(n) || Math.abs(x.pos0 - f.posicion) > 2) return;
        const p = parecido(x.clave, k);
        if (p >= 0.7 && p > gp) { g = x; gp = p; }
      });
      if (!g) { g = { clave: k, pos0: f.posicion, fs: [], lecturas: new Set() }; grupos.push(g); }
      g.fs.push(Object.assign({ n, i }, f)); g.lecturas.add(n);
    }));
    const votar = (fs, campo) => {
      const c = new Map();
      fs.forEach((f) => { const v = f[campo]; if (v === '' || v == null || (typeof v === 'number' && isNaN(v))) return; const e = c.get(v) || { v, votos: 0, n: f.n }; e.votos++; c.set(v, e); });
      let m = null; c.forEach((e) => { if (!m || e.votos > m.votos || (e.votos === m.votos && e.n < m.n)) m = e; });
      return m ? m.v : (campo === 'puntos' ? null : '');
    };
    // una fila que aparece en una sola lectura (y no es la mejor) suele ser basura del fondo
    const filas = grupos.filter(g => g.fs.length >= 2 || g.lecturas.has(0)).map((g) => ({
      posicion: votar(g.fs, 'posicion'), orden: g.fs.reduce((s, f) => s + f.i, 0) / g.fs.length,
      kart: votar(g.fs, 'kart'), kartLeido: votar(g.fs, 'kartLeido'), nombre: votar(g.fs, 'nombre'), puntos: votar(g.fs, 'puntos'),
    }));
    // la planilla no tiene saltos: se ordena y se numera seguido desde el puesto en que más filas coinciden
    filas.sort((a, b) => a.posicion - b.posicion || a.orden - b.orden);
    const c = {}; let d = 1, dv = 0;
    filas.forEach((f, i) => { const x = f.posicion - i; c[x] = (c[x] || 0) + 1; if (c[x] > dv) { dv = c[x]; d = x; } });
    filas.forEach((f, i) => { f.posicion = Math.max(1, i + d); delete f.orden; });
    /* Los puntos bajan con el puesto: si unos puntos son más que los del puesto anterior y divididos por 10 entran
       entre el anterior y el siguiente, se perdió la coma ("415" era 41.5) */
    filas.forEach((f, i) => {
      const ant = filas[i - 1], sig = filas[i + 1];
      if (f.puntos == null || !ant || ant.puntos == null || f.puntos <= ant.puntos) return;
      const p = f.puntos / 10;
      if (p <= ant.puntos && (!sig || sig.puntos == null || p >= sig.puntos)) f.puntos = p;
    });
    return { titulo: mejor.titulo || (orden.find(r => r.titulo) || {}).titulo || '', filas, texto: mejor.texto };
  }
  App.interpretarResultados = interpretar;
})();
