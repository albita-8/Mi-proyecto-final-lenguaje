# 🏰 The API of Wonderland

---

## 👥 Integrantes del Grupo

 __- Alba Agüera Cuadra__  

__- Elisabet Soria Zaitseva__  

---

## 📖 Descripción del Proyecto

**The API of Wonderland** es una aplicación web de una base de datos que tiene datos sobre las películas Disney, esta permite gestionar y consultar información detallada sobre personajes del universo Disney, sobre las películas y los reinos de estos personajes. La aplicación expone endpoints HTTP que permiten realizar consultas sobre la base de datos realizada en **MySQL**.

El proyecto surge de la necesidad de centralizar y estructurar la información de personajes Disney. Como sus características, películas asociadas, tipos de personaje, etc. Esto permite que tanto desarrolladores como aplicaciones de terceros puedan consumir estos datos de forma sencilla y estandarizada.

---

## 🎯 Objetivos

- Diseñar e implementar una base de datos relacional en MySQL para almacenar información de personajes Disney.
- Desarrollar una API con endpoints bien documentados que permitan consultar y gestionar los datos.
- Aplicar buenas prácticas de diseño de bases de datos (normalización, claves foráneas, índices).
- Implementar autenticación básica para proteger los endpoints de escritura.
- Ofrecer una interfaz web sencilla que consuma la API y permita visualizar los personajes.
- Documentar el proyecto de forma clara para facilitar su uso y mantenimiento.

---

## ⚙️ Funcionalidades Principales

- **Listado de personajes**: Obtener todos los personajes con filtros por nombre, película o tipo.
- **Listado de películas**: Obtener todas las películas con filtros por personajes, reino o género.
- **Detalle de personaje**: Consultar información completa de un personaje por su ID.
- **Gestión de películas**: CRUD completo sobre las películas asociadas a los personajes.
- **Búsqueda y filtrado**: Filtrar personajes por franquicia, tipo (héroe/villano/secundario) o película.

---

## 👤 Tipo de Usuarios

| Tipo de Usuario | Descripción |
|-----------------|-------------|
| **Administrador** | Puede realizar todas las operaciones CRUD. Accede mediante token de autenticación. |
| **Usuario público / desarrollador** | Puede consultar y buscar personajes (solo lectura). No necesita autenticación. |

---

## 🏗️ Estructura de la Aplicación

### Frontend
Interfaz web desarrollada con **HTML, CSS y JavaScript**. Permite visualizar el catálogo de personajes Disney, buscar por nombre o película, y mostrar el detalle de cada personaje con su imagen y datos. Consume la API REST mediante llamadas `fetch`.

### Backend
API REST desarrollada con **Node.js y Express**. Gestiona las rutas, la lógica de negocio y la comunicación con la base de datos. Expone los siguientes grupos de endpoints:

```
GET    /api/personajes      → Listar todos los personajes
GET    /api/peliculas       → Listar todas las películas
POST   /api/personajes      → Crear personaje
PUT    /api/peliculas       → Actualizar personaje
DELETE /api/peliculas       → Eliminar personaje
```

### Base de Datos
Base de datos relacional en **MySQL** con las siguientes tablas principales:

- `pelicula` — Películas de la franquicia Disney
- `personaje` — Personajes con sus atributos y relaciones
- `reino` — Reinos y ambientaciones de cada personaje
- `peli_pers` — Tabla intermedia que relaciona películas con personajes
- `cancion` — Canciones asociadas a las películas
- `canc_peli` — Tabla intermedia que relaciona canciones con películas

---

## 🗄️ Diseño de la base de datos

### Diagrama Entidad-Relación

![Diagrama Entidad-Relación](disney_ER.png)

### Diagrama Relacional

![Diagrama Relacional](disney_RELATIONAL.png)

### Tablas de la base de datos

