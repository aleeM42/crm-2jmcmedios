-- 1. Actualizamos la función lógica
CREATE OR REPLACE FUNCTION validar_jerarquia_lugar()
RETURNS TRIGGER AS $$
DECLARE
    tipo_padre VARCHAR(30);
BEGIN
    -- Si es una región, no tiene padre, todo está bien.
    IF NEW.tipo = 'Región' THEN
        RETURN NEW;
    END IF;

    -- Buscamos el tipo del padre
    SELECT tipo INTO tipo_padre FROM LUGAR WHERE id = NEW.fk_lugar;

    -- Validamos las reglas exactas (NUEVA LÓGICA SIMPLIFICADA)
    IF NEW.tipo = 'Estado' AND tipo_padre != 'Región' THEN
        RAISE EXCEPTION 'Error: Un Estado solo puede pertenecer a una Región. Tipo de padre intentado: %', tipo_padre;
    END IF;

    IF NEW.tipo = 'Ciudad' AND tipo_padre != 'Estado' THEN
        RAISE EXCEPTION 'Error: Una Ciudad solo puede pertenecer a un Estado. Tipo de padre intentado: %', tipo_padre;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_jerarquia_lugar
BEFORE INSERT OR UPDATE ON LUGAR
FOR EACH ROW
EXECUTE FUNCTION validar_jerarquia_lugar();