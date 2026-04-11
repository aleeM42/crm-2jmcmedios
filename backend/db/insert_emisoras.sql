-- =========================================================
-- INSERTS PARA ALIADOS_COMERCIALES (Emisoras)
-- Generado automáticamente desde CSVs de datos fiscales y regionales
-- =========================================================


INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  '11Q BROADCASTING C.A',
  'once Q',
  'J305368643',
  '93.7 FM',
  'multitarget',
  'Av. Monseñor sendrea, C.C Colonial, Nivel 2, sector centro, oficina 2 2-2, 2-3, 2-7 San Juan De Los Morros.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo San Juan de los Morros%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CALIENTE STEREO, CA.',
  'Caliente stereo',
  'J400955050',
  '105.9 FM',
  'multitarget',
  'Av. Miranda C/C San Carlos, Edif. Radio Barcelona, Piso PA, Local s/n, barrio palotal. Guarenas Edo. Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guarenas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Guarenas-Guatire, Caucagua, Higuerote, Distribuido%' LIMIT 1)
);



INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'A.H.C.& ASOCIADOS C.A.',
  'Sabor',
  'J070524740',
  '106.5 FM',
  'multitarget',
  'Av. Santa Rita, Edif. Radiolandia, Piso PB, Local No 72-75, Sector Tierra Negra.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracaibo - Costa Oriental%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ACTIVA SERVICIOS PUBLICITARIOS ,C.A',
  'Activa',
  'J504753220',
  '88.9 FM',
  'multitarget',
  'Av. La Costeñera, C.C. Lido, Local 15, Urb. Palmar oeste, Caraballeda.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Parroquia Catia La Mar hasta Naiguatá%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'AMARU GORRIN ANTONIETH BERNAL',
  'El Vacilón',
  'V277557661',
  '106.3 FM',
  'popular',
  'Estación Comercial Matalinda, 1er Nivel, Local L1-28, Charallave, Venezuela',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valles del Tuy, San Lucía, San José, Este de Cúa, %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ACTIVA TELECOMUNICACIONES, C.A',
  'Activa',
  'J501098891',
  '104.5 FM',
  'multitarget',
  'Av. 13 de Junio, Quinta Las Mercedes, sector Araure. Edo. Portuguesa',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Acarigua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Acarigua, Araure, Edo Lara, y parte del Edo Cojede%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ARISTIDES MARTINEZ',
  'Radio Araira',
  'V019937816',
  '93.3 FM',
  'multitarget',
  'Calle Santa Rosalia, casa 40 sector Araira, Edo. Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guatire' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Araira, Guatire, Guarenas, Parte de Petare, Valles%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ANTENA MÓVIL 985, C.A',
  'Buenísima',
  'J507906175',
  '98.5 FM',
  'multitarget',
  'Cr.14 entre calle9 y 10 local  nro.. 9-87, sector  San  Cristobal, Edo. Táchira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Cristóbal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'San Cristóbal, Cárdenas, Guásimos, Michelena, Torb%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'Asoc. Civil sin Fines de Lucro Cutural Alternativa Planeta',
  'Planeta',
  'J299500615',
  '106.7 FM',
  'multitarget',
  'Av. El Terminal C.C Gonzalez Nivel 2 Local 09, Sector entrada Terminal, Caja Seca, Edo.Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Caja Seca' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Eje Panamericano del sur del Lago de Maracaibo. Zu%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ATHENEA BROADCASTING CORPORATION, C.A.',
  'Más Network',
  'J306237984',
  '89.1 FM',
  'multitarget',
  'Av. Lara con calle 13 Qta. Urb. Santa Elena, Barquisimeto',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barquisimeto, Rio Claro, Sarare, Cabudare, Yaracuy%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'BOCONESA 107.3 FM C.A.',
  'Boconesa',
  'J307005548',
  '107.3 FM',
  'popular',
  'Av. 5 de Julio entre Páez y Vargas, Edif. La Coromoto Piso 1 Local 1 Boconó Edo Trujillo.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Boconó' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Boconó, municipio Campo Elías, Mérida, pueblo llan%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'BOLIVARIANA 104.3 FM',
  'Bolivariana',
  'J307427736',
  '104.3 FM',
  'multitarget',
  'Av. Humbolt C/Av. Germania, Local Rossi Nro. 23 Conjunto Residencial Marhuanta. Ciudad Bolívar.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Bolívar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Ciudad Bolìvar, Municipio Angostura del Orinoco, C%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'BONCHONA 107.1 FM JR, C.A.',
  'Bonchona',
  'J406637769',
  '107.1 FM',
  'multitarget',
  'Av. 119 con calle 137, Qta. Bonchona, Nro.137-11, Urb. Prebo III, Valencia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Carabobo, Aragua y Cojedes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'BRISWELL RIOS APONTE',
  'Pachanga',
  'V169359640',
  '104.3 FM',
  'multitarget',
  'Calle El Calvario, casa No 2, sector La Provincia, Ocumare del Tuy.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE '6 Municipios de los Valles del Tuy y Gran parte de%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CAPITAL 99.9 FM',
  'Capital',
  'J400338824',
  '99.9 FM',
  'adulto joven',
  'Carrera 19 entre calles 31 y 32, Qta. NOI, Nro. 31-54, sector Barquisimeto.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Bolívar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Bolivar%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CARLOS ARTURO RUEDA RODRIGUEZ',
  'Campeona',
  'V101578387',
  '96.5 FM',
  'popular',
  'Av.15 Esq. Calle 55 , Sector la Trinidad Casa 15-5 Maracaibo, Edo. Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Cristóbal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Táchira, Parte Alta de Cúcuta los Patios y Villa d%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'SERVICIOS RADIALES CARORA , C.A',
  'Carora',
  'J085216766',
  '99.9 FM',
  'multitarget',
  'Av Ppal Santa Teresa C.C. Santa Teresa 2do Nivel Local L54 Parroquia San Juan Bautista San Cristóbal - Edo. Táchira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carora' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Torres%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CLÁSICOS , C.A',
  'Clásicos',
  'J313279870',
  '102.7 FM',
  'adulto joven',
  'Calle Sucre 5 entre carreras Carabobo y Contreras, Qta. La Casita, Zona Colonial, Carora . Edo. Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Bolívar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Ciudad Bolívar y Ciudad Orinoco%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'COMUNICACIONES F.V.A, C.A',
  'Rumba ',
  'J302965829',
  '100.1 FM',
  'multitarget',
  'Calle Constitucion, Sector Casco Historico, Casa Nª 34, Ciudad Bolivar',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Lara y Yaracuy%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CONEXIÓN GLOBAL C.A',
  'Conexión',
  'J294632270',
  '101.3 FM',
  'multitarget',
  'Av. 8 Santa Rita Edif. Radiolandia Piso PB Local 72-75, Sector Tierra Negra. Maracaibo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Cojedes' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Carlos' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Cojedes, Carabobo, Yaracuy, Lara, Portuguesa, Bari%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CORPORACION ALPHA, C.A',
  'Alpha',
  'J295532326',
  '97.5 FM',
  'juvenil',
  'Av. República , Edif. Hermanos Troti, piso 4, Apto. 8, Ciudad Bolívar . Edo. Bolivar',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Apure' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Biruaca' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Biruaca, San Fernando, Pedro Camejo en Apure: Cama%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CORPORACION RADIO CIUDAD , C.A',
  'Ciudad',
  'J306508511',
  '88.5 FM',
  'multitarget',
  'Av. Intercomunal biruaca, C.C Giagio, Nivel 1, local s/n , sector La Encrucijada, Edo. Apure',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Turmero, Santa Rita, Cagua, El Limón y Palo Negro%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'CORPORACIÓN TURÍSTICA , C.A',
  'Turística',
  'J314646010',
  '92.7 FM',
  'multitarget',
  'Av. Constitución Edif. Pavo, piso1, Ofic. 17, Maracay',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto Ordaz' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Ciudad Guayana, Pto Ordaz, San Félix, El Callao, E%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'DANIEL AGUILAR SANCHEZ',
  'Fascinación',
  'V053435854',
  '105.9 FM',
  'adulto',
  'Av. Pricipal Los Samanes,Edif. 1, piso 1, Apto. 128, Urb. Lago Maracay , Edo. Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Grita' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipios Jaureguí, Seboruco,José María Vargas, R%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'Diego Suarez',
  'Vigía',
  'V190489112',
  '104.1 FM',
  'multitarget',
  'El Vigía, Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'El Vigía' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Eje Panamericano, zona sur del lago y gran parte d%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ELITE , C.A',
  'Elite',
  'J298569247',
  '103.7 FM',
  'multitarget',
  'Carrera 5 , N° 3-94, Sector Casco Central, La Grita Edo. Táchira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guanare' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Guanare y Portuguesa%' LIMIT 1)
);


INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'EMISORA IMAGEN 97.1 FM',
  'Imagen',
  'J301470290',
  '97.1 FM',
  'multitarget',
  'Vigía. Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Higuerote' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'EMISORA TRUJILLO 102.5 FM  C.A',
  'Trujillo',
  'J302548918',
  '102.5 FM',
  'multitarget',
  'Calle Principal, Qta. Colinas de cuarzo no. Elite sector 24 Julio Guanre. Edo. Portuguesa',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Trujillo y en los 20 municipios, Mérida por la zon%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'EMPRENDIMIENTO MAYRET BARRETO',
  'Rumbera',
  'J506925222',
  '98.7 FM',
  'multitarget',
  'Av. Francisco de Miranda entre calle Barquisimeto y Valencia , Edif. Piomar, piso 1, ofic. 1, Caora Edo. Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ES VIA FM C.A',
  'Vía',
  'J404486208',
  '97.7 FM',
  'multitarget',
  'Av. Intercomunal entre San Josè y Rio Chico, Qta. Imagen 97.1, Urb. Rio Chico Edo. Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guatire' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Guarenas-Guatire, Barlovento, Higuerote, Distribui%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FESTIVA, C.A',
  'Festiva',
  'J304873425',
  '99.9 FM',
  'juvenil',
  'Av. Mendoza C.C Don Pedro Nivel PB. Local 13 al 17, Sector Santa Rosa. Edo.Trujillo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Bolívar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Puerto Ordaz, San Felix, Bolívar y Upata%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FM 95.5 C.A',
  'Popular',
  'J070479000',
  '95.5 FM',
  'popular',
  'Calle 60 Edif. Alto Viento piso 13 Apto.13D sector Pueblo Nuevo, Maracaibo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracaibo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FRANCISCO JAVIER TIGRERA ORTEGA',
  'Metrópolis',
  'V198325593',
  '88.1 FM',
  'multitarget',
  'Calle Ppal de Palo Alto CC Parque Esmeralda Nivel PL Urb Buena Vista',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Coro' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo el Municipio Miranda, Occidente Falconeano, C%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION CIVIL COMUNITARIA ALEGRIA',
  'Alegría',
  'J410253797',
  '102.7 FM',
  'popular',
  'Calle Constitución , Local nro 34, Sector Casco Historico, Parroquia Catedral. Ciudad Bolivar',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracay, Mariara, Guacara, Turmero, Cagua, San Cru%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION COMUNITARIA CARRERA 99.9 FM',
  'Carrera',
  'J298793996',
  '100.5 FM',
  'multitarget',
  'Av. Paseo caroni . C.C Naraya nivel 6, local 36, alta vista, Puerto Ordaz',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, Municipios Mariño, Girardot, Mario Briceño%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION COMUNITARIA VENEZUELA NUEVOS TIEMPOS',
  'Positiva',
  'J311303138',
  '92.7 FM',
  'multitarget',
  'Av. Circunvalaciòn Nº 2 con calle 98 D, C.C. Ogaret Shopping Center, Nivel PA Local L-38 L-39, Sector Barrio Bolìvar, Maracaibo. Edo. Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, Municipios Mariño, Girardot, Mario Briceño%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION EMISORA VIDA',
  'Vida',
  'J400328250',
  '98.7 FM',
  'multitarget',
  'Av Los Próceres Local Galpón Nro 4 Zona Indusrial Los Andes Edp. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Fría' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio García de Hevia, parte del Municipio Ant%' LIMIT 1)
);


INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION RADIO ACTIVA',
  'Activa',
  'J309227661',
  '104.9 FM',
  'multitarget',
  'Calle Vargas C/C Calle Rivas , Edif. La Perla, piso2 , Apto. 5, Sector Centro Maracay. Edo. Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'Fundacion sistema Bolivariano de Radio difusion de Aragua radio Aragueña 95.5 fm',
  'Aragueña',
  'G200105631',
  '99.5 FM',
  'multitarget',
  'Calle Acosta Medina CC Santa Cruz nivel6 OF 3 sector San Rafael , Santa Cruz Edo. Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua y Carabobo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'G-91.3 FM RADIO EMISORA C.A',
  'Giga',
  'J305605530',
  '91.3 FM',
  'multitarget',
  'Calles Campos Elias  N-15 casa nro. 15 sector centro María Fernanda  L-6 y 7 Palo Negro Edo. Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'El Vigía' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Mérida, Táchira y Zulia%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'GENTE DE RADIO APLAUSO FM , C.A',
  'Aplauso',
  'J505391631',
  '106.3 FM',
  'adulto',
  'Calle 4 con Carrera 8 Esquina Casa Nª 4-3, Sector Casco Central La Fria, Edo. Tachira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Turmero, Intercomunal, Julia, Macaro, Cagua, La Vi%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'GILBERT AMADOR  WIEDMAN GARCIA',
  'Mcy',
  'V072358640',
  '88.1 FM',
  'multitarget',
  'Av 7 Calle Asisclo Sanchez Casa Nro. 67-65 Sector Lagunillas Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracay, además de Turmero, Cagua, Palo Negro, Mag%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'GRUPO 90 MINUTOS LLANEROS, C.A',
  'Talento',
  'J402067046',
  '102.7 FM',
  'popular',
  'Calle Bolívar, Edif. El Fortin, piso PB, Ofic. s/n sector Centro, Altagracia de Orituco, Edo. Guárico',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valle de la Pascua y sus alrededores%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'GRUPO REDI´L , C.A',
  'Urbana',
  'J402246218',
  '104.9 FM',
  'multitarget',
  'Av. Santo Michelena C.C La Capilla II , Nivel PB, Local6, Sector El Centro, Maracay. Edo Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maturín y los municipios Bolívar, Ezequiel Zamora,%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'GUANAREÑA 98.3 FM, C.A',
  'Guanareña',
  'J309513982',
  '98.3 FM',
  'multitarget',
  'Calle 3 con Av 12 Edif Centro Giga Piso 1 Local 06 Sector El Carmen, El Vigía, Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guanare' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Guanare, Guanarito, Ospino, San Genaro de Bocononi%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'HC 102.7, C.A',
  'Studio',
  'J403226598',
  '102.7 FM',
  'popular',
  'Calle Pasaje Colòn, casa Nª 11, Urb. San Ignacio Edo. Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Toda la Ciudad Mérida, pueblos adyacentes y zona s%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'HEAVEN 23 INVERSIONES, C.A',
  'Agua de Coco',
  'J311639306',
  '96.5 FM',
  'multitarget',
  'Calle Las Flores # 1-2 entre Atarraya y Gonzalez Padròn , Valle la Pascua . Edo. Guarico',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'La Guaira - Desde Catia la Mar hasta Los Caracas (%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES 103.3, C.A.',
  'Orbita',
  'J307395494',
  '103.3 FM',
  'multitarget',
  'Av Alirio Ugarte Pelayo CC E/E Escorpión Nivel 1 Local 4 Sector Tipuro Maturín Edo Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Ojeda' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES AUDIOVISUALES DESAFIO, C.A',
  'Desafio',
  'J315109115',
  '107.3 FM',
  'multitarget',
  'Calle 13 entre Carreras 4 y 5, Barrio Curazao sector Centro, Guanare, Edo. Portuguesa',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guanare' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES CHAMURIANA 96.9 FM C.A',
  'Más Network',
  'J310348600',
  '96.9 FM',
  'multitarget',
  'Calle Prolongacion Av. 2 Lora, Edif. La Florida, piso PB, Local6, Sector El Encanto, Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Punto Fijo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipios de la Península de Paraguaná%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES EL MOMENTO DEL SWING, C.A',
  'Swing Latina',
  'J298538694',
  '88.3 FM',
  'popular',
  'Av. Boulevard Naiguata Edif. Conjunto Residencial Caribe Torre C, piso Mezzanina, Urb. Tanaguarena. Edo La Guaira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Litoral Central' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo el Litoral Central%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES SE OYE FM , C.A',
  'C-Oye',
  'J400147808',
  '89.1 FM',
  'juvenil',
  'Calle Vargas C.C Calandriello , Nivel 3, Local B-04, Zona Casco Central , Ciudad Ojeda. Edo. Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto Cabello' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Puerto Cabello, Morón y Costas de Falcón, y partes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES SONORA LARENSE, C.A',
  'Melodía Stereo',
  'J303378471',
  '97.3 FM',
  'multitarget',
  'Av. Los Proceres C.C Plaza Los Proceres piso 2, Local 5 , Edo. Merida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carora' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES STILO FM C.A',
  'Stilo',
  'J299113387',
  '107.1 FM',
  'multitarget',
  'Centro Comercial La Cascada, Carrizal, Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio el Arbolito, Las Mercedes, Chaguaramas, %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES URBANA 94.3 C.A.',
  'Urbana',
  'J307120916',
  '94.3 FM',
  'multitarget',
  'AV. Prongolacion Giradort, esq. Av. Santa Irene, Punto Fijo. Edo. Falcòn',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guatire' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSIONES FRECUENCIA RADIO 86, C.A',
  'Feeling',
  'J401178456',
  '97.1 FM',
  'multitarget',
  'Av. Carlos Soublette, Edif. Soublette , piso 7, Of. 7-B, Sector El Cordonal , Edo. La Guaira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Teques' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'San Antonio De los Altos y Gran Caracas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERSORA AMOR 150.3 FM INVERAMOR, C.A',
  'Amor',
  'J306046330',
  '105.3 FM',
  'adulto',
  'Av. La Paz Centro Comercial Puerto Cabello, nivel 1, local PA 1, Sector La Belisa. Puerto Cabello',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERTUAL C.A',
  'Radio Show',
  'J401576320',
  '99.1 FM',
  'multitarget',
  'Calle Bolìvar Esquina Monagas, Edif. Centro Carora, piso 5 , oficina 26 y 27, Zona centro, Carora Edo. Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barquisimeto, Rio Claro, Sarare, Cabudare, Yaracuy%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'INVERTUAL C.A',
  'Radio Show',
  'J401576320',
  '92.7 FM',
  'adulto',
  'Calle mascota sur entre Guasco y Descanso casa Nº 11, sector Cementario Viejo, Valle de la Pascua, Edo. Guarico',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Punto Fijo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Costa Oriental del Edo Falcón, Municipios Colina, %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JELEN AMANDA SILVA ARRIECHI',
  'Más Radio',
  'V197148515',
  '99.1 FM',
  'multitarget',
  'Calle 19 de Diciembre Centro Empresarial 645 Local Piso 2 Nro 9 Sector Centro Guatire',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Acarigua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Acarigua y Portuguesa%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JHON ALEXANDER SALAMANCA FUENTES',
  'Parranderísima',
  'V135473932',
  '88.5 FM',
  'multitarget',
  'Carretera Panamericana C.C Ripe Nivel 1, Ofic.n° 7, Los Cerritos, Los Teques. Edo.Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Teques' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOAN JOSÉ ZACARIAS VILLARREAL',
  'Máxima',
  'V149163669',
  '103.9 FM',
  'multitarget',
  'Calle 25 ente Carrera 21 y 22 Centro Comercial Cosmo I, piso 6, Ofic. 6A 23, Barquisimeto. Edo. Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Libertador, Campo Elías%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOAN JOSÉ ZACARIAS VILLARREAL',
  'Merideña',
  'V149163669',
  '95.3 FM',
  'juvenil',
  'AV. Mriranda, Edif. Torre Los Andes, Piso 2 Oficina 01-02, Sector, San Jose, Valencia.Edo.Carabobo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Edo Mérida, Zona Panaméricana, y frontera Colombo-%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSE GREGORIO MIGUEL GUTIERREZ PONENTE',
  'Más Música',
  'V079154500',
  '98.9 FM',
  'multitarget',
  'Calle 38 entre Av 34 y 35 Casa Nro. 34-51A Sector Goajira Vieja. Acarigua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Yaracuy' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Felipe' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Yaracuy, San Felipe, Cocorote, Aristidez Bastidas %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSE GREGORIO MIGUEL GUTIERREZ PONENTE',
  'Prisma',
  'V079154500',
  '96.3 FM',
  'multitarget',
  'Vereda 1 entre Calles 2 y 3, Casa C-39, Sector La Inmaculada Tucani Edo. Merida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Yaracuy' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Felipe' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'San Felipe, Cocorote, Bruzual, Veroe, Nirgua, Beju%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSÉ GREGORIO RODRÍGUEZ',
  'Tu Preferida',
  'J313667226',
  '104.5 FM',
  'multitarget',
  'Av. Las Americas , casa nro. 7-59, sector Santa Barbara Este, calle Principal Mérida. Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maturín y Municipios Adyacentes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSÉ GREGORIO RODRÍGUEZ',
  'La Uno',
  'J313667226',
  '104.1 FM',
  'juvenil',
  'Av. Las Americas , casa nro. 7-59, sector Santa Barbara Este, calle Principal Mérida. Edo. Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maturín y Municipios Adyacentes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSÉ PÉREZ ROZ',
  'Dinámica',
  'V054831800',
  '93.9 FM',
  'popular',
  'Margarita, Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Nueva Esparta' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Porlamar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Margarita, Sucre, Araya y Playa Colorada%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'JOSÉ PÉREZ ROZ',
  'Dinámica',
  'V054831800',
  '103.3 FM',
  'multitarget',
  'Calle 7 , casa nª 17-A , Urb. Los Sauces 1, Edo. Yaracuy',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Lechería' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Anzoátegui hasta Anaco, Puerto Píritu%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'KARINA CONTRERAS',
  'Miranda',
  'V137094980',
  '100.1 FM',
  'popular',
  'Urb. Aves del Paraiso C/H, casa Nª 555, Maturìn . Edo. Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Antonio de los Altos' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Altos Mirandinos, El Jarillo, La Colonia Tovar, Sa%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'KL 107.1 FM CA.',
  'Kiss Line',
  'J296116008',
  '107.1 FM',
  'multitarget',
  'Urb. Aves del Paraiso C/H, casa Nª 555, Maturìn . Edo. Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Higuerote' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Higuerote, Caucagua, Rio Chico y San José%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'LA ESQUINA CABIMERA , C.A',
  'Favoritas',
  'J506790220',
  '97.9 FM',
  'multitarget',
  'Av. Bermudez ,Res. Trinidad Torre A, Piso1 Apto.A-14,Barcelona Edo. Anzoategui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Cabimas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Cabimas Costa Oriental%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'LA FM MUNDIAL RADIO C.A.',
  'La FM Mundial',
  'J401024556',
  '104.1 FM',
  'multitarget',
  'Av. Bermudez ,Res. Trinidad Torre A, Piso1 Apto.A-14,Barcelona Edo. Anzoategui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valencia, Naguanagua, Guacara, Tocuyito, Campo Car%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'LA PRIMERA DE GUARENAS 100.5 MHZ',
  'La Primera',
  'J303949959',
  '100.5 FM',
  'popular',
  'Av. 5 Edif. Villa Bergamo 3 , piso PB, Apto, 01, sector Las Mercedes. Edo. Maracaibo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guatire' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Toda Guarenas, Guatire, Terrazas del Ávila y La Ur%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MARAWAKA C.A',
  'Marawaka',
  'J304882165',
  '103.1 FM',
  'multitarget',
  'Av Andrés Eloy Blanco entre Calle el Río y las Flores Edif. Resd Los Chaguaramos PB Loca 1 y 2 Casco Central Higuerote',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);


INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MAXIMILIANO CARRERO AGULIAR',
  'Imaginación',
  'V10174553',
  '96.1 FM',
  'multitarget',
  'Av. Bolívar Norte Calle Miranda Edif Febo Piso 3 Ofic Nro 3. Carabobo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Cristóbal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE '17 de 29 municipios del Edo Táchira%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MELAO FM NETWORK C.A.',
  'Melao',
  'J403669260',
  '99.9 FM',
  'juvenil',
  'Av Intercomunal Guarenas Guatire C.C. Oasis Nivel PP , Local 15, Sector Guatire',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Tucacas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Mon Señor Uturriza, Cacique Manaure, Edo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'METRÓPOLIS 103.9 C.A',
  'Metrópolis',
  'J317538293',
  '103.9 FM',
  'multitarget',
  'Av. Lecuna, Edif. Mohedano, piso mezzanina, ofic. OM3-OM4, Caracas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Zulia, Maracaibo, San Francisco, La Rita, La Cañad%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MGTA KREATIVA, C.A',
  'MGTA',
  'J502637419',
  '96.3 FM',
  'multitarget',
  'Calle Urdaneta entre calle Iturbe y Jansen, casa S/N, sector pantano. Santa Ana de Coro. Edo. Falcón',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Coro' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MIX 2011, C.A',
  'Mix',
  'J317501985',
  '106.1 FM',
  'multitarget',
  'Calle Evelio Rua, C/C ayacucho, Edif. Ruorsa, piso 1, local s/n, zona centro, Puerto Ayacucho',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Nueva Esparta' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Porlamar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Nueva Esparta, Sucre, Monagas y Puerto La Cruz%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'NORMA COROMOTO BARRIOS',
  'Más Network',
  'V5498699',
  '101.1 FM',
  'multitarget',
  'Valera 3101, Trujillo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valera' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valera , Escuque, Carvajal, Motatan, Eje Vial, Vía%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OASIS STEREO FM, C.A.',
  'Oasis',
  'J401073751',
  '100.7 FM',
  'multitarget',
  'La Victoria, Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Victoria' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Ribas, Revenga y Santos Michelena en Ara%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OPUS RADIO C.A',
  'Azul',
  'J312259744',
  '95.9 FM',
  'juvenil',
  'Av. Soublette, C.C. Litoral, Nivel 2, Local 18, Sector Este, Pariata, Maiquetía, 1061, Estado La Guaira, Venezuela.',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Litoral Central' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo el estado La Guaira%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ORBITA 88.5 FM C.A',
  'Órbita',
  'J306689710',
  '88.5 FM',
  'multitarget',
  'Urb. La Libertad, Calle Principal, Sede Orbita 88.5 FM, Maturín, Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Monagas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ORGANIZACIÓN LATINA , C.A',
  'Magic',
  'J404041273',
  '92.5 FM',
  'multitarget',
  'Urb. Calicanto Torre Capitolio piso 10D Maracay, Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracay, Turmero, Cagua, Villa de Cura, San Mateo,%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ORGANIZACIÓN LATINA , C.A',
  'Calle',
  'J404041273',
  '98.9 FM',
  'adulto joven',
  'Urb. Calicanto, Torre Capitolio, Piso 10D, maracay',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracay, Turmero, Cagua, Villa de Cura, San Mateo,%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Rumbera',
  'V83012345',
  '94.5 FM',
  'adulto',
  'V Terepaima, Edif. Multi Centro Empresarial Cristal Plaza, Piso 3, Ofc. 3-C',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barcelona' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barcelona, Lechería, Puerto La Cruz y Guanta, Píru%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Más Network',
  'V83012346',
  '105.3 FM',
  'multitarget',
  'Avenida Lara con Leones, Barquisimeto, Estado Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barcelona' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barcelona y Guanta, Pírutu y Puerto Píritu%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Más',
  'V83012346',
  '92.1 FM',
  'multitarget',
  'Bolívar 8001, Bolívar',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Bolívar' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Bolivar%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Blue',
  'V83012346',
  '107.1 FM',
  'multitarget',
  'Puerto La Cruz, Anzoátegui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barcelona' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barcelona, Lechería, Puerto La Cruz y Guanta, Píru%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Marina',
  'V83012346',
  '103.7 FM',
  'adulto',
  'Av. Miranda C/c Calle San Carlos, Edif Radio Barcelona, Anzoátegui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barcelona' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barcelona, Lechería, Puerto La Cruz y Guanta, Píru%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Espléndida',
  'V83012346',
  '91.9 FM',
  'popular',
  'Puerto La Cruz, Venezuela, Centro Comercial Judibana Local 01, mezanina',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto La Cruz' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Anzoátegui hasta Anaco, Puerto Píritu%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Power',
  'V83012346',
  '95.3 FM',
  'multitarget',
  'Puerto La Cruz, Anzoategui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barcelona' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Aventura',
  'V83012346',
  '106.7 FM',
  'popular',
  'Puerto La Cruz, Anzoategui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Cumaná' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Autana Plus',
  'V83012346',
  '90.9 FM',
  'multitarget',
  'Autana, Amazonas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Amazonas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto Ayacucho' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Bolívar, Apure, Rio Orinoco, En Colombia, Cazuarit%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Líder',
  'V83012346',
  '100.5 FM',
  'multitarget',
  'J974+RRM, Avenida 7, El Vigía 5145, Mérida,',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Lechería' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Puerto La Cruz, Barcelona, Guanta, Píritu, Puerto %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Solar',
  'V83012346',
  '101.5 FM',
  'multitarget',
  'C. Monagas, Carúpano 6150, Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Mundo Radio',
  'V83012346',
  '88.9 FM',
  'adulto',
  'El Tigre 6050, Anzoátegui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'El Tigrito' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'El Tigre, El Tigrito, Pariaguan Parye Rural de Can%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Stylo',
  'V83012346',
  '103.9 FM',
  'popular',
  'El Tigre, Anzoátegui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'El Tigre' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Órbita',
  'V83012346',
  '90.1 FM',
  'multitarget',
  'El Tigre, Anzoátegui',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Anzoátegui' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'El Tigre' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'El Tigre, El Tigrito, Pariaguan Parye Rural de Can%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'JMV',
  'V83012346',
  '90.5 FM',
  'popular',
  'Güiria, en el Municipio Valdez del estado Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Güiria' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Horizonte',
  'V83012346',
  '98.3 FM',
  'popular',
  'Calle Mariño, en el Municipio Mariño, Estado Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Güiria' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Mística',
  'V83012346',
  '106.5 FM',
  'multitarget',
  'Carupano, Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carúpano' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Carnaval',
  'V83012346',
  '99.3 FM',
  'multitarget',
  'Carupano, Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carúpano' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Cumaná y zonas foráneas, Parroquias Extraurbanas%' LIMIT 1)
);



INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES CIMA',
  'La Cima',
  'J299007293',
  '96.7 FM',
  'multitarget',
  'Centro Empresarial Coliseo Piso 1 Local 16, Carrizal, Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carrizal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'La Gran Caracas, Los Teques, Carrizal, Los Alias, %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES LA MOVIDA, C.A',
  'Famosa',
  'J501627789',
  '90.3 FM',
  'multitarget',
  'Av. Caracas, San Fernando de Apure 7001',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Apure' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Fernando de Apure' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'San Fernando de Apure, Biruaca, Edo Guárico, Camag%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES LOS PORTEÑAZOS DE NELSON, C.A',
  'Costera',
  'J293963311',
  '102.7 FM',
  'multitarget',
  'La Guaira, Estado La Guaira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'La Guaira' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES ONDAS , C.A',
  'Ondas',
  'J293747694',
  '101.3 FM',
  'multitarget',
  'Santa Bárbara del Zulia, Estado Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Santa Bárbara del Zulia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Colón, Catatumbo, Francisco Javier Pulgar, Obispo %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES RADIOFONICAS MARGIOTTA , C.A',
  'Capital',
  'J316710556',
  '90.3 FM',
  'juvenil',
  'Maracaibo, Estado Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracaibo - San Francisco y costa Oriental del Lag%' LIMIT 1)
);


INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCTORA TOP C.A.',
  'Top',
  'J404573941',
  '90.3 FM',
  'adulto',
  'PRH7+HJ8, Av. Libertador, Maturín 6201, Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maturín y Municipios Adyacentes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCTORA TOP C.A.',
  'Sideral',
  'J404573941',
  '101.1 FM',
  'popular',
  'Maturín, Monagas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Maturín, abarca zona centro y municipios%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PROMOCIONES Y EVENTOS KL , C.A',
  'Altos',
  'J406370592',
  '107.1 FM',
  'juvenil',
  'San Antonio de los Altos, Estado Miranda (Sede local)',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carrizal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Los Teques, Carrizal, San Antonio, Montalban, El P%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIACCIÓN FM, C.A.',
  'OK',
  'J085261362',
  '101.5 FM',
  'multitarget',
  'Barquisimeto, Estado Lara',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Área Metropolitana de Barquismeto, Cabudare y Yari%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO CUYUNI, C.A.',
  'Cuyuni',
  'J095156276',
  '106.5 FM',
  'adulto',
  'Av. Las Américas, Torre Cuyuní, Alta Vista, Puerto Ordaz, Edo. Bolívar',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto Ordaz' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Bolívar, Delta Amacuro, Monagas, Anzoátegui%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO ENERGÍA FM, C.A',
  'Energía',
  'J313152005',
  '99.9 FM',
  'multitarget',
  'Calle Palmira n°54-a, sector Santa Eduviges, al lado de bicicletas Corrente, Maracay, Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, Municipios Mariño, Girardot, Mario Briceño%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO ENLACE 860, C.A',
  'Enlance',
  'J060029074',
  '860 AM',
  'multitarget',
  'Valle de la Pascua, Estado Guárico',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO FUTURO 92. 9 FM C.A',
  'Futuro',
  'J060045770',
  '92.9 FM',
  'multitarget',
  'Avenida Miranda, San Fernando de Apure 7001, Apure',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Apure' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Fernando de Apure' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barinas, Guárico, Apure, Biruaca%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO GLOBO 89.7 ,C.A',
  'Ven',
  'J303686583',
  '89.7 FM',
  'popular',
  'Valera, Estado Trujillo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valera' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Lara-Carora, Zulia, en Mérida pico del Ávila, zona%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO OPERADORA UNIVERSAL C.A',
  'Cima',
  'J305800642',
  '95.1 FM',
  'multitarget',
  'La dirección fiscal de Cima 95.1 FM es 69VV+M9C, Maracay 2103, Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, San Joaquín, Edo Carabobo en la ARC%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO SABROSA FM, C.A.',
  'Sabrosa',
  'J301695976',
  '90.1 FM',
  'multitarget',
  'Calle 33, entre Carrera 19 y Av. 20, Edif. Don Pancho, Piso 1, Barquisimeto',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO SHOW 106.3 C.A',
  'Radio Show',
  'J304215495',
  '106.3 FM',
  'multitarget',
  'Valencia, Estado Carabobo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valencia, Naguanagua, Guacara, Tocuyito, Campo Car%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'R.A. LA ONDA DE LA ALEGRIA, C.A',
  'América',
  'J411397989',
  '90.9 FM',
  'multitarget',
  'Valencia, Estado Carabobo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO SHOW C.A',
  'Radio Show',
  'J305421790',
  '106.7 FM',
  'multitarget',
  'Maracay, Estado Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, San joaquín y la ARC%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO SOL FM, C.A',
  'Radio Sol',
  'J503238860',
  '89.1 FM',
  'adulto joven',
  'Porlamar, Estado Nueva Esparta',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Monagas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maturín' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Cubre Matruín y Municipio Punceres, Ezequiel Zamor%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RADIO STEREO 103.3, C.A',
  'Radiorama',
  'J002857498',
  '103.3 FM',
  'multitarget',
  'Caracas, Distrito Capital',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Distrito Capital' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Caracas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ROBERTO ANGEL MEDINA',
  'La Romántica',
  'V169794304',
  '104.5 FM',
  'multitarget',
  'Maracay, Estado Aragua (Sede Regional FM Center)',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barinas, Mérida, Acarigua, Portuguesa, Trujillo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ROBERTO ANGEL MEDINA',
  'Mágica',
  'V169794304',
  '90.9 FM',
  'multitarget',
  'Barinas',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo el Edo Barinas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ROBERTO ANGEL MEDINA',
  'Stéreo Rey',
  'V169794304',
  '97.1 FM',
  'multitarget',
  'Coro, Estado Falcón',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Barinas, Mérida, Acarigua, Portuguesa, Trujillo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ROBERTO ANGEL MEDINA',
  'Zamorana',
  'V169794304',
  '98.5 FM',
  'multitarget',
  'Villa de Cura, Estado Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Barinas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo el Edo Barinas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RODRIGUEZ DIAZ PUBLICIDAD',
  'La Romántica',
  'V072826864',
  '88.1 FM',
  'multitarget',
  'Centro Comercial Concresa, Caracas, Distrito Capital (Sede Central FM Center)',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipios Cardenal Quintero, Santos Marquino, Obi%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RONNY JAVIER ROA ZAMBRANO',
  'Andes',
  'V189917380',
  '89.3 FM',
  'popular',
  'Mérida, Estado Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guásimos' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Guásimos, Cárdenas, San Cristóbal, Andre%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RV RADIO, C.A',
  'Soda',
  'J405990600',
  '95.1 FM',
  'multitarget',
  'Calle 129, Valencia 2001, Carabobo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RJ DE VENEZUELA, C.A',
  'La Nueva Romance',
  'J402331320',
  '91.9 FM',
  'multitarget',
  'Región Occidental',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Falcón' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Coro' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Todo la ciudad de Coro, Municipio Colinas, La Vela%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'SIGMA 105.1 FM C.A.',
  'Sigma',
  'J309752006',
  '105.1 FM',
  'multitarget',
  'Local M5, Estación IFE Sur, Charallave, Ferrecoril Valles del Tuy, Miranda,',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valles del Tuy, San Lucía, San José, Este de Cúa, %' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'STEREO CENTER C.A',
  'Stéreo',
  'J402505060',
  '100.3 FM',
  'multitarget',
  'Charallave, Miranda',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'STEREO CENTER C.A',
  'Señal',
  'J402505060',
  '94.5 FM',
  'multitarget',
  'Isla de Margarita, Estado Nueva Esparta',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'STEREO FM OK 101 MARACAIBO C.A.',
  'OK',
  'J070525568',
  '101.3 FM',
  'adulto',
  'Maracaibo, Estado Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracaibo, Costa Occidental, San Francisco, Sinami%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'STUDIO CORPORATIVO J4, C.A',
  'Apolo',
  'J504790591',
  '1320 AM',
  'adulto',
  'Turmero, Estado Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, Municipios Mariño, Girardot, Mario Briceño%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'STUDIO CORPORATIVO J4, C.A',
  'Ruta',
  'J504790591',
  '90.7 FM',
  'multitarget',
  'sector César Rodríguez Palencia, Av Intercomunal Maracay Turmero, C. Orinoco, Maracay 2015, Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Aragua' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracay' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Aragua, Municipios Mariño, Girardot, Mario Briceño%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'TAMA STEREO 103.9 FM',
  'Tama Stereo',
  'J302685702',
  '103.9 FM',
  'multitarget',
  'San Cristóbal, Estado Táchira',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Táchira' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'San Cristóbal' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Llano hasta Santa Bárbara de Barinas, Eje Fronteri%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'RAIZA DEL CARMEN PARRAGA',
  'Dinámica',
  'V118439151',
  '103.7 FM',
  'multitarget',
  'Calle Leonardo Infante con 19 de Abril, Valle de la Pascua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Guárico' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valle de la Pascua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Llanos' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Socorro, Chaguaramas y Valle de la Pascua%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'TRANSMISIONES  UNIVERSITARIAS EN FM 107.7, C.A',
  'Ula',
  'J304895631',
  '107.7 FM',
  'juvenil',
  'Universidad de los Andes (ULA), Mérida, Estado Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Mérida, Táchira, Trujillo, Mucuchies, Tabay, Ejido%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'TRUJILLANA 104.5 FM C.A',
  'Trujillana',
  'J405510463',
  '104.5 FM',
  'adulto',
  'Avenida 9, Calle 6, Valera 3101, Estado Trujillo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valera y municipios urbanos y sub urbanos circunda%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'TU VISION PRODUCCIONES C.A',
  'Ranking',
  'J299806161',
  '100.7 FM',
  'deportiva',
  'Región Central / Aragua',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Distrito Capital' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Caracas%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'UNICA99.9 FM C.A',
  'Única',
  'J314127373',
  '99.9 FM',
  'multitarget',
  'Carr Trasandina, Valera 3101, Trujillo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Trujillo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valera' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Trujillo, parte alta, Urdaneta. Andris Bello, La P%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ÚNICAS D PRODUCCIONES,  C.A.',
  'Frenesí',
  'J409537366',
  '107.9 FM',
  'adulto',
  'Urb. El Viñedo Av. Moseñor Adam C.E Talislandia Piso 1 Odicina 11, Valencia 2001, Carabobo, Venezuela',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Carabobo (Menos Puerto Cabello) Aragua, Cojedes%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'UNIVERSIDAD DR. RAFAEL BELLOSO CHACIN TV Y FM C.A',
  'Urbe',
  'J296801940',
  '96.3 FM',
  'multitarget',
  'Universidad Dr. Rafael Belloso Chacín (URBE), Maracaibo, Estado Zulia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Zulia' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Zuliana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Maracaibo y San Francisco, la costa oriental del L%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'UPF PRODUCCIONES TOP',
  'Top',
  'J506041340',
  '89.9 FM',
  'multitarget',
  'Calle 38 entre Av 34 y 35 Casa Local 34-51A, La Goajira, Acarigua - Portuguesa',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Portuguesa' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Acarigua' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Acarigua, Araure y Portuguesa%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'WASIM ABDUL PAGHI JBOUR',
  'Rumberísima',
  'V130978700',
  '91.9 FM',
  'juvenil',
  'Mérida, Estado Mérida',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipios Cardenal Quintero, Santos Marquino, Obi%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'WOAO 88 UNO FM C.A',
  'Woao',
  'J308746410',
  '88.1 FM',
  'juvenil',
  'Av. Bolívar Norte, Torre Stratos, Piso 8, Oficina 8-1, Valencia',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Carabobo' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Valencia' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Central' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Carabobo%' LIMIT 1)
);

INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'YTZA CECILIA FLORES RIVERO',
  'Diamante',
  'V126450911',
  '91.9 FM',
  'multitarget',
  'Avenida Dalla Costa, Municipio Caroní, Bolívar,',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Bolívar' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Ciudad Guayana' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Norte de Bolívar, Sur de Anzoátegui y Monagas%' LIMIT 1)
);


-- 1. Más Network 92.3 FM → "mas network 92.3 fm" en regional CSV (Lara, Carora)
INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'ELVIS ANTONIO PEROZO',
  'Más Network',
  'V191490211',
  '92.3 FM',
  'multitarget',
  'Urb. Romulo Gallegos Calle 6 con Calle Nº 1, Local 8-13, Lecheria',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Lara' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carora' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Centro Occidental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Municipio Torres y Morán%' LIMIT 1)
);

-- 2. Fortaleza 105.5 FM → "FORTALEZA 105.5 FM" en regional CSV (Mérida, Lagunillas)
INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'FUNDACION LA FORTALEZA',
  'Fortaleza',
  'J314452738',
  '105.5 FM',
  'popular',
  'Calle 72 con Av 12 Edif Camsa Piso 10-12 Local 1 Sector Tierra Negra Maracaibo',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Mérida' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Lagunillas' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Los Andes' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Santa Cruz de Mora, Estamquez%' LIMIT 1)
);


