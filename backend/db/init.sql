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


Create Table LUGAR(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	tipo VARCHAR(30) NOT NULL,
	descripcion TEXT NOT NULL,
	fk_lugar INTEGER,
	FOREIGN KEY (fk_lugar) references LUGAR
);


Create Table COBERTURA(
	id SERIAL PRIMARY KEY,
	descripcion TEXT NOT NULL,
	fk_lugar INTEGER,
	CONSTRAINT fk_lugar_padre
	FOREIGN KEY (fk_lugar) references LUGAR(id)
);


CREATE TABLE CLIENTE (
    id SERIAL PRIMARY KEY, -- Usando 'cod' como indica tu ER 
    nombre VARCHAR(150) NOT NULL,
    razon_social VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    rif_fiscal VARCHAR(20) NOT NULL, -- Ampliado por seguridad 
    clasificacion VARCHAR(50) NOT NULL,
    sector VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    nombre_agencia VARCHAR(150),
    observacion TEXT,
    fk_lugar INTEGER NOT NULL, -- Obligatorio según el diagrama [cite: 164]
    fk_cliente_padre INTEGER, -- Para la jerarquía "Se divide" [cite: 165]
    fk_vendedor INTEGER,

    -- LLAVES FORÁNEAS (Asegúrate de que los nombres de tabla y columna coincidan)
    CONSTRAINT fk_vendedor_p
        FOREIGN KEY (fk_vendedor) REFERENCES vendedores(id), -- 
    CONSTRAINT fk_lug
        FOREIGN KEY (fk_lugar) REFERENCES LUGAR(id), -- [cite: 166]
    CONSTRAINT fk_cliente_jerarq
        FOREIGN KEY (fk_cliente_padre) REFERENCES CLIENTE(id),

    -- RESTRICCIONES DE UNICIDAD
    CONSTRAINT rif_unique UNIQUE(rif_fiscal),
    CONSTRAINT razon_unique UNIQUE(razon_social),

    -- RESTRICCIONES DE VALIDACIÓN (CHECK)
    CONSTRAINT chk_estado 
        CHECK (estado IN ('Activo', 'Inactivo')), 
    CONSTRAINT chk_clasificacion 
        CHECK (clasificacion IN ('Agencia', 'Cliente directo')), 
        CHECK (tipo IN ('Empresa', 'Subempresa')),
    CONSTRAINT chk_sector 
        CHECK (sector IN ('Salud', 'Alimentacion', 'Telematica', 'Fabricacion', 'Bancario', 'Aerolinea', 'Otro')), -- [cite: 63, 64, 65]
    
    -- LÓGICA DE AGENCIA
    CONSTRAINT agencia_nom
        CHECK (
            (clasificacion = 'Agencia' AND nombre_agencia IS NOT NULL) 
            OR 
            (clasificacion != 'Agencia' AND nombre_agencia IS NULL)
        )
);

Create table VENDEDORES(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	segundo nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	segundo apellido VARCHAR(50) NOT NULL,
	meta INTEGER NOT NULL,
	correo VARCHAR(100) NOT NULL,
);