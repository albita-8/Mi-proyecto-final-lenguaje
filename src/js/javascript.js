/**
 * @file javascript.js
 * @description Archivo JS donde creamos la API de Disney.
 * @author Alba Agüera Cuadra, Elisabet Soria Zaitseva
 */

const API_URL = "http://localhost:3000";

const ENDPOINT_GET_PELICULAS = "pelicula";
const ENDPOINT_GET_PERSONAJES = "personaje";
const ENDPOINT_GET_CANCIONES = "cancion";

const peliculas = document.querySelector(".section-peliculas");
const personajes = document.querySelector(".section-personajes");
const canciones = document.querySelector(".section-canciones");

// FORMULARIOS PELICULAS


// FORMULARIOS PERSONAJES
const form_cre_pers = document.getElementById("form-cre-pers");
const form_mod_pers = document.getElementById("form-mod-pers");
const form_del_pers = document.getElementById("form-del-pers");

// FORMULARIOS CANCIONES
const form_cre_canc = document.getElementById("form-cre-canc");
const form_mod_canc = document.getElementById("form-mod-canc");
const form_del_canc = document.getElementById("form-del-canc");

document.addEventListener("DOMContentLoaded", function () {

  if (peliculas) { obtenerPeliculas(); }
  if (personajes) { obtenerPersonajes(); }
  if (canciones) { obtenerCanciones(); }

  const form_cre_peli = document.getElementById("form-cre-peli");
  const form_mod_peli = document.getElementById("form-mod-peli");
  const form_del_peli = document.getElementById("form-del-peli");

  if (form_cre_peli) { crearPelicula(); }
  if (form_mod_peli) {
     form_mod_peli.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const nom_peli = document.getElementById("mod-NomPel").value.trim();
      const form_datos = new FormData(form_mod_peli);
      modificarPelicula(nom_peli, form_datos);
    });
  }
  if (form_del_peli) {
    form_del_peli.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const nom_peli = document.getElementById("del-NomPel").value;
      eliminarPelicula(nom_peli);
    });
  }
});


// FETCH DE PELICULAS
function obtenerPeliculas() {
  fetch(API_URL + "/pelicula")
    .then(respuesta => respuesta.json())
    .then(peliculas => cargarPeliculas(peliculas))
    .catch(error => console.error("Error al cargar películas:", error));
}

// PROYECTA PELICULAS
function cargarPeliculas(peliculas) {
  const seccion_peli = document.querySelector(".section-peliculas");
  if (!seccion_peli) return;

  const card_peli = seccion_peli.querySelector(".card-pelicula");
  if (!card_peli) return;

  seccion_peli.innerHTML = "";

  peliculas.forEach(p => {
    const card = card_peli.cloneNode(true);

    card.querySelector(".card-img img").src = p.ImgPel !== "Sin imagen" ? p.ImgPel : "";
    card.querySelector(".card-img img").alt = p.NomPel;
    card.querySelector(".card-ano").textContent = p.AnoPel ? new Date(p.AnoPel).getFullYear() : "—";
    card.querySelector(".card-gen").textContent = p.GenPel;
    card.querySelector(".card-tit").textContent = p.NomPel;
    card.querySelector(".card-sinop").textContent = p.SinPel;
    card.querySelector(".card-min span").textContent = p.MinPel;

    seccion_peli.appendChild(card);
  });
}

// POST: Crear una nueva película
function crearPelicula() {
  const formulario = document.getElementById("form-cre-peli");

  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const datosForm = new FormData(formulario);

    fetch(`${API_URL}/pelicula`, {
      method: "POST",
      body: datosForm
    })
      .then(respuesta => respuesta.json())
      .then(resultado => {
        console.log("Película creada:", resultado);
        alert("¡Película creada correctamente!");
        formulario.reset();
      })
      .catch(error => {
        console.error("Error al crear la película:", error);
        alert("Hubo un error al crear la película.");
      });
  });
}

// PUT: Modificar una película existente por su ID
function modificarPelicula(nombre, form_datos) {

  fetch(`${API_URL}/pelicula/${encodeURIComponent(nombre)}`, {
    method: "PUT",
    body: form_datos
  })
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la película. Verifica si el nombre existe.");
      }
      return respuesta.json();
    })
    .then(resultado => {
      console.log("Película modificada:", resultado);
      alert("¡La película se ha modificado correctamente!");
      document.getElementById("form-mod-peli").reset();
    })
    .catch(error => {
      console.error("Error al modificar la película:", error);
      alert("No se encontró ninguna película con ese nombre o hubo un error en el servidor.");
    });
}

