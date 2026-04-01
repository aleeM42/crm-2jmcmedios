-- ==============================================
-- Migración: Reestructuración Pautas OC/OT
-- Agrega dias_semana y constraint monto_OC > monto_OT
-- ==============================================

-- 1. Agregar columna dias_semana (ej: "L,M,X,J,V")
ALTER TABLE PAUTAS ADD COLUMN IF NOT EXISTS dias_semana VARCHAR(20);

-- 2. Agregar constraint: monto OC debe ser mayor que monto OT
-- Primero verificar si ya existe para evitar error
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'check_monto_oc_gt_ot'
  ) THEN
    ALTER TABLE PAUTAS ADD CONSTRAINT check_monto_oc_gt_ot 
      CHECK (monto_OC > monto_OT);
  END IF;
END $$;
