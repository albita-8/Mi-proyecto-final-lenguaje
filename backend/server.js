const express = require("express");

const mysql2 = require("mysql2");

const cors = require("cors");

const path = require("path");

// Creamos una instancia de Express para nuestro servidor
const api = express();

api.use(cors());

api.use(express.json());

// Opcional: servir el frontend (src/) desde Express, para poder abrir
//localhost:3000 sin necesidad de Live Server ni Apache para el frontend.
http: api.use(express.static(path.join(__dirname, "../src")));

// Definimos las constantes necesarias para la conexión con el servidor
const PORT = 3000; // Puerto donde correrá nuestro servidor

// Creamos un pool de conexiones, que hará que las conexiones se hagan bajo demanda según se vayan necesitando
const pool_mysql = mysql2.createPool({
  host: "localhost", // Dirección del servidor
  port: 3306, // Puerto al que nos conectamos en MySQL
  user: "root", // Usuario al que nos conectamos
  password: "", // Contraseña del usuario al que nos conectamos
  database: "Disney", // Nombre de la base de datos que nos conectamos
  waitForConnections: true, // Hace que las nuevas peticiones esperan en cola hasta que haya una conexión libre. Si vale false esas nuevas peticiones fallan
  connectionLimit: 10, // Define el máximo de conexiones simultáneas al servidor MySQL
  queueLimit: 0, // Define el límite de peticiones en espera. El valor 0 define una cola infinita
});

function iniciarServer() {
  // Solo arrancamos el servidor cuando la BD está conectada, es decir, el servidor Express no se pone a escuchar hasta comprobar que la base de datos responde.
  pool_mysql.getConnection((error, connection) => {
    if (error) {
      console.error(
        "Se ha producido un error al conectar con el MySQL:",
        error,
      );
      process.exit(1); // Si falla la BD, cerramos el servidor
    }
    connection.release();
    // Iniciamos el servidor en el puerto especificado
    api.listen(PORT, () => {
      // Confirmación en la consola de que se ha lanzado el servidor OK
      console.log(
        `Se ha conectado satisfactoriamente a MySQL. Servidor corriendo en http://localhost:${PORT}`,
      );
    });
  });
}

api.get("/pelicula", (req, res) => {
  const params = new URL(`http://localhost:${PORT}${req.url}`).searchParams;
  const nombre = params.get("nombre");
  // Alternativa:
  // const ciudad = req.query.ciudad;
  let valores = [];
  let sql = "SELECT * FROM pelicula";
  // Compruebo si existe un parámetro para filtrar por nombre
  // if (nombre) {
  //   sql += " WHERE nombre = ?";
  //   valores.push(nombre);
  // }
  //Ejecutamos la consulta en el pool de conexiones creado pool_mysql
  pool_mysql.query(sql, valores, (error, resultados) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});

iniciarServer();

