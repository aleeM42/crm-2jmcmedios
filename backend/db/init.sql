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

    -- Constraints
	CONSTRAINT fk_lugar_padre FOREIGN KEY (fk_lugar) references LUGAR(id)
);

Create Table COBERTURA(
	id SERIAL PRIMARY KEY,
	descripcion TEXT NOT NULL,
	fk_lugar INTEGER NOT NULL,

    -- Constraints
	CONSTRAINT fk_lugar_padre FOREIGN KEY (fk_lugar) references LUGAR(id)
);

CREATE TABLE USUARIOS ( 
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
	primer_nombre VARCHAR(50) NOT NULL, 
	primer_apellido VARCHAR(50) NOT NULL, 
	correo VARCHAR(100) UNIQUE NOT NULL, 
	password_hash VARCHAR(30) NOT NULL, 
	rol VARCHAR(30) NOT NULL, 
	estado VARCHAR(30) NOT NULL, 
	intentos_fallidos INTEGER NOT NULL DEFAULT 0, 
	bloqueado_hasta TIMESTAMP WITH TIME ZONE, 
	ultimo_acceso TIMESTAMP WITH TIME ZONE, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
	CONSTRAINT rol_chk CHECK (rol IN('Vendedor', 'Invitado','Director','Administrador','Gestor de Pautas')),
	CONSTRAINT estado_chk CHECK (estado IN('Suspendido', 'Activo'))
);

CREATE TABLE CATEGORIA_EMISORA (
    id SERIAL PRIMARY KEY,              
    nombre VARCHAR(100) NOT NULL UNIQUE 
);

Create table VENDEDORES(
	usuario_id UUID PRIMARY KEY REFERENCES USUARIOS(id) ON DELETE CASCADE,
	meta INTEGER NOT NULL,
	tipo VARCHAR(10) NOT NULL,
	fk_vendedor_jefe UUID,

    -- Constraints
	CONSTRAINT chk_tipo CHECK (tipo IN ('Vendedor', 'Director')), 
	CONSTRAINT fk_jefe_vendedor FOREIGN KEY (fk_vendedor_jefe) REFERENCES vendedores(usuario_id)   
);

CREATE TABLE CLIENTE (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(150) NOT NULL,
    razon_social VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    rif_fiscal VARCHAR(20) NOT NULL, 
    clasificacion VARCHAR(50) NOT NULL,
    sector VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    nombre_agencia VARCHAR(150),
    observacion TEXT,
    fk_lugar INTEGER NOT NULL, 
    fk_cliente_padre INTEGER, 
    fk_vendedor UUID NOT NULL,

    -- Constraints
    CONSTRAINT fk_vendedor_p FOREIGN KEY (fk_vendedor) REFERENCES vendedores(usuario_id),
    CONSTRAINT fk_lug FOREIGN KEY (fk_lugar) REFERENCES LUGAR(id), 
    CONSTRAINT fk_cliente_jerarq FOREIGN KEY (fk_cliente_padre) REFERENCES CLIENTE(id),
    CONSTRAINT rif_unique UNIQUE(rif_fiscal),
    CONSTRAINT razon_unique UNIQUE(razon_social),

    -- RESTRICCIONES DE VALIDACIÓN (CHECK)
    CONSTRAINT chk_jerarquia CHECK (
        (tipo = 'Empresa' AND fk_cliente_padre IS NULL) 
        OR 
        (tipo = 'Subempresa' AND fk_cliente_padre IS NOT NULL)
    ),
    CONSTRAINT chk_estado CHECK (estado IN ('Activo', 'Inactivo')), 
    CONSTRAINT chk_no_autociclo CHECK (id != fk_cliente_padre),
    CONSTRAINT chk_clasificacion CHECK (clasificacion IN ('Agencia', 'Cliente directo')), 
    CONSTRAINT chk_tipo CHECK (tipo IN ('Empresa', 'Subempresa')),
    CONSTRAINT chk_sector CHECK (sector IN ('Salud', 'Alimentacion', 'Telematica', 'Fabricacion', 'Bancario', 'Aerolinea', 'Otro')), -- [cite: 63, 64, 65]
    CONSTRAINT agencia_nom CHECK (
        (clasificacion = 'Agencia' AND nombre_agencia IS NOT NULL) 
        OR 
        (clasificacion != 'Agencia' AND nombre_agencia IS NULL)
    )
);

