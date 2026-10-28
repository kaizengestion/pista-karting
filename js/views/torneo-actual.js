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
.v-torneo-actual .ta-fechas { display: flex; gap: 8px; flex-wrap: wrap; }
.v-torneo-actual .ta-fechas button { font: 700 1rem/1.1 var(--font-display); text-transform: uppercase; letter-spacing: .05em; padding: 10px 16px; min-height: 44px;
  border-radius: var(--radius); border: 1.5px solid var(--line); background: var(--surface); color: var(--ink-2); cursor: pointer; display: inline-flex; flex-direction: column; align-items: flex-start; gap: 2px; }
.v-torneo-actual .ta-fechas button small { font: 500 .78rem/1 var(--font-body); text-transform: none; letter-spacing: 0; color: var(--ink-3); }
.v-torneo-actual .ta-fechas button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.v-torneo-actual .ta-fechas button[aria-pressed="true"] small { color: var(--accent-ink); opacity: .85; }
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
  const numOrNull = (v) => (v === '' || v == null || isNaN(+v)) ? null : Math.max(0, Math.floor(+v));

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
      const fechasEl = h('div', { class: 'ta-fechas', role: 'group', 'aria-label': 'Fecha que estás cronometrando' });

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
          root.replaceChildren(headEl, fechasEl, summaryEl, navEl, sectionsEl);
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
      function drawFechas() {
        const fs = App.fmt.fechasDe(torneo);
        if (nFecha == null || nFecha > Math.max(1, fs.length)) nFecha = 1;
        fechasEl.hidden = fs.length < 2;
        if (fs.length < 2) { fechasEl.replaceChildren(); return; }
        fechasEl.replaceChildren(...fs.map((f, k) => h('button', {
          type: 'button', 'aria-pressed': String(nFecha === k + 1),
          onclick: () => {
            const a = document.activeElement;
            if (a && a.matches && a.matches('input.t-input') && sectionsEl.contains(a) && !commit(a)) return;
            nFecha = k + 1;
            drawFechas();
            drawSections();
          },
        }, 'Fecha ' + (k + 1), h('small', null, App.fmt.fecha(f)))));
      }
      /* Tiempo y Ok de un competidor en la fecha elegida */
      function tiempoDe(id) {
        const tv = tiempos[id];
        if (!tv) return { tiempo: null, ok: false };
        const x = tv.fechas ? tv.fechas[nFecha || 1] : (nFecha > 1 ? null : tv);
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
        const cats = (t.categorias || []).map(c => ({ nombre: c.nombre, cupo: numOrNull(c.cupo), filas: [] }));
        const byName = new Map(cats.map(c => [c.nombre, c]));
        for (const i of inscs) {
          if (i.torneoId !== t.id) continue;
          const key = i.categoria || 'Sin categoría';
          let c = byName.get(key);
          if (!c) { c = { nombre: key, cupo: null, filas: [], extra: true }; byName.set(key, c); cats.push(c); }
          const tv = tiempoDe(i.id);
          c.filas.push({ insc: i, inscId: i.id, tiempo: tv.tiempo, ok: tv.ok, posicion: null });
        }
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
        return JSON.stringify([nFecha, cats.map(c => [c.nombre, c.cupo, c.filas.map(f => {
          const i = f.insc;
          return [f.inscId, i.nroKarting, i.apellido, i.nombre, i.dni, i.nroMotor, !!i.invitado];
        })])]);
      }

      const totals = (cats) => {
        let n = 0, cupo = 0, hayCupo = false, libres = 0, conT = 0, conOk = 0;
        for (const c of cats) {
          n += c.filas.length; conT += c.conTiempo; conOk += c.conOk;
          if (c.cupo != null) { hayCupo = true; cupo += c.cupo; libres += Math.max(0, c.cupo - c.filas.length); }
        }
        return { n, cupo, hayCupo, libres, conT, conOk };
      };

      function subText(c) {
        const n = c.filas.length;
        if (c.cupo == null) return pl(n, 'anotado', 'anotados') + ' · sin cupo definido';
        if (n <= c.cupo) {
          const l = c.cupo - n;
          return n + ' de ' + c.cupo + ' · ' + (l === 0 ? 'cupo completo' : pl(l, 'lugar disponible', 'lugares disponibles'));
        }
        return n + ' de ' + c.cupo + ' · ' + (n - c.cupo) + ' sobre el cupo';
      }

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
          h('div', { class: 'ta-stat hl' },
            h('b', null, String(s.n), s.hayCupo ? h('small', null, ' / ' + s.cupo) : null),
            h('span', null, s.hayCupo ? 'Anotados / cupo total' : 'Anotados')),
          h('div', { class: 'ta-stat' }, h('b', null, s.hayCupo ? String(s.libres) : '—'), h('span', null, 'Lugares disponibles')),
          h('div', { class: 'ta-stat' }, h('b', null, String(s.conT), h('small', null, ' / ' + s.n)), h('span', null, 'Tiempos cargados' + deFecha())),
          h('div', { class: 'ta-stat' }, h('b', null, String(s.conOk), h('small', null, ' / ' + s.n)), h('span', null, 'Con Ok' + deFecha())));
      }
      function deFecha() {
        return torneo && App.fmt.fechasDe(torneo).length > 1 ? ' · fecha ' + (nFecha || 1) : '';
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
            h('strong', null, 'Este torneo no tiene categorías'),
            h('span', null, 'Agregá categorías desde Próximos torneos antes de iniciarlo.')));
          return;
        }
        for (const c of cats) sections.push(drawCat(c));
        sectionsEl.replaceChildren(...sections);
      }

      function drawCat(c) {
        const filas = ordenPos
          ? c.filas.slice().sort((a, b) => (a.posicion == null) - (b.posicion == null) || ((a.posicion || 0) - (b.posicion || 0)) || cmpKart(a, b))
          : c.filas;
        const sub = h('span', { class: 'muted' }, subText(c));
        const conTiempo = h('span', { class: 'pill' }, c.conTiempo + ' / ' + c.filas.length + ' con tiempo');
        catRefs.set(c.nombre, { sub, conTiempo });

        const rows = filas.map(f => drawRow(f, c));
        const n = c.filas.length;
        if (c.cupo != null) {
          for (let k = n + 1; k <= c.cupo; k++) {
            rows.push(h('tr', { class: 'pending' }, h('td', { colspan: '6' }, 'Lugar ' + k + ' — disponible')));
          }
        }
        if (!rows.length) rows.push(h('tr', { class: 'ta-none' }, h('td', { colspan: '6' }, 'Todavía no hay competidores en esta categoría.')));

        return h('section', { class: 'ta-section', 'aria-label': c.nombre },
          h('div', { class: 'section-title' }, h('h2', null, c.nombre), sub, conTiempo,
            deFecha() ? h('span', { class: 'pill pill-live' }, 'Fecha ' + nFecha) : null,
            c.extra ? h('span', { class: 'pill pill-warn' }, 'Categoría fuera del torneo') : null,
            c.cupo != null && n > c.cupo ? h('span', { class: 'pill pill-danger' }, 'Cupo excedido') : null),
          h('div', { class: 'table-wrap' },
            h('table', { class: 'tbl ta-tbl' },
              h('thead', null, h('tr', null,
                h('th', { class: 'center', scope: 'col' }, 'Pos'),
                h('th', { scope: 'col' }, 'Kart'),
                h('th', { scope: 'col' }, 'Competidor'),
                h('th', { class: 'motor', scope: 'col' }, 'Motor'),
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
          h('td', null, h('div', { class: 'ta-comp' }, nombre, i.invitado ? [' ', h('span', { class: 'pill pill-inv' }, 'Invitado')] : null), h('span', { class: 'ta-dni' }, i.dni ? 'DNI ' + i.dni : 'Sin DNI',
            h('span', { class: 'ta-motor-inline' }, ' · Motor ' + (i.nroMotor || '—')))),
          h('td', { class: 'motor' }, i.nroMotor || '—'),
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
        const prev = tiempos[inscId] || { tiempo: null, ok: false };
        const fechas = Object.assign({ 1: { tiempo: prev.tiempo, ok: !!prev.ok } }, prev.fechas || {}, { [n]: data });
        tiempos = Object.assign({}, tiempos, { [inscId]: { tiempo: fechas[1].tiempo, ok: !!fechas[1].ok, fechas } }); // optimista
        const p = Promise.resolve()
          .then(() => S.guardarTiempo(tid, inscId, data, n))
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
            ? h('p', null, 'Se guardarán las planillas de las ' + nf + ' fechas. En la fecha ' + nFecha + ' hay ' + pl(s.n, 'competidor', 'competidores') + ' y ' + pl(s.conT, 'tiempo', 'tiempos') + '.')
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
