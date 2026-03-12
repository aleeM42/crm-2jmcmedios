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

-- ──────────────────────────────────────────────
-- ESQUEMA DE BASE DE DATOS
-- ──────────────────────────────────────────────

-- 1. Crear VENDEDORES
CREATE TABLE IF NOT EXISTS vendedores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(50),
  cargo VARCHAR(100),
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crear CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  razon_social VARCHAR(255) NOT NULL,
  ruc VARCHAR(50) UNIQUE,
  direccion TEXT,
  ciudad VARCHAR(100),
  sector VARCHAR(100),
  tipo_cliente VARCHAR(50),
  activo BOOLEAN DEFAULT TRUE,
  vendedor_id INTEGER REFERENCES vendedores(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear CONTACTOS
CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(50),
  cargo VARCHAR(100),
  es_principal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear VISITAS
CREATE TABLE IF NOT EXISTS visitas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  vendedor_id INTEGER NOT NULL REFERENCES vendedores(id) ON DELETE CASCADE,
  fecha TIMESTAMP NOT NULL,
  motivo VARCHAR(255) NOT NULL,
  observaciones TEXT,
  estado VARCHAR(50) DEFAULT 'programada',
  resultado TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Otorgar privilegios sobre las tablas recién creadas a los desarrolladores
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO alejandra, david, maria;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO alejandra, david, maria;
