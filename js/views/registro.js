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

  const CSS_EXTRA = `
.v-registro select { min-height: 50px; font-size: 1rem; padding: 12px 14px; }
.v-registro input[type="date"] { min-height: 50px; font-size: 1rem; padding: 10px 14px; }
.v-registro .opc { color: var(--ink-3); font-weight: 400; }
.v-registro .cat-multi { grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }
.v-registro .cat-multi .cat-opt { min-height: 52px; padding: 10px 12px; }
.v-registro .cat-multi .cat-opt b { font-size: 1rem; }
.v-registro .cat-list.invalid { outline: 2px solid var(--danger); outline-offset: 4px; border-radius: var(--radius); }
.v-registro .pill-sentido { background: var(--surface-2); color: var(--ink); border-color: var(--accent); }
.v-registro .reg-cats { display: inline-flex; flex-wrap: wrap; gap: 4px; }
.v-registro .lic-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.v-registro .lic { display: flex; flex-direction: column; gap: 8px; }
.v-registro .lic-tit { font-weight: 600; font-size: .92rem; }
.v-registro .reg-decl { border: 1.5px solid var(--line); border-left: 4px solid var(--accent); border-radius: var(--radius); background: var(--surface-2); padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.v-registro .reg-decl.invalid { border-color: var(--danger); }
.v-registro .reg-decl-tit { font: 700 .85rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .1em; color: var(--accent-text); }
.v-registro .reg-decl-txt { line-height: 1.55; }
.v-registro .reg-decl-chk { display: flex; gap: 12px; align-items: center; font-weight: 600; cursor: pointer; padding: 10px 12px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); }
.v-registro .reg-decl-chk input { width: 22px; height: 22px; flex: none; margin: 0; }
`;

  /* Campos del formulario. `opcional`: no frena la inscripción. `tipo`: text | email | tel | date | select */
  const D = App.datos;
  const CAMPOS = [
    { key: 'nombre', label: 'Nombre', autocomplete: 'given-name', autocapitalize: 'words', msg: 'Completá tu nombre.' },
    { key: 'apellido', label: 'Apellido', autocomplete: 'family-name', autocapitalize: 'words', msg: 'Completá tu apellido.' },
    { key: 'dni', label: 'DNI', autocomplete: 'off', inputmode: 'numeric', maxlength: 8, digits: true, hint: 'Solo números, sin puntos.', msg: 'Completá tu DNI.' },
    { key: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', autocomplete: 'bday', msg: 'Completá tu fecha de nacimiento.' },
    { key: 'telefono', label: 'Teléfono', type: 'tel', autocomplete: 'tel', hint: 'Con código de área, ej. 3471 15-555123.', msg: 'Completá un teléfono de contacto.' },
    { key: 'email', label: 'Email', type: 'email', autocomplete: 'email', autocapitalize: 'off', spellcheck: 'false', msg: 'Completá tu email.' },
    { key: 'direccion', label: 'Domicilio', autocomplete: 'street-address', autocapitalize: 'sentences', full: true, hint: 'Calle y número.', msg: 'Completá tu domicilio.' },
    { key: 'provincia', label: 'Provincia', type: 'select', opciones: D.PROVINCIAS, porDefecto: 'Santa Fe', msg: 'Elegí tu provincia.' },
    { key: 'localidad', label: 'Localidad', autocomplete: 'address-level2', autocapitalize: 'words', msg: 'Completá tu localidad.' },
    { key: 'grupoSanguineo', label: 'Grupo sanguíneo', type: 'select', opciones: D.GRUPOS, vacio: 'Elegí uno', msg: 'Elegí tu grupo sanguíneo.' },
  ];
  /* Segundo piloto, solo para la inscripción de invitados (comparten el resto de los datos) */
  const CAMPOS_P2 = [
    { key: 'nombre2', label: 'Nombre', autocomplete: 'off', autocapitalize: 'words', msg: 'Completá el nombre del piloto 2.' },
    { key: 'apellido2', label: 'Apellido', autocomplete: 'off', autocapitalize: 'words', msg: 'Completá el apellido del piloto 2.' },
    { key: 'dni2', label: 'DNI', autocomplete: 'off', inputmode: 'numeric', maxlength: 8, digits: true, hint: 'Solo números, sin puntos.', msg: 'Completá el DNI del piloto 2.' },
    { key: 'fechaNacimiento2', label: 'Fecha de nacimiento', type: 'date', msg: 'Completá la fecha de nacimiento del piloto 2.' },
  ];
  const CAMPOS_KART = [
    { key: 'nroKarting', label: 'Número de kart', autocomplete: 'off', inputmode: 'numeric', maxlength: 4, digits: true, msg: 'Completá el número de tu kart.' },
  ];
  const CAMPOS_SALUD = [
    { key: 'obraSocial', label: '¿Tenés obra social o prepaga?', opcional: true, full: true, autocapitalize: 'characters',
      hint: 'Si tenés, indicá cuál y tu número de afiliado. Ej.: OSDE – Afiliado N.º 123456789.' },
    { key: 'emergenciaNombre', label: 'Contacto de emergencia: nombre y apellido', full: true, autocapitalize: 'words', msg: 'Completá el nombre del contacto de emergencia.' },
    { key: 'emergenciaTelefono', label: 'Contacto de emergencia: teléfono', type: 'tel', msg: 'Completá el teléfono del contacto de emergencia.' },
  ];
  const TODOS = CAMPOS.concat(CAMPOS_KART, CAMPOS_SALUD);
  const LICENCIAS = [
    { key: 'licenciaDeportiva', titulo: 'Licencia deportiva' },
    { key: 'licenciaMedica', titulo: 'Licencia médica' },
  ];

  function capital(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function bytes(n) {
    n = Number(n) || 0;
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return Math.round(n / 1024) + ' KB';
    return (n / 1024 / 1024).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' MB';
  }
  function esImagen(a) { return !!a && /^image\//.test(a.tipo || ''); }
  function errMsg(e, def) { return (e && e.message) ? e.message : def; }
  function archivoPlano(a) { return a && a.assetId ? { assetId: a.assetId, nombre: a.nombre, tipo: a.tipo, tamano: a.tamano } : null; }

  /* Texto de la declaración final, armado con los datos del torneo */
  function textoDeclaracion(t) {
    if (!t) return '';
    const fs = App.fmt.fechasDe(t);
    const dias = D.dias(fs);
    return 'Declaro que la información proporcionada es correcta y se encuentra actualizada, y confirmo mi participación en ' +
      (t.nombre || 'el torneo') + (dias ? ', a realizarse ' + (fs.length > 1 ? 'los días ' : 'el día ') + dias : '') +
      (t.lugar ? ' en el ' + t.lugar.replace(/^(el|en el)\s+/i, '') : '') + '.';
  }

  App.view('registro', {
    title: 'Inscripción',
    async render(el, ctx) {
      if (!cssDone) { App.css(CSS + CSS_EXTRA); cssDone = true; }
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
        archivos: {},          // licenciaDeportiva / licenciaMedica -> { assetId, nombre, tipo, tamano }
        subiendo: {},          // clave -> nombre del archivo que se está subiendo
        categorias: [],        // una o más
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
        const fs = App.fmt.fechasDe(t);
        head.replaceChildren(
          h('div', { class: 'row', style: { gap: '8px' } },
            h('span', { class: 'eyebrow' }, 'Inscripciones abiertas'),
            t.estado === 'actual' ? h('span', { class: 'pill pill-live' }, 'En curso') : null),
          h('h1', null, t.nombre || 'Torneo'),
          h('div', { class: 'reg-meta' },
            fs.length ? h('span', null, icon(ICONS.calendario), capital(D.dias(fs)) + ' de ' + fs[0].slice(0, 4)) : null,
            t.lugar ? h('span', null, icon(ICONS.lugar), t.lugar) : null,
            t.sentido ? h('span', { class: 'pill pill-sentido' }, (t.sentido === 'antihorario' ? '↪ ' : '↩ ') + 'Sentido ' + t.sentido) : null),
          t.notas ? h('p', { class: 'reg-notas' }, t.notas) : null);
      }

      /* ---------- Decidir qué pantalla mostrar ---------- */
      function deseada() {
        if (st.torneos == null || st.mia === undefined) return 'loading';
        if (!st.torneo) return 'empty';
        if (!App.isAdmin && st.mia && st.mia.torneoId === st.torneo.id) return 'inscripto';
        return 'form';
      }
      const subiendoAlgo = () => Object.values(st.subiendo).some(Boolean);

      function sync() {
        if (!ctx.isCurrent()) return;
        st.torneo = st.torneos ? Store.torneoInscripcion(st.torneos) : null;
        const want = deseada();
        if (st.screen === 'ok') { renderHead(); return; }
        if (st.screen === 'form' && (want === 'form' || ((st.dirty || st.editando || st.enviando || subiendoAlgo()) && want !== 'loading'))) {
          // El usuario ya empezó: no tocar los inputs, solo encabezado, categorías, declaración y aviso de cierre.
          renderHead();
          actualizarCategorias();
          actualizarCierre();
          if (declTexto) declTexto.textContent = textoDeclaracion(st.torneo);
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

      /* ---------- Resúmenes ---------- */
      function listaCats(d) {
        const cs = Store.categoriasDe(d);
        return cs.length ? h('span', { class: 'reg-cats' }, cs.map(c => h('span', { class: 'pill' }, c))) : '—';
      }
      function linkArchivo(a) {
        return a && a.assetId
          ? h('a', { href: Store.urlArchivo(a.assetId), target: '_blank', rel: 'noopener' }, a.nombre || 'Ver archivo')
          : h('span', { class: 'pill' }, 'Sin subir');
      }
      function ficha(d) {
        const e = D.edad(d.fechaNacimiento);
        const fila = (k, v) => [h('dt', null, k), h('dd', null, v == null || v === '' ? '—' : v)];
        return h('dl', { class: 'reg-dl' },
          fila('Competidor', [d.nombre, d.apellido].filter(Boolean).join(' ')),
          fila('DNI', d.dni),
          fila('Nacimiento', d.fechaNacimiento ? App.fmt.fecha(d.fechaNacimiento) + (e != null ? ' (' + e + ' años)' : '') : ''),
          fila('Teléfono', d.telefono),
          fila('Email', d.email),
          fila('Domicilio', [d.direccion, d.localidad, d.provincia].filter(Boolean).join(', ')),
          fila('Grupo sanguíneo', d.grupoSanguineo),
          fila('Categorías', listaCats(d)),
          fila('Kart nº', d.nroKarting ? h('span', { class: 'kart-no' }, d.nroKarting) : ''),
          fila('Obra social', d.obraSocial || 'No tiene'),
          fila('Emergencia', [d.emergenciaNombre, d.emergenciaTelefono].filter(Boolean).join(' · ')),
          fila('Licencia deportiva', linkArchivo(d.licenciaDeportiva)),
          fila('Licencia médica', linkArchivo(d.licenciaMedica)));
      }

      /* ---------- Ya inscripto (competidor) ---------- */
      function vistaInscripto() {
        const d = st.mia;
        const t = st.torneo;
        return h('div', { class: 'card reg-ok' },
          h('div', { class: 'reg-badge' }, icon(ICONS.check)),
          h('h2', { tabindex: '-1' }, 'Ya estás inscripto en ' + (t ? t.nombre : 'el torneo')),
          h('p', { class: 'muted' }, 'Si algo cambió, podés corregir tus datos o subir las licencias que te falten.'),
          ficha(d),
          h('div', { class: 'reg-actions' },
            h('button', { type: 'button', class: 'btn btn-primary btn-lg', onclick: () => {
              st.editando = true;
              show('form', { prefill: st.mia });
            } }, 'Modificar mis datos')));
      }

      /* ---------- Confirmación ---------- */
      function vistaOk(o) {
        const d = o.datos;
        const faltan = LICENCIAS.filter(l => !d[l.key]).map(l => l.titulo.toLowerCase());
        const box = h('div', { class: 'card reg-ok', role: 'status' },
          h('div', { class: 'reg-badge' }, icon(ICONS.check)),
          h('h2', { tabindex: '-1' }, o.edicion ? '¡Listo, guardamos tus cambios!' : d.piloto2 ? '¡Listo, quedaron inscriptos los dos!' : '¡Listo, quedaste inscripto!'),
          h('p', { class: 'muted' }, 'Nos vemos en pista. 🏁'),
          h('dl', { class: 'reg-dl' },
            h('dt', null, d.piloto2 ? 'Invitados' : 'Competidor'),
            h('dd', null, [d.nombre, d.apellido].filter(Boolean).join(' ') + (d.piloto2 ? ' y ' + [d.piloto2.nombre, d.piloto2.apellido].filter(Boolean).join(' ') : '')),
            h('dt', null, 'Torneo'), h('dd', null, st.torneo ? st.torneo.nombre : '—'),
            h('dt', null, 'Categorías'), h('dd', null, listaCats(d)),
            h('dt', null, 'Kart nº'), h('dd', null, d.nroKarting ? h('span', { class: 'kart-no' }, d.nroKarting) : '—')),
          faltan.length ? h('div', { class: 'aut-warn' }, icon(ICONS.alerta),
            h('span', null, 'No subiste la ' + faltan.join(' ni la ') + '. Podés subirla más tarde o presentarla en la acreditación.')) : null,
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
        st.dirty = false; st.editando = false; st.intentado = false; st.archivos = {}; st.subiendo = {};
        st.categorias = []; st.catSig = ''; st.tipo = 'piloto';
        show('form');
        window.scrollTo(0, 0);
        const f = body.querySelector('#reg-nombre'); f && f.focus();
      }

      /* ---------- Formulario ---------- */
      const refs = {};   // key -> { input, err, wrap, def }
      let catList, catErr, catFieldset, closedEl, submitBtn, formEl, declTexto, declChk, declErr;
      const licBoxes = {};

      function campo(c) {
        const id = 'reg-' + c.key;
        const hintId = c.hint ? id + '-hint' : null;
        const errId = id + '-error';
        const comunes = { id, name: c.key, 'aria-describedby': [hintId, errId].filter(Boolean).join(' '), 'aria-required': c.opcional ? null : 'true' };
        let input;
        if (c.type === 'select') {
          input = h('select', comunes,
            c.vacio ? h('option', { value: '' }, c.vacio) : null,
            c.opciones.map(o => h('option', { value: o }, o)));
          input.value = c.porDefecto || '';
          input.addEventListener('change', () => { st.dirty = true; if (st.intentado) validarCampo(c.key); });
        } else {
          input = h('input', Object.assign(comunes, {
            type: c.type || 'text', autocomplete: c.autocomplete || 'off', inputmode: c.inputmode,
            maxlength: c.maxlength, autocapitalize: c.autocapitalize, spellcheck: c.spellcheck,
            pattern: c.digits ? '[0-9]*' : null, enterkeyhint: 'next',
            max: c.type === 'date' ? new Date().toISOString().slice(0, 10) : null,
          }));
          input.addEventListener('input', () => {
            if (c.digits) {
              const limpio = input.value.replace(/\D/g, '');
              if (limpio !== input.value) input.value = limpio;
            }
            st.dirty = true;
            if (st.intentado) validarCampo(c.key);
          });
          input.addEventListener('blur', () => { if (st.intentado || input.getAttribute('aria-invalid') === 'true') validarCampo(c.key); });
        }
        const err = h('p', { class: 'error', id: errId, hidden: true });
        const wrap = h('div', { class: 'field' + (c.full ? ' full' : '') },
          h('label', { for: id }, c.label, c.opcional ? h('span', { class: 'opc' }, ' (opcional)') : null),
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
          return;
        }
        if (key === 'declaracion') {
          declErr.textContent = msg || ''; declErr.hidden = !msg;
          declChk.closest('.reg-decl').classList.toggle('invalid', !!msg);
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
          return cats.length && !st.categorias.length ? 'Marcá al menos una categoría.' : '';
        }
        if (key === 'declaracion') return declChk.checked ? '' : 'Para inscribirte tenés que confirmar la declaración.';
        const r = refs[key];
        const v = r.input.value.trim();
        if (!v) return r.def.opcional ? '' : r.def.msg;
        if ((key === 'dni' || key === 'dni2') && !/^\d{7,8}$/.test(v)) return 'El DNI tiene que tener 7 u 8 números, sin puntos ni espacios.';
        if (key === 'dni2' && refs.dni && v === refs.dni.input.value.trim()) return 'El DNI del piloto 2 no puede ser igual al del piloto 1.';
        if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Revisá el email: tiene que ser del estilo nombre@dominio.com.';
        if ((key === 'telefono' || key === 'emergenciaTelefono') && v.replace(/\D/g, '').length < 6) return 'Revisá el teléfono: parece incompleto.';
        if (r.def.type === 'date') {
          const e = D.edad(v);
          if (e == null) return 'Revisá la fecha de nacimiento.';
          if (e < 4 || e > 99) return 'Revisá la fecha de nacimiento: la edad no parece correcta.';
        }
        return '';
      }
      function validarCampo(key) { const m = errorDe(key); setErr(key, m); return m; }

      /* Categorías: se puede marcar una o más. Sin cupos. */
      function actualizarCategorias(force) {
        if (!catList) return;
        const t = st.torneo;
        const cats = (t && t.categorias) || [];
        const sig = (t ? t.id : '') + JSON.stringify(cats.map(c => c.nombre));
        if (!force && sig === st.catSig) return;
        st.catSig = sig;
        st.categorias = st.categorias.filter(n => cats.some(c => c.nombre === n));
        if (!st.categorias.length && cats.length === 1) st.categorias = [cats[0].nombre];
        catFieldset.hidden = !cats.length;
        catList.replaceChildren(...cats.map((c, i) => {
          const id = 'reg-categoria-' + i;
          const sel = st.categorias.includes(c.nombre);
          const chk = h('input', { type: 'checkbox', name: 'categorias', id, value: c.nombre, checked: sel, 'aria-describedby': 'reg-categoria-error' });
          chk.addEventListener('change', () => {
            st.categorias = cats.map(x => x.nombre).filter(n => n === chk.value ? chk.checked : st.categorias.includes(n));
            st.dirty = true;
            chk.closest('.cat-opt').classList.toggle('is-sel', chk.checked);
            if (st.intentado) validarCampo('categoria');
          });
          return h('label', { class: 'cat-opt' + (sel ? ' is-sel' : ''), for: id }, chk, h('span', null, h('b', null, c.nombre)));
        }));
        if (st.intentado) validarCampo('categoria');
      }

      function actualizarCierre() {
        if (!closedEl) return;
        closedEl.hidden = !!st.torneo;
      }

      /* ---------- Licencias (opcionales): foto o PDF ---------- */
      function cajaLicencia(l) {
        const inCamara = h('input', { type: 'file', accept: 'image/*', capture: 'environment', class: 'vh', tabindex: '-1', 'aria-hidden': 'true' });
        const inArchivo = h('input', { type: 'file', accept: 'image/*,application/pdf', class: 'vh', tabindex: '-1', 'aria-hidden': 'true' });
        [inCamara, inArchivo].forEach(inp => inp.addEventListener('change', () => {
          const f = inp.files && inp.files[0];
          inp.value = '';
          if (f) subir(l.key, f);
        }));
        const caja = h('div', { class: 'aut-box', role: 'group', 'aria-label': l.titulo });
        licBoxes[l.key] = { caja, inCamara, inArchivo, error: '' };
        return h('div', { class: 'lic' }, h('span', { class: 'lic-tit' }, l.titulo, h('span', { class: 'opc' }, ' (opcional)')), caja, inCamara, inArchivo);
      }

      async function subir(key, file) {
        const b = licBoxes[key];
        if (file.type && !/^image\//.test(file.type) && file.type !== 'application/pdf') {
          b.error = 'Ese tipo de archivo no sirve. Subí una foto o un PDF.';
          App.toast(b.error, 'error');
          pintarLicencia(key);
          return;
        }
        st.subiendo[key] = file.name || 'archivo'; b.error = ''; st.dirty = true;
        pintarLicencia(key);
        try {
          const res = await Store.subirArchivo(file);
          if (!ctx.isCurrent()) return;
          st.archivos[key] = { assetId: res.assetId, nombre: res.nombre || file.name || 'licencia', tipo: res.tipo || file.type || '', tamano: res.tamano != null ? res.tamano : file.size };
          App.toast('Archivo subido.', 'ok');
        } catch (e) {
          if (!ctx.isCurrent()) return;
          b.error = errMsg(e, 'No se pudo subir el archivo. Probá de nuevo.');
          App.toast(b.error, 'error');
        } finally {
          st.subiendo[key] = null;
          if (ctx.isCurrent()) pintarLicencia(key);
        }
      }

      function pintarLicencia(key) {
        const b = licBoxes[key];
        if (!b) return;
        const a = st.archivos[key];
        const botones = h('div', { class: 'aut-choices' },
          h('button', { type: 'button', class: 'btn', onclick: () => b.inCamara.click() }, icon(ICONS.camara), 'Sacar foto'),
          h('button', { type: 'button', class: 'btn', onclick: () => b.inArchivo.click() }, icon(ICONS.archivo), 'Subir archivo'));
        let partes;
        if (st.subiendo[key]) {
          partes = [h('div', { class: 'aut-status', role: 'status' }, h('span', null, 'Subiendo «' + st.subiendo[key] + '»…'), h('div', { class: 'aut-bar', 'aria-hidden': 'true' }))];
        } else if (a) {
          let url = '';
          try { url = Store.urlArchivo(a.assetId); } catch (e) { url = ''; }
          const thumb = esImagen(a) && url
            ? h('img', { class: 'aut-thumb', src: url, alt: 'Vista previa' })
            : h('div', { class: 'aut-pdf', 'aria-hidden': 'true' }, icon(ICONS.doc), /pdf/i.test(a.tipo || a.nombre || '') ? 'PDF' : 'ARCH');
          partes = [h('div', { class: 'aut-prev' },
            url ? h('a', { href: url, target: '_blank', rel: 'noopener', 'aria-label': 'Abrir ' + a.nombre }, thumb) : thumb,
            h('div', { class: 'aut-info' },
              h('span', { class: 'aut-name' }, a.nombre),
              h('span', { class: 'small muted' }, (esImagen(a) ? 'Foto' : 'Documento') + (a.tamano ? ' · ' + bytes(a.tamano) : '')),
              h('div', { class: 'row' },
                h('button', { type: 'button', class: 'btn btn-sm', onclick: () => b.inArchivo.click() }, 'Cambiar'),
                h('button', { type: 'button', class: 'btn btn-sm btn-ghost', onclick: () => { st.archivos[key] = null; st.dirty = true; pintarLicencia(key); } }, 'Quitar'))))];
        } else {
          partes = [botones];
        }
        if (b.error) partes.push(h('p', { class: 'error', role: 'alert' }, b.error));
        b.caja.replaceChildren(...partes);
      }

      function datosForm() {
        const d = { torneoId: st.torneo ? st.torneo.id : '', categorias: st.categorias.slice(), categoria: st.categorias[0] || '' };
        TODOS.forEach(c => { d[c.key] = refs[c.key].input.value.trim(); });
        LICENCIAS.forEach(l => { d[l.key] = archivoPlano(st.archivos[l.key]); });
        d.declaracion = { aceptada: true, fecha: new Date().toISOString(), texto: textoDeclaracion(st.torneo) };
        if (esInvitados()) {
          d.piloto2 = { nombre: refs.nombre2.input.value.trim(), apellido: refs.apellido2.input.value.trim(), dni: refs.dni2.input.value.trim(), fechaNacimiento: refs.fechaNacimiento2.input.value };
        }
        return d;
      }

      async function enviar(ev) {
        ev.preventDefault();
        if (st.enviando) return;
        st.intentado = true;
        let primero = null;
        const orden = CAMPOS.map(c => c.key).concat(esInvitados() ? CAMPOS_P2.map(c => c.key) : [], ['categoria'], CAMPOS_KART.map(c => c.key), CAMPOS_SALUD.map(c => c.key), ['declaracion']);
        orden.forEach(k => { const m = validarCampo(k); if (m && !primero) primero = k; });
        if (primero) {
          const target = primero === 'categoria' ? catList.querySelector('input') : primero === 'declaracion' ? declChk : refs[primero].input;
          if (target) { target.focus(); target.scrollIntoView && target.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
          App.toast('Revisá los campos marcados en rojo.', 'error');
          return;
        }
        if (subiendoAlgo()) { App.toast('Esperá a que termine de subir el archivo.', 'error'); return; }
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

      function labelSubmit() { return st.editando ? 'Guardar cambios' : esInvitados() ? 'Inscribir a los dos invitados' : 'Confirmar inscripción'; }
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
        st.dirty = false;
        st.subiendo = {};
        st.archivos = {};
        st.categorias = prefill ? Store.categoriasDe(prefill) : [];
        if (prefill) LICENCIAS.forEach(l => { st.archivos[l.key] = prefill[l.key] && prefill[l.key].assetId ? Object.assign({}, prefill[l.key]) : null; });

        catList = h('div', { class: 'cat-list cat-multi' });
        catErr = h('p', { class: 'error', id: 'reg-categoria-error', hidden: true });
        catFieldset = h('fieldset', { class: 'field full', id: 'reg-categoria' },
          h('legend', null, 'Categorías en las que vas a participar'),
          h('p', { class: 'hint' }, 'Podés marcar una o más.'), catList, catErr);
        closedEl = h('p', { class: 'reg-closed', role: 'alert', hidden: true },
          'Las inscripciones se cerraron mientras completabas el formulario. Consultá con el organizador.');
        submitBtn = h('button', { type: 'submit', class: 'btn btn-primary btn-lg', id: 'reg-enviar' }, labelSubmit());

        /* Tipo de inscripción: un piloto, o dos invitados que corren con el mismo kart */
        if (prefill || st.editando) st.tipo = 'piloto';
        const p1Sub = h('p', { class: 'p-sub' }, 'Piloto 1');
        const p2Box = h('div', { class: 'p2-box' }, h('p', { class: 'p-sub' }, 'Piloto 2'),
          h('div', { class: 'form-grid' }, CAMPOS_P2.map(campo)),
          h('p', { class: 'hint' }, 'El resto de los datos (contacto, domicilio, kart y emergencia) es el mismo para los dos.'));
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

        /* Confirmación final */
        declTexto = h('p', { class: 'reg-decl-txt' }, textoDeclaracion(st.torneo));
        declChk = h('input', { type: 'checkbox', id: 'reg-declaracion', 'aria-describedby': 'reg-declaracion-error' });
        declChk.addEventListener('change', () => { st.dirty = true; if (st.intentado) validarCampo('declaracion'); });
        declErr = h('p', { class: 'error', id: 'reg-declaracion-error', hidden: true });

        const aviso = !App.isAdmin && st.mia && !st.editando && prefill
          ? h('p', { class: 'small muted' }, 'Precargamos tus datos de la inscripción anterior. Revisalos antes de enviar.')
          : null;

        formEl = h('form', { novalidate: true, autocomplete: 'on', onsubmit: enviar, 'aria-label': 'Formulario de inscripción' },
          tipoField,
          seccion(1, sec1Title,
            p1Sub,
            h('div', { class: 'form-grid' }, CAMPOS.map(campo)),
            p2Box),
          seccion(2, 'Categorías y kart',
            catFieldset,
            h('div', { class: 'form-grid' }, CAMPOS_KART.map(campo))),
          seccion(3, 'Salud y emergencia',
            h('div', { class: 'form-grid' }, CAMPOS_SALUD.map(campo))),
          seccion(4, 'Licencias',
            h('p', { class: 'hint' }, 'Opcional: si las tenés a mano, subí una foto o un PDF. Si no, podés seguir con la inscripción igual.'),
            h('div', { class: 'lic-grid' }, LICENCIAS.map(cajaLicencia))),
          seccion(5, 'Confirmación final',
            h('div', { class: 'reg-decl' },
              h('span', { class: 'reg-decl-tit' }, 'Declaración'),
              declTexto,
              h('label', { class: 'reg-decl-chk', for: 'reg-declaracion' }, declChk, h('span', null, 'Confirmo que los datos son correctos y mi participación.'))),
            declErr),
          closedEl,
          h('div', { class: 'reg-submit' },
            submitBtn,
            st.editando ? h('button', { type: 'button', class: 'btn btn-ghost', onclick: cancelarEdicion }, 'Cancelar') : null,
            h('p', { class: 'reg-foot' }, '⚠️ Completá la información de manera correcta y actualizada.')));

        if (prefill) TODOS.forEach(c => { if (prefill[c.key] != null && prefill[c.key] !== '') refs[c.key].input.value = String(prefill[c.key]); });
        actualizarCategorias(true);
        actualizarCierre();
        LICENCIAS.forEach(l => pintarLicencia(l.key));
        pintarTipo();

        return h('div', { class: 'stack-lg' },
          (App.isAdmin && !App.vistaCompetidor) ? compartir() : null,
          st.editando
            ? h('p', { class: 'reg-intro' }, 'Corregí lo que haga falta y guardá los cambios.')
            : h('p', { class: 'reg-intro' }, 'Completá el formulario con todos tus datos para registrar tu inscripción. Las licencias y la obra social son opcionales.'),
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
        // Reutiliza los datos personales de una inscripción anterior (otro torneo); categorías solo si existen en este torneo.
        const p = {};
        TODOS.forEach(c => { p[c.key] = m[c.key] || ''; });
        const cats = ((st.torneo && st.torneo.categorias) || []).map(c => c.nombre);
        p.categorias = Store.categoriasDe(m).filter(c => cats.includes(c));
        LICENCIAS.forEach(l => { p[l.key] = m[l.key] || null; });
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
