/**
 * @file javascript.js
 * @description Archivo JS donde creamos la API de Disney.
 * @author Alba Agüera Cuadra, Elisabet Soria Zaitseva
 */



// /** URL base de la API */
// const API = 'http://localhost:3000/api';

// /** @type {Array} Almacena todos los personajes cargados */
// let todosPersonajes = [];

// /** @type {Array} Almacena todas las películas cargadas */
// let todasPeliculas  = [];

// /** @type {Array} Almacena todos los reinos cargados */
// let todosReinos     = [];

// // ════════════════════════════════════════════════════════════════════════════
// // INICIALIZACIÓN
// // ════════════════════════════════════════════════════════════════════════════

// document.addEventListener('DOMContentLoaded', () => {
//   inicializarTabs();
//   cargarPersonajes();
//   cargarPeliculas();
//   cargarReinos();

//   // Búsqueda en tiempo real y con Enter
//   document.getElementById('search-personajes').addEventListener('input', filtrarPersonajes);
//   document.getElementById('search-personajes').addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') filtrarPersonajes();
//   });

//   // Botón buscar
//   document.getElementById('btn-buscar').addEventListener('click', filtrarPersonajes);

//   // Cerrar modal al hacer clic fuera
//   document.getElementById('modal-overlay').addEventListener('click', (e) => {
//     if (e.target === document.getElementById('modal-overlay')) cerrarModal();
//   });

//   // Botón cerrar modal
//   document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
// });

// // ════════════════════════════════════════════════════════════════════════════
// // TABS — Navegación entre secciones
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function inicializarTabs
//  * @description Asigna los eventos click a los botones de navegación por tabs.
//  */
// function inicializarTabs() {
//   document.querySelectorAll('.tab').forEach((tab) => {
//     tab.addEventListener('click', () => {
//       document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
//       tab.classList.add('active');

//       const seccion = tab.dataset.section;
//       ['personajes', 'peliculas', 'reinos'].forEach((s) => {
//         document.getElementById('sec-' + s).style.display = s === seccion ? '' : 'none';
//       });
//     });
//   });
// }

// // ════════════════════════════════════════════════════════════════════════════
// // PERSONAJES
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function cargarPersonajes
//  * @description Obtiene todos los personajes de la API y los renderiza.
//  */
// function cargarPersonajes() {
//   fetch(API + '/personajes')
//     .then((res) => {
//       if (!res.ok) throw new Error('Error ' + res.status);
//       return res.json();
//     })
//     .then((datos) => {
//       todosPersonajes = datos;
//       renderPersonajes(todosPersonajes);
//     })
//     .catch((err) => {
//       document.getElementById('grid-personajes').innerHTML =
//         '<div class="status error-msg">⚠️ No se pudo conectar con la API.<br><small>' + err.message + '</small></div>';
//     });
// }

// /**
//  * @function renderPersonajes
//  * @description Pinta las tarjetas de personajes en el grid.
//  * @param {Array} lista - Array de personajes a mostrar.
//  */
// function renderPersonajes(lista) {
//   const grid  = document.getElementById('grid-personajes');
//   const count = document.getElementById('count-personajes');

//   count.innerHTML = 'Mostrando <span>' + lista.length + '</span> personaje' + (lista.length !== 1 ? 's' : '');

//   if (!lista.length) {
//     grid.innerHTML = '<div class="status">No se encontraron personajes.</div>';
//     return;
//   }

//   grid.innerHTML = lista.map((p, i) => {
//     const badge = obtenerBadge(p.TipPer);
//     const emoji = obtenerEmoji(p.TipPer);
//     return (
//       '<article class="card" style="animation-delay:' + (i * 0.04) + 's" data-id="' + p.CodPer + '">' +
//         '<div class="card-img">' + emoji + '</div>' +
//         '<div class="card-body">' +
//           '<div class="card-name">' + p.NomPer + '</div>' +
//           '<div class="card-tipo">' + p.EspPer + ' · ' + p.GenPer + '</div>' +
//           '<span class="badge ' + badge.clase + '">' + badge.texto + '</span>' +
//         '</div>' +
//       '</article>'
//     );
//   }).join('');

//   // Evento click en cada tarjeta
//   document.querySelectorAll('.card[data-id]').forEach((card) => {
//     card.addEventListener('click', () => {
//       verPersonaje(card.dataset.id);
//     });
//   });
// }

// /**
//  * @function filtrarPersonajes
//  * @description Filtra el listado de personajes según el texto del buscador.
//  */
// function filtrarPersonajes() {
//   const q = document.getElementById('search-personajes').value.toLowerCase();
//   const filtrados = todosPersonajes.filter((p) =>
//     p.NomPer.toLowerCase().includes(q) ||
//     p.TipPer.toLowerCase().includes(q) ||
//     p.EspPer.toLowerCase().includes(q)
//   );
//   renderPersonajes(filtrados);
// }

// /**
//  * @function verPersonaje
//  * @description Abre el modal con el detalle de un personaje concreto.
//  * @param {number|string} id - ID del personaje.
//  */
// function verPersonaje(id) {
//   document.getElementById('modal-title').textContent = 'Cargando...';
//   document.getElementById('modal-body').innerHTML = '<div class="status"><div class="spinner"></div></div>';
//   document.getElementById('modal-overlay').classList.add('open');

//   fetch(API + '/personajes/' + id)
//     .then((res) => {
//       if (!res.ok) throw new Error('Error ' + res.status);
//       return res.json();
//     })
//     .then((p) => {
//       document.getElementById('modal-title').textContent = p.NomPer;
//       const peliculas = p.Peliculas && p.Peliculas.length
//         ? p.Peliculas.map((pel) => pel.NomPel).join(', ')
//         : 'Sin asignar';

