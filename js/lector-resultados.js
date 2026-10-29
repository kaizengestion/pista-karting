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

  /* Texto negro sobre blanco. Si el fondo es oscuro (letras claras) se toma lo claro como texto. */
  function preparar(img) {
    const escala = Math.min(3, Math.max(1, 2200 / Math.max(img.naturalWidth, img.naturalHeight)));
    const w = Math.round(img.naturalWidth * escala), h = Math.round(img.naturalHeight * escala);
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, w, h);
    const datos = g.getImageData(0, 0, w, h);
    const px = datos.data;
    let suma = 0;
    for (let i = 0; i < px.length; i += 4) suma += 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    const media = suma / (px.length / 4);
    const oscuro = media < 128;
    for (let i = 0; i < px.length; i += 4) {
      const l = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      const texto = oscuro ? l > 175 : l < 90;
      const v = texto ? 0 : 255;
      px[i] = px[i + 1] = px[i + 2] = v;
    }
    g.putImageData(datos, 0, 0);
    return cv;
  }

  /* Una fila de la planilla: "<puesto> <kart> <apellido y nombre> <puntos>" */
  function interpretar(texto) {
    const filas = [];
    let titulo = '';
    String(texto || '').split('\n').forEach((linea) => {
      const l = linea.replace(/[|¦!]/g, ' ').replace(/\s+/g, ' ').trim();
      const m = /^(\d{1,2})[.)º°]?\s+(\d{1,4})\s+(.+?)\s+(\d{1,4})$/.exec(l);
      if (m) {
        const nombre = m[3].replace(/^[^A-Za-zÁÉÍÓÚÑáéíóúñ]+/, '').replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ'. -]/g, '').trim();
        filas.push({ posicion: +m[1], kart: m[2], nombre, puntos: +m[4] });
        return;
      }
      // Título de la categoría: una línea en mayúsculas sin números al final (ej. "110CC ESCUELA")
      if (!filas.length && /^[0-9A-ZÁÉÍÓÚÑ .]{6,}$/.test(l) && /[A-Z]{4,}/.test(l) && !/CAMPEONATO/.test(l)) titulo = l;
    });
    filas.sort((a, b) => a.posicion - b.posicion);
    return { titulo, filas };
  }

  App.leerResultados = async function (file, onProgreso) {
    if (!file) throw new Error('No elegiste ninguna foto.');
    const img = await imagenDe(file);
    const cv = preparar(img);
    const w = await obtenerWorker(onProgreso);
    const { data } = await w.recognize(cv);
    const r = interpretar(data.text);
    r.texto = data.text;
    return r;
  };
  App.interpretarResultados = interpretar;
})();
