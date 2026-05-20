const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const path = require("path");

const api = express();

api.use(cors());
api.use(express.json());

// Servir archivos estáticos
api.use(express.static(path.join(__dirname, "../src")));

const PORT = 3000;

// Configuración del Pool de MySQL
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
      console.error("Se ha producido un error al conectar con el MySQL:", error);
      process.exit(1);
    }
    connection.release();

    api.listen(PORT, () => {
      console.log(`Se ha conectado satisfactoriamente a MySQL. Servidor corriendo en http://localhost:${PORT}`);
    });
  });
}

inicioSrv();

// =============================================================
//                      CREACIÓN APIS
// =============================================================

// 1. API Películas
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

//POST: insertar una nueva película
api.post("/pelicula", (req, res) => {
  const { NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel } = req.body;
  const sql =
    "INSERT INTO pelicula (NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel) VALUES (?, ?, ?, ?, ?, ?)";
  const valores = [NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel || "Sin imagen"];
 
  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al insertar película:", error);
      return res.status(500).json({ error });
    }
    res.status(201).json({ mensaje: "Película creada correctamente", id: resultado.insertId });
  });
});

// PUT: modificar una película existente por su ID
api.put("/pelicula/:id", (req, res) => {
  const { id } = req.params;
  const { NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel } = req.body;
  const sql =
    "UPDATE pelicula SET NomPel = ?, AnoPel = ?, GenPel = ?, SinPel = ?, MinPel = ?, ImgPel = ? WHERE CodPel = ?";
  const valores = [NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel, id];
 
  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al modificar película:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Película no encontrada" });
    res.json({ mensaje: "Película modificada correctamente" });
  });
});

//DELETE: eliminar una película por su ID
api.delete("/pelicula/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pelicula WHERE CodPel = ?";
 
  pool_mysql.query(sql, [id], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar película:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Película no encontrada" });
    res.json({ mensaje: "Película eliminada correctamente" });
  });
});

// 2. API Personajes
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
});

// POST: insertar un nuevo personaje
api.post("/personaje", (req, res) => {
  const { NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei } = req.body;
  const sql =
    "INSERT INTO personaje (NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const valores = [
    NomPer, EdaPer, TipPer,
    EspPer || "Desconocido",
    AliPer || "Desconocido",
    GenPer,
    DesPer || "No hay descripción",
    ImgPer || "Sin imagen",
    CodRei,
  ];
 
  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al insertar personaje:", error);
      return res.status(500).json({ error });
    }
    res.status(201).json({ mensaje: "Personaje creado correctamente", id: resultado.insertId });
  });
});

// PUT: modificar un personaje existente por su ID
api.put("/personaje/:id", (req, res) => {
  const { id } = req.params;
  const { NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei } = req.body;
  const sql =
    "UPDATE personaje SET NomPer = ?, EdaPer = ?, TipPer = ?, EspPer = ?, AliPer = ?, GenPer = ?, DesPer = ?, ImgPer = ?, CodRei = ? WHERE CodPer = ?";
  const valores = [NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei, id];
 
  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al modificar personaje:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Personaje no encontrado" });
    res.json({ mensaje: "Personaje modificado correctamente" });
  });
});

//DELETE: eliminar un personaje por su ID
api.delete("/personaje/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM personaje WHERE CodPer = ?";
 
  pool_mysql.query(sql, [id], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar personaje:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Personaje no encontrado" });
    res.json({ mensaje: "Personaje eliminado correctamente" });
  });
});

// 3. API Canciones
api.get("/cancion", (req, res) => {
  const sql = "SELECT * FROM cancion";
  pool_mysql.query(sql, (error, resultados) => {
    if (error) {
      console.error("Error en la consulta de canciones:", error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});

//POST: insertar una nueva canción
api.post("/cancion", (req, res) => {
  const { NomCan } = req.body;
  const sql = "INSERT INTO cancion (NomCan) VALUES (?)";
 
  pool_mysql.query(sql, [NomCan], (error, resultado) => {
    if (error) {
      console.error("Error al insertar canción:", error);
      return res.status(500).json({ error });
    }
    res.status(201).json({ mensaje: "Canción creada correctamente", id: resultado.insertId });
  });
});

//PUT: modificar una canción existente por su ID
api.put("/cancion/:id", (req, res) => {
  const { id } = req.params;
  const { NomCan } = req.body;
  const sql = "UPDATE cancion SET NomCan = ? WHERE CodCan = ?";
 
  pool_mysql.query(sql, [NomCan, id], (error, resultado) => {
    if (error) {
      console.error("Error al modificar canción:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Canción no encontrada" });
    res.json({ mensaje: "Canción modificada correctamente" });
  });
});
 
// [NUEVO - CONTROL 3] DELETE: eliminar una canción por su ID
api.delete("/cancion/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cancion WHERE CodCan = ?";
 
  pool_mysql.query(sql, [id], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar canción:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Canción no encontrada" });
    res.json({ mensaje: "Canción eliminada correctamente" });
  });
});

// GET: obtener todos los reinos (usado por el panel de administración)
api.get("/reino", (req, res) => {
  const sql = "SELECT * FROM reino";
  pool_mysql.query(sql, (error, resultados) => {
    if (error) {
      console.error("Error en la consulta de reinos:", error);
      return res.status(500).json({ error });
    }
    res.json(resultados);
  });
});