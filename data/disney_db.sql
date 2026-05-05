-- ============================================================
-- The API of Wonderland — Base de datos Disney
-- Motor: MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS Disney
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE Disney;

-- ─── Tabla: pelicula ─────────────────────────────────────────
CREATE TABLE pelicula (
  CodPel INT         NOT NULL AUTO_INCREMENT,
  NomPel VARCHAR(50) NOT NULL,
  AnoPel DATE        NOT NULL,
  GenPel VARCHAR(30) NOT NULL,
  SinPel VARCHAR(500) NOT NULL,
  MinPel INT         NOT NULL,
  CONSTRAINT PK_pelicula PRIMARY KEY (CodPel),
  CONSTRAINT UQ_pelicula_NomPel UNIQUE (NomPel)
);

-- ─── Tabla: reino ─────────────────────────────────────────────
CREATE TABLE reino (
  CodRei INT          NOT NULL AUTO_INCREMENT,
  NomRei VARCHAR(50)  NOT NULL,
  UbiRei VARCHAR(100) NOT NULL DEFAULT 'Desconocido',
  AnoRei VARCHAR(50)  NOT NULL DEFAULT 'Desconocido',
  DesRei VARCHAR(500) NOT NULL DEFAULT 'No hay descripción',
  CONSTRAINT PK_reino PRIMARY KEY (CodRei)
);

-- ─── Tabla: personaje ─────────────────────────────────────────
CREATE TABLE personaje (
  CodPer INT          NOT NULL AUTO_INCREMENT,
  NomPer VARCHAR(50)  NOT NULL,
  TipPer VARCHAR(50)  NOT NULL,
  EspPer VARCHAR(50)  NOT NULL DEFAULT 'Desconocido',
  AliPer VARCHAR(50)           DEFAULT 'Desconocido',
  GenPer VARCHAR(15)  NOT NULL,
  DesPer VARCHAR(500) NOT NULL DEFAULT 'No hay descripción',
  ImgPer VARCHAR(500) NOT NULL DEFAULT 'Sin imagen',
  FNacPer VARCHAR(100) NOT NULL DEFAULT 'Desconocida',
  CodRei INT          NOT NULL,
  CONSTRAINT PK_personaje PRIMARY KEY (CodPer),
  CONSTRAINT FK_personaje_reino FOREIGN KEY (CodRei) REFERENCES reino(CodRei)
);

-- ─── Tabla: peli_pers (relación N:M) ──────────────────────────
CREATE TABLE peli_pers (
  CodPel INT NOT NULL,
  CodPer INT NOT NULL,
  CONSTRAINT PK_peli_pers PRIMARY KEY (CodPel, CodPer),
  CONSTRAINT FK_peli_pers_pelicula  FOREIGN KEY (CodPel) REFERENCES pelicula(CodPel),
  CONSTRAINT FK_peli_pers_personaje FOREIGN KEY (CodPer) REFERENCES personaje(CodPer)
);

-- ─── Tabla: cancion ───────────────────────────────────────────
CREATE TABLE cancion (
  CodCan INT          NOT NULL AUTO_INCREMENT,
  NomCan VARCHAR(50)  NOT NULL,
  UrlCan VARCHAR(500) NOT NULL,
  CONSTRAINT PK_cancion PRIMARY KEY (CodCan)
);

-- ─── Tabla: canc_peli (relación N:M) ──────────────────────────
CREATE TABLE canc_peli (
  CodCan INT NOT NULL,
  CodPel INT NOT NULL,
  CONSTRAINT PK_canc_peli PRIMARY KEY (CodCan, CodPel),
  CONSTRAINT FK_canc_peli_cancion  FOREIGN KEY (CodCan) REFERENCES cancion(CodCan),
  CONSTRAINT FK_canc_peli_pelicula FOREIGN KEY (CodPel) REFERENCES pelicula(CodPel)
);

-- ============================================================
-- DATOS
-- ============================================================

