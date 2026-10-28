/* Competidores: registro de todos los anotados, con cambio de categoría al instante, edición y autorizaciones.
   Exporta KartUI.editarCompetidor(insc|null, torneos, opciones) y KartUI.verAutorizacion(insc) para otras vistas. */
(function () {
  const { h } = App;

  App.css(`
.v-competidores .head-counts { color: var(--ink-2); }
.v-competidores .head-counts strong { color: var(--ink); }
.v-competidores .head-counts .warn { color: var(--warn); font-weight: 600; }
.v-competidores .toolbar { display: grid; gap: 12px 16px; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); align-items: end; }
.v-competidores .tbl td { white-space: nowrap; }
.v-competidores .tbl td.name { white-space: normal; min-width: 170px; }
.v-competidores .tbl td.name strong { font-weight: 600; }
.v-competidores .tbl td.email { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
.v-competidores .tbl td.tor { max-width: 200px; overflow: hidden; text-overflow: ellipsis; color: var(--ink-2); font-size: .85rem; }
.v-competidores .tbl td a { text-decoration: none; }
.v-competidores .tbl td a:hover { text-decoration: underline; }
.v-competidores .tbl select.cat-sel { width: auto; min-height: 32px; padding: 4px 8px; font-size: .88rem; }
.v-competidores .tbl td.acts { text-align: right; }
.v-competidores .tbl td.acts .btn + .btn { margin-left: 6px; }
.v-competidores .pill-btn, .kart-form .pill-btn { font: inherit; font-size: .78rem; font-weight: 600; cursor: pointer; }
.v-competidores .pill-btn:hover { border-color: currentColor; }
.v-competidores .inv-cell { text-align: center; }
.kart-form .inv-check { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; padding: 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-2); }
.kart-form .inv-check input { margin-top: 2px; flex: none; }
.kart-form .inv-check span { display: flex; flex-direction: column; gap: 2px; }
.v-competidores .tabs button .n { color: var(--ink-3); font-weight: 600; }
.v-competidores .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 640px) {
  .v-competidores .toolbar { grid-template-columns: minmax(0, 1fr); }
  .v-competidores .page-head .actions { width: 100%; }
  .v-competidores .page-head .actions .btn { flex: 1; }
}

.kart-form .aut-box { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 12px; border: 1.5px dashed var(--line); border-radius: var(--radius); background: var(--surface-2); }
.kart-form .aut-thumb { width: 64px; height: 64px; object-fit: cover; border-radius: 4px; border: 1px solid var(--line); background: var(--surface); flex: none; }
.kart-form .aut-doc { width: 64px; height: 64px; display: grid; place-items: center; border-radius: 4px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font: 700 .8rem var(--font-display); flex: none; }
.kart-form .aut-info { flex: 1 1 160px; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.kart-form .aut-info .nm { font-weight: 600; overflow-wrap: anywhere; }
.kart-form .aut-acts { display: flex; gap: 6px; flex-wrap: wrap; }
.kart-form .sep { border-top: 1px solid var(--line); margin: 2px 0; }

.kart-aut { display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
.kart-aut img { display: block; max-width: 100%; max-height: 70vh; margin: 0 auto; border-radius: 4px; border: 1px solid var(--line); background: var(--surface-2); }
.kart-aut .meta { color: var(--ink-2); font-size: .88rem; overflow-wrap: anywhere; }
`);

  const CAMPOS = [
    { k: 'nombre', label: 'Nombre', req: true, ac: 'off' },
    { k: 'apellido', label: 'Apellido', req: true, ac: 'off' },
    { k: 'dni', label: 'DNI', req: true, inputmode: 'numeric' },
    { k: 'telefono', label: 'Teléfono', type: 'tel' },
    { k: 'email', label: 'Email', type: 'email' },
    { k: 'direccion', label: 'Dirección', full: true },
    { k: 'seguro', label: 'Seguro', hint: 'Compañía y nº de póliza' },
    { k: 'nroMotor', label: 'Nº de motor' },
    { k: 'nroKarting', label: 'Nº de kart', inputmode: 'numeric' },
  ];

  function torneoActual(ts) {
    const S = window.Store;
    return (S && S.torneoActual) ? S.torneoActual(ts) : (ts.find(t => t.estado === 'actual') || null);
  }
  function torneoInscripcion(ts) {
    const S = window.Store;
    if (S && S.torneoInscripcion) return S.torneoInscripcion(ts);
    return torneoActual(ts) || ts.filter(t => t.estado === 'proximo').sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))[0] || null;
  }
  function suscribir(ctx, unsub) {
    if (typeof unsub === 'function') ctx.onCleanup(unsub);
    else if (unsub && typeof unsub.then === 'function') unsub.then(f => { if (typeof f !== 'function') return; if (ctx.isCurrent()) ctx.onCleanup(f); else f(); });
  }
  const plural = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const errMsg = (e) => String(e && e.message || e || 'Error desconocido');
  function tamano(b) {
    b = +b || 0;
    if (!b) return '';
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return Math.round(b / 1024) + ' KB';
    return (b / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
  }
  function esImagen(a) { return /^image\//.test(a.tipo || '') || /\.(png|jpe?g|gif|webp|bmp|heic|heif|avif)$/i.test(a.nombre || ''); }
  function urlDe(a) { try { return window.Store.urlArchivo(a.assetId); } catch (e) { return ''; } }
  function etiquetaTorneo(t) {
    if (t.estado === 'actual') return t.nombre + ' (en curso)';
    if (t.estado === 'finalizado') return t.nombre + ' (finalizado)';
    return t.nombre + ' — ' + App.fmt.fecha(t.fecha);
  }

  /* ---------- Ver autorización ---------- */
  function verAutorizacion(insc) {
    const a = insc && insc.autorizacion;
    if (!a || !a.assetId) { App.toast('Este competidor no tiene autorización cargada'); return null; }
    const url = urlDe(a);
    const meta = h('p', { class: 'meta' }, [a.nombre, tamano(a.tamano)].filter(Boolean).join(' · '));
    let vista;
    if (esImagen(a)) {
      vista = h('img', { src: url, alt: 'Autorización de ' + App.fmt.nombre(insc) });
      vista.addEventListener('error', () => vista.replaceWith(h('div', { class: 'empty' }, 'No se pudo cargar la imagen.', h('a', { href: url, target: '_blank', rel: 'noopener' }, 'Probá abrirla en otra pestaña'))));
    } else {
      vista = h('div', { class: 'empty' },
        h('strong', null, 'Documento PDF'),
        h('a', { class: 'btn btn-dark', href: url, target: '_blank', rel: 'noopener' }, 'Abrir PDF'));
    }
    return App.modal({
      title: 'Autorización — ' + App.fmt.nombre(insc),
      content: h('div', { class: 'kart-aut' }, vista, h('div', { class: 'row' }, meta, h('span', { class: 'spacer' }),
        h('a', { href: url, target: '_blank', rel: 'noopener', class: 'small' }, 'Abrir en otra pestaña'))),
      actions: [{ label: 'Cerrar', kind: 'ghost' }],
    });
  }

  /* ---------- Editar / agregar competidor ----------
     opciones: { torneoId, categoria, inscripciones (para cupos y DNI repetido), onSaved(id) } */
  function editarCompetidor(insc, torneos, opciones) {
    const S = window.Store;
    const o = opciones || {};
    torneos = torneos || [];
    const lista = o.inscripciones || null;
    const inputs = {};
    const errores = {};

    const campos = CAMPOS.map(c => {
      const id = 'kf-' + c.k;
      const inp = h('input', { id, type: c.type || 'text', value: insc ? (insc[c.k] || '') : '', inputmode: c.inputmode, autocomplete: c.ac || 'off', 'aria-required': c.req ? 'true' : null });
      inp.addEventListener('input', () => { if (inp.getAttribute('aria-invalid')) { inp.removeAttribute('aria-invalid'); errores[c.k].textContent = ''; } });
      inputs[c.k] = inp;
      errores[c.k] = h('span', { class: 'error', role: 'alert' });
      return h('div', { class: 'field' + (c.full ? ' full' : '') },
        h('label', { for: id }, c.label + (c.req ? ' *' : '')), inp, c.hint ? h('span', { class: 'hint' }, c.hint) : null, errores[c.k]);
    });

    // Torneo y categoría
    const elegibles = torneos.filter(t => t.estado !== 'finalizado' || (insc && t.id === insc.torneoId));
    const selT = h('select', { id: 'kf-torneo' });
    const selC = h('select', { id: 'kf-cat' });
    const errT = h('span', { class: 'error', role: 'alert' });
    elegibles.forEach(t => selT.appendChild(h('option', { value: t.id }, etiquetaTorneo(t))));
    const torneoIni = (insc && insc.torneoId) || o.torneoId || (torneoInscripcion(torneos) || {}).id || (elegibles[0] || {}).id || '';
    if (torneoIni && !elegibles.some(t => t.id === torneoIni)) selT.appendChild(h('option', { value: torneoIni }, 'Torneo borrado'));
    selT.value = torneoIni;

    function llenarCategorias(preferida) {
      const t = torneos.find(x => x.id === selT.value);
      const cats = (t && t.categorias) || [];
      selC.replaceChildren();
      cats.forEach(c => {
        let txt = c.nombre;
        if (lista) {
          const n = lista.filter(i => i.torneoId === t.id && i.categoria === c.nombre && (!insc || i.id !== insc.id)).length;
          txt += ' (' + n + '/' + (c.cupo || '—') + (c.cupo && n >= c.cupo ? ', completa' : '') + ')';
        }
        selC.appendChild(h('option', { value: c.nombre }, txt));
      });
      if (preferida && !cats.some(c => c.nombre === preferida)) selC.appendChild(h('option', { value: preferida }, preferida));
      if (preferida) selC.value = preferida;
      selC.disabled = !selC.options.length;
    }
    llenarCategorias((insc && insc.categoria) || o.categoria || null);
    selT.addEventListener('change', () => { const prev = selC.value; llenarCategorias(null); if ([...selC.options].some(op => op.value === prev)) selC.value = prev; errT.textContent = ''; });

    // Autorización
    const st = { aut: (insc && insc.autorizacion) || null, subiendo: false };
    const autBox = h('div', { class: 'aut-box' });
    const fileIn = h('input', { type: 'file', accept: 'image/*,application/pdf', hidden: true, 'aria-label': 'Archivo de autorización' });
    fileIn.addEventListener('change', async () => {
      const f = fileIn.files && fileIn.files[0];
      fileIn.value = '';
      if (!f) return;
      st.subiendo = true; pintarAut();
      try {
        st.aut = await S.subirArchivo(f);
        App.toast('Autorización cargada', 'ok');
      } catch (e) {
        App.toast(errMsg(e), 'error');
      } finally {
        st.subiendo = false; pintarAut();
      }
    });
    function pintarAut() {
      if (st.subiendo) { autBox.replaceChildren(h('span', { class: 'muted' }, 'Subiendo archivo…')); return; }
      const a = st.aut;
      if (!a) {
        autBox.replaceChildren(
          h('span', { class: 'pill pill-warn' }, 'Falta'),
          h('span', { class: 'aut-info muted small' }, 'Foto o PDF de la autorización firmada por madre, padre o tutor.'),
          h('button', { type: 'button', class: 'btn btn-sm btn-dark', onclick: () => fileIn.click() }, 'Subir archivo'));
        return;
      }
      const url = urlDe(a);
      const thumb = esImagen(a) && url ? h('img', { class: 'aut-thumb', src: url, alt: '' }) : h('span', { class: 'aut-doc' }, 'PDF');
      autBox.replaceChildren(
        thumb,
        h('span', { class: 'aut-info' }, h('span', { class: 'nm' }, a.nombre || 'Archivo'), h('span', { class: 'small muted' }, tamano(a.tamano))),
        h('span', { class: 'aut-acts' },
          url ? h('a', { class: 'btn btn-sm btn-ghost', href: url, target: '_blank', rel: 'noopener' }, 'Ver') : null,
          h('button', { type: 'button', class: 'btn btn-sm', onclick: () => fileIn.click() }, 'Reemplazar'),
          h('button', { type: 'button', class: 'btn btn-sm btn-danger', onclick: () => { st.aut = null; pintarAut(); } }, 'Quitar')));
    }
    pintarAut();

    // Invitado: lo decide el organizador (los invitados corren de a dos con el mismo kart)
    const chkInv = h('input', { type: 'checkbox', id: 'kf-invitado', checked: !!(insc && insc.invitado) });
    const invField = h('label', { class: 'inv-check', for: 'kf-invitado' }, chkInv,
      h('span', null, h('strong', null, 'Competidor invitado'), h('span', { class: 'small muted' }, 'Corre con el kart de otro piloto invitado.')));

    const sinTorneos = !elegibles.length && !torneoIni;
    const form = h('form', { class: 'kart-form stack', novalidate: true, onsubmit: (e) => { e.preventDefault(); guardar(); } },
      h('div', { class: 'form-grid' }, campos),
      h('div', { class: 'sep' }),
      h('div', { class: 'form-grid' },
        h('div', { class: 'field' }, h('label', { for: 'kf-torneo' }, 'Torneo *'), selT, errT,
          sinTorneos ? h('span', { class: 'hint' }, 'Primero creá un torneo en Próximos torneos.') : null),
        h('div', { class: 'field' }, h('label', { for: 'kf-cat' }, 'Categoría *'), selC)),
      invField,
      h('div', { class: 'field' }, h('span', { class: 'label' }, 'Autorización de los padres'), autBox, fileIn));
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'file') { e.preventDefault(); guardar(); }
    });

    let guardando = false;
    let modal = null;
    async function guardar() {
      if (guardando) return;
      if (st.subiendo) { App.toast('Esperá a que termine de subir el archivo'); return; }
      const datos = {};
      CAMPOS.forEach(c => { datos[c.k] = inputs[c.k].value.trim(); });
      let primero = null;
      const marcar = (k, msg) => { inputs[k].setAttribute('aria-invalid', 'true'); errores[k].textContent = msg; primero = primero || inputs[k]; };
      CAMPOS.forEach(c => { errores[c.k].textContent = ''; inputs[c.k].removeAttribute('aria-invalid'); });
      errT.textContent = '';
      if (!datos.nombre) marcar('nombre', 'Completá el nombre');
      if (!datos.apellido) marcar('apellido', 'Completá el apellido');
      if (!datos.dni) marcar('dni', 'Completá el DNI');
      if (datos.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) marcar('email', 'Revisá el email');
      if (!selT.value) { errT.textContent = 'Elegí un torneo'; primero = primero || selT; }
      const dniLimpio = datos.dni.replace(/\D/g, '');
      if (!primero && lista && dniLimpio && !chkInv.checked) {
        const dup = lista.find(i => i.torneoId === selT.value && String(i.dni || '').replace(/\D/g, '') === dniLimpio && (!insc || i.id !== insc.id));
        if (dup) marcar('dni', 'Ya hay un competidor con ese DNI en este torneo: ' + App.fmt.nombre(dup));
      }
      if (primero) { primero.focus(); return; }
      datos.torneoId = selT.value;
      datos.categoria = selC.value || '';
      datos.autorizacion = st.aut || null;
      datos.invitado = chkInv.checked;
      guardando = true;
      const btn = modal && modal.el.querySelector('.modal-foot .btn-primary');
      if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }
      try {
        let id;
        if (insc && insc.id) { await S.actualizarInscripcion(insc.id, datos); id = insc.id; App.toast('Cambios guardados', 'ok'); }
        else { id = await S.inscribir(datos); App.toast('Competidor agregado', 'ok'); }
        modal && modal.close();
        o.onSaved && o.onSaved(id);
      } catch (e) {
        App.toast('No se pudo guardar: ' + errMsg(e), 'error');
        if (btn) { btn.disabled = false; btn.textContent = 'Guardar'; }
      } finally {
        guardando = false;
      }
    }

    modal = App.modal({
      title: insc ? 'Editar competidor' : 'Agregar competidor',
      content: form,
      actions: [
        { label: 'Cancelar', kind: 'ghost' },
        { label: 'Guardar', kind: 'primary', onClick: () => guardar() },
      ],
    });
    return modal;
  }

  window.KartUI = window.KartUI || {};
  window.KartUI.editarCompetidor = editarCompetidor;
  window.KartUI.verAutorizacion = verAutorizacion;

  /* ---------- Vista ---------- */
  App.view('competidores', {
    title: 'Competidores',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      let torneos = null, inscs = null;
      const st = { torneo: ctx.param || null, cat: '*', q: '' };
      let tablaPendiente = false;

      const counts = h('p', { class: 'head-counts' }, 'Cargando…');
      const btnAdd = h('button', {
        type: 'button', class: 'btn btn-primary', onclick: () => editarCompetidor(null, torneos || [], {
          torneoId: st.torneo && st.torneo !== '*' ? st.torneo : null,
          categoria: st.cat !== '*' ? st.cat : null,
          inscripciones: inscs || [],
        }),
      }, 'Agregar competidor');
      const selT = h('select', { id: 'comp-torneo', onchange: () => { st.torneo = selT.value; st.cat = '*'; draw(); } });
      const q = h('input', {
        id: 'comp-q', type: 'search', placeholder: 'Nombre, DNI, kart, teléfono…', autocomplete: 'off',
        oninput: () => { st.q = q.value; dibujarTabla(true); },
      });
      const tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Categorías' });
      const tablaBox = h('div');
      tablaBox.addEventListener('focusout', () => setTimeout(() => {
        const act = document.activeElement;
        if (tablaPendiente && ctx.isCurrent() && !(act && act.tagName === 'SELECT' && tablaBox.contains(act))) dibujarTabla(true);
      }, 0));

      el.appendChild(h('div', { class: 'v-competidores stack' },
        h('div', { class: 'page-head' },
          h('div', { class: 'stack', style: { gap: '6px' } }, h('h1', null, 'Competidores'), counts),
          h('div', { class: 'actions' }, btnAdd)),
        h('div', { class: 'toolbar' },
          h('div', { class: 'field' }, h('label', { for: 'comp-torneo' }, 'Torneo'), selT),
          h('div', { class: 'field' }, h('label', { for: 'comp-q' }, 'Filtrar la lista'), q)),
        tabs,
        tablaBox));

      const torneoDe = (id) => (torneos || []).find(t => t.id === id) || null;

      function opcionesTorneo() {
        const act = torneos.filter(t => t.estado === 'actual');
        const prox = torneos.filter(t => t.estado === 'proximo');
        const ops = [...act, ...prox].map(t => ({ v: t.id, txt: etiquetaTorneo(t) }));
        // Si llegaron con un torneo finalizado por parámetro, también se muestra
        if (st.torneo && st.torneo !== '*' && !ops.some(x => x.v === st.torneo)) {
          const t = torneoDe(st.torneo);
          if (t) ops.push({ v: t.id, txt: etiquetaTorneo(t) });
        }
        ops.push({ v: '*', txt: 'Todos los torneos' });
        return ops;
      }

      function llenarSelect() {
        const ops = opcionesTorneo();
        if (!st.torneo || !ops.some(x => x.v === st.torneo)) {
          const def = torneoActual(torneos) || torneoInscripcion(torneos);
          st.torneo = def ? def.id : '*';
        }
        const firma = ops.map(x => x.v + '|' + x.txt).join('\n');
        if (selT.dataset.firma !== firma && document.activeElement !== selT) {
          selT.replaceChildren(...ops.map(x => h('option', { value: x.v }, x.txt)));
          selT.dataset.firma = firma;
        }
        selT.value = st.torneo;
      }

      function alcance() {
        return st.torneo === '*' ? inscs : inscs.filter(i => i.torneoId === st.torneo);
      }
      function categorias(lista) {
        const nombres = [];
        const add = (n) => { if (n && !nombres.includes(n)) nombres.push(n); };
        if (st.torneo === '*') torneos.forEach(t => (t.categorias || []).forEach(c => add(c.nombre)));
        else ((torneoDe(st.torneo) || {}).categorias || []).forEach(c => add(c.nombre));
        lista.forEach(i => add(i.categoria));
        return nombres;
      }

      function dibujarEncabezado(lista) {
        const sinAut = lista.filter(i => !(i.autorizacion && i.autorizacion.assetId)).length;
        const nInv = lista.filter(i => i.invitado).length;
        counts.replaceChildren(
          h('strong', { class: 'tnum' }, plural(lista.length, 'anotado', 'anotados')),
          nInv ? ' · ' + plural(nInv, 'invitado', 'invitados') : '',
          lista.length ? ' · ' : null,
          lista.length ? (sinAut ? h('span', { class: 'warn tnum' }, sinAut + ' sin autorización') : 'todos con autorización') : null);
      }

      function dibujarTabs(lista) {
        const cats = categorias(lista);
        if (st.cat !== '*' && !cats.includes(st.cat)) st.cat = '*';
        const mk = (val, txt, n) => h('button', {
          type: 'button', role: 'tab', 'aria-selected': String(st.cat === val),
          onclick: () => { st.cat = val; dibujarTabs(alcance()); dibujarTabla(true); },
        }, txt + ' ', h('span', { class: 'n tnum' }, '(' + n + ')'));
        tabs.replaceChildren(mk('*', 'Todas', lista.length), ...cats.map(c => mk(c, c, lista.filter(i => i.categoria === c).length)));
      }

      function selectorCategoria(i) {
        const t = torneoDe(i.torneoId);
        const nombres = ((t && t.categorias) || []).map(c => c.nombre);
        if (i.categoria && !nombres.includes(i.categoria)) nombres.unshift(i.categoria);
        const sel = h('select', { class: 'cat-sel', 'aria-label': 'Categoría de ' + App.fmt.nombre(i) },
          i.categoria ? null : h('option', { value: '' }, 'Sin categoría'),
          nombres.map(n => h('option', { value: n }, n)));
        sel.value = i.categoria || '';
        sel.addEventListener('change', async () => {
          const nueva = sel.value, previa = i.categoria;
          if (!nueva || nueva === previa) return;
          const cat = t && (t.categorias || []).find(c => c.nombre === nueva);
          const ocupados = inscs.filter(x => x.torneoId === i.torneoId && x.categoria === nueva && x.id !== i.id).length;
          sel.disabled = true;
          try {
            await S.actualizarInscripcion(i.id, { categoria: nueva });
            i.categoria = nueva;
            if (cat && cat.cupo && ocupados >= cat.cupo) App.toast('Movido a ' + nueva + '. Ojo: la categoría quedó con ' + (ocupados + 1) + ' de ' + cat.cupo + ' lugares (supera el cupo).');
            else App.toast('Movido a ' + nueva, 'ok');
          } catch (e) {
            sel.value = previa || '';
            App.toast('No se pudo mover: ' + errMsg(e), 'error');
          } finally {
            sel.disabled = false;
          }
        });
        return sel;
      }

      async function borrar(i) {
        const ok = await App.confirm({
          title: '¿Borrar a ' + App.fmt.nombre(i) + '?',
          body: 'Se borra la inscripción con todos sus datos y su tiempo. No se puede deshacer.',
          okLabel: 'Borrar', danger: true,
        });
        if (!ok) return;
        try { await S.borrarInscripcion(i.id); App.toast('Competidor borrado', 'ok'); }
        catch (e) { App.toast('No se pudo borrar: ' + errMsg(e), 'error'); }
      }
      const editar = (i) => editarCompetidor(i, torneos, { inscripciones: inscs });

      async function cambiarInvitado(i, btn) {
        const nuevo = !i.invitado;
        btn.disabled = true;
        try {
          await S.actualizarInscripcion(i.id, { invitado: nuevo });
          i.invitado = nuevo;
          App.toast(App.fmt.nombre(i) + (nuevo ? ' ahora es invitado' : ' ya no es invitado'), 'ok');
        } catch (e) {
          App.toast('No se pudo cambiar: ' + errMsg(e), 'error');
        } finally {
          btn.disabled = false;
        }
      }

      function fila(i, conTorneo) {
        const t = torneoDe(i.torneoId);
        const aut = i.autorizacion && i.autorizacion.assetId;
        return h('tr', { dataset: { id: i.id } },
          h('td', null, i.nroKarting ? h('span', { class: 'kart-no' }, i.nroKarting) : h('span', { class: 'muted' }, '—')),
          h('td', { class: 'name' }, h('strong', null, i.apellido || ''), i.nombre ? ', ' + i.nombre : ''),
          h('td', { class: 'inv-cell' }, (() => {
            const b = h('button', {
              type: 'button', class: 'pill pill-btn' + (i.invitado ? ' pill-inv' : ''), 'aria-pressed': String(!!i.invitado),
              title: i.invitado ? 'Tocá para marcarlo como piloto común' : 'Tocá para marcarlo como invitado',
              onclick: () => cambiarInvitado(i, b),
            }, i.invitado ? 'Invitado' : 'No');
            return b;
          })()),
          h('td', { class: 'tnum' }, i.dni || '—'),
          conTorneo ? h('td', { class: 'tor', title: t ? t.nombre : '' }, t ? t.nombre : '—') : null,
          h('td', null, selectorCategoria(i)),
          h('td', { class: 'tnum' }, i.telefono ? h('a', { href: 'tel:' + String(i.telefono).replace(/[^\d+]/g, '') }, i.telefono) : '—'),
          h('td', { class: 'email', title: i.email || '' }, i.email ? h('a', { href: 'mailto:' + i.email }, i.email) : '—'),
          h('td', null, i.seguro || '—'),
          h('td', { class: 'mono' }, i.nroMotor || '—'),
          h('td', null, aut
            ? h('button', { type: 'button', class: 'pill pill-ok pill-btn', title: 'Ver autorización', onclick: () => verAutorizacion(i) }, 'Ver')
            : h('button', { type: 'button', class: 'pill pill-warn pill-btn', title: 'Cargar autorización', onclick: () => editar(i) }, 'Falta')),
          h('td', { class: 'acts' },
            h('button', { type: 'button', class: 'btn btn-sm', onclick: () => editar(i) }, 'Editar'),
            h('button', { type: 'button', class: 'btn btn-sm btn-danger', onclick: () => borrar(i) }, 'Borrar')));
      }

      function coincide(i, terms) {
        if (!terms.length) return true;
        const t = torneoDe(i.torneoId);
        const txt = App.fmt.norm([i.nombre, i.apellido, i.dni, String(i.dni || '').replace(/\D/g, ''), i.telefono, i.email, i.seguro, i.nroMotor, i.nroKarting, i.direccion, i.categoria, t && t.nombre, i.invitado ? 'invitado' : ''].join(' '));
        return terms.every(w => txt.includes(w));
      }

      function dibujarTabla(forzar) {
        // Si hay un selector de la tabla con foco, se espera a que lo suelte
        const act = document.activeElement;
        if (!forzar && act && act.tagName === 'SELECT' && tablaBox.contains(act)) { tablaPendiente = true; return; }
        tablaPendiente = false;
        if (!torneos.length && !inscs.length) {
          tablaBox.replaceChildren(h('div', { class: 'empty' },
            h('strong', null, 'Todavía no hay torneos.'),
            h('span', null, 'Creá uno para que los competidores se puedan anotar.'),
            h('a', { class: 'btn btn-primary', href: '#proximos-torneos' }, 'Ir a Próximos torneos')));
          return;
        }
        const lista = alcance();
        const terms = App.fmt.norm(st.q).trim().split(/\s+/).filter(Boolean);
        const filas = lista.filter(i => (st.cat === '*' || i.categoria === st.cat) && coincide(i, terms));
        if (!filas.length) {
          if (terms.length) {
            tablaBox.replaceChildren(h('div', { class: 'empty' },
              h('span', null, 'No hay competidores que coincidan con “' + st.q.trim() + '”.'),
              h('button', { type: 'button', class: 'btn btn-sm', onclick: () => { q.value = ''; st.q = ''; dibujarTabla(true); q.focus(); } }, 'Limpiar filtro')));
          } else {
            tablaBox.replaceChildren(h('div', { class: 'empty' },
              h('strong', null, st.cat === '*' ? 'Todavía no hay anotados.' : 'No hay anotados en ' + st.cat + '.'),
              h('span', null, 'Compartí el link de inscripción desde Inicio o agregalos a mano.'),
              h('div', { class: 'row', style: { justifyContent: 'center' } },
                h('a', { class: 'btn btn-sm', href: '#inicio' }, 'Ver link de inscripción'))));
          }
          return;
        }
        const conTorneo = st.torneo === '*';
        tablaBox.replaceChildren(h('div', { class: 'table-wrap' },
          h('table', { class: 'tbl' },
            h('thead', null, h('tr', null,
              h('th', null, 'Kart'), h('th', null, 'Apellido y nombre'), h('th', { class: 'center' }, 'Invitado'), h('th', null, 'DNI'),
              conTorneo ? h('th', null, 'Torneo') : null,
              h('th', null, 'Categoría'), h('th', null, 'Teléfono'), h('th', null, 'Email'), h('th', null, 'Seguro'),
              h('th', null, 'Nº motor'), h('th', null, 'Autorización'), h('th', null, h('span', { class: 'sr' }, 'Acciones')))),
            h('tbody', null, filas.map(i => fila(i, conTorneo))))));
      }

      function draw() {
        if (!torneos || !inscs || !ctx.isCurrent()) return;
        llenarSelect();
        const lista = alcance();
        dibujarEncabezado(lista);
        dibujarTabs(lista);
        dibujarTabla(false);
      }

      tablaBox.replaceChildren(h('p', { class: 'loading' }, 'Cargando…'));
      suscribir(ctx, S.watchTorneos(ts => { torneos = ts || []; draw(); }));
      suscribir(ctx, S.watchInscripciones(list => { inscs = list || []; draw(); }));
    },
  });
})();
