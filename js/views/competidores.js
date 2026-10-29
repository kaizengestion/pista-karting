/* Competidores: registro de todos los anotados, con su ficha completa, categorías (una o más), licencias e invitados.
   Exporta KartUI.editarCompetidor(insc|null, torneos, opciones), KartUI.verFicha(insc, torneos) y KartUI.verArchivo(insc, clave). */
(function () {
  const { h } = App;
  const D = App.datos;

  App.css(`
.v-competidores .head-counts { color: var(--ink-2); }
.v-competidores .head-counts strong { color: var(--ink); }
.v-competidores .head-counts .warn { color: var(--warn); font-weight: 600; }
.v-competidores .toolbar { display: grid; gap: 12px 16px; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); align-items: end; }
.v-competidores .tbl td { white-space: nowrap; }
.v-competidores .tbl td.name { white-space: normal; min-width: 170px; }
.v-competidores .tbl td.name strong { font-weight: 600; }
.v-competidores .tbl td.name button { all: unset; cursor: pointer; }
.v-competidores .tbl td.name button:hover strong, .v-competidores .tbl td.name button:focus-visible strong { text-decoration: underline; text-decoration-color: var(--accent); }
.v-competidores .tbl td.cats { white-space: normal; min-width: 150px; }
.v-competidores .tbl td.cats .pill { margin: 1px 2px 1px 0; }
.v-competidores .tbl td.emer { color: var(--ink-2); font-size: .85rem; }
.v-competidores .tbl td a { text-decoration: none; }
.v-competidores .tbl td a:hover { text-decoration: underline; }
.v-competidores .tbl td.acts { text-align: right; }
.v-competidores .tbl td.acts .btn + .btn { margin-left: 6px; }
.v-competidores .pill-btn, .kart-form .pill-btn { font: inherit; font-size: .78rem; font-weight: 600; cursor: pointer; }
.v-competidores .pill-btn:hover { border-color: currentColor; }
.v-competidores .center { text-align: center; }
.v-competidores .lic-cell { display: inline-flex; gap: 4px; }
.v-competidores .tabs button .n { color: var(--ink-3); font-weight: 600; }
.v-competidores .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 640px) {
  .v-competidores .toolbar { grid-template-columns: minmax(0, 1fr); }
  .v-competidores .page-head .actions { width: 100%; }
  .v-competidores .page-head .actions .btn { flex: 1; }
}

.kart-form .inv-check { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; padding: 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-2); }
.kart-form .inv-check input { margin-top: 2px; flex: none; }
.kart-form .inv-check span { display: flex; flex-direction: column; gap: 2px; }
.kart-form .cat-checks { display: grid; gap: 6px; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
.kart-form .cat-checks label { display: flex; gap: 8px; align-items: center; padding: 8px 10px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface-2); cursor: pointer; font-size: .92rem; }
.kart-form .cat-checks label:has(input:checked) { border-color: var(--accent); }
.kart-form .lic-grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.kart-form .aut-box { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 12px; border: 1.5px dashed var(--line); border-radius: var(--radius); background: var(--surface-2); }
.kart-form .aut-thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 4px; border: 1px solid var(--line); background: var(--surface); flex: none; }
.kart-form .aut-doc { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 4px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font: 700 .8rem var(--font-display); flex: none; }
.kart-form .aut-info { flex: 1 1 120px; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.kart-form .aut-info .nm { font-weight: 600; overflow-wrap: anywhere; }
.kart-form .aut-acts { display: flex; gap: 6px; flex-wrap: wrap; }
.kart-form .sep { border-top: 1px solid var(--line); margin: 2px 0; }
.kart-form .sub { font: 700 .85rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .1em; color: var(--accent-text); }

.kart-aut { display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
.kart-aut img { display: block; max-width: 100%; max-height: 70vh; margin: 0 auto; border-radius: 4px; border: 1px solid var(--line); background: var(--surface-2); }
.kart-aut .meta { color: var(--ink-2); font-size: .88rem; overflow-wrap: anywhere; }

.kart-ficha { display: flex; flex-direction: column; gap: 16px; }
.kart-ficha h3 { font: 700 .85rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .1em; color: var(--accent-text); }
.kart-ficha dl { display: grid; grid-template-columns: minmax(110px, max-content) 1fr; gap: 6px 14px; margin: 0; }
.kart-ficha dt { color: var(--ink-3); font-size: .85rem; font-weight: 600; }
.kart-ficha dd { margin: 0; overflow-wrap: anywhere; }
.kart-ficha .decl { font-size: .85rem; color: var(--ink-2); border-left: 3px solid var(--accent); padding-left: 10px; }
`);

  const CAMPOS = [
    { k: 'nombre', label: 'Nombre', req: true },
    { k: 'apellido', label: 'Apellido', req: true },
    { k: 'dni', label: 'DNI', req: true, inputmode: 'numeric' },
    { k: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
    { k: 'telefono', label: 'Teléfono', type: 'tel' },
    { k: 'email', label: 'Email', type: 'email' },
    { k: 'direccion', label: 'Domicilio', full: true },
    { k: 'provincia', label: 'Provincia', type: 'select', opciones: D.PROVINCIAS, vacio: '—' },
    { k: 'localidad', label: 'Localidad' },
    { k: 'grupoSanguineo', label: 'Grupo sanguíneo', type: 'select', opciones: D.GRUPOS, vacio: '—' },
    { k: 'nroKarting', label: 'Nº de kart', inputmode: 'numeric' },
    { k: 'obraSocial', label: 'Obra social / prepaga', full: true, hint: 'Ej.: OSDE – Afiliado N.º 123456789' },
    { k: 'emergenciaNombre', label: 'Contacto de emergencia' },
    { k: 'emergenciaTelefono', label: 'Teléfono de emergencia', type: 'tel' },
  ];
  const LICENCIAS = [
    { key: 'licenciaDeportiva', titulo: 'Licencia deportiva', corto: 'Dep.' },
    { key: 'licenciaMedica', titulo: 'Licencia médica', corto: 'Méd.' },
  ];

  const S = () => window.Store;
  const cats = (i) => S().categoriasDe(i);
  function torneoActual(ts) { return S().torneoActual(ts); }
  function torneoInscripcion(ts) { return S().torneoInscripcion(ts); }
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
  function urlDe(a) { try { return S().urlArchivo(a.assetId); } catch (e) { return ''; } }
  function etiquetaTorneo(t) {
    if (t.estado === 'actual') return t.nombre + ' (en curso)';
    if (t.estado === 'finalizado') return t.nombre + ' (finalizado)';
    return t.nombre + ' — ' + App.fmt.fecha(t.fecha);
  }

  /* ---------- Ver una licencia ---------- */
  function verArchivo(insc, clave) {
    const l = LICENCIAS.find(x => x.key === clave) || { titulo: 'Archivo' };
    const a = insc && insc[clave];
    if (!a || !a.assetId) { App.toast(l.titulo + ': no está cargada'); return null; }
    const url = urlDe(a);
    const meta = h('p', { class: 'meta' }, [a.nombre, tamano(a.tamano)].filter(Boolean).join(' · '));
    let vista;
    if (esImagen(a)) {
      vista = h('img', { src: url, alt: l.titulo + ' de ' + App.fmt.nombre(insc) });
      vista.addEventListener('error', () => vista.replaceWith(h('div', { class: 'empty' }, 'No se pudo cargar la imagen.', h('a', { href: url, target: '_blank', rel: 'noopener' }, 'Probá abrirla en otra pestaña'))));
    } else {
      vista = h('div', { class: 'empty' }, h('strong', null, 'Documento PDF'), h('a', { class: 'btn btn-dark', href: url, target: '_blank', rel: 'noopener' }, 'Abrir PDF'));
    }
    return App.modal({
      title: l.titulo + ' — ' + App.fmt.nombre(insc),
      content: h('div', { class: 'kart-aut' }, vista, h('div', { class: 'row' }, meta, h('span', { class: 'spacer' }),
        h('a', { href: url, target: '_blank', rel: 'noopener', class: 'small' }, 'Abrir en otra pestaña'))),
      actions: [{ label: 'Cerrar', kind: 'ghost' }],
    });
  }

  /* ---------- Ficha completa (solo lectura) ---------- */
  function verFicha(i, torneos, opciones) {
    const t = (torneos || []).find(x => x.id === i.torneoId);
    const e = D.edad(i.fechaNacimiento);
    const fila = (k, v) => [h('dt', null, k), h('dd', null, v == null || v === '' ? '—' : v)];
    const lic = (l) => i[l.key] && i[l.key].assetId
      ? h('button', { type: 'button', class: 'pill pill-ok pill-btn', onclick: () => verArchivo(i, l.key) }, 'Ver ' + l.titulo.toLowerCase())
      : h('span', { class: 'pill' }, 'No la subió');
    const d = i.declaracion;
    const m = App.modal({
      title: App.fmt.nombre(i) || 'Competidor',
      content: h('div', { class: 'kart-ficha' },
        h('div', { class: 'row' }, i.nroKarting ? h('span', { class: 'kart-no' }, i.nroKarting) : null,
          cats(i).map(c => h('span', { class: 'pill' }, c)), i.invitado ? h('span', { class: 'pill pill-inv' }, 'Invitado') : null),
        h('h3', null, 'Datos personales'),
        h('dl', null,
          fila('DNI', i.dni),
          fila('Nacimiento', i.fechaNacimiento ? App.fmt.fecha(i.fechaNacimiento) + (e != null ? ' · ' + e + ' años' : '') : ''),
          fila('Teléfono', i.telefono ? h('a', { href: 'tel:' + String(i.telefono).replace(/[^\d+]/g, '') }, i.telefono) : ''),
          fila('Email', i.email ? h('a', { href: 'mailto:' + i.email }, i.email) : ''),
          fila('Domicilio', i.direccion),
          fila('Localidad', [i.localidad, i.provincia].filter(Boolean).join(', ')),
          fila('Torneo', t ? t.nombre : '')),
        h('h3', null, 'Salud y emergencia'),
        h('dl', null,
          fila('Grupo sanguíneo', i.grupoSanguineo),
          fila('Obra social', i.obraSocial || 'No tiene'),
          fila('Emergencia', [i.emergenciaNombre, i.emergenciaTelefono].filter(Boolean).join(' · '))),
        h('h3', null, 'Licencias'),
        h('dl', null, LICENCIAS.map(l => fila(l.titulo, lic(l)))),
        d && d.aceptada ? h('p', { class: 'decl' }, 'Declaración aceptada el ' + App.fmt.fecha(d.fecha) + (d.texto ? ': «' + d.texto + '»' : '')) : null),
      actions: [
        { label: 'Cerrar', kind: 'ghost' },
        { label: 'Editar', kind: 'primary', onClick: (close) => { close(); editarCompetidor(i, torneos, opciones || {}); } },
      ],
    });
    return m;
  }

  /* ---------- Editar / agregar competidor ----------
     opciones: { torneoId, categoria, inscripciones (para DNI repetido), onSaved(id) } */
  function editarCompetidor(insc, torneos, opciones) {
    const o = opciones || {};
    torneos = torneos || [];
    const lista = o.inscripciones || null;
    const inputs = {};
    const errores = {};

    const campos = CAMPOS.map(c => {
      const id = 'kf-' + c.k;
      const valor = insc ? (insc[c.k] || '') : (c.k === 'provincia' ? 'Santa Fe' : '');
      const inp = c.type === 'select'
        ? h('select', { id }, h('option', { value: '' }, c.vacio), c.opciones.map(x => h('option', { value: x }, x)))
        : h('input', { id, type: c.type || 'text', inputmode: c.inputmode, autocomplete: 'off', 'aria-required': c.req ? 'true' : null });
      inp.value = valor;
      inp.addEventListener('input', () => { if (inp.getAttribute('aria-invalid')) { inp.removeAttribute('aria-invalid'); errores[c.k].textContent = ''; } });
      inputs[c.k] = inp;
      errores[c.k] = h('span', { class: 'error', role: 'alert' });
      return h('div', { class: 'field' + (c.full ? ' full' : '') },
        h('label', { for: id }, c.label + (c.req ? ' *' : '')), inp, c.hint ? h('span', { class: 'hint' }, c.hint) : null, errores[c.k]);
    });

    // Torneo y categorías (una o más)
    const elegibles = torneos.filter(t => t.estado !== 'finalizado' || (insc && t.id === insc.torneoId));
    const selT = h('select', { id: 'kf-torneo' });
    const errT = h('span', { class: 'error', role: 'alert' });
    const errC = h('span', { class: 'error', role: 'alert' });
    elegibles.forEach(t => selT.appendChild(h('option', { value: t.id }, etiquetaTorneo(t))));
    const torneoIni = (insc && insc.torneoId) || o.torneoId || (torneoInscripcion(torneos) || {}).id || (elegibles[0] || {}).id || '';
    if (torneoIni && !elegibles.some(t => t.id === torneoIni)) selT.appendChild(h('option', { value: torneoIni }, 'Torneo borrado'));
    selT.value = torneoIni;
    const catBox = h('div', { class: 'cat-checks' });
    function llenarCategorias(marcadas) {
      const t = torneos.find(x => x.id === selT.value);
      const nombres = ((t && t.categorias) || []).map(c => c.nombre);
      marcadas.forEach(m => { if (!nombres.includes(m)) nombres.push(m); });
      catBox.replaceChildren(...nombres.map((n, k) => h('label', { for: 'kf-cat-' + k },
        h('input', { type: 'checkbox', id: 'kf-cat-' + k, value: n, checked: marcadas.includes(n) }), n)));
    }
    const marcadasDe = () => Array.from(catBox.querySelectorAll('input:checked')).map(x => x.value);
    llenarCategorias(insc ? cats(insc) : (o.categoria ? [o.categoria] : []));
    selT.addEventListener('change', () => { llenarCategorias(marcadasDe()); errT.textContent = ''; });

    // Licencias (opcionales)
    const st = { archivos: {}, subiendo: {} };
    const cajas = LICENCIAS.map(l => {
      st.archivos[l.key] = (insc && insc[l.key]) || null;
      const caja = h('div', { class: 'aut-box' });
      const fileIn = h('input', { type: 'file', accept: 'image/*,application/pdf', hidden: true, 'aria-label': l.titulo });
      fileIn.addEventListener('change', async () => {
        const f = fileIn.files && fileIn.files[0];
        fileIn.value = '';
        if (!f) return;
        st.subiendo[l.key] = true; pintar();
        try { st.archivos[l.key] = await S().subirArchivo(f); App.toast(l.titulo + ' cargada', 'ok'); }
        catch (e) { App.toast(errMsg(e), 'error'); }
        finally { st.subiendo[l.key] = false; pintar(); }
      });
      function pintar() {
        if (st.subiendo[l.key]) { caja.replaceChildren(h('span', { class: 'muted' }, 'Subiendo archivo…')); return; }
        const a = st.archivos[l.key];
        if (!a) {
          caja.replaceChildren(h('span', { class: 'aut-info muted small' }, 'Sin cargar'),
            h('button', { type: 'button', class: 'btn btn-sm btn-dark', onclick: () => fileIn.click() }, 'Subir'));
          return;
        }
        const url = urlDe(a);
        caja.replaceChildren(
          esImagen(a) && url ? h('img', { class: 'aut-thumb', src: url, alt: '' }) : h('span', { class: 'aut-doc' }, 'PDF'),
          h('span', { class: 'aut-info' }, h('span', { class: 'nm' }, a.nombre || 'Archivo'), h('span', { class: 'small muted' }, tamano(a.tamano))),
          h('span', { class: 'aut-acts' },
            url ? h('a', { class: 'btn btn-sm btn-ghost', href: url, target: '_blank', rel: 'noopener' }, 'Ver') : null,
            h('button', { type: 'button', class: 'btn btn-sm', onclick: () => fileIn.click() }, 'Cambiar'),
            h('button', { type: 'button', class: 'btn btn-sm btn-danger', onclick: () => { st.archivos[l.key] = null; pintar(); } }, 'Quitar')));
      }
      pintar();
      return h('div', { class: 'field' }, h('span', { class: 'label' }, l.titulo + ' (opcional)'), caja, fileIn);
    });

    // Invitado: lo decide el organizador (los invitados corren de a dos con el mismo kart)
    const chkInv = h('input', { type: 'checkbox', id: 'kf-invitado', checked: !!(insc && insc.invitado) });
    const invField = h('label', { class: 'inv-check', for: 'kf-invitado' }, chkInv,
      h('span', null, h('strong', null, 'Competidor invitado')));

    const sinTorneos = !elegibles.length && !torneoIni;
    const form = h('form', { class: 'kart-form stack', novalidate: true, onsubmit: (e) => { e.preventDefault(); guardar(); } },
      h('span', { class: 'sub' }, 'Datos del competidor'),
      h('div', { class: 'form-grid' }, campos),
      h('div', { class: 'sep' }),
      h('span', { class: 'sub' }, 'Torneo y categorías'),
      h('div', { class: 'field' }, h('label', { for: 'kf-torneo' }, 'Torneo *'), selT, errT,
        sinTorneos ? h('span', { class: 'hint' }, 'Primero creá un torneo en Próximos torneos.') : null),
      h('div', { class: 'field' }, h('span', { class: 'label' }, 'Categorías * (una o más)'), catBox, errC),
      invField,
      h('div', { class: 'sep' }),
      h('span', { class: 'sub' }, 'Licencias'),
      h('div', { class: 'lic-grid' }, cajas));
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'file' && e.target.type !== 'checkbox') { e.preventDefault(); guardar(); }
    });

    let guardando = false;
    let modal = null;
    async function guardar() {
      if (guardando) return;
      if (Object.values(st.subiendo).some(Boolean)) { App.toast('Esperá a que termine de subir el archivo'); return; }
      const datos = {};
      CAMPOS.forEach(c => { datos[c.k] = inputs[c.k].value.trim(); });
      let primero = null;
      const marcar = (k, msg) => { inputs[k].setAttribute('aria-invalid', 'true'); errores[k].textContent = msg; primero = primero || inputs[k]; };
      CAMPOS.forEach(c => { errores[c.k].textContent = ''; inputs[c.k].removeAttribute('aria-invalid'); });
      errT.textContent = ''; errC.textContent = '';
      if (!datos.nombre) marcar('nombre', 'Completá el nombre');
      if (!datos.apellido) marcar('apellido', 'Completá el apellido');
      if (!datos.dni) marcar('dni', 'Completá el DNI');
      if (datos.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) marcar('email', 'Revisá el email');
      if (datos.fechaNacimiento && D.edad(datos.fechaNacimiento) == null) marcar('fechaNacimiento', 'Revisá la fecha');
      if (!selT.value) { errT.textContent = 'Elegí un torneo'; primero = primero || selT; }
      const categorias = marcadasDe();
      if (!categorias.length) { errC.textContent = 'Marcá al menos una categoría'; primero = primero || catBox.querySelector('input'); }
      const dniLimpio = datos.dni.replace(/\D/g, '');
      if (!primero && lista && dniLimpio && !chkInv.checked) {
        const dup = lista.find(i => i.torneoId === selT.value && String(i.dni || '').replace(/\D/g, '') === dniLimpio && (!insc || i.id !== insc.id));
        if (dup) marcar('dni', 'Ya hay un competidor con ese DNI en este torneo: ' + App.fmt.nombre(dup));
      }
      if (primero) { primero.focus(); return; }
      datos.torneoId = selT.value;
      datos.categorias = categorias;
      datos.categoria = categorias[0];
      LICENCIAS.forEach(l => { datos[l.key] = st.archivos[l.key] || null; });
      datos.invitado = chkInv.checked;
      guardando = true;
      const btn = modal && modal.el.querySelector('.modal-foot .btn-primary');
      if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }
      try {
        let id;
        if (insc && insc.id) { await S().actualizarInscripcion(insc.id, datos); id = insc.id; App.toast('Cambios guardados', 'ok'); }
        else { id = await S().inscribir(datos); App.toast('Competidor agregado', 'ok'); }
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
  window.KartUI.verFicha = verFicha;
  window.KartUI.verArchivo = verArchivo;

  /* ---------- Vista ---------- */
  App.view('competidores', {
    title: 'Competidores',
    admin: true,
    async render(el, ctx) {
      let torneos = null, inscs = null;
      const st = { torneo: ctx.param || null, cat: '*', q: '' };

      const counts = h('p', { class: 'head-counts' }, 'Cargando…');
      const btnAdd = h('button', {
        type: 'button', class: 'btn btn-primary', onclick: () => editarCompetidor(null, torneos || [], {
          torneoId: st.torneo && st.torneo !== '*' ? st.torneo : null,
          categoria: st.cat !== '*' && st.cat !== '__inv' ? st.cat : null,
          inscripciones: inscs || [],
        }),
      }, 'Agregar competidor');
      const selT = h('select', { id: 'comp-torneo', onchange: () => { st.torneo = selT.value; st.cat = '*'; draw(); } });
      const q = h('input', {
        id: 'comp-q', type: 'search', placeholder: 'Nombre, DNI, kart, localidad, teléfono…', autocomplete: 'off',
        oninput: () => { st.q = q.value; dibujarTabla(); },
      });
      const tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Categorías' });
      const tablaBox = h('div');

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
        lista.forEach(i => cats(i).forEach(add));
        return nombres;
      }

      function dibujarEncabezado(lista) {
        const nInv = lista.filter(i => i.invitado).length;
        const sinLic = lista.filter(i => LICENCIAS.some(l => !(i[l.key] && i[l.key].assetId))).length;
        counts.replaceChildren(
          h('strong', { class: 'tnum' }, plural(lista.length, 'anotado', 'anotados')),
          nInv ? ' · ' + plural(nInv, 'invitado', 'invitados') : '',
          lista.length ? ' · ' : '',
          lista.length ? (sinLic ? h('span', { class: 'warn tnum' }, sinLic + ' con licencias sin subir') : 'todos con licencias') : '');
      }

      function dibujarTabs(lista) {
        // Solo las categorías con anotados (con 12 categorías, las vacías no aportan)
        const cs = categorias(lista).filter(c => lista.some(i => cats(i).includes(c)));
        const nInv = lista.filter(i => i.invitado).length;
        if (st.cat !== '*' && !(st.cat === '__inv' ? nInv : cs.includes(st.cat))) st.cat = '*';
        const mk = (val, txt, n) => h('button', {
          type: 'button', role: 'tab', 'aria-selected': String(st.cat === val),
          onclick: () => { st.cat = val; dibujarTabs(alcance()); dibujarTabla(); },
        }, txt + ' ', h('span', { class: 'n tnum' }, '(' + n + ')'));
        tabs.replaceChildren(mk('*', 'Todas', lista.length), nInv ? mk('__inv', 'Invitados', nInv) : null,
          ...cs.map(c => mk(c, c, lista.filter(i => cats(i).includes(c)).length)));
      }

      async function borrar(i) {
        const ok = await App.confirm({
          title: '¿Borrar a ' + App.fmt.nombre(i) + '?',
          body: 'Se borra la inscripción con todos sus datos y sus tiempos. No se puede deshacer.',
          okLabel: 'Borrar', danger: true,
        });
        if (!ok) return;
        try { await S().borrarInscripcion(i.id); App.toast('Competidor borrado', 'ok'); }
        catch (e) { App.toast('No se pudo borrar: ' + errMsg(e), 'error'); }
      }
      const editar = (i) => editarCompetidor(i, torneos, { inscripciones: inscs });

      async function cambiarInvitado(i, btn) {
        const nuevo = !i.invitado;
        btn.disabled = true;
        try {
          await S().actualizarInscripcion(i.id, { invitado: nuevo });
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
        const e = D.edad(i.fechaNacimiento);
        const inv = h('button', {
          type: 'button', class: 'pill pill-btn' + (i.invitado ? ' pill-inv' : ''), 'aria-pressed': String(!!i.invitado),
          title: i.invitado ? 'Tocá para marcarlo como piloto común' : 'Tocá para marcarlo como invitado',
          onclick: () => cambiarInvitado(i, inv),
        }, i.invitado ? 'Invitado' : 'No');
        return h('tr', { dataset: { id: i.id } },
          h('td', null, i.nroKarting ? h('span', { class: 'kart-no' }, i.nroKarting) : h('span', { class: 'muted' }, '—')),
          h('td', { class: 'name' }, h('button', { type: 'button', title: 'Ver ficha completa', onclick: () => verFicha(i, torneos, { inscripciones: inscs }) },
            h('strong', null, i.apellido || ''), i.nombre ? ', ' + i.nombre : '')),
          h('td', { class: 'center' }, inv),
          h('td', { class: 'tnum' }, i.dni || '—'),
          h('td', { class: 'tnum center' }, e != null ? String(e) : '—'),
          conTorneo ? h('td', { class: 'muted small' }, t ? t.nombre : '—') : null,
          h('td', { class: 'cats' }, cats(i).length ? cats(i).map(c => h('span', { class: 'pill' }, c)) : h('span', { class: 'pill pill-warn' }, 'Sin categoría')),
          h('td', null, i.localidad || '—'),
          h('td', { class: 'tnum' }, i.telefono ? h('a', { href: 'tel:' + String(i.telefono).replace(/[^\d+]/g, '') }, i.telefono) : '—'),
          h('td', { class: 'center' }, i.grupoSanguineo || '—'),
          h('td', { class: 'emer' }, [i.emergenciaNombre, i.emergenciaTelefono].filter(Boolean).join(' · ') || '—'),
          h('td', null, h('span', { class: 'lic-cell' }, LICENCIAS.map(l => i[l.key] && i[l.key].assetId
            ? h('button', { type: 'button', class: 'pill pill-ok pill-btn', title: 'Ver ' + l.titulo.toLowerCase(), onclick: () => verArchivo(i, l.key) }, l.corto)
            : h('span', { class: 'pill', title: l.titulo + ' sin subir' }, l.corto + ' —')))),
          h('td', { class: 'acts' },
            h('button', { type: 'button', class: 'btn btn-sm', onclick: () => editar(i) }, 'Editar'),
            h('button', { type: 'button', class: 'btn btn-sm btn-danger', onclick: () => borrar(i) }, 'Borrar')));
      }

      function coincide(i, terms) {
        if (!terms.length) return true;
        const t = torneoDe(i.torneoId);
        const txt = App.fmt.norm([i.nombre, i.apellido, i.dni, String(i.dni || '').replace(/\D/g, ''), i.telefono, i.email, i.nroKarting, i.direccion,
          i.localidad, i.provincia, i.grupoSanguineo, i.obraSocial, i.emergenciaNombre, cats(i).join(' '), t && t.nombre, i.invitado ? 'invitado' : ''].join(' '));
        return terms.every(w => txt.includes(w));
      }

      function dibujarTabla() {
        if (!torneos.length && !inscs.length) {
          tablaBox.replaceChildren(h('div', { class: 'empty' },
            h('strong', null, 'Todavía no hay torneos.'),
            h('span', null, 'Creá uno para que los competidores se puedan anotar.'),
            h('a', { class: 'btn btn-primary', href: '#proximos-torneos' }, 'Ir a Próximos torneos')));
          return;
        }
        const lista = alcance();
        const terms = App.fmt.norm(st.q).trim().split(/\s+/).filter(Boolean);
        const filas = lista.filter(i => (st.cat === '*' || (st.cat === '__inv' ? i.invitado : cats(i).includes(st.cat))) && coincide(i, terms));
        if (!filas.length) {
          if (terms.length) {
            tablaBox.replaceChildren(h('div', { class: 'empty' },
              h('span', null, 'No hay competidores que coincidan con “' + st.q.trim() + '”.'),
              h('button', { type: 'button', class: 'btn btn-sm', onclick: () => { q.value = ''; st.q = ''; dibujarTabla(); q.focus(); } }, 'Limpiar filtro')));
          } else {
            tablaBox.replaceChildren(h('div', { class: 'empty' },
              h('strong', null, st.cat === '*' ? 'Todavía no hay anotados.' : st.cat === '__inv' ? 'No hay invitados.' : 'No hay anotados en ' + st.cat + '.'),
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
              h('th', null, 'Kart'), h('th', null, 'Apellido y nombre'), h('th', { class: 'center' }, 'Invitado'), h('th', null, 'DNI'), h('th', { class: 'center' }, 'Edad'),
              conTorneo ? h('th', null, 'Torneo') : null,
              h('th', null, 'Categorías'), h('th', null, 'Localidad'), h('th', null, 'Teléfono'), h('th', { class: 'center' }, 'Grupo'),
              h('th', null, 'Emergencia'), h('th', null, 'Licencias'), h('th', null, h('span', { class: 'sr' }, 'Acciones')))),
            h('tbody', null, filas.map(i => fila(i, conTorneo))))));
      }

      function draw() {
        if (!torneos || !inscs || !ctx.isCurrent()) return;
        llenarSelect();
        const lista = alcance();
        dibujarEncabezado(lista);
        dibujarTabs(lista);
        dibujarTabla();
      }

      tablaBox.replaceChildren(h('p', { class: 'loading' }, 'Cargando…'));
      suscribir(ctx, S().watchTorneos(ts => { torneos = ts || []; draw(); }));
      suscribir(ctx, S().watchInscripciones(list => { inscs = list || []; draw(); }));
    },
  });
})();