```sql
CREATE TABLE pelicula
(
  CodPel INT NOT NULL AUTO_INCREMENT,
  NomPel VARCHAR(50) NOT NULL,
  AnoPel VARCHAR(15) NOT NULL,
  GenPel VARCHAR(15) NOT NULL,
  SinPel VARCHAR(500) NOT NULL,
  MinPel INT NOT NULL,
  ImgPel VARCHAR(500) NOT NULL DEFAULT 'Sin imagen',
  CONSTRAINT PK_pelicula_CodPel PRIMARY KEY (CodPel),
  CONSTRAINT UQ_pelicula_NomPel UNIQUE (NomPel)
);

CREATE TABLE reino
(
  CodRei INT NOT NULL AUTO_INCREMENT,
  NomRei VARCHAR(50) NOT NULL,
  UbiRei VARCHAR(50) NOT NULL DEFAULT 'Desconocido',
  AnoRei VARCHAR(25) NOT NULL DEFAULT 'Desconocido',
  DesRei VARCHAR(500) NOT NULL DEFAULT 'No hay descripción',
  CONSTRAINT PK_reino_CodRei PRIMARY KEY (CodRei)
);

CREATE TABLE personaje
(
  CodPer INT NOT NULL AUTO_INCREMENT,
  NomPer VARCHAR(50) NOT NULL,
  EdaPer INT NOT NULL,
  TipPer VARCHAR(50) NOT NULL,
  EspPer VARCHAR(50) NOT NULL DEFAULT 'Desconocido',
  AliPer VARCHAR(20) DEFAULT 'Desconocido',
  GenPer VARCHAR(15) NOT NULL,
  DesPer VARCHAR(500) NOT NULL DEFAULT 'No hay descripción',
  ImgPer VARCHAR(500) NOT NULL DEFAULT 'Sin imagen',
  CodRei INT NOT NULL,
  CONSTRAINT PK_personaje_CodPer PRIMARY KEY (CodPer),
  CONSTRAINT FK_personaje_CodRei FOREIGN KEY (CodRei) REFERENCES reino(CodRei)
);

CREATE TABLE peli_pers
(
  CodPel INT NOT NULL,
  CodPer INT NOT NULL,
  CONSTRAINT PK_peli_pers_CodPel_CodPer PRIMARY KEY (CodPel, CodPer),
  CONSTRAINT FK_peli_pers_CodPel FOREIGN KEY (CodPel) REFERENCES pelicula(CodPel),
  CONSTRAINT FK_peli_pers_CodPer FOREIGN KEY (CodPer) REFERENCES personaje(CodPer)
);

CREATE TABLE cancion
(
  CodCan INT NOT NULL AUTO_INCREMENT,
  NomCan VARCHAR(50) NOT NULL,
  CONSTRAINT PK_cancion_CodCan PRIMARY KEY (CodCan)
);

CREATE TABLE canc_peli
(
  CodCan INT NOT NULL,
  CodPel INT NOT NULL,
  CONSTRAINT PK_canc_peli_CodCan_CodPel PRIMARY KEY (CodCan, CodPel),
  CONSTRAINT FK_canc_peli_CodCan FOREIGN KEY (CodCan) REFERENCES cancion(CodCan),
  CONSTRAINT FK_canc_peli_CodPel FOREIGN KEY (CodPel) REFERENCES pelicula(CodPel)
);
```

---

## 📁 Estructura de Carpetas del Proyecto

```
disney-api/
├── backend/
│   └── server.js
├── data/
│   └── disney_db.sql
├── src/
│   ├── assets
│   │    ├── fonts/
│   │    └── images/
│   │        ├── peliculas/
│   │        └── personajes/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── javascript.js
│   ├── pages/
│   │     ├── pelicula.html
│   │     ├── personaje.html
│   │     ├── sobre-nosotras.html
│   │     └── cancion.html
│   └── index.html
├── .gitignore
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── REPARTO.md
└── README.md
```

---

## 🚀 Instrucciones de Uso

1. Importar el fichero `data/disney_db.sql` en MySQL.
2. Configurar las credenciales de la base de datos en `backend/server.js`.
3. Instalar dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
4. Iniciar el servidor:
   ```bash
   node js/app.js
   ```
5. Abrir `src/index.html` en el navegador.

---

## Control de cambios

### Añadido
- Endpoint `GET /api/personajes` para listar todos los personajes desde la base de datos.
- Endpoint `GET /api/peliculas` para listar todas las películas.
- Servidor Node.js con Express en `backend/server.js` con conexión operativa a MySQL.
- Fichero `package.json` con las dependencias necesarias (`express`, `mysql2`, `cors`).
- Interfaz web en `src/index.html` que consume la API mediante `fetch` y muestra los personajes.
- Tabla `peli_pers` para gestionar la relación muchos a muchos entre películas y personajes.
- Tabla `cancion` y `canc_peli` para almacenar canciones asociadas a las películas.

### Modificado
- Base de datos migrada de **SQL Server** a **MySQL**, adaptando la sintaxis (`IDENTITY` → `AUTO_INCREMENT`, tipos de datos, etc.).
- Campo `AnoRei` de la tabla `reino` cambiado de `INT` con `DEFAULT 'Desconocido'` a `VARCHAR(15)` para ser coherente con los datos reales insertados.
- La relación entre `personaje` y `pelicula` se ha extraído a una tabla intermedia `peli_pers`, eliminando la clave foránea directa en `personaje`, para soportar personajes que aparecen en varias películas.
- Estructura del proyecto: separación clara entre carpetas `src/`, `backend/` y `data/`.
- README actualizado con instrucciones de uso, tecnologías reales y estructura de carpetas definitiva.

### Eliminado
- Clave foránea directa `CodPel` en la tabla `personaje`, sustituida por la tabla intermedia `peli_pers`.
- Referencia a SQL Server Management Studio (SSMS), sustituida por MySQL Workbench.

### Justificación de los cambios realizados
Se ha migrado la base de datos de SQL Server a MySQL para cumplir con el requisito del proyecto (Node.js + MySQL). La relación directa entre `personaje` y `pelicula` se ha sustituido por una tabla intermedia porque varios personajes aparecen en más de una película (por ejemplo, personajes de Toy Story 1 y 2). El campo `FNacPer` se ha flexibilizado a texto porque los datos reales de Disney no siempre tienen fechas exactas. Estas decisiones permiten que la base de datos refleje mejor la realidad del dominio y sea coherente con los datos insertados.
