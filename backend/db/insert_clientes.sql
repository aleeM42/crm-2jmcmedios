-- ==============================================
-- INSERTS PARA LA TABLA CLIENTE Y MARCA_INTER
-- ==============================================

-- 1. CLIENTES (Empresas Padre primero)
-- Adriana Sabino UUID subquery: (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')

-- Plaza's
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Plaza''s', 
    'AUTOMERCADO PLAZA´S C.A', 
    'Empresa', 
    'Av. San Sebastian , Edif. Plaza´s , PB-Ofic. única , Baruta', 
    'J306725024', 
    'Agencia', 
    'Alimentación', 
    'Activo', 
    'C&M', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Polar (PADRE)
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Polar', 
    'ALIMETNOS POLAR COMERCIAL , C.A', 
    'Empresa', 
    'Av. 2da de Los Cortijos de Lourdes Local Carcas, Urb. Los Cortijos', 
    'J000413126', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Arcos Dorados
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Arcos Dorados', 
    'ALIMENTOS ARCOS DORADOS', 
    'Empresa', 
    'Calle Paris, Edif. Torre Luxor, piso 2, Ofic. 02-A, Urb. Las Mercedes', 
    'J001871985', 
    'Agencia', 
    'Alimentación', 
    'Activo', 
    'OMD', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Avanti
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Avanti', 
    'AVANTI BY FRIGILUX , C.A', 
    'Empresa', 
    'Av. Rio de Janeiro, cruce con calle caroni, local S/N, Urb. Las Mercedes', 
    'J501548218', 
    'Cliente directo', 
    'Moda', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Biopago
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Biopago', 
    'BIOPAGO, C.A', 
    'Empresa', 
    'Av. Sur. Esq. Bompland, piso Pb, Ofic. 06 Urb. Catedral, Caracas', 
    'J500426640', 
    'Agencia', 
    'Bancario', 
    'Activo', 
    'Publicis', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- C&M Marketing
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'C&M Marketing', 
    'C&M SOLUCIONES DE MARKETING , C.A', 
    'Empresa', 
    'Calle Orinoco Edif. Arbicenter, Mezz 1 y 2 Las Mercedes, Caracas', 
    'J409064361', 
    'Agencia', 
    'Otro', 
    'Activo', 
    'C&M', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Com. Creativas T
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Com. Creativas T', 
    'COMUNICAIONES CREATIVAS TIMON C.A', 
    'Empresa', 
    'Calle paseo Enrique Eraso, entrada san Roman, Edif. La Noria, piso pb, ofic. b2, Las Mercedes.', 
    'J307872390', 
    'Agencia', 
    'Automotriz', 
    'Activo', 
    'M2M', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Digitel
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Digitel', 
    'CORPORACION DIGITEL , C.A', 
    'Empresa', 
    'Av. Principal de la Castellana con calle Blandin Edif. Torre Digitel, piso 19, Ofic. P19. Urb. La Castellena', 
    'J304689713', 
    'Cliente directo', 
    'Telemática', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Telemic (Inter)
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Telemic', 
    'CORPORACION TELEMIC, C.A', 
    'Empresa', 
    'Av. Los Leones con calle Caroní, Edif. Centro Empresarial Caracs, piso 3, Ofic. 3-1, Urb. Fundalara. Barquisimeto', 
    'J302406641', 
    'Cliente directo', 
    'Telemática', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Farmacias unidas
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Farmacias unidas', 
    'FARMACIAS UNIDAS , S.A', 
    'Empresa', 
    'Calle 85 nro. 4-104, Edif. Cobeca, piso 2, Ofc. PA Sector Av. Falcón , Maracaibo', 
    'J070007508', 
    'Agencia', 
    'Salud', 
    'Activo', 
    'Publicis', 
    (SELECT id FROM LUGAR WHERE nombre = 'Maracaibo' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Farmatodo
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Farmatodo', 
    'FARMATODO , C.A', 
    'Empresa', 
    'Av. Los Guayabitos C.C Expreso Baruta , Niel 5, Urb. La Trinidad', 
    'J000302001', 
    'Agencia', 
    'Salud', 
    'Activo', 
    'Profile', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Garnier
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Garnier', 
    'GARNIER PERFORMANCE MEDIA, S.A.', 
    'Empresa', 
    'n/a', 
    'J504231452', 
    'Agencia', 
    'Alimentación',
    'Activo', 
    'OMD', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Grupo total 99
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Grupo total 99', 
    'GRUPO TOTAL 99, C.A', 
    'Empresa', 
    'Calle las Vegas con Soledad Edif. Clariant Venezuela, sotano planta baaja 1 y 2, Ofinas S/N , La Trinidad', 
    'J311501878', 
    'Cliente directo', 
    'Moda', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Ind. Cereales y Harinas
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Ind. Cereales y Harinas', 
    'INDUSTRIAS ALIMENTICIA NACIONAL DE CEREALES Y HARINAS, C.A', 
    'Empresa', 
    'Crta via a Guanare Km 185 Local S/N sector Parque Industrial Los Llanos Araure, Edo. Portuguesa', 
    'J085033289', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Acarigua' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Amapola
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Amapola', 
    'INDUSTRIAS AMAPOLA , C.A', 
    'Empresa', 
    'CRTA Nacional Charallave Cúa, casa nro. P-77 P-78, Urb. Industrial Río Tuy. Charallave, Edo. Miranda', 
    'J001808124', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Charallave' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Inalsa
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Inalsa', 
    'INDUSTIRAS INTEGRADAS DE ALIMENTOS INALSA , S.A', 
    'Empresa', 
    'Carrera 3 con calle 4, local no Aplica, sin número - Urb. Industrial N°2, Barquisimeto', 
    'J299075868', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Barquisimeto' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Lactea venezolana
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Lactea venezolana', 
    'INDUSTRIA LACTEA VENEZOLANA C.A', 
    'Empresa', 
    'Calle San Francisco con calle palmarito Edif. INDULAC, piso Pb S/N Urb. Colina california sur , Macaracuay', 
    'J000193681', 
    'Agencia', 
    'Alimentación', 
    'Activo', 
    'Publicis', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Inv. Cod 1811
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Inv. Cod 1811', 
    'INVERSIONES CODIGO 1811, C.A', 
    'Empresa', 
    'n/a', 
    'J500029250', 
    'Agencia', 
    'Bancario', 
    'Activo', 
    'Reimpulso', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Laser
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Laser', 
    'LASER ARLINES, C.A', 
    'Empresa', 
    'Calle California entre Mucuchies y Monterrey, Edif. Torre Laser, piso 8. Urb. Las Mercedes', 
    'J003644455', 
    'Cliente directo', 
    'Aerolínea', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Mimesa
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Mimesa', 
    'MIMESA ALIMENTOS, C.A', 
    'Empresa', 
    'Avenida Francisco de Miranda, Edif. Parque Cristal, Torre Oeste, Piso 8, Caracas', 
    'J070321768', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Netuno
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Netuno', 
    'NETUNO, C.A', 
    'Empresa', 
    'Calle 7 Edif. Insenica II, piso, 2, Ofc. N/A, Urb. La Urbina, Caracas', 
    'J301083350', 
    'Cliente directo', 
    'Telemática', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Nestle
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Nestle', 
    'NESTLE VENEZUELA, S.A.', 
    'Empresa', 
    'Calle Altagracia, Edificio P&G, Piso 3, Urbanización Sorokaima, Sector La Trinidad, Zona Postal 1080, Caracas', 
    'J000129266', 
    'Agencia', 
    'Alimentación', 
    'Activo', 
    'Concept', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Radioterapia
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, nombre_agencia, fk_lugar, fk_vendedor)
VALUES (
    'Radioterapia', 
    'SERVICIO DE RADIOTERAPIA LA TIRNIDAD, C.A', 
    'Empresa', 
    'Av. Intercumunal la Trinidad, Edif. Santa Ines, Piso sotan 02 , Local Centro Médico Docente, La Trinidad', 
    'J311898948', 
    'Agencia', 
    'Salud', 
    'Activo', 
    'Ars Publicidad', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Movistar
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Movistar', 
    'TELEFONICA VENEZOLANA, C.A', 
    'Empresa', 
    'Av. Francisco de Miranda, C.C. El Parque, nivel 6, Ofic. 06, Urb. Los palos grandes', 
    'J003439940', 
    'Cliente directo', 
    'Telemática', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- Zoom
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_vendedor)
VALUES (
    'Zoom', 
    'ZOOM INTERNATIONAL SERVICES, C.A', 
    'Empresa', 
    'Calle 7 Edif. Merano, piso 8 Ofic. Única, La Urbina', 
    'J001021744', 
    'Cliente directo', 
    'Envíos', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- 2. SUBEMPRESAS (Cervecería Polar y PepsiCola)
-- Cervecería Polar (HIJO DE POLAR)
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_cliente_padre, fk_vendedor)
VALUES (
    'Cervecería Polar', 
    'CERVECERIA POLAR , C.A', 
    'Subempresa', 
    'Av. 2da de Los Cortijos de Lourdes Local Carcas, Urb. Los Cortijos', 
    'J000063729', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- PepsiCola (HIJO DE POLAR)
INSERT INTO CLIENTE (nombre, razon_social, tipo, direccion, rif_fiscal, clasificacion, sector, estado, fk_lugar, fk_cliente_padre, fk_vendedor)
VALUES (
    'PepsiCola', 
    'PEPSI COLA VENEZUELA C.A', 
    'Subempresa', 
    '4ta. Transversal Urb. Cortijos de Lourdes, Centro Empresarial Polar, piso 3.', 
    'J301370139', 
    'Cliente directo', 
    'Alimentación', 
    'Activo', 
    (SELECT id FROM LUGAR WHERE nombre = 'Caracas' AND tipo = 'Ciudad'), 
    (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 
    (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')
);

-- ==============================================
-- INSERTS PARA LA TABLA MARCA_INTER
-- ==============================================

-- Plaza's
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Plaza´s', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J306725024'));

-- Polar
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Productos de Alimentos', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'));