-- 6. Marawaka 103.1 FM → "marawaka 103.1 fm" en regional CSV (Amazonas, Puerto Ayacucho)
INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'MARAWAKA C.A',
  'Marawaka',
  'J304882165',
  '103.1 FM',
  'multitarget',
  'Av Andrés Eloy Blanco entre Calle el Río y las Flores Edif. Resd Los Chaguaramos PB Local 1 y 2 Casco Central Higuerote',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Amazonas' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Puerto Ayacucho' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Guayana' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Puerto Ayacuchp, República de Colombia y Cazuarito%' LIMIT 1)
);


-- 10. Solar 101.5 FM → "SOLAR 101.5 FM" en regional CSV (Sucre, Carúpano)
INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'OSWALDO SIFONTES',
  'Solar',
  'V83012346',
  '101.5 FM',
  'multitarget',
  'C. Monagas, Carúpano 6150, Sucre',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Sucre' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Carúpano' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Oriental' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'N/T%' LIMIT 1)
);



-- 13. Radio Zeta 103.5 FM → "radio zeta 103.5 fm" en regional CSV (Miranda, Charallave)
INSERT INTO ALIADOS_COMERCIALES (razon_social, nombre_emisora, rif, frecuencia, categoria, direccion, estado, fk_lugar, fk_ciudad, fk_region, fk_cobertura) VALUES (
  'PRODUCCIONES Z 103.5, C.A.',
  'Radio Zeta',
  'J294336884',
  '103.5 FM',
  'multitarget',
  'Ocumare del Tuy',
  'activo',
  (SELECT id FROM LUGAR WHERE nombre = 'Miranda' AND tipo = 'Estado' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad' LIMIT 1),
  (SELECT id FROM LUGAR WHERE nombre = 'Capital' AND tipo = 'Region' LIMIT 1),
  (SELECT id FROM COBERTURA WHERE descripcion ILIKE 'Valles del Tuy, San Lucía, San José, Este de Cúa%' LIMIT 1)
);

