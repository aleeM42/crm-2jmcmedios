-- ==============================================
-- Seed: Usuario admin de desarrollo
-- Credenciales: admin / Admin2024!
-- NOTA: Ejecutar DESPUÉS de las migraciones de esquema
-- ==============================================

-- 1. Ampliar password_hash para soportar bcrypt (60 chars)
ALTER TABLE USUARIOS ALTER COLUMN password_hash TYPE VARCHAR(255);

-- 2. Agregar columna nombre_usuario para login por username
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'usuarios' AND column_name = 'nombre_usuario'
  ) THEN
    ALTER TABLE USUARIOS ADD COLUMN nombre_usuario VARCHAR(50) UNIQUE;
  END IF;
END $$;

-- 3. Insertar usuario admin de desarrollo
-- Password: Admin2024! (bcrypt hash generado con rounds=12)
INSERT INTO USUARIOS (
  primer_nombre,
  primer_apellido,
  correo,
  nombre_usuario,
  password_hash,
  rol,
  estado
) VALUES (
  'Admin',
  'Sistema',
  'admin@2jmcmedios.com',
  'admin',
  '$2b$12$Q.s5qgz5zDcfUX3.ql8U0Obule0Y6LM.S7QwL4ZT7nNo5XVlgNPZ2',
  'Administrador',
  'Activo'
) ON CONFLICT (correo) DO NOTHING;

-- 4. Insertar usuario Yossuel Marcano
-- Password: Yossuel.crm26 (bcrypt hash)
INSERT INTO USUARIOS (
  primer_nombre,
  primer_apellido,
  correo,
  nombre_usuario,
  password_hash,
  rol,
  estado
) VALUES (
  'Yossuel',
  'Marcano',
  '2jmcpautaii@gmail.com',
  'yossuelM2jmc',
  '$2b$10$jfA3jJzjpVggVfL5EkJ/Oehsfvd.rYb3cCRn5fOuVf9d8QYK909wm',
  'Gestor de Pautas',
  'Activo'
) ON CONFLICT (correo) DO NOTHING;

-- 5. Insertar usuario Jullisette Marin (Administrador)
-- Password: Juli.crm26 (bcrypt hash)
INSERT INTO USUARIOS (
  primer_nombre,
  primer_apellido,
  correo,
  nombre_usuario,
  password_hash,
  rol,
  estado
) VALUES (
  'Julissette',
  'marin',
  '2jmcmedios@gmail.com',
  'juliM2jmc',
  '$2b$12$3PFTOsR/kZlmJfzqQKsaceLG9rlqYSafalELJBD3XxbjZwWbp8EWC',
  'Administrador',
  'Activo'
) ON CONFLICT (correo) DO NOTHING;

-- 6. Insertar Jackson Chacón como Director
-- Password: Jackson.crm26 (bcrypt hash)
WITH nuevo_director AS (
  INSERT INTO USUARIOS (
    primer_nombre,
    primer_apellido,
    correo,
    nombre_usuario,
    password_hash,
    rol,
    estado
  ) VALUES (
    'Jackson',
    'Chacón',
    'jacksonchaconfm@gmail.com',
    'jacksonC2jmc',
    '$2b$10$ikI3TnfG77qivRT83YSmH.l3JUbdFXOJFKogymcsfnAoBi6KUwymK',
    'Director',
    'Activo'
  ) ON CONFLICT (correo) DO UPDATE SET rol = EXCLUDED.rol -- Usamos UPDATE para asegurar que RETURNING devuelva el ID incluso si ya existe
  RETURNING id
)
INSERT INTO VENDEDORES (usuario_id, meta, tipo)
SELECT id, 0, 'Director' FROM nuevo_director
ON CONFLICT (usuario_id) DO NOTHING;


-- 7. Insertar usuaria Adriana Sabino (Vendedor) asignada a Jackson
WITH nuevo_vendedor AS (
  INSERT INTO USUARIOS (
    primer_nombre,
    primer_apellido,
    correo,
    nombre_usuario,
    password_hash,
    rol,
    estado
  ) VALUES (
    'Adriana',
    'Sabino',
    '2jmcventas.adriana@gmail.com',
    'adrianaS2jmc',
    '$2b$12$zDPzNMCj.uA8M4gqv2f40e18wBqWuNxacQAJYsniIexerHwgqkYxm',
    'Vendedor',
    'Activo'
  ) ON CONFLICT (correo) DO UPDATE SET rol = EXCLUDED.rol
  RETURNING id
)
INSERT INTO VENDEDORES (usuario_id, meta, tipo, fk_vendedor_jefe)
SELECT id, 0, 'Vendedor', (SELECT id FROM USUARIOS WHERE correo = 'jacksonchaconfm@gmail.com') FROM nuevo_vendedor
ON CONFLICT (usuario_id) DO NOTHING;


-- 8. Insertar usuario Invitado
-- Password: invitado.crm26 (bcrypt hash)
INSERT INTO USUARIOS (
  primer_nombre,
  primer_apellido,
  correo,
  nombre_usuario,
  password_hash,
  rol,
  estado
) VALUES (
  'Invitado',
  'CRM',
  'invitado@gmail.com',
  'invitado',
  '$2b$10$lwOP.v.FNh4SCUJdMIMegeQsdfdPfOUapvFerpiTXGMtuO158eHhq',
  'Invitado',
  'Activo'
) ON CONFLICT (correo) DO NOTHING;

--Telefonos de los usuarios

INSERT INTO TELEFONOS (codigo_area, numero, fk_usuario)
VALUES 
    (0424, 2926003, (SELECT id FROM USUARIOS WHERE primer_nombre = 'Adriana' AND primer_apellido = 'Sabino')),
    (0412, 3888053, (SELECT id FROM USUARIOS WHERE primer_nombre = 'Yossuel' AND primer_apellido = 'Marcano')),
    (0414, 3315905, (SELECT id FROM USUARIOS WHERE primer_nombre = 'Jackson' AND primer_apellido = 'Chacón'));

