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
	meta INTEGER NOT NULL,
	tipo VARCHAR NOT NULL,
	fk_vend INTEGER
	CONSTRAINT chk_tipo
        CHECK (tipo IN ('Vendedor', 'Director')), 
	CONSTRAINT fk_vende
	FOREIGN KEY (fk_vendedor) references vendedores(id)
);

CREATE TABLE CONTACTOS (
    id SERIAL PRIMARY KEY, -- #ID en el diagrama [cite: 73]
    fecha_nac DATE, -- o fecha_nacimiento [cite: 74]
    pri_nombre VARCHAR(50) NOT NULL, -- *primer_nombre [cite: 75]
    seg_nombre VARCHAR(50), -- segundo_nombre [cite: 76]
    pri_apellido VARCHAR(50) NOT NULL, -- *primer_apellido [cite: 77]
    departamento VARCHAR(50) NOT NULL, -- *departamento [cite: 78]
    correo VARCHAR(100) NOT NULL, -- *correo [cite: 79]
    anotac_especiales TEXT, -- o anotaciones especiales [cite: 80]
    rol VARCHAR(30) NOT NULL, -- rol [cite: 81]
    tipo VARCHAR(20) NOT NULL, -- tipo (emisora, cliente) 
    fk_cliente INTEGER, -- Relación "Tiene" con CLIENTE [cite: 68]

    -- CONSTRAINTS
    CONSTRAINT check_tipo CHECK (tipo IN ('emisora', 'cliente')),
    CONSTRAINT fk_a_client 
        FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) 
        ON DELETE CASCADE
); -- <-- Asegúrate de que este punto y coma esté presente

CREATE TABLE A_CONTACT(
    fk_a_c INTEGER NOT NULL
    fk_contacto INTEGER NOT NULL,
    CONSTRAINT pk_chk
    PRIMARY KEY(fk_a_c,fk_contacto),
    CONSTRAINT fk_a_comercial
	FOREIGN KEY (fk_a_c) references ALIADOS_COMERCIALES(id),
    CONSTRAINT fk_contact
	FOREIGN KEY (fk_contacto) references CONTACTOS(id),

    
);

create table ALIADOS_COMERCIALES(
	id SERIAL PRIMARY KEY;
	razon_social VARCHAR(80) NOT NULL,
	nombre_emisora VARCHAR(50) NOT NULL,
	rif VARCHAR(9) NOT NULL,
    fk_lugar INTEGER,
    fk_region INTEGER,
    fk_coberturab
	
	frecuencia VARCHAR(2) NOT NULL,
	CONSTRAINT check_AC_frecuencia CHECK (frecuencia IN ('AM','FM')),
	
	categoria VARCHAR(30) NOT NULL,
	CONSTRAINT check_AC_categoria CHECK (categoria IN ('latinos' ,'exitos urbanos recientes'  ,'exitos latinos recientes' ,'exitos juveniles' ,'merengue' ,'exitos recientes ','baladas en ingles' ,'baladas en español ','bachata' ,'salsa' ,'merengue' ,'regueton' ,'pop baladas en ingles ','pop baladas en español','tropical' ,'multitarget ','musica' ,'entretenimiento ','información' ,'venezolanas' ,'retro' )),
	direccion VARCHAR(100) NOT NULL,
	
	estado VARCHAR(30) NOT NULL,
	CONSTRAINT check_AC_estado CHECK (estado IN ('activo','inactivo','cerrado')),


    
	
);

CREATE TABLE MARCA_INTER (
    nombre VARCHAR(150) NOT NULL,       
    observaciones TEXT,                 
    fk_cliente INTEGER NOT NULL,        

    PRIMARY KEY (fk_cliente, nombre),

    CONSTRAINT fk_cliente_marca 
        FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) 
        ON DELETE CASCADE
);

Create table VISITAS(
	id SERIAL PRIMARY KEY,
	fecha DATE 	NOT NULL,
	hora DATE NOT NULL,
	objetivo_visita VARCHAR(100) NOT NULL,
	lugar VARCHAR(100) NOT NULL,
	fk_contacto INTEGER not NULL,
	fk_vendedor INTEGER not NULL,
	
	efectiva VARCHAR(2) NOT NULL,
	CONSTRAINT check_efectiva CHECK (efectiva 	IN ('si', 'no')),
	
	tipo VARCHAR(20) NOT NULL,
	CONSTRAINT check_tipo CHECK (tipo 	IN ('llamada', 'presencial')),
	
	detalle VARCHAR(100)

	CONSTRAINT fk_vendedor
	FOREIGN KEY (fk_vendedor) references vendedores(id) ON DELETE RESTRICT,
	CONSTRAINT fk_contacto
	FOREIGN KEY (fk_contacto) references CONTACTOS(id) ON DELETE CASCADE,
	
);

Create table GASTOS_VISITAS (
	id SERIAL PRIMARY KEY,
	fecha DATE NOT NULL,
	concepto VARCHAR(100) NOT NULL,
	monto NUMBER(8) NOT NULL,
    fk_visita INTEGER NOT NULL,
	
	categoria VARCHAR(50) NOT NULL,
	CONSTRAINT check_GV_categoria 
    CHECK (categoria IN ('transporte','alimentacion','peaje','estacionamiento','regalos','otros')),
    CONSTRAINT fk_visit
	FOREIGN KEY (fk_visita) references VISITAS(id) ON DELETE CASCADE,

);

