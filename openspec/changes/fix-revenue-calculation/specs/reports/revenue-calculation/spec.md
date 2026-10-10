# Spec Delta

## Purpose

Define y estandariza el cálculo de ingresos y ganancias netas en los reportes y dashboard para evitar la duplicación de montos de Órdenes de Compra (OC).

## ADDED Requirements

### Requirement: Ingresos definidos como Ganancia Neta
El sistema DEBE unificar el concepto de "Ingresos" (Ventas) y calcularlo siempre como la Ganancia Neta de la Orden de Compra. La fórmula a utilizar DEBE ser el Monto de la OC menos la suma de los Montos de las OT (Pautas) asociadas.

#### Scenario: Cálculo de ingreso de una OC
- **WHEN** el sistema procesa una Orden de Compra (OC) con monto $1000 y dos pautas (OTs) de $300 y $400 respectivamente.
- **THEN** el ingreso o "Venta" atribuido a esa OC debe ser exactamente $300 ($1000 - $700).

### Requirement: Deduplicación de Órdenes de Compra
El sistema DEBE contar cada Orden de Compra (OC) y su monto exactamente una vez al agregar datos por cliente, región, emisora o mes, independientemente de la cantidad de pautas (OT) asociadas a dicha OC.

#### Scenario: Agregación de ingresos por cliente con múltiples pautas
- **WHEN** un cliente tiene 1 OC de $2000 que está dividida en 5 pautas distintas (OT).
- **THEN** el reporte de clientes por inversión suma exactamente la ganancia neta de esa única OC, sin multiplicarla por 5.

### Requirement: Asignación temporal por primera emisión
El sistema DEBE asignar el ingreso consolidado de una Orden de Compra al mes y año correspondiente a la fecha de la **primera emisión** de las pautas pertenecientes a esa OC.

#### Scenario: OC con pautas en meses distintos
- **WHEN** una OC tiene una pauta que comienza el 15 de enero y otra pauta que comienza el 10 de febrero.
- **THEN** la ganancia neta completa de esa OC se contabiliza en los ingresos del mes de enero.
