-- ============================================================
-- Migración: Soporte de visitas a Prospectos (Oportunidades)
-- Fecha: 2026-09-09
-- Descripción:
--   1. Hace fk_contacto nullable (los prospectos no tienen contacto formal).
--   2. Agrega fk_oportunidad como FK opcional hacia OPORTUNIDADES.
--   3. Agrega CHECK CONSTRAINT que garantiza que siempre haya
--      al menos uno de los dos (fk_contacto OR fk_oportunidad).
-- SEGURO: No borra ni altera datos existentes.
-- ============================================================

-- 1. Relajar la restricción NOT NULL en fk_contacto
ALTER TABLE visitas ALTER COLUMN fk_contacto DROP NOT NULL;

-- 2. Agregar columna fk_oportunidad (nullable)
ALTER TABLE visitas ADD COLUMN IF NOT EXISTS fk_oportunidad INTEGER;

-- 3. FK hacia OPORTUNIDADES
ALTER TABLE visitas
  ADD CONSTRAINT fk_visita_oportunidad
    FOREIGN KEY (fk_oportunidad)
    REFERENCES oportunidades(id)
    ON DELETE SET NULL;

-- 4. Garantizar integridad: siempre debe existir contacto O oportunidad
ALTER TABLE visitas
  ADD CONSTRAINT chk_visita_destino CHECK (
    fk_contacto IS NOT NULL OR fk_oportunidad IS NOT NULL
  );