-- Arcos Dorados
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Mc Donald´s', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001871985'));

-- Avanti
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Avanti', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J501548218'));

-- Biopago
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Biopago', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500426640'));

-- Cervecería Polar
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Malta Polar', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000063729'));

-- C&M Marketing
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Iberia', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J409064361'));

-- Com. Creativas T
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Corimon', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J307872390'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Motos Bajaj', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J307872390'));

-- Digitel
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Digitel', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J304689713'));

-- Telemic
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Inter', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J302406641'));

-- Farmacias unidas
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Farmacia Saas', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J070007508'));

-- Farmatodo
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('farmatodo', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000302001'));

-- Garnier
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('garnier', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J504231452'));

-- Grupo total 99
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('total', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J311501878'));

-- Ind. Cereales y Harinas
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Mary', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J085033289'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Caledonia', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J085033289'));

-- Amapola
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Mary', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001808124'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Caledonia', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001808124'));

-- Inalsa
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Mary', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J299075868'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Caledonia', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J299075868'));

-- Lactea venezolana
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('La Campiña', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000193681'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Yoka', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000193681'));

-- Inv. Cod 1811
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Bancaribe', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500029250'));

-- Laser
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Laser', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J003644455'));

-- Mimesa
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Ronco', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J070321768'));

-- Netuno
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Netuno', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J301083350'));

-- Nestle
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Maggi', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000129266'));
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Savoy', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000129266'));


-- PepsiCola
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Golden', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J301370139'));

-- Radioterapia
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Gurve', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J311898948'));

-- Movistar
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Movistar', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J003439940'));

-- Zoom
INSERT INTO MARCA_INTER (nombre, fk_cliente) VALUES ('Zoom', (SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001021744'));
