    -- ==============================================
    -- INSERTS PARA LA TABLA CONTACTOS
    -- ==============================================

    -- 1. CONTACTOS DE CLIENTES
    -- Los nombres de columnas y tipos coinciden exactamente con init.sql:
    -- pri_nombre, pri_apellido, departamento, correo, rol, tipo, fk_cliente

    -- Plaza's
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J306725024'), 'cliente', 'M', 'Brivas', 'brivas@cymmarketing.com', 'orden de compras', 'ventas'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J306725024'), 'cliente', 'M', 'Galindez', 'mgalindez@cymmarketing.com', 'orden de compras', 'ventas');

    -- Polar (Matriz)
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 'cliente', 'Natasha', 'Moreno', 'natasha.moreno@empresaspolar.com', 'marketing', 'marketing'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 'cliente', 'Carolina', 'Teixeira', 'carolina.teixeira@empresaspolar.com', 'orden de compras', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 'cliente', 'Nahir', 'Cacique', 'nahir.cacique@empresaspolar.com', 'orden de compras', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000413126'), 'cliente', 'Administrador', 'Polar', 'proveedores.0700.AlimentosPolarComercial@empresas-polar.com', 'administrativo', 'administración');

    -- Arcos Dorados
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001871985'), 'cliente', 'Guillermo', 'Suárez', 'guillermo.suarez@omd.com.ve', 'gerente', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001871985'), 'cliente', 'bernando', 'Navas', 'bernardo.navas@omd.com.ve', 'orden de compra', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001871985'), 'cliente', 'Laura', 'Madera', 'laura.madera@ve.mcd.com', 'administrativo', 'administración');

    -- Avanti
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J501548218'), 'cliente', 'Shayli', 'Contreras', 'scontreras@avanti.com.ve', 'gerente', 'ventas'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J501548218'), 'cliente', 'I', 'rivas', 'lrivas@avanti.com.ve', 'administrativo', 'administración');

    -- Biopago
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500426640'), 'cliente', 'Lorena', 'Andueza', 'lorena.andueza@zenithmedia.com', 'marketing', 'ventas'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500426640'), 'cliente', 'Adriana', 'Vera', 'adriana.vera@zenithmedia.com', 'marketing', 'ventas'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500426640'), 'cliente', 'Nathaly', 'Mendoza', 'nathaly.mendoza@redlion.com.ve', 'orden de compras', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500426640'), 'cliente', 'Greiber', 'Martinez', 'greiber.martinez@publicisgroupe.com', 'administrativo', 'administración');

    -- C&M Marketing
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J409064361'), 'cliente', 'L', 'montilla', 'lmontilla@cymmarketing.com', 'administrativo', 'administración');

    -- Com. Creativas T
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J307872390'), 'cliente', 'Alfredo', 'Rangel', 'alfredo.rangel@m2mvzla.com', 'compras', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J307872390'), 'cliente', 'Rosbel', 'Escobar', 'rosbel.escobar@m2mvzla.com', 'administrativo', 'administración');

    -- Digitel
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J304689713'), 'cliente', 'Grecia', 'Acevedo', 'Grecia.Acevedo@digitel.com.ve', 'orden de compras', 'compras');

    -- Telemic
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J302406641'), 'cliente', 'Vanessa', 'Collahuazo', 'vanessa.collahuazo@inter.com.ve', 'administrativo', 'administración');

    -- Farmatodo
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000302001'), 'cliente', 'Ana', 'Henriquez', 'ahenriquez@agenciaprofile.com', 'marketing', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000302001'), 'cliente', 'D', 'contreras', 'dcontreras@agenciaprofile.com', 'marketing', 'administración');

    -- Garnier
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J504231452'), 'cliente', 'Maricela', 'pestana', 'maricela.pestana@omd.com.ve', 'administrativo', 'administración');

    -- Grupo total 99
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J311501878'), 'cliente', 'Geraldine', 'Russo', 'nolotenemos@gmail.com', 'marketing', 'ventas');

    -- Lactea venezolana
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000193681'), 'cliente', 'Alejandro', 'Chouha', 'Alejandro.CHOUHA@ve.lactalis.com', 'gerente', 'compras');

    -- Inv. Cod 1811
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J500029250'), 'cliente', 'Alexander', 'Lander', 'lander.alexander@gmail.com', 'gerente', 'compras');

    -- Laser
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J003644455'), 'cliente', 'Margarita', 'Gil', 'margaritagil@agenciaprofile.com', 'administrativo', 'administración');

    -- Mimesa
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J070321768'), 'cliente', 'Graciela', 'Esparragoza', 'notiene@gmail.com', 'marketing', 'ventas');

    -- Netuno
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J301083350'), 'cliente', 'Edwin', 'Gonzalez', 'edgonzalez@netuno.net', 'decisor', 'compras');

    -- Nestle
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J000129266'), 'cliente', 'Manuel', 'Ferraro', 'manuel.ferraro@nestlevzla.com', 'marketing', 'compras');

    -- Radioterapia
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J311898948'), 'cliente', 'Adriane', 'Mendoza', 'amendoza@arspublicidad.com', 'administrativo', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J311898948'), 'cliente', 'E', 'espinal', 'eespinal@arspublicidad.com', 'compras', 'compras');

    -- Movistar
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J003439940'), 'cliente', 'Crisaura', 'Rodríguez', 'crisaura.rodriguez@havasmedia.com', 'administrativo', 'administración');

    -- Zoom
    INSERT INTO CONTACTOS (fk_cliente, tipo, pri_nombre, pri_apellido, correo, rol, departamento)
    VALUES 
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001021744'), 'cliente', 'Nieves', 'Lorenzo', 'nieves.lorenzo@zoom.red', 'compras', 'compras'),
    ((SELECT id FROM CLIENTE WHERE rif_fiscal = 'J001021744'), 'cliente', 'Samuel', 'Berroteran', 'samuel.berroteran@zoom.red', 'administrativo', 'administración');
