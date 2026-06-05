-- ============================================================
--       The API of Wonderland — Base de datos Disney
-- ============================================================

CREATE DATABASE Disney;
USE Disney;

-- ============================================================
--					    CREACIÓN TABLAS
-- ============================================================

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

-- ============================================================
--						          	 DATOS
-- ============================================================

INSERT INTO pelicula (NomPel, AnoPel, GenPel, MinPel, SinPel, ImgPel) VALUES 
  ('El Rey León',                      '1994-06-15', 'Aventuras/Drama',       88,  'Tras la muerte de su padre, el pequeño león Simba huye de su reino para aprender el significado de la responsabilidad antes de reclamar su trono.', '/assets/images/peliculas/peli_ReyLeon.jpeg'),
  ('La Bella y la Bestia',             '1991-11-13', 'Romance/Fantasía',      84,  'Una joven brillante acepta ser prisionera de una Bestia en su castillo para salvar a su padre, descubriendo la belleza interior.', '/assets/images/peliculas/peli_BellaBestia.jpg'),
  ('Frozen',                           '2013-11-27', 'Fantasía/Musical',      102, 'La princesa Anna emprende un viaje épico para encontrar a su hermana Elsa, cuyos poderes de hielo han condenado al reino a un invierno eterno.', '/assets/images/peliculas/peli_Frozen.jpg'),
  ('Toy Story',                        '1995-11-22', 'Aventura/Comedia',      81,  'Los juguetes de Andy cobran vida cuando él no está. El vaquero Woody ve amenazado su puesto con la llegada de Buzz Lightyear.', '/assets/images/peliculas/peli_ToyStory.jpg'),
  ('La Cenicienta',                    '1950-02-15', 'Fantasía/Romance',      74,  'Una joven maltratada por su madrastra logra asistir al baile real gracias a su Hada Madrina.', '/assets/images/peliculas/peli_LaCenicienta.jpg'),
  ('Alicia en el país de las maravillas', '1951-07-28', 'Fantasía/Surrealismo', 75, 'Alicia sigue a un conejo blanco y cae en un mundo mágico lleno de personajes excéntricos.', '/assets/images/peliculas/peli_AliceWonderland.jpg'),
  ('101 dálmatas',                     '1961-01-25', 'Aventura/Comedia',      79,  'Una pareja de dálmatas debe rescatar a sus cachorros de las manos de la malvada Cruella de Vil.', '/assets/images/peliculas/peli_101Dalmatas.jpg'),
  ('Enredados',                        '2010-11-24', 'Aventura/Musical',      100, 'Rapunzel, una joven con cabello mágico, escapa de su torre con un bandido para ver las linternas flotantes.', '/assets/images/peliculas/peli_Rapunzel.jpg'),
  ('Pinocho',                          '1940-02-07', 'Fantasía/Aventura',     88,  'Una marioneta de madera debe demostrar que es buena para que el Hada Azul lo convierta en un niño de verdad.', '/assets/images/peliculas/peli_Pinocho.jpg'),
  ('Bambi',                            '1942-08-13', 'Drama/Naturaleza',      70,  'Un joven ciervo aprende sobre el amor y la supervivencia en el bosque hasta convertirse en el Gran Príncipe.', '/assets/images/peliculas/peli_Bambi.jpg');

