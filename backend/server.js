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

// API para obtener todos los personajes o filtrar por nombre y tipo (Protagonista, Villano o Secundario)
api.get("/personaje", (req, res) => {
  const nombre = req.query.nombre;
  const tipo = req.query.tipo;

  let valores = [];
  let sql = `
    SELECT 
      p.CodPer, p.NomPer, p.EdaPer, p.TipPer,
      p.EspPer, p.AliPer, p.GenPer, p.DesPer, p.ImgPer,
      r.NomRei AS Reino
    FROM personaje p
    JOIN reino r ON (p.CodRei = r.CodRei)
  `;

  if (nombre && tipo) {
    sql += " WHERE p.NomPer = ? AND p.TipPer = ?";
    valores.push(nombre, tipo);

  } else if (nombre) {
    sql += " WHERE p.NomPer = ?";
    valores.push(nombre);

  } else if (tipo) {
    sql += " WHERE p.TipPer = ?";
    valores.push(tipo);
  }

  pool_mysql.query(sql, valores, (error, resultados) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error });
    }

    res.json(resultados);
  });
})