INSERT INTO pelicula (NomPel, AnoPel, GenPel, MinPel, SinPel) VALUES 
  ('El Rey León',                      '1994-06-15', 'Aventuras/Drama',       88,  'Tras la muerte de su padre, el pequeño león Simba huye de su reino para aprender el significado de la responsabilidad antes de reclamar su trono.'),
  ('La Bella y la Bestia',             '1991-11-13', 'Romance/Fantasía',      84,  'Una joven brillante acepta ser prisionera de una Bestia en su castillo para salvar a su padre, descubriendo la belleza interior.'),
  ('Aladdín',                          '1992-11-11', 'Aventuras/Musical',     90,  'Un joven callejero encuentra una lámpara mágica con un Genio que le concede tres deseos mientras intenta conquistar a la hija del Sultán.'),
  ('Frozen',                           '2013-11-27', 'Fantasía/Musical',      102, 'La princesa Anna emprende un viaje épico para encontrar a su hermana Elsa, cuyos poderes de hielo han condenado al reino a un invierno eterno.'),
  ('Mulán',                            '1998-06-05', 'Acción/Guerra',         88,  'Una joven se disfraza de hombre para ocupar el lugar de su anciano padre en el ejército imperial y luchar contra los invasores hunos.'),
  ('Zootrópolis',                      '2016-03-04', 'Comedia/Policiaco',     108, 'Una coneja policía y un zorro estafador se alían para resolver una conspiración en una metrópolis de animales.'),
  ('Toy Story',                        '1995-11-22', 'Aventura/Comedia',      81,  'Los juguetes de Andy cobran vida cuando él no está. El vaquero Woody ve amenazado su puesto con la llegada de Buzz Lightyear.'),
  ('Toy Story 2',                      '1999-11-19', 'Aventura/Comedia',      92,  'Woody es secuestrado por un coleccionista y sus amigos deben rescatarlo antes de que sea enviado a un museo en Japón.'),
  ('Blanca Nieves',                    '1937-12-21', 'Fantasía/Musical',      83,  'La primera princesa Disney huye de su malvada madrastra y encuentra refugio en el bosque con siete enanitos mineros.'),
  ('Pocahontas',                       '1995-06-23', 'Drama/Romance',         81,  'La hija de un jefe nativo americano intenta evitar una guerra entre su pueblo y los colonos ingleses.'),
  ('La Cenicienta',                    '1950-02-15', 'Fantasía/Romance',      74,  'Una joven maltratada por su madrastra logra asistir al baile real gracias a su Hada Madrina.'),
  ('Alicia en el país de las maravillas', '1951-07-28', 'Fantasía/Surrealismo', 75, 'Alicia sigue a un conejo blanco y cae en un mundo mágico lleno de personajes excéntricos.'),
  ('El libro de la selva',             '1967-10-18', 'Aventura/Musical',      78,  'Mowgli, un niño criado por lobos, debe abandonar la selva para protegerse del tigre Shere Khan.'),
  ('101 dálmatas',                     '1961-01-25', 'Aventura/Comedia',      79,  'Una pareja de dálmatas debe rescatar a sus cachorros de las manos de la malvada Cruella de Vil.'),
  ('Enredados',                        '2010-11-24', 'Aventura/Musical',      100, 'Rapunzel, una joven con cabello mágico, escapa de su torre con un bandido para ver las linternas flotantes.'),
  ('Indomable',                        '2012-06-22', 'Fantasía/Aventura',     93,  'Mérida, una hábil arquera escocesa, desafía una tradición y debe deshacer una terrible maldición.'),
  ('Pinocho',                          '1940-02-07', 'Fantasía/Aventura',     88,  'Una marioneta de madera debe demostrar que es buena para que el Hada Azul lo convierta en un niño de verdad.'),
  ('Bambi',                            '1942-08-13', 'Drama/Naturaleza',      70,  'Un joven ciervo aprende sobre el amor y la supervivencia en el bosque hasta convertirse en el Gran Príncipe.');