INSERT INTO reino (NomRei, UbiRei, AnoRei, DesRei) VALUES 
  ('Pride Lands',                             'Parque Nacional Hell''s Gate, Kenia',             'Época contemporánea',      'Ecosistema de sabana africana con llanuras herbáceas, acacias y formaciones rocosas icónicas como la Roca del Rey.'),
  ('Aldea provincial y Castillo de la Bestia', 'Región de Alsacia, Francia',                      'Siglo XVIII',              'Un pintoresco pueblo francés rodeado de campos, y un castillo gótico encantado oculto en un bosque sombrío.'),
  ('Arendelle',                               'Nærøyfjord, Noruega',                             'Mediados del siglo XIX',   'Reino nórdico situado entre fiordos y montañas, caracterizado por su arquitectura de madera (Stave Church) y su puerto comercial.'),
  ('Tri-County Area',                         'Suburbios de Ohio, Estados Unidos',               'Años 90 (1995)',           'Entorno suburbano contemporáneo con casas residenciales, habitaciones infantiles llenas de juguetes y establecimientos como Pizza Planeta.'),
  ('Reino de Cenicienta',                     'Inspirado en Francia y Baviera',                  'Siglo XIX',                'Un reino europeo clásico con un majestuoso castillo de altas torres, prados verdes y una marcada estética de cuento de hadas francés.'),
  ('País de las Maravillas',                  'Oxford, Inglaterra (Mundo Onírico)',              'Época Victoriana (1865)',  'Un mundo surrealista e ilógico donde las leyes de la física no aplican, lleno de jardines de flores parlantes y castillos de naipes.'),
  ('Londres y alrededores',                   'Regent''s Park, Londres, Reino Unido',            'Finales de los años 50',   'La cosmopolita ciudad de Londres con sus casas señoriales de estilo georgiano, parques neblinosos y granjas rurales en las afueras.'),
  ('Corona',                                  'Mont Saint-Michel, Francia',                      'Siglo XVIII',              'Un reino isleño conectado a tierra firme por un gran puente, con un castillo central imponente y un bosque denso que oculta una torre.'),
  ('Aldea de Geppetto',                       'Región de Toscana, Italia',                       'Finales del siglo XIX',    'Un pintoresco pueblo de montaña italiano con calles empedradas, talleres de carpintería y una atmósfera de cuento de hadas tradicional europeo.'),
  ('El Gran Bosque',                          'Noreste de EE.UU. o Columbia Británica, Canadá',  'Años 40',                  'Un vasto ecosistema forestal norteamericano con arroyos, praderas abiertas y una naturaleza salvaje que cambia con las estaciones.');

  INSERT INTO personaje (NomPer, EdaPer, TipPer, EspPer, AliPer, GenPer, DesPer, ImgPer, CodRei) VALUES 
  -- El Rey León (CodRei = 1)
    ('Simba',               4,   'Protagonista', 'León',              'Rey Sol',       'Masculino',  'León que tras el exilio regresa para reclamar su lugar en el ciclo de la vida.', '/assets/images/personajes/per_Simba.jpg', 1),
    ('Mufasa',              45,  'Secundario',   'León',              'Gran Rey',      'Masculino',  'Rey sabio y majestuoso de las Tierras del Reino y padre de Simba.',             '/assets/images/personajes/per_Mufasa.png', 1),
    ('Scar',                42,  'Villano',      'León',              'Tío Scar',      'Masculino',  'Hermano de Mufasa que busca el trono mediante la traición y el engaño.',        '/assets/images/personajes/per_Scar.jpg',   1),
    ('Nala',                4,   'Protagonista', 'Leona',             'Reina Nala',    'Femenino',   'Valiente leona y amiga de la infancia de Simba que lo convence de volver.',    '/assets/images/personajes/per_Nala.jpeg',   1),
    ('Timón',               25,  'Secundario',   'Suricato',          'Timón',         'Masculino',  'Suricato ocurrente que vive bajo la filosofía de Hakuna Matata.',              '/assets/images/personajes/per_Timon.jpg',   1),
    ('Pumba',               30,  'Secundario',   'Jabalí verrugoso',  'Pumba',         'Masculino',  'Facóquero bonachón y fiel amigo de Timón con un gran corazón.',                '/assets/images/personajes/per_Pumba.jpg',   1),
    ('Rafiki',              60,  'Secundario',   'Mandril',           'El Chamán',     'Masculino',  'Mandril sabio y excéntrico que actúa como guía espiritual del reino.',         '/assets/images/personajes/per_Rafiki.jpg',  1),
    ('Zazú',                35,  'Secundario',   'Toco de pico rojo', 'Pico de Oro',   'Masculino',  'Ave que sirve como mayordomo real, encargado de mantener el orden.',           '/assets/images/personajes/per_Zazu.jfif',   1),
    ('Sarabi',              40,  'Secundario',   'Leona',             'Reina Madre',   'Femenino',   'Reina consorte de Mufasa y madre de Simba, líder de las leonas cazadoras.',    '/assets/images/personajes/per_Sarabi.jpg',  1),
    ('Shenzi',              30,  'Villano',      'Hiena manchada',    'Líder Hiena',   'Femenino',   'La astuta y despiadada líder del clan de las hienas que sirve a Scar.',        '/assets/images/personajes/per_Shenzi.jpg',  1),

    -- La Bella y la Bestia (CodRei = 2)
    ('Bella',               17,  'Protagonista', 'Humano',            'Bella',         'Femenino',   'Joven inteligente y amante de los libros que busca aventuras más allá aldea.',  '/assets/images/personajes/per_Bella.jpg',  2),
    ('Bestia',              21,  'Protagonista', 'Bestia',            'Príncipe Adam', 'Masculino',  'Príncipe egoísta transformado en una criatura que debe aprender a amar.',       '/assets/images/personajes/per_Bestia.png', 2),
    ('Gastón',              25,  'Villano',      'Humano',            'Cazador',       'Masculino',  'Cazador arrogante y narcisista que está obsesionado con casarse con Bella.',   '/assets/images/personajes/per_Gaston.jpg',  2),
    ('Lumière',             40,  'Secundario',   'Candelabro',        'Maître',        'Masculino',  'Maître del castillo convertido en candelabro, hospitalario y carismático.',    '/assets/images/personajes/per_Lumiere.jpg', 2),
    ('Dindón',              50,  'Secundario',   'Reloj',             'Mayordomo',     'Masculino',  'Mayordomo estricto convertido en reloj de mesa, muy puntual y leal.',          '/assets/images/personajes/per_Dindon.jfif', 2),
    ('Sra. Potts',          45,  'Secundario',   'Tetera',            'Ama de llaves', 'Femenino',   'Ama de llaves convertida en tetera, actúa como figura materna para Bella.',    '/assets/images/personajes/per_Potts.jpg',   2),
    ('Chip',                7,   'Secundario',   'Taza',              'Chip',          'Masculino',  'Hijo de la Sra. Potts convertido en una pequeña taza de té con una muesca.',   '/assets/images/personajes/per_Chip.jpg',    2),
    ('Maurice',             60,  'Secundario',   'Humano',            'El Inventor',   'Masculino',  'Padre de Bella, un excéntrico pero cariñoso inventor de la aldea.',            '/assets/images/personajes/per_Maurice.jpg', 2),
    ('Lefou',               24,  'Secundario',   'Humano',            'Secuaz',        'Masculino',  'El torpe y leal seguidor de Gastón que aguanta todos sus abusos.',             '/assets/images/personajes/per_Lefou.jpg',   2),
    ('Plumette',            30,  'Secundario',   'Plumero',           'Babette',       'Femenino',   'Sirvienta del castillo convertida en un plumero elegante y coqueta.',          '/assets/images/personajes/per_Plumette.jpg',2),

    -- Frozen (CodRei = 3)
    ('Elsa',                21,  'Protagonista', 'Humano',            'Reina Nieve',   'Femenino',   'Reina con capacidad de crear hielo, aislada por miedo a sus poderes.',         '/assets/images/personajes/per_Elsa.jpg',      3),
    ('Anna',                18,  'Protagonista', 'Humano',            'Princesa',      'Femenino',   'Valiente y optimista, recorre un largo viaje para salvar a su hermana.',       '/assets/images/personajes/per_Anna.jpg',      3),
    ('Olaf',                3,   'Secundario',   'Muñeco de nieve',   'Olaf',          'Masculino',  'Un muñeco de nieve ingenuo y alegre que ama los abrazos cálidos.',             '/assets/images/personajes/per_Olaf.jpg',      3),
    ('Kristoff',            21,  'Protagonista', 'Humano',            'Montañés',      'Masculino',  'Recolector de hielo solitario que vive en las montañas con su reno Sven.',     '/assets/images/personajes/per_Kristoff.jpg',  3),
    ('Sven',                8,   'Secundario',   'Reno',              'Sven',          'Masculino',  'Reno leal con corazón de perro, es la conciencia de Kristoff.',                '/assets/images/personajes/per_Sven.jpg',      3),
    ('Hans',                23,  'Villano',      'Humano',            'Príncipe Hans', 'Masculino',  'Príncipe que finge amor por Anna para conspirar contra la corona.',            '/assets/images/personajes/per_Hans.png',      3),
    ('Duque de Weselton',   60,  'Villano',      'Humano',            'El Duque',      'Masculino',  'Dignatario arrogante que busca explotar las riquezas de Arendelle.',           '/assets/images/personajes/per_Weselton.jfif', 3),
    ('Pabbie',              200, 'Secundario',   'Troll',             'Gran Pabbie',   'Masculino',  'El anciano y sabio líder de los trolls con conocimientos de magia antigua.',   '/assets/images/personajes/per_Pabbie.jpg',    3),
    ('Oaken',               40,  'Secundario',   'Humano',            'Oaken',         'Masculino',  'Dueño de la tienda y sauna, siempre amable y servicial.',                      '/assets/images/personajes/per_Oaken.jpg',     3),
    ('Malvavisco',          1,   'Secundario',   'Monstruo nieve',    'Marshmallow',   'Masculino',  'Enorme guardaespaldas de nieve creado por Elsa para proteger su palacio.',     '/assets/images/personajes/per_Malva.jpg',3),

    -- Toy Story (CodRei = 4)
    ('Woody',               30,  'Protagonista', 'Muñeco',            'Sheriff',       'Masculino',  'Vaquero de trapo, líder leal de los juguetes y el favorito de Andy.',          '/assets/images/personajes/per_Woody.jpg',   4),
    ('Buzz Lightyear',      35,  'Protagonista', 'Muñeco',            'Guardián',      'Masculino',  'Figura de acción espacial que descubre que es un juguete.',                    '/assets/images/personajes/per_Buzz.jpg',    4),
    ('Andy Davis',          6,   'Secundario',   'Humano',            'Andy',          'Masculino',  'Niño con gran imaginación que es el dueño original de los juguetes.',          '/assets/images/personajes/per_Andy.jpg',    4),
    ('Sid Phillips',        11,  'Villano',      'Humano',            'Torturador',    'Masculino',  'Vecino de Andy que se divierte destruyendo juguetes de forma cruel.',          '/assets/images/personajes/per_Sid.jpg',     4),
    ('Rex',                 5,   'Secundario',   'Muñeco',            'Rex',           'Masculino',  'Tiranosaurio de plástico verde que sufre de una gran ansiedad.',               '/assets/images/personajes/per_Rex.jpeg',     4),
    ('Slinky',              40,  'Secundario',   'Muñeco',            'Slink',         'Masculino',  'Perro salchicha con cuerpo de muelle, es el amigo más fiel de Woody.',         '/assets/images/personajes/per_Slinky.jpg',  4),
    ('Hamm',                10,  'Secundario',   'Muñeco',            'Sr. Chuleta',   'Masculino',  'Hucha de cerdo de porcelana, sabelotodo y con humor sarcástico.',              '/assets/images/personajes/per_Hamm.jpg',    4),
    ('Sr. Patata',          50,  'Secundario',   'Muñeco',            'Cara Papa',     'Masculino',  'Juguete cínico y gruñón con piezas intercambiables siempre alerta.',           '/assets/images/personajes/per_Patata.jpg',4),
    ('Bo Peep',             20,  'Secundario',   'Muñeco',            'Bo',            'Femenino',   'Pastorcita de porcelana, valiente y el interés romántico de Woody.',           '/assets/images/personajes/per_Beep.jpg',  4),
    ('Control',             2,   'Secundario',   'Coche',             'RC',            'Masculino',  'Coche de carreras teledirigido que ayuda en el rescate de Woody y Buzz.',      '/assets/images/personajes/per_Control.jfif',      4),

    -- La Cenicienta (CodRei = 5)
    ('Cenicienta',          19,  'Protagonista', 'Humano',            'Cenerentola',   'Femenino',   'Joven bondadosa obligada a ser sirvienta que sueña con una vida mejor.',       '/assets/images/personajes/per_Cenicienta.jpg',5),
    ('Lady Tremaine',       50,  'Villano',      'Humano',            'Madrastra',     'Femenino',   'Mujer fría que abusa de Cenicienta para favorecer a sus hijas.',               '/assets/images/personajes/per_Tremaine.jpg',5),
    ('Hada Madrina',        70,  'Secundario',   'Hada',              'Madrina',       'Femenino',   'Ser mágico que ayuda a Cenicienta con su hechizo mágico.',                     '/assets/images/personajes/per_Hada.jfif',   5),
    ('Jaq',                 3,   'Secundario',   'Ratón',             'Jaime',         'Masculino',  'Líder de los ratones, es inteligente, rápido y un gran estratega.',            '/assets/images/personajes/per_Jaq.jpg',     5),
    ('Gus',                 2,   'Secundario',   'Ratón',             'Octavio',       'Masculino',  'Ratón regordete y glotón, pero extremadamente leal amigo de Cenicienta.',     '/assets/images/personajes/per_Gus.jpg',     5),
    ('Pájaro Azul',         1,   'Secundario',   'Pájaro',            'Bluey',         'Desconocido','Pequeña ave que ayuda a Cenicienta a vestirse y cantar.',                      '/assets/images/personajes/per_Pajaro.jpg',5),
    ('Príncipe Kit',        21,  'Protagonista', 'Humano',            'Príncipe',      'Masculino',  'Heredero al trono que busca el amor verdadero tras conocer a la joven.',       '/assets/images/personajes/per_Kit.jpg',  5),
    ('Lucifer',             8,   'Villano',      'Gato',              'Lulú',          'Masculino',  'El malvado gato de la madrastra que disfruta atormentando ratones.',           '/assets/images/personajes/per_Lucifer.jpg', 5),
    ('Anastasia',           20,  'Villano',      'Humano',            'Hermastra',     'Femenino',   'Hija menor de Lady Tremaine, torpe y envidiosa.',                              '/assets/images/personajes/per_Anastasia.jfif',5),
    ('Drizella',            21,  'Villano',      'Humano',            'Hermastra',     'Femenino',   'Hija mayor de Lady Tremaine, con carácter agrio y poco talento.',              '/assets/images/personajes/per_Drizella.jfif', 5),

    -- Alicia en el país de las maravillas (CodRei = 6)
    ('Alicia',              10,  'Protagonista', 'Humano',            'Niña',          'Femenino',   'Una niña con imaginación desbordante que cae en un mundo surrealista.',         'https://img.disney.com/alice.jpg',   6),
    ('Reina Corazones',     45,  'Villano',      'Humano',            'Su Majestad',   'Femenino',   'La irascible gobernante con afición por las ejecuciones.',                     'https://img.disney.com/queen.jpg',   6),
    ('Gato Cheshire',       100, 'Secundario',   'Gato',              'Gato Risón',    'Masculino',  'Gato invisible que siempre sonríe y guía a Alicia con acertijos.',             'https://img.disney.com/cheshire.jpg', 6),
    ('Conejo Blanco',       40,  'Secundario',   'Conejo',            'Mensajero',     'Masculino',  'Un conejo obsesionado con el tiempo que siempre llega tarde.',                 'https://img.disney.com/white_rabbit.jpg', 6),
    ('Sombrerero Loco',     35,  'Secundario',   'Humano',            'Sombrerero',    'Masculino',  'Anfitrión de una merienda eterna que celebra los no-cumpleaños.',               'https://img.disney.com/hatter.jpg',  6),
    ('Absolem',             50,  'Secundario',   'Oruga',             'La Oruga',      'Masculino',  'Una oruga azul que cuestiona la identidad de Alicia.',                         'https://img.disney.com/caterpillar.jpg',6),
    ('Picaporte',           99,  'Secundario',   'Objeto',            'Cerradura',     'Masculino',  'Una cerradura parlante que protege la entrada al mundo fantástico.',           'https://img.disney.com/doorknob.jpg', 6),
    ('Rosa Roja',           5,   'Secundario',   'Flor',              'La Flor',       'Femenino',   'Líder de las flores del jardín que confunde a Alicia con maleza.',             'https://img.disney.com/rose.jpg',    6),
    ('As de Corazones',     25,  'Secundario',   'Carta',             'Soldado',       'Masculino',  'Uno de los soldados naipe que sirven a la Reina pintando rosas.',              'https://img.disney.com/card_soldier.jpg', 6),
    ('Liebre de Marzo',     35,  'Secundario',   'Liebre',            'La Liebre',     'Masculino',  'El caótico y disparatado compañero de té del Sombrerero.',                      'https://img.disney.com/march_hare.jpg',6),

    -- 101 dálmatas (CodRei = 7)
    ('Pongo',               5,   'Protagonista', 'Perro',             'Pongo',         'Masculino',  'Dálmata astuto que vive en Londres y organiza el rescate de sus hijos.',       'https://img.disney.com/pongo.jpg',   7),
    ('Perdita',             5,   'Protagonista', 'Perro',             'Perdy',         'Femenino',   'Madre dálmata valiente que recorre kilómetros para recuperar a su camada.',    'https://img.disney.com/perdita.jpg', 7),
    ('Cruella de Vil',      45,  'Villano',      'Humano',            'Cruella',       'Femenino',   'Diseñadora cruel obsesionada con hacer abrigos de piel de dálmata.',           'https://img.disney.com/cruella.jpg', 7),
    ('Roger Radcliffe',     30,  'Secundario',   'Humano',            'Roger',         'Masculino',  'Músico y compositor, dueño original de Pongo y esposo de Anita.',              'https://img.disney.com/roger.jpg',   7),
    ('Anita Radcliffe',     28,  'Secundario',   'Humano',            'Anita',         'Femenino',   'Antigua compañera de Cruella y la cariñosa dueña de Perdita.',                 'https://img.disney.com/anita.jpg',   7),
    ('Sargento Tibbs',      4,   'Secundario',   'Gato',              'Tibbs',         'Masculino',  'Gato disciplinado que ayuda a los dálmatas a escapar de la mansión.',           'https://img.disney.com/tibbs.jpg',   7),
    ('Coronel',             10,  'Secundario',   'Perro',             'Coronel',       'Masculino',  'Viejo perro pastor que dirige la red del "ladrido nocturno".',                 'https://img.disney.com/colonel.jpg', 7),
    ('Jasper',              35,  'Villano',      'Humano',            'Ladrón',        'Masculino',  'El más alto y astuto de los hermanos Badún contratados por Cruella.',          'https://img.disney.com/jasper.jpg',  7),
    ('Horace',              32,  'Villano',      'Humano',            'Ladrón',        'Masculino',  'El hermano Badún más bajo y torpe con constante apetito.',                     'https://img.disney.com/horace.jpg',  7),
    ('Capitán',             8,   'Secundario',   'Caballo',           'Capitán',       'Masculino',  'Caballo de granja que ayuda en las operaciones de rescate.',                   'https://img.disney.com/captain.jpg', 7),

  -- Enredados (CodRei = 8)
    ('Rapunzel',        18,  'Protagonista', 'Humano',   'Rubia',        'Femenino',  'Princesa de cabello mágico que busca ver las linternas flotantes.',           'https://img.disney.com/rapunzel.jpg',   8),
    ('Flynn Rider',     26,  'Protagonista', 'Humano',   'Eugene',       'Masculino', 'Ladrón encantador que ayuda a Rapunzel a descubrir su pasado.',             'https://img.disney.com/flynn.jpg',      8),
    ('Madre Gothel',    400, 'Villano',      'Humano',   'Madre',        'Femenino',  'Mujer que mantiene a Rapunzel cautiva para usar su magia y ser joven.',     'https://img.disney.com/gothel.jpg',     8),
    ('Pascal',          5,   'Secundario',   'Camaleón', 'Pascal',       'Masculino', 'Pequeño y protector mejor amigo de Rapunzel, capaz de cambiar de color.',   'https://img.disney.com/pascal.jpg',     8),
    ('Maximus',         10,  'Secundario',   'Caballo',  'Max',          'Masculino', 'Caballo de la guardia real con un sentido del deber implacable.',           'https://img.disney.com/maximus.jpg',    8),
    ('Gancho',          45,  'Secundario',   'Humano',   'Garfio',       'Masculino', 'Rufián de la taberna que sueña con ser un pianista concertista.',           'https://img.disney.com/hookhand.jpg',   8),
    ('Rey Frederic',    50,  'Secundario',   'Humano',   'Rey',          'Masculino', 'Padre de Rapunzel y soberano de Corona, que nunca dejó de buscarla.',       'https://img.disney.com/frederic.jpg',   8),
    ('Reina Arianna',   48,  'Secundario',   'Humano',   'Reina',        'Femenino',  'Madre de Rapunzel, cuyo amor dio origen a la tradición de las linternas.',  'https://img.disney.com/arianna.jpg',    8),
    ('Stabbington 1',   35,  'Villano',      'Humano',   'Hermano',      'Masculino', 'Uno de los hermanos criminales que buscan vengarse de Flynn Rider.',        'https://img.disney.com/stabbington.jpg',8),
    ('Narizotas',       40,  'Secundario',   'Humano',   'Narizotas',    'Masculino', 'Rufián con una gran nariz que sueña con encontrar el amor verdadero.',      'https://img.disney.com/big_nose.jpg',   8),

  -- Pinocho (CodRei = 9)
    ('Pinocho',         1,   'Protagonista', 'Muñeco',   'Pino',         'Masculino', 'Marioneta de madera que cobra vida y desea convertirse en un niño de verdad.', 'https://img.disney.com/pinocchio.jpg',  9),
    ('Pepito Grillo',   40,  'Protagonista', 'Grillo',   'Conciencia',   'Masculino', 'Pequeño grillo asignado para ser la conciencia y guía moral de Pinocho.',      'https://img.disney.com/jiminy.jpg',     9),
    ('Geppetto',        65,  'Secundario',   'Humano',   'Papá',         'Masculino', 'Amable y solitario carpintero que crea a Pinocho y lo ama como a un hijo.',   'https://img.disney.com/geppetto.jpg',   9),
    ('Hada Azul',       100, 'Secundario',   'Hada',     'Hada',         'Femenino',  'Ser mágico que da vida a Pinocho y premia su valentía y honestidad.',         'https://img.disney.com/bluefairy.jpg',  9),
    ('Fígaro',          3,   'Secundario',   'Gato',     'Gatito',       'Masculino', 'El tierno y a veces celoso gato mascota de Geppetto.',                        'https://img.disney.com/figaro.jpg',     9),
    ('Cleo',            2,   'Secundario',   'Pez',      'Cleo',         'Femenino',  'La coqueta pez dorada que vive en una pecera en el taller de Geppetto.',      'https://img.disney.com/cleo.jpg',       9),
    ('Honrado Juan',    45,  'Villano',      'Zorro',    'Juan',         'Masculino', 'Zorro estafador que engaña a Pinocho para venderlo al teatro de marionetas.', 'https://img.disney.com/honestjohn.jpg', 9),
    ('Gedeón',          40,  'Villano',      'Gato',     'Gedeón',       'Masculino', 'El torpe y mudo compañero felino del Honrado Juan en sus fechorías.',         'https://img.disney.com/gideon.jpg',     9),
    ('Stromboli',       50,  'Villano',      'Humano',   'Titiritero',   'Masculino', 'Dueño de marionetas cruel y ambicioso que esclaviza a Pinocho.',              'https://img.disney.com/stromboli.jpg',  9),
    ('Polilla',         10,  'Secundario',   'Humano',   'Lampwick',     'Masculino', 'Niño rebelde que induce a Pinocho a portarse mal en la Isla de los Juegos.',  'https://img.disney.com/lampwick.jpg',   9),

  -- Bambi (CodRei = 10)
    ('Bambi',           2,   'Protagonista', 'Ciervo',   'Príncipe',     'Masculino', 'Joven ciervo destinado a convertirse en el Gran Príncipe del Bosque.',        'https://img.disney.com/bambi.jpg',     10),
    ('Tambor',          2,   'Secundario',   'Conejo',   'Thumper',      'Masculino', 'Conejo enérgico y simpático que enseña a Bambi las lecciones del bosque.',    'https://img.disney.com/thumper.jpg',   10),
    ('Flor',            2,   'Secundario',   'Mofeta',   'Flor',         'Masculino', 'Mofeta tímida y dulce que entabla una gran amistad con Bambi y Tambor.',      'https://img.disney.com/flower.jpg',    10),
    ('Faline',          2,   'Protagonista', 'Cierva',   'Faline',       'Femenino',  'Cierva joven que se convierte en el interés romántico y compañera de Bambi.', 'https://img.disney.com/faline.jpg',    10),
    ('Gran Príncipe',   12,  'Secundario',   'Ciervo',   'Guardián',     'Masculino', 'El respetado y serio padre de Bambi, protector de todos los animales.',       'https://img.disney.com/great_prince.jpg',10),
    ('Madre de Bambi',  6,   'Secundario',   'Cierva',   'Madre',        'Femenino',  'Figura cariñosa que guía a Bambi en sus primeros años antes de la tragedia.', 'https://img.disney.com/bambi_mother.jpg',10),
    ('Amigo Búho',      40,  'Secundario',   'Búho',     'Sabio',        'Masculino', 'Ave anciana y algo gruñona que aconseja a los jóvenes sobre el amor.',         'https://img.disney.com/owl.jpg',       10),
    ('Ronno',           3,   'Villano',      'Ciervo',   'Rival',        'Masculino', 'Ciervo hostil que compite contra Bambi por el afecto de Faline.',             'https://img.disney.com/ronno.jpg',     10),
    ('El Hombre',       30,  'Villano',      'Humano',   'Cazador',      'Masculino', 'Amenaza invisible que representa el peligro constante para el bosque.',       'https://img.disney.com/man.jpg',       10),
    ('Hermanas Tambor', 1,   'Secundario',   'Conejo',   'Hermanitas',   'Femenino',  'Las pequeñas hermanas de Tambor que siempre lo siguen y lo corrigen.',        'https://img.disney.com/sisters.jpg',   10);


