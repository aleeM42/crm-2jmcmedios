-- ==============================================
-- CRM 2jmcMedios - Script Inicialización Postgres
-- ==============================================

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
