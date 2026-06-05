const express = require("express");

const mysql2 = require("mysql2");

const cors = require("cors");

const multer = require('multer');

const path = require("path");

const api = express();

api.use(cors());
api.use(express.json());
api.use(express.static(path.join(__dirname, "../src")));

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
//               CONFIGURACIÓN DE SUBIDA (MULTER)
// =============================================================  

// Configuración para Películas
const imagenPeliculas = multer.diskStorage({
  destination: function (req, file, cb) {
    // Las guarda en src/assets/images/peliculas/
    cb(null, path.join(__dirname, '../src/assets/images/peliculas/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const uploadPelicula = multer({ storage: imagenPeliculas });

// Configuración para Personajes
const imagenPersonajes = multer.diskStorage({
  destination: function (req, file, cb) {
    // Las guarda en src/assets/images/personajes/
    cb(null, path.join(__dirname, '../src/assets/images/personajes/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const uploadPersonaje = multer({ storage: imagenPersonajes });

// =============================================================
//                      CREACIÓN APIS
// =============================================================  

// GET: leer las películas que hay
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

// POST: insertar una nueva película con soporte para archivos multimedia
api.post("/pelicula", uploadPelicula.single("ImgPel"), (req, res) => {
  const { NomPel, AnoPel, GenPel, SinPel, MinPel } = req.body;

  // Si se ha subido un archivo, creamos la ruta web relativa para la base de datos
  const rutaImagen = req.file ? `/assets/images/peliculas/${req.file.filename}` : "Sin imagen";

  const sql =
    "INSERT INTO pelicula (NomPel, AnoPel, GenPel, SinPel, MinPel, ImgPel) VALUES (?, ?, ?, ?, ?, ?)";
  const valores = [NomPel, AnoPel, GenPel, SinPel, MinPel, rutaImagen];

  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al insertar película:", error);
      return res.status(500).json({ error });
    }
    res.status(201).json({ mensaje: "Película creada correctamente", id: resultado.insertId });
  });
});

// PUT: modificar una película existente por su ID con soporte para cambiar la imagen
api.put("/pelicula/:nombre", uploadPelicula.single("ImgPel"), (req, res) => {
  const { nombre } = req.params;
  const { NomPel, AnoPel, GenPel, SinPel, MinPel } = req.body;

  let actualizar = [];
  let valores = [];

  if (NomPel) {
    actualizar.push("NomPel = ?");
    valores.push(NomPel);
  }

  if (AnoPel) {
    actualizar.push("AnoPel = ?");
    valores.push(AnoPel);
  }

  if (GenPel) {
    actualizar.push("GenPel = ?");
    valores.push(GenPel);
  }

  if (MinPel) {
    actualizar.push("MinPel = ?");
    valores.push(MinPel);
  }

  if (SinPel) {
    actualizar.push("SinPel = ?");
    valores.push(SinPel);
  }

  if (req.file) {
    actualizar.push("ImgPel = ?");
    valores.push(`/assets/images/peliculas/${req.file.filename}`);
  }

  if (actualizar.length === 0) {
    return res.status(400).json({ error: "No se enviaron datos para modificar." });
  }

  const sql = `UPDATE pelicula SET ${actualizar.join(", ")} WHERE NomPel = ?`;
  valores.push(nombre);

  pool_mysql.query(sql, valores, (error, resultado) => {
    if (error) {
      console.error("Error al modificar película en la DB:", error);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró ninguna película con ese nombre." });
    }

    res.json({ mensaje: "Película modificada correctamente." });
  });
});

// DELETE: eliminar una película por su ID
api.delete("/pelicula/:nombre", (req, res) => {
  const { nombre } = req.params;
  const sql = "DELETE FROM pelicula WHERE NomPel = ?";

  pool_mysql.query(sql, [nombre], (error, resultado) => {
    if (error) {
      console.error("Error al eliminar película:", error);
      return res.status(500).json({ error });
    }
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "Película no encontrada" });
    res.json({ mensaje: "Película eliminada correctamente" });
  });
});

// GET  de reinos para los personajes
app.get('/api/reinos', (req, res) => {

    const query = 'SELECT CodRei, NomRei FROM Reino ORDER BY NomRei ASC'; 
    
    conexion.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los reinos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    });
});

// GET: leer los personajes que hay o filtrar por nombre y tipo
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
  if (nombre) {
    sql += " WHERE p.NomPer = ?";
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

// POST: insertar un nuevo personaje con soporte para archivos multimedia
api.post("/personaje", uploadPersonaje.single("ImgPer"), (req, res) => {
  const { NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, CodRei } = req.body;

  // Si se ha subido un archivo, creamos la ruta web relativa para la base de datos
  const rutaImagen = req.file ? `/assets/images/personajes/${req.file.filename}` : "Sin imagen";

  const sql =
    "INSERT INTO personaje (NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const valores = [
    NomPer, EdaPer, TipPer,
    EspPer || "Desconocido",
    AliPer || "Desconocido",
    GenPer,
    DesPer || "No hay descripción",
    rutaImagen,
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

// PUT: modificar un personaje existente por su ID con soporte para cambiar la imagen
api.put("/personaje/:nombre", uploadPersonaje.single("ImgPer"), (req, res) => {
  const { nombre } = req.params;
  const { NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, CodRei } = req.body;

 const sql = "SELECT * FROM personaje WHERE NomPer = ?";
  pool_mysql.query(sql, [nombre], (error, resultados) => {
    if (error) {
      console.error("Error al buscar personaje:", error);
      return res.status(500).json({ error });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: `No se encontró ningún personaje registrado bajo el nombre "${nombre}".` });
    }

    const personajeFind = resultados[0];
    const cod_personaje = personajeFind.CodPer;

    let conjuntoCampos = [];
    let valoresSentencia = [];

    if (NomPer && NomPer.trim() !== "") {
      conjuntoCampos.push("NomPer = ?");
      valoresSentencia.push(NomPer.trim());
    }
    if (EdaPer && EdaPer.trim() !== "") {
      conjuntoCampos.push("EdaPer = ?");
      valoresSentencia.push(parseInt(EdaPer));
    }
    if (TipPer && TipPer.trim() !== "") {
      conjuntoCampos.push("TipPer = ?");
      valoresSentencia.push(TipPer.trim());
    }
    if (EspPer && EspPer.trim() !== "") {
      conjuntoCampos.push("EspPer = ?");
      valoresSentencia.push(EspPer.trim());
    }
    if (DesPer && DesPer.trim() !== "") {
      conjuntoCampos.push("DesPer = ?");
      valoresSentencia.push(DesPer.trim());
    }
    if (CodRei && CodRei.trim() !== "") {
      conjuntoCampos.push("CodRei = ?");
      valoresSentencia.push(parseInt(CodRei));
    }
    
    if (req.file) {
      conjuntoCampos.push("ImgPer = ?");
      valoresSentencia.push(req.file.filename);
    }

    if (conjuntoCampos.length === 0) {
      return res.status(400).json({ mensaje: "No has ingresado modificaciones en ningún campo." });
    }

    valoresSentencia.push(cod_personaje);

    const sqlActu = `UPDATE personaje SET ${conjuntoCampos.join(", ")} WHERE CodPer = ?`;

    pool_mysql.query(sqlActu, valoresSentencia, (errorUpdate, resultadoUpdate) => {
      if (errorUpdate) {
        console.error("Error al ejecutar la actualización dinámica:", errorUpdate);
        return res.status(500).json({ error: errorUpdate });
      }
      res.json({ mensaje: `¡El personaje "${nombreOriginal}" ha sido actualizado correctamente con los nuevos cambios!` });
    });
  });
});

// DELETE: eliminar un personaje por su nombre
api.delete("/personaje/:nombre", (req, res) => {
  const { nombre } = req.params;
  const { pelicula } = req.query;

  if (!pelicula) {
    return res.status(400).json({ mensaje: "Falta el nombre de la película para realizar la verificación de seguridad." });
  }

  const sqlVerificar = `
    SELECT pp.CodPer, pp.CodPel 
    FROM peli_pers pp
    JOIN personaje per ON pp.CodPer = per.CodPer
    JOIN pelicula pel ON pp.CodPel = pel.CodPel
    WHERE per.NomPer = ? AND pel.NomPel = ?
  `;

  pool_mysql.query(sqlVerificar, [nombre, pelicula], (error, resultados) => {
    if (error) {
      console.error("Error al verificar la relación:", error);
      return res.status(500).json({ error });
    }

    if (resultados.length === 0) {
      return res.status(400).json({ 
        mensaje: `Acción cancelada: El personaje "${nombre}" no pertenece a la película "${pelicula}" o los nombres están mal escritos.` 
      });
    }

    const id_personaje = resultados[0].CodPer;

    const sqlDeleteRelacion = "DELETE FROM peli_pers WHERE CodPer = ?";
    pool_mysql.query(sqlDeleteRelacion, [id_personaje], (error) => {
      if (error) {
        console.error("Error al eliminar la relación intermedia:", error);
        return res.status(500).json({ error });
      }

      const sqlDeletePersonaje = "DELETE FROM personaje WHERE CodPer = ?";
      pool_mysql.query(sqlDeletePersonaje, [id_personaje], (error) => {
        if (error) {
          console.error("Error al eliminar el personaje de la tabla principal:", error);
          return res.status(500).json({ error });
        }
        res.json({ mensaje: "Personaje eliminado correctamente." });
      });
    });
  });
});


// GET: leer todas las canciones
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

// POST: insertar una nueva canción
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

// PUT: modificar una canción existente por su ID
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

// DELETE: eliminar una canción por su ID
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