INSERT INTO peli_pers (CodPel, CodPer) VALUES
-- El Rey León (CodPel=1)
  (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),

-- La Bella y la Bestia (CodPel=2)
  (2,11),(2,12),(2,13),(2,14),(2,15),(2,16),(2,17),(2,18),(2,19),(2,20),

-- Frozen (CodPel=3)
  (3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),

-- Toy Story (Personajes 31 al 40)
  (4,31),(4,32),(4,33),(4,34),(4,35),(4,36),(4,37),(4,38),(4,39),(4,40),

-- La Cenicienta (Personajes 41 al 50)
  (5,41),(5,42),(5,43),(5,44),(5,45),(5,46),(5,47),(5,48),(5,49),(5,50),

-- Alicia en el país de las maravillas (Personajes 51 al 60)
  (6,51),(6,52),(6,53),(6,54),(6,55),(6,56),(6,57),(6,58),(6,59),(6,60),

-- 101 dálmatas (Personajes 61 al 70)
  (7,61),(7,62),(6,63),(7,64),(7,65),(7,66),(7,67),(7,68),(7,69),(7,70),

-- Enredados (Personajes 71 al 80)
  (8,71),(8,72),(8,73),(8,74),(8,75),(8,76),(8,77),(8,78),(8,79),(8,80),

