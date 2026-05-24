/**
 * @file javascript.js
 * @description Archivo JS donde creamos la API de Disney.
 * @author Alba Agüera Cuadra, Elisabet Soria Zaitseva
 */

const API_URL = "http://localhost:3000";

const ENDPOINT_GET_PELICULAS = "pelicula";
const ENDPOINT_GET_PERSONAJES = "personaje";
const ENDPOINT_GET_CANCIONES = "cancion";

document.addEventListener("DOMContentLoaded", function () {
  cargarPeliculas();
  cargarPersonajes();
  const selectEntidad = document.getElementById("select-entidad");
  const selectAccion = document.getElementById("select-accion");

  if (selectEntidad && selectAccion) {
    // Cuando cualquiera de los dos select cambie, llamamos a la función
    selectEntidad.addEventListener("change", inyectarHTML);
    selectAccion.addEventListener("change", inyectarHTML);
  }
});

function inyectarHTML() {
  const contenedor = document.getElementById("contenedor-formularios");
  const entidad = document.getElementById("select-entidad").value;
  const accion = document.getElementById("select-accion").value;

  // Si falta alguna opción por marcar, vaciamos el contenedor y salimos
  if (entidad === "" || accion === "") {
    contenedor.innerHTML = "";
    return; // Este return hace que la función se detenga aquí
  }
  if (entidad === "pelicula" && accion === "crear") {
    contenedor.innerHTML = `
      <fieldset id="crear-pelicula" class="grupo-formulario">
          <legend>Crear Nueva Película</legend>
          <form id="form-crear-pelicula" enctype="multipart/form-data">
            <label for="NomPel">Nombre de la Película:</label>
            <input type="text" id="pel-cre-nombre" name="NomPel" required placeholder="Ej: El Rey León">

            <label for="AnoPel">Fecha de Estreno (Año):</label>
            <input type="date" id="pel-cre-anio" name="AnoPel" required>

            <label for="GenPel">Género:</label>
            <input type="text" id="pel-cre-genero" name="GenPel" required placeholder="Ej: Aventuras/Drama">

            <label for="MinPel">Duración (Minutos):</label>
            <input type="number" id="pel-cre-min" name="MinPel" required placeholder="Ej: 88">

            <label for="SinPel">Sinopsis:</label>
            <textarea id="pel-cre-sinopsis" name="SinPel" required
              placeholder="Escribe un breve resumen de la trama..."></textarea>

            <label for="ImgPel">Seleccionar Imagen de la Película:</label>
            <input type="file" id="pel-cre-imagen" name="ImgPel" accept="image/*">

            <button type="submit">Guardar Película</button>
          </form>
        </fieldset>

    `;
  } else if (entidad === "pelicula" && accion === "modificar") {
    contenedor.innerHTML = `
     <fieldset id="modificar-pelicula" class="grupo-formulario">
          <legend>Modificar Película Existente</legend>
          <form id="form-modificar-pelicula" enctype="multipart/form-data">
            <label for="peli-mod-CodPel">Código de la Película a modificar (CodPel):</label>
            <input type="number" id="peli-mod-codigo" name="peli-mod-CodPel" required placeholder="Ej: 1">

            <label for="peli-mod-NomPel">Nuevo Nombre:</label>
            <input type="text" id="peli-mod-No" name="peli-mod-NomPel" required>

            <label for="peli-mod-AnoPel">Nueva Fecha:</label>
            <input type="date" id="peli-mod-anio" name="peli-mod-AnoPel" required>

            <label for="peli-mod-GenPel">Nuevo Género:</label>
            <input type="text" id="peli-mod-genero" name="peli-mod-GenPel" required>

            <label for="peli-mod-MinPel">Nuevos Minutos:</label>
            <input type="number" id="peli-mod-min" name="peli-mod-MinPel" required>

            <label for="peli-mod-SinPel">Nueva Sinopsis:</label>
            <textarea id="peli-mod-sinopsis" name="peli-mod-SinPel" required></textarea>

            <label for="peli-mod-ImgPel">Cambiar Imagen de la Película:</label>
            <input type="file" id="peli-mod-imagen" name="peli-mod-ImgPel" accept="image/*">

            <button type="submit">Actualizar Película</button>
          </form>
        </fieldset>

    `;
  } else if (entidad === "pelicula" && accion === "eliminar") {
    contenedor.innerHTML = `
      <fieldset id="eliminar-pelicula" class="grupo-formulario">
          <legend>Eliminar Película</legend>
          <form id="form-eliminar-pelicula">
            <label for="peli-del-CodPel">Código de la Película a borrar (CodPel):</label>
            <input type="number" id="peli-del-codigo" required placeholder="Ej: 1">


            <button type="submit">Eliminar Definitivamente</button>
          </form>
        </fieldset>

    `;
  } else if (entidad === "personaje" && accion === "crear") {
    contenedor.innerHTML = `
      <fieldset id="crear-personaje" class="grupo-formulario">
          <legend>Crear Nuevo Personaje</legend>
          <form id="form-crear-personaje" enctype="multipart/form-data">
            <label for="NomPer">Nombre del Personaje:</label>
            <input type="text" id="pers-cre-nombre" name="NomPer" required placeholder="Ej: Simba">

            <label for="EdaPer">Edad:</label>
            <input type="number" id="pers-cre-edad" name="EdaPer" required placeholder="Ej: 4">

            <label for="TipPer">Tipo (Protagonista/Villano/Secundario):</label>
            <input type="text" id="pers-cre-tipo" name="TipPer" required placeholder="Ej: Protagonista">

            <label for="EspPer">Especie:</label>
            <input type="text" id="pers-cre-especie" name="EspPer" placeholder="Ej: León">

            <label for="AliPer">Alias / Apodo:</label>
            <input type="text" id="pers-cre-alias" name="AliPer" placeholder="Ej: Rey Sol">

            <label for="GenPer">Género:</label>
            <select id="pers-cre-genero" name="GenPer" required>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Desconocido">Desconocido</option>
            </select>

            <label for="DesPer">Descripción:</label>
            <textarea id="pers-cre-descripcion" name="DesPer"
              placeholder="Escribe características del personaje..."></textarea>

            <label for="ImgPer">Seleccionar Imagen del Personaje:</label>
            <input type="file" id="pers-cre-imagen" name="ImgPer" accept="image/*">

            <label for="CodRei">Código del Reino (FK):</label>
            <input type="number" id="pers-cre-codreino" name="CodRei" required placeholder="Ej: 1">

            <button type="submit">Guardar Personaje</button>
          </form>
        </fieldset>

    `;
  } else if (entidad === "personaje" && accion === "modificar") {
    contenedor.innerHTML = `
       <fieldset id="modificar-personaje" class="grupo-formulario">
          <legend>Modificar Personaje Existente</legend>
          <form id="form-modi-per" enctype="multipart/form-data">
            <label for="pers-mod-CodPer">Código del Personaje a modificar (CodPer):</label>
            <input type="number" id="pers-mod-CodPer" name="pers-mod-CodPer" required placeholder="Ej: 1">

            <label for="pers-mod-NomPer">Nuevo Nombre:</label>
            <input type="text" id="pers-mod-nombre" name="pers-mod-NomPer" required>

            <label for="pers-mod-EdaPer">Nueva Edad:</label>
            <input type="number" id="pers-mod-edad" name="pers-mod-EdaPer" required>

            <label for="pers-mod-TipPer">Nuevo Tipo:</label>
            <input type="text" id="pers-mod-tipo" name="pers-mod-TipPer" required>

            <label for="pers-mod-EspPer">Nueva Especie:</label>
            <input type="text" id="pers-mod-especie" name="pers-mod-EspPer">

            <label for="pers-mod-AliPer">Nuevo Alias:</label>
            <input type="text" id="pers-mod-alias" name="pers-mod-AliPer">

            <label for="pers-mod-GenPer">Nuevo Género:</label>
            <select id="pers-mod-genero" name="pers-mod-GenPer" required>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Desconocido">Desconocido</option>
            </select>

            <label for="pers-mod-DesPer">Nueva Descripción:</label>
            <textarea id="pers-mod-descripcion" name="pers-mod-DesPer"></textarea>

            <label for="pers-mod-ImgPer">Cambiar Imagen del Personaje:</label>
            <input type="file" id="pers-mod-imagen" name="pers-mod-ImgPer" accept="image/*">

            <label for="pers-mod-CodRei">Nuevo Código de Reino:</label>
            <input type="number" id="pers-mod-codreino" name="pers-mod-CodRei" required>

            <button type="submit">Actualizar Personaje</button>
          </form>
        </fieldset>
    `;
  } else if (entidad === "personaje" && accion === "eliminar") {
    contenedor.innerHTML = `
        <fieldset id="eliminar-personaje" class="grupo-formulario">
          <legend>Eliminar Personaje</legend>
          <form id="form-eliminar-personaje">
            <label for="pers-del-CodPer">Código del Personaje a borrar (CodPer):</label>
            <input type="number" id="pers-del-codigo" required placeholder="Ej: 1">	

            <button type="submit">Eliminar Definitivamente</button>
          </form>
        </fieldset>
    `;
  } else if (entidad === "cancion" && accion === "crear") {
    contenedor.innerHTML = `
         <fieldset id="crear-cancion" class="grupo-formulario">
          <legend>Crear Nueva Canción</legend>
          <form id="form-crear-cancion">
            <label for="NomCan">Nombre de la Canción:</label>
            <input type="text" id="canc-cre-nombre" required placeholder="Ej: Hakuna Matata">

            <button type="submit">Guardar Canción</button>
          </form>
        </fieldset>

    `;
  } else if (entidad === "cancion" && accion === "crear") {
    contenedor.innerHTML = `
    <fieldset id="modificar-cancion" class="grupo-formulario">
          <legend>Modificar Canción Existente</legend>
          <form id="form-modificar-cancion">
            <label for="canc-mod-CodCan">Código de la Canción a modificar (CodCan):</label>
            <input type="number" id="canc-mod-CodCan" required placeholder="Ej: 1">

            <label for="canc-mod-NomCan">Nuevo Nombre de la Canción:</label>
            <input type="text" id="canc-mod-NomCan" required>

            <button type="submit">Actualizar Canción</button>
          </form>
        </fieldset>
`;
  } else if (entidad === "cancion" && accion === "modificar") {
    contenedor.innerHTML = `
       <fieldset id="modificar-cancion" class="grupo-formulario escondido">
          <legend>Modificar Canción Existente</legend>
          <form id="form-modificar-cancion">
            <label for="canc-mod-CodCan">Código de la Canción a modificar (CodCan):</label>
            <input type="number" id="canc-mod-CodCan" required placeholder="Ej: 1">

            <label for="canc-mod-NomCan">Nuevo Nombre de la Canción:</label>
            <input type="text" id="canc-mod-NomCan" required>

            <button type="submit">Actualizar Canción</button>
          </form>
        </fieldset>
    `;
  }
  else {
    contenedor.innerHTML = `
      <fieldset id="eliminar-cancion" class="grupo-formulario">
          <legend>Eliminar Canción</legend>
          <form id="form-eliminar-cancion">
            <label for="canc-del-CodCan">Código de la Canción a borrar (CodCan):</label>
            <input type="number" id="canc-del-CodCan" required placeholder="Ej: 1">

            <button type="submit">Eliminar Definitivamente</button>
          </form>
        </fieldset>

     `;
  }
}
// FETCH DE PELICULAS
function cargarPeliculas() {
  fetch(API_URL + "/pelicula")
    .then(respuesta => respuesta.json())
    .then(peliculas => renderizarPeliculas(peliculas))
    .catch(error => console.error("Error al cargar películas:", error));
}

// PROYECTA PELICULAS
function renderizarPeliculas(peliculas) {
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
function crearPelicula(datos) {
  fetch(`${API_URL}/pelicula`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Película creada:", resultado))
    .catch(error => console.error("Error al crear la película:", error));
}

// PUT: Modificar una película existente por su ID
function modificarPelicula(id, datos) {
  fetch(`${API_URL}/pelicula/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Película modificada:", resultado))
    .catch(error => console.error("Error al modificar la película:", error));
}

// DELETE: Eliminar una película por su ID
function eliminarPelicula(id) {
  fetch(`${API_URL}/pelicula/${id}`, {
    method: "DELETE"
  })
    .then(respuesta => respuesta.json())
    .then(resultado => console.log("Película eliminada:", resultado))
    .catch(error => console.error("Error al eliminar la película:", error));
}

// FETCH DE PERSONAJES
function cargarPersonajes() {
  fetch(API_URL + "/personaje")
    .then(respuesta => respuesta.json())
    .then(personajes => renderizarPersonajes(personajes))
    .catch(error => console.error("Error al cargar personajes:", error));
}

// PROYECTAR PERSONAJES
function renderizarPersonajes(personajes) {
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