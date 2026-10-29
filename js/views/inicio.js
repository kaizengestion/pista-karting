/* Inicio: tablero del administrador. Torneo en curso, accesos grandes, link de inscripción y datos de ejemplo. */
(function () {
  const { h } = App;

  App.css(`
.v-inicio .hero { border-top: 4px solid var(--accent); display: flex; flex-direction: column; gap: 14px; }
.v-inicio .hero-top { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.v-inicio .hero h1 { font-size: 2.4rem; overflow-wrap: anywhere; }
.v-inicio .hero-meta { display: flex; gap: 6px 14px; flex-wrap: wrap; color: var(--ink-2); }
.v-inicio .hero-meta strong { color: var(--ink); font-weight: 600; }
.v-inicio .cats { display: grid; gap: 12px 20px; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.v-inicio .cat { display: flex; flex-direction: column; gap: 6px; }
.v-inicio .cat-line { display: flex; align-items: baseline; gap: 8px; }
.v-inicio .cat-name { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.v-inicio .cat-num { margin-left: auto; font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; font-variant-numeric: tabular-nums; }
.v-inicio .cat-num span { color: var(--ink-3); font-weight: 600; font-size: .95rem; }
.v-inicio .bar { height: 8px; border-radius: 99px; background: var(--surface-2); border: 1px solid var(--line); overflow: hidden; }
.v-inicio .bar > i { display: block; height: 100%; background: var(--accent); border-radius: 99px; }
.v-inicio .bar.full > i { background: var(--warn); }
.v-inicio .bar.over > i { background: var(--danger); }

.v-inicio .board { display: grid; gap: 14px; grid-template-columns: repeat(6, minmax(0, 1fr)); }
.v-inicio .tile { grid-column: span 2; position: relative; display: flex; flex-direction: column; gap: 10px; min-height: 168px; padding: 18px 18px 16px;
  background: var(--surface); color: var(--ink); border: 1.5px solid var(--line); border-radius: 8px; box-shadow: var(--shadow);
  text-decoration: none; transition: border-color .15s, transform .15s, box-shadow .15s; }
.v-inicio .tile:nth-child(-n+2) { grid-column: span 3; }
.v-inicio .tile:hover { border-color: var(--ink); transform: translateY(-2px); }
.v-inicio .tile:active { transform: translateY(0); }
.v-inicio .tile .ico { display: inline-grid; place-items: center; width: 44px; height: 44px; border-radius: 6px; background: var(--surface-2); color: var(--ink); flex: none; }
.v-inicio .tile-text { display: flex; flex-direction: column; gap: 4px; margin-top: auto; min-width: 0; }
.v-inicio .tile-title { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; font-size: 1.65rem; line-height: 1.05; letter-spacing: .01em; }
.v-inicio .tile-sub { color: var(--ink-2); font-size: .95rem; }
.v-inicio .tile .go { position: absolute; top: 18px; right: 18px; color: var(--ink-3); transition: transform .15s, color .15s; }
.v-inicio .tile:hover .go { color: var(--ink); transform: translateX(3px); }
.v-inicio .tile-hot { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.v-inicio .tile-hot:hover { border-color: var(--accent-ink); }
.v-inicio .tile-hot .ico { background: var(--accent-ink); color: var(--accent); }
.v-inicio .tile-hot .tile-sub, .v-inicio .tile-hot .go, .v-inicio .tile-hot:hover .go { color: var(--accent-ink); }
.v-inicio .tile-hot .tile-sub { opacity: .8; }

.v-inicio .link-card { display: flex; flex-direction: column; gap: 12px; }
.v-inicio .link-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.v-inicio .ico-btn { display: inline-flex; }
.v-inicio .link-row input { flex: 1 1 260px; min-width: 0; font-family: var(--font-mono); font-size: .9rem; background: var(--surface-2); }
.v-inicio .demo-foot { display: flex; gap: 10px 14px; align-items: center; flex-wrap: wrap; color: var(--ink-3); font-size: .88rem; border-top: 1px dashed var(--line); padding-top: 14px; }

@media (max-width: 820px) {
  .v-inicio .board { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .v-inicio .tile, .v-inicio .tile:nth-child(-n+2) { grid-column: span 1; }
  .v-inicio .tile:last-child { grid-column: 1 / -1; min-height: 0; }
}
@media (max-width: 640px) {
  .v-inicio .hero h1 { font-size: 1.8rem; }
  .v-inicio .board { gap: 10px; }
  .v-inicio .tile { min-height: 132px; padding: 14px; }
  .v-inicio .tile-title { font-size: 1.35rem; }
  .v-inicio .tile .go { top: 14px; right: 14px; }
}
@media (max-width: 440px) {
  .v-inicio .board { grid-template-columns: minmax(0, 1fr); }
  .v-inicio .tile, .v-inicio .tile:nth-child(-n+2), .v-inicio .tile:last-child { grid-column: auto; flex-direction: row; align-items: center; min-height: 0; gap: 14px; padding: 14px 44px 14px 14px; }
  .v-inicio .tile-text { margin-top: 0; }
  .v-inicio .tile .go { top: 50%; transform: translateY(-50%); }
  .v-inicio .tile:hover .go { transform: translate(3px, -50%); }
}
@media (prefers-reduced-motion: reduce) {
  .v-inicio .tile, .v-inicio .tile .go { transition: none; }
  .v-inicio .tile:hover { transform: none; }
}
`);

  const ICONS = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/><path d="M19 6l1.5-1.5"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3"/><path d="M7 5H4v2a3 3 0 0 0 3 3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  };
  function icon(name, cls, size) {
    const s = h('span', { class: cls || 'ico', 'aria-hidden': 'true' });
    const px = size || 22;
    s.innerHTML = '<svg viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</svg>';
    return s;
  }
  const plural = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);

  function torneoActual(ts) {
    const S = window.Store;
    return (S && S.torneoActual) ? S.torneoActual(ts) : (ts.find(t => t.estado === 'actual') || null);
  }
  function torneoInscripcion(ts) {
    const S = window.Store;
    if (S && S.torneoInscripcion) return S.torneoInscripcion(ts);
    return torneoActual(ts) || ts.filter(t => t.estado === 'proximo').sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))[0] || null;
  }
  /* "Copa Primavera — Fecha 4" -> "la Fecha 4"; si no tiene subtítulo, el nombre completo */
  function nombreCorto(t) {
    const partes = String(t.nombre || '').split(/\s+[—–-]\s+/);
    const corto = partes.length > 1 ? partes[partes.length - 1] : t.nombre || 'el torneo';
    return /^fecha\b/i.test(corto) ? 'la ' + corto : corto;
  }
  function suscribir(ctx, unsub) {
    if (typeof unsub === 'function') ctx.onCleanup(unsub);
    else if (unsub && typeof unsub.then === 'function') unsub.then(f => { if (typeof f !== 'function') return; if (ctx.isCurrent()) ctx.onCleanup(f); else f(); });
  }

  App.view('inicio', {
    title: 'Inicio',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      let torneos = null, inscs = null;

      const heroBox = h('div', null, h('p', { class: 'loading' }, 'Cargando…'));
      const board = h('nav', { class: 'board', 'aria-label': 'Secciones principales' });
      const demoBox = h('div');

      /* Link de inscripción: se arma una sola vez para no perder la selección del texto */
      const link = App.linkInscripcion();
      const linkInput = h('input', { type: 'text', readonly: true, value: link, 'aria-label': 'Link de inscripción', onfocus: (e) => e.target.select() });
      const copiar = () => {
        const fallback = () => { linkInput.focus(); linkInput.select(); App.toast('Seleccioná y copiá el link'); };
        try {
          if (!navigator.clipboard || !navigator.clipboard.writeText) return fallback();
          navigator.clipboard.writeText(link).then(() => App.toast('Link copiado', 'ok')).catch(fallback);
        } catch (e) { fallback(); }
      };
      const linkCard = h('section', { class: 'card link-card', 'aria-labelledby': 'ini-link-t' },
        h('div', { class: 'stack', style: { gap: '4px' } },
          h('h2', { id: 'ini-link-t' }, 'Link de inscripción para competidores'),
          h('p', { class: 'muted' }, 'Compartí este link por WhatsApp o mail. Lo que completen aparece en Competidores.')),
        h('div', { class: 'link-row' },
          linkInput,
          h('button', { type: 'button', class: 'btn btn-dark', onclick: copiar }, icon('copy', 'ico-btn', 18), 'Copiar link'),
          h('a', { class: 'btn btn-ghost', href: '#registro' }, 'Ver formulario')));

      el.appendChild(h('div', { class: 'v-inicio stack-lg' }, heroBox, board, linkCard, demoBox));

      function heroNode() {
        const actual = torneoActual(torneos);
        const t = actual || torneoInscripcion(torneos);
        if (!t) {
          return h('section', { class: 'card hero' },
            h('div', { class: 'eyebrow' }, 'Sin torneos cargados'),
            h('h1', null, 'RGK Santafesino'),
            h('p', { class: 'muted' }, 'Creá el primer torneo para abrir la inscripción de competidores.'),
            h('div', null, h('a', { class: 'btn btn-primary', href: '#proximos-torneos' }, 'Crear torneo')));
        }
        const delTorneo = inscs.filter(i => i.torneoId === t.id);
        /* Anotados por categoría (un piloto puede estar en más de una). La barra se mide contra la categoría más llena. */
        const conteo = (t.categorias || []).map(c => ({ nombre: c.nombre, n: delTorneo.filter(i => window.Store.categoriasDe(i).includes(c.nombre)).length }));
        const max = Math.max(1, ...conteo.map(c => c.n));
        const cats = conteo.filter(c => c.n).map(c => h('div', { class: 'cat' },
          h('div', { class: 'cat-line' }, h('span', { class: 'cat-name' }, c.nombre), h('span', { class: 'cat-num' }, String(c.n))),
          h('div', { class: 'bar', role: 'img', 'aria-label': c.nombre + ': ' + c.n + ' anotados' }, h('i', { style: { width: Math.round(c.n / max * 100) + '%' } }))));
        return h('section', { class: 'card hero', 'aria-label': actual ? 'Torneo en curso' : 'Próximo torneo' },
          h('div', { class: 'hero-top' },
            h('span', { class: 'eyebrow' }, actual ? 'Torneo en curso' : 'Próximo torneo · sin torneo en curso'),
            actual ? h('span', { class: 'pill pill-live' }, 'En curso') : h('span', { class: 'pill' }, 'Inscripción abierta'),
            etiquetaFecha(t)),
          h('h1', null, t.nombre || 'Torneo sin nombre'),
          h('div', { class: 'hero-meta' },
            h('span', null, App.fmt.fechasTexto(t, true)),
            t.lugar ? h('span', null, t.lugar) : null,
            h('span', null, h('strong', { class: 'tnum' }, plural(delTorneo.length, 'piloto anotado', 'pilotos anotados')))),
          cats.length ? h('div', { class: 'cats' }, cats) : h('p', { class: 'muted small' }, 'Todavía no hay anotados.'));
      }

      /* "Fecha 2 de 3" en un torneo de varias fechas: la última que ya llegó (o la 1 si ninguna) */
      function etiquetaFecha(t) {
        const fs = App.fmt.fechasDe(t);
        if (fs.length < 2) return null;
        const d = new Date();
        const hoy = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        let n = 1;
        fs.forEach((f, k) => { if (f <= hoy) n = k + 1; });
        return h('span', { class: 'pill' }, 'Fecha ' + n + ' de ' + fs.length);
      }

      function tile(href, ico, title, sub, hot) {
        return h('a', { class: 'tile' + (hot ? ' tile-hot' : ''), href },
          icon(ico),
          h('span', { class: 'tile-text' }, h('span', { class: 'tile-title' }, title), h('span', { class: 'tile-sub' }, sub)),
          icon('arrow', 'go', 22));
      }

      function boardNodes() {
        const actual = torneoActual(torneos);
        const tIns = torneoInscripcion(torneos);
        const nProx = torneos.filter(t => t.estado === 'proximo').length;
        const nPas = torneos.filter(t => t.estado === 'finalizado').length;
        const subComp = tIns
          ? plural(inscs.filter(i => i.torneoId === tIns.id).length, 'anotado', 'anotados') + ' en ' + nombreCorto(tIns)
          : plural(inscs.length, 'competidor', 'competidores') + ' en total';
        return [
          tile('#competidores', 'users', 'Competidores', subComp),
          tile('#torneo-actual', 'timer', 'Torneo actual', actual ? 'Cargar tiempos y finalizar' : 'No hay torneo en curso', true),
          tile('#proximos-torneos', 'calendar', 'Próximos torneos', nProx ? plural(nProx, 'programado', 'programados') : 'Ninguno programado'),
          tile('#torneos-pasados', 'trophy', 'Torneos pasados', nPas ? plural(nPas, 'finalizado', 'finalizados') : 'Todavía ninguno'),
          tile('#buscar', 'search', 'Buscar datos', 'Competidores y torneos'),
        ];
      }

      function demoNodes() {
        const hayEjemplos = torneos.some(t => t.ejemplo) || inscs.some(i => i.ejemplo);
        if (hayEjemplos) {
          return h('div', { class: 'demo-foot' },
            h('span', null, 'Estás viendo datos de ejemplo.'),
            h('button', {
              type: 'button', class: 'btn btn-ghost btn-sm', onclick: async () => {
                const ok = await App.confirm({
                  title: '¿Borrar los datos de ejemplo?',
                  body: 'Se borran los torneos y competidores de ejemplo. Lo que hayas cargado vos queda como está.',
                  okLabel: 'Borrar datos de ejemplo', danger: true,
                });
                if (!ok) return;
                try { await S.borrarEjemplos(); App.toast('Datos de ejemplo borrados', 'ok'); }
                catch (e) { App.toast('No se pudieron borrar: ' + (e && e.message || e), 'error'); }
              },
            }, 'Borrar datos de ejemplo'));
        }
        if (App.mode === 'demo') return h('div', { class: 'demo-foot' }, h('span', null, 'Modo demostración: lo que cargues se guarda solo en este navegador.'));
        return null;
      }

      function draw() {
        if (!torneos || !inscs || !ctx.isCurrent()) return;
        heroBox.replaceChildren(heroNode());
        board.replaceChildren(...boardNodes());
        demoBox.replaceChildren(...[demoNodes()].filter(Boolean));
      }

      // Mientras cargan los datos, los accesos ya se pueden usar
      board.replaceChildren(
        tile('#competidores', 'users', 'Competidores', 'Cargando…'),
        tile('#torneo-actual', 'timer', 'Torneo actual', 'Cargar tiempos y finalizar', true),
        tile('#proximos-torneos', 'calendar', 'Próximos torneos', 'Cargando…'),
        tile('#torneos-pasados', 'trophy', 'Torneos pasados', 'Cargando…'),
        tile('#buscar', 'search', 'Buscar datos', 'Competidores y torneos'));

      suscribir(ctx, S.watchTorneos(ts => { torneos = ts || []; draw(); }));
      suscribir(ctx, S.watchInscripciones(list => { inscs = list || []; draw(); }));
    },
  });
})();
