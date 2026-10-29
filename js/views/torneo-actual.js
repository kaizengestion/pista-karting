/* Torneo actual: planilla de cronometraje en vivo por categoría.
   Carga de tiempos con Enter/blur, Ok al instante, posiciones calculadas en vivo y cierre del torneo. */
(function () {
  const h = App.h;

  App.css(`
.v-torneo-actual { display: flex; flex-direction: column; gap: 24px; }
.v-torneo-actual .ta-head-main { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.v-torneo-actual .ta-head-main h1 { overflow-wrap: anywhere; }
.v-torneo-actual .ta-meta { display: flex; gap: 8px 12px; align-items: center; flex-wrap: wrap; color: var(--ink-2); }
.v-torneo-actual .ta-meta .ta-fecha::first-letter { text-transform: uppercase; }
.v-torneo-actual .ta-summary { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
.v-torneo-actual .ta-stat { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.v-torneo-actual .ta-stat.hl { border-top: 3px solid var(--accent); }
.v-torneo-actual .ta-stat b { font: 800 1.9rem/1 var(--font-display); font-variant-numeric: tabular-nums; color: var(--ink); }
.v-torneo-actual .ta-stat b small { font-size: 1.1rem; font-weight: 700; color: var(--ink-3); }
.v-torneo-actual .ta-stat span { font-size: .82rem; color: var(--ink-2); }
.v-torneo-actual .ta-nav { display: flex; gap: 8px 16px; align-items: center; flex-wrap: wrap; }
.v-torneo-actual .ta-nav .tabs { flex: 1 1 260px; min-width: 0; }
.v-torneo-actual .ta-toggle { display: inline-flex; gap: 8px; align-items: center; font-size: .9rem; color: var(--ink-2); cursor: pointer; user-select: none; }
.v-torneo-actual .ta-sections { display: flex; flex-direction: column; gap: 28px; }
.v-torneo-actual .ta-section { display: flex; flex-direction: column; gap: 10px; scroll-margin-top: 96px; }
.v-torneo-actual .ta-section .section-title .muted { font-variant-numeric: tabular-nums; }
.v-torneo-actual .ta-tbl { min-width: 580px; }
.v-torneo-actual .ta-tbl td.pos { width: 56px; font: 700 1.1rem/1 var(--font-display); font-variant-numeric: tabular-nums; }
.v-torneo-actual .ta-tbl td.pos.none { color: var(--ink-3); font-weight: 500; }
.v-torneo-actual .ta-tbl td.kart { width: 64px; }
.v-torneo-actual .ta-tbl td.motor { font-variant-numeric: tabular-nums; color: var(--ink-2); white-space: nowrap; }
.v-torneo-actual .ta-tbl td.ok { width: 56px; }
.v-torneo-actual .ta-tbl td.ok input { display: block; margin: 0 auto; }
.v-torneo-actual .ta-comp { font-weight: 600; }
.v-torneo-actual .ta-motor-inline { display: none; }
.v-torneo-actual .ta-dni { display: block; font-size: .8rem; font-weight: 400; color: var(--ink-3); font-variant-numeric: tabular-nums; }
.v-torneo-actual .t-cell { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.v-torneo-actual .tbl input.t-input { width: 120px; min-width: 120px; font: 400 1rem/1.2 var(--font-mono); font-variant-numeric: tabular-nums; text-align: right; }
.v-torneo-actual .tbl input.t-input::placeholder { color: var(--ink-3); opacity: .7; }
.v-torneo-actual tr.is-best td.pos { color: var(--ink); }
.v-torneo-actual tr.is-best td.pos span { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 26px; border-radius: 3px; background: var(--accent); color: var(--accent-ink); padding: 0 6px; }
.v-torneo-actual tr.is-best input.t-input { font-weight: 500; border-color: var(--ok); }
.v-torneo-actual tr.is-best input.t-input[aria-invalid="true"] { border-color: var(--danger); }
.v-torneo-actual .ta-best[hidden] { display: none; }
.v-torneo-actual tr.pending td { font-variant-numeric: tabular-nums; }
.v-torneo-actual tr.ta-none td { color: var(--ink-3); text-align: center; padding: 18px 12px; }
.v-torneo-actual .ta-fechas { display: flex; flex-direction: column; gap: 16px; }
.v-torneo-actual .ta-fblk { border: 1px solid var(--line); border-radius: 10px; background: var(--surface); padding: 16px; display: flex; flex-direction: column; gap: 16px; scroll-margin-top: 96px; }
.v-torneo-actual .ta-fblk.activa { border: 2px solid var(--accent); box-shadow: 0 0 0 4px rgba(215,20,28,.12); }
.v-torneo-actual .ta-fblk-head { display: flex; gap: 8px 14px; align-items: center; flex-wrap: wrap; }
.v-torneo-actual .ta-fblk-n { font: 800 1.5rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .02em; }
.v-torneo-actual .ta-fblk-dia { color: var(--ink-2); }
.v-torneo-actual .ta-fblk-dia::first-letter { text-transform: uppercase; }
.v-torneo-actual .ta-fblk-podios { display: grid; gap: 12px 20px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.v-torneo-actual .ta-fblk-cat { border-top: 3px solid var(--accent); padding-top: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.v-torneo-actual .ta-fblk-p { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
.v-torneo-actual .ta-fblk-pos { font: 700 .8rem/1 var(--font-display); color: var(--accent-text); width: 22px; flex: none; }
.v-torneo-actual .ta-fblk-nom { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 640px) { .v-torneo-actual .ta-fblk { padding: 12px; } .v-torneo-actual .ta-fblk-n { font-size: 1.3rem; } }
.v-torneo-actual .ta-warn { display: flex; gap: 8px; flex-wrap: wrap; }
.v-torneo-actual-confirm ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px; }
.v-torneo-actual-confirm .ta-c-warn { color: var(--warn); font-weight: 600; }
@media (max-width: 640px) {
  .v-torneo-actual .ta-stat b { font-size: 1.6rem; }
  .v-torneo-actual .page-head .actions { width: 100%; }
  .v-torneo-actual .page-head .actions .btn { flex: 1; }
  .v-torneo-actual .ta-tbl { min-width: 0; }
  .v-torneo-actual .ta-tbl th, .v-torneo-actual .ta-tbl td { padding-left: 6px; padding-right: 6px; }
  .v-torneo-actual .ta-tbl .motor { display: none; }
  .v-torneo-actual .ta-motor-inline { display: inline; }
  .v-torneo-actual .ta-tbl td.pos { width: 40px; }
  .v-torneo-actual .ta-tbl td.kart { width: 48px; }
  .v-torneo-actual .ta-tbl td.ok { width: 40px; }
  .v-torneo-actual .tbl input.t-input { width: 104px; min-width: 104px; padding-left: 6px; padding-right: 6px; }
  .v-torneo-actual .ta-best { display: none; }
}
`);

  const pl = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  
  function cmpKart(a, b) {
    const ka = String(a.insc.nroKarting || '').trim(), kb = String(b.insc.nroKarting || '').trim();
    if (ka && !kb) return -1;
    if (!ka && kb) return 1;
    const c = ka.localeCompare(kb, 'es', { numeric: true });
    if (c) return c;
    return App.fmt.nombre(a.insc).localeCompare(App.fmt.nombre(b.insc), 'es');
  }

  function callUnsub(u) {
    try {
      if (typeof u === 'function') u();
      else if (u && typeof u.then === 'function') u.then(f => { if (typeof f === 'function') f(); });
    } catch (e) { console.error(e); }
  }

  /* Posiciones por tiempo: usa Store.posiciones; si no está, cálculo local equivalente. */
  function posiciones(filas) {
    const S = window.Store;
    try {
      if (S && typeof S.posiciones === 'function') {
        const r = S.posiciones(filas);
        if (Array.isArray(r)) return r;
        if (filas.every(f => 'posicion' in f)) return filas;
      }
    } catch (e) { console.error(e); }
    const arr = filas.slice().sort((a, b) => (a.tiempo == null) - (b.tiempo == null) || ((a.tiempo || 0) - (b.tiempo || 0)));
    let n = 0;
    return arr.map(f => Object.assign({}, f, { posicion: f.tiempo == null ? null : ++n }));
  }

  App.view('torneo-actual', {
    title: 'Torneo actual',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      const root = h('div', { class: 'v-torneo-actual' }, h('p', { class: 'loading' }, 'Cargando torneo…'));
      el.appendChild(root);

      let torneos = null, inscs = null, tiempos = {};
      let torneo = null;
      let tiemposDe = null, unsubTiempos = null;
      let shownKey = null;          // 'empty' | 'loading' | 'torneo:<id>'
      let headKey = null;
      let renderedSig = null;
      let dirty = false;
      let ordenPos = false;
      let finalizando = false;
      let nFecha = null;            // fecha que se está cronometrando (1 a 3)
      const rowRefs = new Map();    // inscId -> { tr, pos, input, chk, best }
      const catRefs = new Map();    // nombre -> { sub, conTiempo }
      const pendientes = new Set(); // promesas de guardado en curso

      const headEl = h('div');
      const summaryEl = h('div', { class: 'ta-summary', 'aria-live': 'polite' });
      const tabsEl = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Categorías' });
      const toggle = h('input', { type: 'checkbox', onchange: () => { ordenPos = toggle.checked; drawSections(); } });
      const navEl = h('div', { class: 'ta-nav' }, tabsEl, h('label', { class: 'ta-toggle' }, toggle, 'Ordenar por posición'));
      const sectionsEl = h('div', { class: 'ta-sections' });
      const fechasEl = h('div', { class: 'ta-fechas' });
      let fechasSig = null;

      sectionsEl.addEventListener('focusout', () => {
        setTimeout(() => {
          if (!ctx.isCurrent()) return;
          if ((dirty || ordenPos) && !focusInTable()) drawSections();
        }, 200); // margen para que termine el click (ej. checkbox en Safari, que no toma foco)
      });

      function focusInTable() {
        const a = document.activeElement;
        return !!(a && a !== document.body && sectionsEl.contains(a) && a.matches('input'));
      }

      /* ---------- Suscripciones ---------- */
      const u1 = S.watchTorneos((list) => { torneos = list || []; update(); });
      ctx.onCleanup(() => callUnsub(u1));
      const u2 = S.watchInscripciones((list) => { inscs = list || []; update(); });
      ctx.onCleanup(() => callUnsub(u2));
      ctx.onCleanup(() => { callUnsub(unsubTiempos); unsubTiempos = null; });

      function suscribirTiempos(id) {
        callUnsub(unsubTiempos);
        unsubTiempos = null;
        tiempos = {};
        tiemposDe = id;
        if (!id) return;
        unsubTiempos = S.watchTiempos(id, (map) => {
          if (tiemposDe !== id) return;
          tiempos = Object.assign({}, map || {});
          update();
        });
      }

      function update() {
        if (!ctx.isCurrent() || finalizando) return;
        if (torneos == null) return;
        const t = S.torneoActual(torneos);
        if (!t) {
          if (tiemposDe) suscribirTiempos(null);
          torneo = null;
          showEmpty();
          return;
        }
        torneo = t;
        if (tiemposDe !== t.id) suscribirTiempos(t.id);
        if (inscs == null) {
          if (shownKey !== 'loading') { shownKey = 'loading'; root.replaceChildren(h('p', { class: 'loading' }, 'Cargando competidores…')); }
          return;
        }
        if (shownKey !== 'torneo:' + t.id) {
          shownKey = 'torneo:' + t.id;
          headKey = null; renderedSig = null;
          nFecha = fechaInicial(t);
          fechasSig = null;
          root.replaceChildren(headEl, fechasEl);
        }
        drawHead();
        drawFechas();
        if (focusInTable()) patch(); else drawSections();
      }

      /* ---------- Fechas ---------- */
      /* Arranca en la última fecha que ya llegó (o la primera si ninguna llegó todavía) */
      function fechaInicial(t) {
        const fs = App.fmt.fechasDe(t);
        const d = new Date();
        const hoy = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        let n = 1;
        fs.forEach((f, k) => { if (f <= hoy) n = k + 1; });
        return n;
      }
      /* Cada fecha es un bloque. El de la fecha que se está cronometrando tiene la planilla completa;
         los otros muestran el podio de cada categoría y un botón para abrirlos. */
      function hoyISO() {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      }
      function resumenFecha(n) {
        const cats = (torneo.categorias || []).map(c => c.nombre);
        const filas = {};
        let conT = 0, total = 0;
        for (const i of inscs) {
          if (i.torneoId !== torneo.id) continue;
          for (const k of catsDe(i)) {
            if (!cats.includes(k)) cats.push(k);
            const tv = tiempoDe(clave(i, k), n);
            total++;
            if (tv.tiempo != null) { conT++; (filas[k] = filas[k] || []).push({ i, t: tv.tiempo }); }
          }
        }
        return { conT, total, cats: cats.map(nombre => ({ nombre, podio: (filas[nombre] || []).sort((a, b) => a.t - b.t).slice(0, 3) })) };
      }
      function abrirFecha(n) {
        const a = document.activeElement;
        if (a && a.matches && a.matches('input.t-input') && sectionsEl.contains(a) && !commit(a)) return;
        nFecha = n;
        drawFechas();
        drawSections();
        const blk = fechasEl.querySelector('.ta-fblk.activa');
        blk && blk.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      function drawFechas() {
        const fs = App.fmt.fechasDe(torneo);
        const lista = fs.length ? fs : [''];
        if (nFecha == null || nFecha > lista.length) nFecha = 1;
        const hoy = hoyISO();
        const res = lista.map((f, k) => (k + 1 === nFecha ? null : resumenFecha(k + 1)));
        const sig = JSON.stringify([lista, nFecha, res.map(r => r && [r.conT, r.cats.map(c => c.podio.map(p => [p.i.id, p.t]))])]);
        if (sig === fechasSig) return;
        fechasSig = sig;
        fechasEl.replaceChildren(...lista.map((f, k) => {
          const n = k + 1, activa = n === nFecha, r = res[k];
          const estado = activa ? h('span', { class: 'pill pill-live' }, 'Cargando tiempos')
            : f && f > hoy ? h('span', { class: 'pill' }, 'Próxima')
            : r.conT ? h('span', { class: 'pill pill-ok' }, 'Corrida · ' + r.conT + ' / ' + r.total + ' tiempos')
            : h('span', { class: 'pill pill-warn' }, 'Sin tiempos');
          const cab = h('div', { class: 'ta-fblk-head' },
            h('span', { class: 'ta-fblk-n' }, 'Fecha ' + n),
            f ? h('span', { class: 'ta-fblk-dia' }, App.fmt.fechaLarga(f)) : null,
            estado,
            h('span', { class: 'spacer' }),
            activa ? null : h('button', { type: 'button', class: 'btn btn-sm ' + (f && f > hoy ? '' : 'btn-dark'), onclick: () => abrirFecha(n) },
              r.conT ? 'Ver y editar tiempos' : 'Cargar tiempos'));
          if (activa) return h('section', { class: 'ta-fblk activa', 'aria-label': 'Fecha ' + n }, cab, summaryEl, navEl, sectionsEl);
          const cuerpo = r.conT
            ? h('div', { class: 'ta-fblk-podios' }, r.cats.map(c => h('div', { class: 'ta-fblk-cat' },
                h('span', { class: 'eyebrow' }, c.nombre),
                c.podio.length ? c.podio.map((p, j) => h('div', { class: 'ta-fblk-p' },
                  h('span', { class: 'ta-fblk-pos' }, 'P' + (j + 1)), h('span', { class: 'ta-fblk-nom' }, App.fmt.nombre(p.i)), h('span', { class: 'mono small' }, App.fmt.tiempo(p.t))))
                  : h('span', { class: 'muted small' }, 'Sin tiempos'))))
            : h('p', { class: 'muted small' }, f && f > hoy ? 'Todavía no se corrió. Las categorías y los inscriptos son los del torneo.' : 'No hay tiempos cargados en esta fecha.');
          return h('section', { class: 'ta-fblk', 'aria-label': 'Fecha ' + n }, cab, cuerpo);
        }));
      }
      /* Cada fila de la planilla es un competidor en una categoría: su clave de tiempos es '<inscId>__<categoría>' */
      const filasPorClave = new Map();   // clave -> { insc, cat }
      const catsDe = (i) => { const cs = S.categoriasDe(i); return cs.length ? cs : ['Sin categoría']; };
      function clave(i, cat) { const k = S.claveTiempo(i.id, cat); filasPorClave.set(k, { insc: i, cat }); return k; }
      function docTiempo(k) {
        if (tiempos[k]) return tiempos[k];
        const f = filasPorClave.get(k);   // tiempos viejos, guardados con el id de la inscripción
        return f && catsDe(f.insc)[0] === f.cat ? tiempos[f.insc.id] : null;
      }
      /* Tiempo y Ok de una fila en la fecha elegida */
      function tiempoDe(id, n) {
        n = n || nFecha || 1;
        const tv = docTiempo(id);
        if (!tv) return { tiempo: null, ok: false };
        const x = tv.fechas ? tv.fechas[n] : (n > 1 ? null : tv);
        return { tiempo: x && x.tiempo != null ? +x.tiempo : null, ok: !!(x && x.ok) };
      }

      function showEmpty() {
        if (shownKey === 'empty') return;
        shownKey = 'empty';
        root.replaceChildren(
          h('div', { class: 'page-head' }, h('div', { class: 'ta-head-main' }, h('span', { class: 'eyebrow' }, 'Torneo actual'), h('h1', null, 'Sin torneo en curso'))),
          h('div', { class: 'empty' },
            h('strong', null, 'No hay un torneo en curso'),
            h('span', null, 'Elegí un torneo programado e inicialo para cargar los tiempos.'),
            h('a', { class: 'btn btn-primary', href: '#proximos-torneos' }, 'Ir a Próximos torneos')));
      }

      /* ---------- Modelo ---------- */
      function model() {
        const t = torneo;
        const todas = (t.categorias || []).map(c => ({ nombre: c.nombre, filas: [] }));
        const byName = new Map(todas.map(c => [c.nombre, c]));
        for (const i of inscs) {
          if (i.torneoId !== t.id) continue;
          for (const key of catsDe(i)) {
            let c = byName.get(key);
            if (!c) { c = { nombre: key, filas: [], extra: true }; byName.set(key, c); todas.push(c); }
            const k = clave(i, key);
            const tv = tiempoDe(k);
            c.filas.push({ insc: i, inscId: k, tiempo: tv.tiempo, ok: tv.ok, posicion: null });
          }
        }
        // Solo las categorías con anotados: con 12 categorías, las vacías no aportan
        const cats = todas.filter(c => c.filas.length);
        cats.vacias = todas.filter(c => !c.filas.length).map(c => c.nombre);
        for (const c of cats) {
          const ranked = posiciones(c.filas.map(f => ({ id: f.inscId, inscId: f.inscId, tiempo: f.tiempo, ok: f.ok })));
          const pos = new Map(ranked.map(r => [r.inscId != null ? r.inscId : r.id, r.posicion == null ? null : r.posicion]));
          let best = null;
          for (const f of c.filas) {
            f.posicion = pos.has(f.inscId) ? pos.get(f.inscId) : null;
            if (f.tiempo != null && (best == null || f.tiempo < best)) best = f.tiempo;
          }
          c.best = best;
          c.filas.sort(cmpKart);
          c.conTiempo = c.filas.filter(f => f.tiempo != null).length;
          c.conOk = c.filas.filter(f => f.ok).length;
        }
        return cats;
      }

      function signature(cats) {
        return JSON.stringify([nFecha, cats.map(c => [c.nombre, c.filas.map(f => {
          const i = f.insc;
          return [f.inscId, i.nroKarting, i.apellido, i.nombre, i.dni, !!i.invitado];
        })])]);
      }

      const totals = (cats) => {
        let n = 0, conT = 0, conOk = 0;
        const pilotos = new Set();
        for (const c of cats) {
          n += c.filas.length; conT += c.conTiempo; conOk += c.conOk;
          c.filas.forEach(f => pilotos.add(f.insc.id));
        }
        return { n, pilotos: pilotos.size, conT, conOk };
      };

      function subText(c) { return pl(c.filas.length, 'anotado', 'anotados'); }

      /* ---------- Dibujo ---------- */
      function drawHead() {
        const t = torneo;
        const key = JSON.stringify([t.id, t.nombre, App.fmt.fechasDe(t), t.lugar]);
        if (key === headKey) return;
        headKey = key;
        const btn = h('button', { type: 'button', class: 'btn btn-dark', onclick: () => finalizar(btn) }, 'Finalizar torneo');
        headEl.replaceChildren(h('div', { class: 'page-head' },
          h('div', { class: 'ta-head-main' },
            h('span', { class: 'eyebrow' }, 'Torneo actual'),
            h('h1', null, t.nombre || 'Torneo sin nombre'),
            h('div', { class: 'ta-meta' },
              h('span', { class: 'ta-fecha' }, App.fmt.fechasTexto(t, true) + (t.lugar ? ' · ' + t.lugar : '')),
              h('span', { class: 'pill pill-live' }, 'En curso'))),
          h('div', { class: 'actions' }, btn)));
      }

      function drawSummary(cats) {
        const s = totals(cats);
        summaryEl.replaceChildren(
          h('div', { class: 'ta-stat hl' }, h('b', null, String(s.pilotos)), h('span', null, 'Pilotos anotados')),
          h('div', { class: 'ta-stat' }, h('b', null, String(cats.length)), h('span', null, 'Categorías con anotados')),
          h('div', { class: 'ta-stat' }, h('b', null, String(s.conT), h('small', null, ' / ' + s.n)), h('span', null, 'Tiempos cargados' + deFecha())),
          h('div', { class: 'ta-stat' }, h('b', null, String(s.conOk), h('small', null, ' / ' + s.n)), h('span', null, 'Con Ok' + deFecha())));
      }
      function deFecha() {
        return torneo && App.fmt.fechasDe(torneo).length > 1 ? ' · Fecha ' + (nFecha || 1) : '';
      }

      function posText(p) { return p == null ? '—' : String(p); }

      function drawSections() {
        if (!torneo || inscs == null) return;
        const cats = model();
        renderedSig = signature(cats);
        dirty = false;
        rowRefs.clear();
        catRefs.clear();
        drawSummary(cats);

        const sections = [];
        const prevSel = tabsEl.querySelector('[aria-selected="true"]');
        const prevName = prevSel ? prevSel.dataset.cat : null;
        const tabs = cats.map((c, idx) => h('button', {
          type: 'button', role: 'tab', 'aria-selected': String(prevName ? prevName === c.nombre : idx === 0), dataset: { cat: c.nombre },
          onclick: (e) => {
            tabsEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', String(b === e.currentTarget)));
            const sec = sections[idx];
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          },
        }, c.nombre));
        tabsEl.replaceChildren(...tabs);
        navEl.hidden = cats.length === 0;

        if (!cats.length) {
          sectionsEl.replaceChildren(h('div', { class: 'empty' },
            h('strong', null, 'Todavía no hay competidores anotados'),
            h('span', null, 'Compartí el link de inscripción o agregalos desde Competidores.')));
          return;
        }
        for (const c of cats) sections.push(drawCat(c));
        sectionsEl.replaceChildren(...sections,
          cats.vacias && cats.vacias.length ? h('p', { class: 'muted small' }, 'Sin anotados: ' + cats.vacias.join(', ') + '.') : null);
      }

      function drawCat(c) {
        const filas = ordenPos
          ? c.filas.slice().sort((a, b) => (a.posicion == null) - (b.posicion == null) || ((a.posicion || 0) - (b.posicion || 0)) || cmpKart(a, b))
          : c.filas;
        const sub = h('span', { class: 'muted' }, subText(c));
        const conTiempo = h('span', { class: 'pill' }, c.conTiempo + ' / ' + c.filas.length + ' con tiempo');
        catRefs.set(c.nombre, { sub, conTiempo });

        const rows = filas.map(f => drawRow(f, c));
        if (!rows.length) rows.push(h('tr', { class: 'ta-none' }, h('td', { colspan: '5' }, 'Todavía no hay competidores en esta categoría.')));

        return h('section', { class: 'ta-section', 'aria-label': c.nombre },
          h('div', { class: 'section-title' }, h('h2', null, c.nombre), sub, conTiempo,
            deFecha() ? h('span', { class: 'pill pill-live' }, 'Fecha ' + nFecha) : null,
            c.extra ? h('span', { class: 'pill pill-warn' }, 'Categoría fuera del torneo') : null),
          h('div', { class: 'table-wrap' },
            h('table', { class: 'tbl ta-tbl' },
              h('thead', null, h('tr', null,
                h('th', { class: 'center', scope: 'col' }, 'Pos'),
                h('th', { scope: 'col' }, 'Kart'),
                h('th', { scope: 'col' }, 'Competidor'),
                h('th', { scope: 'col' }, 'Tiempo'),
                h('th', { class: 'center', scope: 'col' }, 'Ok'))),
              h('tbody', null, rows))));
      }

      function drawRow(f, c) {
        const i = f.insc;
        const nombre = App.fmt.nombre(i) || 'Sin nombre';
        const isBest = f.tiempo != null && f.tiempo === c.best;
        const input = h('input', {
          type: 'text', class: 't-input', inputmode: 'decimal', placeholder: '0:00.000', autocomplete: 'off', spellcheck: 'false',
          enterkeyhint: 'next', 'aria-label': 'Tiempo de ' + nombre, value: App.fmt.tiempo(f.tiempo), dataset: { insc: f.inscId },
          onkeydown: (e) => onKey(e, input),
          onblur: () => commit(input),
          oninput: () => { delete input.dataset.bad; },
        });
        const chk = h('input', {
          type: 'checkbox', checked: f.ok, 'aria-label': 'Ok de ' + nombre,
          onchange: () => setOk(f.inscId, chk.checked),
        });
        const best = h('span', { class: 'pill pill-ok ta-best', hidden: !isBest }, 'Mejor');
        const pos = h('span', null, posText(f.posicion));
        const posTd = h('td', { class: 'center pos' + (f.posicion == null ? ' none' : '') }, pos);
        const tr = h('tr', { class: isBest ? 'is-best' : null, dataset: { insc: f.inscId } },
          posTd,
          h('td', { class: 'kart' }, h('span', { class: 'kart-no' }, i.nroKarting || '—')),
          h('td', null, h('div', { class: 'ta-comp' }, nombre, i.invitado ? [' ', h('span', { class: 'pill pill-inv' }, 'Invitado')] : null),
            h('span', { class: 'ta-dni' }, (i.dni ? 'DNI ' + i.dni : 'Sin DNI') + (catsDe(i).length > 1 ? ' · También corre en ' + catsDe(i).filter(x => x !== c.nombre).join(', ') : ''))),
          h('td', null, h('div', { class: 't-cell' }, input, best)),
          h('td', { class: 'center ok' }, chk));
        rowRefs.set(f.inscId, { tr, pos, posTd, input, chk, best });
        return tr;
      }

      /* Actualización puntual sin re-dibujar (cuando hay foco en la planilla). */
      function patch() {
        if (!torneo || inscs == null) return;
        const cats = model();
        if (signature(cats) !== renderedSig) dirty = true;
        drawSummary(cats);
        const active = document.activeElement;
        for (const c of cats) {
          const cr = catRefs.get(c.nombre);
          if (cr) { cr.sub.textContent = subText(c); cr.conTiempo.textContent = c.conTiempo + ' / ' + c.filas.length + ' con tiempo'; }
          for (const f of c.filas) {
            const r = rowRefs.get(f.inscId);
            if (!r) { dirty = true; continue; }
            const isBest = f.tiempo != null && f.tiempo === c.best;
            r.pos.textContent = posText(f.posicion);
            r.posTd.classList.toggle('none', f.posicion == null);
            r.tr.classList.toggle('is-best', isBest);
            r.best.hidden = !isBest;
            if (active !== r.input && r.input.getAttribute('aria-invalid') !== 'true') r.input.value = App.fmt.tiempo(f.tiempo);
            if (active !== r.chk) r.chk.checked = f.ok;
          }
        }
      }

      /* ---------- Carga de tiempos ---------- */
      function guardar(inscId, data) {
        const tid = torneo && torneo.id;
        if (!tid) return;
        const n = nFecha || 1;
        const prev = docTiempo(inscId) || { tiempo: null, ok: false };
        const fechas = Object.assign({ 1: { tiempo: prev.tiempo, ok: !!prev.ok } }, prev.fechas || {}, { [n]: data });
        if (!prev.fechas) for (let k = 2; k <= 10; k++) if (prev['f' + k]) fechas[k] = prev['f' + k];
        tiempos = Object.assign({}, tiempos, { [inscId]: { tiempo: fechas[1].tiempo, ok: !!fechas[1].ok, fechas } }); // optimista
        const f = filasPorClave.get(inscId);
        const legado = f && catsDe(f.insc)[0] === f.cat ? f.insc.id : null;   // tiempos viejos de esta fila
        const p = Promise.resolve()
          .then(() => S.guardarTiempo(tid, inscId, data, n, legado))
          .catch((e) => { console.error(e); App.toast('No se pudo guardar: ' + (e && e.message || e), 'error'); });
        pendientes.add(p);
        p.finally(() => pendientes.delete(p));
      }

      function commit(input) {
        const id = input.dataset.insc;
        const raw = input.value.trim();
        let ms = null;
        if (raw) {
          ms = App.fmt.parseTiempo(raw);
          if (ms == null) {
            input.setAttribute('aria-invalid', 'true');
            if (input.dataset.bad !== raw) { input.dataset.bad = raw; App.toast('Formato de tiempo: 0:48.312 o 48.312', 'error'); }
            return false;
          }
        }
        input.removeAttribute('aria-invalid');
        delete input.dataset.bad;
        input.value = App.fmt.tiempo(ms);
        const cur = tiempoDe(id);
        if (cur.tiempo === ms) return true;
        guardar(id, { tiempo: ms, ok: cur.ok });
        patch();
        return true;
      }

      function setOk(id, ok) {
        guardar(id, { tiempo: tiempoDe(id).tiempo, ok: !!ok });
        patch();
      }

      function onKey(e, input) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (!commit(input)) return;
          const all = Array.from(sectionsEl.querySelectorAll('input.t-input'));
          const next = all[all.indexOf(input) + 1];
          if (next) { next.focus(); next.select(); }
        } else if (e.key === 'Escape') {
          input.value = App.fmt.tiempo(tiempoDe(input.dataset.insc).tiempo);
          input.removeAttribute('aria-invalid');
          delete input.dataset.bad;
        }
      }

      /* ---------- Finalizar ---------- */
      async function finalizar(btn) {
        if (!torneo) return;
        const a = document.activeElement;
        if (a && a.matches && a.matches('input.t-input') && sectionsEl.contains(a) && !commit(a)) return;
        const t = torneo;
        const cats = model();
        const s = totals(cats);
        const nf = App.fmt.fechasDe(t).length;
        const faltan = s.n - s.conT, sinOk = s.n - s.conOk;
        const avisos = [];
        if (!s.n) avisos.push('No hay competidores anotados en este torneo.');
        if (faltan > 0) avisos.push(faltan === 1 ? 'Falta 1 tiempo.' : 'Faltan ' + faltan + ' tiempos.');
        if (sinOk > 0) avisos.push(pl(sinOk, 'competidor', 'competidores') + ' sin Ok.');
        const body = h('div', { class: 'v-torneo-actual-confirm stack' },
          nf > 1
            ? h('p', null, 'Se guardarán las planillas de las ' + nf + ' fechas. En la Fecha ' + nFecha + ' hay ' + pl(s.n, 'competidor', 'competidores') + ' y ' + pl(s.conT, 'tiempo', 'tiempos') + '.')
            : h('p', null, 'Se guardará la planilla con ' + pl(s.n, 'competidor', 'competidores') + ' y ' + pl(s.conT, 'tiempo', 'tiempos') + '.'),
          avisos.length ? h('ul', null, avisos.map(x => h('li', { class: 'ta-c-warn' }, x))) : h('p', { class: 'muted' }, 'Están todos los tiempos cargados y con Ok.'),
          h('p', { class: 'muted small' }, 'El torneo pasa a Torneos pasados con la planilla congelada.'));
        const ok = await App.confirm({ title: 'Finalizar torneo', body, okLabel: 'Finalizar y guardar', danger: true });
        if (!ok) return;
        btn.disabled = true;
        finalizando = true;
        try {
          if (pendientes.size) await Promise.allSettled(Array.from(pendientes));
          await S.finalizarTorneo(t.id);
          App.toast('Torneo guardado en Torneos pasados', 'ok');
          App.go('torneos-pasados~' + t.id);
        } catch (e) {
          console.error(e);
          finalizando = false;
          btn.disabled = false;
          App.toast('No se pudo finalizar: ' + (e && e.message || e), 'error');
          update();
        }
      }

      update();
    },
  });
})();