create table GASTOS_MARKETING (
	id SERIAL PRIMARY KEY,
	fecha DATE NOT NULL,
	concepto VARCHAR(100) NOT NULL,
	monto NUMBER(8) NOT NULL,
    fk_cliente INTEGER,
    fk_aliado_c INTEGER,
	
	tipo VARCHAR(50) NOT NULL,
	CONSTRAINT check_GM_tipo CHECK (tipo IN('campaña', 'remota','regalos corporativos')),

    CONSTRAINT arco_exclusivo_marketing CHECK (
        (fk_cliente IS NOT NULL AND fk_aliado_c IS NULL) OR
        (fk_cliente IS NULL AND fk_aliado_c IS NOT NULL)
    ),

	CONSTRAINT fk_gasto_cli FOREIGN KEY (fk_cliente) 
        REFERENCES CLIENTE(cod) ON DELETE RESTRICT,
        
    CONSTRAINT fk_gasto_aliado FOREIGN KEY (fk_aliado_c) 
        REFERENCES ALIADO_COMERCIAL(id) ON DELETE RESTRICT

);

CREATE TABLE usuarios ( 
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
	nombre VARCHAR(100) NOT NULL, 
	apellido VARCHAR(100) NOT NULL, 
	correo VARCHAR(255) UNIQUE NOT NULL, 
	password_hash VARCHAR(255) NOT NULL, 
	rol VARCHAR(100) NOT NULL, 
	estado VARCHAR NOT NULL , 
	intentos_fallidos INTEGER NOT NULL DEFAULT 0, 
	bloqueado_hasta TIMESTAMP WITH TIME ZONE, 
	ultimo_acceso TIMESTAMP WITH TIME ZONE, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT rol_chk CHECK (rol IN('Vendedor', 'Invitado','Director','Administrador','Gestor de Pautas')),
	CONSTRAINT estado_chk CHECK (estado_chk IN('Suspendido', 'Activo')),

);


create table PAUTAS(
	numero_OT PRIMARY KEY,
	fecha_emision DATE NOT NULL,
	marca VARCHAR(20) NOT NULL,
	coordinadora VARCHAR(20) NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	cantidad_cunas NUMBER(4) NOT NULL,
	costo_cunas NUMBER(8) NOT NULL,
	monto_OC NUMBER(8) NOT NULL,
	monto_OT NUMBER(8) NOT NULL,
	tipo_compra VARCHAR(10) NOT NULL,
	fk_vendedor INTEGER, 
	fk_cliente INTEGER,
	CONSTRAINT fk_vend
	FOREIGN KEY (fk_vendedor) references VENDEDORES(id),
	CONSTRAINT fk_client
	FOREIGN KEY (fk_cliente) references CLIENTE(id), 

	CONSTRAINT check_tipo_compra CHECK (tipo_compra IN('en vivo', 'rotativa')),
	estado VARCHAR(20) NOT NULL,
	CONSTRAINT check_estado CHECK(estado IN ('programada','en transmision','suspendida','finalizada')),
	observaciones VARCHAR(150) ,
	programa VARCHAR(100),
	presentadora VARCHAR(50),
	horario DATE,
);

create table CUÑA(
	id SERIAL PRIMARY KEY,
	duracion varchar(5) NOT NULL,
	cortina VARCHAR(20) NOT NULL,
	mensaje VARCHAR(100) NOT NULL,
	fk_pauta INTEGER NOT NULL,
	CONSTRAINT fk_pau
	FOREIGN KEY (fk_pauta) references PAUTAS(id),
	
);


CREATE TABLE HISTORICO_NEGOCIACIONES (
    id SERIAL PRIMARY KEY,                    
    fecha_inicio DATE NOT NULL,             
    fecha_fin DATE,                           
    monto_negociacion NUMERIC(15, 2) NOT NULL, 
    tipo_negociacion VARCHAR(100) NOT NULL,   
    
   
    fk_pauta INTEGER NOT NULL,             
    
    CONSTRAINT fk_pauta_historico 
        FOREIGN KEY (fk_pauta) REFERENCES PAUTA(numero_ot) 
        ON DELETE CASCADE
);


CREATE TABLE DETALLE_PAUTA (
    id SERIAL PRIMARY KEY,              
    fk_pauta INTEGER NOT NULL,          
    fk_aliado INTEGER NOT NULL,         
    cantidad_emisoras INTEGER NOT NULL,          

    CONSTRAINT fk_pauta_detalle 
        FOREIGN KEY (fk_pauta) REFERENCES PAUTA(numero_ot) 
        ON DELETE CASCADE,

    CONSTRAINT fk_aliado_detalle 
        FOREIGN KEY (fk_aliado) REFERENCES ALIADO_COMERCIAL(id) 

	CONSTRAINT pauta_aliado_unique UNIQUE (fk_pauta, fk_aliado);
);

CREATE TABLE CATEGORIA_EMISORA (
    id SERIAL PRIMARY KEY,              
    nombre VARCHAR(100) NOT NULL UNIQUE 
);

CREATE TABLE C_M (
    fk_aliado INTEGER NOT NULL,
    fk_categoria INTEGER NOT NULL,

    PRIMARY KEY (fk_aliado, fk_categoria),
    
    CONSTRAINT fk_cm_aliado 
        FOREIGN KEY (fk_aliado) REFERENCES ALIADO_COMERCIAL(id) 
        ON DELETE CASCADE,
        
    CONSTRAINT fk_cm_categoria 
        FOREIGN KEY (fk_categoria) REFERENCES CATEGORIA_EMISORA(id) 
        ON DELETE CASCADE
);