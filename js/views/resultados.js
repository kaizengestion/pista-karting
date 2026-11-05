/* Resultados para competidores: una pantalla de solo lectura con los torneos finalizados y las fechas ya
   corridas del torneo actual. Mientras la página funciona sin base compartida, los datos viajan dentro del link
   (comprimidos), así el competidor ve lo que subió el administrador sin poder tocar nada. Sin DNI ni fotos.
   Link: <página>#resultados~<datos> */
(function () {
  const h = App.h;

  App.css(`
.v-res { display: flex; flex-direction: column; gap: 22px; }
.v-res .res-head { display: flex; flex-direction: column; gap: 6px; border-bottom: 3px solid var(--accent); padding-bottom: 12px; }
.v-res .res-head p { color: var(--ink-2); }
.v-res .res-buscar { max-width: 420px; }
.v-res .res-torneo { display: flex; flex-direction: column; gap: 12px; }
.v-res .res-torneo > header { display: flex; flex-direction: column; gap: 4px; }
.v-res .res-torneo h2 { font-size: 1.6rem; overflow-wrap: anywhere; }
.v-res .res-sub { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; color: var(--ink-2); }
.v-res .res-fecha { border: 1px solid var(--line); border-radius: 10px; background: var(--surface); }
.v-res .res-fecha[open] { border-color: var(--accent); }
.v-res .res-fecha > summary { list-style: none; cursor: pointer; padding: 14px 16px; display: flex; gap: 8px 14px; align-items: center; flex-wrap: wrap; }
.v-res .res-fecha > summary::-webkit-details-marker { display: none; }
.v-res .res-fecha-n { font: 800 1.4rem/1 var(--font-display); text-transform: uppercase; }
.v-res .res-fecha-dia { color: var(--ink-2); }
.v-res .res-chev { color: var(--ink-3); transition: transform .15s; margin-left: auto; }
.v-res .res-fecha[open] .res-chev { transform: rotate(180deg); }
.v-res .res-fecha-body { padding: 4px 16px 18px; display: flex; flex-direction: column; gap: 20px; }
@media (max-width: 640px) { .v-res .res-fecha-body { padding: 4px 8px 12px; } .v-res .res-fecha > summary { padding: 12px; } }
.v-res .res-cat { display: flex; flex-direction: column; gap: 8px; }
.v-res .res-tbl td.pos { width: 56px; }
.v-res .res-tbl td.pts { font: 800 1.1rem/1 var(--font-display); font-variant-numeric: tabular-nums; }
.v-res .res-tbl td.comp { font-weight: 500; overflow-wrap: anywhere; }
.v-res .res-tbl tr.podio td:first-child { box-shadow: inset 4px 0 0 var(--accent); }
.v-res .res-tbl tr.p1 td { background: var(--surface-2); }
.v-res .res-tbl tr.p1 td.comp { font-weight: 700; }
.v-res .res-tbl tr.encontrado td { background: var(--warn-bg); }
.v-res .pbadge { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 22px; padding: 0 6px; border-radius: 3px;
  font: 700 .85rem/1 var(--font-display); font-variant-numeric: tabular-nums; background: var(--surface-2); color: var(--ink-2); border: 1px solid var(--line); }
.v-res .pbadge.p1 { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.v-res .pbadge.p2, .v-res .pbadge.p3 { background: transparent; color: var(--ink); border-color: var(--accent); }
.res-link-card { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.res-link-card .link-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.res-link-card .link-row input { flex: 1 1 260px; min-width: 0; font-family: var(--font-mono); font-size: .9rem; background: var(--surface-2); }
`);

  const pl = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const cortar = (u) => { try { if (typeof u === 'function') u(); else if (u && u.then) u.then(f => typeof f === 'function' && f()); } catch (e) { /* nada */ } };
  /* Lee una vez un watch* del Store */
  const unaVez = (fn) => new Promise((res, rej) => {
    let u = null, listo = false;
    try {
      u = fn((v) => { if (listo) return; listo = true; res(v); setTimeout(() => cortar(u), 0); });
    } catch (e) { rej(e); }
  });

  /* ---------- Armar los datos que viajan en el link ----------
     { v:1, g:'fecha de generación', t:[{ n:nombre, l:lugar, e:'a'|'f', f:[{ k:número de fecha, d:[días], c:[{ n:categoría, r:[[pos, kart, nombre, puntos, invitado]] }] }] }] } */
  function filasPublicas(filas) {
    return (filas || []).map(f => [f.posicion == null ? null : +f.posicion, String(f.nroKarting || f.kart || ''),
      App.fmt.nombre(f) || String(f.nombre || '') || 'Sin nombre', f.puntos == null || f.puntos === '' ? null : +f.puntos, f.invitado ? 1 : 0])
      .sort((a, b) => (a[0] == null) - (b[0] == null) || (a[0] || 0) - (b[0] || 0));
  }
  function categoriasOrdenadas(t, res) {
    const nombres = (t.categorias || []).map(c => c.nombre).filter(Boolean);
    Object.keys(res || {}).forEach(k => { if (!nombres.includes(k)) nombres.push(k); });
    return nombres.map(n => ({ n, r: filasPublicas((res || {})[n]) })).filter(c => c.r.length);
  }

  async function armarDatos() {
    const S = window.Store;
    const [torneos, inscs] = await Promise.all([unaVez(cb => S.watchTorneos(cb)), unaVez(cb => S.watchInscripciones(cb))]);
    const salida = [];
    const actual = (torneos || []).find(t => t.estado === 'actual');
    if (actual) {
      /* Torneo actual: solo las fechas que ya tienen resultados cargados */
      const puntos = await unaVez(cb => S.watchPuntos(actual.id, cb));
      const fs = App.fmt.fechasInfo(actual);
      const fechas = [];
      const total = Math.max(fs.length, 1);
      for (let n = 1; n <= total; n++) {
        const res = {};
        (actual.categorias || []).forEach(c => {
          const doc = puntos[S.clavePuntos(n, c.nombre)];
          if (!doc || !Array.isArray(doc.filas) || !doc.filas.length) return;
          res[c.nombre] = doc.filas.map(f => {
            const i = f.inscId ? (inscs || []).find(x => x.id === f.inscId) : null;
            return { posicion: f.posicion, nroKarting: f.kart || (i && i.nroKarting) || '', nombre: i ? i.nombre : '', apellido: i ? i.apellido : f.nombre, puntos: f.puntos, invitado: !!(i && i.invitado) };
          });
        });
        const c = categoriasOrdenadas(actual, res);
        if (c.length) fechas.push({ k: fs[n - 1] ? fs[n - 1].numero : n, d: fs[n - 1] ? fs[n - 1].dias : [], c });
      }
      if (fechas.length) salida.push({ n: actual.nombre || 'Torneo actual', l: actual.lugar || '', e: 'a', f: fechas });
    }
    (torneos || []).filter(t => t.estado === 'finalizado')
      .sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || '')))
      .forEach(t => {
        const fs = App.fmt.fechasInfo(t);
        const rf = t.resultadosFechas;
        const ns = rf ? Object.keys(rf).map(Number).filter(n => n >= 1).sort((a, b) => a - b) : [1];
        const fechas = ns.map(n => ({ k: fs[n - 1] ? fs[n - 1].numero : n, d: fs[n - 1] ? fs[n - 1].dias : [],
          c: categoriasOrdenadas(t, rf ? rf[n] : t.resultados) })).filter(f => f.c.length);
        if (fechas.length) salida.push({ n: t.nombre || 'Torneo', l: t.lugar || '', e: 'f', f: fechas });
      });
    return { v: 1, g: new Date().toISOString(), t: salida };
  }

  /* ---------- Comprimir / descomprimir (base64 apto para links) ---------- */
  const aB64 = (bytes) => { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const deB64 = (t) => { const s = atob(t.replace(/-/g, '+').replace(/_/g, '/')); const b = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; };
  async function pasar(bytes, stream) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer()); }
  async function codificar(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    if (typeof CompressionStream === 'function') return '1' + aB64(await pasar(bytes, new CompressionStream('deflate-raw')));
    return '0' + aB64(bytes);
  }
  async function decodificar(txt) {
    const tipo = txt.charAt(0), bytes = deB64(txt.slice(1));
    if (tipo === '1') {
      if (typeof DecompressionStream !== 'function') throw new Error('Este navegador es muy viejo para abrir el link. Probá con otro o actualizalo.');
      return JSON.parse(new TextDecoder().decode(await pasar(bytes, new DecompressionStream('deflate-raw'))));
    }
    if (tipo === '0') return JSON.parse(new TextDecoder().decode(bytes));
    throw new Error('El link está incompleto.');
  }

  function baseUrl() {
    if (window.PK_URL) return window.PK_URL;
    return location.href.split('#')[0];
  }

  /* ---------- Tarjeta para el administrador ---------- */
  function tarjetaResultados() {
    const inp = h('input', { type: 'text', readonly: true, placeholder: 'Tocá "Generar link" para armarlo con los resultados de hoy', 'aria-label': 'Link de resultados', onfocus: (e) => e.target.select() });
    const info = h('p', { class: 'small muted' });
    let link = '';
    const btnCopiar = h('button', { type: 'button', class: 'btn btn-dark', disabled: true, onclick: () => copiar() }, 'Copiar link');
    const btnVer = h('a', { class: 'btn btn-ghost', href: '#', target: '_blank', rel: 'noopener', hidden: true }, 'Ver como competidor');
    async function copiar() {
      if (!link) return;
      try { await navigator.clipboard.writeText(link); App.toast('Link copiado. Pegalo en WhatsApp o en un mail para los competidores.', 'ok'); }
      catch (e) { inp.focus(); inp.select(); App.toast('No se pudo copiar solo: copialo a mano (ya está seleccionado).'); }
    }
    async function generar(btn) {
      btn.disabled = true;
      const txt = btn.textContent; btn.textContent = 'Armando…';
      try {
        const datos = await armarDatos();
        if (!datos.t.length) { App.toast('Todavía no hay resultados cargados para mostrar.', 'error'); return; }
        link = baseUrl() + '#resultados~' + await codificar(datos);
        inp.value = link; btnCopiar.disabled = false; btnVer.href = link; btnVer.hidden = false;
        const nf = datos.t.reduce((s, t) => s + t.f.length, 0);
        info.textContent = 'Incluye ' + pl(datos.t.length, 'torneo', 'torneos') + ' y ' + pl(nf, 'fecha', 'fechas') + ' con resultados.' +
          (link.length > 30000 ? ' Es un link largo: si WhatsApp lo corta, mandalo por mail.' : '');
        await copiar();
      } catch (e) { console.error(e); App.toast('No se pudo armar el link: ' + (e && e.message || e), 'error'); }
      finally { btn.disabled = false; btn.textContent = txt; }
    }
    return h('section', { class: 'card res-link-card', 'aria-label': 'Link de resultados para competidores' },
      h('div', { class: 'stack', style: { gap: '4px' } },
        h('h2', null, 'Link de resultados para competidores'),
        h('p', { class: 'muted' }, 'Los competidores ven los torneos finalizados y las fechas ya cargadas del torneo actual, sin poder modificar nada. No se muestran DNI ni fotos.'),
        h('p', { class: 'muted small' }, 'El link lleva los resultados que hay en el momento de generarlo: cuando subas resultados nuevos, generalo otra vez y volvé a mandarlo.')),
      h('div', { class: 'link-row' }, inp,
        h('button', { type: 'button', class: 'btn btn-primary', onclick: (e) => generar(e.currentTarget) }, 'Generar link'),
        btnCopiar, btnVer),
      info);
  }

  /* ---------- Pantalla pública ---------- */
  function badge(pos) {
    if (pos == null) return h('span', { class: 'pbadge' }, '—');
    return h('span', { class: 'pbadge' + (pos <= 3 ? ' p' + pos : '') }, pos <= 3 ? 'P' + pos : String(pos));
  }

  App.view('resultados', {
    title: 'Resultados',
    async render(el, ctx) {
      const root = h('div', { class: 'v-res' }, h('p', { class: 'loading' }, 'Cargando resultados…'));
      el.appendChild(root);
      let datos;
      try {
        if (!ctx.param) throw new Error('Al link le falta la parte de los resultados. Pedile al organizador que te lo mande de nuevo.');
        try { datos = await decodificar(ctx.param); }
        catch (e) { throw new Error(/viejo/.test(e && e.message) ? e.message : 'El link está incompleto o se cortó al copiarlo. Pedile al organizador que te lo mande de nuevo.'); }
      } catch (e) {
        root.replaceChildren(h('div', { class: 'empty' }, h('strong', null, 'No se pudieron abrir los resultados'), h('span', null, String(e && e.message || e))));
        return;
      }
      if (!ctx.isCurrent()) return;
      const torneos = Array.isArray(datos && datos.t) ? datos.t : [];
      const generado = datos && datos.g ? new Date(datos.g) : null;
      const buscar = h('input', { type: 'search', class: 'res-buscar', placeholder: 'Buscá tu nombre o tu kart', 'aria-label': 'Buscar competidor o kart' });
      const lista = h('div', { class: 'stack', style: { gap: '28px' } });

      function dibujar() {
        const q = App.fmt.norm(buscar.value.trim());
        const coincide = (r) => q && (App.fmt.norm(r[2]).includes(q) || String(r[1]) === q);
        lista.replaceChildren(...(torneos.length ? torneos.map((t, ti) => h('section', { class: 'res-torneo' },
          h('header', null,
            h('span', { class: 'eyebrow' }, t.e === 'a' ? 'Torneo en curso' : 'Torneo finalizado'),
            h('h2', null, t.n),
            h('div', { class: 'res-sub' }, t.l ? h('span', null, t.l) : null, h('span', { class: 'pill' + (t.e === 'a' ? ' pill-live' : ' pill-ok') }, t.e === 'a' ? 'En curso' : 'Finalizado'),
              h('span', { class: 'pill' }, pl(t.f.length, 'fecha', 'fechas')))),
          t.f.slice().reverse().map((f, k) => {
            const hay = q && f.c.some(c => c.r.some(coincide));
            return h('details', { class: 'res-fecha', open: q ? hay : (ti === 0 && k === 0) },
              h('summary', null,
                h('span', { class: 'res-fecha-n' }, 'Fecha ' + f.k),
                f.d && f.d.length ? h('span', { class: 'res-fecha-dia' }, App.fmt.diasTexto(f.d, true)) : null,
                h('span', { class: 'res-chev', 'aria-hidden': 'true' }, '▾')),
              h('div', { class: 'res-fecha-body' }, f.c.map(c => h('section', { class: 'res-cat', 'aria-label': c.n + ' · Fecha ' + f.k },
                h('div', { class: 'section-title' }, h('h3', null, c.n), h('span', { class: 'muted small' }, pl(c.r.length, 'competidor', 'competidores'))),
                h('div', { class: 'table-wrap' }, h('table', { class: 'tbl res-tbl' },
                  h('thead', null, h('tr', null,
                    h('th', { class: 'center', scope: 'col' }, 'Pos'), h('th', { scope: 'col' }, 'Kart'),
                    h('th', { scope: 'col' }, 'Competidor'), h('th', { class: 'num', scope: 'col' }, 'Puntos'))),
                  h('tbody', null, c.r.map(r => h('tr', { class: [r[0] != null && r[0] <= 3 ? 'podio p' + r[0] : '', coincide(r) ? 'encontrado' : ''].join(' ').trim() || null },
                    h('td', { class: 'center pos' }, badge(r[0])),
                    h('td', null, h('span', { class: 'kart-no' }, r[1] || '—')),
                    h('td', { class: 'comp' }, r[2], r[4] ? [' ', h('span', { class: 'pill pill-inv' }, 'Invitado')] : null),
                    h('td', { class: 'num pts' }, r[3] == null ? '—' : String(r[3])))))))))));
          })))
          : [h('div', { class: 'empty' }, h('strong', null, 'Todavía no hay resultados publicados.'))]));
      }

      root.replaceChildren(
        h('div', { class: 'res-head' },
          h('span', { class: 'eyebrow' }, 'RGK Santafesino'),
          h('h1', null, 'Resultados'),
          h('p', null, 'Torneos finalizados y fechas ya corridas.' + (generado && !isNaN(generado) ? ' Actualizado el ' + generado.toLocaleString('es-AR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).replace(/\.$/, '') + '.' : ''))),
        buscar, lista);
      buscar.addEventListener('input', dibujar);
      dibujar();
    },
  });

  App.tarjetaResultados = tarjetaResultados;
})();
