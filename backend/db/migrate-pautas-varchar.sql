-- Migración de actualización de esquema: Ampliación de campos en tabla PAUTAS
-- Fecha: 2026-09-09
-- Descripción: Amplía la longitud máxima de 'marca' y 'coordinadora' a 100 caracteres sin afectar los datos existentes.

ALTER TABLE PAUTAS ALTER COLUMN marca TYPE VARCHAR(100);
ALTER TABLE PAUTAS ALTER COLUMN coordinadora TYPE VARCHAR(100);
