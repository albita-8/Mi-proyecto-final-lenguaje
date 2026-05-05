const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ─── Middlewares ────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Conexión a la base de datos ─────────────────────────────────────────────
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Cambia por tu usuario de MySQL
  password: '',         // Cambia por tu contraseña de MySQL
  database: 'Disney'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1);
  }
  console.log('Conexión a MySQL establecida correctamente.');
});

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINTS — PERSONAJES
// ════════════════════════════════════════════════════════════════════════════

// GET /api/personajes — Listar todos los personajes
app.get('/api/personajes', (req, res) => {
  const sql = `
    SELECT 
      p.CodPer,
      p.NomPer,
      p.TipPer,
      p.EspPer,
      p.AliPer,
      p.GenPer,
      p.DesPer,
      p.ImgPer,
      p.FNacPer,
      r.NomRei AS Reino
    FROM personaje p
    JOIN reino r ON p.CodRei = r.CodRei
    ORDER BY p.NomPer ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los personajes.', detalle: err.message });
    }
    res.json(results);
  });
});

// GET /api/personajes/:id — Detalle de un personaje por ID
app.get('/api/personajes/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      p.CodPer,
      p.NomPer,
      p.TipPer,
      p.EspPer,
      p.AliPer,
      p.GenPer,
      p.DesPer,
      p.ImgPer,
      p.FNacPer,
      r.NomRei AS Reino,
      r.UbiRei AS UbicacionReino
    FROM personaje p
    JOIN reino r ON p.CodRei = r.CodRei
    WHERE p.CodPer = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el personaje.', detalle: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Personaje no encontrado.' });
    }
    // Obtener también las películas en las que aparece
    const peliculasSql = `
      SELECT pel.CodPel, pel.NomPel, pel.AnoPel, pel.GenPel
      FROM pelicula pel
      JOIN peli_pers pp ON pel.CodPel = pp.CodPel
      WHERE pp.CodPer = ?
    `;
    db.query(peliculasSql, [id], (err2, peliculas) => {
      if (err2) {
        return res.status(500).json({ error: 'Error al obtener las películas del personaje.', detalle: err2.message });
      }
      const personaje = results[0];
      personaje.Peliculas = peliculas;
      res.json(personaje);
    });
  });
});

// POST /api/personajes — Crear un nuevo personaje
app.post('/api/personajes', (req, res) => {
  const { NomPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, FNacPer, CodRei } = req.body;
  if (!NomPer || !TipPer || !GenPer || !CodRei) {
    return res.status(400).json({ error: 'Los campos NomPer, TipPer, GenPer y CodRei son obligatorios.' });
  }
  const sql = `
    INSERT INTO personaje (NomPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, FNacPer, CodRei)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [NomPer, TipPer, EspPer || 'Desconocido', AliPer || 'Desconocido', GenPer, DesPer || 'No hay descripción', ImgPer || 'Sin imagen', FNacPer || 'Desconocida', CodRei], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el personaje.', detalle: err.message });
    }
    res.status(201).json({ mensaje: 'Personaje creado correctamente.', id: result.insertId });
  });
});

// PUT /api/personajes/:id — Actualizar un personaje
app.put('/api/personajes/:id', (req, res) => {
  const { id } = req.params;
  const { NomPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, FNacPer, CodRei } = req.body;
  const sql = `
    UPDATE personaje 
    SET NomPer = ?, TipPer = ?, EspPer = ?, AliPer = ?, GenPer = ?, DesPer = ?, ImgPer = ?, FNacPer = ?, CodRei = ?
    WHERE CodPer = ?
  `;
  db.query(sql, [NomPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, FNacPer, CodRei, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el personaje.', detalle: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Personaje no encontrado.' });
    }
    res.json({ mensaje: 'Personaje actualizado correctamente.' });
  });
});

// DELETE /api/personajes/:id — Eliminar un personaje
app.delete('/api/personajes/:id', (req, res) => {
  const { id } = req.params;
  // Primero eliminar sus relaciones en peli_pers
  db.query('DELETE FROM peli_pers WHERE CodPer = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar relaciones del personaje.', detalle: err.message });
    }
    db.query('DELETE FROM personaje WHERE CodPer = ?', [id], (err2, result) => {
      if (err2) {
        return res.status(500).json({ error: 'Error al eliminar el personaje.', detalle: err2.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Personaje no encontrado.' });
      }
      res.json({ mensaje: 'Personaje eliminado correctamente.' });
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINTS — PELÍCULAS
// ════════════════════════════════════════════════════════════════════════════

// GET /api/peliculas — Listar todas las películas
app.get('/api/peliculas', (req, res) => {
  const sql = `
    SELECT CodPel, NomPel, AnoPel, GenPel, MinPel, SinPel
    FROM pelicula
    ORDER BY AnoPel ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las películas.', detalle: err.message });
    }
    res.json(results);
  });
});

// GET /api/peliculas/:id — Detalle de una película por ID
app.get('/api/peliculas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pelicula WHERE CodPel = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la película.', detalle: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }
    // Obtener los personajes de esa película
    const personajesSql = `
      SELECT p.CodPer, p.NomPer, p.TipPer, p.ImgPer
      FROM personaje p
      JOIN peli_pers pp ON p.CodPer = pp.CodPer
      WHERE pp.CodPel = ?
    `;
    db.query(personajesSql, [id], (err2, personajes) => {
      if (err2) {
        return res.status(500).json({ error: 'Error al obtener los personajes.', detalle: err2.message });
      }
      const pelicula = results[0];
      pelicula.Personajes = personajes;
      res.json(pelicula);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// ENDPOINTS — REINOS
// ════════════════════════════════════════════════════════════════════════════

// GET /api/reinos — Listar todos los reinos
app.get('/api/reinos', (req, res) => {
  const sql = 'SELECT * FROM reino ORDER BY NomRei ASC';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los reinos.', detalle: err.message });
    }
    res.json(results);
  });
});

// GET /api/reinos/:id — Detalle de un reino por ID
app.get('/api/reinos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM reino WHERE CodRei = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el reino.', detalle: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Reino no encontrado.' });
    }
    res.json(results[0]);
  });
});

// ─── Arranque del servidor ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
