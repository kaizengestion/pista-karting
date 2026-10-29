/* Capa de datos de RGK Santafesino: window.Store (ver CONTRACT.md).
   Dos backends detrás de la misma API:
   - 'db'   → capacidades de runtime del Artifact: claude.use('db' | 'user' | 'assets').
   - 'demo' → base en memoria inicializada con window.DEMO_DATA y guardada en localStorage.
   Toda la lógica (torneos, inscripciones, tiempos) se escribe una sola vez contra un
   "adaptador" de documentos con rutas tipo 'torneos/<id>/tiempos/<inscId>'. */
(function () {
  'use strict';

  const DEMO_KEY = 'pista-karting-demo-v6'; // v6: resultados por puntos (foto por categoría)
  const INIT_TIMEOUT_MS = 4000;
  const MB = 1024 * 1024;
  const MAX_IMG_SIN_REDUCIR = 2.5 * MB;
  const MAX_ARCHIVO = 20 * MB;

  /* ------------------------------------------------------------------ utilidades */
  function clone(v) {
    if (v == null || typeof v !== 'object') return v;
    if (typeof structuredClone === 'function') { try { return structuredClone(v); } catch (e) { /* sigue */ } }
    return JSON.parse(JSON.stringify(v));
  }
  /* Para escribir: JSON puro (sin undefined, funciones ni objetos congelados) */
  function plano(v) { return JSON.parse(JSON.stringify(v == null ? {} : v)); }
  function sinId(v) { const d = plano(v); delete d.id; return d; }
  const nowISO = () => new Date().toISOString();
  function hoyISO() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  const microtarea = typeof queueMicrotask === 'function' ? queueMicrotask : (fn) => Promise.resolve().then(fn);
  function cmpTexto(a, b) {
    return String(a == null ? '' : a).localeCompare(String(b == null ? '' : b), 'es', { sensitivity: 'base' });
  }
  const esTiempo = (t) => typeof t === 'number' && isFinite(t);
  function aTiempo(t) {
    if (typeof t === 'string' && t.trim() !== '') t = Number(t);
    return esTiempo(t) ? Math.round(t) : null;
  }
  const esObjeto = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
  function mergeProfundo(base, cambios) {
    const out = esObjeto(base) ? Object.assign({}, base) : {};
    for (const k of Object.keys(cambios)) {
      const v = cambios[k];
      out[k] = esObjeto(v) && esObjeto(out[k]) ? mergeProfundo(out[k], v) : v;
    }
    return out;
  }
  const padre = (path) => path.split('/').slice(0, -1).join('/');
  const ultimo = (path) => path.split('/').pop();
  function error(msg, code) { const e = new Error(msg); if (code) e.code = code; return e; }
  function idValido(id) { return typeof id === 'string' && id.length > 0 && !id.includes('/'); }
  function exigirId(id, que) { if (!idValido(id)) throw error('Falta el identificador ' + que + '.'); }

  function conTimeout(p, ms) {
    return Promise.race([
      Promise.resolve(p).catch(() => null),
      new Promise((r) => setTimeout(() => r(null), ms)),
    ]);
  }

  async function enLotes(items, fn, n) {
    const cola = items.slice();
    const trabajadores = Array.from({ length: Math.min(n || 4, cola.length) }, async () => {
      while (cola.length) await fn(cola.shift());
    });
    await Promise.all(trabajadores);
  }

  const avisados = new Set();
  function avisar(msg) {
    if (avisados.has(msg)) return;
    avisados.add(msg);
    try { if (window.App && typeof window.App.toast === 'function') window.App.toast(msg, 'error'); } catch (e) { /* nada */ }
  }

  /* ------------------------------------------------------------------ orden y planillas (puras) */
  function ordenarTorneos(lista) {
    return lista.sort((a, b) => String(a.fecha || '').localeCompare(String(b.fecha || '')) || cmpTexto(a.nombre, b.nombre));
  }
  function ordenarInscripciones(lista) {
    return lista.sort((a, b) => cmpTexto(a.apellido, b.apellido) || cmpTexto(a.nombre, b.nombre) || String(a.id).localeCompare(String(b.id)));
  }

  /* posiciones(filas): copia ordenada por tiempo asc (sin tiempo al final, desempate por apellido),
     con posicion 1..n para las que tienen tiempo y null para el resto. */
  function posiciones(filas) {
    const arr = (filas || []).map((f) => Object.assign({}, f));
    arr.sort((a, b) => {
      const ta = esTiempo(a.tiempo), tb = esTiempo(b.tiempo);
      if (ta && tb && a.tiempo !== b.tiempo) return a.tiempo - b.tiempo;
      if (ta !== tb) return ta ? -1 : 1;
      return cmpTexto(a.apellido, b.apellido) || cmpTexto(a.nombre, b.nombre);
    });
    let n = 0;
    arr.forEach((f) => { f.posicion = esTiempo(f.tiempo) ? ++n : null; });
    return arr;
  }

  /* Un torneo tiene de 1 a 10 fechas (`fechas`). Los torneos viejos solo tienen `fecha`. */
  const MAX_FECHAS = 10;
  function fechasDe(t) {
    if (!t) return [];
    const lista = Array.isArray(t.fechas) ? t.fechas.filter((f) => typeof f === 'string' && f) : [];
    if (lista.length) return lista.slice(0, MAX_FECHAS);
    return t.fecha ? [t.fecha] : [];
  }
  /* Tiempos: la fecha 1 vive en { tiempo, ok } (como siempre); las fechas 2 y 3 en f2 / f3. */
  function tiempoDeFecha(doc, n) {
    const x = !doc ? null : (n > 1 ? doc['f' + n] : doc);
    return { tiempo: aTiempo(x && x.tiempo), ok: !!(x && x.ok) };
  }

  /* Un competidor puede correr en una o más categorías (`categorias`). Las inscripciones viejas solo tienen `categoria`. */
  function categoriasDe(i) {
    if (!i) return [];
    const lista = Array.isArray(i.categorias) ? i.categorias.filter((c) => typeof c === 'string' && c) : [];
    if (lista.length) return lista;
    return i.categoria ? [i.categoria] : [];
  }
  function slug(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'cat';
  }
  /* Documento de tiempos de un competidor en una categoría: '<inscId>__<categoría>'.
     Los tiempos viejos (una sola categoría) se guardaron como '<inscId>' y se siguen leyendo. */
  function claveTiempo(inscId, cat) { return inscId + '__' + slug(cat); }
  function tiempoDoc(tiempos, insc, cat) {
    const t = tiempos[claveTiempo(insc.id, cat)];
    if (t) return t;
    return cat === categoriasDe(insc)[0] ? tiempos[insc.id] : undefined;
  }

  function torneoActual(torneos) {
    return (torneos || []).find((t) => t && t.estado === 'actual') || null;
  }
  function torneoInscripcion(torneos) {
    const actual = torneoActual(torneos);
    if (actual) return actual;
    const proximos = (torneos || []).filter((t) => t && t.estado === 'proximo')
      .sort((a, b) => String(a.fecha || '').localeCompare(String(b.fecha || '')));
    const hoy = hoyISO();
    return proximos.find((t) => String(fechasDe(t).slice(-1)[0] || '') >= hoy) || proximos[0] || null;
  }

  function armarResultados(torneo, inscs, tiempos, n) {
    const res = {};
    (torneo.categorias || []).forEach((c) => { if (c && c.nombre) res[c.nombre] = []; });
    inscs.forEach((i) => {
      const cats = categoriasDe(i);
      (cats.length ? cats : ['Sin categoría']).forEach((cat) => {
        const t = tiempoDeFecha(tiempoDoc(tiempos, i, cat), n || 1);
        (res[cat] = res[cat] || []).push({
          inscId: i.id,
          nombre: i.nombre || '', apellido: i.apellido || '', dni: i.dni || '',
          nroKarting: i.nroKarting == null ? '' : String(i.nroKarting),
          invitado: !!i.invitado,
          tiempo: t.tiempo, ok: t.ok,
        });
      });
    });
    Object.keys(res).forEach((k) => { res[k] = posiciones(res[k]); });
    return res;
  }

  /* Planillas de puntos: un documento por fecha y categoría, 'torneos/<id>/puntos/f<n>__<categoría>'
     = { fecha, categoria, filas: [{ posicion, kart, nombre, puntos, inscId }], foto }. */
  function clavePuntos(n, cat) { return 'f' + n + '__' + slug(cat); }
  function resultadosPorPuntos(torneo, inscs, puntos, n) {
    const res = {};
    (torneo.categorias || []).forEach((c) => {
      const doc = puntos[clavePuntos(n, c.nombre)];
      if (!doc || !Array.isArray(doc.filas)) return;
      res[c.nombre] = doc.filas.map((f) => {
        const i = f.inscId ? inscs.find((x) => x.id === f.inscId) : null;
        return {
          inscId: f.inscId || null,
          nombre: i ? i.nombre || '' : '', apellido: i ? i.apellido || '' : String(f.nombre || ''),
          dni: i ? i.dni || '' : '', nroKarting: String(f.kart || (i && i.nroKarting) || ''),
          invitado: !!(i && i.invitado), puntos: f.puntos == null || f.puntos === '' ? null : +f.puntos,
          posicion: f.posicion == null || f.posicion === '' ? null : +f.posicion,
        };
      }).sort((a, b) => (a.posicion == null) - (b.posicion == null) || (a.posicion || 0) - (b.posicion || 0));
    });
    return res;
  }

  /* ------------------------------------------------------------------ suscripciones compartidas
     Una sola suscripción interna por recurso; se cachea el último valor y se reparte a cada cb
     (cada uno recibe su propia copia). Cuando se va el último cb, se corta. */
  const canales = new Map();
  function entregar(cb, valor) { try { cb(clone(valor)); } catch (e) { console.error(e); } }

  function compartir(clave, iniciar, cb, vacio) {
    if (typeof cb !== 'function') throw new TypeError('Store: falta la función que recibe los datos.');
    let ch = canales.get(clave);
    const nuevo = !ch;
    if (nuevo) {
      ch = { cbs: new Set(), tiene: false, valor: undefined, cortar: null };
      canales.set(clave, ch);
    } else if (ch.tiene) {
      microtarea(() => { if (ch.cbs.has(cb)) entregar(cb, ch.valor); });
    }
    ch.cbs.add(cb);
    if (nuevo) {
      const vivo = () => canales.get(clave) === ch;
      const emitir = (valor) => {
        if (!vivo()) return;
        ch.valor = valor; ch.tiene = true;
        Array.from(ch.cbs).forEach((f) => { if (ch.cbs.has(f)) entregar(f, valor); });
      };
      const fallar = (e) => {
        console.error('Store: se cortó la suscripción a ' + clave, e);
        if (!vivo()) return;
        if (!ch.tiene) emitir(vacio());
        avisar(errorDb(e).message);
      };
      try { ch.cortar = iniciar(emitir, fallar); } catch (e) { fallar(e); }
    }
    let hecho = false;
    return function unsubscribe() {
      if (hecho) return;
      hecho = true;
      ch.cbs.delete(cb);
      if (ch.cbs.size === 0 && canales.get(clave) === ch) {
        canales.delete(clave);
        try { ch.cortar && ch.cortar(); } catch (e) { /* nada */ }
      }
    };
  }

  /* ------------------------------------------------------------------ errores */
  const SIN_DB = 'La base de datos no está disponible en esta vista. Recargá la página.';
  const MSG_DB = {
    invalid_argument: 'No tenés permiso para hacer este cambio, o los datos no son válidos.',
    resource_exhausted: 'Hay demasiadas operaciones seguidas. Esperá unos segundos y probá de nuevo.',
    quota_exceeded: 'La base de datos llegó a su límite de espacio. Borrá datos que ya no uses (por ejemplo, los de ejemplo) y probá de nuevo.',
    unavailable: 'No se pudo conectar con la base de datos. Revisá la conexión y probá de nuevo en un momento.',
    revoked: 'Se perdió el acceso a los datos. Recargá la página.',
    not_granted: SIN_DB,
    capability_disabled: SIN_DB,
    capability_removed: SIN_DB,
    transform_error: 'Los datos no tienen un formato válido.',
  };
  function errorDb(e) {
    if (e && e.esStore) return e;
    const code = e && typeof e.code === 'string' ? e.code : null;
    if (!code && e instanceof Error) return e; // errores propios o de programación (TypeError de rutas)
    const out = error(MSG_DB[code] || MSG_DB.unavailable, code || 'unavailable');
    out.esStore = true;
    out.causa = e;
    return out;
  }

  const MSG_ASSETS = {
    invalid_request: 'El archivo está vacío o dañado. Probá con otro.',
    too_large: 'El archivo es demasiado grande (máximo 20 MB). Probá con una foto o un PDF más liviano.',
    unsupported_type: 'Ese tipo de archivo no es compatible. Subí una foto (JPG o PNG) o un PDF.',
    quota_or_state: 'No queda espacio para guardar archivos. Avisale al organizador.',
    rate_limited: 'Subiste muchos archivos seguidos. Esperá un momento y probá de nuevo.',
    upstream_auth: 'No se pudo verificar tu sesión. Recargá la página o volvé a iniciar sesión en claude.ai.',
    not_granted: 'Desde esta cuenta no se pueden subir archivos. Iniciá sesión en claude.ai o pedile acceso al organizador.',
    capability_disabled: 'En esta vista no se pueden subir archivos. Recargá la página o probá desde otro navegador.',
    capability_removed: 'En esta vista no se pueden subir archivos. Recargá la página o probá desde otro navegador.',
    store_unavailable: 'El servicio de archivos no responde. Probá de nuevo en un momento.',
    not_uploader: 'Ese archivo lo subió otra persona; no lo podés borrar.',
    upstream_error: 'No se pudo subir el archivo. Probá de nuevo en un momento.',
    transform_error: 'No se pudo subir el archivo. Probá de nuevo en un momento.',
  };
  function errorAsset(e) {
    const code = e && typeof e.code === 'string' ? e.code : 'upstream_error';
    const out = error(MSG_ASSETS[code] || MSG_ASSETS.upstream_error, code);
    out.causa = e;
    return out;
  }

  /* ------------------------------------------------------------------ adaptador: base del Artifact */
  function adaptadorDb(db) {
    const colas = new Map();
    function aDoc(d) { const o = clone(d.data()) || {}; o.id = d.id; return o; }

    async function conReintento(fn) {
      try { return await fn(); } catch (e) {
        if (e && e.code === 'unavailable') { await espera(400 + Math.random() * 800); return await fn(); }
        throw e;
      }
    }
    /* Una escritura a la vez por documento */
    function escribir(path, fn) {
      const previa = colas.get(path) || Promise.resolve();
      const p = previa.catch(() => {}).then(() => conReintento(() => fn(db.doc(path))));
      colas.set(path, p);
      p.then(() => {}, () => {}).then(() => { if (colas.get(path) === p) colas.delete(path); });
      return p.catch((e) => { throw errorDb(e); });
    }

    return {
      async get(path) {
        try {
          const s = await conReintento(() => db.doc(path).get());
          return s.exists ? aDoc(s) : null;
        } catch (e) { throw errorDb(e); }
      },
      async list(colPath, filtro) {
        try {
          let q = db.collection(colPath);
          if (filtro) q = q.where(filtro[0], filtro[1], filtro[2]);
          const s = await conReintento(() => q.get());
          return s.docs.map(aDoc);
        } catch (e) { throw errorDb(e); }
      },
      set(path, data) { return escribir(path, (r) => r.set(data)); },
      update(path, data) { return escribir(path, (r) => r.update(data)); },
      del(path) { return escribir(path, (r) => r.delete()); },
      newId(colPath) { return db.collection(colPath).doc().id; },
      subscribe(colPath, alRecibir, alFallar) {
        let cortar = null, detenido = false, timer = null, intentos = 0;
        const suscribir = () => {
          if (detenido) return;
          try {
            cortar = db.collection(colPath).onSnapshot(
              (snap) => { intentos = 0; alRecibir(snap.docs.map(aDoc)); },
              (e) => {
                cortar = null;
                const code = e && e.code;
                const transitorio = !code || code === 'unavailable' || code === 'resource_exhausted' || code === 'queue_overflow' || !(code in MSG_DB);
                if (!detenido && transitorio && intentos < 6) {
                  intentos++;
                  timer = setTimeout(suscribir, 1500 * intentos + Math.random() * 1000);
                } else if (!detenido) alFallar(e);
              });
          } catch (e) { alFallar(e); }
        };
        suscribir();
        return () => { detenido = true; clearTimeout(timer); if (cortar) { try { cortar(); } catch (e) { /* nada */ } cortar = null; } };
      },
    };
  }

  /* ------------------------------------------------------------------ adaptador: memoria (demo) */
  function docsDesdeDemo(demo) {
    const docs = {};
    if (!demo) return docs;
    (demo.torneos || []).forEach((t) => { docs['torneos/' + t.id] = sinId(t); });
    (demo.inscripciones || []).forEach((i) => { docs['inscripciones/' + i.id] = sinId(i); });
    Object.keys(demo.puntos || {}).forEach((tid) => {
      Object.keys(demo.puntos[tid] || {}).forEach((k) => { docs['torneos/' + tid + '/puntos/' + k] = plano(demo.puntos[tid][k]); });
    });
    Object.keys(demo.tiempos || {}).forEach((tid) => {
      Object.keys(demo.tiempos[tid] || {}).forEach((iid) => { docs['torneos/' + tid + '/tiempos/' + iid] = plano(demo.tiempos[tid][iid]); });
    });
    return docs;
  }
  function cargarDemo() {
    try {
      const raw = window.localStorage && window.localStorage.getItem(DEMO_KEY);
      if (raw) {
        const o = JSON.parse(raw);
        if (o && o.v === 1 && esObjeto(o.docs)) return o.docs;
      }
    } catch (e) { /* sin localStorage: solo memoria */ }
    return docsDesdeDemo(window.DEMO_DATA);
  }
  function guardarDemo(docs) {
    try {
      if (!window.localStorage) return;
      const o = {};
      docs.forEach((v, k) => { o[k] = v; });
      window.localStorage.setItem(DEMO_KEY, JSON.stringify({ v: 1, docs: o }));
    } catch (e) { /* cuota llena o bloqueado: queda en memoria */ }
  }

  function adaptadorMemoria(inicial) {
    const docs = new Map(Object.entries(inicial || {}));
    const subs = new Set();
    let cambiadas = null;
    function cambio(path) {
      guardarDemo(docs);
      if (!cambiadas) {
        cambiadas = new Set();
        microtarea(() => {
          const cols = cambiadas; cambiadas = null;
          subs.forEach((s) => { if (cols.has(s.colPath) && subs.has(s)) s.notificar(); });
        });
      }
      cambiadas.add(padre(path));
    }
    function listar(colPath, filtro) {
      const out = [];
      docs.forEach((d, p) => {
        if (padre(p) !== colPath) return;
        if (filtro && !(filtro[1] === '==' && d[filtro[0]] === filtro[2])) return;
        const o = clone(d); o.id = ultimo(p); out.push(o);
      });
      return out;
    }
    let contador = 0;
    return {
      async get(path) { const d = docs.get(path); if (!d) return null; const o = clone(d); o.id = ultimo(path); return o; },
      async list(colPath, filtro) { return listar(colPath, filtro); },
      async set(path, data) { docs.set(path, plano(data)); cambio(path); },
      async update(path, data) {
        if (!docs.has(path)) throw error('No se encontró el registro que querés modificar.', 'invalid_argument');
        docs.set(path, mergeProfundo(docs.get(path), plano(data))); cambio(path);
      },
      async del(path) { if (docs.delete(path)) cambio(path); },
      newId(colPath) {
        const pre = colPath === 'torneos' ? 't-' : colPath === 'inscripciones' ? 'i-' : '';
        return pre + Date.now().toString(36) + (++contador).toString(36) + Math.random().toString(36).slice(2, 6);
      },
      recargar(nuevos) {
        docs.clear(); Object.entries(nuevos || {}).forEach(([k, v]) => docs.set(k, v));
        subs.forEach((s) => s.notificar());
      },
      subscribe(colPath, alRecibir) {
        const s = { colPath, notificar: () => alRecibir(listar(colPath)) };
        subs.add(s);
        microtarea(() => { if (subs.has(s)) s.notificar(); });
        return () => { subs.delete(s); };
      },
    };
  }

  /* ------------------------------------------------------------------ archivos */
  const EXT_TIPO = { jpg: 'image/jpeg', jpeg: 'image/jpeg', jfif: 'image/jpeg', png: 'image/png', webp: 'image/webp', heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf' };
  const TIPOS_IMG = ['image/jpeg', 'image/png', 'image/webp'];
  function tipoDe(file) {
    let t = String(file.type || '').toLowerCase().split(';')[0].trim();
    const ext = String(file.name || '').toLowerCase().split('.').pop();
    if (!t || t === 'application/octet-stream') t = EXT_TIPO[ext] || t;
    if (t === 'image/jpg' || t === 'image/pjpeg') t = 'image/jpeg';
    if (t === 'image/heic-sequence') t = 'image/heic';
    if (t === 'image/heif-sequence') t = 'image/heif';
    return t;
  }
  function conExt(nombre, ext) {
    const base = String(nombre || 'autorizacion').replace(/\.[^./\\]*$/, '');
    return (base || 'autorizacion') + '.' + ext;
  }
  /* Reduce una imagen a lado máx `lado` px y la devuelve como JPEG. Rechaza si el navegador no la puede leer. */
  function aJpeg(file, lado, calidad) {
    return new Promise((resolve, reject) => {
      if (typeof document === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) { reject(new Error('sin canvas')); return; }
      const url = URL.createObjectURL(file);
      const img = new Image();
      const limpiar = () => { try { URL.revokeObjectURL(url); } catch (e) { /* nada */ } };
      img.onload = () => {
        try {
          const w0 = img.naturalWidth, h0 = img.naturalHeight;
          if (!w0 || !h0) throw new Error('imagen vacía');
          const k = Math.min(1, lado / Math.max(w0, h0));
          const w = Math.max(1, Math.round(w0 * k)), h = Math.max(1, Math.round(h0 * k));
          const cv = document.createElement('canvas');
          cv.width = w; cv.height = h;
          const g = cv.getContext('2d');
          g.fillStyle = '#ffffff';
          g.fillRect(0, 0, w, h);
          g.drawImage(img, 0, 0, w, h);
          cv.toBlob((b) => { limpiar(); b && b.size ? resolve(b) : reject(new Error('no se pudo convertir')); }, 'image/jpeg', calidad);
        } catch (e) { limpiar(); reject(e); }
      };
      img.onerror = () => { limpiar(); reject(new Error('formato no legible')); };
      img.src = url;
    });
  }
  async function prepararArchivo(file) {
    if (!file || typeof file.size !== 'number') throw error('No elegiste ningún archivo.');
    if (file.size === 0) throw error('El archivo está vacío. Probá con otro.');
    const tipo = tipoDe(file);
    if (tipo === 'application/pdf') {
      if (file.size > MAX_ARCHIVO) throw error(MSG_ASSETS.too_large, 'too_large');
      return { blob: file, tipo, nombre: file.name || 'autorizacion.pdf' };
    }
    if (tipo === 'image/heic' || tipo === 'image/heif') {
      const conv = await aJpeg(file, 2000, 0.85).catch(() => null);
      if (!conv) throw error('Ese formato de foto no es compatible, probá con JPG o PDF', 'unsupported_type');
      return { blob: conv, tipo: 'image/jpeg', nombre: conExt(file.name, 'jpg') };
    }
    if (TIPOS_IMG.includes(tipo)) {
      if (file.size > MAX_IMG_SIN_REDUCIR) {
        const conv = await aJpeg(file, 2000, 0.85).catch(() => null);
        if (conv && conv.size < file.size) return { blob: conv, tipo: 'image/jpeg', nombre: conExt(file.name, 'jpg') };
        if (file.size > MAX_ARCHIVO) throw error(MSG_ASSETS.too_large, 'too_large');
      }
      return { blob: file, tipo, nombre: file.name || conExt('autorizacion', tipo.split('/')[1].replace('jpeg', 'jpg')) };
    }
    throw error('Ese tipo de archivo no es compatible. Subí una foto (JPG, PNG o WEBP) o un PDF.', 'unsupported_type');
  }
  function leerDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result || ''));
      fr.onerror = () => reject(error('No se pudo leer el archivo. Probá con otro.'));
      fr.readAsDataURL(blob);
    });
  }
  const SVG_EJEMPLO = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">' +
    '<rect width="600" height="800" fill="#fbfaf7"/>' +
    '<rect x="28" y="28" width="544" height="744" rx="10" fill="none" stroke="#b9b4a8" stroke-width="3" stroke-dasharray="12 8"/>' +
    '<g fill="#d9d5cc"><rect x="80" y="120" width="440" height="14" rx="7"/><rect x="80" y="160" width="380" height="14" rx="7"/>' +
    '<rect x="80" y="200" width="410" height="14" rx="7"/><rect x="80" y="560" width="440" height="14" rx="7"/>' +
    '<rect x="80" y="600" width="300" height="14" rx="7"/></g>' +
    '<text x="300" y="390" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="700" text-anchor="middle" fill="#2b2a27">Licencia</text>' +
    '<text x="300" y="440" font-family="Helvetica, Arial, sans-serif" font-size="30" text-anchor="middle" fill="#6b675f">(ejemplo)</text>' +
    '<path d="M330 700 c30 -40 50 -40 60 -10 s30 20 60 -20 s30 -10 40 10" fill="none" stroke="#2b2a27" stroke-width="3"/>' +
    '<rect x="320" y="715" width="200" height="2" fill="#6b675f"/>' +
    '</svg>');

  /* ------------------------------------------------------------------ estado */
  let A = null;              // adaptador de documentos
  let assetsNs = null;       // namespace de assets (modo db)
  const archivosDemo = new Map();
  const ARCH_KEY = 'pista-karting-demo-archivos';
  function cargarArchivosDemo() {
    try { const o = JSON.parse(window.localStorage.getItem(ARCH_KEY) || '{}'); Object.entries(o).forEach(([k, v]) => archivosDemo.set(k, v)); } catch (e) { /* sin localStorage */ }
  }
  function guardarArchivosDemo() {
    try { const o = {}; archivosDemo.forEach((v, k) => { o[k] = v; }); window.localStorage.setItem(ARCH_KEY, JSON.stringify(o)); } catch (e) { /* sin lugar: queda en memoria */ }
  }
  const ctx = { mode: null, isAdmin: false, uid: null, canUpload: false };
  let initPromise = null;

  async function iniciar() {
    let db = null, user = null, assets = null;
    try {
      const cl = typeof window !== 'undefined' && !window.PK_FORZAR_DEMO ? window.claude : null;
      if (cl && typeof cl.use === 'function') {
        const usar = (n) => conTimeout(Promise.resolve().then(() => cl.use(n)), INIT_TIMEOUT_MS);
        [db, user, assets] = await Promise.all([usar('db'), usar('user'), usar('assets')]);
      }
    } catch (e) { console.warn('Store: no se pudieron cargar las capacidades', e); db = null; }

    if (db) {
      let isAdmin = false, uid = null;
      try { isAdmin = (await conTimeout(user ? user.canEdit() : null, INIT_TIMEOUT_MS)) ?? false; } catch (e) { isAdmin = false; }
      try { uid = (await conTimeout(user ? user.id() : null, INIT_TIMEOUT_MS)) ?? null; } catch (e) { uid = null; }
      A = adaptadorDb(db);
      assetsNs = assets || null;
      Object.assign(ctx, { mode: 'db', isAdmin: !!isAdmin, uid: uid || null, canUpload: !!assets });
    } else {
      A = adaptadorMemoria(cargarDemo());
      assetsNs = null;
      cargarArchivosDemo();
      // Otra pestaña del mismo dispositivo cambió los datos (ej.: inscripción desde el link del competidor)
      try {
        window.addEventListener('storage', (e) => {
          if (e.key === DEMO_KEY && e.newValue) { try { const o = JSON.parse(e.newValue); if (o && o.v === 1) A.recargar(o.docs); } catch (x) { /* nada */ } }
          if (e.key === ARCH_KEY) cargarArchivosDemo();
        });
      } catch (e) { /* sin eventos de storage */ }
      Object.assign(ctx, { mode: 'demo', isAdmin: true, uid: 'demo', canUpload: true });
    }
    return { mode: ctx.mode, isAdmin: ctx.isAdmin, uid: ctx.uid, canUpload: ctx.canUpload };
  }
  function init() { return initPromise || (initPromise = iniciar()); }
  const listo = () => init();

  /* Suscripción a una colección, compartida por clave y diferida hasta que init termine */
  function watchColeccion(clave, colPath, mapear, vacio, cb) {
    return compartir(clave, (emitir, fallar) => {
      let cortar = null, cortado = false;
      listo().then(() => {
        if (cortado) return;
        cortar = A.subscribe(colPath, (docs) => emitir(mapear(docs)), fallar);
      }, fallar);
      return () => { cortado = true; if (cortar) cortar(); };
    }, cb, vacio);
  }

  async function asegurarSinActual(exceptoId) {
    const actuales = await A.list('torneos', ['estado', '==', 'actual']);
    const otro = actuales.find((t) => t.id !== exceptoId);
    if (otro) throw error('Ya hay un torneo en curso: ' + (otro.nombre || 'sin nombre') + '. Finalizalo antes de iniciar otro.', 'torneo_en_curso');
  }
  async function leerTorneo(id) {
    exigirId(id, 'del torneo');
    const t = await A.get('torneos/' + id);
    if (!t) throw error('No se encontró el torneo. Puede que lo hayan borrado.');
    return t;
  }
  const MSG_SIN_PERMISO_INSC = 'No tenés permiso para inscribirte desde esta cuenta. Pedile al organizador acceso como Colaborador.';
  const esCompetidor = () => ctx.mode === 'db' && !ctx.isAdmin;

  /* ------------------------------------------------------------------ API pública */
  const Store = {
    init,
    get mode() { return ctx.mode; },
    get isAdmin() { return ctx.isAdmin; },
    get uid() { return ctx.uid; },
    get canUpload() { return ctx.canUpload; },

    /* ---------- Torneos */
    /* Las planillas finalizadas (con DNI) viven en `resultados/<torneoId>`, que solo lee el admin.
       Para el admin se combinan acá, así las vistas siguen leyendo `torneo.resultados`. */
    watchTorneos(cb) {
      return compartir('torneos', (emitir, fallar) => {
        let torneos = null, res = {}, cortado = false;
        const cortes = [];
        const juntar = () => {
          if (!torneos) return;
          emitir(ordenarTorneos(torneos.map((t) => {
            const r = res[t.id];
            if (!r) return Object.assign({}, t);
            const extra = { resultados: r.resultados };
            if (r.resultadosFechas) extra.resultadosFechas = r.resultadosFechas;
            return Object.assign({}, t, extra);
          })));
        };
        listo().then(() => {
          if (cortado) return;
          cortes.push(A.subscribe('torneos', (docs) => { torneos = docs; juntar(); }, fallar));
          if (esCompetidor()) return;
          cortes.push(A.subscribe('resultados', (docs) => {
            res = {};
            docs.forEach((d) => { if (d && d.resultados) res[d.id] = d; });
            juntar();
          }, fallar));
        }, fallar);
        return () => { cortado = true; cortes.forEach((f) => f()); };
      }, cb, () => []);
    },
    torneoActual,
    torneoInscripcion,
    fechasDe,
    MAX_FECHAS,
    categoriasDe,
    claveTiempo,
    tiempoDoc,

    async guardarTorneo(t) {
      await listo();
      const id = t && t.id ? String(t.id) : null;
      let datos = sinId(t || {});
      delete datos.resultados;
      delete datos.resultadosFechas;
      if (Array.isArray(datos.fechas)) {
        datos.fechas = datos.fechas.filter((f) => typeof f === 'string' && f).slice(0, MAX_FECHAS);
        if (datos.fechas.length) datos.fecha = datos.fechas[0];
      }
      if (id) {
        exigirId(id, 'del torneo');
        // Reemplazo: lo que no venga en `t` (estado, resultados, creado, ejemplo…) se conserva.
        const previo = await A.get('torneos/' + id);
        if (previo) { delete previo.id; datos = Object.assign(previo, datos); }
      }
      if (!datos.estado) datos.estado = 'proximo';
      if (!datos.creado) datos.creado = nowISO();
      if (!Array.isArray(datos.categorias)) datos.categorias = [];
      if (datos.notas == null) datos.notas = '';
      if (datos.estado === 'actual') await asegurarSinActual(id);
      const nid = id || A.newId('torneos');
      await A.set('torneos/' + nid, datos);
      return nid;
    },

    async borrarTorneo(id) {
      await listo();
      exigirId(id, 'del torneo');
      const tiempos = await A.list('torneos/' + id + '/tiempos');
      await enLotes(tiempos, (t) => A.del('torneos/' + id + '/tiempos/' + t.id));
      const puntos = await A.list('torneos/' + id + '/puntos');
      await enLotes(puntos, (t) => A.del('torneos/' + id + '/puntos/' + t.id));
      const inscs = await A.list('inscripciones', ['torneoId', '==', id]);
      await enLotes(inscs, (i) => A.del('inscripciones/' + i.id));
      await A.del('resultados/' + id);
      await A.del('torneos/' + id);
    },

    async iniciarTorneo(id) {
      await listo();
      const t = await leerTorneo(id);
      await asegurarSinActual(id);
      if (t.estado === 'actual') return;
      const datos = sinId(t);
      datos.estado = 'actual';
      delete datos.finalizado;
      delete datos.resultados;
      delete datos.resultadosFechas;
      await A.set('torneos/' + id, datos);
      await A.del('resultados/' + id);
    },

    async finalizarTorneo(id) {
      await listo();
      const t = await leerTorneo(id);
      const [inscs, lista, listaPuntos] = await Promise.all([
        A.list('inscripciones', ['torneoId', '==', id]),
        A.list('torneos/' + id + '/tiempos'),
        A.list('torneos/' + id + '/puntos'),
      ]);
      const tiempos = {};
      lista.forEach((x) => { tiempos[x.id] = x; });
      const puntos = {};
      listaPuntos.forEach((x) => { puntos[x.id] = x; });
      const datos = sinId(t);
      delete datos.resultados;
      delete datos.resultadosFechas;
      // Con planillas de puntos (fotos de resultados) se usan esas; si no, los tiempos (torneos viejos)
      const armar = listaPuntos.length ? (n) => resultadosPorPuntos(t, inscs, puntos, n) : (n) => armarResultados(t, inscs, tiempos, n);
      const planilla = { resultados: armar(1) };
      const nFechas = fechasDe(t).length;
      if (nFechas > 1) {
        planilla.resultadosFechas = {};
        for (let n = 1; n <= nFechas; n++) planilla.resultadosFechas[n] = armar(n);
      }
      if (t.ejemplo) planilla.ejemplo = true;
      await A.set('resultados/' + id, planilla);
      datos.estado = 'finalizado';
      datos.finalizado = nowISO();
      await A.set('torneos/' + id, datos);
    },

    /* ---------- Inscripciones */
    watchInscripciones(cb) {
      return watchColeccion('inscripciones', 'inscripciones', ordenarInscripciones, () => [], cb);
    },

    /* Con `datos.invitadoNuevo` ({ nombre, apellido, dni, …, categorias }) el competidor suma un invitado que corre con su kart:
       se crea una segunda inscripción marcada como invitado, con el mismo número de kart y `invitadoDe` = id del competidor. */
    async inscribir(datos) {
      await listo();
      const d = sinId(datos || {});
      const inv = esObjeto(d.invitadoNuevo) ? d.invitadoNuevo : null;
      delete d.invitadoNuevo;
      const ahora = nowISO();
      d.creado = ahora;
      d.actualizado = ahora;
      let id;
      if (esCompetidor()) {
        if (!ctx.uid) throw error('Tenés que iniciar sesión en claude.ai para inscribirte.', 'sin_sesion');
        id = ctx.uid;
        delete d.ejemplo;
        try { const previa = await A.get('inscripciones/' + id); if (previa && previa.creado) d.creado = previa.creado; } catch (e) { /* sigue */ }
      } else {
        id = A.newId('inscripciones');
      }
      const escribir = async (path, doc) => {
        try {
          await A.set(path, doc);
        } catch (e) {
          if (e && e.code === 'invalid_argument') throw error(MSG_SIN_PERMISO_INSC, 'invalid_argument');
          if (e && e.code === 'quota_exceeded') throw error('No se pudo guardar la inscripción porque la base de datos está llena. Avisale al organizador.', 'quota_exceeded');
          throw e;
        }
      };
      await escribir('inscripciones/' + id, d);
      if (inv) {
        const id2 = esCompetidor() ? id + '-invitado' : A.newId('inscripciones');
        const d2 = Object.assign({}, plano(inv), {
          torneoId: d.torneoId, nroKarting: d.nroKarting, invitado: true, invitadoDe: id,
          licenciaDeportiva: null, licenciaMedica: null,
          declaracion: d.declaracion || null, creado: ahora, actualizado: ahora,
        });
        await escribir('inscripciones/' + id2, d2);
      }
      return id;
    },

    async miInscripcion() {
      await listo();
      if (!esCompetidor() || !ctx.uid) return null;
      try { return await A.get('inscripciones/' + ctx.uid); } catch (e) { console.warn('Store.miInscripcion', e); return null; }
    },

    async actualizarInscripcion(id, cambios) {
      await listo();
      exigirId(id, 'de la inscripción');
      const d = sinId(cambios || {});
      d.actualizado = nowISO();
      try {
        await A.update('inscripciones/' + id, d);
      } catch (e) {
        if (e && e.code === 'invalid_argument' && esCompetidor()) throw error(MSG_SIN_PERMISO_INSC, 'invalid_argument');
        throw e;
      }
    },

    async borrarInscripcion(id) {
      await listo();
      exigirId(id, 'de la inscripción');
      const previa = await A.get('inscripciones/' + id);
      if (previa && idValido(previa.torneoId)) {
        const tiempos = await A.list('torneos/' + previa.torneoId + '/tiempos');
        await enLotes(tiempos.filter((t) => t.id === id || t.id.indexOf(id + '__') === 0), (t) => A.del('torneos/' + previa.torneoId + '/tiempos/' + t.id));
      }
      await A.del('inscripciones/' + id);
    },

    /* ---------- Tiempos */
    watchTiempos(torneoId, cb) {
      if (!idValido(torneoId)) {
        if (typeof cb === 'function') microtarea(() => cb({}));
        return function unsubscribe() {};
      }
      return watchColeccion('tiempos:' + torneoId, 'torneos/' + torneoId + '/tiempos', (docs) => {
        const o = {};
        docs.forEach((x) => {
          const fechas = {};
          for (let n = 1; n <= MAX_FECHAS; n++) fechas[n] = tiempoDeFecha(x, n);
          o[x.id] = { tiempo: fechas[1].tiempo, ok: fechas[1].ok, fechas };
        });
        return o;
      }, () => ({}), cb);
    },

    /* inscId: clave de la fila ('<inscId>__<categoría>'). n: número de fecha. Las otras fechas se conservan.
       legado: id del documento viejo (sin categoría) del que se toman los tiempos la primera vez. */
    async guardarTiempo(torneoId, inscId, valor, n, legado) {
      await listo();
      exigirId(torneoId, 'del torneo');
      exigirId(inscId, 'de la inscripción');
      n = Math.min(MAX_FECHAS, Math.max(1, Math.floor(+n || 1)));
      const v = valor || {};
      const path = 'torneos/' + torneoId + '/tiempos/' + inscId;
      let previo = await A.get(path);
      if (!previo && legado && idValido(legado)) previo = await A.get('torneos/' + torneoId + '/tiempos/' + legado);
      const doc = { tiempo: null, ok: false };
      for (let k = 1; k <= MAX_FECHAS; k++) {
        const x = tiempoDeFecha(previo, k);
        if (k === 1) Object.assign(doc, x);
        else if (previo && previo['f' + k]) doc['f' + k] = x;
      }
      const datos = tiempoDeFecha(previo, n);
      if ('tiempo' in v) datos.tiempo = aTiempo(v.tiempo);
      if ('ok' in v) datos.ok = !!v.ok;
      if (n === 1) Object.assign(doc, datos); else doc['f' + n] = datos;
      await A.set(path, doc);
    },

    /* ---------- Puntos (resultados por foto) */
    clavePuntos,
    watchPuntos(torneoId, cb) {
      if (!idValido(torneoId)) {
        if (typeof cb === 'function') microtarea(() => cb({}));
        return function unsubscribe() {};
      }
      return watchColeccion('puntos:' + torneoId, 'torneos/' + torneoId + '/puntos', (docs) => {
        const o = {};
        docs.forEach((x) => { o[x.id] = x; });
        return o;
      }, () => ({}), cb);
    },
    async guardarPuntos(torneoId, n, categoria, planilla) {
      await listo();
      exigirId(torneoId, 'del torneo');
      const filas = (planilla.filas || []).map((f) => ({
        posicion: f.posicion == null || f.posicion === '' ? null : Math.round(+f.posicion),
        kart: String(f.kart || ''), nombre: String(f.nombre || ''),
        puntos: f.puntos == null || f.puntos === '' ? null : +f.puntos,
        inscId: f.inscId || null,
      }));
      await A.set('torneos/' + torneoId + '/puntos/' + clavePuntos(n, categoria),
        { fecha: n, categoria, filas, foto: planilla.foto || null, actualizado: nowISO() });
    },
    async borrarPuntos(torneoId, n, categoria) {
      await listo();
      exigirId(torneoId, 'del torneo');
      await A.del('torneos/' + torneoId + '/puntos/' + clavePuntos(n, categoria));
    },

    /* ---------- Archivos */
    async subirArchivo(file) {
      await listo();
      if (ctx.mode === 'demo') {
        let p = await prepararArchivo(file);
        if (/^image\//.test(p.tipo)) { const chica = await aJpeg(p.blob, 1200, 0.75).catch(() => null); if (chica && chica.size < p.blob.size) p = { blob: chica, tipo: 'image/jpeg', nombre: conExt(p.nombre, 'jpg') }; }
        const url = await leerDataUrl(p.blob);
        const assetId = 'demo-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        archivosDemo.set(assetId, url);
        guardarArchivosDemo();
        return { assetId, nombre: p.nombre, tipo: p.tipo, tamano: p.blob.size };
      }
      if (!assetsNs) throw error(MSG_ASSETS.not_granted, 'not_granted');
      const p = await prepararArchivo(file);
      let r;
      try {
        r = await assetsNs.upload(p.blob, { type: p.tipo });
      } catch (e) {
        if (!(e && e.code === 'store_unavailable')) throw errorAsset(e);
        await espera(800 + Math.random() * 700);
        try { r = await assetsNs.upload(p.blob, { type: p.tipo }); } catch (e2) { throw errorAsset(e2); }
      }
      return { assetId: r.id, nombre: p.nombre, tipo: r.contentType || p.tipo, tamano: typeof r.sizeBytes === 'number' ? r.sizeBytes : p.blob.size };
    },

    urlArchivo(assetId) {
      if (!assetId || typeof assetId !== 'string') return '';
      if (/^ejemplo/.test(assetId)) return SVG_EJEMPLO;
      if (ctx.mode !== 'db' || /^demo-/.test(assetId)) return archivosDemo.get(assetId) || '';
      return '/_blob/' + assetId;
    },

    /* ---------- Utilidades */
    async borrarEjemplos() {
      await listo();
      const torneos = await A.list('torneos', ['ejemplo', '==', true]);
      for (const t of torneos) {
        const tiempos = await A.list('torneos/' + t.id + '/tiempos');
        await enLotes(tiempos, (x) => A.del('torneos/' + t.id + '/tiempos/' + x.id));
      }
      const inscs = await A.list('inscripciones', ['ejemplo', '==', true]);
      await enLotes(inscs, (i) => A.del('inscripciones/' + i.id));
      await enLotes(torneos, (t) => A.del('resultados/' + t.id));
      await enLotes(torneos, (t) => A.del('torneos/' + t.id));
      return { torneos: torneos.length, inscripciones: inscs.length };
    },

    posiciones,
  };

  window.Store = Store;
})();
