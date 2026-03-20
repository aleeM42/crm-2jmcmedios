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
