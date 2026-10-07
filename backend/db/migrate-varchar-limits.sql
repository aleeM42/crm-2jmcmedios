-- ==============================================
-- Migración: ajustes de VARCHAR y nuevo sector
-- Fecha: 2026-10-07
-- ==============================================

-- 1. Ampliar detalle de visita: VARCHAR(100) → VARCHAR(500)
ALTER TABLE VISITAS
  ALTER COLUMN detalle TYPE VARCHAR(500);

-- 2. Agregar 'Bebidas' al CHECK de sector en CLIENTE
--    PostgreSQL no permite ALTER sobre un CHECK con enum inline directamente;
--    hay que eliminar la constraint y recrearla.
ALTER TABLE CLIENTE
  DROP CONSTRAINT IF EXISTS chk_sector;

ALTER TABLE CLIENTE
  ADD CONSTRAINT chk_sector CHECK (
    sector IN (
      'Salud', 'Alimentación', 'Telemática', 'Ferretería',
      'Bancario', 'Aerolínea', 'Moda', 'Automotriz',
      'Envíos', 'Bebidas', 'Otro'
    )
  );

-- 3. Ampliar numero_OC: VARCHAR(20) → VARCHAR(45)
ALTER TABLE PAUTAS
  ALTER COLUMN numero_OC TYPE VARCHAR(45);

-- 4. Ampliar numero_OT: VARCHAR(20) → VARCHAR(30)
ALTER TABLE PAUTAS
  ALTER COLUMN numero_OT TYPE VARCHAR(30);
