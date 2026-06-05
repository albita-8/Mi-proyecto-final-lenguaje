/**
 * @file javascript.js
 * @description Archivo JS donde creamos la API de Disney.
 * @author Alba Agüera Cuadra, Elisabet Soria Zaitseva
 */

const API_URL = "http://localhost:3000";

let plantillaCancion = null;
const peliculas = document.querySelector(".section-peliculas");
const personajes = document.querySelector(".section-personajes");
const canciones = document.querySelector(".section-canciones");

// FORMULARIOS PELICULAS
const form_cre_peli = document.getElementById("form-cre-peli");
const form_mod_peli = document.getElementById("form-mod-peli");
const form_del_peli = document.getElementById("form-del-peli");

// FORMULARIOS PERSONAJES
const form_cre_pers = document.getElementById("form-cre-pers");
const form_mod_pers = document.getElementById("form-mod-pers");
const form_del_pers = document.getElementById("form-del-pers");

// FORMULARIOS CANCIONES
const btn_crear_can = document.getElementById("btn-crear-can");
const btn_modificar_can = document.getElementById("btn-modificar-can");
const btn_eliminar_can = document.getElementById("btn-eliminar-can");

document.addEventListener("DOMContentLoaded", function () {

  if (peliculas) { obtenerPeliculas(); buscarPelicula(); }
  if (personajes) { obtenerPersonajes(); buscarPersonaje(); }
  if (canciones) { obtenerCanciones(); }

  // PELICULAS -------------------------------------------------
  if (form_cre_peli) { crearPelicula(); }
  if (form_mod_peli) { modificarPelicula(); }
  if (form_del_peli) { eliminarPelicula(); }

  // PERSONAJES ----------------------------------------------------
  if (form_cre_pers) { crearPersonaje(); }
  if (form_mod_pers) { modificarPersonaje(); }
  if (form_del_pers) { eliminarPersonaje(); }

    if (btn_crear_can) { crearCancion(); }
  if (btn_modificar_can) { modificarCancion(); }
  if (btn_eliminar_can) { eliminarCancion(); }
});


// FETCH DE PELICULAS
function obtenerPeliculas() {
  fetch(`${API_URL}/pelicula`)
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
function modificarPelicula() {

  const formulario = document.getElementById("form-mod-peli");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    
    const nom_peli = document.getElementById("mod-NomPel").value.trim();
    const form_datos = new FormData(formulario);

    fetch(`${API_URL}/pelicula/${encodeURIComponent(nom_peli)}`, {
      method: "PUT",
      body: form_datos
    })
      .then(respuesta => {
        if (!respuesta.ok) throw new Error("No se pudo actualizar la película.");
        return respuesta.json();
      })
      .then(resultado => {
        console.log("Película modificada:", resultado);
        alert("¡La película se ha modificado correctamente!");
        formulario.reset();
      })
      .catch(error => {
        console.error("Error al modificar la película:", error);
        alert("No se encontró ninguna película con ese nombre.");
      });
  });
}

// DELETE: Eliminar una película por su nombre
function eliminarPelicula() {

  const formulario = document.getElementById("form-del-peli");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    
    const nom_peli = document.getElementById("del-NomPel").value.trim();
    const eliminar = confirm(`¿Estás seguro de que deseas borrar la película "${nom_peli}"? Esta acción no se puede deshacer.`);

    if (!eliminar) return;

    fetch(`${API_URL}/pelicula/${encodeURIComponent(nom_peli)}`, {
      method: "DELETE"
    })
      .then(respuesta => {
        if (!respuesta.ok) throw new Error("No se pudo eliminar la película.");
        return respuesta.json();
      })
      .then(resultado => {
        console.log("Película eliminada:", resultado);
        alert("Película eliminada correctamente");
        formulario.reset();
      })
      .catch(error => {
        console.error("Error al eliminar la película:", error);
        alert("Ocurrió un error al intentar borrar la película.");
      });
  });
}
// Buscador de peliculas
function buscarPelicula() {
  const intro = document.getElementById("search-pel");
  if (!intro) return;

  intro.addEventListener("intro", function () {
    const busqueda = intro.value.trim();

    const url = busqueda
      ? `${API_URL}/pelicula?nombre=${encodeURIComponent(busqueda)}`
      : `${API_URL}/pelicula`;

    fetch(url)
      .then(respuesta => {
        if (!respuesta.ok) throw new Error("Error en la búsqueda de películas.");
        return respuesta.json();
      })
      .then(peliculas => {
        if (peliculas.length === 0) {
          mostrarMensajeVacio(".section-peliculas", "No se encontró ninguna película con ese nombre.");
        } else {
          cargarPeliculas(peliculas);
        }
      })
      .catch(error => console.error("Error al buscar película:", error));
  });
}

