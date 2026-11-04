/* Núcleo de la app: router por hash, constructor de DOM, modales, avisos y formatos.
   Las vistas se registran con App.view(nombre, { title, admin, render(el, ctx) }). */
(function () {
  const views = {};
  let current = null; // { name, cleanups: [] }

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'value') el.value = v;
        else if (k === 'checked' || k === 'disabled' || k === 'selected' || k === 'hidden' || k === 'required' || k === 'multiple') el[k] = !!v;
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      }
    }
    append(el, children);
    return el;
  }
  function append(el, children) {
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false) continue;
      el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  function css(text) {
    const s = document.createElement('style');
    s.textContent = text;
    document.head.appendChild(s);
  }

  function toast(msg, kind) {
    const box = document.getElementById('toasts');
    const t = h('div', { class: 'toast ' + (kind || ''), role: 'status' }, msg);
    box.appendChild(t);
    setTimeout(() => t.remove(), kind === 'error' ? 6000 : 3200);
  }

  /* modal({ title, content, actions: [{ label, kind, onClick(close) }], onClose }) -> { close, el } */
  function modal(opts) {
    const prevFocus = document.activeElement;
    const back = h('div', { class: 'modal-back' });
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); opts.onClose && opts.onClose(); prevFocus && prevFocus.focus && prevFocus.focus(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const foot = h('div', { class: 'modal-foot' },
      (opts.actions || []).map(a => h('button', { type: 'button', class: 'btn ' + (a.kind ? 'btn-' + a.kind : ''), onclick: () => a.onClick ? a.onClick(close) : close() }, a.label)));
    const box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': opts.title || '' },
      h('div', { class: 'modal-head' }, h('h2', null, opts.title || ''), h('span', { class: 'spacer' }),
        h('button', { type: 'button', class: 'btn btn-ghost btn-sm', 'aria-label': 'Cerrar', onclick: close }, '✕')),
      h('div', { class: 'modal-body' }, opts.content || null),
      opts.actions && opts.actions.length ? foot : null);
    back.appendChild(box);
    back.addEventListener('mousedown', (e) => { if (e.target === back) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(back);
    const first = box.querySelector('input, select, textarea, .modal-foot .btn');
    first && first.focus();
    return { close, el: box };
  }

  /* confirm({ title, body, okLabel, danger }) -> Promise<boolean>. No usar window.confirm (no funciona en el visor). */
  function confirmDialog(o) {
    return new Promise((resolve) => {
      let done = false;
      const m = modal({
        title: o.title || '¿Confirmás?',
        content: typeof o.body === 'string' ? h('p', null, o.body) : o.body,
        onClose: () => { if (!done) resolve(false); },
        actions: [
          { label: 'Cancelar', kind: 'ghost' },
          { label: o.okLabel || 'Confirmar', kind: o.danger ? 'danger' : 'primary', onClick: (close) => { done = true; resolve(true); close(); } },
        ],
      });
      return m;
    });
  }

  /* Formatos. Tiempos se guardan en milisegundos (número) y se muestran como m:ss.mmm */
  const fmt = {
    fecha(iso) {
      if (!iso) return '—';
      const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso);
      if (isNaN(d)) return iso;
      return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    fechaLarga(iso) {
      if (!iso) return '—';
      const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso);
      if (isNaN(d)) return iso;
      const t = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      return t.charAt(0).toUpperCase() + t.slice(1);   // "Sábado, 24 de octubre de 2026"
    },
    tiempo(ms) {
      if (ms == null || ms === '' || isNaN(ms)) return '';
      const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000), r = Math.round(ms % 1000);
      return m + ':' + String(s).padStart(2, '0') + '.' + String(r).padStart(3, '0');
    },
    /* Acepta "48.312", "0:48.312", "1:02.5", "48,312". Devuelve ms o null si no es válido. */
    parseTiempo(str) {
      if (str == null) return null;
      const t = String(str).trim().replace(',', '.');
      if (!t) return null;
      const m = t.match(/^(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/);
      if (!m) return null;
      const min = +(m[1] || 0), sec = +m[2], frac = m[3] ? +(m[3] + '00').slice(0, 3) : 0;
      if (m[1] != null && sec > 59) return null;
      return min * 60000 + sec * 1000 + frac;
    },
    /* Fechas de un torneo (1 a 3); los torneos viejos solo tienen `fecha` */
    fechasDe(t) {
      if (window.Store && window.Store.fechasDe) return window.Store.fechasDe(t);
      return t && t.fecha ? [t.fecha] : [];
    },
    /* Fechas del torneo con su número y sus días: [{ n, numero, dias, desde, hasta }] */
    fechasInfo(t) {
      if (window.Store && window.Store.fechasInfo) return window.Store.fechasInfo(t);
      return t && t.fecha ? [{ n: 1, numero: 1, dias: [t.fecha], desde: t.fecha, hasta: t.fecha }] : [];
    },
    /* Días de una fecha: "Sábado 14 y domingo 15 de noviembre" (largo) o "14 y 15 nov" */
    diasTexto(dias, largo) {
      const ds = (dias || []).map(d => new Date(d + 'T12:00:00')).filter(d => !isNaN(d));
      if (!ds.length) return '—';
      if (ds.length === 1) return largo ? fmt.fechaLarga(dias[0]) : fmt.fecha(dias[0]);
      const mismoMes = ds.every(d => d.getMonth() === ds[0].getMonth());
      const unir = (xs) => xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];
      const anio = ' de ' + ds[ds.length - 1].getFullYear();
      if (largo) {
        const partes = ds.map(d => d.toLocaleDateString('es-AR', { weekday: 'long' }) + ' ' + d.getDate() + (mismoMes ? '' : ' de ' + d.toLocaleDateString('es-AR', { month: 'long' })));
        const t = unir(partes) + (mismoMes ? ' de ' + ds[0].toLocaleDateString('es-AR', { month: 'long' }) : '') + anio;
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      const mes = (d) => d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '');
      return mismoMes ? unir(ds.map(d => String(d.getDate()))) + ' ' + mes(ds[0]) : unir(ds.map(d => d.getDate() + ' ' + mes(d)));
    },
    /* Todo el calendario del torneo en una línea: "Fecha 7: 14 y 15 nov · Fecha 8: 5 y 6 dic" (una sola fecha, más largo) */
    fechasTexto(t, largo) {
      const fs = fmt.fechasInfo(t);
      if (!fs.length) return '—';
      if (fs.length === 1) return 'Fecha ' + fs[0].numero + ' · ' + fmt.diasTexto(fs[0].dias, largo);
      return fs.map(f => 'Fecha ' + f.numero + ': ' + fmt.diasTexto(f.dias)).join(' · ');
    },
    nombre(i) { return [i.apellido, i.nombre].filter(Boolean).join(', '); },
    norm(s) { return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); },
  };

  function view(name, def) { views[name] = def; }
  function go(route) { if (location.hash.slice(1) === route) render(); else location.hash = route; }

  function parseRoute() {
    const raw = decodeURIComponent(location.hash.slice(1)) || 'inicio';
    const [name, param] = raw.split('~');
    return { name, param: param || null };
  }

  async function render() {
    let { name, param } = parseRoute();
    const store = window.Store;
    // Quien no administra solo ve el formulario de inscripción
    if (name === 'inscripcion') name = 'registro', App.vistaCompetidor = true;
    else App.vistaCompetidor = !App.isAdmin;
    if (!App.isAdmin && name !== 'registro') name = 'registro';
    if (!views[name]) name = App.isAdmin ? 'inicio' : 'registro';
    document.getElementById('topnav').hidden = App.vistaCompetidor;
    document.getElementById('brand').setAttribute('href', App.vistaCompetidor ? '#inscripcion' : '#inicio');
    document.getElementById('demo-banner').hidden = !(App.mode === 'demo' && !App.vistaCompetidor);
    if (current) current.cleanups.forEach(fn => { try { fn(); } catch (e) {} });
    const cleanups = [];
    current = { name, cleanups };
    document.querySelectorAll('#topnav a').forEach(a => {
      if (a.dataset.route === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const el = document.getElementById('app');
    el.replaceChildren();
    window.scrollTo(0, 0);
    try {
      await views[name].render(el, { param, store, onCleanup: (fn) => cleanups.push(fn), isCurrent: () => current && current.cleanups === cleanups });
    } catch (e) {
      console.error(e);
      el.replaceChildren(h('div', { class: 'empty' }, h('strong', null, 'No se pudo mostrar esta pantalla.'), h('span', null, String(e && e.message || e))));
    }
  }

  /* Copia de seguridad (versión de prueba): los datos viven solo en este navegador, así que se bajan como archivo
     para guardarlos (en la compu, el mail, WhatsApp) y restaurarlos acá o en otro dispositivo. */
  const avisoCopia = h('span', { class: 'small' });
  function mostrarUltimaCopia() {
    const f = window.Store.ultimaCopia && window.Store.ultimaCopia();
    avisoCopia.textContent = f ? 'Última copia: ' + new Date(f).toLocaleString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Todavía no descargaste ninguna copia.';
  }
  async function descargarCopia() {
    try {
      const copia = await window.Store.exportarCopia();
      const blob = new Blob([JSON.stringify(copia)], { type: 'application/json' });
      const a = h('a', { href: URL.createObjectURL(blob), download: 'rgk-copia-' + copia.fecha.slice(0, 16).replace(/[T:]/g, '-') + '.json' });
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      mostrarUltimaCopia();
      toast('Copia descargada. Guardala en un lugar seguro (la compu, el mail o un chat de WhatsApp con vos mismo).', 'ok');
    } catch (e) { toast('No se pudo descargar la copia: ' + (e && e.message || e), 'error'); }
  }
  function restaurarCopia() {
    const inp = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
    inp.addEventListener('change', async () => {
      const f = inp.files && inp.files[0]; inp.remove();
      if (!f) return;
      let copia;
      try { copia = JSON.parse(await f.text()); } catch (e) { toast('El archivo no es una copia de seguridad válida.', 'error'); return; }
      const ok = await confirmDialog({ title: 'Restaurar copia', body: 'Lo que hay ahora en esta página se reemplaza por la copia' + (copia && copia.fecha ? ' del ' + new Date(copia.fecha).toLocaleString('es-AR') : '') + '. Si tenés cambios nuevos, descargá antes una copia de lo actual.', okLabel: 'Restaurar' });
      if (!ok) return;
      try {
        const r = await window.Store.importarCopia(copia);
        toast('Copia restaurada: ' + r.torneos + ' torneos y ' + r.competidores + ' competidores.', 'ok');
        render();
      } catch (e) { toast(e && e.message || String(e), 'error'); }
    });
    document.body.appendChild(inp); inp.click();
  }
  async function borrarTodo() {
    const campo = h('input', { type: 'text', autocomplete: 'off', placeholder: 'BORRAR', 'aria-label': 'Escribí BORRAR para confirmar' });
    const ok = await confirmDialog({ title: 'Borrar todo', danger: true, okLabel: 'Borrar todo', body: h('div', { class: 'stack' },
      h('p', null, 'Se borran todos los torneos, competidores, resultados y fotos de este dispositivo. No se puede deshacer.'),
      h('p', null, h('button', { type: 'button', class: 'btn btn-sm', onclick: descargarCopia }, 'Descargar una copia antes')),
      h('label', null, 'Para confirmar, escribí BORRAR:'), campo) });
    if (!ok) return;
    if (campo.value.trim().toUpperCase() !== 'BORRAR') { toast('No se borró nada: había que escribir BORRAR.', 'error'); return; }
    await window.Store.borrarTodoDemo();
    location.hash = 'inicio'; location.reload();
  }

  async function start() {
    let info = { mode: 'demo', isAdmin: true };
    try { info = await window.Store.init(); } catch (e) { console.error(e); }
    App.isAdmin = !!info.isAdmin;
    App.mode = info.mode;
    if (info.mode === 'demo') {
      document.getElementById('demo-banner-text').textContent = window.PK_FORZAR_DEMO
        ? 'Versión de prueba. Lo que cargues se guarda solo en este dispositivo y navegador.'
        : 'Modo demostración: los datos son de ejemplo y se guardan solo en este navegador.';
      const wrap = document.querySelector('#demo-banner .wrap');
      wrap.append(
        h('button', { type: 'button', class: 'btn btn-sm btn-primary', onclick: descargarCopia }, 'Descargar copia de seguridad'),
        h('button', { type: 'button', class: 'btn btn-sm', onclick: restaurarCopia }, 'Restaurar copia'),
        avisoCopia,
        h('span', { class: 'spacer' }),
        h('button', { type: 'button', class: 'btn btn-sm btn-ghost', onclick: borrarTodo }, 'Borrar todo'));
      mostrarUltimaCopia();
    }
    window.addEventListener('hashchange', render);
    render();
  }

  /* Link para compartir con los competidores */
  const URL_PUBLICADA = window.PK_URL || 'https://claude.ai/artifact/VZDhuW8EL53C8QKGbgTm5U';
  function linkInscripcion() {
    if (App.mode === 'db' || window.PK_URL) return URL_PUBLICADA + '#inscripcion';
    const base = (document.referrer && /claude\.ai\/(code\/)?artifact\//.test(document.referrer)) ? document.referrer.split('#')[0] : location.href.split('#')[0];
    return base + '#inscripcion';
  }

  /* Tarjeta con el link de invitación, para el pie de las pantallas de torneos */
  css(`
.invitacion-card { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.invitacion-card .link-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.invitacion-card .link-row input { flex: 1 1 260px; min-width: 0; font-family: var(--font-mono); font-size: .9rem; background: var(--surface-2); }
`);
  function tarjetaInvitacion() {
    const link = linkInscripcion();
    const inp = h('input', { type: 'text', readonly: true, value: link, 'aria-label': 'Link de invitación', onfocus: (e) => e.target.select() });
    const copiar = async () => {
      try { await navigator.clipboard.writeText(link); toast('Link copiado. Pegalo en WhatsApp o en un mail para los competidores.', 'ok'); }
      catch (e) { inp.focus(); inp.select(); toast('No se pudo copiar solo: copialo a mano (ya está seleccionado).'); }
    };
    return h('section', { class: 'card invitacion-card', 'aria-label': 'Link de invitación para competidores' },
      h('div', { class: 'stack', style: { gap: '4px' } },
        h('h2', null, 'Link de invitación para competidores'),
        h('p', { class: 'muted' }, 'Copialo y mandalo a los competidores para que se inscriban en el torneo. Lo que completen aparece en Competidores.')),
      h('div', { class: 'link-row' },
        inp,
        h('button', { type: 'button', class: 'btn btn-dark', onclick: copiar }, 'Copiar link'),
        h('a', { class: 'btn btn-ghost', href: '#registro' }, 'Ver formulario')));
  }

  /* Listas compartidas por el formulario de inscripción y la ficha del competidor */
  const datos = {
    PROVINCIAS: ['Santa Fe', 'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
      'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
      'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    GRUPOS: ['0+', '0-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'No sé'],
    /* Edad cumplida a hoy a partir de 'AAAA-MM-DD'; null si no es válida */
    edad(iso) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
      if (!m) return null;
      const hoy = new Date();
      let e = hoy.getFullYear() - +m[1];
      if (hoy.getMonth() + 1 < +m[2] || (hoy.getMonth() + 1 === +m[2] && hoy.getDate() < +m[3])) e--;
      return e >= 0 && e < 120 ? e : null;
    },
    /* Fecha escrita a mano "DD/MM/AAAA" -> 'AAAA-MM-DD' (null si no existe ese día) */
    textoAIso(t) {
      const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(t || '').trim());
      if (!m) return null;
      const d = +m[1], mes = +m[2], a = +m[3];
      const f = new Date(a, mes - 1, d);
      if (f.getFullYear() !== a || f.getMonth() !== mes - 1 || f.getDate() !== d) return null;
      return a + '-' + String(mes).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    },
    isoATexto(iso) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
      return m ? m[3] + '/' + m[2] + '/' + m[1] : '';
    },
    /* Campo de fecha que se escribe con el teclado numérico: las barras se ponen solas (14052001 -> 14/05/2001) */
    mascaraFecha(input) {
      input.addEventListener('input', () => {
        const n = input.value.replace(/\D/g, '').slice(0, 8);
        const t = n.length > 4 ? n.slice(0, 2) + '/' + n.slice(2, 4) + '/' + n.slice(4) : n.length > 2 ? n.slice(0, 2) + '/' + n.slice(2) : n;
        if (t !== input.value) input.value = t;
      });
      return input;
    },
    /* Días de un torneo en texto: "24 y 25 de octubre", "29 de noviembre y 6 de diciembre" */
    dias(fechas) {
      const ds = (fechas || []).filter(Boolean).map(f => new Date(f + 'T12:00:00')).filter(d => !isNaN(d));
      if (!ds.length) return '';
      const mes = (d) => d.toLocaleDateString('es-AR', { month: 'long' });
      const unir = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];
      if (ds.every(d => d.getMonth() === ds[0].getMonth() && d.getFullYear() === ds[0].getFullYear())) return unir(ds.map(d => String(d.getDate()))) + ' de ' + mes(ds[0]);
      return unir(ds.map(d => d.getDate() + ' de ' + mes(d)));
    },
  };

  window.App = { h, append, css, toast, modal, confirm: confirmDialog, fmt, view, go, start, render, linkInscripcion, tarjetaInvitacion, datos, isAdmin: true, mode: 'demo' };
})();
