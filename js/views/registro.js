/* Vista "registro": formulario público de inscripción para competidores (ruta #registro).
   Mobile-first: una columna en pantallas angostas, inputs grandes, botón de envío a todo el ancho.
   Es la única pantalla que ve un competidor (sin barra de administración). */
(function () {
  const h = App.h;
  let cssDone = false;

  const CSS = `
.v-registro { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 22px; }
.v-registro [hidden] { display: none !important; }
.v-registro .reg-head { display: flex; flex-direction: column; gap: 6px; border-bottom: 3px solid var(--accent); padding-bottom: 14px; }
.v-registro .reg-head h1 { overflow-wrap: anywhere; }
.v-registro .reg-meta { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; color: var(--ink-2); font-weight: 500; }
.v-registro .reg-meta > span { display: inline-flex; align-items: center; gap: 6px; }
.v-registro .reg-meta svg { width: 16px; height: 16px; flex: none; color: var(--ink-3); }
.v-registro .reg-notas { color: var(--ink-2); font-size: .92rem; white-space: pre-line; }
.v-registro .reg-intro { color: var(--ink-2); }
.v-registro .empty svg { width: 32px; height: 32px; color: var(--ink-3); }

.v-registro .reg-share { display: flex; flex-direction: column; gap: 8px; background: var(--surface-2); }
.v-registro .reg-share .row { flex-wrap: nowrap; gap: 8px; }
.v-registro .reg-share input { min-height: 40px; font-family: var(--font-mono); font-size: .82rem; color: var(--ink-2); }

.v-registro form { display: flex; flex-direction: column; gap: 26px; }
.v-registro .reg-sec { display: flex; flex-direction: column; gap: 14px; }
.v-registro .reg-sec-title { display: flex; align-items: center; gap: 10px; }
.v-registro .reg-sec-title h2 { font-size: 1.2rem; }
.v-registro .reg-step { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex: none; border-radius: 3px;
  background: var(--accent); color: var(--accent-ink); font: 800 1rem/1 var(--font-display); }

.v-registro input[type="text"], .v-registro input[type="email"], .v-registro input[type="tel"] { min-height: 50px; font-size: 1rem; padding: 12px 14px; }
.v-registro .field > label { font-size: .92rem; color: var(--ink); }
.v-registro .field .hint { font-size: .82rem; color: var(--ink-2); }
.v-registro .field .error { font-size: .85rem; font-weight: 600; }

.v-registro fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
.v-registro legend { padding: 0; margin-bottom: 6px; font-weight: 600; font-size: .92rem; color: var(--ink); }
.v-registro .cat-list { display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.v-registro .cat-opt { display: flex; align-items: center; gap: 12px; min-height: 58px; padding: 12px 14px; cursor: pointer;
  background: var(--surface); border: 1.5px solid var(--line); border-radius: var(--radius); }
.v-registro .cat-opt:hover { border-color: var(--ink-3); }
.v-registro .cat-opt input { width: 20px; height: 20px; margin: 0; flex: none; accent-color: var(--accent); cursor: pointer; }
.v-registro .cat-opt:focus-within { outline: 2px solid var(--track); outline-offset: 2px; }
.v-registro .cat-opt.is-sel { border-color: var(--accent); box-shadow: inset 4px 0 0 var(--accent); background: var(--surface-2); }
.v-registro .cat-opt b { display: block; font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; line-height: 1.15; }
.v-registro .cat-opt small { display: block; color: var(--ink-2); font-size: .8rem; }
.v-registro .cat-list.invalid .cat-opt { border-color: var(--danger); }
.v-registro .tipo-list { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.v-registro .tipo-list .cat-opt { min-height: 72px; }
.v-registro .p-sub { font: 700 1rem/1.1 var(--font-display); text-transform: uppercase; letter-spacing: .06em; color: var(--ink-2); display: flex; align-items: center; gap: 8px; }
.v-registro .p-sub::before { content: ""; width: 14px; height: 3px; background: var(--accent); border-radius: 2px; }
.v-registro .p2-box { display: flex; flex-direction: column; gap: 14px; padding-top: 6px; }

.v-registro .vh { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.v-registro .aut-box { border: 1.5px dashed var(--line); border-radius: var(--radius); padding: 16px; background: var(--surface); display: flex; flex-direction: column; gap: 12px; }
.v-registro .aut-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.v-registro .aut-choices .btn { min-height: 64px; flex-direction: column; gap: 6px; padding: 10px; font-size: .98rem; }
.v-registro .aut-choices svg, .v-registro .ico { width: 22px; height: 22px; }
.v-registro .aut-warn { display: flex; gap: 8px; align-items: flex-start; background: var(--warn-bg); color: var(--warn); border-radius: var(--radius); padding: 10px 12px; font-size: .88rem; }
.v-registro .aut-warn svg { width: 18px; height: 18px; flex: none; margin-top: 1px; }
.v-registro .aut-status { display: flex; flex-direction: column; gap: 8px; color: var(--ink-2); font-weight: 600; }
.v-registro .aut-bar { height: 6px; border-radius: 3px; background: var(--surface-2); overflow: hidden; position: relative; }
.v-registro .aut-bar::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 40%; background: var(--accent); border-radius: 3px; animation: regbar 1.1s ease-in-out infinite; }
@keyframes regbar { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
@media (prefers-reduced-motion: reduce) { .v-registro .aut-bar::after { animation: none; width: 100%; opacity: .6; } }
.v-registro .aut-prev { display: flex; gap: 12px; align-items: center; }
.v-registro .aut-thumb { width: 76px; height: 76px; flex: none; border-radius: var(--radius); border: 1px solid var(--line); background: var(--surface-2); object-fit: cover; display: block; }
.v-registro .aut-pdf { width: 76px; height: 76px; flex: none; border-radius: var(--radius); border: 1px solid var(--line); background: var(--surface-2);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: var(--danger); font: 800 .95rem/1 var(--font-display); letter-spacing: .06em; }
.v-registro .aut-pdf svg { width: 26px; height: 26px; }
.v-registro .aut-info { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.v-registro .aut-name { font-weight: 600; overflow-wrap: anywhere; line-height: 1.3; }
.v-registro .aut-info .row { gap: 6px; }

.v-registro .reg-closed { background: var(--warn-bg); color: var(--warn); border-radius: var(--radius); padding: 12px 14px; font-weight: 600; }
.v-registro .reg-submit { display: flex; flex-direction: column; gap: 10px; align-items: stretch; }
.v-registro .reg-submit .row { gap: 10px; }
.v-registro .reg-submit .btn-lg { width: 100%; font-size: 1.1rem; min-height: 56px; }
.v-registro .reg-foot { color: var(--ink-2); font-size: .88rem; text-align: center; text-wrap: pretty; }

.v-registro .reg-ok { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
.v-registro .reg-ok h2 { font-size: 1.6rem; }
.v-registro .reg-ok h2:focus { outline: none; }
.v-registro .reg-badge { width: 52px; height: 52px; border-radius: 50%; background: var(--ok-bg); color: var(--ok); display: flex; align-items: center; justify-content: center; }
.v-registro .reg-badge svg { width: 28px; height: 28px; }
.v-registro .reg-dl { display: grid; grid-template-columns: minmax(96px, max-content) 1fr; gap: 8px 16px; margin: 0; width: 100%; }
.v-registro .reg-dl dt { color: var(--ink-3); font-size: .85rem; font-weight: 600; padding-top: 2px; }
.v-registro .reg-dl dd { margin: 0; overflow-wrap: anywhere; min-width: 0; }
.v-registro .reg-actions { display: flex; flex-wrap: wrap; gap: 10px; width: 100%; }

@media (max-width: 560px) {
  .v-registro { gap: 18px; }
  .v-registro .card { padding: 16px 14px; }
  .v-registro .reg-actions > .btn { flex: 1 1 100%; }
  .v-registro .reg-ok h2 { font-size: 1.4rem; }
}
@media (min-width: 561px) {
  .v-registro .reg-submit .btn-lg { width: auto; min-width: 280px; align-self: flex-start; }
  .v-registro .reg-foot { text-align: left; }
}
`;

  /* Íconos SVG inline (trazo con currentColor, sin colores literales) */
  function icon(paths) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    paths.forEach(d => { const p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); svg.appendChild(p); });
    return svg;
  }
  const ICONS = {
    camara: ['M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z', 'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
    archivo: ['M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z', 'M14 3v5h5', 'M12 18v-6', 'M9 15l3-3 3 3'],
    doc: ['M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z', 'M14 3v5h5'],
    check: ['M5 12.5l4.5 4.5L19 7.5'],
    alerta: ['M12 3l10 18H2z', 'M12 10v5', 'M12 18h.01'],
    calendario: ['M4 6h16v14H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
    lugar: ['M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  };

  const CAMPOS = [
    { key: 'nombre', label: 'Nombre', autocomplete: 'given-name', autocapitalize: 'words', msg: 'Completá tu nombre.' },
    { key: 'apellido', label: 'Apellido', autocomplete: 'family-name', autocapitalize: 'words', msg: 'Completá tu apellido.' },
    { key: 'dni', label: 'DNI', autocomplete: 'off', inputmode: 'numeric', maxlength: 8, digits: true, hint: 'Solo números, sin puntos.', msg: 'Completá tu DNI.' },
    { key: 'telefono', label: 'Teléfono', type: 'tel', autocomplete: 'tel', hint: 'Con código de área, ej. 11 5555-1234.', msg: 'Completá un teléfono de contacto.' },
    { key: 'email', label: 'Email', type: 'email', autocomplete: 'email', autocapitalize: 'off', spellcheck: 'false', msg: 'Completá tu email.' },
    { key: 'direccion', label: 'Dirección', autocomplete: 'street-address', autocapitalize: 'sentences', full: true, hint: 'Calle, número y localidad.', msg: 'Completá tu dirección.' },
  ];
  const CAMPOS_KART = [
    { key: 'nroKarting', label: 'Nº de karting', autocomplete: 'off', inputmode: 'numeric', maxlength: 4, digits: true, hint: 'El número de tu kart.', msg: 'Completá el número de tu kart.' },
    { key: 'nroMotor', label: 'Nº de motor', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', hint: 'Tal como figura en el motor.', msg: 'Completá el número de motor.' },
    { key: 'seguro', label: 'Seguro', autocomplete: 'off', autocapitalize: 'sentences', full: true, hint: 'Compañía y número de póliza.', msg: 'Completá los datos del seguro.' },
  ];
  /* Segundo piloto, solo para la inscripción de invitados (comparten el resto de los datos) */
  const CAMPOS_P2 = [
    { key: 'nombre2', label: 'Nombre', autocomplete: 'off', autocapitalize: 'words', msg: 'Completá el nombre del piloto 2.' },
    { key: 'apellido2', label: 'Apellido', autocomplete: 'off', autocapitalize: 'words', msg: 'Completá el apellido del piloto 2.' },
    { key: 'dni2', label: 'DNI', autocomplete: 'off', inputmode: 'numeric', maxlength: 8, digits: true, hint: 'Solo números, sin puntos.', msg: 'Completá el DNI del piloto 2.' },
  ];
  const TODOS = CAMPOS.concat(CAMPOS_KART);
  const ORDEN = ['nombre', 'apellido', 'dni', 'telefono', 'email', 'direccion', 'categoria', 'nroKarting', 'nroMotor', 'seguro'];

  function capital(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function bytes(n) {
    n = Number(n) || 0;
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return Math.round(n / 1024) + ' KB';
    return (n / 1024 / 1024).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' MB';
  }
  function esImagen(a) { return !!a && /^image\//.test(a.tipo || ''); }
  function errMsg(e, def) { return (e && e.message) ? e.message : def; }

  App.view('registro', {
    title: 'Inscripción',
    async render(el, ctx) {
      if (!cssDone) { App.css(CSS); cssDone = true; }
      const Store = ctx.store || window.Store;

      const st = {
        torneos: null,
        torneo: null,
        mia: undefined,        // undefined = cargando; null = no hay
        screen: 'loading',     // loading | empty | form | inscripto | ok
        dirty: false,
        editando: false,       // modificando una inscripción existente (competidor)
        enviando: false,
        intentado: false,      // ya intentó enviar: validar en vivo
        aut: null,             // { assetId, nombre, tipo, tamano }
        subiendo: null,        // nombre del archivo en curso
        autError: '',
        autCambiando: false,
        categoria: '',
        catSig: '',
        tipo: 'piloto',        // piloto | invitados (dos pilotos con el mismo kart)
      };

      const root = h('div', { class: 'v-registro' });
      const head = h('header', { class: 'reg-head' });
      const body = h('div', { class: 'stack-lg' }, h('p', { class: 'loading' }, 'Cargando el formulario…'));
      root.append(head, body);
      head.hidden = true;
      el.replaceChildren(root);

      /* ---------- Encabezado ---------- */
      function renderHead() {
        const t = st.torneo;
        if (!t) {
          head.hidden = st.screen !== 'form';
          head.replaceChildren(h('span', { class: 'eyebrow' }, 'Inscripción'), h('h1', null, 'Inscripción cerrada'));
          return;
        }
        head.hidden = false;
        head.replaceChildren(
          h('div', { class: 'row', style: { gap: '8px' } },
            h('span', { class: 'eyebrow' }, 'Inscripción'),
            t.estado === 'actual' ? h('span', { class: 'pill pill-live' }, 'En curso') : null),
          h('h1', null, t.nombre || 'Torneo'),
          h('div', { class: 'reg-meta' },
            t.fecha ? h('span', null, icon(ICONS.calendario), capital(App.fmt.fechasTexto(t, true))) : null,
            t.lugar ? h('span', null, icon(ICONS.lugar), t.lugar) : null),
          t.notas ? h('p', { class: 'reg-notas' }, t.notas) : null
        );
      }

      /* ---------- Decidir qué pantalla mostrar ---------- */
      function deseada() {
        if (st.torneos == null || st.mia === undefined) return 'loading';
        if (!st.torneo) return 'empty';
        if (!App.isAdmin && st.mia && st.mia.torneoId === st.torneo.id) return 'inscripto';
        return 'form';
      }

      function sync() {
        if (!ctx.isCurrent()) return;
        st.torneo = st.torneos ? Store.torneoInscripcion(st.torneos) : null;
        const want = deseada();
        if (st.screen === 'ok') { renderHead(); return; }
        if (st.screen === 'form' && (st.dirty || st.editando || st.enviando || st.subiendo) && want !== 'loading') {
          // El usuario ya empezó: no tocar los inputs, solo encabezado, categorías y aviso de cierre.
          renderHead();
          actualizarCategorias();
          actualizarCierre();
          return;
        }
        if (st.screen === 'form' && want === 'form') {
          renderHead();
          actualizarCategorias();
          actualizarCierre();
          return;
        }
        show(want);
      }

      function show(screen, opts) {
        st.screen = screen;
        renderHead();
        if (screen === 'loading') body.replaceChildren(h('p', { class: 'loading' }, 'Cargando el formulario…'));
        else if (screen === 'empty') body.replaceChildren(vistaVacia());
        else if (screen === 'inscripto') body.replaceChildren(vistaInscripto());
        else if (screen === 'form') body.replaceChildren(vistaForm(opts && opts.prefill));
        else if (screen === 'ok') body.replaceChildren(vistaOk(opts));
      }

      /* ---------- Estado vacío ---------- */
      function vistaVacia() {
        return h('div', { class: 'stack' },
          h('span', { class: 'eyebrow' }, 'Inscripción'),
          h('div', { class: 'empty' },
            icon(ICONS.calendario),
            h('strong', null, 'No hay inscripciones abiertas en este momento'),
            h('span', { class: 'small' }, (App.isAdmin && !App.vistaCompetidor)
              ? 'Cargá un próximo torneo para que los competidores se puedan anotar.'
              : 'Cuando el organizador abra el próximo torneo, vas a poder anotarte desde este mismo link.'),
            (App.isAdmin && !App.vistaCompetidor) ? h('button', { type: 'button', class: 'btn btn-primary', onclick: () => App.go('proximos-torneos') }, 'Ir a próximos torneos') : null));
      }

      /* ---------- Ya inscripto (competidor) ---------- */
      function resumen(d, extra) {
        const t = st.torneo;
        const filas = [];
        const add = (k, v) => { if (v != null && v !== '') filas.push(h('dt', null, k), h('dd', null, v)); };
        (extra || []).forEach(([k, v]) => add(k, v));
        add('Torneo', t ? t.nombre : null);
        add('Categoría', d.categoria ? h('strong', null, d.categoria) : null);
        add('Kart nº', d.nroKarting ? h('span', { class: 'kart-no' }, d.nroKarting) : null);
        return h('dl', { class: 'reg-dl' }, filas);
      }

      function vistaInscripto() {
        const d = st.mia;
        const t = st.torneo;
        const aut = d.autorizacion;
        return h('div', { class: 'card reg-ok' },
          h('div', { class: 'reg-badge' }, icon(ICONS.check)),
          h('h2', { tabindex: '-1' }, 'Ya estás inscripto en ' + (t ? t.nombre : 'el torneo')),
          h('p', { class: 'muted' }, 'Categoría ', h('strong', null, d.categoria || '—'),
            '. Si algo cambió, podés corregir tus datos.'),
          h('dl', { class: 'reg-dl' },
            h('dt', null, 'Competidor'), h('dd', null, [d.nombre, d.apellido].filter(Boolean).join(' ')),
            h('dt', null, 'DNI'), h('dd', { class: 'tnum' }, d.dni || '—'),
            h('dt', null, 'Teléfono'), h('dd', null, d.telefono || '—'),
            h('dt', null, 'Email'), h('dd', null, d.email || '—'),
            h('dt', null, 'Dirección'), h('dd', null, d.direccion || '—'),
            h('dt', null, 'Seguro'), h('dd', null, d.seguro || '—'),
            h('dt', null, 'Nº de motor'), h('dd', { class: 'tnum' }, d.nroMotor || '—'),
            h('dt', null, 'Kart nº'), h('dd', null, d.nroKarting ? h('span', { class: 'kart-no' }, d.nroKarting) : '—'),
            h('dt', null, 'Autorización'), h('dd', null, aut && aut.assetId
              ? h('a', { href: Store.urlArchivo(aut.assetId), target: '_blank', rel: 'noopener' }, aut.nombre || 'Ver archivo')
              : h('span', { class: 'pill pill-warn' }, 'Sin adjuntar'))),
          h('div', { class: 'reg-actions' },
            h('button', { type: 'button', class: 'btn btn-primary btn-lg', onclick: () => {
              st.editando = true;
              show('form', { prefill: st.mia });
            } }, 'Modificar mis datos')),
          h('p', { class: 'reg-foot' }, 'El organizador revisa tus datos y te confirma la categoría.'));
      }

      /* ---------- Confirmación ---------- */
      function vistaOk(o) {
        const d = o.datos;
        const box = h('div', { class: 'card reg-ok', role: 'status' },
          h('div', { class: 'reg-badge' }, icon(ICONS.check)),
          h('h2', { tabindex: '-1' }, o.edicion ? '¡Listo, guardamos tus cambios!' : '¡Listo, quedaste inscripto!'),
          resumen(d, d.piloto2
            ? [['Invitados', [d.nombre, d.apellido].filter(Boolean).join(' ') + ' y ' + [d.piloto2.nombre, d.piloto2.apellido].filter(Boolean).join(' ')]]
            : [['Competidor', [d.nombre, d.apellido].filter(Boolean).join(' ')]]),
          !d.autorizacion ? h('div', { class: 'aut-warn' }, icon(ICONS.alerta),
            h('span', null, 'No adjuntaste la autorización de los padres. Si el competidor es menor de 18, la va a tener que presentar antes de correr.')) : null,
          h('p', { class: 'muted small' }, 'El organizador revisa los datos y confirma la categoría.'),
          App.isAdmin
            ? h('div', { class: 'reg-actions' },
                h('button', { type: 'button', class: 'btn btn-primary btn-lg', onclick: () => nuevoForm() }, App.vistaCompetidor ? 'Inscribir a otro piloto' : 'Inscribir a otro competidor'),
                App.vistaCompetidor ? null : h('a', { class: 'btn btn-ghost btn-lg', href: '#competidores' }, 'Ver competidores'))
            : h('div', { class: 'reg-actions' },
                h('button', { type: 'button', class: 'btn btn-lg', onclick: () => { st.editando = true; show('form', { prefill: st.mia }); } }, 'Modificar mis datos')));
        setTimeout(() => { const t = box.querySelector('h2'); t && t.focus(); }, 0);
        return box;
      }

      function nuevoForm() {
        st.dirty = false; st.editando = false; st.intentado = false; st.aut = null; st.autError = '';
        st.autCambiando = false; st.categoria = ''; st.catSig = ''; st.tipo = 'piloto';
        show('form');
        window.scrollTo(0, 0);
        const f = body.querySelector('#reg-nombre'); f && f.focus();
      }

      /* ---------- Formulario ---------- */
      const refs = {};   // key -> { input, err, wrap }
      let catList, catErr, catFieldset, autBox, autErrEl, closedEl, submitBtn, formEl;

      function campo(c) {
        const id = 'reg-' + c.key;
        const hintId = c.hint ? id + '-hint' : null;
        const errId = id + '-error';
        const input = h('input', {
          id, name: c.key, type: c.type || 'text', autocomplete: c.autocomplete, inputmode: c.inputmode,
          maxlength: c.maxlength, autocapitalize: c.autocapitalize, spellcheck: c.spellcheck,
          pattern: c.digits ? '[0-9]*' : null, enterkeyhint: 'next',
          'aria-describedby': [hintId, errId].filter(Boolean).join(' '), 'aria-required': 'true',
        });
        input.addEventListener('input', () => {
          if (c.digits) {
            const limpio = input.value.replace(/\D/g, '');
            if (limpio !== input.value) input.value = limpio;
          }
          st.dirty = true;
          if (st.intentado) validarCampo(c.key);
        });
        input.addEventListener('blur', () => { if (st.intentado || input.getAttribute('aria-invalid') === 'true') validarCampo(c.key); });
        const err = h('p', { class: 'error', id: errId, hidden: true });
        const wrap = h('div', { class: 'field' + (c.full ? ' full' : '') },
          h('label', { for: id }, c.label),
          input,
          c.hint ? h('p', { class: 'hint', id: hintId }, c.hint) : null,
          err);
        refs[c.key] = { input, err, wrap, def: c };
        return wrap;
      }

      function setErr(key, msg) {
        if (key === 'categoria') {
          catErr.textContent = msg || ''; catErr.hidden = !msg;
          catList.classList.toggle('invalid', !!msg);
          catList.querySelectorAll('input').forEach(r => { if (msg) r.setAttribute('aria-invalid', 'true'); else r.removeAttribute('aria-invalid'); });
          return;
        }
        const r = refs[key];
        if (!r) return;
        if (msg) r.input.setAttribute('aria-invalid', 'true'); else r.input.removeAttribute('aria-invalid');
        r.err.textContent = msg || ''; r.err.hidden = !msg;
      }

      function errorDe(key) {
        if (key === 'categoria') {
          const cats = (st.torneo && st.torneo.categorias) || [];
          if (cats.length && !st.categoria) return 'Elegí una categoría.';
          return '';
        }
        const r = refs[key];
        const v = r.input.value.trim();
        if (!v) return r.def.msg;
        if ((key === 'dni' || key === 'dni2') && !/^\d{7,8}$/.test(v)) return 'El DNI tiene que tener 7 u 8 números, sin puntos ni espacios.';
        if (key === 'dni2' && refs.dni && v === refs.dni.input.value.trim()) return 'El DNI del piloto 2 no puede ser igual al del piloto 1.';
        if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Revisá el email: tiene que ser del estilo nombre@dominio.com.';
        if (key === 'telefono' && v.replace(/\D/g, '').length < 6) return 'Revisá el teléfono: parece incompleto.';
        return '';
      }
      function validarCampo(key) { const m = errorDe(key); setErr(key, m); return m; }

      function categoriasSig(t) { return JSON.stringify(((t && t.categorias) || []).map(c => [c.nombre, c.cupo])); }

      function actualizarCategorias(force) {
        if (!catList) return;
        const t = st.torneo;
        const cats = (t && t.categorias) || [];
        const sig = (t ? t.id : '') + categoriasSig(t);
        if (!force && sig === st.catSig) return;
        st.catSig = sig;
        if (st.categoria && !cats.some(c => c.nombre === st.categoria)) st.categoria = '';
        if (!st.categoria && cats.length === 1) st.categoria = cats[0].nombre;
        const tenFoco = catList.contains(document.activeElement);
        catFieldset.hidden = !cats.length;
        catList.replaceChildren(...cats.map((c, i) => {
          const id = 'reg-categoria-' + i;
          const sel = c.nombre === st.categoria;
          const radio = h('input', { type: 'radio', name: 'categoria', id, value: c.nombre, checked: sel, 'aria-describedby': 'reg-categoria-error' });
          radio.addEventListener('change', () => {
            st.categoria = radio.value; st.dirty = true;
            catList.querySelectorAll('.cat-opt').forEach(o => o.classList.toggle('is-sel', o.querySelector('input').checked));
            if (st.intentado) validarCampo('categoria');
          });
          return h('label', { class: 'cat-opt' + (sel ? ' is-sel' : ''), for: id },
            radio,
            h('span', null, h('b', null, c.nombre), c.cupo ? h('small', null, 'Hasta ' + c.cupo + ' karts') : null));
        }));
        if (tenFoco) {
          const r = catList.querySelector('input:checked') || catList.querySelector('input');
          r && r.focus();
        }
        if (st.intentado) validarCampo('categoria');
      }

      function actualizarCierre() {
        if (!closedEl) return;
        closedEl.hidden = !!st.torneo;
      }

      /* Autorización de los padres */
      const inCamara = h('input', { type: 'file', accept: 'image/*', capture: 'environment', class: 'vh', tabindex: '-1', 'aria-hidden': 'true', id: 'reg-aut-camara' });
      const inArchivo = h('input', { type: 'file', accept: 'image/*,application/pdf', class: 'vh', tabindex: '-1', 'aria-hidden': 'true', id: 'reg-aut-archivo' });
      [inCamara, inArchivo].forEach(inp => inp.addEventListener('change', () => {
        const f = inp.files && inp.files[0];
        inp.value = '';
        if (f) subir(f);
      }));

      async function subir(file) {
        if (file.type && !/^image\//.test(file.type) && file.type !== 'application/pdf') {
          st.autError = 'Ese tipo de archivo no sirve. Subí una foto o un PDF.';
          App.toast(st.autError, 'error');
          renderAut();
          return;
        }
        st.subiendo = file.name || 'archivo'; st.autError = ''; st.dirty = true;
        renderAut();
        try {
          const res = await Store.subirArchivo(file);
          if (!ctx.isCurrent()) return;
          st.aut = {
            assetId: res.assetId,
            nombre: res.nombre || file.name || 'autorizacion',
            tipo: res.tipo || file.type || '',
            tamano: res.tamano != null ? res.tamano : file.size,
          };
          st.autCambiando = false;
          App.toast('Autorización adjuntada.', 'ok');
        } catch (e) {
          if (!ctx.isCurrent()) return;
          st.autError = errMsg(e, 'No se pudo subir el archivo. Probá de nuevo.');
          App.toast(st.autError, 'error');
        } finally {
          st.subiendo = null;
          if (ctx.isCurrent()) renderAut();
        }
      }

      function botonesEleccion() {
        return h('div', { class: 'aut-choices' },
          h('button', { type: 'button', class: 'btn', id: 'reg-aut-foto', onclick: () => inCamara.click() }, icon(ICONS.camara), 'Sacar foto'),
          h('button', { type: 'button', class: 'btn', id: 'reg-aut-subir', onclick: () => inArchivo.click() }, icon(ICONS.archivo), 'Subir archivo'));
      }

      function renderAut() {
        if (!autBox) return;
        const hadFocus = autBox.contains(document.activeElement) ? document.activeElement.id : null;
        const partes = [];
        if (st.subiendo) {
          partes.push(h('div', { class: 'aut-status', role: 'status' },
            h('span', null, 'Subiendo «' + st.subiendo + '»…'),
            h('div', { class: 'aut-bar', 'aria-hidden': 'true' })));
        } else if (st.aut) {
          const a = st.aut;
          let url = '';
          try { url = Store.urlArchivo(a.assetId); } catch (e) { url = ''; }
          const thumb = esImagen(a) && url
            ? h('img', { class: 'aut-thumb', src: url, alt: 'Vista previa de la autorización' })
            : h('div', { class: 'aut-pdf', 'aria-hidden': 'true' }, icon(ICONS.doc), /pdf/i.test(a.tipo || a.nombre || '') ? 'PDF' : 'ARCH');
          partes.push(h('div', { class: 'aut-prev' },
            url ? h('a', { href: url, target: '_blank', rel: 'noopener', 'aria-label': 'Abrir ' + a.nombre }, thumb) : thumb,
            h('div', { class: 'aut-info' },
              h('span', { class: 'aut-name' }, a.nombre),
              h('span', { class: 'small muted' }, (esImagen(a) ? 'Foto' : 'Documento') + (a.tamano ? ' · ' + bytes(a.tamano) : '')),
              h('div', { class: 'row' },
                h('button', { type: 'button', class: 'btn btn-sm', id: 'reg-aut-cambiar', 'aria-expanded': st.autCambiando ? 'true' : 'false',
                  onclick: () => { st.autCambiando = !st.autCambiando; renderAut(); if (st.autCambiando) { const b = autBox.querySelector('#reg-aut-foto'); b && b.focus(); } } },
                  st.autCambiando ? 'Mantener esta' : 'Cambiar'),
                h('button', { type: 'button', class: 'btn btn-sm btn-ghost', id: 'reg-aut-quitar',
                  onclick: () => { st.aut = null; st.autCambiando = false; st.dirty = true; renderAut(); const b = autBox.querySelector('#reg-aut-foto'); b && b.focus(); } }, 'Quitar')))));
          if (st.autCambiando) partes.push(botonesEleccion());
        } else {
          partes.push(botonesEleccion());
          partes.push(h('div', { class: 'aut-warn' }, icon(ICONS.alerta),
            h('span', null, 'Todavía no adjuntaste la autorización. Si sos menor de 18, la vas a necesitar para correr.')));
        }
        autErrEl.textContent = st.autError; autErrEl.hidden = !st.autError;
        autBox.replaceChildren(...partes);
        if (hadFocus) { const b = autBox.querySelector('#' + hadFocus) || autBox.querySelector('button'); b && b.focus(); }
      }

      function datosForm() {
        const d = { torneoId: st.torneo ? st.torneo.id : '', categoria: st.categoria || '' };
        TODOS.forEach(c => { d[c.key] = refs[c.key].input.value.trim(); });
        d.autorizacion = st.aut ? { assetId: st.aut.assetId, nombre: st.aut.nombre, tipo: st.aut.tipo, tamano: st.aut.tamano } : null;
        if (esInvitados()) {
          d.piloto2 = { nombre: refs.nombre2.input.value.trim(), apellido: refs.apellido2.input.value.trim(), dni: refs.dni2.input.value.trim() };
        }
        return d;
      }

      async function enviar(ev) {
        ev.preventDefault();
        if (st.enviando) return;
        st.intentado = true;
        let primero = null;
        const orden = esInvitados() ? ORDEN.slice(0, 6).concat(['nombre2', 'apellido2', 'dni2'], ORDEN.slice(6)) : ORDEN;
        orden.forEach(k => { const m = validarCampo(k); if (m && !primero) primero = k; });
        if (primero) {
          const target = primero === 'categoria'
            ? (catList.querySelector('input:checked') || catList.querySelector('input'))
            : refs[primero].input;
          if (target) { target.focus(); target.scrollIntoView && target.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
          App.toast('Revisá los campos marcados en rojo.', 'error');
          return;
        }
        if (st.subiendo) { App.toast('Esperá a que termine de subir la autorización.', 'error'); return; }
        if (!st.torneo) { App.toast('No hay inscripciones abiertas en este momento.', 'error'); return; }

        const datos = datosForm();
        const edicion = st.editando;
        st.enviando = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
        try {
          const id = await Store.inscribir(datos);
          if (!ctx.isCurrent()) return;
          if (!App.isAdmin) st.mia = Object.assign({}, st.mia || {}, datos, { id: id || (st.mia && st.mia.id) });
          st.dirty = false; st.editando = false; st.intentado = false;
          show('ok', { datos, edicion });
          window.scrollTo(0, 0);
        } catch (e) {
          if (!ctx.isCurrent()) return;
          App.toast(errMsg(e, 'No se pudo enviar la inscripción. Probá de nuevo.'), 'error');
        } finally {
          st.enviando = false;
          if (submitBtn && submitBtn.isConnected) { submitBtn.disabled = false; submitBtn.textContent = labelSubmit(); }
        }
      }

      function labelSubmit() { return st.editando ? 'Guardar cambios' : esInvitados() ? 'Inscribir a los dos invitados' : 'Enviar inscripción'; }
      function esInvitados() { return st.tipo === 'invitados' && !st.editando; }

      function seccion(n, titulo, ...hijos) {
        return h('section', { class: 'reg-sec', 'aria-labelledby': 'reg-sec-' + n },
          h('div', { class: 'reg-sec-title' }, h('span', { class: 'reg-step', 'aria-hidden': 'true' }, String(n)), h('h2', { id: 'reg-sec-' + n }, titulo)),
          hijos);
      }

      function compartir() {
        const link = App.linkInscripcion();
        const inp = h('input', { type: 'text', readonly: true, value: link, 'aria-label': 'Link del formulario', onfocus: (e) => e.target.select() });
        return h('div', { class: 'card-flat reg-share' },
          h('span', { class: 'small muted' }, 'Estás viendo el formulario como organizador. Compartí este link con los competidores:'),
          h('div', { class: 'row' }, inp,
            h('button', { type: 'button', class: 'btn btn-dark', onclick: async () => {
              try { await navigator.clipboard.writeText(link); App.toast('Link copiado.', 'ok'); }
              catch (e) { inp.focus(); inp.select(); App.toast('No se pudo copiar solo: copialo a mano (ya está seleccionado).'); }
            } }, 'Copiar')));
      }

      function vistaForm(prefill) {
        Object.keys(refs).forEach(k => delete refs[k]);
        st.catSig = '';
        st.intentado = false;
        st.autError = '';
        st.autCambiando = false;
        st.dirty = false;
        if (prefill) {
          st.aut = prefill.autorizacion && prefill.autorizacion.assetId ? Object.assign({}, prefill.autorizacion) : null;
          st.categoria = prefill.categoria || '';
        } else {
          st.aut = null;
          st.categoria = '';
        }

        catList = h('div', { class: 'cat-list' });
        catErr = h('p', { class: 'error', id: 'reg-categoria-error', hidden: true });
        catFieldset = h('fieldset', { class: 'field full', id: 'reg-categoria' },
          h('legend', null, 'Categoría'), catList,
          h('p', { class: 'hint' }, 'Elegí en la que querés correr. El organizador la confirma.'), catErr);
        autBox = h('div', { class: 'aut-box', id: 'reg-autorizacion', role: 'group', 'aria-labelledby': 'reg-sec-3', 'aria-describedby': 'reg-aut-hint' });
        autErrEl = h('p', { class: 'error', role: 'alert', hidden: true });
        closedEl = h('p', { class: 'reg-closed', role: 'alert', hidden: true },
          'Las inscripciones se cerraron mientras completabas el formulario. Consultá con el organizador.');
        submitBtn = h('button', { type: 'submit', class: 'btn btn-primary btn-lg', id: 'reg-enviar' }, labelSubmit());

        /* Tipo de inscripción: un piloto, o dos invitados que corren con el mismo kart */
        if (prefill || st.editando) st.tipo = 'piloto';
        const p1Sub = h('p', { class: 'p-sub' }, 'Piloto 1');
        const p2Box = h('div', { class: 'p2-box' }, h('p', { class: 'p-sub' }, 'Piloto 2'),
          h('div', { class: 'form-grid' }, CAMPOS_P2.map(campo)),
          h('p', { class: 'hint' }, 'El teléfono, el email, la dirección, el kart y el seguro son los mismos para los dos.'));
        const sec1Title = h('span');
        const tipoList = h('div', { class: 'cat-list tipo-list' });
        const tipoField = h('fieldset', { class: 'field', id: 'reg-tipo' }, h('legend', null, '¿Cómo te anotás?'), tipoList);
        function pintarTipo() {
          const inv = esInvitados();
          p1Sub.hidden = !inv;
          p2Box.hidden = !inv;
          sec1Title.textContent = inv ? 'Datos de los pilotos' : 'Tus datos';
          if (!st.enviando) submitBtn.textContent = labelSubmit();
          tipoList.querySelectorAll('.cat-opt').forEach(o => o.classList.toggle('is-sel', o.querySelector('input').checked));
          if (!inv) CAMPOS_P2.forEach(c => setErr(c.key, ''));
        }
        tipoList.append(...[
          ['piloto', 'Piloto', 'Un piloto con su propio kart.'],
          ['invitados', 'Invitados', 'Dos pilotos invitados que corren con el mismo kart.'],
        ].map(([v, titulo, sub]) => {
          const radio = h('input', { type: 'radio', name: 'tipo', id: 'reg-tipo-' + v, value: v, checked: st.tipo === v });
          radio.addEventListener('change', () => { st.tipo = v; st.dirty = true; pintarTipo(); });
          return h('label', { class: 'cat-opt', for: 'reg-tipo-' + v }, radio, h('span', null, h('b', null, titulo), h('small', null, sub)));
        }));
        tipoField.hidden = !!st.editando;

        const aviso = !App.isAdmin && st.mia && !st.editando && prefill
          ? h('p', { class: 'small muted' }, 'Precargamos tus datos de la inscripción anterior. Revisalos antes de enviar.')
          : null;

        formEl = h('form', { novalidate: true, autocomplete: 'on', onsubmit: enviar, 'aria-label': 'Formulario de inscripción' },
          tipoField,
          seccion(1, sec1Title,
            p1Sub,
            h('div', { class: 'form-grid' }, CAMPOS.map(campo)),
            p2Box),
          seccion(2, 'Tu kart',
            h('div', { class: 'form-grid' }, catFieldset, CAMPOS_KART.map(campo))),
          seccion(3, 'Autorización de los padres',
            h('div', { class: 'field' },
              h('p', { class: 'hint', id: 'reg-aut-hint' }, 'Obligatoria para menores de 18 años. Podés sacarle una foto al papel firmado o subir un PDF.'),
              autBox, inCamara, inArchivo, autErrEl)),
          closedEl,
          h('div', { class: 'reg-submit' },
            submitBtn,
            st.editando ? h('button', { type: 'button', class: 'btn btn-ghost', onclick: cancelarEdicion }, 'Cancelar') : null,
            h('p', { class: 'reg-foot' }, 'Al enviar, el organizador revisa tus datos y te confirma la categoría.')));

        if (prefill) TODOS.forEach(c => { if (prefill[c.key] != null) refs[c.key].input.value = String(prefill[c.key]); });
        actualizarCategorias(true);
        actualizarCierre();
        renderAut();
        pintarTipo();

        return h('div', { class: 'stack-lg' },
          (App.isAdmin && !App.vistaCompetidor) ? compartir() : null,
          st.editando ? null : h('p', { class: 'reg-intro' }, 'Completá tus datos para anotarte. Todos los campos son obligatorios, salvo la autorización si sos mayor de 18.'),
          st.editando ? h('p', { class: 'reg-intro' }, 'Corregí lo que haga falta y guardá los cambios.') : null,
          aviso,
          formEl);
      }

      async function cancelarEdicion() {
        if (st.dirty) {
          const ok = await App.confirm({ title: '¿Descartar los cambios?', body: 'Lo que modificaste no se va a guardar.', okLabel: 'Descartar', danger: true });
          if (!ok || !ctx.isCurrent()) return;
        }
        st.editando = false; st.dirty = false;
        show(deseada());
        window.scrollTo(0, 0);
      }

      /* ---------- Datos ---------- */
      // Avisar si el competidor intenta irse con datos sin enviar
      const onBeforeUnload = (e) => { if (st.screen === 'form' && st.dirty && !st.enviando) { e.preventDefault(); e.returnValue = ''; } };
      window.addEventListener('beforeunload', onBeforeUnload);
      ctx.onCleanup(() => window.removeEventListener('beforeunload', onBeforeUnload));

      if (App.isAdmin) {
        st.mia = null;
      } else {
        Promise.resolve()
          .then(() => Store.miInscripcion())
          .then((m) => { st.mia = m || null; }, (e) => { console.error(e); st.mia = null; })
          .then(() => {
            if (!ctx.isCurrent()) return;
            // Primer render del formulario: si la inscripción es de otro torneo, precargar los datos personales
            if (st.screen === 'loading' || st.screen === 'empty') {
              st.torneo = st.torneos ? Store.torneoInscripcion(st.torneos) : null;
              const want = deseada();
              if (want === 'form' && st.mia) show('form', { prefill: datosPrevios(st.mia) });
              else sync();
            } else sync();
          });
      }

      function datosPrevios(m) {
        // Reutiliza los datos personales de una inscripción anterior (otro torneo); categoría solo si existe en este torneo.
        const p = {};
        TODOS.forEach(c => { p[c.key] = m[c.key] || ''; });
        const cats = (st.torneo && st.torneo.categorias) || [];
        p.categoria = cats.some(c => c.nombre === m.categoria) ? m.categoria : '';
        p.autorizacion = m.autorizacion || null;
        return p;
      }

      const unsub = Store.watchTorneos((torneos) => {
        st.torneos = torneos || [];
        if (!App.isAdmin && st.mia && (st.screen === 'loading' || st.screen === 'empty')) {
          st.torneo = Store.torneoInscripcion(st.torneos);
          if (deseada() === 'form') { show('form', { prefill: datosPrevios(st.mia) }); return; }
        }
        sync();
      });
      if (typeof unsub === 'function') ctx.onCleanup(unsub);
      else if (unsub && typeof unsub.then === 'function') unsub.then(fn => { if (typeof fn === 'function') { if (ctx.isCurrent()) ctx.onCleanup(fn); else fn(); } });
    },
  });
})();