INSERT INTO reino (NomRei, UbiRei, AnoRei, DesRei) VALUES 
  ('Pride Lands',                          'Parque Nacional Hell''s Gate, Kenia',                       'Época contemporánea',    'Ecosistema de sabana africana con llanuras herbáceas, acacias y formaciones rocosas icónicas como la Roca del Rey.'),
  ('Aldea provincial y Castillo de la Bestia', 'Región de Alsacia, Francia',                           'Siglo XVIII',            'Un pintoresco pueblo francés rodeado de campos, y un castillo gótico encantado oculto en un bosque sombrío.'),
  ('Agrabah',                              'Ciudad inspirada en Bagdad y el Taj Mahal',                 'Siglo IX',               'Ciudad desértica a orillas del río Jordán, con un mercado bullicioso y un palacio imponente con cúpulas doradas.'),
  ('Arendelle',                            'Fiordos de Noruega',                                        'Mediados del Siglo XIX', 'Reino costero rodeado de montañas escarpadas, fiordos profundos y arquitectura de madera tipo Stave Church.'),
  ('China Imperial',                       'Ciudad Prohibida y la Gran Muralla China',                  'Dinastía Han',           'Vastos paisajes que incluyen aldeas rurales, montañas nevadas del norte y la majestuosa ciudad imperial.'),
  ('Zootopia',                             'Ciudades modernas como Nueva York y Las Vegas',             'Contemporáneo',          'Metrópolis diseñada por y para animales, con microclimas como la Plaza Sahara y Tundratown.'),
  ('Barrio suburbano de Andy',             'Barrios residenciales de California, EE.UU.',               'Años 90',                'Entorno doméstico cotidiano: habitaciones infantiles, jardines traseros y el restaurante Pizza Planet.'),
  ('Tri-County Area',                      'San Francisco y alrededores',                               'Años 90',                'Zonas urbanas que incluyen jugueterías gigantes y terminales de aeropuertos internacionales.'),
  ('Reino de la Reina y Cabaña de los Enanitos', 'Bosques de Baviera, Alemania',                       'Edad Media',             'Bosques profundos y mágicos, minas de piedras preciosas y castillos de cuentos de hadas europeos.'),
  ('Tsenacommacah (Virginia)',             'Asentamiento de Jamestown, Virginia, EE.UU.',               'Año 1607',               'Naturaleza virgen, ríos caudalosos y bosques frondosos de la costa este americana.'),
  ('Reino Francés',                        'Castillo de Neuschwanstein, Alemania (inspiración)',         'Siglo XIX',              'Grandes fincas rurales y un palacio real de ensueño con jardines perfectamente cuidados.'),
  ('País de las Maravillas',               'Oxford, Inglaterra',                                        'Época Victoriana',       'Mundo onírico y surrealista donde las leyes de la física no aplican; incluye jardines de flores parlantes.'),
  ('Selva de Seoni, India',               'Parque Nacional de Kanha, India',                            'Finales del Siglo XIX',  'Jungla tropical densa con ruinas de templos antiguos, ríos y una biodiversidad salvaje.'),
  ('Londres y Regents Park',              'Londres, Reino Unido',                                       'Años 60',                'Ambiente urbano británico con parques neoclásicos y la sombría mansión Hell Hall en el campo.'),
  ('Corona',                              'Monte Saint-Michel, Francia',                                'Siglo XVIII',            'Un reino insular conectado por un puente a tierra firme, con diseño inspirado en el rococó francés.'),
  ('Tierras Altas de Escocia',            'Castillo de Eilean Donan y Piedras de Callanish',            'Siglo X',                'Paisajes brumosos, colinas verdes, formaciones circulares de piedra y densos bosques de coníferas.'),
  ('Villa Italiana y la Isla de los Juegos', 'Región de Toscana, Italia',                              'Siglo XIX',              'Entorno rural europeo con arquitectura de madera, calles estrechas y un ambiente que mezcla lo acogedor con lo fantástico.'),
  ('El Gran Bosque',                      'Bosques del noreste de Estados Unidos',                      'Sin época definida',     'Ecosistema forestal denso y majestuoso, con claros de hierba alta, arroyos cristalinos y una atmósfera artística única.');

