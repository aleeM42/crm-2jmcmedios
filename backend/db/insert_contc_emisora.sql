-- =========================================================
-- INSERTS PARA CONTACTOS DE EMISORAS (ALIADOS_COMERCIALES)
-- Generado automáticamente desde CSV de contactos de emisoras
-- =========================================================

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Malbris', NULL, 'Benavides', 'ventas', 'MALBRISBENAVIDES@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'once Q' AND frecuencia = '93.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'once Q', '93.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jhon', NULL, 'Baca', 'ventas', 'caliente1059@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Caliente stereo' AND frecuencia = '105.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Caliente stereo', '105.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Alejandro', NULL, 'Higuera', 'ventas', 'caguirre@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Sabor' AND frecuencia = '106.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Sabor', '106.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Giselle', NULL, 'López', 'ventas', 'activa88.9fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Activa' AND frecuencia = '88.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Activa', '88.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Antonio', 'ventas', 'joseantoniogorrin@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'El Vacilón' AND frecuencia = '106.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'El Vacilón', '106.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Erick', NULL, 'Parra', 'ventas', 'parraerick497@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Activa' AND frecuencia = '104.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Activa', '104.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Aristides', NULL, 'Martínez', 'ventas', 'noaplica@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Araira' AND frecuencia = '93.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Araira', '93.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Marvelia', NULL, 'Escalante', 'ventas', 'buenisima985fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Buenísima' AND frecuencia = '98.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Buenísima', '98.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Omar', NULL, 'Hoyos', 'ventas', 'telezulia_2009@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Planeta' AND frecuencia = '106.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Planeta', '106.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Griselda', NULL, 'León', 'ventas', 'masnetwork89@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Network' AND frecuencia = '89.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Network', '89.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Fermín', NULL, 'Mejía', 'ventas', 'ferminmejia@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Boconesa' AND frecuencia = '107.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Boconesa', '107.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Vladimir', NULL, 'Rossi', 'ventas', 'bolivariana104fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Bolivariana' AND frecuencia = '104.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Bolivariana', '104.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Geogina', NULL, 'Rivas', 'ventas', 'bonchona107fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Bonchona' AND frecuencia = '107.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Bonchona', '107.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Briswel', NULL, 'Ríos', 'ventas', 'briswell@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Pachanga' AND frecuencia = '104.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Pachanga', '104.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Robisón', NULL, 'Zambrano', 'ventas', 'rzambranopolo@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Capital' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Capital', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Carlos', NULL, 'Rueda', 'ventas', 'campeona96.5fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Campeona' AND frecuencia = '96.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Campeona', '96.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Soledad', NULL, 'Gonzalez', 'ventas', 'caroratv@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Carora' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Carora', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Robisón', NULL, 'Zambrano', 'ventas', 'rzambranopolo@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Clásicos' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Clásicos', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yohangela', NULL, 'Alvarado', 'ventas', 'colmenareznelsy@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Rumba ' AND frecuencia = '100.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Rumba ', '100.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Luis', NULL, 'Enrique', 'ventas', 'luisenriqueherreralehv@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Conexión' AND frecuencia = '101.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Conexión', '101.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Adhemar', NULL, 'Gimenez', 'ventas', 'adhemargimenez56@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Alpha' AND frecuencia = '97.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Alpha', '97.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Fernando', NULL, 'Gascón', 'ventas', 'elautobus102@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ciudad' AND frecuencia = '88.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ciudad', '88.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Robisón', NULL, 'Zambrano', 'ventas', 'rzambranopolo@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Turística' AND frecuencia = '92.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Turística', '92.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Daniel', NULL, 'Aguilar', 'ventas', 'rory.unica@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Fascinación' AND frecuencia = '105.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Fascinación', '105.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Diego', NULL, 'Suarez', 'ventas', 'masnetworkvigia@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Vigía' AND frecuencia = '104.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Vigía', '104.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Tapia', 'ventas', 'rctm1982@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Elite' AND frecuencia = '103.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Elite', '103.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elvis', NULL, 'Perozo', 'ventas', 'masnetworkcarora@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Network' AND frecuencia = '92.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Network', '92.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Manuel', 'ventas', 'riochico97.1@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Imagen' AND frecuencia = '97.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Imagen', '97.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Leonardo', NULL, 'Torres', 'ventas', 'trujillo1025fmgmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Trujillo' AND frecuencia = '102.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Trujillo', '102.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Mayret', NULL, 'Barreto', 'ventas', 'mayretbarreto@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Rumbera' AND frecuencia = '98.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Rumbera', '98.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jacqueline', NULL, 'Tortolero', 'ventas', 'via97.7fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Vía' AND frecuencia = '97.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Vía', '97.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jenny', NULL, 'Escolano', 'ventas', 'festiva999fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Festiva' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Festiva', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Germán', NULL, 'Ferrer', 'ventas', 'popular95fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Popular' AND frecuencia = '95.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Popular', '95.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Victor', NULL, 'Herrera', 'ventas', 'victortitoherrera@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Metrópolis' AND frecuencia = '88.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Metrópolis', '88.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yexica', NULL, 'Suárez', 'ventas', 'radioalegria102.7comunitaria@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Alegría' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Alegría', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yolimar', NULL, 'Ramos', 'ventas', 'www.carrera1005fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Carrera' AND frecuencia = '100.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Carrera', '100.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Bladimir', NULL, 'Baptista', 'ventas', 'anahisguevra.2702@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Positiva' AND frecuencia = '92.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Positiva', '92.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Evelyn', NULL, 'Fuentes', 'ventas', 'vida98.7fmlafria@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Vida' AND frecuencia = '98.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Vida', '98.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Javier', NULL, 'Rangel', 'ventas', 'rangeljavier19@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Fortaleza' AND frecuencia = '105.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Fortaleza', '105.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Javier', NULL, 'Flores', 'ventas', 'fmaraguena995@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Aragueña' AND frecuencia = '99.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Aragueña', '99.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jesús', NULL, 'Toro', 'ventas', 'Recepciongiga@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Giga' AND frecuencia = '91.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Giga', '91.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Fernando', NULL, 'Escalante', 'ventas', 'prisma913@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Giga' AND frecuencia = '91.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Giga', '91.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Cristina', NULL, 'Da Silva', 'ventas', 'Gentederadioaplausofm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Aplauso' AND frecuencia = '106.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Aplauso', '106.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Gilbert', NULL, 'Wiedman', 'ventas', 'Mcyradiofm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Mcy' AND frecuencia = '88.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Mcy', '88.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Leonardo', NULL, 'Ojeda', 'ventas', 'radiotalento029@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Talento' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Talento', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Juan', NULL, 'de Mata', 'ventas', 'juandemata68@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Talento' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Talento', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Alexis', NULL, 'Acosta', 'ventas', 'urbanafmmaturin@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Urbana' AND frecuencia = '104.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Urbana', '104.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Rafael', 'ventas', 'inversionesdesafio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Guanareña' AND frecuencia = '98.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Guanareña', '98.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarías', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Studio' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Studio', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elba', NULL, 'Cano', 'ventas', 'celebrandolavida.radio12345.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Agua de Coco' AND frecuencia = '96.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Agua de Coco', '96.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Moises', NULL, 'Leiva', 'ventas', 'moisesleiva@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Orbita' AND frecuencia = '103.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Orbita', '103.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Rafael', NULL, 'Tapia', 'ventas', 'inversionesdesafio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Desafio' AND frecuencia = '107.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Desafio', '107.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Gleydys', NULL, 'López', 'ventas', 'masnetwork969@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Network' AND frecuencia = '96.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Network', '96.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Gregorio', 'ventas', 'cheobaloa3@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Swing Latina' AND frecuencia = '88.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Swing Latina', '88.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Mariana', NULL, 'Escalante', 'ventas', 'c.oye89.1@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'once Q' AND frecuencia = '93.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'once Q', '93.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Eduar', NULL, 'Rodríguez', 'ventas', 'alessandro251204@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Melodía Stereo' AND frecuencia = '97.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Melodía Stereo', '97.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yomar', NULL, 'Blanco', 'ventas', 'stilo107fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Stilo' AND frecuencia = '107.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Stilo', '107.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Alexis', NULL, 'Aular', 'ventas', 'inversionesurbana943@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Urbana' AND frecuencia = '94.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Urbana', '94.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Normanella', NULL, 'Papita', 'ventas', 'frecuenciafeeling10@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Feeling' AND frecuencia = '97.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Feeling', '97.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Karla', NULL, 'Gutiérrez', 'ventas', 'amor105.3ventas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Amor' AND frecuencia = '105.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Amor', '105.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Stefano', NULL, 'Simonetti', 'ventas', 'simonetti24@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Show' AND frecuencia = '99.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Show', '99.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Stefano', NULL, 'Simonetti', 'ventas', 'simonetti24@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Show' AND frecuencia = '92.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Show', '92.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jelen', NULL, 'Silva', 'ventas', 'jelenamanda23@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Radio' AND frecuencia = '99.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Radio', '99.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarías', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Máxima' AND frecuencia = '103.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Máxima', '103.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarías', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Merideña' AND frecuencia = '95.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Merideña', '95.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Antonio', 'ventas', 'joseantoniogorrin@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'El Vacilón' AND frecuencia = '106.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'El Vacilón', '106.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Gutiérrez', 'ventas', 'masnetworksanfelipe@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Música' AND frecuencia = '98.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Música', '98.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Gutiérrez', 'ventas', 'masnetworksanfelipe@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Prisma' AND frecuencia = '96.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Prisma', '96.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Rodríguez', 'ventas', 'jocgrodriguez@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Tu Preferida' AND frecuencia = '104.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Tu Preferida', '104.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Rodríguez', 'ventas', 'jocgrodriguez@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Uno' AND frecuencia = '104.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Uno', '104.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Pérez', 'ventas', 'jperezroz@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Dinámica' AND frecuencia = '93.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Dinámica', '93.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Pérez', 'ventas', 'jperezroz@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Dinámica' AND frecuencia = '103.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Dinámica', '103.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Karina', NULL, 'Contreras', 'ventas', 'usawhatsapp@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Miranda' AND frecuencia = '100.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Miranda', '100.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Javier', NULL, 'Yánes', 'ventas', 'kl107.1fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Kiss Line' AND frecuencia = '107.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Kiss Line', '107.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jaime', NULL, 'Romero', 'ventas', 'laesquinacabimera2020@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Favoritas' AND frecuencia = '97.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Favoritas', '97.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Melquisidec', NULL, 'Padilla', 'ventas', '1041stefania@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La FM Mundial' AND frecuencia = '104.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La FM Mundial', '104.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jackeline', NULL, 'Rodríguez', 'ventas', 'laprimeradeguarenas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Primera' AND frecuencia = '100.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Primera', '100.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jiancarlo', NULL, 'Rocca', 'ventas', 'jiancarlorocca@hotmil.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Magic' AND frecuencia = '92.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Magic', '92.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Derwin', NULL, 'Rojas', 'ventas', 'marawaka1031@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Marawaka' AND frecuencia = '103.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Marawaka', '103.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Máximiliano', NULL, 'Carrero', 'ventas', 'maxcarrero@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Imaginación' AND frecuencia = '96.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Imaginación', '96.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Liliana', NULL, 'Estrada', 'ventas', 'melaofmnetwork@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Melao' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Melao', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yulianny', NULL, 'Navas', 'ventas', 'metropolis1039ca@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Metrópolis' AND frecuencia = '103.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Metrópolis', '103.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jonathan', NULL, 'Quiroz', 'ventas', 'admonmgtafm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'MGTA' AND frecuencia = '96.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'MGTA', '96.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Javier', NULL, 'Ávila', 'ventas', 'avilaproduceroficial@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Mix' AND frecuencia = '106.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Mix', '106.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Miguel', NULL, 'Barrios', 'ventas', 'masnetworkvalera@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Network' AND frecuencia = '101.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Network', '101.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Naim', NULL, 'Khiyami', 'ventas', 'oasisstereofmc.a@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Oasis' AND frecuencia = '100.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Oasis', '100.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elvirath', NULL, 'Epinoza', 'ventas', 'ELVIRATH@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Azul' AND frecuencia = '95.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Azul', '95.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Victoria', NULL, 'Armas', 'ventas', 'orbita88.5fmarchivo@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Órbita' AND frecuencia = '88.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Órbita', '88.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Lorena', NULL, 'Pérez', 'ventas', 'orglatinavzla@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Magic' AND frecuencia = '92.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Magic', '92.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Lorena', NULL, 'Pérez', 'ventas', 'orglatinavzla@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Calle' AND frecuencia = '98.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Calle', '98.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Rumbera' AND frecuencia = '94.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Rumbera', '94.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más Network' AND frecuencia = '105.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más Network', '105.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Más' AND frecuencia = '92.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Más', '92.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Blue' AND frecuencia = '107.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Blue', '107.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Marina' AND frecuencia = '103.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Marina', '103.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Espléndida' AND frecuencia = '91.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Espléndida', '91.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Power' AND frecuencia = '95.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Power', '95.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Aventura' AND frecuencia = '106.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Aventura', '106.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Autana Plus' AND frecuencia = '90.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Autana Plus', '90.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Líder' AND frecuencia = '100.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Líder', '100.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Solar' AND frecuencia = '101.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Solar', '101.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Mundo Radio' AND frecuencia = '88.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Mundo Radio', '88.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Stylo' AND frecuencia = '103.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Stylo', '103.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Órbita' AND frecuencia = '90.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Órbita', '90.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'JMV' AND frecuencia = '90.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'JMV', '90.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Horizonte' AND frecuencia = '98.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Horizonte', '98.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Mística' AND frecuencia = '106.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Mística', '106.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oswaldo', NULL, 'Sifontes', 'ventas', 'comercializadoraradio@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Carnaval' AND frecuencia = '99.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Carnaval', '99.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Manuel', NULL, 'Pérez', 'ventas', 'mandper@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Famosa' AND frecuencia = '90.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Famosa', '90.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elba', NULL, 'Morón', 'ventas', 'nelsoncostera@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Costera' AND frecuencia = '102.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Costera', '102.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Nancy', NULL, 'Batiste', 'ventas', 'nmbrda@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ondas' AND frecuencia = '101.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ondas', '101.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Rafael', NULL, 'Ruiz', 'ventas', 'roknruiz@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Capital' AND frecuencia = '90.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Capital', '90.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Bárbara', NULL, 'Márquez', 'ventas', 'zetadandopalo20@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Zeta' AND frecuencia = '103.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Zeta', '103.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'García', 'ventas', 'josetonygarcia903@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Top' AND frecuencia = '90.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Top', '90.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'García', 'ventas', 'josetonygarcia903@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Sideral' AND frecuencia = '101.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Sideral', '101.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Luis', NULL, 'Gómez', 'ventas', 'altosfm.adm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Altos' AND frecuencia = '107.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Altos', '107.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Doraida', NULL, 'Padrón', 'ventas', 'doraidapadron@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Solar' AND frecuencia = '101.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Solar', '101.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Marvis', NULL, 'Campos', 'ventas', 'mrcg14@gmail.com/fmcuyuni@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Cuyuni' AND frecuencia = '106.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Cuyuni', '106.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Oscar', NULL, 'Barreto', 'ventas', 'oscarbarreto106@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Cuyuni' AND frecuencia = '106.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Cuyuni', '106.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Maryuris', NULL, 'Padrino', 'ventas', 'maryurispadrino@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Energía' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Energía', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Luz', NULL, 'Marina', 'ventas', 'enlace860@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Enlance' AND frecuencia = '860 AM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Enlance', '860 AM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jessika', NULL, 'Fontana', 'ventas', 'radiofuturo92.9fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Futuro' AND frecuencia = '92.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Futuro', '92.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('William', NULL, 'Moreno', 'ventas', 'sistemaglobalvalera@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ven' AND frecuencia = '89.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ven', '89.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elvira', NULL, 'Espinoza', 'ventas', 'radio.cima95fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Cima' AND frecuencia = '95.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Cima', '95.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Beatriz', NULL, 'Lugo', 'ventas', 'sabrosafm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Sabrosa' AND frecuencia = '90.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Sabrosa', '90.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Esteban', NULL, 'Simonetti', 'ventas', 'simonetti24@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Show' AND frecuencia = '106.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Show', '106.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('George', NULL, 'Dudamell', 'ventas', 'gdudamell@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'América' AND frecuencia = '90.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'América', '90.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Esteban', NULL, 'Simonetti', 'ventas', 'simonetti24@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Show' AND frecuencia = '106.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Show', '106.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Gregorio', 'ventas', 'jocgrodriguez@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radio Sol' AND frecuencia = '89.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radio Sol', '89.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Carlos', NULL, 'Vilchez', 'ventas', 'radioramastereo103.3@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Radiorama' AND frecuencia = '103.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Radiorama', '103.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Hernán', NULL, 'MarÍn', 'ventas', 'contactosuperstereo981@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Melodía Stereo' AND frecuencia = '97.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Melodía Stereo', '97.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Roberto', NULL, 'Ángel', 'ventas', 'masnetworkbarinas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Romántica' AND frecuencia = '104.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Romántica', '104.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Roberto', NULL, 'Ángel', 'ventas', 'masnetworkbarinas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Mágica' AND frecuencia = '90.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Mágica', '90.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Roberto', NULL, 'Ángel', 'ventas', 'masnetworkbarinas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Stéreo Rey' AND frecuencia = '97.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Stéreo Rey', '97.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Roberto', NULL, 'Ángel', 'ventas', 'masnetworkbarinas@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Zamorana' AND frecuencia = '98.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Zamorana', '98.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarias', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Romántica' AND frecuencia = '88.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Romántica', '88.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Ronny', NULL, 'Zambrano', 'ventas', 'andesfm893@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Andes' AND frecuencia = '89.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Andes', '89.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Alirio', NULL, 'Camero', 'ventas', 'aliriogcg@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Soda' AND frecuencia = '95.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Soda', '95.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jose', NULL, 'Riera', 'ventas', 'joseriera01@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Nueva Romance' AND frecuencia = '91.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Nueva Romance', '91.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yuruani', NULL, 'Acosta', 'ventas', 'sigma1051fm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Sigma' AND frecuencia = '105.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Sigma', '105.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Gladys', NULL, 'Ochoa', 'ventas', 'ochoagp@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Stéreo' AND frecuencia = '100.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Stéreo', '100.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Gladys', NULL, 'Ochoa', 'ventas', 'ochoagp@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Señal' AND frecuencia = '94.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Señal', '94.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Paticia', NULL, 'Pirela', 'ventas', 'ventasok101@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'OK' AND frecuencia = '101.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'OK', '101.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Peña', 'ventas', 'rutasfm.adm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Apolo' AND frecuencia = '1320 AM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Apolo', '1320 AM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Peña', 'ventas', 'rutasfm.adm@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ruta' AND frecuencia = '90.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ruta', '90.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Morella', NULL, 'Rueda', 'ventas', 'tamastereo103.9@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Tama Stereo' AND frecuencia = '103.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Tama Stereo', '103.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Elvin', NULL, 'Portillo', 'ventas', 'elvinportillof@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Feeling' AND frecuencia = '97.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Feeling', '97.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Raiza', NULL, 'Parraga', 'ventas', 'raizaparraga1@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Dinámica' AND frecuencia = '103.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Dinámica', '103.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarias', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ula' AND frecuencia = '107.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ula', '107.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('José', NULL, 'Monagas', 'ventas', 'jrmonagasquintero@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Trujillana' AND frecuencia = '104.5 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Trujillana', '104.5 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Normanella', NULL, 'Papita', 'ventas', 'frecuenciafeeling10@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Ranking' AND frecuencia = '100.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Ranking', '100.7 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Normanella', NULL, 'Papita', 'ventas', 'frecuenciafeeling10@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Feeling' AND frecuencia = '97.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Feeling', '97.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Fermín', NULL, 'Mejía', 'ventas', 'ferminmejia@hotmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Única' AND frecuencia = '99.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Única', '99.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Diana', NULL, 'Aranguren', 'ventas', 'dianaranguren25@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Frenesí' AND frecuencia = '107.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Frenesí', '107.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Ángel', NULL, 'Pereira', 'ventas', 'appereira19@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Urbe' AND frecuencia = '96.3 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Urbe', '96.3 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Jesús', NULL, 'Silva', 'ventas', 'topfmacarigua@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Top' AND frecuencia = '89.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Top', '89.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Joan', NULL, 'Zacarias', 'ventas', 'jobarzavi@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Rumberísima' AND frecuencia = '91.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Rumberísima', '91.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Juan', NULL, 'Hidalgo', 'ventas', 'juancarloshidalgo@woao.net', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Woao' AND frecuencia = '88.1 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Woao', '88.1 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Robisón', NULL, 'Zambrano', 'ventas', 'rzambranopolo@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'Diamante' AND frecuencia = '91.9 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'Diamante', '91.9 FM';
    END IF;
END $$;

DO $$
DECLARE
    v_contacto_id INTEGER;
    v_aliado_id INTEGER;
BEGIN
    INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac, fk_cliente)
    VALUES ('Yulitza', NULL, 'Rangel', 'ventas', 'yulitzarangel41842@gmail.com', 'gerente', 'emisora', NULL, NULL, NULL)
    RETURNING id INTO v_contacto_id;

    SELECT id INTO v_aliado_id FROM ALIADOS_COMERCIALES 
    WHERE nombre_emisora = 'La Cima' AND frecuencia = '96.7 FM' LIMIT 1;

    IF v_aliado_id IS NOT NULL THEN
        INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES (v_aliado_id, v_contacto_id);
    ELSE
        RAISE WARNING 'No se encontró la emisora % con frecuencia %', 'La Cima', '96.7 FM';
    END IF;
END $$;

