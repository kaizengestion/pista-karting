/* Torneos pasados: historial de torneos finalizados con su podio y la planilla congelada de cada uno. */
(function () {
  const h = App.h;

  App.css(`
.v-pasados { display: flex; flex-direction: column; gap: 24px; }
.v-pasados .pp-head-main { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.v-pasados .pp-head-main h1 { overflow-wrap: anywhere; }
.v-pasados .pp-meta { color: var(--ink-2); display: flex; flex-wrap: wrap; gap: 4px 12px; align-items: center; }
.v-pasados .pp-meta .pp-fecha::first-letter { text-transform: uppercase; }
.v-pasados .pp-list { display: flex; flex-direction: column; gap: 14px; }
.v-pasados .pp-item { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 18px; align-items: start; color: inherit; text-decoration: none; }
.v-pasados .pp-item:hover { border-color: var(--ink-3); }
.v-pasados .pp-item:hover .pp-title { text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 4px; }
.v-pasados .pp-date { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 6px; border-radius: var(--radius);
  background: var(--surface-2); border: 1px solid var(--line); text-align: center; line-height: 1; }
.v-pasados .pp-day { font: 800 2.4rem/0.9 var(--font-display); font-variant-numeric: tabular-nums; }
.v-pasados .pp-mon { font: 700 1rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .1em; color: var(--ink-2); }
.v-pasados .pp-year { font: 600 .8rem/1 var(--font-display); letter-spacing: .08em; color: var(--ink-3); font-variant-numeric: tabular-nums; }
.v-pasados .pp-body { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.v-pasados .pp-title { overflow-wrap: anywhere; }
.v-pasados .pp-sub { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; color: var(--ink-2); }
.v-pasados .pp-podios { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.v-pasados .pp-cat { border-top: 3px solid var(--accent); padding-top: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.v-pasados .pp-win { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.v-pasados .pp-win .pp-name { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; flex: 1; }
.v-pasados .pp-win .mono { font-size: .88rem; white-space: nowrap; }
.v-pasados .pp-rest { font-size: .85rem; color: var(--ink-2); display: flex; flex-direction: column; gap: 2px; }
.v-pasados .pp-rest span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.v-pasados .pbadge { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 22px; padding: 0 6px; border-radius: 3px;
  font: 700 .85rem/1 var(--font-display); font-variant-numeric: tabular-nums; background: var(--surface-2); color: var(--ink-2); border: 1px solid var(--line); }
.v-pasados .pbadge.p1 { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.v-pasados .pbadge.p2, .v-pasados .pbadge.p3 { background: transparent; color: var(--ink); border-color: var(--accent); }
.v-pasados .pp-stats { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
.v-pasados .pp-stat { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.v-pasados .pp-stat b { font: 800 1.8rem/1 var(--font-display); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.v-pasados .pp-stat b.mono { font: 500 1.25rem/1.2 var(--font-mono); }
.v-pasados .pp-stat span { font-size: .82rem; color: var(--ink-2); }
.v-pasados .pp-section { display: flex; flex-direction: column; gap: 10px; }
.v-pasados .pp-tbl { min-width: 640px; }
.v-pasados .pp-tbl td.pos { width: 60px; }
.v-pasados .pp-tbl td.pts { font: 800 1.1rem/1 var(--font-display); font-variant-numeric: tabular-nums; }
.v-pasados .pp-tbl td.tiempo { font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
.v-pasados .pp-tbl td.dif { font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--ink-2); white-space: nowrap; font-size: .85rem; }
.v-pasados .pp-tbl td.dni, .v-pasados .pp-tbl td.motor { font-variant-numeric: tabular-nums; color: var(--ink-2); white-space: nowrap; }
.v-pasados .pp-tbl td.comp { font-weight: 500; }
.v-pasados .pp-tbl tr.podio td:first-child { box-shadow: inset 4px 0 0 var(--accent); }
.v-pasados .pp-tbl tr.p1 td { background: var(--surface-2); }
.v-pasados .pp-tbl tr.p1 td.comp, .v-pasados .pp-tbl tr.p1 td.tiempo { font-weight: 700; }
.v-pasados .pp-tbl tr.sin-tiempo td.tiempo { color: var(--ink-3); font-family: var(--font-body); font-style: italic; }
.v-pasados .pp-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.v-pasados .pp-chip { display: inline-flex; flex-direction: column; gap: 1px; padding: 6px 10px; border-radius: var(--radius); border: 1px solid var(--line); background: var(--surface-2);
  color: var(--ink); text-decoration: none; font: 700 .85rem/1.1 var(--font-display); text-transform: uppercase; letter-spacing: .05em; }
.v-pasados .pp-chip small { font: 500 .75rem/1.1 var(--font-body); text-transform: none; letter-spacing: 0; color: var(--ink-3); }
.v-pasados .pp-chip:hover { border-color: var(--accent); }
.v-pasados .pp-item-wrap { position: relative; }
.v-pasados .pp-fblks { display: flex; flex-direction: column; gap: 14px; }
.v-pasados .pp-fblk { border: 1px solid var(--line); border-radius: 10px; background: var(--surface); scroll-margin-top: 96px; }
.v-pasados .pp-fblk[open] { border-color: var(--accent); }
.v-pasados .pp-fblk > summary { list-style: none; cursor: pointer; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
.v-pasados .pp-fblk > summary::-webkit-details-marker { display: none; }
.v-pasados .pp-fblk-top { display: flex; gap: 8px 14px; align-items: center; flex-wrap: wrap; }
.v-pasados .pp-fblk-n { font: 800 1.5rem/1 var(--font-display); text-transform: uppercase; }
.v-pasados .pp-fblk-dia { color: var(--ink-2); }
.v-pasados .pp-fblk-dia::first-letter { text-transform: uppercase; }
.v-pasados .pp-fblk-chev { color: var(--ink-3); transition: transform .15s; font-size: 1.1rem; }
.v-pasados .pp-fblk[open] .pp-fblk-chev { transform: rotate(180deg); }
.v-pasados .pp-fblk-gan { display: flex; gap: 4px 16px; flex-wrap: wrap; font-size: .88rem; color: var(--ink-2); }
.v-pasados .pp-fw b { font: 700 .78rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .05em; color: var(--accent-text); }
.v-pasados .pp-fblk-body { padding: 4px 16px 18px; display: flex; flex-direction: column; gap: 22px; }
@media (max-width: 640px) { .v-pasados .pp-fblk-body { padding: 4px 10px 14px; } .v-pasados .pp-fblk > summary { padding: 12px; } }
.v-pasados .pp-none { border: 1.5px dashed var(--line); border-radius: var(--radius); padding: 16px; color: var(--ink-3); text-align: center; }
@media (max-width: 520px) {
  .v-pasados .pp-item { grid-template-columns: 1fr; gap: 12px; }
  .v-pasados .pp-date { flex-direction: row; align-items: baseline; justify-content: flex-start; gap: 8px; padding: 8px 12px; width: max-content; }
  .v-pasados .pp-day { font-size: 1.7rem; }
}
`);

  const pl = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);

  function callUnsub(u) {
    try {
      if (typeof u === 'function') u();
      else if (u && typeof u.then === 'function') u.then(f => { if (typeof f === 'function') f(); });
    } catch (e) { console.error(e); }
  }

  function partesFecha(iso) {
    const d = iso ? new Date(String(iso).length === 10 ? iso + 'T12:00:00' : iso) : null;
    if (!d || isNaN(d)) return { day: '—', mon: 'sin fecha', year: '' };
    return { day: String(d.getDate()), mon: d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', ''), year: String(d.getFullYear()) };
  }

  function fechaHora(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) + ' a las ' +
      d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  /* Fechas con planilla guardada: [1] para torneos de una sola fecha */
  function fechasConPlanilla(t) {
    const rf = t.resultadosFechas;
    const ns = rf ? Object.keys(rf).map(Number).filter(n => n >= 1).sort((a, b) => a - b) : [];
    return ns.length ? ns : [1];
  }

  /* Categorías en el orden del torneo, más cualquier otra que aparezca en resultados (de la fecha n). */
  function categoriasDe(t, n) {
    const res = (n && t.resultadosFechas && t.resultadosFechas[n]) || t.resultados || {};
    const nombres = (t.categorias || []).map(c => c.nombre);
    for (const k of Object.keys(res)) if (!nombres.includes(k)) nombres.push(k);
    return nombres.map(nombre => {
      const filas = (res[nombre] || []).map((r, idx) => Object.assign({ _i: idx }, r));
      filas.sort((a, b) => (a.posicion == null) - (b.posicion == null) || ((a.posicion || 0) - (b.posicion || 0)) || a._i - b._i);
      const best = filas.reduce((m, f) => (f.tiempo != null && (m == null || f.tiempo < m)) ? f.tiempo : m, null);
      return { nombre, filas, best };
    });
  }

  function dif(ms, best, pos) {
    if (ms == null || best == null) return '';
    const d = ms - best;
    if (pos === 1 && d === 0) return '—';
    if (d < 60000) return '+' + (d / 1000).toFixed(3);
    return '+' + App.fmt.tiempo(d);
  }

  function badge(pos) {
    if (pos == null) return h('span', { class: 'pbadge' }, '—');
    if (pos <= 3) return h('span', { class: 'pbadge p' + pos, title: 'Puesto ' + pos }, 'P' + pos);
    return h('span', { class: 'pbadge' }, String(pos));
  }

  App.view('torneos-pasados', {
    title: 'Torneos pasados',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      const root = h('div', { class: 'v-pasados' }, h('p', { class: 'loading' }, 'Cargando torneos…'));
      el.appendChild(root);

      let torneos = null;
      let fechaSel = null;
      let abiertas = null, irA = false;
      const u = S.watchTorneos((list) => { torneos = list || []; draw(); });
      ctx.onCleanup(() => callUnsub(u));

      function draw() {
        if (!ctx.isCurrent() || torneos == null) return;
        // Detalle: 'torneos-pasados~<id>' o 'torneos-pasados~<id>@<n>' para abrir directo en la fecha n
        if (ctx.param) {
          const [id, n] = String(ctx.param).split('@');
          if (n && fechaSel == null) fechaSel = Number(n);
          drawDetalle(id);
        } else drawLista();
      }

      /* ---------- Lista ---------- */
      function drawLista() {
        const pasados = torneos.filter(t => t.estado === 'finalizado')
          .sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || '')) || String(b.finalizado || '').localeCompare(String(a.finalizado || '')));
        const head = h('div', { class: 'page-head' },
          h('div', { class: 'pp-head-main' }, h('span', { class: 'eyebrow' }, 'Historial'), h('h1', null, 'Torneos pasados')),
          pasados.length ? h('span', { class: 'muted' }, pl(pasados.length, 'torneo finalizado', 'torneos finalizados')) : null);
        const body = pasados.length
          ? h('div', { class: 'pp-list' }, pasados.map(item))
          : h('div', { class: 'empty' },
            h('strong', null, 'Todavía no hay torneos finalizados.'),
            h('span', null, 'Cuando finalices el torneo actual, la planilla queda guardada acá.'),
            h('a', { class: 'btn', href: '#torneo-actual' }, 'Ir al torneo actual'));
        root.replaceChildren(head, body);
      }

      /* Cada torneo de la lista: tarjeta con link al detalle y, si tiene varias fechas, accesos a cada una */
      function item(t) {
        const ns = fechasConPlanilla(t);
        const fs = App.fmt.fechasDe(t);
        const card = tarjeta(t);
        if (ns.length < 2) return card;
        card.querySelector('.pp-body').appendChild(h('div', { class: 'pp-chips' }, ns.map(n =>
          h('a', { class: 'pp-chip', href: '#torneos-pasados~' + encodeURIComponent(t.id) + '@' + n, onclick: (e) => e.stopPropagation() },
            'Fecha ' + n, fs[n - 1] ? h('small', null, App.fmt.fecha(fs[n - 1])) : null))));
        return card;
      }

      function tarjeta(t) {
        const f = partesFecha(t.fecha);
        const ns = fechasConPlanilla(t);
        const ultima = ns[ns.length - 1];
        const cats = categoriasDe(t, ultima);
        const pilotos = cats.reduce((s, c) => s + c.filas.length, 0);
        return h('article', { class: 'card pp-item', role: 'link', tabindex: '0', style: { cursor: 'pointer' },
          onclick: () => App.go('torneos-pasados~' + encodeURIComponent(t.id)),
          onkeydown: (e) => { if (e.key === 'Enter') App.go('torneos-pasados~' + encodeURIComponent(t.id)); } },
          h('div', { class: 'pp-date', 'aria-hidden': 'true' },
            h('span', { class: 'pp-day' }, f.day), h('span', { class: 'pp-mon' }, f.mon), h('span', { class: 'pp-year' }, f.year)),
          h('div', { class: 'pp-body' },
            h('div', { class: 'stack', style: { gap: '4px' } },
              h('h2', { class: 'pp-title' }, t.nombre || 'Torneo sin nombre'),
              h('div', { class: 'pp-sub' },
                h('span', null, App.fmt.fechasTexto(t) + (t.lugar ? ' · ' + t.lugar : '')),
                h('span', { class: 'pill' }, pl(pilotos, 'piloto', 'pilotos')),
                ns.length > 1 ? h('span', { class: 'pill' }, pl(ns.length, 'fecha', 'fechas') + ' · Podio de la Fecha ' + ultima) : null)),
            cats.length ? h('div', { class: 'pp-podios' }, cats.map(c => {
              const conT = c.filas.filter(x => x.posicion != null);
              const p1 = conT[0];
              return h('div', { class: 'pp-cat' },
                h('span', { class: 'eyebrow' }, c.nombre),
                p1
                  ? h('div', { class: 'pp-win' }, badge(1), h('span', { class: 'pp-name' }, App.fmt.nombre(p1) || 'Sin nombre'), h('span', { class: 'mono' }, p1.puntos == null ? '' : p1.puntos + ' pts'))
                  : h('span', { class: 'muted small' }, c.filas.length ? 'Sin resultados' : 'Sin competidores'),
                conT.length > 1 ? h('div', { class: 'pp-rest' }, conT.slice(1, 3).map(x => h('span', null, 'P' + x.posicion + ' ' + App.fmt.nombre(x)))) : null);
            })) : null));
      }

      /* ---------- Detalle ---------- */
      function drawDetalle(id) {
        const t = torneos.find(x => String(x.id) === String(id));
        const back = h('a', { class: 'back', href: '#torneos-pasados' }, '← Torneos pasados');
        if (!t || t.estado !== 'finalizado') {
          root.replaceChildren(back, h('div', { class: 'empty' },
            h('strong', null, t ? 'Este torneo todavía no está finalizado' : 'No encontramos ese torneo'),
            h('span', null, t ? 'La planilla se guarda acá cuando finalizás el torneo.' : 'Puede que lo hayan borrado o que el link esté incompleto.'),
            h('a', { class: 'btn', href: t && t.estado === 'actual' ? '#torneo-actual' : '#torneos-pasados' }, t && t.estado === 'actual' ? 'Ir al torneo actual' : 'Ver torneos pasados')));
          return;
        }
        /* Un bloque por fecha; adentro, las categorías con su planilla. Se abre la fecha pedida (o la 1). */
        const ns = fechasConPlanilla(t);
        if (!abiertas) abiertas = new Set([fechaSel != null && ns.includes(fechaSel) ? fechaSel : ns[0]]);
        const fs = App.fmt.fechasDe(t);
        const todas = ns.map(n => categoriasDe(t, n));
        const pilotos = new Set();
        todas.forEach(cs => cs.forEach(c => c.filas.forEach(f => pilotos.add(f.dni || f.inscId))));

        const head = h('div', { class: 'page-head' },
          h('div', { class: 'pp-head-main' },
            h('span', { class: 'eyebrow' }, 'Torneo finalizado'),
            h('h1', null, t.nombre || 'Torneo sin nombre'),
            h('div', { class: 'pp-meta' },
              h('span', { class: 'pp-fecha' }, t.lugar || ''),
              h('span', { class: 'pill pill-ok' }, 'Finalizado el ' + fechaHora(t.finalizado)))));

        const stats = h('div', { class: 'pp-stats' },
          h('div', { class: 'pp-stat' }, h('b', null, String(ns.length)), h('span', null, ns.length === 1 ? 'Fecha' : 'Fechas')),
          h('div', { class: 'pp-stat' }, h('b', null, String(pilotos.size)), h('span', null, 'Pilotos')),
          h('div', { class: 'pp-stat' }, h('b', null, String((t.categorias || []).length || (todas[0] || []).length)), h('span', null, 'Categorías')));

        const bloques = ns.map((n, k) => {
          const cats = todas[k];
          const conTiempo = cats.reduce((s2, c) => s2 + c.filas.length, 0);
          const ganadores = cats.map(c => { const p1 = c.filas.find(f => f.posicion === 1); return p1 ? h('span', { class: 'pp-fw' }, h('b', null, c.nombre), ' ', App.fmt.nombre(p1)) : null; });
          const det = h('details', { class: 'pp-fblk', open: abiertas.has(n) },
            h('summary', null,
              h('span', { class: 'pp-fblk-top' },
                h('span', { class: 'pp-fblk-n' }, 'Fecha ' + n),
                fs[n - 1] ? h('span', { class: 'pp-fblk-dia' }, App.fmt.fechaLarga(fs[n - 1])) : null,
                h('span', { class: 'pill' }, pl(conTiempo, 'piloto', 'pilotos')),
                h('span', { class: 'spacer' }),
                h('span', { class: 'pp-fblk-chev', 'aria-hidden': 'true' }, '▾')),
              h('span', { class: 'pp-fblk-gan' }, ganadores)),
            h('div', { class: 'pp-fblk-body' }, cats.length ? cats.map(c => h('section', { class: 'pp-section', 'aria-label': c.nombre + ' · fecha ' + n },
              h('div', { class: 'section-title' }, h('h2', null, c.nombre), h('span', { class: 'muted' }, pl(c.filas.length, 'competidor', 'competidores'))),
              c.filas.length ? tabla(c) : h('p', { class: 'pp-none' }, 'Sin competidores en esta categoría')))
              : h('div', { class: 'empty' }, 'Esta fecha no tiene planilla guardada.')));
          det.addEventListener('toggle', () => { if (det.open) abiertas.add(n); else abiertas.delete(n); });
          return det;
        });

        root.replaceChildren(back, head, stats, h('div', { class: 'pp-fblks' }, bloques));
        if (fechaSel != null && !irA) { irA = true; const d = bloques[ns.indexOf(fechaSel)]; d && setTimeout(() => d.scrollIntoView({ block: 'start' }), 50); }
      }

      function tabla(c) {
        return h('div', { class: 'table-wrap' },
          h('table', { class: 'tbl pp-tbl' },
            h('thead', null, h('tr', null,
              h('th', { class: 'center', scope: 'col' }, 'Pos'),
              h('th', { scope: 'col' }, 'Kart'),
              h('th', { scope: 'col' }, 'Competidor'),
              h('th', { scope: 'col' }, 'DNI'),
              h('th', { class: 'num', scope: 'col' }, 'Puntos'))),
            h('tbody', null, c.filas.map(f => {
              const p = f.posicion;
              const cls = p != null && p <= 3 ? 'podio p' + p : '';
              return h('tr', { class: cls || null },
                h('td', { class: 'center pos' }, badge(p)),
                h('td', null, h('span', { class: 'kart-no' }, f.nroKarting || '—')),
                h('td', { class: 'comp' }, App.fmt.nombre(f) || 'Sin nombre', f.invitado ? [' ', h('span', { class: 'pill pill-inv' }, 'Invitado')] : null),
                h('td', { class: 'dni' }, f.dni || '—'),
                h('td', { class: 'num pts' }, f.puntos == null ? '—' : String(f.puntos)));
            }))));
      }

      draw();
    },
  });
})();