CREATE TABLE CONTACTOS (
    id SERIAL PRIMARY KEY, 
    pri_nombre VARCHAR(50) NOT NULL, 
    seg_nombre VARCHAR(50), 
    pri_apellido VARCHAR(50) NOT NULL, 
    departamento VARCHAR(50) NOT NULL, 
    correo VARCHAR(100) NOT NULL, 
    rol VARCHAR(30) NOT NULL, 
    tipo VARCHAR(10) NOT NULL, 
    anotac_especiales TEXT, 
    fecha_nac DATE, 
    fk_cliente INTEGER, 

    -- CONSTRAINTS
    CONSTRAINT check_tipo CHECK (tipo IN ('emisora', 'cliente')),
    CONSTRAINT fk_a_client FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) ON DELETE CASCADE
); 

CREATE TABLE TELEFONOS ( 
    codigo_area VARCHAR(4) NOT NULL, 
    numero VARCHAR(7) NOT NULL, 
    fk_usuario UUID NOT NULL, 
    fk_contacto INTEGER NOT NULL, 
    
    -- Constraints
    CONSTRAINT fk_usuario_tel FOREIGN KEY (fk_usuario) REFERENCES USUARIOS(id) ON DELETE CASCADE,
    CONSTRAINT fk_contacto_tel FOREIGN KEY (fk_contacto) REFERENCES CONTACTOS(id) ON DELETE CASCADE
);

create table ALIADOS_COMERCIALES(
	id SERIAL PRIMARY KEY,
	razon_social VARCHAR(80) NOT NULL,
	nombre_emisora VARCHAR(50) UNIQUE NOT NULL,
	rif VARCHAR(9) UNIQUE NOT NULL,
    frecuencia VARCHAR(8) UNIQUE NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fk_lugar INTEGER NOT NULL,
    fk_region INTEGER NOT NULL,
    fk_cobertura INTEGER NOT NULL, 

	-- Constraints
	CONSTRAINT check_AC_categoria CHECK (categoria IN ('latinos' ,'exitos urbanos recientes'  ,'exitos latinos recientes' ,'exitos juveniles' ,'exitos recientes ','baladas en ingles' ,'baladas en español ','bachata' ,'salsa' ,'merengue' ,'regueton' ,'pop baladas en ingles ','pop baladas en español','tropical' ,'multitarget ','musica' ,'entretenimiento ','información' ,'venezolanas' ,'retro' )),
	CONSTRAINT check_AC_estado CHECK (estado IN ('activo','inactivo','cerrado')) 	
);

CREATE TABLE A_CONTACT(
    fk_a_c INTEGER NOT NULL,
    fk_contacto INTEGER NOT NULL,

    ---Constraints 
    CONSTRAINT pk_a_contacto PRIMARY KEY(fk_a_c, fk_contacto),
    CONSTRAINT fk_a_comercial FOREIGN KEY (fk_a_c) references ALIADOS_COMERCIALES(id),
    CONSTRAINT fk_contact FOREIGN KEY (fk_contacto) references CONTACTOS(id)    
);

CREATE TABLE C_M (
    fk_aliado INTEGER NOT NULL,
    fk_categoria INTEGER NOT NULL,

    -- Constraints
    CONSTRAINT pk_CM PRIMARY KEY (fk_aliado, fk_categoria),
    CONSTRAINT fk_cm_aliado FOREIGN KEY (fk_aliado) REFERENCES ALIADOS_COMERCIALES(id) ON DELETE CASCADE,
    CONSTRAINT fk_cm_categoria FOREIGN KEY (fk_categoria) REFERENCES CATEGORIA_EMISORA(id) ON DELETE CASCADE
);

CREATE TABLE MARCA_INTER (
    id SERIAL NOT NULL,
    nombre VARCHAR(150) NOT NULL,       
    observaciones TEXT,                 
    fk_cliente INTEGER NOT NULL,        

    -- Constraints
    CONSTRAINT pk_marca_inter PRIMARY KEY (fk_cliente, id),
    CONSTRAINT fk_cliente_marca FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) ON DELETE CASCADE
);

Create table VISITAS(
	id SERIAL PRIMARY KEY,
	fecha DATE 	NOT NULL,
	hora TIME NOT NULL,
	objetivo_visita VARCHAR(100) NOT NULL,
    efectiva VARCHAR(2) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    detalle VARCHAR(100),
	lugar VARCHAR(100) NOT NULL,
	fk_contacto INTEGER NOT NULL,
	fk_vendedor UUID NOT NULL,
	
    -- Constraints 
	CONSTRAINT check_efectiva CHECK (efectiva 	IN ('si', 'no')),
	CONSTRAINT check_tipo CHECK (tipo 	IN ('llamada', 'presencial')),
	CONSTRAINT fk_vendedor  FOREIGN KEY (fk_vendedor) references vendedores(usuario_id) ON DELETE RESTRICT,
	CONSTRAINT fk_contacto FOREIGN KEY (fk_contacto) references CONTACTOS(id) ON DELETE CASCADE	
);