function cargarReinosDesplegable(selectCod) {
    const selectReino = document.querySelector(selectCod);

    if (!selectReino) return;

    fetch(`${API_URL}/api/reinos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor al cargar reinos');
            }
            return response.json();
        })
        .then(reinos => {

            selectReino.innerHTML = '<option value="">-- Selecciona un reino --</option>';

            reinos.forEach(reino => {
                const option = document.createElement('option');
                option.value = reino.CodRei;      
                option.textContent = reino.NomRei;
                selectReino.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de reinos:', error);
        });
}

// FETCH DE PERSONAJES
function obtenerPersonajes() {
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
function crearPersonaje() {

  cargarReinosDesplegable('.cre-NomRei');

  const formulario = document.getElementById("form-cre-pers");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const datosForm = new FormData(formulario);

    fetch(`${API_URL}/personaje`, {
      method: "POST",
      body: datosForm
    })
      .then(respuesta => respuesta.json())
      .then(resultado => {
        console.log("Personaje creado:", resultado);
        alert("¡Personaje creado con éxito!");
        formulario.reset();
      })
      .catch(error => console.error("Error al crear el personaje:", error));
  });
}

// PUT: Modificar un personaje existente por su ID
function modificarPersonaje() {

  cargarReinosDesplegable('.mod-NomRei');

 const formulario = document.getElementById("form-mod-pers");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("mod-NomPer").value.trim();
    if (!nombre) {
      alert("Debes ingresar el nombre del personaje que deseas modificar.");
      return;
    }

    const form_datos = new FormData(formulario);

    fetch(`${API_URL}/personaje/${encodeURIComponent(nombre)}`, {
      method: "PUT",
      body: form_datos 
    })
      .then(respuesta => {
        if (!respuesta.ok) {
          return respuesta.json().then(err => { 
            throw new Error(err.mensaje || "Error al actualizar el personaje."); 
          });
        }
        return respuesta.json();
      })
      .then(resultado => {
        console.log("Resultado de la actualización:", resultado);
        alert(resultado.mensaje || "¡Personaje modificado correctamente!");
        formulario.reset();
      })
      .catch(error => {
        console.error("Error en la petición PUT:", error);
        alert("No se ha podido modificar el personaje");
      });
  });
}

// DELETE: Eliminar un personaje por su ID
function eliminarPersonaje() {
  const formulario = document.getElementById("form-del-pers");
  
  if (!formulario) return;

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputNombre = document.getElementById("del-NomPer");
    
    if (inputNombre && inputNombre.value.trim() !== "") {
      const nombrePers = inputNombre.value.trim();
      
      const confirmacion = confirm(`¿Estás seguro de que deseas borrar permanentemente al personaje "${nombrePers}"? Esta acción no se puede deshacer.`);
      

      if (!confirmacion) return;
      
      fetch(`${API_URL}/personaje/${encodeURIComponent(nombrePers)}`, {
        method: "DELETE"
      })
        .then(respuesta => respuesta.json())
        .then(resultado => {
          alert(resultado.mensaje);
          formulario.reset(); 
        })
        .catch(error => {
          console.error("Error al eliminar el personaje:", error);
          alert("Hubo un problema al intentar eliminar el personaje.");
        });
    } else {
      alert("Por favor, introduce el nombre del personaje que deseas eliminar.");
    }
  });
}

// GET: Obtener todas las canciones
function obtenerCanciones() {
  fetch(`${API_URL}/cancion`)
    .then(respuesta => respuesta.json())
    .then(canciones => cargarCanciones(canciones))
    .catch(error => console.error("Error al obtener las canciones:", error));
}

function cargarCanciones(listaCanciones) {
  const seccion = document.querySelector(".section-canciones");
  if (!seccion) return;

  const cardOriginal = seccion.querySelector(".card-canciones");

  if (cardOriginal && !plantillaCancion) {
    plantillaCancion = cardOriginal.cloneNode(true);
  }

  // Limpiamos la sección y ponemos un título
  seccion.innerHTML = "<h2>Lista de Canciones</h2>";

  listaCanciones.forEach(c => {
    const card = plantillaCancion.cloneNode(true);
    card.querySelector(".card-nom").textContent = c.NomCan;

    // TRUCO MÁGICO: Al hacer clic en la canción, auto-rellenamos el formulario
    card.addEventListener("click", () => {
      document.querySelector(".NomCan").value = c.NomCan;
      document.querySelector(".CodCan").value = c.CodCan; // Guardamos su ID para poder borrar/modificar
    });

    seccion.appendChild(card);
  });
}

// POST: Crear una nueva canción
function crearCancion() {
  const btn = document.getElementById("btn-crear-can");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const inputNueva = document.querySelector(".NomCan-new");
    const nomCanNuevo = inputNueva ? inputNueva.value.trim() : "";

    if (!nomCanNuevo) {
      alert("Por favor, introduce el nombre en 'Canción NUEVA' para crearla.");
      return;
    }

    fetch(`${API_URL}/cancion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NomCan: nomCanNuevo })
    })
      .then(respuesta => respuesta.json())
      .then(resultado => {
        alert("¡Canción creada correctamente!");
        document.getElementById("form-canc").reset(); // Vaciamos los inputs
        obtenerCanciones(); // Recargamos las tarjetas
      })
      .catch(error => console.error("Error al crear la canción:", error));
  });
}

