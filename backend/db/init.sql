-- ==============================================
-- CRM 2jmcMedios - Script Inicialización Postgres
-- ==============================================

-- ──────────────────────────────────────────────
-- USUARIOS DE DESARROLLO (admin / superusuarios)
-- ──────────────────────────────────────────────

-- Alejandra
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'alejandra') THEN
    CREATE USER alejandra WITH PASSWORD 'alejandra_dev2024' SUPERUSER CREATEDB CREATEROLE LOGIN;
  END IF;
END $$;

-- David
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'david') THEN
    CREATE USER david WITH PASSWORD 'david_dev2024' SUPERUSER CREATEDB CREATEROLE LOGIN;
  END IF;
END $$;

-- Maria
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'maria') THEN
    CREATE USER maria WITH PASSWORD 'maria_dev2024' SUPERUSER CREATEDB CREATEROLE LOGIN;
  END IF;
END $$;

-- Otorgar todos los privilegios sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE crm_2jmc TO alejandra;
GRANT ALL PRIVILEGES ON DATABASE crm_2jmc TO david;
GRANT ALL PRIVILEGES ON DATABASE crm_2jmc TO maria;

-- Otorgar privilegios sobre el esquema public
GRANT ALL ON SCHEMA public TO alejandra;
GRANT ALL ON SCHEMA public TO david;
GRANT ALL ON SCHEMA public TO maria;

-- Permisos sobre tablas futuras (para objetos creados después)
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO alejandra, david, maria;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO alejandra, david, maria;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON FUNCTIONS TO alejandra, david, maria;