Create table GASTOS_VISITAS (
	id SERIAL PRIMARY KEY,
	fecha DATE NOT NULL,
	concepto VARCHAR(100) NOT NULL,
	monto NUMERIC(8,4) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    fk_visita INTEGER NOT NULL,
	
    -- Constraints
    CONSTRAINT fk_gasto_visita FOREIGN KEY (fk_visita) REFERENCES VISITAS(id) ON DELETE CASCADE,
	CONSTRAINT check_GV_categoria CHECK (categoria IN ('transporte','alimentacion','peaje','estacionamiento','regalos','otros'))
);

create table GASTOS_MARKETING (
	id SERIAL PRIMARY KEY,
	fecha DATE NOT NULL,
	concepto VARCHAR(100) NOT NULL,
	monto NUMERIC(8,4) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    fk_cliente INTEGER,
    fk_aliado_c INTEGER,
	
	-- Constraints
	CONSTRAINT check_GM_tipo CHECK (tipo IN('campaña', 'remota','regalos corporativos')),
    CONSTRAINT arco_exclusivo_marketing CHECK (
        (fk_cliente IS NOT NULL AND fk_aliado_c IS NULL) OR
        (fk_cliente IS NULL AND fk_aliado_c IS NOT NULL)
    ),
	CONSTRAINT fk_gasto_cli FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) ON DELETE RESTRICT,
    CONSTRAINT fk_gasto_aliado FOREIGN KEY (fk_aliado_c) REFERENCES ALIADOS_COMERCIALES(id) ON DELETE RESTRICT
);

create table PAUTAS(
	numero_OT SERIAL PRIMARY KEY,
	fecha_emision DATE NOT NULL,
	marca VARCHAR(20) NOT NULL,
	coordinadora VARCHAR(20) NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	cantidad_cunas INTEGER NOT NULL,
	costo_cunas NUMERIC(8,4) NOT NULL,
	monto_OC NUMERIC(8,4) NOT NULL,
	monto_OT NUMERIC(8,4) NOT NULL,
	tipo_compra VARCHAR(10) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    observaciones VARCHAR(300),
    programa VARCHAR(100),
    presentadora VARCHAR(50),
    horario DATE,
	fk_vendedor UUID, 
	fk_cliente INTEGER,
	
    -- Constraints
    CONSTRAINT fk_vend FOREIGN KEY (fk_vendedor) references VENDEDORES(usuario_id),
	CONSTRAINT fk_client FOREIGN KEY (fk_cliente) references CLIENTE(id), 
	CONSTRAINT check_tipo_compra CHECK (tipo_compra IN('en vivo', 'rotativa')),
    CONSTRAINT check_tipo_pauta CHECK (tipo_compra = 'rotativa' AND programa 
    IS NOT NULL  AND presentadora IS NOT NULL OR 
    (tipo_compra = 'en vivo' AND presentadora IS NULL AND programa IS NULL)),
	CONSTRAINT check_estado CHECK(estado IN ('programada','en transmision','suspendida','finalizada'))
);

create table CUÑA(
	id SERIAL PRIMARY KEY,
	duracion varchar(5) NOT NULL,
	cortina VARCHAR(20) NOT NULL,
	mensaje VARCHAR(100) NOT NULL,
	fk_pauta INTEGER NOT NULL,

    -- Constraints
	CONSTRAINT fk_pau FOREIGN KEY (fk_pauta) references PAUTAS(numero_OT)
);

CREATE TABLE HISTORICO_NEGOCIACIONES (
    id SERIAL PRIMARY KEY,                    
    fecha_inicio DATE NOT NULL,             
    fecha_fin DATE,                           
    monto_negociacion NUMERIC(15, 2) NOT NULL, 
    tipo_negociacion VARCHAR(100) NOT NULL,   
    fk_pauta INTEGER NOT NULL,             
    
    -- Constraints
    CONSTRAINT fk_pauta_historico FOREIGN KEY (fk_pauta) REFERENCES PAUTAS (numero_ot) ON DELETE CASCADE
);

CREATE TABLE DETALLE_PAUTA (
    id SERIAL PRIMARY KEY,              
    fk_pauta INTEGER NOT NULL,          
    fk_aliado INTEGER NOT NULL,         
    cantidad_emisoras INTEGER NOT NULL,          

    --Constraints
    CONSTRAINT fk_pauta_detalle FOREIGN KEY (fk_pauta) REFERENCES PAUTAS(numero_ot) ON DELETE CASCADE,
    CONSTRAINT fk_aliado_detalle FOREIGN KEY (fk_aliado) REFERENCES ALIADOS_COMERCIALES(id),
	CONSTRAINT pauta_aliado_unique UNIQUE (fk_pauta, fk_aliado)
);