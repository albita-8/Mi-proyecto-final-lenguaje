/**
 * @file javascript.js
 * @description Archivo JS donde creamos la API de Disney.
 * @author Alba Agüera Cuadra, Elisabet Soria Zaitseva
 */

const API_URL = "http://localhost:3000";

const ENDPOINT_GET_PELICULAS = "peliculas";
const ENDPOINT_GET_PERSONAJES = "personajes";
const ENDPOINT_GET_CANCIONES = "canciones";

const gridPeli  = document.querySelector(".grid-elemento-peli");
const buscador_peli  = document.querySelector(".buscador-peli");
const filtroGen = document.querySelector(".filtro-pelis");
const count_pelis  = document.querySelector(".count-pelis");
const gridCancion = document.querySelector(".canciones-grid");

document.addEventListener("DOMContentLoaded", function() {
  if (gridPeli) {
    cargarPeliculas();
  }

  if (gridCancion) {
    cargarCanciones();
  }
});

function cargarPeliculas() {
  fetch(API_URL + "/pelicula")
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("Habido un error en el servidor: " + respuesta.status);
      }
      return respuesta.json();
    })
    .then(peliculas => {
      window._peliculas = peliculas;
      renderizarPeliculas(peliculas);
    })
    .catch(error => {
      mostrarError(error.message, ".grid-elemento-peli");
    });
}

function renderizarPeliculas(peliculas) {
  if (!gridPeli) return;
  gridPeli.innerHTML = "";

  if (peliculas.length === 0) {
    gridPeli.innerHTML = '<p class="sin-resultados">No se encontraron películas.</p>';
    return;
  }

  peliculas.forEach(function(peli, i) {
    const año = peli.AnoPel ? peli.AnoPel : "—";
    const imagenHTML = peli.ImgPel && peli.ImgPel !== "Sin imagen"
      ? '<img src="' + peli.ImgPel + '" alt="' + peli.NomPel + '">'
      : '<div class="card-img-placeholder">🎬</div>';

    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = (i * 50) + "ms";

    card.innerHTML =
      '<div class="card-img">' +
        imagenHTML +
        '<span class="card-year">' + año + '</span>' +
      '</div>' +
      '<div class="card-elemento">' +
        '<span class="card-gen">' + peli.GenPel + '</span>' +
        '<h2 class="card-tit">' + peli.NomPel + '</h2>' +
        '<p class="card-sinopsis">' + peli.SinPel + '</p>' +
      '</div>' +
      '<div class="card-footer">' +
        '<span class="card-min"><strong>' + peli.MinPel + '</strong> min</span>' +
      '</div>';
    gridPeli.appendChild(card);
  });
}

// === FUNCIONES PARA CANCIONES (AÑADIDAS SIN MODIFICAR LO ANTERIOR) ===

function cargarCanciones() {
  fetch(API_URL + "/cancion")
    .then(res => {
      if (!res.ok) throw new Error("Error en la respuesta de la API: " + res.status);
      return res.json();
    })
    .then(canciones => {
      renderizarCanciones(canciones);
    })
    .catch(error => {
      if (gridCancion) {
        gridCancion.innerHTML = '<p class="error-msg">Error cargando canciones: ' + error.message + '</p>';
      }
    });
}

function renderizarCanciones(canciones) {
  if (!gridCancion) return;
  gridCancion.innerHTML = "";
  
  if (canciones.length === 0) {
    gridCancion.innerHTML = '<p class="sin-resultados">No hay canciones disponibles.</p>';
    return;
  }

  canciones.forEach(can => {
    const card = document.createElement("article");
    card.className = "cancion-card";
    card.innerHTML = `
      <div class="cancion-info">
        <p class="cancion-nombre">🎶 ${can.NomCan}</p>
        <p class="cancion-desc">Disponible en el catálogo mágico.</p>
      </div>
    `;
    gridCancion.appendChild(card);
  });
}

// ── POST: Crear nueva canción ──────────────────────────────
function crearCancion() {
  const nombre = document.getElementById("cancionNombre").value.trim();
 
  if (!nombre) {
    mostrarMsgCrud("Por favor, escribe el nombre de la canción.", "error");
    return;
  }
 
  fetch(API_URL + "/cancion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ NomCan: nombre })
  })
    .then(res => res.json())
    .then(data => {
      mostrarMsgCrud((data.mensaje || "Canción creada correctamente."), "ok");
      limpiarFormulario();
      cargarCanciones();
    })
    .catch(err => {
      mostrarMsgCrud("Error al crear la canción: " + err.message, "error");
    });
}
 