INSERT INTO personaje (NomPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, FNacPer, CodRei) VALUES 
  -- El Rey León (CodRei = 1)
  ('Simba',  'Protagonista', 'León',           'El heredero / Rey de la selva', 'Macho',  'Hijo de Mufasa que huye tras la muerte de su padre y regresa para reclamar el trono.', 'https://ejemplo.com/simba.png',  'Nace al inicio de la película', 1),
  ('Mufasa', 'Secundario',   'León',           'El Gran Rey',                   'Macho',  'Rey sabio y noble que muere traicionado por su hermano Scar.',                          'https://ejemplo.com/mufasa.png', 'Desconocida',                   1),
  ('Scar',   'Villano',      'León',           'El usurpador',                  'Macho',  'Hermano envidioso de Mufasa que se alía con las hienas para tomar el poder.',           'https://ejemplo.com/scar.png',   'Desconocida',                   1),
  ('Nala',   'Secundario',   'Leona',          'Reina Nala',                    'Hembra', 'Amiga de la infancia de Simba y futura reina; valiente y gran cazadora.',              'https://ejemplo.com/nala.png',   'Coetánea a Simba',              1),
  ('Timón',  'Secundario',   'Suricato',       'Mentor Hakuna Matata',          'Macho',  'Pequeño suricato bromista que enseña a Simba el estilo de vida sin preocupaciones.',   'https://ejemplo.com/timon.png',  'Desconocida',                   1),
  ('Pumba',  'Secundario',   'Facóquero',      'El glotón',                     'Macho',  'Jabalí de buen corazón que acompaña a Timón y Simba en sus aventuras.',                'https://ejemplo.com/pumba.png',  'Desconocida',                   1),
  ('Rafiki', 'Secundario',   'Mandril',        'El sabio loco',                 'Macho',  'Místico chamán que guía a Simba hacia su destino real.',                               'https://ejemplo.com/rafiki.png', 'Muy anciano',                   1),
  ('Zazú',   'Secundario',   'Toco de pico rojo', 'Mayordomo Real',            'Macho',  'Pájaro consejero del rey, encargado de mantener el orden y vigilar a los cachorros.',  'https://ejemplo.com/zazu.png',   'Desconocida',                   1),
  -- La Bella y la Bestia (CodRei = 2)
  ('Bella',    'Protagonista', 'Humana',             'Bella',         'Hembra', 'Joven brillante que se convierte en prisionera de la Bestia para salvar a su padre.',  'https://ejemplo.com/bella.png',    'Desconocida',                   2),
  ('Bestia',   'Protagonista', 'Príncipe hechizado', 'Amo',           'Macho',  'Príncipe transformado en monstruo por su falta de bondad; busca redención.',           'https://ejemplo.com/bestia.png',   'Cumple 21 años durante la película', 2),
  ('Gastón',   'Villano',      'Humano',             'Gastón',        'Macho',  'Cazador narcisista que lidera a la turba para atacar el castillo de la Bestia.',      'https://ejemplo.com/gaston.png',   'Desconocida',                   2),
  ('Lumière',  'Secundario',   'Candelabro',         'El anfitrión',  'Macho',  'Sirviente carismático que ayuda a Bella a sentirse como en casa en el castillo.',     'https://ejemplo.com/lumiere.png',  'Desconocida',                   2),
  ('Din-Don',  'Secundario',   'Reloj de mesa',      'El mayordomo',  'Macho',  'Mayordomo del castillo muy puntual y algo nervioso que vigila el orden.',             'https://ejemplo.com/dindon.png',   'Desconocida',                   2),
  ('Sra. Potts', 'Secundario', 'Tetera',             'Sra. Potts',   'Hembra', 'Encargada de la cocina del castillo que cuida de Bella con cariño maternal.',         'https://ejemplo.com/mrspotts.png', 'Desconocida',                   2),
  ('Chip',     'Secundario',   'Taza de té',         'Chip',          'Macho',  'Hijo de la Sra. Potts, siempre curioso y lleno de energía.',                          'https://ejemplo.com/chip.png',     'Desconocida',                   2),
  ('Maurice',  'Secundario',   'Humano',             'El inventor',   'Macho',  'Padre de Bella, un inventor que se pierde en el bosque y termina en el castillo.',    'https://ejemplo.com/maurice.png',  'Desconocida',                   2),
  -- Aladdín (CodRei = 3)
  ('Aladdín',  'Protagonista', 'Humano',          'Príncipe Ali',     'Macho',      'Joven callejero que utiliza su astucia y un genio para conquistar a la princesa.',    'https://ejemplo.com/aladdin.png',  'Desconocida', 3),
  ('Genio',    'Secundario',   'Genio',           'El Genio',         'Macho',      'Ser mágico capaz de alterar la realidad que busca su propia libertad.',                'https://ejemplo.com/genio.png',    'Desconocida', 3),
  ('Jasmine',  'Protagonista', 'Humana',          'Princesa Jasmine', 'Hembra',     'Princesa de Agrabah que lucha contra las leyes injustas de su reino.',                'https://ejemplo.com/jasmine.png',  'Desconocida', 3),
  ('Jafar',    'Villano',      'Humano',          'Gran Visir',       'Macho',      'Hechicero hambriento de poder que intenta derrocar al Sultán.',                       'https://ejemplo.com/jafar.png',    'Desconocida', 3),
  ('Abú',      'Secundario',   'Mono',            'Abú',              'Macho',      'Pequeño mono capuchino y mejor amigo de Aladdín con gran habilidad para el robo.',   'https://ejemplo.com/abu.png',      'Desconocida', 3),
  ('Iago',     'Secundario',   'Loro',            'Iago',             'Macho',      'Pájaro parlante con personalidad amargada que sirve como espía de Jafar.',           'https://ejemplo.com/iago.png',     'Desconocida', 3),
  ('Alfombra', 'Secundario',   'Alfombra mágica', 'Alfombra',         'No definido','Objeto encantado con personalidad propia que rescata a los protagonistas.',          'https://ejemplo.com/alfombra.png', 'Desconocida', 3),
  ('Sultán',   'Secundario',   'Humano',          'Sultán',           'Macho',      'Gobernante amante de los juguetes que solo desea que su hija sea feliz.',            'https://ejemplo.com/sultan.png',   'Desconocida', 3),
  -- Frozen (CodRei = 4)
  ('Elsa',        'Protagonista', 'Humana',          'Reina de las Nieves', 'Hembra', 'Reina con poderes criogénicos que lucha por controlar su magia y proteger su reino.', 'https://ejemplo.com/elsa.png',        'Desconocida', 4),
  ('Anna',        'Protagonista', 'Humana',          'Princesa Anna',       'Hembra', 'Joven entusiasta y decidida que busca restaurar el vínculo con su hermana Elsa.',     'https://ejemplo.com/anna.png',        'Desconocida', 4),
  ('Olaf',        'Secundario',   'Muñeco de nieve', 'Olaf',               'Macho',  'Ser mágico creado por Elsa que aporta humor y lealtad al grupo.',                     'https://ejemplo.com/olaf.png',        'Desconocida', 4),
  ('Kristoff',    'Protagonista', 'Humano',          'Kristoff',           'Macho',  'Montañés experto en supervivencia que se enamora de Anna durante el viaje.',          'https://ejemplo.com/kristoff.png',    'Desconocida', 4),
  ('Sven',        'Secundario',   'Reno',            'Sven',               'Macho',  'Reno trabajador con personalidad de perro que acompaña siempre a Kristoff.',          'https://ejemplo.com/sven.png',        'Desconocida', 4),
  ('Hans',        'Villano',      'Humano',          'Príncipe Hans',      'Macho',  'Antagonista manipulador que busca el trono mediante el engaño y la traición.',         'https://ejemplo.com/hans.png',        'Desconocida', 4),
  ('Pabbie',      'Secundario',   'Troll',           'Gran Pabbie',        'Macho',  'Anciano sabio que comprende la cura para el corazón congelado.',                      'https://ejemplo.com/pabbie.png',      'Desconocida', 4),
  ('Malvavisco',  'Secundario',   'Monstruo de nieve','Marshmallow',       'Macho',  'Enorme criatura de hielo que sirve como guardaespaldas de la Reina Elsa.',            'https://ejemplo.com/marshmallow.png', 'Desconocida', 4);

-- Relaciones personaje ↔ película
INSERT INTO peli_pers (CodPel, CodPer) VALUES
  -- El Rey León (CodPel=1)
  (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),
  -- La Bella y la Bestia (CodPel=2)
  (2,9),(2,10),(2,11),(2,12),(2,13),(2,14),(2,15),(2,16),
  -- Aladdín (CodPel=3)
  (3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),
  -- Frozen (CodPel=4)
  (4,25),(4,26),(4,27),(4,28),(4,29),(4,30),(4,31),(4,32),
  -- Toy Story y Toy Story 2 comparten personajes (ejemplo)
  (7,5),(7,6),   -- Timón y Pumba también en Toy Story (ejemplo ilustrativo)
  (8,5),(8,6);   -- y en Toy Story 2
