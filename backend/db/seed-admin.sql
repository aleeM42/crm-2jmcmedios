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