// DELETE: Eliminar una película por su ID
function eliminarPelicula(nom_peli) {

  const eliminar = confirm(`¿Estás seguro de que deseas borrar la película "${nom_peli}"? Esta acción no se puede deshacer.`);

  // 2. Si el usuario cancela, salimos de la función
  if (!eliminar) {
    console.log("Borrado cancelado por el usuario.");
    return;
  }

  fetch(`${API_URL}/pelicula/${encodeURIComponent(nom_peli)}`, {
    method: "DELETE"
  })
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la película.");
      }
      return respuesta.json();
    })
    .then(resultado => {
      console.log("Película eliminada:", resultado);
      alert("Película eliminada correctamente");
    })
    .catch(error => {
      console.error("Error al eliminar la película:", error);
      alert("Ocurrió un error al intentar borrar la película.");
    });
}

// FETCH DE PERSONAJES
function cargarPersonajes() {
  fetch(API_URL + "/personaje")
    .then(respuesta => respuesta.json())
    .then(personajes => cargarPersonajes(personajes))
    .catch(error => console.error("Error al cargar personajes:", error));
}

// PROYECTAR PERSONAJES
function cargarPersonajes(personajes) {
  const seccion_personaje = document.querySelector(".section-personajes");
  if (!seccion_personaje) return;

  const card_personaje = seccion_personaje.querySelector(".card-personaje");
  if (!card_personaje) return;

  const plantilla = card_personaje.cloneNode(true);
  seccion_personaje.innerHTML = "";

  personajes.forEach(per => {
    const card = plantilla.cloneNode(true);

    card.querySelector(".per-img").src = per.ImgPer !== "Sin imagen" ? per.ImgPer : "";
    card.querySelector(".per-img").alt = per.NomPer;
    card.querySelector(".per-nombre").textContent = per.NomPer;
    card.querySelector(".per-tipo").textContent = per.TipPer;
    card.querySelector(".per-especie").textContent = per.EspPer;
    card.querySelector(".per-reino").textContent = per.Reino;
    card.querySelector(".per-desc").textContent = per.DesPer;

    seccion_personaje.appendChild(card);
  });
}
// POST: Crear un nuevo personaje
function crearPersonaje(datos) {
  fetch(`${API_URL}/personaje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Personaje creado:", resultado))
    .catch(error => console.error("Error al crear el personaje:", error));
}

// PUT: Modificar un personaje existente por su ID
function modificarPersonaje(id, datos) {
  fetch(`${API_URL}/personaje/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Personaje modificado:", resultado))
    .catch(error => console.error("Error al modificar el personaje:", error));
}

// DELETE: Eliminar un personaje por su ID
function eliminarPersonaje(id) {
  fetch(`${API_URL}/personaje/${id}`, {
    method: "DELETE"
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Personaje eliminado:", resultado))
    .catch(error => console.error("Error al eliminar el personaje:", error));
}

// GET: Obtener todas las canciones
function obtenerCanciones() {
  fetch(`${API_URL}/cancion`, {
    method: "GET"
  })
    .then(respuesta => respuesta.json())
    .then(canciones => {
      console.log("Lista de canciones:", canciones);
      // Aquí puedes llamar a una función para renderizar las canciones en el HTML
    })
    .catch(error => console.error("Error al obtener las canciones:", error));
}

// POST: Crear una nueva canción
function crearCancion(datos) {
  fetch(`${API_URL}/cancion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Canción creada:", resultado))
    .catch(error => console.error("Error al crear la canción:", error));
}

// PUT: Modificar una canción existente por su ID
function modificarCancion(id, datos) {
  fetch(`${API_URL}/cancion/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Canción modificada:", resultado))
    .catch(error => console.error("Error al modificar la canción:", error));
}

// DELETE: Eliminar una canción por su ID
function eliminarCancion(id) {
  fetch(`${API_URL}/cancion/${id}`, {
    method: "DELETE"
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Canción eliminada:", resultado))
    .catch(error => console.error("Error al eliminar la canción:", error));
}