-- ==============================================
-- Seed: Lugares de Venezuela (básico para desarrollo)
-- Estructura jerárquica: País → Estado → Ciudad
-- ==============================================

-- País
INSERT INTO LUGAR (id, nombre, tipo, descripcion)
VALUES (1, 'Venezuela', 'pais', 'República Bolivariana de Venezuela')
ON CONFLICT (id) DO NOTHING;

-- Estados
INSERT INTO LUGAR (id, nombre, tipo, descripcion, fk_lugar) VALUES
  (2, 'Distrito Capital',   'estado', 'Distrito Capital',   1),
  (3, 'Miranda',            'estado', 'Estado Miranda',     1),
  (4, 'Carabobo',           'estado', 'Estado Carabobo',    1),
  (5, 'Zulia',              'estado', 'Estado Zulia',       1),
  (6, 'Anzoátegui',         'estado', 'Estado Anzoátegui',  1),
  (7, 'Lara',               'estado', 'Estado Lara',        1),
  (8, 'Aragua',             'estado', 'Estado Aragua',      1),
  (9, 'Bolívar',            'estado', 'Estado Bolívar',     1),
  (10, 'Táchira',           'estado', 'Estado Táchira',     1),
  (11, 'Mérida',            'estado', 'Estado Mérida',      1),
  (12, 'Falcón',            'estado', 'Estado Falcón',      1),
  (13, 'Barinas',           'estado', 'Estado Barinas',     1),
  (14, 'Portuguesa',        'estado', 'Estado Portuguesa',  1),
  (15, 'Monagas',           'estado', 'Estado Monagas',     1),
  (16, 'Sucre',             'estado', 'Estado Sucre',       1),
  (17, 'Trujillo',          'estado', 'Estado Trujillo',    1),
  (18, 'Nueva Esparta',     'estado', 'Estado Nueva Esparta', 1),
  (19, 'Yaracuy',           'estado', 'Estado Yaracuy',     1),
  (20, 'Guárico',           'estado', 'Estado Guárico',     1),
  (21, 'Apure',             'estado', 'Estado Apure',       1),
  (22, 'Cojedes',           'estado', 'Estado Cojedes',     1),
  (23, 'Vargas',            'estado', 'Estado Vargas (La Guaira)', 1),
  (24, 'Delta Amacuro',     'estado', 'Estado Delta Amacuro', 1),
  (25, 'Amazonas',          'estado', 'Estado Amazonas',    1)
ON CONFLICT (id) DO NOTHING;

-- Ciudades principales
INSERT INTO LUGAR (id, nombre, tipo, descripcion, fk_lugar) VALUES
  (100, 'Caracas',          'ciudad', 'Capital de Venezuela',             2),
  (101, 'Los Teques',       'ciudad', 'Capital de Miranda',              3),
  (102, 'Guarenas',         'ciudad', 'Ciudad de Miranda',               3),
  (103, 'Guatire',          'ciudad', 'Ciudad de Miranda',               3),
  (104, 'Valencia',         'ciudad', 'Capital de Carabobo',             4),
  (105, 'Maracaibo',        'ciudad', 'Capital de Zulia',                5),
  (106, 'Barcelona',        'ciudad', 'Capital de Anzoátegui',           6),
  (107, 'Puerto La Cruz',   'ciudad', 'Ciudad de Anzoátegui',            6),
  (108, 'Barquisimeto',     'ciudad', 'Capital de Lara',                 7),
  (109, 'Maracay',          'ciudad', 'Capital de Aragua',               8),
  (110, 'Ciudad Bolívar',   'ciudad', 'Capital de Bolívar',              9),
  (111, 'Puerto Ordaz',     'ciudad', 'Ciudad de Bolívar',               9),
  (112, 'San Cristóbal',    'ciudad', 'Capital de Táchira',              10),
  (113, 'Mérida',           'ciudad', 'Capital de Mérida',               11),
  (114, 'Coro',             'ciudad', 'Capital de Falcón',               12),
  (115, 'Punto Fijo',       'ciudad', 'Ciudad de Falcón',                12),
  (116, 'Barinas',          'ciudad', 'Capital de Barinas',              13),
  (117, 'Acarigua',         'ciudad', 'Ciudad de Portuguesa',            14),
  (118, 'Maturín',          'ciudad', 'Capital de Monagas',              15),
  (119, 'Cumaná',           'ciudad', 'Capital de Sucre',                16),
  (120, 'Porlamar',         'ciudad', 'Capital de Nueva Esparta',        18)
ON CONFLICT (id) DO NOTHING;

-- Resetear la secuencia para evitar conflictos con futuros INSERT sin id
SELECT setval('lugar_id_seq', (SELECT MAX(id) FROM lugar));