-- Pinocho (Personajes 81 al 90)
  (9,81),(9,82),(9,83),(9,84),(9,85),(9,86),(9,87),(9,88),(9,89),(9,90),

-- Bambi (Personajes 91 al 100)
  (10,91),(10,92),(10,93),(10,94),(10,95),(10,96),(10,97),(10,98),(10,99),(10,100);

  INSERT INTO cancion (NomCan) VALUES 
-- El Rey León
  ('El Ciclo de la Vida'),
  ('Voy a ser el Rey León'),
  ('Preparaos'),
  ('Hakuna Matata'),
  ('Es la noche del amor'),

-- La Bella y la Bestia
  ('Bella'),
  ('Gastón'),
  ('¡Qué festín!'),
  ('Algo nuevo'),
  ('La Bella y la Bestia'),
  ('Asalto al castillo'),

-- Frozen
  ('Helado Corazón'),
  ('¿Y si hacemos un muñeco?'),
  ('Finalmente y como nunca'),
  ('La puerta es el amor'),
  ('Libre Soy'),
  ('Renos mejores que humanos'),
  ('Verano'),
  ('Reparaciones'),

-- Toy Story
  ('Hay un amigo en mí'),
  ('Cosas extrañas'),
  ('No navegaré nunca más'),

-- La Cenicienta
  ('Cenicienta'),
  ('Soñar es desear'),
  ('Canta ruiseñor'),
  ('La canción del trabajo'),
  ('Bibbidi-Bobbidi-Boo'),
  ('Esto es amor'),