//       document.getElementById('modal-body').innerHTML =
//         '<div class="modal-row"><label>Alias</label><p>'             + (p.AliPer || '—')  + '</p></div>' +
//         '<div class="modal-row"><label>Tipo</label><p>'              + p.TipPer            + '</p></div>' +
//         '<div class="modal-row"><label>Especie</label><p>'           + p.EspPer            + '</p></div>' +
//         '<div class="modal-row"><label>Género</label><p>'            + p.GenPer            + '</p></div>' +
//         '<div class="modal-row"><label>Reino</label><p>'             + p.Reino             + '</p></div>' +
//         '<div class="modal-row"><label>Películas</label><p>'         + peliculas           + '</p></div>' +
//         '<div class="modal-row"><label>Fecha de nacimiento</label><p>' + p.FNacPer         + '</p></div>' +
//         '<div class="modal-row"><label>Descripción</label><p>'       + p.DesPer            + '</p></div>';
//     })
//     .catch(() => {
//       document.getElementById('modal-body').innerHTML = '<p class="error-msg">Error al cargar el personaje.</p>';
//     });
// }

// // ════════════════════════════════════════════════════════════════════════════
// // PELÍCULAS
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function cargarPeliculas
//  * @description Obtiene todas las películas de la API y las renderiza.
//  */
// function cargarPeliculas() {
//   fetch(API + '/peliculas')
//     .then((res) => {
//       if (!res.ok) throw new Error('Error ' + res.status);
//       return res.json();
//     })
//     .then((datos) => {
//       todasPeliculas = datos;
//       renderPeliculas(todasPeliculas);
//     })
//     .catch((err) => {
//       document.getElementById('list-peliculas').innerHTML =
//         '<div class="status error-msg">⚠️ No se pudo conectar con la API.<br><small>' + err.message + '</small></div>';
//     });
// }

// /**
//  * @function renderPeliculas
//  * @description Pinta el listado de películas.
//  * @param {Array} lista - Array de películas a mostrar.
//  */
// function renderPeliculas(lista) {
//   document.getElementById('count-peliculas').innerHTML =
//     'Mostrando <span>' + lista.length + '</span> película' + (lista.length !== 1 ? 's' : '');

//   document.getElementById('list-peliculas').innerHTML = lista.map((p, i) =>
//     '<div class="list-item" style="animation-delay:' + (i * 0.04) + 's">' +
//       '<h3>🎬 ' + p.NomPel + '</h3>' +
//       '<p>' + p.SinPel + '</p>' +
//       '<p class="meta">🎭 ' + p.GenPel + ' &nbsp;·&nbsp; ⏱ ' + p.MinPel + ' min &nbsp;·&nbsp; 📅 ' + new Date(p.AnoPel).getFullYear() + '</p>' +
//     '</div>'
//   ).join('');
// }

// // ════════════════════════════════════════════════════════════════════════════
// // REINOS
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function cargarReinos
//  * @description Obtiene todos los reinos de la API y los renderiza.
//  */
// function cargarReinos() {
//   fetch(API + '/reinos')
//     .then((res) => {
//       if (!res.ok) throw new Error('Error ' + res.status);
//       return res.json();
//     })
//     .then((datos) => {
//       todosReinos = datos;
//       renderReinos(todosReinos);
//     })
//     .catch((err) => {
//       document.getElementById('list-reinos').innerHTML =
//         '<div class="status error-msg">⚠️ No se pudo conectar con la API.<br><small>' + err.message + '</small></div>';
//     });
// }

// /**
//  * @function renderReinos
//  * @description Pinta el listado de reinos.
//  * @param {Array} lista - Array de reinos a mostrar.
//  */
// function renderReinos(lista) {
//   document.getElementById('count-reinos').innerHTML =
//     'Mostrando <span>' + lista.length + '</span> reino' + (lista.length !== 1 ? 's' : '');

//   document.getElementById('list-reinos').innerHTML = lista.map((r, i) =>
//     '<div class="list-item" style="animation-delay:' + (i * 0.04) + 's">' +
//       '<h3>🗺️ ' + r.NomRei + '</h3>' +
//       '<p>' + r.DesRei + '</p>' +
//       '<p class="meta">📍 ' + r.UbiRei + ' &nbsp;·&nbsp; 🕰 ' + r.AnoRei + '</p>' +
//     '</div>'
//   ).join('');
// }

// // ════════════════════════════════════════════════════════════════════════════
// // MODAL
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function cerrarModal
//  * @description Cierra el modal de detalle de personaje.
//  */
// function cerrarModal() {
//   document.getElementById('modal-overlay').classList.remove('open');
// }

// // ════════════════════════════════════════════════════════════════════════════
// // HELPERS
// // ════════════════════════════════════════════════════════════════════════════

// /**
//  * @function obtenerBadge
//  * @description Devuelve la clase CSS y el texto del badge según el tipo de personaje.
//  * @param {string} tipo - Tipo del personaje.
//  * @returns {{ clase: string, texto: string }}
//  */
// function obtenerBadge(tipo) {
//   const t = tipo.toLowerCase();
//   if (t.includes('protagonista')) return { clase: 'badge-protagonista', texto: 'Protagonista' };
//   if (t.includes('villano'))      return { clase: 'badge-villano',      texto: 'Villano' };
//   return { clase: 'badge-secundario', texto: 'Secundario' };
// }

// /**
//  * @function obtenerEmoji
//  * @description Devuelve el emoji de la tarjeta según el tipo de personaje.
//  * @param {string} tipo - Tipo del personaje.
//  * @returns {string}
//  */
// function obtenerEmoji(tipo) {
//   const t = tipo.toLowerCase();
//   if (t.includes('protagonista')) return '⭐';
//   if (t.includes('villano'))      return '💀';
//   return '🌟';
// }