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

function mostrarError(mensaje, selector) {
  const contenedor = document.querySelector(selector);
  if (contenedor) {
    contenedor.innerHTML = '<p class="error-msg">⚠️ ' + mensaje + '</p>';
  }
}