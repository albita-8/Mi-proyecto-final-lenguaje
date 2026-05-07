const express = require("express");

const mysql2 = require("mysql2");

const cors = require("cors");

const path = require("path");


const api = express();

api.use(cors());

api.use(express.json());


http: api.use(express.static(path.join(__dirname, "../src")));


const PORT = 3000;


const pool_mysql = mysql2.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Disney",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function inicioSrv() {
  pool_mysql.getConnection((error, connection) => {
    if (error) {
      console.error(
        "Se ha producido un error al conectar con el MySQL:",
        error,
      );
      process.exit(1);
    }
    connection.release();

    api.listen(PORT, () => {

      console.log(
        `Se ha conectado satisfactoriamente a MySQL. Servidor corriendo en http://localhost:${PORT}`,
      );
    });
  });
}
inicioSrv();


// =============================================================
//                      CREACIÓN APIS
// =============================================================

// API para obtener todas las películas o filtrar por nombre
api.get("/pelicula", (req, res) => {
   const nombre = req.query.nombre;
  
  let valores = [];
  let sql = "SELECT * FROM pelicula";

  if (nombre) {
    sql += " WHERE NomPel = ?";
    valores.push(nombre);
  }

  pool_mysql.query(sql, valores, (error, resultados) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});

// API para obtener todos los personajes o filtrar por nombre
api.get("/personaje", (req, res) => {
   const nombre = req.query.nombre;
  
  let valores = [];
  let sql = "SELECT * FROM personaje";

  if (nombre) {
    sql += " WHERE NomPer = ?";
    valores.push(nombre);
  }

  pool_mysql.query(sql, valores, (error, resultados) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});