-- Alicia en el país de las maravillas
  ('Alicia en el país de las maravillas'),
  ('En mi propio jardín'),
  ('El Conejo Blanco'),
  ('La carrera sin sentido'),
  ('Soy pequeñito'),
  ('Lo que digan las flores'),
  ('A-E-I-O-U'),
  ('Feliz No Cumpleaños'),
  ('Pintad las rosas de rojo'),

-- 101 dálmatas
  ('Cruella de Vil'),
  ('La Casa de los Dálmatas'),
  ('Melodía de Kanine Krunchies'),

-- Enredados
  ('Cuándo empezaré a vivir'),
  ('Madre sabe más'),
  ('Mi sueño es'),
  ('Por fin ya veo la luz'),
  ('Algo quiero'),
  ('Encantamiento de la flor'),

-- Pinocho
  ('La estrella azul'),
  ('Dame un silbidito'),
  ('Pequeña marioneta'),
  ('Sin hilos'),
  ('Hi-Diddle-Dee-Dee'),

-- Bambi
  ('El amor es una canción'),
  ('Gotas de lluvia'),
  ('Canto de la primavera'),
  ('Canción del amor');


INSERT INTO canc_peli (CodCan, CodPel) VALUES -- El Rey León (CodPel = 1)
  (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
-- La Bella y la Bestia (CodPel = 2)
  (6, 2), (7, 2), (8, 2), (9, 2), (10, 2), (11, 2),

-- Frozen (CodPel = 3)
  (12, 3), (13, 3), (14, 3), (15, 3), (16, 3), (17, 3), (18, 3), (19, 3),

-- Toy Story (CodPel = 4)
  (20, 4), (21, 4), (22, 4),

-- La Cenicienta (CodPel = 5)
  (23, 5), (24, 5), (25, 5), (26, 5), (27, 5), (28, 5),

-- Alicia en el país de las maravillas (CodPel = 6)
  (29, 6), (30, 6), (31, 6), (32, 6), (33, 6), (34, 6), (35, 6), (36, 6), (37, 6),

-- 101 dálmatas (CodPel = 7)
  (38, 7), (39, 7), (40, 7),

-- Enredados (CodPel = 8)
  (41, 8), (42, 8), (43, 8), (44, 8), (45, 8), (46, 8),

-- Pinocho (CodPel = 9)
  (47, 9), (48, 9), (49, 9), (50, 9), (51, 9),

-- Bambi (CodPel = 10)
  (52, 10), (53, 10), (54, 10), (55, 10);