// PUT: Modificar una canción existente por su ID
function modificarCancion() {
  const btn = document.getElementById("btn-modificar-can");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const id = document.querySelector(".CodCan").value;
    const nomNueva = document.querySelector(".NomCan-new").value.trim();

    if (!id) {
      alert("Haz clic en una canción de la lista arriba para seleccionarla antes de modificarla.");
      return;
    }
    if (!nomNueva) {
      alert("Por favor, escribe el nuevo nombre en el campo 'Canción NUEVA'.");
      return;
    }

    fetch(`${API_URL}/cancion/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NomCan: nomNueva })
    })
      .then(respuesta => respuesta.json())
      .then(resultado => {
        alert("¡Canción modificada correctamente!");
        document.getElementById("form-canc").reset();
        document.querySelector(".CodCan").value = "";
        obtenerCanciones();
      })
      .catch(error => console.error("Error al modificar la canción:", error));
  });
}

// DELETE: Eliminar una canción por su ID
function eliminarCancion() {
  const btn = document.getElementById("btn-eliminar-can");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const id = document.querySelector(".CodCan").value;
    const nomActual = document.querySelector(".NomCan").value.trim();

    if (!id) {
      alert("Haz clic en una canción de la lista arriba para seleccionarla antes de eliminarla.");
      return;
    }

    const confirmar = confirm(`¿Estás seguro de que deseas eliminar la canción "${nomActual}"?`);
    if (!confirmar) return;

    fetch(`${API_URL}/cancion/${id}`, {
      method: "DELETE"
    })
      .then(respuesta => respuesta.json())
      .then(resultado => {
        alert("¡Canción eliminada correctamente!");
        document.getElementById("form-canc").reset();
        document.querySelector(".CodCan").value = ""; 
        obtenerCanciones();
      })
      .catch(error => console.error("Error al eliminar la canción:", error));
  });
}