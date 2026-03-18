-- ==============================================
-- Migración: Hacer fk_contacto nullable en TELEFONOS
-- Permite almacenar teléfonos directos de vendedores
-- (sin contacto asociado)
-- ==============================================

ALTER TABLE TELEFONOS ALTER COLUMN fk_contacto DROP NOT NULL;
