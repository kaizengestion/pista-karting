/* Buscar datos: búsqueda en vivo, sin acentos, sobre competidores, torneos y resultados de torneos pasados. */
(function () {
  const { h } = App;

  App.css(`
.v-buscar .searchbox { position: relative; }
.v-buscar .searchbox .ico { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--ink-3); pointer-events: none; display: inline-flex; }
.v-buscar .searchbox input[type="search"] { font-size: 1.25rem; min-height: 58px; padding: 12px 16px 12px 50px; border: 2px solid var(--ink); border-radius: 8px; box-shadow: var(--shadow); }
.v-buscar .searchbox input[type="search"]:focus { border-color: var(--track); }
.v-buscar .chips { display: flex; gap: 8px; flex-wrap: wrap; }
.v-buscar .chip { font: 600 .9rem var(--font-body); display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; min-height: 36px; border-radius: 999px;
  border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); cursor: pointer; }
.v-buscar .chip:hover { border-color: var(--ink-3); color: var(--ink); }
.v-buscar .chip[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.v-buscar .chip .n { opacity: .7; font-variant-numeric: tabular-nums; }
.v-buscar .group { display: flex; flex-direction: column; gap: 10px; }
.v-buscar .group h2 { font-size: 1.15rem; }
.v-buscar .group h2 .n { color: var(--ink-3); }
.v-buscar .list { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.v-buscar .res { display: flex; gap: 12px; align-items: center; width: 100%; padding: 12px 14px; background: none; border: 0; border-bottom: 1px solid var(--line);
  font: inherit; color: inherit; text-align: left; text-decoration: none; cursor: pointer; }
.v-buscar .res:last-child { border-bottom: 0; }
.v-buscar .res:hover { background: var(--surface-2); }
.v-buscar .res:focus-visible { outline-offset: -2px; }
.v-buscar .res .main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.v-buscar .res .t { font-weight: 600; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; overflow-wrap: anywhere; }
.v-buscar .res .sub { color: var(--ink-2); font-size: .88rem; overflow-wrap: anywhere; }
.v-buscar .res .extra { color: var(--ink-3); font-size: .84rem; overflow-wrap: anywhere; }
.v-buscar .res .extra b { color: var(--ink-2); font-weight: 600; }
.v-buscar .res .side { flex: none; text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.v-buscar .res .pos { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; line-height: 1; font-variant-numeric: tabular-nums; }
.v-buscar .res .chev { flex: none; color: var(--ink-3); display: inline-flex; }
.v-buscar .res .kart-no.hit { box-shadow: 0 0 0 2px var(--ink); }
.v-buscar mark { background: var(--accent); color: var(--accent-ink); border-radius: 2px; padding: 0 1px; }
.v-buscar .more { align-self: flex-start; }
.v-buscar .hint-card { display: flex; flex-direction: column; gap: 12px; }
.v-buscar .sugs { display: flex; gap: 8px; flex-wrap: wrap; }
.v-buscar .status { color: var(--ink-3); font-size: .88rem; min-height: 1.3em; }
@media (max-width: 520px) {
  .v-buscar .searchbox input[type="search"] { font-size: 1.05rem; min-height: 52px; padding-left: 46px; }
  .v-buscar .res { padding: 11px 12px; gap: 10px; }
  .v-buscar .res .chev { display: none; }
}
`);

  const SVG = (inner, px) => '<svg viewBox="0 0 24 24" width="' + (px || 20) + '" height="' + (px || 20) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  function icon(inner, cls, px) { const s = h('span', { class: cls, 'aria-hidden': 'true' }); s.innerHTML = SVG(inner, px); return s; }
  const I_SEARCH = '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>';
  const I_CHEV = '<path d="m9 6 6 6-6 6"/>';

  const ESTADOS = { actual: ['En curso', 'pill pill-live'], proximo: ['Próximo', 'pill'], finalizado: ['Finalizado', 'pill pill-ok'] };
  const RANGO = { actual: 0, proximo: 1, finalizado: 2 };
  const LIMITE = 25;

  function suscribir(ctx, unsub) {
    if (typeof unsub === 'function') ctx.onCleanup(unsub);
    else if (unsub && typeof unsub.then === 'function') unsub.then(f => { if (typeof f !== 'function') return; if (ctx.isCurrent()) ctx.onCleanup(f); else f(); });
  }

  /* ---------- Coincidencias y resaltado (sin acentos; los términos solo de dígitos también ignoran puntos y guiones) ---------- */
  const esDigitos = (t) => /^\d+$/.test(t);
  const soloDigitos = (s) => String(s == null ? '' : s).replace(/\D/g, '');
  function coincide(valor, term) {
    if (valor == null || valor === '') return false;
    if (App.fmt.norm(valor).includes(term)) return true;
    return esDigitos(term) && term.length >= 3 && soloDigitos(valor).includes(term);
  }
  function mapa(texto, modo) {
    let s = ''; const idx = [];
    for (let i = 0; i < texto.length; i++) {
      const ch = texto[i];
      const n = modo === 'dig' ? (/\d/.test(ch) ? ch : '') : App.fmt.norm(ch);
      for (let k = 0; k < n.length; k++) { s += n[k]; idx.push(i); }
    }
    return { s, idx };
  }
  function rangos(texto, terms) {
    const out = [];
    const nm = mapa(texto, 'norm');
    let dm = null;
    const buscarEn = (m, t) => {
      let found = false, p = m.s.indexOf(t);
      while (p !== -1) { out.push([m.idx[p], m.idx[p + t.length - 1] + 1]); found = true; p = m.s.indexOf(t, p + t.length); }
      return found;
    };
    terms.forEach(t => {
      if (!buscarEn(nm, t) && esDigitos(t) && t.length >= 3) { dm = dm || mapa(texto, 'dig'); buscarEn(dm, t); }
    });
    out.sort((a, b) => a[0] - b[0]);
    const merged = [];
    out.forEach(r => { const last = merged[merged.length - 1]; if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push(r.slice()); });
    return merged;
  }
  function hl(valor, terms) {
    const texto = String(valor == null ? '' : valor);
    const rs = rangos(texto, terms);
    if (!rs.length) return texto;
    const out = []; let pos = 0;
    rs.forEach(([a, b]) => { if (a > pos) out.push(texto.slice(pos, a)); out.push(h('mark', null, texto.slice(a, b))); pos = b; });
    if (pos < texto.length) out.push(texto.slice(pos));
    return out;
  }
  /* Todos los términos tienen que aparecer en algún campo */
  function todos(campos, terms) { return terms.every(t => campos.some(v => coincide(v, t))); }

  /* ---------- Ficha de solo lectura (si no está KartUI) ---------- */
  function fichaSoloLectura(i, torneo) {
    const filas = [
      ['Apellido y nombre', App.fmt.nombre(i)], ['DNI', i.dni], ['Torneo', torneo && torneo.nombre], ['Categorías', window.Store.categoriasDe(i).join(', ')],
      ['Nº de kart', i.nroKarting], ['Teléfono', i.telefono], ['Email', i.email],
      ['Domicilio', [i.direccion, i.localidad, i.provincia].filter(Boolean).join(', ')], ['Grupo sanguíneo', i.grupoSanguineo],
      ['Emergencia', [i.emergenciaNombre, i.emergenciaTelefono].filter(Boolean).join(' · ')],
    ];
    App.modal({
      title: App.fmt.nombre(i),
      content: h('div', { class: 'table-wrap' }, h('table', { class: 'tbl' }, h('tbody', null,
        filas.map(([k, v]) => h('tr', null, h('th', { scope: 'row' }, k), h('td', { style: { overflowWrap: 'anywhere' } }, v || '—')))))),
      actions: [{ label: 'Cerrar', kind: 'ghost' }],
    });
  }

  App.view('buscar', {
    title: 'Buscar',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      let torneos = null, inscs = null;
      const st = { q: (ctx.param || '').replace(/~/g, ' '), f: 'todo', abiertos: {} };

      const input = h('input', {
        type: 'search', id: 'buscar-q', autofocus: true, autocomplete: 'off', spellcheck: 'false', value: st.q,
        placeholder: 'Nombre, DNI, teléfono, nº de kart, localidad, torneo…',
        'aria-label': 'Buscar competidores y torneos', 'aria-describedby': 'buscar-status',
      });
      input.addEventListener('input', () => { st.q = input.value; st.abiertos = {}; recordar(); dibujar(); });
      const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Qué buscar' });
      const status = h('p', { class: 'status', id: 'buscar-status', 'aria-live': 'polite' });
      const resBox = h('div', { class: 'stack-lg' });

      el.appendChild(h('div', { class: 'v-buscar stack' },
        h('div', { class: 'page-head' }, h('h1', null, 'Buscar datos')),
        h('div', { class: 'searchbox' }, icon(I_SEARCH, 'ico', 22), input),
        chips, status, resBox));
      requestAnimationFrame(() => { if (ctx.isCurrent()) input.focus(); });

      /* Guarda la búsqueda en la URL (#buscar~texto) para volver atrás sin perderla; no dispara el router */
      function recordar() {
        try {
          const q = st.q.trim().replace(/~/g, ' ');
          history.replaceState(history.state, '', '#buscar' + (q ? '~' + encodeURIComponent(q) : ''));
        } catch (e) { /* el visor puede no permitirlo */ }
      }

      const torneoDe = (id) => (torneos || []).find(t => t.id === id) || null;
      const terminos = () => App.fmt.norm(st.q).trim().split(/\s+/).filter(Boolean);

      function buscar(terms) {
        // Competidores
        const comp = inscs.filter(i => {
          const t = torneoDe(i.torneoId);
          return todos([i.nombre, i.apellido, i.dni, i.direccion, i.localidad, i.provincia, i.telefono, i.email, i.nroKarting,
            ...S.categoriasDe(i), i.obraSocial, i.emergenciaNombre, i.grupoSanguineo, t && t.nombre], terms);
        }).map((i, n) => ({ i, t: torneoDe(i.torneoId), n }))
          .sort((a, b) => ((RANGO[a.t && a.t.estado] ?? 3) - (RANGO[b.t && b.t.estado] ?? 3)) || a.n - b.n);

        // Torneos
        const tor = torneos.filter(t => todos([t.nombre, t.lugar, t.fecha, App.fmt.fechasTexto(t), App.fmt.fechaLarga(t.fecha), t.notas,
          (ESTADOS[t.estado] || [])[0], ...(t.categorias || []).map(c => c.nombre)], terms))
          .sort((a, b) => ((RANGO[a.estado] ?? 3) - (RANGO[b.estado] ?? 3)) || (a.estado === 'finalizado' ? String(b.fecha).localeCompare(String(a.fecha)) : String(a.fecha).localeCompare(String(b.fecha))));

        // Pilotos en resultados de torneos finalizados (al menos un término tiene que coincidir con el piloto)
        const res = [];
        torneos.filter(t => t.estado === 'finalizado' && t.resultados).sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).forEach(t => {
          // Torneos de varias fechas: una planilla por fecha
          const planillas = t.resultadosFechas ? Object.keys(t.resultadosFechas).map(n => [+n, t.resultadosFechas[n]]) : [[null, t.resultados]];
          planillas.forEach(([n, resultados]) => Object.keys(resultados || {}).forEach(cat => {
            (resultados[cat] || []).forEach(r => {
              const piloto = [r.nombre, r.apellido, r.dni, r.nroKarting, r.nroMotor];
              if (!terms.some(w => piloto.some(v => coincide(v, w)))) return;
              if (!todos([...piloto, t.nombre, cat], terms)) return;
              res.push({ r, t, cat, n });
            });
          }));
        });
        return { comp, tor, res };
      }

      function abrirCompetidor(i) {
        if (window.KartUI && typeof window.KartUI.verFicha === 'function') window.KartUI.verFicha(i, torneos, { inscripciones: inscs });
        else fichaSoloLectura(i, torneoDe(i.torneoId));
      }
      function rutaTorneo(t) {
        if (t.estado === 'actual') return '#torneo-actual';
        if (t.estado === 'finalizado') return '#torneos-pasados~' + encodeURIComponent(t.id);
        return '#proximos-torneos';
      }
      const chev = () => icon(I_CHEV, 'chev', 18);
      const pillEstado = (t) => { const e = ESTADOS[t.estado] || [t.estado || '—', 'pill']; return h('span', { class: e[1] }, e[0]); };

      function filaCompetidor({ i, t }, terms) {
        const kartHit = terms.some(w => coincide(i.nroKarting, w));
        const extras = [['telefono', 'Teléfono'], ['email', 'Email'], ['direccion', 'Domicilio'], ['localidad', 'Localidad'], ['obraSocial', 'Obra social'], ['emergenciaNombre', 'Emergencia']]
          .filter(([k]) => terms.some(w => coincide(i[k], w)));
        const nombre = [i.apellido, i.nombre].filter(Boolean);
        return h('button', { type: 'button', class: 'res', onclick: () => abrirCompetidor(i) },
          i.nroKarting ? h('span', { class: 'kart-no' + (kartHit ? ' hit' : '') }, i.nroKarting) : h('span', { class: 'kart-no', style: { opacity: '.35' } }, '—'),
          h('span', { class: 'main' },
            h('span', { class: 't' },
              h('span', null, nombre.length > 1 ? [hl(i.apellido, terms), ', ', hl(i.nombre, terms)] : hl(nombre[0] || 'Sin nombre', terms)),
              S.categoriasDe(i).map(c => h('span', { class: 'pill' }, hl(c, terms)))),
            h('span', { class: 'sub' },
              'DNI ', i.dni ? hl(i.dni, terms) : '—',
              ' · ', t ? hl(t.nombre, terms) : 'Torneo borrado'),
            extras.length ? h('span', { class: 'extra' }, extras.map(([k, label], n) => [n ? ' · ' : '', h('b', null, label + ': '), hl(i[k], terms)])) : null),
          chev());
      }

      function filaTorneo(t, terms) {
        const notaHit = t.notas && terms.some(w => coincide(t.notas, w));
        const catHit = (t.categorias || []).filter(c => terms.some(w => coincide(c.nombre, w)));
        return h('a', { class: 'res', href: rutaTorneo(t) },
          h('span', { class: 'main' },
            h('span', { class: 't' }, h('span', null, hl(t.nombre || 'Torneo sin nombre', terms)), pillEstado(t)),
            h('span', { class: 'sub' }, hl(App.fmt.fechasTexto(t), terms), t.lugar ? [' · ', hl(t.lugar, terms)] : null),
            notaHit ? h('span', { class: 'extra' }, h('b', null, 'Notas: '), hl(t.notas, terms)) : null,
            catHit.length ? h('span', { class: 'extra' }, h('b', null, 'Categorías: '), catHit.map((c, n) => [n ? ', ' : '', hl(c.nombre, terms)])) : null),
          chev());
      }

      function filaResultado({ r, t, cat, n }, terms) {
        const nombre = [r.apellido, r.nombre].filter(Boolean);
        const extra = [];
        if (r.dni && terms.some(w => coincide(r.dni, w))) extra.push(['DNI', r.dni]);
        if (r.nroKarting && terms.some(w => coincide(r.nroKarting, w))) extra.push(['Kart', r.nroKarting]);
        if (r.nroMotor && terms.some(w => coincide(r.nroMotor, w))) extra.push(['Motor', r.nroMotor]);
        return h('a', { class: 'res', href: '#torneos-pasados~' + encodeURIComponent(t.id) },
          h('span', { class: 'main' },
            h('span', { class: 't' }, nombre.length > 1 ? [hl(r.apellido, terms), ', ', hl(r.nombre, terms)] : hl(nombre[0] || 'Sin nombre', terms)),
            h('span', { class: 'sub' }, hl(t.nombre, terms), ' · ', hl(cat, terms), ' · ', n ? (f => f ? 'Fecha ' + f.numero + ' (' + App.fmt.diasTexto(f.dias) + ')' : 'Fecha ' + n)(App.fmt.fechasInfo(t)[n - 1]) : App.fmt.fecha(t.fecha)),
            extra.length ? h('span', { class: 'extra' }, extra.map(([k, v], n) => [n ? ' · ' : '', h('b', null, k + ': '), hl(v, terms)])) : null),
          h('span', { class: 'side' },
            r.posicion ? h('span', { class: 'pos' }, r.posicion + 'º') : h('span', { class: 'pill' }, 'Sin puesto'),
            r.puntos != null ? h('span', { class: 'mono small muted' }, r.puntos + ' pts') : null),
          chev());
      }

      function grupo(clave, titulo, items, filaFn, terms) {
        if (!items.length) return null;
        const abierto = st.abiertos[clave];
        const vis = abierto ? items : items.slice(0, LIMITE);
        return h('section', { class: 'group', 'aria-label': titulo },
          h('h2', null, titulo + ' ', h('span', { class: 'n tnum' }, '(' + items.length + ')')),
          h('div', { class: 'list' }, vis.map(x => filaFn(x, terms))),
          items.length > vis.length ? h('button', {
            type: 'button', class: 'btn btn-sm more', onclick: () => { st.abiertos[clave] = true; dibujar(); },
          }, 'Mostrar los ' + items.length) : null);
      }

      function sugerencias() {
        const out = [];
        const add = (s) => { s = String(s || '').trim(); if (s && !out.some(x => App.fmt.norm(x) === App.fmt.norm(s))) out.push(s); };
        const conApellido = inscs.find(i => i.apellido);
        if (conApellido) add(conApellido.apellido);
        const conKart = inscs.find(i => i.nroKarting);
        if (conKart) add(conKart.nroKarting);
        const conDni = inscs.find(i => soloDigitos(i.dni).length >= 4);
        if (conDni) add(soloDigitos(conDni.dni).slice(0, 4));
        const conLugar = torneos.find(t => t.lugar);
        if (conLugar) add(conLugar.lugar.split(/\s+/).filter(w => w.length > 3).pop() || conLugar.lugar);
        const conLocalidad = inscs.find(i => i.localidad);
        if (conLocalidad) add(conLocalidad.localidad);
        const t0 = torneos[0];
        if (t0 && t0.categorias && t0.categorias[0]) add(t0.categorias[0].nombre);
        return out.slice(0, 6);
      }

      function chip(val, txt, n) {
        return h('button', {
          type: 'button', class: 'chip', 'aria-pressed': String(st.f === val),
          onclick: () => { st.f = val; dibujar(); },
        }, txt, n != null ? h('span', { class: 'n' }, String(n)) : null);
      }

      function dibujar() {
        if (!torneos || !inscs || !ctx.isCurrent()) return;
        const terms = terminos();

        if (!terms.length) {
          chips.replaceChildren(chip('todo', 'Todo'), chip('comp', 'Competidores'), chip('tor', 'Torneos'));
          status.textContent = '';
          const sugs = sugerencias();
          resBox.replaceChildren(h('div', { class: 'card-flat hint-card' },
            h('h2', null, 'Qué podés buscar'),
            h('p', { class: 'muted' }, 'Buscá entre ' + inscs.length + (inscs.length === 1 ? ' inscripción' : ' inscripciones') + ' y ' + torneos.length + (torneos.length === 1 ? ' torneo' : ' torneos') +
              ', incluidos los resultados de los torneos pasados. No importan las tildes ni las mayúsculas; el DNI y el teléfono se encuentran con o sin puntos y guiones.'),
            sugs.length ? h('div', { class: 'stack', style: { gap: '8px' } },
              h('span', { class: 'eyebrow' }, 'Probá con'),
              h('div', { class: 'sugs' }, sugs.map(s => h('button', {
                type: 'button', class: 'chip', onclick: () => { input.value = s; st.q = s; recordar(); dibujar(); input.focus(); },
              }, s)))) : null));
          return;
        }

        const { comp, tor, res } = buscar(terms);
        const nTor = tor.length + res.length;
        chips.replaceChildren(chip('todo', 'Todo', comp.length + nTor), chip('comp', 'Competidores', comp.length), chip('tor', 'Torneos', nTor));

        const verComp = st.f !== 'tor', verTor = st.f !== 'comp';
        const grupos = [
          verComp ? grupo('comp', 'Competidores', comp, filaCompetidor, terms) : null,
          verTor ? grupo('tor', 'Torneos', tor, filaTorneo, terms) : null,
          verTor ? grupo('res', 'En resultados de torneos pasados', res, filaResultado, terms) : null,
        ].filter(Boolean);
        const total = (verComp ? comp.length : 0) + (verTor ? nTor : 0);
        status.textContent = total ? (total === 1 ? '1 resultado' : total + ' resultados') : '';

        if (!grupos.length) {
          const otros = comp.length + nTor;
          resBox.replaceChildren(h('div', { class: 'empty' },
            h('strong', null, 'No encontramos nada con “' + st.q.trim() + '”' + (otros ? ' en esta sección' : '') + '.'),
            otros
              ? h('button', { type: 'button', class: 'btn btn-sm', onclick: () => { st.f = 'todo'; dibujar(); } }, 'Ver los ' + otros + ' resultados en Todo')
              : h('span', null, 'Revisá cómo está escrito o probá con una parte: solo el apellido, el DNI sin puntos o el número de kart.'),
            h('button', { type: 'button', class: 'btn btn-ghost btn-sm', onclick: () => { input.value = ''; st.q = ''; recordar(); dibujar(); input.focus(); } }, 'Limpiar búsqueda')));
          return;
        }
        resBox.replaceChildren(...grupos);
      }

      resBox.replaceChildren(h('p', { class: 'loading' }, 'Cargando…'));
      suscribir(ctx, S.watchTorneos(ts => { torneos = ts || []; dibujar(); }));
      suscribir(ctx, S.watchInscripciones(list => { inscs = list || []; dibujar(); }));
    },
  });
})();