// ── PUT: Modificar canción existente ───────────────────────
function editarCancion() {
  const nombreActual = document.getElementById("cancionNombreActual").value.trim();
  const nombreNuevo  = document.getElementById("cancionNombre").value.trim();
 
  if (!nombreActual) {
    mostrarMsgCrud("Escribe el nombre actual de la canción que quieres modificar.", "error");
    return;
  }
 
  if (!nombreNuevo) {
    mostrarMsgCrud("Escribe el nuevo nombre que quieres poner.", "error");
    return;
  }
 
  fetch(API_URL + "/cancion")
    .then(res => res.json())
    .then(canciones => {
      const encontrada = canciones.find(
        c => c.NomCan.toLowerCase() === nombreActual.toLowerCase()
      );
 
      if (!encontrada) {
        mostrarMsgCrud('No se encontró ninguna canción con el nombre "' + nombreActual + '".', "error");
        return;
      }
 
      _fetchPut(encontrada.CodCan, nombreNuevo);
    })
    .catch(err => {
      mostrarMsgCrud("Error al buscar la canción: " + err.message, "error");
    });
}

function _fetchPut(id, nombreNuevo) {
  fetch(API_URL + "/cancion/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ NomCan: nombreNuevo })
  })
    .then(res => res.json())
    .then(data => {
      mostrarMsgCrud((data.mensaje || "Canción modificada correctamente."), "ok");
      limpiarFormulario();
      cargarCanciones();
    })
    .catch(err => {
      mostrarMsgCrud("Error al modificar la canción: " + err.message, "error");
    });
}
 
// ── DELETE: Eliminar canción (desde formulario) ────────────
function eliminarCancion() {
  const nombre = document.getElementById("cancionNombre").value.trim();
 
  if (!nombre) {
    mostrarMsgCrud("Escribe el nombre de la canción que quieres eliminar.", "error");
    return;
  }
 
  // Busca la canción por nombre en la lista ya cargada
  fetch(API_URL + "/cancion")
    .then(res => res.json())
    .then(canciones => {
      const encontrada = canciones.find(
        c => c.NomCan.toLowerCase() === nombre.toLowerCase()
      );
 
      if (!encontrada) {
        mostrarMsgCrud('No se encontró ninguna canción con el nombre "' + nombre + '".', "error");
        return;
      }
 
      if (!confirm('¿Eliminar la canción "' + encontrada.NomCan + '"?')) return;
 
      _fetchDelete(encontrada.CodCan);
    })
    .catch(err => {
      mostrarMsgCrud("Error al buscar la canción: " + err.message, "error");
    });
}
 
/** Eliminar directamente desde la tarjeta del grid */
function eliminarCancionDirecta(id, nombre) {
  if (!confirm('¿Eliminar la canción "' + nombre + '"?')) return;
  _fetchDelete(id);
}
 
/** Función interna compartida para el DELETE */
function _fetchDelete(id) {
  fetch(API_URL + "/cancion/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
      mostrarMsgCrud((data.mensaje || "Canción eliminada correctamente."), "ok");
      limpiarFormulario();
      cargarCanciones();
    })
    .catch(err => {
      mostrarMsgCrud("Error al eliminar la canción: " + err.message, "error");
    });
}
 
// ── Helpers del formulario ─────────────────────────────────
 
/** Rellena el formulario con los datos de una canción para editarla */
function cargarEnFormulario(id, nombre) {
  document.getElementById("cancionId").value     = id;
  document.getElementById("cancionNombre").value = nombre;
  mostrarMsgCrud("Canción cargada. Modifica el nombre y pulsa Modificar.", "ok");
  document.getElementById("cancionNombre").focus();
}
 
/** Vacía el formulario y el mensaje de estado */
function limpiarFormulario() {
  document.getElementById("cancionId").value     = "";
  document.getElementById("cancionNombre").value = "";
  const msg = document.getElementById("crudMsg");
  if (msg) { msg.className = "crud-msg"; msg.textContent = ""; }
}
 
/** Muestra un mensaje de resultado en el formulario */
function mostrarMsgCrud(texto, tipo) {
  const msg = document.getElementById("crudMsg");
  if (!msg) return;
  msg.textContent = texto;
  msg.className   = "crud-msg " + tipo;
}

function mostrarError(mensaje, selector) {
  const contenedor = document.querySelector(selector);
  if (contenedor) {
    contenedor.innerHTML = '<p class="error-msg">⚠️ ' + mensaje + '</p>';
  }
}