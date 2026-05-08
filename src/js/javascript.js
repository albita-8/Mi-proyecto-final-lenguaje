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

document.addEventListener("DOMContentLoaded", function() {
  cargarPeliculas();
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
      //  Es una forma de guardar las películas en una variable global para poder acceder a ellas desde cualquier parte del código.
      window._peliculas = peliculas;
      renderizarPeliculas(peliculas);
    })
    .catch(error => {
      mostrarError(error.message);
    });
}

function renderizarPeliculas(peliculas) {
  gridPeli.innerHTML = "";
  count_pelis.textContent = peliculas.length + " película" + (peliculas.length !== 1 ? "s" : "");
 
  if (peliculas.length === 0) {
    gridPeli.innerHTML = '<p class="sin-resultados">No se encontraron películas.</p>';
    return;
  }
 
  peliculas.forEach(function(peli, i) {
    const año = peli.AnoPel ? new Date(peli.AnoPel).getFullYear() : "—";
 
    const imagenHTML = peli.ImgPel && peli.ImgPel !== "Sin imagen"
      ? '<img src="' + peli.ImgPel + '" alt="' + peli.NomPel + '" onerror="this.parentElement.innerHTML=\'<div class=\\\'card-img-placeholder\\\'>🎬</div>\'">'
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

function mostrarError(mensaje) {
  gridPeli.innerHTML =
    '<div class="error-msg">' +
      '<p>⚠️ No se pudo conectar con la API.</p>' +
      '<p>' + mensaje + '</p><br/>' +
      '<p>Asegúrate de que el servidor está corriendo en <strong>http://localhost:3000</strong></p>' +
    '</div>';
}
