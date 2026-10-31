/* Torneo actual: una tarjeta por fecha; en cada fecha, los resultados de cada categoría se cargan con una foto de la planilla.
   La foto se lee (App.leerResultados), se arma una tabla con puesto, kart, piloto y puntos asignada a los inscriptos,
   el organizador la revisa y la guarda. También se puede cargar o corregir a mano. */
(function () {
  const h = App.h;

  App.css(`
.v-torneo-actual { display: flex; flex-direction: column; gap: 24px; }
.v-torneo-actual .ta-head-main { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.v-torneo-actual .ta-head-main h1 { overflow-wrap: anywhere; }
.v-torneo-actual .ta-meta { display: flex; gap: 8px 12px; align-items: center; flex-wrap: wrap; color: var(--ink-2); }
.v-torneo-actual .ta-fechas { display: flex; flex-direction: column; gap: 16px; }
.v-torneo-actual .ta-fblk { border: 1px solid var(--line); border-radius: 10px; background: var(--surface); padding: 16px; display: flex; flex-direction: column; gap: 16px; scroll-margin-top: 96px; }
.v-torneo-actual .ta-fblk.activa { border: 2px solid var(--accent); box-shadow: 0 0 0 4px rgba(215,20,28,.12); }
.v-torneo-actual .ta-fblk-head { display: flex; gap: 8px 14px; align-items: center; flex-wrap: wrap; }
.v-torneo-actual .ta-fblk-n { font: 800 1.5rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .02em; }
.v-torneo-actual .ta-fblk-dia { color: var(--ink-2); }
.v-torneo-actual .ta-fblk-podios { display: grid; gap: 12px 20px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.v-torneo-actual .ta-fblk-cat { border-top: 3px solid var(--accent); padding-top: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.v-torneo-actual .ta-fblk-p { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
.v-torneo-actual .ta-fblk-pos { font: 700 .8rem/1 var(--font-display); color: var(--accent-text); width: 22px; flex: none; }
.v-torneo-actual .ta-fblk-nom { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.v-torneo-actual .ta-cats { display: flex; flex-direction: column; gap: 14px; }
.v-torneo-actual .ta-cat { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-2); padding: 14px; display: flex; flex-direction: column; gap: 12px; }
.v-torneo-actual .ta-cat-head { display: flex; gap: 8px 12px; align-items: center; flex-wrap: wrap; }
.v-torneo-actual .ta-cat-head h2 { font-size: 1.2rem; }
.v-torneo-actual .ta-cat-acts { display: flex; gap: 8px; flex-wrap: wrap; }
.v-torneo-actual .ta-inscs { display: flex; flex-wrap: wrap; gap: 6px 14px; color: var(--ink-2); font-size: .9rem; }
.v-torneo-actual .ta-inscs span { display: inline-flex; gap: 6px; align-items: center; }
.v-torneo-actual .ta-tbl td.pos { width: 56px; font: 700 1.1rem/1 var(--font-display); }
.v-torneo-actual .ta-tbl td.pts { font: 800 1.15rem/1 var(--font-display); text-align: right; font-variant-numeric: tabular-nums; }
.v-torneo-actual .ta-tbl th.pts { text-align: right; }
.v-torneo-actual .ta-foto { width: 56px; height: 56px; object-fit: cover; border-radius: 4px; border: 1px solid var(--line); cursor: zoom-in; }
.v-torneo-actual-confirm ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px; }
.v-torneo-actual-confirm .ta-c-warn { color: var(--warn); font-weight: 600; }

.ta-editor { display: flex; flex-direction: column; gap: 14px; }
.ta-editor .ta-ed-top { display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
.ta-editor .ta-ed-top img { width: 120px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid var(--line); background: #000; cursor: zoom-in; }
.ta-editor .ta-ed-info { flex: 1 1 220px; display: flex; flex-direction: column; gap: 6px; font-size: .92rem; color: var(--ink-2); }
.ta-editor table { width: 100%; border-collapse: collapse; }
.ta-editor th { text-align: left; font: 700 .75rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .06em; color: var(--ink-3); padding: 6px 4px; }
.ta-editor td { padding: 4px; vertical-align: middle; }
.ta-editor input, .ta-editor select { min-height: 38px; padding: 6px 8px; font-size: .92rem; }
.ta-editor .c-pos { width: 56px; } .ta-editor .c-kart { width: 64px; } .ta-editor .c-pts { width: 70px; }
.ta-editor .c-nom { min-width: 150px; } .ta-editor .c-ins { min-width: 170px; }
.ta-editor input.pts-dudoso { border-color: var(--warn); outline: 2px solid var(--warn); }
.ta-editor tr.sin-asignar select { border-color: var(--danger); outline: 1px solid var(--danger); }
.ta-editor .ta-ed-wrap { overflow-x: auto; }
.ta-progreso { display: flex; flex-direction: column; gap: 10px; }
.ta-progreso .barra { height: 8px; border-radius: 99px; background: var(--surface-2); overflow: hidden; }
.ta-progreso .barra i { display: block; height: 100%; background: var(--accent); width: 0; transition: width .2s; }
@media (max-width: 640px) {
  .v-torneo-actual .page-head .actions { width: 100%; }
  .v-torneo-actual .page-head .actions .btn { flex: 1; }
  .v-torneo-actual .ta-fblk { padding: 12px; }
  .v-torneo-actual .ta-fblk-n { font-size: 1.3rem; }
}
`);

  const pl = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const norm = (s) => App.fmt.norm(s).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

  function callUnsub(u) {
    try {
      if (typeof u === 'function') u();
      else if (u && typeof u.then === 'function') u.then(f => { if (typeof f === 'function') f(); });
    } catch (e) { console.error(e); }
  }
  function hoyISO() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* Asignación de la planilla: todos los que aparecen en la foto están inscriptos (si no, no corren).
     Cada fila se asigna al inscripto más parecido (apellido, nombre y kart), sin repetir, empezando por los pares más seguros. */
  function distancia(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  const palabras = (t) => norm(t).split(' ').filter(w => w.length > 1);
  const parecido = (x, y) => (!x || !y) ? 0 : 1 - distancia(x, y) / Math.max(x.length, y.length);
  const mejorParecido = (ws, texto) => { const ys = palabras(texto); let m = 0; ws.forEach(w => ys.forEach(y => { m = Math.max(m, parecido(w, y)); })); return m; };
  const mismoKart = (fila, i) => { const k = String(fila.kart || '').replace(/^0+/, ''); return !!k && String(i.nroKarting || '').replace(/^0+/, '') === k; };
  /* En la planilla el nombre viene "Apellido Nombre" */
  function puntaje(fila, i) {
    const ws = palabras(fila.nombre);
    const ape = mejorParecido(ws.slice(0, 1), i.apellido);
    const nom = mejorParecido(ws.slice(1), i.nombre);
    return ape * 2 + nom + (mismoKart(fila, i) ? 1.5 : 0);
  }
  function asignarTodas(filas, enCat, otros) {
    const res = filas.map(() => null);
    const usados = new Set();
    function ronda(cands, minimo) {
      const pares = [];
      filas.forEach((f, k) => { if (res[k]) return; cands.forEach(i => { if (!usados.has(i.id)) pares.push({ k, i, p: puntaje(f, i) }); }); });
      pares.sort((a, b) => b.p - a.p);
      pares.forEach(({ k, i, p }) => { if (p >= minimo && !res[k] && !usados.has(i.id)) { res[k] = i; usados.add(i.id); } });
    }
    ronda(enCat, 1.2);   // coincidencia clara dentro de la categoría
    ronda(enCat, 0.3);   // el resto, al más parecido de la categoría
    ronda(otros, 2.2);   // si sobran filas: alguien de otra categoría que coincida bien
    return res;
  }

  App.view('torneo-actual', {
    title: 'Torneo actual',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      const root = h('div', { class: 'v-torneo-actual' }, h('p', { class: 'loading' }, 'Cargando torneo…'));
      el.appendChild(root);

      let torneos = null, inscs = null, puntos = {};
      let torneo = null, puntosDe = null, unsubPuntos = null;
      let nFecha = null, fechaParaTorneo = null;

      const u1 = S.watchTorneos((list) => { torneos = list || []; dibujar(); });
      ctx.onCleanup(() => callUnsub(u1));
      const u2 = S.watchInscripciones((list) => { inscs = list || []; dibujar(); });
      ctx.onCleanup(() => callUnsub(u2));
      ctx.onCleanup(() => { callUnsub(unsubPuntos); unsubPuntos = null; });

      function suscribirPuntos(id) {
        callUnsub(unsubPuntos);
        puntos = {}; puntosDe = id; unsubPuntos = null;
        if (!id) return;
        unsubPuntos = S.watchPuntos(id, (map) => { if (puntosDe !== id) return; puntos = map || {}; dibujar(); });
      }

      const catsDe = (i) => S.categoriasDe(i);
      const delTorneo = () => inscs.filter(i => i.torneoId === torneo.id);
      const inscDeCat = (cat) => delTorneo().filter(i => catsDe(i).includes(cat));
      const planilla = (n, cat) => puntos[S.clavePuntos(n, cat)] || null;
      const nombreInsc = (id) => { const i = inscs.find(x => x.id === id); return i ? App.fmt.nombre(i) : ''; };

      /* Categorías que se muestran en una fecha: las que tienen anotados o resultados cargados */
      function categoriasFecha(n) {
        return (torneo.categorias || []).map(c => c.nombre).filter(c => inscDeCat(c).length || planilla(n, c));
      }
      function fechaInicial(t) {
        const fs = App.fmt.fechasInfo(t), hoy = hoyISO();
        let n = 1;
        fs.forEach((f, k) => { if (f.desde <= hoy) n = k + 1; });
        return n;
      }

      function dibujar() {
        if (!ctx.isCurrent() || torneos == null) return;
        const t = S.torneoActual(torneos);
        if (!t) { if (puntosDe) suscribirPuntos(null); torneo = null; return vacio(); }
        torneo = t;
        if (puntosDe !== t.id) suscribirPuntos(t.id);
        if (fechaParaTorneo !== t.id) { fechaParaTorneo = t.id; nFecha = fechaInicial(t); }
        if (inscs == null) { root.replaceChildren(h('p', { class: 'loading' }, 'Cargando competidores…')); return; }
        root.replaceChildren(cabecera(), h('div', { class: 'ta-fechas' }, bloquesFechas()));
      }

      function vacio() {
        root.replaceChildren(
          h('div', { class: 'page-head' }, h('div', { class: 'ta-head-main' }, h('span', { class: 'eyebrow' }, 'Torneo actual'), h('h1', null, 'Sin torneo en curso'))),
          h('div', { class: 'empty' },
            h('strong', null, 'No hay un torneo en curso'),
            h('span', null, 'Elegí un torneo programado e inicialo para cargar los resultados.'),
            h('a', { class: 'btn btn-primary', href: '#proximos-torneos' }, 'Ir a Próximos torneos')));
      }

      function cabecera() {
        const t = torneo;
        const btn = h('button', { type: 'button', class: 'btn btn-dark', onclick: () => finalizar(btn) }, 'Finalizar torneo');
        return h('div', { class: 'page-head' },
          h('div', { class: 'ta-head-main' },
            h('span', { class: 'eyebrow' }, 'Torneo actual'),
            h('h1', null, t.nombre || 'Torneo sin nombre'),
            h('div', { class: 'ta-meta' },
              h('span', null, App.fmt.fechasTexto(t, true) + (t.lugar ? ' · ' + t.lugar : '')),
              h('span', { class: 'pill pill-live' }, 'En curso'),
              h('span', null, pl(delTorneo().length, 'piloto anotado', 'pilotos anotados')))),
          h('div', { class: 'actions' }, btn));
      }

      /* ---------- Fechas ---------- */
      const numeroDe = (n) => { const f = App.fmt.fechasInfo(torneo)[n - 1]; return f ? f.numero : n; };
      const filasOrdenadas = (p) => (p.filas || []).slice().sort((a, b) => (a.posicion == null) - (b.posicion == null) || (a.posicion || 0) - (b.posicion || 0));

      function bloquesFechas() {
        const fs = App.fmt.fechasInfo(torneo);
        const lista = fs.length ? fs : [{ n: 1, numero: 1, dias: [], desde: '' }];
        if (nFecha == null || nFecha > lista.length) nFecha = 1;
        const hoy = hoyISO();
        return lista.map((fi, k) => {
          const n = k + 1, activa = n === nFecha, f = fi.desde;
          const cats = categoriasFecha(n);
          const conRes = cats.filter(c => planilla(n, c)).length;
          const estado = conRes
            ? h('span', { class: 'pill ' + (conRes === cats.length ? 'pill-ok' : 'pill-warn') }, conRes + ' de ' + cats.length + ' categorías con resultados')
            : f && f > hoy ? h('span', { class: 'pill' }, 'Próxima') : h('span', { class: 'pill' }, 'Sin resultados');
          const cab = h('div', { class: 'ta-fblk-head' },
            h('span', { class: 'ta-fblk-n' }, 'Fecha ' + fi.numero),
            fi.dias.length ? h('span', { class: 'ta-fblk-dia' }, App.fmt.diasTexto(fi.dias, true)) : null,
            estado,
            h('span', { class: 'spacer' }),
            activa ? null : h('button', { type: 'button', class: 'btn btn-sm btn-dark', onclick: () => {
              nFecha = n; dibujar();
              setTimeout(() => { const b = root.querySelector('.ta-fblk.activa'); b && b.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 0);
            } }, conRes ? 'Ver y editar resultados' : 'Cargar resultados'));
          if (activa) {
            return h('section', { class: 'ta-fblk activa', 'aria-label': 'Fecha ' + fi.numero }, cab,
              cats.length ? h('div', { class: 'ta-cats' }, cats.map(c => tarjetaCategoria(n, c)))
                : h('div', { class: 'empty' }, h('strong', null, 'Todavía no hay competidores anotados'), h('span', null, 'Compartí el link de inscripción o agregalos desde Competidores.')));
          }
          const cuerpo = conRes
            ? h('div', { class: 'ta-fblk-podios' }, cats.filter(c => planilla(n, c)).map(c => h('div', { class: 'ta-fblk-cat' },
                h('span', { class: 'eyebrow' }, c),
                filasOrdenadas(planilla(n, c)).slice(0, 3).map(r => h('div', { class: 'ta-fblk-p' },
                  h('span', { class: 'ta-fblk-pos' }, 'P' + (r.posicion || '—')),
                  h('span', { class: 'ta-fblk-nom' }, r.inscId ? nombreInsc(r.inscId) || r.nombre : r.nombre),
                  h('span', { class: 'mono small' }, r.puntos == null ? '—' : r.puntos + ' pts'))))))
            : h('p', { class: 'muted small' }, f && f > hoy ? 'Todavía no se corrió.' : 'No hay resultados cargados en esta fecha.');
          return h('section', { class: 'ta-fblk', 'aria-label': 'Fecha ' + fi.numero }, cab, cuerpo);
        });
      }

      /* ---------- Una categoría de la fecha ---------- */
      function tarjetaCategoria(n, cat) {
        const p = planilla(n, cat);
        const anotados = inscDeCat(cat);
        const fileIn = h('input', { type: 'file', accept: 'image/*', hidden: true, 'aria-label': 'Foto de resultados de ' + cat });
        fileIn.addEventListener('change', () => { const f = fileIn.files && fileIn.files[0]; fileIn.value = ''; if (f) leerFoto(n, cat, f); });
        const btnFoto = h('button', { type: 'button', class: 'btn btn-sm ' + (p ? '' : 'btn-primary'), onclick: () => fileIn.click() }, p ? 'Cambiar foto' : 'Subir foto de resultados');
        const urlFoto = p && p.foto && p.foto.assetId ? S.urlArchivo(p.foto.assetId) : '';
        const cab = h('div', { class: 'ta-cat-head' },
          h('h2', null, cat),
          h('span', { class: 'muted' }, pl(anotados.length, 'anotado', 'anotados')),
          p ? h('span', { class: 'pill pill-ok' }, 'Con resultados') : h('span', { class: 'pill' }, 'Sin resultados'),
          h('span', { class: 'spacer' }),
          urlFoto ? h('img', { class: 'ta-foto', src: urlFoto, alt: 'Foto de resultados de ' + cat, title: 'Ver foto', onclick: () => verFoto(urlFoto, cat) }) : null);
        const acts = h('div', { class: 'ta-cat-acts' }, btnFoto, fileIn,
          h('button', { type: 'button', class: 'btn btn-sm btn-ghost', onclick: () => editor(n, cat, p ? p.filas : null, p ? p.foto : null, null) }, p ? 'Editar' : 'Cargar a mano'),
          p ? h('button', { type: 'button', class: 'btn btn-sm btn-danger', onclick: () => borrar(n, cat) }, 'Borrar resultados') : null);
        if (!p) {
          return h('section', { class: 'ta-cat', 'aria-label': cat }, cab,
            anotados.length ? h('div', { class: 'ta-inscs' }, anotados.slice().sort((a, b) => String(a.nroKarting).localeCompare(String(b.nroKarting), 'es', { numeric: true }))
              .map(i => h('span', null, h('span', { class: 'kart-no' }, i.nroKarting || '—'), App.fmt.nombre(i), i.invitado ? h('span', { class: 'pill pill-inv' }, 'Invitado') : null))) : null,
            acts);
        }
        return h('section', { class: 'ta-cat', 'aria-label': cat }, cab,
          h('div', { class: 'table-wrap' }, h('table', { class: 'tbl ta-tbl' },
            h('thead', null, h('tr', null, h('th', { class: 'center' }, 'Pos'), h('th', null, 'Kart'), h('th', null, 'Piloto'), h('th', { class: 'pts' }, 'Puntos'))),
            h('tbody', null, filasOrdenadas(p).map(r => {
              const i = r.inscId ? inscs.find(x => x.id === r.inscId) : null;
              return h('tr', null,
                h('td', { class: 'center pos' }, r.posicion == null ? '—' : String(r.posicion)),
                h('td', null, h('span', { class: 'kart-no' }, r.kart || (i && i.nroKarting) || '—')),
                h('td', null, i ? [App.fmt.nombre(i), i.invitado ? [' ', h('span', { class: 'pill pill-inv' }, 'Invitado')] : null] : (r.nombre || 'Sin nombre')),
                h('td', { class: 'pts' }, r.puntos == null ? '—' : String(r.puntos)));
            })))),
          acts);
      }

      function verFoto(url, cat) {
        App.modal({ title: 'Resultados · ' + cat, content: h('img', { src: url, alt: 'Foto de resultados', style: { width: '100%', borderRadius: '6px' } }), actions: [{ label: 'Cerrar', kind: 'ghost' }] });
      }

      async function borrar(n, cat) {
        const ok = await App.confirm({ title: 'Borrar resultados', body: 'Se borran los resultados de ' + cat + ' en la Fecha ' + numeroDe(n) + '. Después podés volver a subir la foto.', okLabel: 'Borrar', danger: true });
        if (!ok) return;
        try { await S.borrarPuntos(torneo.id, n, cat); App.toast('Resultados borrados', 'ok'); }
        catch (e) { App.toast('No se pudo borrar: ' + (e && e.message || e), 'error'); }
      }

      /* ---------- Leer la foto ---------- */
      async function leerFoto(n, cat, file) {
        const barra = h('i');
        const estado = h('span', null, 'Preparando el lector…');
        const m = App.modal({ title: 'Leyendo la foto', content: h('div', { class: 'ta-progreso' }, estado, h('div', { class: 'barra' }, barra),
          h('p', { class: 'muted small' }, 'La primera vez tarda un poco más: se descarga el lector.')) });
        const ESTADOS = { 'loading tesseract core': 'Cargando el lector…', 'loading language traineddata': 'Cargando el idioma…', 'initializing api': 'Preparando…', 'recognizing text': 'Leyendo la foto…' };
        try {
          const subida = S.subirArchivo(file).catch((e) => { console.warn('No se pudo guardar la foto', e); return null; });
          const r = await App.leerResultados(file, (st, p) => { estado.textContent = ESTADOS[st] || 'Leyendo…'; barra.style.width = Math.round(p * 100) + '%'; });
          const foto = await subida;
          m.close();
          if (!r.filas.length) App.toast('No se pudieron leer filas en la foto. Cargalas a mano o probá con otra foto.', 'error');
          editor(n, cat, null, foto, r);
        } catch (e) {
          console.error(e);
          m.close();
          App.toast(e && e.message ? e.message : 'No se pudo leer la foto.', 'error');
        }
      }

      /* ---------- Revisar y guardar ---------- */
      function editor(n, cat, filasGuardadas, foto, lectura) {
        const candidatos = delTorneo().slice().sort((a, b) => (catsDe(b).includes(cat) - catsDe(a).includes(cat)) || App.fmt.nombre(a).localeCompare(App.fmt.nombre(b), 'es'));
        let filas;
        if (lectura) {
          const asignados = asignarTodas(lectura.filas, candidatos.filter(c => catsDe(c).includes(cat)), candidatos.filter(c => !catsDe(c).includes(cat)));
          filas = lectura.filas.map((f, k) => Object.assign({}, f, { inscId: asignados[k] ? asignados[k].id : null }));
        } else {
          filas = (filasGuardadas || []).map(f => Object.assign({}, f));
        }
        if (!filas.length) filas = [{ posicion: 1, kart: '', nombre: '', puntos: null, inscId: null }];

        const tbody = h('tbody');
        const filasUI = [];
        const enCat = candidatos.filter(c => catsDe(c).includes(cat)), otros = candidatos.filter(c => !catsDe(c).includes(cat));
        const etiqueta = (c) => (c.nroKarting ? '#' + c.nroKarting + ' · ' : '') + App.fmt.nombre(c) + (c.invitado ? ' (invitado)' : '');
        function opcionesInsc(sel) {
          const s = h('select', { 'aria-label': 'Competidor' }, h('option', { value: '' }, '— Elegí el competidor —'),
            enCat.length ? h('optgroup', { label: cat }, enCat.map(c => h('option', { value: c.id }, etiqueta(c)))) : null,
            otros.length ? h('optgroup', { label: 'Otras categorías' }, otros.map(c => h('option', { value: c.id }, etiqueta(c)))) : null);
          s.value = sel || '';
          return s;
        }
        function agregar(f) {
          const r = {
            pos: h('input', { type: 'number', min: '1', inputmode: 'numeric', value: f.posicion == null ? '' : String(f.posicion), 'aria-label': 'Puesto' }),
            kart: h('input', { type: 'text', inputmode: 'numeric', value: f.kart || '', 'aria-label': 'Kart' }),
            nom: h('input', { type: 'text', value: f.nombre || '', 'aria-label': 'Nombre en la foto' }),
            ins: opcionesInsc(f.inscId),
            pts: h('input', { type: 'number', inputmode: 'decimal', value: f.puntos == null ? '' : String(f.puntos), 'aria-label': 'Puntos' }),
          };
          r.tr = h('tr', { class: f.inscId ? null : 'sin-asignar' },
            h('td', { class: 'c-pos' }, r.pos), h('td', { class: 'c-kart' }, r.kart), h('td', { class: 'c-nom' }, r.nom), h('td', { class: 'c-ins' }, r.ins), h('td', { class: 'c-pts' }, r.pts),
            h('td', null, h('button', { type: 'button', class: 'btn btn-ghost btn-sm', 'aria-label': 'Quitar fila', onclick: () => { filasUI.splice(filasUI.indexOf(r), 1); r.tr.remove(); } }, '✕')));
          r.ins.addEventListener('change', () => r.tr.classList.toggle('sin-asignar', !r.ins.value));
          r.pts.addEventListener('input', marcarPuntos);
          r.pos.addEventListener('input', marcarPuntos);
          filasUI.push(r); tbody.appendChild(r.tr);
        }
        /* En la tabla los puntos bajan con el puesto: el que no respeta ese orden probablemente se leyó mal (ej. "3" en vez de "31") */
        function marcarPuntos() {
          const orden = filasUI.filter(r => r.pos.value !== '' && r.pts.value !== '').sort((a, b) => +a.pos.value - +b.pos.value);
          let dudosos = 0;
          filasUI.forEach(r => r.pts.classList.remove('pts-dudoso'));
          orden.forEach((r, i) => {
            const v = +r.pts.value, ant = orden[i - 1], sig = orden[i + 1];
            if ((ant && v > +ant.pts.value) || (sig && v < +sig.pts.value)) {
              // de un par que no respeta el orden, se marca el que rompe la serie
              const malo = ant && v > +ant.pts.value && (!orden[i - 2] || +orden[i - 2].pts.value >= v) ? ant : r;
              if (!malo.pts.classList.contains('pts-dudoso')) { malo.pts.classList.add('pts-dudoso'); malo.pts.title = 'Revisá estos puntos: no siguen el orden de la tabla'; dudosos++; }
            }
          });
          if (avisoPts) avisoPts.hidden = !dudosos;
        }
        let avisoPts = null;
        filas.forEach(agregar);

        const asignadas = filas.filter(f => f.inscId).length;
        const urlFoto = foto && foto.assetId ? S.urlArchivo(foto.assetId) : '';
        const tituloLeido = lectura && lectura.titulo;
        const distinta = tituloLeido && !norm(tituloLeido).split(' ').some(w => w.length > 3 && norm(cat).includes(w));
        const info = h('div', { class: 'ta-ed-info' },
          lectura ? h('span', null, 'Se leyeron ', h('strong', null, pl(lectura.filas.length, 'fila', 'filas')), ' y se asignaron ', h('strong', null, String(asignadas)), ' a competidores inscriptos.') : null,
          lectura ? h('span', null, 'Revisá que cada fila tenga el competidor correcto y los puntos antes de guardar. Si alguna quedó marcada, elegí el competidor de la lista.') : h('span', null, 'Completá o corregí los resultados.'),
          distinta ? h('span', { class: 'pill pill-warn' }, 'La foto dice «' + tituloLeido + '» y estás cargando ' + cat) : null,
          (avisoPts = h('span', { class: 'pill pill-warn', hidden: true }, 'Hay puntos marcados en amarillo: revisalos contra la foto.')));
        marcarPuntos();

        const cont = h('div', { class: 'ta-editor' },
          h('div', { class: 'ta-ed-top' }, urlFoto ? h('img', { src: urlFoto, alt: 'Foto subida', onclick: () => verFoto(urlFoto, cat) }) : null, info),
          h('div', { class: 'ta-ed-wrap' }, h('table', null,
            h('thead', null, h('tr', null, h('th', null, 'Pos'), h('th', null, 'Kart'), h('th', null, 'Nombre en la foto'), h('th', null, 'Competidor'), h('th', null, 'Puntos'), h('th', null, ''))),
            tbody)),
          h('div', null, h('button', { type: 'button', class: 'btn btn-sm', onclick: () => agregar({ posicion: filasUI.length + 1 }) }, '+ Agregar fila')));

        let guardando = false;
        App.modal({
          title: cat + ' · Fecha ' + numeroDe(n),
          content: cont,
          actions: [
            { label: 'Cancelar', kind: 'ghost' },
            { label: 'Guardar resultados', kind: 'primary', onClick: async (close) => {
              if (guardando) return;
              const datos = filasUI.map(r => ({
                posicion: r.pos.value === '' ? null : +r.pos.value, kart: r.kart.value.trim(), nombre: r.nom.value.trim(),
                inscId: r.ins.value || null, puntos: r.pts.value === '' ? null : +r.pts.value,
              })).filter(f => f.nombre || f.inscId || f.puntos != null);
              const sinAsignar = filasUI.filter(r => !r.ins.value && (r.nom.value.trim() || r.pts.value !== ''));
              if (sinAsignar.length) { App.toast(sinAsignar.length === 1 ? 'Elegí el competidor de la fila marcada antes de guardar.' : 'Elegí el competidor de las ' + sinAsignar.length + ' filas marcadas antes de guardar.', 'error'); sinAsignar[0].ins.focus(); return; }
              const ids = datos.map(f => f.inscId).filter(Boolean);
              if (new Set(ids).size !== ids.length) { App.toast('Hay un competidor asignado a dos filas. Revisalo antes de guardar.', 'error'); return; }
              guardando = true;
              try {
                await S.guardarPuntos(torneo.id, n, cat, { filas: datos, foto });
                close();
                App.toast('Resultados de ' + cat + ' guardados', 'ok');
              } catch (e) {
                App.toast('No se pudo guardar: ' + (e && e.message || e), 'error');
              } finally { guardando = false; }
            } },
          ],
        });
      }

      /* ---------- Finalizar ---------- */
      async function finalizar(btn) {
        const t = torneo;
        const fs = App.fmt.fechasInfo(t);
        const avisos = [];
        (fs.length ? fs : [{ numero: 1 }]).forEach((fi, k) => {
          const n = k + 1, cats = categoriasFecha(n);
          const faltan = cats.filter(c => !planilla(n, c));
          if (faltan.length) avisos.push('Fecha ' + fi.numero + ': ' + pl(faltan.length, 'categoría', 'categorías') + ' sin resultados (' + faltan.join(', ') + ').');
        });
        const body = h('div', { class: 'v-torneo-actual-confirm stack' },
          h('p', null, 'El torneo pasa a Torneos pasados con los resultados de cada fecha.'),
          avisos.length ? h('ul', null, avisos.map(x => h('li', { class: 'ta-c-warn' }, x))) : h('p', { class: 'muted' }, 'Están cargados los resultados de todas las categorías.'));
        const ok = await App.confirm({ title: 'Finalizar torneo', body, okLabel: 'Finalizar y guardar', danger: true });
        if (!ok) return;
        btn.disabled = true;
        try {
          await S.finalizarTorneo(t.id);
          App.toast('Torneo guardado en Torneos pasados', 'ok');
          App.go('torneos-pasados~' + t.id);
        } catch (e) {
          console.error(e);
          btn.disabled = false;
          App.toast('No se pudo finalizar: ' + (e && e.message || e), 'error');
        }
      }

      dibujar();
    },
  });
})();
