# Arquitectura del Proyecto CRM

Este documento sirve como "El Mapa" del proyecto para entender su estructura, tecnologías, convenciones y modelos de datos de un vistazo.

## Stack Tecnológico
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL

## Estructura de Carpetas (Silos Estrictos y MVC)
La arquitectura se basa en el patrón MVC (Modelo-Vista-Controlador), dividida estrictamente en dos repositorios/carpetas principales para mantener la modularización y separar las responsabilidades de UI y servidor:

```text
/ (raíz del proyecto)
├── frontend/
│   ├── public/          # Assets estáticos del proyecto en general (imágenes, iconos, fuentes)
│   └── views/           # Vistas del frontend
│       ├── html/        # Archivos y plantillas HTML
│       ├── css/         # Estilos y configuración de Tailwind CSS
│       └── js/          # Componentes React y lógica de interacción
└── backend/
    ├── config/          # Configuración general y conexión a la base de datos PostgreSQL
    ├── model/           # Modelos de bases de datos y consultas (queries aisladas)
    ├── controller/      # Controladores con la lógica de negocio
    └── router/          # Implementación y definición de endpoints y rutas de la API
```

## Convenciones de Código
- **Silos Estrictos de Base de Datos:** Las consultas (queries) nunca se escriben en componentes de frontend o directamente en el router. Toda gestión a la base de datos pasa exclusivamete por `/backend/model`.
- **Archivos Pequeños:** Mantener los archivos bajo 600-900 líneas. Si un componente de React, controlador o modelo supera este límite, se debe extraer y dividir en sub-componentes lógicos.
- **Reducción de Ruido IA (.aiignore):** Carpetas de dependencias (`node_modules`), builds transpilados (`dist`, `build`), y medios estáticos pesados deben estar ignorados para los Agentes y control de versiones a través de archivos como `.claudeignore` y `.gitignore`.

## Esquema de Base de Datos (Modelo ER)
Resumen de las tablas, entidades y atributos principales extraídos del modelo relacional del CRM.

### Clientes y Contacto
*   **CLIENTE (EMPRESA):** Cod (PK), nombre, razón_social, Direccion, RIF fiscal, Clasificacion (Agencia o Cliente directo), Sector, Estado (Activo, Inactivo), Observacion
*   **CONTACTO (EMISORA O CLIENTE):** ID (PK), fecha_nacimiento, primer_nombre, segundo_nombre, primer_apellido, departamento, correo, anotaciones_especiales, rol, tipo (emisora, cliente)
*   **TELEFONO:** codigo_area, cuerpo

### Proveedores y Aliados
*   **ALIADO COMERCIAL:** ID (PK), razón_social, nombre emisora, Rif, Frecuencia, categoría, dirección, estado (Activo,Inactivo,Cerrado)
*   **CATEGORÍA_EMISORA:** ID (PK), nombre

### Publicidad y Pautas
*   **PAUTA:** numero_OT (PK), fecha_emision, marca, segundos, Fecha_inicio, Fecha_Fin, cantidad_cuñas, costo_cuña, monto_OC, monto_OT, tipo_compra (rotativa, en vivo), estado (programada, en transmisión, suspendida, finalizada), observaciones
*   **CUÑA:** id (PK), duración, cortina, segundos, mensaje
*   **MARCA:** Nombre, observaciones
*   **COBERTURA:** ID (PK), Punto Inicio, Punto Fin, Descripcion

### Negociaciones e Interacciones
*   **HISTORICO DE NEGOCIACIONES:** ID (PK), Fecha_inicio, Fecha_fin, Monto_negociación, Cantidad_cuñas
*   **VENDEDOR:** Cod (PK), Nombre, segundo nombre, apellido, segundo apellido, Meta, Correo
*   **VISITA:** ID (PK), Fecha, Hora, Objetivo_visita, lugar, efectiva (si, no), tipo (llamada, presencial), detalle
*   **LUGAR:** Cod (PK), Nombre, Tipo (región, estado, ciudad), Descripcion

### Gastos
*   **GASTO VISITA:** ID (PK), Fecha, Concepto, monto, categoría (transporte, alimentación, peaje, estacionamiento, regalos, otros)
*   **GASTO MARKETING:** ID (PK), Fecha, Concepto, monto, tipo (campaña, remota, regalos corporativos)

### Usuarios y Roles del Sistema
*   **USUARIO:** ID (PK), Nombre_Cuenta, Contraseña
*   **ADMIN:** ID (PK), Nombre, Apellido, Correo
*   **DIRECTOR:** ID (PK), Nombre, Apellido, Correo
