/* Próximos torneos: lista de torneos programados, alta/edición con categorías y cupos, inicio y borrado. */
(function () {
  const h = App.h;

  App.css(`
.v-proximos { display: flex; flex-direction: column; gap: 24px; }
.v-proximos .pr-live { display: flex; gap: 10px 14px; align-items: center; flex-wrap: wrap; border-left: 4px solid var(--accent); padding: 12px 16px; }
.v-proximos .pr-live strong { overflow-wrap: anywhere; }
.v-proximos .pr-list { display: flex; flex-direction: column; gap: 16px; }
.v-proximos .pr-card { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 18px; align-items: start; }
.v-proximos .pr-date { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 6px; border-radius: var(--radius);
  background: #000; border: 1px solid var(--accent); color: #fff; text-align: center; line-height: 1; gap: 4px; }
.v-proximos .pr-day { font: 800 2.6rem/0.9 var(--font-display); font-variant-numeric: tabular-nums; }
.v-proximos .pr-mon { font: 700 1rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .1em; color: var(--accent-text); }
.v-proximos .pr-year { font: 600 .8rem/1 var(--font-display); letter-spacing: .08em; opacity: .75; font-variant-numeric: tabular-nums; }
.v-proximos .pr-body { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.v-proximos .pr-body h2 { overflow-wrap: anywhere; }
.v-proximos .pr-meta { color: var(--ink-2); }
.v-proximos .pr-meta::first-letter { text-transform: uppercase; }
.v-proximos .pr-cats { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }
.v-proximos .pr-cat { border: 1px solid var(--line); border-radius: var(--radius); padding: 8px 10px; background: var(--surface-2); display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.v-proximos .pr-cat-top { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
.v-proximos .pr-cat-name { font: 700 .95rem/1.1 var(--font-display); text-transform: uppercase; letter-spacing: .04em; overflow-wrap: anywhere; }
.v-proximos .pr-cat-num { font-variant-numeric: tabular-nums; font-size: .88rem; color: var(--ink-2); white-space: nowrap; }
.v-proximos .pr-meter { height: 6px; border-radius: 999px; background: var(--line); overflow: hidden; }
.v-proximos .pr-meter > span { display: block; height: 100%; background: var(--accent); }
.v-proximos .pr-meter.full > span { background: var(--ok); }
.v-proximos .pr-meter.over > span { background: var(--danger); }
.v-proximos .pr-notas { color: var(--ink-2); font-size: .92rem; white-space: pre-line; border-left: 3px solid var(--line); padding-left: 10px; }
.v-proximos .pr-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.v-proximos .pr-total { font-size: .88rem; color: var(--ink-2); font-variant-numeric: tabular-nums; }
.v-proximos-modal .pr-cat-rows { display: flex; flex-direction: column; gap: 8px; }
.v-proximos-modal .pr-cat-row { display: grid; grid-template-columns: minmax(0, 1fr) 96px auto; gap: 8px; align-items: center; }
.v-proximos-modal .pr-cat-head { display: grid; grid-template-columns: minmax(0, 1fr) 96px auto; gap: 8px; font-size: .8rem; color: var(--ink-3); font-weight: 600; }
.v-proximos-modal .pr-cat-head span:last-child { visibility: hidden; }
.v-proximos-modal .pr-cat-row input[type="number"] { font-variant-numeric: tabular-nums; }
.v-proximos-modal .pr-fecha-rows { display: flex; flex-direction: column; gap: 8px; }
.v-proximos-modal .pr-fecha-row { display: grid; grid-template-columns: 72px minmax(0, 1fr) auto; gap: 8px; align-items: center; }
.v-proximos-modal .pr-fecha-row .pr-fecha-n { font: 700 .95rem/1 var(--font-display); text-transform: uppercase; letter-spacing: .05em; color: var(--ink-2); }
.v-proximos-modal .pr-fecha-row .btn[hidden] { display: inline-flex !important; visibility: hidden; }
.v-proximos-modal .pr-err { color: var(--danger); font-size: .88rem; font-weight: 600; }
.v-proximos-modal textarea { resize: vertical; min-height: 72px; }
@media (max-width: 520px) {
  .v-proximos .pr-card { grid-template-columns: 1fr; gap: 12px; }
  .v-proximos .pr-date { flex-direction: row; justify-content: flex-start; align-items: baseline; gap: 8px; padding: 8px 12px; align-self: start; width: max-content; }
  .v-proximos .pr-day { font-size: 1.8rem; }
  .v-proximos .pr-actions .btn-primary { flex: 1 1 100%; }
  .v-proximos-modal .pr-cat-row, .v-proximos-modal .pr-cat-head { grid-template-columns: minmax(0, 1fr) 72px auto; }
}
`);

  /* Categorías del RGK Santafesino: se cargan al crear un torneo nuevo */
  const DEFAULT_CATS = [
    '110 Escuela', '150 Varillero Juvenil', '150 Varillero', '150 Cadenero', '150 Multimarca', '150 Multi.Senior',
    '125 Promocional', '125 Inter.Juvenil', '125 Internacional', '125 Inter. Promocional', '125 Inter.Senior', '125 Inter.Master',
  ].map(nombre => ({ nombre, cupo: null }));
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
    return {
      day: String(d.getDate()),
      mon: d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', ''),
      year: String(d.getFullYear()),
    };
  }

  App.view('proximos-torneos', {
    title: 'Próximos torneos',
    admin: true,
    async render(el, ctx) {
      const S = window.Store;
      const root = h('div', { class: 'v-proximos' }, h('p', { class: 'loading' }, 'Cargando torneos…'));
      el.appendChild(root);

      let torneos = null, inscs = [];
      const u1 = S.watchTorneos((list) => { torneos = list || []; draw(); });
      ctx.onCleanup(() => callUnsub(u1));
      const u2 = S.watchInscripciones((list) => { inscs = list || []; draw(); });
      ctx.onCleanup(() => callUnsub(u2));

      function conteos(t) {
        const porCat = {};
        let total = 0;
        for (const i of inscs) {
          if (i.torneoId !== t.id) continue;
          total++;
          porCat[i.categoria] = (porCat[i.categoria] || 0) + 1;
        }
        return { porCat, total };
      }

      function draw() {
        if (!ctx.isCurrent() || torneos == null) return;
        const actual = S.torneoActual(torneos);
        const proximos = torneos.filter(t => t.estado === 'proximo')
          .sort((a, b) => String(a.fecha || '').localeCompare(String(b.fecha || '')));

        const head = h('div', { class: 'page-head' },
          h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, 'Calendario'), h('h1', null, 'Próximos torneos')),
          h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn btn-primary', onclick: () => editor(null) }, 'Nuevo torneo')));

        const live = actual ? h('div', { class: 'card-flat pr-live' },
          h('span', { class: 'pill pill-live' }, 'En curso'),
          h('strong', null, actual.nombre || 'Torneo sin nombre'),
          h('span', { class: 'spacer' }),
          h('a', { class: 'btn btn-sm btn-dark', href: '#torneo-actual' }, 'Ir al torneo actual')) : null;

        const body = proximos.length
          ? h('div', { class: 'pr-list' }, proximos.map(card))
          : h('div', { class: 'empty' },
            h('strong', null, 'No hay torneos programados'),
            h('span', null, 'Creá el próximo torneo con sus categorías y cupos para que los competidores se puedan anotar.'),
            h('button', { type: 'button', class: 'btn btn-primary', onclick: () => editor(null) }, 'Nuevo torneo'));

        root.replaceChildren(head, live, body);
      }

      function card(t) {
        const f = partesFecha(t.fecha);
        const { porCat, total } = conteos(t);
        const cats = t.categorias || [];
        const cupoTotal = cats.reduce((s, c) => s + (c.cupo == null || c.cupo === '' ? 0 : +c.cupo), 0);
        const btnIniciar = h('button', { type: 'button', class: 'btn btn-primary', onclick: () => iniciar(t, btnIniciar) }, 'Iniciar torneo');
        return h('article', { class: 'card pr-card' },
          h('div', { class: 'pr-date', 'aria-hidden': 'true' },
            h('span', { class: 'pr-day' }, f.day), h('span', { class: 'pr-mon' }, f.mon), h('span', { class: 'pr-year' }, f.year)),
          h('div', { class: 'pr-body' },
            h('div', { class: 'stack', style: { gap: '4px' } },
              h('h2', null, t.nombre || 'Torneo sin nombre'),
              h('p', { class: 'pr-meta' }, App.fmt.fechasTexto(t, true) + (t.lugar ? ' · ' + t.lugar : ''))),
            cats.length
              ? h('div', { class: 'pr-cats' }, cats.map(c => {
                const n = porCat[c.nombre] || 0;
                const cupo = c.cupo == null || c.cupo === '' ? null : +c.cupo;
                const pct = cupo ? Math.min(100, Math.round(n / cupo * 100)) : (n ? 100 : 0);
                const estado = cupo == null ? '' : n > cupo ? ' over' : n === cupo ? ' full' : '';
                return h('div', { class: 'pr-cat' },
                  h('div', { class: 'pr-cat-top' },
                    h('span', { class: 'pr-cat-name' }, c.nombre),
                    h('span', { class: 'pr-cat-num' }, cupo == null ? pl(n, 'anotado', 'anotados') : n + ' / ' + cupo)),
                  h('div', { class: 'pr-meter' + estado, role: 'img', 'aria-label': cupo == null ? n + ' anotados, sin cupo' : n + ' de ' + cupo + ' lugares ocupados' },
                    h('span', { style: { width: pct + '%' } })));
              }))
              : h('p', { class: 'muted small' }, 'Sin categorías definidas.'),
            h('p', { class: 'pr-total' }, pl(total, 'competidor anotado', 'competidores anotados') + (cupoTotal ? ' de ' + cupoTotal + ' lugares' : '')),
            t.notas ? h('p', { class: 'pr-notas' }, t.notas) : null,
            h('div', { class: 'pr-actions' },
              btnIniciar,
              h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => editor(t) }, 'Editar'),
              h('span', { class: 'spacer' }),
              h('button', { type: 'button', class: 'btn btn-danger btn-sm', onclick: () => borrar(t) }, 'Borrar'))));
      }

      async function iniciar(t, btn) {
        btn.disabled = true;
        try {
          await S.iniciarTorneo(t.id);
          App.toast('Torneo iniciado: ' + (t.nombre || ''), 'ok');
          App.go('torneo-actual');
        } catch (e) {
          console.error(e);
          btn.disabled = false;
          App.toast(e && e.message ? e.message : 'No se pudo iniciar el torneo', 'error');
        }
      }

      async function borrar(t) {
        const { total } = conteos(t);
        const body = h('div', { class: 'stack' },
          h('p', null, '¿Borrás el torneo «' + (t.nombre || 'sin nombre') + '» del ' + App.fmt.fecha(t.fecha) + '?'),
          total ? h('p', null, h('span', { class: 'pill pill-warn' }, 'Atención'), ' Tiene ' + pl(total, 'competidor anotado', 'competidores anotados') + '.') : null,
          h('p', { class: 'muted small' }, 'Esta acción no se puede deshacer.'));
        const ok = await App.confirm({ title: 'Borrar torneo', body, okLabel: 'Borrar torneo', danger: true });
        if (!ok) return;
        try {
          await S.borrarTorneo(t.id);
          App.toast('Torneo borrado', 'ok');
        } catch (e) {
          console.error(e);
          App.toast('No se pudo borrar: ' + (e && e.message || e), 'error');
        }
      }

      /* ---------- Alta / edición ---------- */
      function editor(t) {
        const editing = !!t;
        const inscDe = (cat) => editing ? inscs.filter(i => i.torneoId === t.id && i.categoria === cat) : [];

        const fNombre = h('input', { type: 'text', id: 'pr-f-nombre', value: t ? t.nombre || '' : '', placeholder: 'Copa Primavera — Fecha 4', autocomplete: 'off' });
        /* Fechas del torneo: de 1 a 3 */
        const MAXF = S.MAX_FECHAS || 3;
        const fechaRows = [];
        const fechasEl = h('div', { class: 'pr-fecha-rows' });
        const btnAddFecha = h('button', { type: 'button', class: 'btn btn-sm', onclick: () => addFecha('', true) }, '+ Agregar fecha');
        function pintarFechas() {
          fechaRows.forEach((r, k) => {
            r.n.textContent = 'Fecha ' + (k + 1);
            r.input.setAttribute('aria-label', 'Fecha ' + (k + 1));
            r.input.id = k === 0 ? 'pr-f-fecha' : 'pr-f-fecha-' + (k + 1);
            r.quitar.hidden = k === 0;
          });
          btnAddFecha.hidden = fechaRows.length >= MAXF;
        }
        function addFecha(valor, focus) {
          if (fechaRows.length >= MAXF) return;
          const r = { n: h('span', { class: 'pr-fecha-n' }), input: h('input', { type: 'date', value: valor || '' }) };
          r.quitar = h('button', { type: 'button', class: 'btn btn-ghost btn-sm', onclick: () => {
            const k = fechaRows.indexOf(r);
            if (k > 0) { fechaRows.splice(k, 1); r.el.remove(); pintarFechas(); }
          } }, 'Quitar');
          r.el = h('div', { class: 'pr-fecha-row' }, r.n, r.input, r.quitar);
          fechaRows.push(r);
          fechasEl.appendChild(r.el);
          pintarFechas();
          if (focus) r.input.focus();
        }
        const fechasIni = t ? App.fmt.fechasDe(t) : [];
        (fechasIni.length ? fechasIni : ['']).forEach(f => addFecha(f));
        const fLugar = h('input', { type: 'text', id: 'pr-f-lugar', value: t ? t.lugar || '' : '', placeholder: 'Kartódromo Municipal', autocomplete: 'off' });
        const fNotas = h('textarea', { id: 'pr-f-notas', rows: '3', placeholder: 'Horario de acreditación, reglamento, etc.' });
        fNotas.value = t ? t.notas || '' : '';

        const rows = [];
        const rowsEl = h('div', { class: 'pr-cat-rows' });
        const errEl = h('p', { class: 'pr-err', role: 'alert', hidden: true });

        function addRow(c, focus) {
          const r = { original: c && c.original ? c.original : null };
          r.nombre = h('input', { type: 'text', value: c ? c.nombre || '' : '', placeholder: 'Nombre de la categoría', 'aria-label': 'Nombre de la categoría', autocomplete: 'off' });
          r.cupo = h('input', { type: 'number', min: '0', step: '1', inputmode: 'numeric', value: c && c.cupo != null ? String(c.cupo) : '', placeholder: 'Sin cupo', 'aria-label': 'Cupo' });
          r.el = h('div', { class: 'pr-cat-row' }, r.nombre, r.cupo,
            h('button', {
              type: 'button', class: 'btn btn-ghost btn-sm', 'aria-label': 'Quitar categoría',
              onclick: () => {
                const n = r.original ? inscDe(r.original).length : 0;
                if (n) { App.toast('No podés quitar «' + r.original + '»: tiene ' + pl(n, 'competidor anotado', 'competidores anotados') + '. Movelos a otra categoría antes.', 'error'); return; }
                const k = rows.indexOf(r);
                if (k >= 0) rows.splice(k, 1);
                r.el.remove();
              },
            }, 'Quitar'));
          rows.push(r);
          rowsEl.appendChild(r.el);
          if (focus) r.nombre.focus();
        }
        const iniciales = t && t.categorias && t.categorias.length
          ? t.categorias.map(c => ({ nombre: c.nombre, cupo: c.cupo, original: c.nombre }))
          : DEFAULT_CATS;
        iniciales.forEach(c => addRow(c));

        const form = h('form', { class: 'v-proximos-modal stack', novalidate: true, onsubmit: (e) => { e.preventDefault(); guardar(); } },
          h('div', { class: 'form-grid' },
            h('div', { class: 'field full' }, h('label', { for: 'pr-f-nombre' }, 'Nombre del torneo'), fNombre),
            h('div', { class: 'field full' },
              h('span', { class: 'label' }, 'Fechas del torneo'),
              fechasEl,
              h('div', null, btnAddFecha),
              h('span', { class: 'hint' }, 'Un torneo puede tener hasta ' + MAXF + ' fechas. En cada fecha se cargan tiempos aparte.')),
            h('div', { class: 'field full' }, h('label', { for: 'pr-f-lugar' }, 'Lugar'), fLugar),
            h('div', { class: 'field full' }, h('label', { for: 'pr-f-notas' }, 'Notas'), fNotas)),
          h('div', { class: 'field' },
            h('span', { class: 'label' }, 'Categorías y cupos'),
            h('div', { class: 'pr-cat-head', 'aria-hidden': 'true' }, h('span', null, 'Categoría'), h('span', null, 'Cupo'), h('span', null, 'Quitar')),
            rowsEl,
            h('div', null, h('button', { type: 'button', class: 'btn btn-sm', onclick: () => addRow({ nombre: '', cupo: null }, true) }, '+ Agregar categoría')),
            h('span', { class: 'hint' }, 'Dejá el cupo vacío si la categoría no tiene límite.' + (editing ? ' Si cambiás el nombre de una categoría, sus competidores pasan a la nueva.' : ''))),
          errEl,
          h('button', { type: 'submit', hidden: true, tabindex: '-1' }, 'Guardar'));

        let saving = false;
        const m = App.modal({
          title: editing ? 'Editar torneo' : 'Nuevo torneo',
          content: form,
          actions: [
            { label: 'Cancelar', kind: 'ghost' },
            { label: editing ? 'Guardar cambios' : 'Crear torneo', kind: 'primary', onClick: () => guardar() },
          ],
        });

        function fail(msg, input) {
          errEl.textContent = msg;
          errEl.hidden = false;
          if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
        }

        async function guardar() {
          if (saving) return;
          errEl.hidden = true;
          form.querySelectorAll('[aria-invalid]').forEach(x => x.removeAttribute('aria-invalid'));
          const nombre = fNombre.value.trim();
          if (!nombre) return fail('Poné un nombre para el torneo.', fNombre);
          const fechas = [];
          for (const [k, r] of fechaRows.entries()) {
            const v = r.input.value;
            if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return fail(k === 0 ? 'Elegí la fecha del torneo.' : 'Elegí el día de la fecha ' + (k + 1) + ' o quitala.', r.input);
            if (fechas.length && v <= fechas[fechas.length - 1]) return fail('La fecha ' + (k + 1) + ' tiene que ser posterior a la fecha ' + k + '.', r.input);
            fechas.push(v);
          }
          const fecha = fechas[0];
          const categorias = [];
          const vistos = new Set();
          const renombres = [];
          for (const r of rows) {
            const cn = r.nombre.value.trim();
            const cv = r.cupo.value.trim();
            if (!cn && !cv) continue;
            if (!cn) return fail('Falta el nombre de una categoría.', r.nombre);
            const key = App.fmt.norm(cn);
            if (vistos.has(key)) return fail('La categoría «' + cn + '» está repetida.', r.nombre);
            vistos.add(key);
            let cupo = null;
            if (cv) {
              const n = Number(cv);
              if (!Number.isInteger(n) || n < 0) return fail('El cupo tiene que ser un número entero (o vacío).', r.cupo);
              cupo = n;
            }
            categorias.push({ nombre: cn, cupo });
            if (r.original && r.original !== cn) renombres.push([r.original, cn]);
          }
          if (!categorias.length) return fail('Agregá al menos una categoría.', rows[0] ? rows[0].nombre : null);
          if (editing) {
            for (const r of (t.categorias || [])) {
              const sigue = rows.some(x => x.original === r.nombre);
              const n = inscDe(r.nombre).length;
              if (!sigue && n) return fail('«' + r.nombre + '» tiene competidores anotados y no se puede quitar.', null);
            }
          }

          const data = Object.assign({}, t || {}, {
            nombre, fecha, fechas, lugar: fLugar.value.trim(), notas: fNotas.value.trim(), categorias,
            estado: t && t.estado ? t.estado : 'proximo',
            creado: t && t.creado ? t.creado : new Date().toISOString(),
          });
          if (!editing) delete data.id;

          saving = true;
          try {
            await S.guardarTorneo(data);
            for (const [de, a] of renombres) {
              for (const i of inscDe(de)) await S.actualizarInscripcion(i.id, { categoria: a });
            }
            m.close();
            App.toast(editing ? 'Cambios guardados' : 'Torneo creado', 'ok');
          } catch (e) {
            console.error(e);
            fail('No se pudo guardar: ' + (e && e.message || e));
          } finally {
            saving = false;
          }
        }
      }

      draw();
    },
  });
})();
