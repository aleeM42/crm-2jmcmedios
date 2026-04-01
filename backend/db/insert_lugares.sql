-- =========================================================
-- INSERTS PARA LA TABLA LUGAR (Jerarquía Estricta: Region -> Estado -> Ciudad)
-- =========================================================
-- 1. REGIONES (Padres principales, fk_lugar = NULL)
INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) VALUES
('Capital', 'Region', 'Región Capital', NULL),
('Central', 'Region', 'Región Central', NULL),
('Centro Occidental', 'Region', 'Región Centro Occidental', NULL),
('Guayana', 'Region', 'Región Guayana', NULL),
('Los Andes', 'Region', 'Región de Los Andes', NULL),
('Los Llanos', 'Region', 'Región de Los Llanos', NULL), 
('Oriental', 'Region', 'Región Oriental', NULL),
('Zuliana', 'Region', 'Región Zuliana', NULL);

INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) 
VALUES ('No Especificado', 'Region', 'Lugar genérico para coberturas N/T', NULL);
-- 2. ESTADOS (Hijos de las Regiones)
-- Región Capital (1)
INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) VALUES
('Distrito Capital', 'Estado', 'Entidad Federal Distrito Capital', (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region')),
('La Guaira', 'Estado', 'Estado La Guaira', (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region')),
('Miranda', 'Estado', 'Estado Miranda', (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region')),
-- Región Central (2)
('Aragua', 'Estado', 'Estado Aragua', (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region')),
('Carabobo', 'Estado', 'Estado Carabobo', (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region')),
('Cojedes', 'Estado', 'Estado Cojedes', (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region')),
-- Región Centro Occidental (3)
('Falcón', 'Estado', 'Estado Falcón', (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region')),
('Lara', 'Estado', 'Estado Lara', (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region')),
('Portuguesa', 'Estado', 'Estado Portuguesa', (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region')),
('Yaracuy', 'Estado', 'Estado Yaracuy', (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region')),
-- Región Guayana (4)
('Amazonas', 'Estado', 'Estado Amazonas', (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region')),
('Delta Amacuro', 'Estado', 'Estado Delta Amacuro', (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region')),
('Bolívar', 'Estado', 'Estado Bolívar', (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region')),
-- Región Los Andes (5)
('Barinas', 'Estado', 'Estado Barinas', (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region')),
('Mérida', 'Estado', 'Estado Mérida', (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region')),
('Táchira', 'Estado', 'Estado Táchira', (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region')),
('Trujillo', 'Estado', 'Estado Trujillo', (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region')),
-- Región Los Llanos (6)
('Apure', 'Estado', 'Estado Apure', (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region')),
('Guárico', 'Estado', 'Estado Guárico', (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region')),
-- Región Oriente (7)
('Anzoátegui', 'Estado', 'Estado Anzoátegui', (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region')),
('Nueva Esparta', 'Estado', 'Estado Nueva Esparta', (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region')),
('Sucre', 'Estado', 'Estado Sucre', (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region')),
('Monagas', 'Estado', 'Estado Monagas', (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region')),
-- Región Zuliana (8)
('Zulia', 'Estado', 'Estado Zulia', (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region'));
-- 3. Ciudades 
INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) VALUES
-- Región Capital
--Distrito capital
('Caracas', 'Ciudad', 'Ciudad de Caracas', (SELECT id FROM LUGAR WHERE nombre = 'Distrito Capital' AND tipo = 'Estado')),
--La Guaira
('La Guaira', 'Ciudad', 'Ciudad de La Guaira', (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado')),
('Litoral Central', 'Ciudad', 'Ciudad de Litoral Central', (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado')),
('Maiquetía', 'Ciudad', 'Ciudad de Maiquetía', (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado')),
--Miranda
('Carrizal', 'Ciudad', 'Ciudad de Carrizal', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('San Antonio de los Altos', 'Ciudad', 'Ciudad de San Antonio de los Altos', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Los Teques', 'Ciudad', 'Ciudad de Los Teques', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Guarenas', 'Ciudad', 'Ciudad de Guarenas', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Guatire', 'Ciudad', 'Ciudad de Guatire', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Higuerote', 'Ciudad', 'Ciudad de Higuerote', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Santa Teresa del Tuy', 'Ciudad', 'Ciudad de Santa Teresa del Tuy', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Charallave', 'Ciudad', 'Ciudad de Charallave', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
('Cúa', 'Ciudad', 'Ciudad de Cúa', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado')),
-- Región Central
--Aragua
('Maracay', 'Ciudad', 'Ciudad de Maracay', (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado')),
('La Victoria', 'Ciudad', 'Ciudad de La Victoria', (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado')),
--Carabobo
('Valencia', 'Ciudad', 'Ciudad de Valencia', (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado')),
('Puerto Cabello', 'Ciudad', 'Ciudad de Puerto Cabello', (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado')),
--Cojedes
('San Carlos', 'Ciudad', 'Ciudad de San Carlos', (SELECT id FROM LUGAR WHERE nombre = 'Cojedes' AND tipo = 'Estado')),
-- Región Centro Occidental
--Falcón
('Coro', 'Ciudad', 'Ciudad de Coro', (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado')),
('Punto Fijo', 'Ciudad', 'Ciudad de Punto Fijo', (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado')),
('Tucacas', 'Ciudad', 'Ciudad de Tucacas', (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado')),
--Lara
('Barquisimeto', 'Ciudad', 'Ciudad de Barquisimeto', (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado')),
('Carora', 'Ciudad', 'Ciudad de Carora', (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado')),
--Portuguesa
('Acarigua', 'Ciudad', 'Ciudad de Acarigua', (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado')),
('Guanare', 'Ciudad', 'Ciudad de Guanare', (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado')),
--Yaracuy
('San Felipe', 'Ciudad', 'Ciudad de San Felipe', (SELECT id FROM LUGAR WHERE nombre = 'Yaracuy' AND tipo = 'Estado')),
-- Región Guayana
--Bolívar
('Ciudad Bolívar', 'Ciudad', 'Ciudad de Ciudad Bolívar', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
('Puerto Ordaz', 'Ciudad', 'Ciudad de Puerto Ordaz', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
('Upata', 'Ciudad', 'Ciudad de Upata', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
('Guasipati', 'Ciudad', 'Ciudad de Guasipati', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
('La Gran Sabana', 'Ciudad', 'Ciudad de La Gran Sabana', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
('Ciudad Guayana', 'Ciudad', 'Ciudad de Ciudad Guayana', (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado')),
--Delta Amacuro
('Tucupita', 'Ciudad', 'Ciudad de Tucupita', (SELECT id FROM LUGAR WHERE nombre = 'Delta Amacuro' AND tipo = 'Estado')),
--Amazonas
('Puerto Ayacucho', 'Ciudad', 'Ciudad de Puerto Ayacucho', (SELECT id FROM LUGAR WHERE nombre = 'Amazonas' AND tipo = 'Estado')),
-- Región Los Andes
--Barinas
('Barinas', 'Ciudad', 'Ciudad de Barinas', (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado')),
('Barinitas', 'Ciudad', 'Ciudad de Barinitas', (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado')),
--Mérida
('Mérida', 'Ciudad', 'Ciudad de Mérida', (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado')),
('Ejido', 'Ciudad', 'Ciudad de Ejido', (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado')),
('El Vigía', 'Ciudad', 'Ciudad de El Vigía', (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado')),
('Tovar', 'Ciudad', 'Ciudad de Tovar', (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado')),
('Lagunillas', 'Ciudad', 'Ciudad de Lagunillas', (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado')),   
--Táchira
('San Cristóbal', 'Ciudad', 'Ciudad de San Cristóbal', (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado')),
('Táriba', 'Ciudad', 'Ciudad de Táriba', (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado')),
('Guásimos', 'Ciudad', 'Ciudad de Guásimos', (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado')),
('La Fría', 'Ciudad', 'Ciudad de La Fría', (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado')),
('La Grita', 'Ciudad', 'Ciudad de La Grita', (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado')),
--Trujillo
('Trujillo', 'Ciudad', 'Ciudad de Trujillo', (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado')),
('Valera', 'Ciudad', 'Ciudad de Valera', (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado')),
('Boconó', 'Ciudad', 'Ciudad de Boconó', (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado')),
-- Región Los Llanos
--Apure
('San Fernando de Apure', 'Ciudad', 'Ciudad de San Fernando de Apure', (SELECT id FROM LUGAR WHERE nombre = 'Apure' AND tipo = 'Estado')),
('Biruaca', 'Ciudad', 'Ciudad de Biruaca', (SELECT id FROM LUGAR WHERE nombre = 'Apure' AND tipo = 'Estado')),
--Guárico
('San Juan de los Morros', 'Ciudad', 'Ciudad de San Juan de los Morros', (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado')),
('Calabozo', 'Ciudad', 'Ciudad de Calabozo', (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado')),
('Valle de la Pascua', 'Ciudad', 'Ciudad de Valle de la Pascua', (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado')),
-- Región Oriente
--Anzoátegui
('Barcelona', 'Ciudad', 'Ciudad de Barcelona', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
('Puerto La Cruz', 'Ciudad', 'Ciudad de Puerto La Cruz', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
('Lechería', 'Ciudad', 'Ciudad de Lechería', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
('El Tigre', 'Ciudad', 'Ciudad de El Tigre', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
('Anaco', 'Ciudad', 'Ciudad de Anaco', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
('El Tigrito', 'Ciudad', 'Ciudad de El Tigrito', (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado')),
--Nueva Esparta
('Porlamar', 'Ciudad', 'Ciudad de Porlamar', (SELECT id FROM LUGAR WHERE nombre = 'Nueva Esparta' AND tipo = 'Estado')),
--Sucre
('Cumaná', 'Ciudad', 'Ciudad de Cumaná', (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado')),
('Carúpano', 'Ciudad', 'Ciudad de Carúpano', (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado')),
('Güiria', 'Ciudad', 'Ciudad de Güiria', (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado')),
--Monagas
('Maturín', 'Ciudad', 'Ciudad de Maturín', (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado')),
-- Región Zuliana
--Zulia
('Maracaibo', 'Ciudad', 'Ciudad de Maracaibo', (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado')),
('Cabimas', 'Ciudad', 'Ciudad de Cabimas', (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado')),
('Ciudad Ojeda', 'Ciudad', 'Ciudad de Ciudad Ojeda', (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado')),
('Caja Seca', 'Ciudad', 'Ciudad de Caja Seca', (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado')),
('Santa Bárbara del Zulia', 'Ciudad', 'Ciudad de Santa Bárbara del Zulia', (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado'));

INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) VALUES
('Altagracia de Orituco', 'Ciudad', 'Ciudad de Altagracia de Orituco', (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado')),
('Ocumare del Tuy', 'Ciudad', 'Ciudad de Ocumare del Tuy', (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado'));

INSERT INTO LUGAR (nombre, tipo, descripcion, fk_lugar) VALUES
('Tinaquillo', 'Ciudad', 'Ciudad de Tinaquillo', (SELECT id FROM LUGAR WHERE nombre = 'Cojedes' AND tipo = 'Estado'));

--COBERTURAS 

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Caracas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Caracas%' AND tipo ILIKE 'Ciudad' LIMIT 1)),
('La Guaira - Desde Catia la Mar hasta Los Caracas (Antes de subir a la costa)', (SELECT id FROM LUGAR WHERE nombre ILIKE '%La Guaira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Parroquia Catia La Mar hasta Naiguatá', (SELECT id FROM LUGAR WHERE nombre ILIKE '%La Guaira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el estado La Guaira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%La Guaira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el Litoral Central', (SELECT id FROM LUGAR WHERE nombre ILIKE '%La Guaira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Los Teques, Carrizal, San Antonio, Montalban, El Paraíso, Nuevo Circo, Plaza Venezuela, Chacaito, Las Mercedes, Los Naranjos, Cota Mil, Hatillo, Petare, Junquito, Jarillo, Tazón, Autopista Valle-Coche, Paracotos y Valles del Tuy', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('La Gran Caracas, Los Teques, Carrizal, Los Alias, Valles del Tuy, Guárico (San Juan)', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Altos Mirandinos, El Jarillo, La Colonia Tovar, San Casimiro, Valles del Tuy', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Los Teques, Carrizal, San Antonio, Edo Miranda, Suroeste Dtto Capital', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('San Antonio De los Altos y Gran Caracas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Guarenas-Guatire, Caucagua, Higuerote, Distribuidor Metropolitano', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Araira, Guatire, Guarenas, Parte de Petare, Valles del Tuy y Barlovento', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Toda Guarenas, Guatire, Terrazas del Ávila y La Urbina', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Guarenas-Guatire, Barlovento, Higuerote, Distribuidor Metropolitano, Los Teques, Valles del Tuy', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Higuerote, Caucagua, Rio Chico y San José', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valles del Tuy, Municipios Independencia, Paz Castillo y Simón Bolívar, Cristóbal Rojas y Tomás Lander, y la ARC', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valles del Tuy, San Lucía, San José, Este de Cúa, Parte de la Regional del Centro y Los Teques', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1)),
('6 Municipios de los Valles del Tuy y Gran parte de la Autopista Regional del Centro', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Miranda%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Aragua, San Joaquín, Edo Carabobo en la ARC', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Aragua y Carabobo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracay, Mariara, Guacara, Turmero, Cagua, San Cruz, Magdaleno, San Mateo, y Toda la ARC', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Turmero, Santa Rita, Cagua, El Limón y Palo Negro', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracay, además de Turmero, Cagua, Palo Negro, Magdaleno,Santa Cruz, Santa Rita, San Mateo, Mariara, San Joaquín Por la ARC cubre el tramo Peaje de Guacara hasta la represa de Zuata Hacia Ocumare se escucha por casi toda la carretera.', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Aragua, San joaquín y la ARC', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Aragua, Municipios Mariño, Girardot, Mario Briceño, Libertador, Lamas, Linares, Sucre, Zamora y Ciudades: Maracay, El Limón, Palo Negro, Santa Cruz, Turmero, Cagua, y Santa Rita', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Turmero, Intercomunal, Julia, Macaro, Cagua, La Villa, Santa Cruz, San Mateo, Belén y Edo Carabobo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracay, Turmero, Cagua, Villa de Cura, San Mateo, La Victoria, Palo Negeo, Santa Cruz, San Francisco de Asis, Magdalena, Edo Carabobo, San Diego, Guacara, y Toda la ARC', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Ribas, Revenga y Santos Michelena en Aragua', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Aragua%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Carabobo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valencia, Naguanagua, Guacara, Tocuyito, Campo Carabobo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Carabobo (Menos Puerto Cabello) Aragua, Cojedes', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Carabobo, Aragua y Cojedes', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Norte y Sur de Valencia, Naguanagua, San Diego, Los Guayos, Paraparal, Guacara, Ciudad Alianza', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municpio Puerto Cabello y Morón', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo a nivel local, Nacional e Internacional', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Puerto Cabello, Morón y Costas de Falcón, y partes de Tucacas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Carabobo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cojedes, Carabobo, Yaracuy, Lara, Portuguesa, Barinas, Trujillo y Falcón', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Cojedes%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cojedes, Carabobo, Yaracuy, Lara, Portuguesa, Barinas, Guárico y Mérida', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Cojedes%' AND tipo ILIKE 'Estado' LIMIT 1));
INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Costa Oriental del Edo Falcón, Municipios Colina, Zamora, Tocopero, y Píritu', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipios de la Península de Paraguaná', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Mon Señor Uturriza, Cacique Manaure, Edo Falcón, Pto Cabello', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el Municipio Miranda, Occidente Falconeano, Costa Oriental, Península de Paraguaná', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo la ciudad de Coro, Municipio Colinas, La Vela, Tocópero, Cumarebo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Falcón', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Falcón%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Barquisimeto, Rio Claro, Sarare, Cabudare, Yaracuy, Yaritagua, Sabana de Parra, Chivacoa, y San Felipe', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Lara%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Área Metropolitana de Barquismeto, Cabudare y Yaritagua', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Lara%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Lara y Yaracuy', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Lara%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Torres', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Lara%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Torres y Morán', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Lara%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Acarigua, Araure y Portuguesa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Acarigua, Araure, Edo Lara, y parte del Edo Cojedes', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Acarigua y Portuguesa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Guanare, Guanarito, Ospino, San Genaro de Bocononito', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cono Norte y Sur de Portuguesa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Guanare y Portuguesa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Portuguesa%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Yaracuy, San Felipe, Cocorote, Aristidez Bastidas y Nirgua', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Yaracuy%' AND tipo ILIKE 'Estado' LIMIT 1)),
('San Felipe, Cocorote, Bruzual, Veroe, Nirgua, Bejuma, Sucre, Ariste Bastidas, gran parte del Edo Yaracuy', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Yaracuy%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Puerto Ayacuchp, República de Colombia y Cazuarito, Pedro Camejo de Apure y Los Pijaguaos del Edo Bolívar', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Amazonas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Bolívar, Apure, Rio Orinoco, En Colombia, Cazuarito Vichada, Primavera, Puerto Carreño', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Amazonas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el Delta y Sur de Monagas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Delta Amacuro%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Puerto Ordaz, San Felix, Bolívar y Upata', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Ciudad Bolìvar, Municipio Angostura del Orinoco, Ciudad Piar, Ciudad Orinoco y Unare Norte', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Bolivar', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Ciudad Bolívar y Ciudad Orinoco', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Upata - Piar', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Gran Sabana, Comunidades Indígenas, Santa Elena de Uairin', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Bolívar, Delta Amacuro, Monagas, Anzoátegui', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Ciudad Guayana, Pto Ordaz, San Félix, El Callao, El Dorado', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el Municipio Caroní y Monagas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Norte de Bolívar, Sur de Anzoátegui y Monagas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Bolívar%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Barinas, Mérida, Acarigua, Portuguesa, Trujillo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Barinas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo el Edo Barinas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Barinas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Edo Mérida, Zona Panaméricana, y frontera Colombo-Venezolana', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipios Cardenal Quintero, Santos Marquino, Obispo Ramos, Valle del Mocotíes, Zona Norte y parte de la Panaméricana', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Mérida, Táchira, Trujillo, Mucuchies, Tabay, Ejido, Lagunillas, Santa Cruz de Mora, Tovar, Bailadores, Jaji', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Toda la Ciudad Mérida, pueblos adyacentes y zona sur del lago', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Libertador, Campo Elías', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Eje Panamericano, zona Sur del Lago de Maracaibo, Zona Norte de Mérida, parte de trujillo, zona norte y Edo Táchira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Mérida, Táchira y Zulia', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Eje Panamericano, zona sur del lago y gran parte del occidente venezolano', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Santa Cruz de Mora, Estamquez, El Anís Chiguara pueblo nuevo del Sur la Trampa, Lagunillas, San Juan, Ejido Mérida', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Mérida%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipios Jaureguí, Seboruco,José María Vargas, Rómulo Costa, Garcia de Hevia, Ayacucho y Panamericano del Edo Táchira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Llano hasta Santa Bárbara de Barinas, Eje Fronterizo con Colombia hasta Cúcuta y Pamplona', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('San Cristóbal, Cárdenas, Andres Bello, Guásimos, Michelena, Ayacucho, Independencia, parte de la zona del lago sur de maracaibo, el Guayabo y Encontrados', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('17 de 29 municipios del Edo Táchira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Táchira, Parte Alta de Cúcuta los Patios y Villa del Rosario', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('San Cristóbal, Cárdenas, Guásimos, Michelena, Torbes, Córdoba, Fernandez Feo. Municipios Independencia y Junín de Táchira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('San Cristóbal y toda el Área Metropolitana', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio García de Hevia, parte del Municipio Antonio Rómulo Costa y Ayacucho parte Alta', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Guásimos, Cárdenas, San Cristóbal, Andres Bello, Independencia y Córdoba del Edo Táchira', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Táchira%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Trujillo, parte alta, Urdaneta. Andris Bello, La Puerta, zonas de Edo Miranda como Timotes, zonas de la costa oriental del lago como Menegrande', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valera , Escuque, Carvajal, Motatan, Eje Vial, Vía Valera hasta Timotes, La Mesa de Esnujaque y parte de la zona baja', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Trujillo: Valera, Boconó, Timotes, Menegrande y parte de Barinas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Lara-Carora, Zulia, en Mérida pico del Ávila, zona baja del Edo Trujillo y cerca de Caja Seca vía Lara', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Boconó, municipio Campo Elías, Mérida, pueblo llano y algunas zonas limítrofes con el Edo Portuguesa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Trujillo y en los 20 municipios, Mérida por la zona Timotes Picó del Águila, por el otro lado hasta El Vigía, Lara, Carora, Zulia hasta Cabimas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valera y municipios urbanos y sub urbanos circundantes cobertura en los Edos vecinos Zulia y Lara', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Trujillo%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('San Fernando de Apure, Biruaca, Edo Guárico, Camaguan', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Apure%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Barinas, Guárico, Apure, Biruaca', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Apure%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Biruaca, San Fernando, Pedro Camejo en Apure: Camagua y Guayabal en Guárico y Arismendi en Barinas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Apure%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Valle de la Pascua y sus alrededores', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Guárico%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio el Arbolito, Las Mercedes, Chaguaramas, Tucupido. El Socorro. El Jabillo. Valle de la Pascua y parte de Zaraza Edo Guárico', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Guárico%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Todo San Juan de los Morros', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Guárico%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Socorro, Chaguaramas y Valle de la Pascua', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Guárico%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Altagracia de Orítuco, Edo Guárico, Pascua Guaribe. Sombrero, Chguaramas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Guárico%' AND tipo ILIKE 'Estado' LIMIT 1)); 

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Barcelona y Guanta, Pírutu y Puerto Píritu', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Barcelona, Lechería, Puerto La Cruz y Guanta, Pírutu y Puerto Píritu', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Anzoátegui hasta Anaco, Puerto Píritu', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Puerto La Cruz, Barcelona, Guanta, Píritu, Puerto Píritu, Clarines y Lechería', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Barcelona, Lechería, Puerto La Cruz y Guanta', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('El Tigre, El Tigrito, Pariaguan Parye Rural de Cantaura', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Anzoátegui%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maturín y Municipios Adyacentes', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Municipio Maturín, abarca zona centro y municipios adyacentes', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maturín y los municipios Bolívar, Ezequiel Zamora, Cedeño, Caripe, Acosta y Punceres', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Toda la Ciudad de Maturín', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Monagas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maturín y en los municipios; Aguasay, Cedeño, Santa Bárbara, Caripe, la zona Oeste', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maturín', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cubre Matruín y Municipio Punceres, Ezequiel Zamora y Minicipio Bolívar', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maturín, zona norte, Municipio Ezequiel Zamora', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Monagas%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cumaná y zonas foráneas, Parroquias Extraurbanas', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Sucre%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Nueva Esparta, parte de Anzoátegui y Sucre', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Nueva Esparta%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Toda la Isla de Margarita', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Nueva Esparta%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Nueva Esparta, Sucre, Monagas y Puerto La Cruz', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Nueva Esparta%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Margarita, Sucre, Araya y Playa Colorada', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Nueva Esparta%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) VALUES
('Maracaibo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracaibo - Costa Oriental', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracaibo - San Francisco y costa Oriental del Lago', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracaibo, Costa Occidental, San Francisco, Sinamiaca, Concepción, Col, Cabimas, Santa Rita, Puertos de Altagracia, Ciudad Ojeda, Eje Falcón, Zulia hasta Mene Mauroa', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracaibo, San Francisco, Miranda, La Rita', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Maracaibo y San Francisco, la costa oriental del Lago (Santa Rita, Miranda y Cabimas), Zulia, Falcón, Lara y Trujillo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Zulia, Maracaibo, San Francisco, La Rita, La Cañada de Urdaneta, Mara, Miranda entre otros', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Cabimas Costa Oriental', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Colón, Catatumbo, Francisco Javier Pulgar, Obispo Ramos de Lora, y parte de Jesús María Semprum. Zona baja de la carretera Panamericana', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Eje Panamericano del sur del Lago de Maracaibo. Zulia, Mérida y Trujillo', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1)),
('Zulia y los Municipios Tulio Febres Cordero, Justo Briceño y Julio Cesar Salas de Mérida', (SELECT id FROM LUGAR WHERE nombre ILIKE '%Zulia%' AND tipo ILIKE 'Estado' LIMIT 1));

INSERT INTO COBERTURA (descripcion, fk_lugar) 
VALUES ('N/T', (SELECT id FROM LUGAR WHERE nombre = 'No Especificado' LIMIT 1));