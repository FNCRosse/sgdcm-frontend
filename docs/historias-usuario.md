# Historias de Usuario v1.0 (22 HU, 6 módulos, 5 roles)

## Roles (actores)
- **Administrador:** control total, usuarios/roles, catálogos maestros, auditoría.
- **Curador:** valida fichas, curaduría, reportes especializados. (La Matriz de Requerimientos lo llama "Gestor de colecciones".)
- **Catalogador:** registro inicial, carga de adjuntos, importación masiva. (Matriz: "Catalogador/practicante".)
- **Conservador:** estado de conservación, ubicación física, traslados.
- **Usuario de Consulta:** solo lectura, buscar/filtrar/ver. (Matriz añade "Consulta externa", preparado pero no activo en esta fase.)

## Módulo 1: Gestión de Colecciones (CRUD Core)
- **HU-01** Catalogador registra nueva pieza (nombre, material, técnica) → código de inventario único autogenerado (MATP-2026-XXXX), auditoría.
- **HU-02** Catalogador clasifica pieza por colección/subcolección (listas anidadas dependientes).
- **HU-03** Conservador registra/actualiza estado de conservación (Bueno/Regular/Malo/Requiere Restauración); "Requiere Restauración" prioriza en tablero; historial inmutable.
- **HU-04** Catalogador adjunta fotos (JPG/PNG ≤15MB) y PDF (≤25MB); miniaturas automáticas; imagen de portada designable.
- **HU-05** Curador aprueba/rechaza ficha: flujo Borrador → En Revisión → Aprobado/Rechazado; rechazo exige justificación; solo "Aprobado" es consultable/exportable.
- **HU-06** Administrador gestiona catálogo maestro de materiales/técnicas (CRUD restringido a Admin; bloquea eliminar términos en uso).

## Módulo 2: Ubicación y Control Físico
- **HU-07** Conservador registra ubicación física (sala/estante/caja) + código QR/barras.
- **HU-08** Conservador registra traslado con motivo obligatorio (Préstamo/Exposición/Restauración/Reordenamiento); traza de auditoría inmutable origen→destino.
- **HU-09** Administrador recibe alerta visual (badge + widget en dashboard) por piezas con ubicación o conservación en blanco.

## Módulo 3: Importación y Calidad de Datos (Excel)
- **HU-10** Catalogador sube Excel/CSV (.xlsx/.csv, ≤10MB), procesamiento asíncrono con barra de progreso.
- **HU-11** Catalogador mapea columnas del Excel a campos del sistema (interfaz interactiva, autocompletado por similitud, plantillas de mapeo reutilizables).
- **HU-12** Catalogador ve pantalla de Previsualización y Errores (celdas erróneas en rojo, edición inline, reporte descargable de inconsistencias).
- **HU-13** Sistema detecta duplicados por código de inventario; opciones: omitir/sobrescribir/nueva versión; informe final de insertados/actualizados/omitidos.

## Módulo 4: Consulta, Búsqueda y Reportes
- **HU-14** Usuario de Consulta busca por código o palabra clave (Full-Text Search sobre código/título/descripción/técnica/material, <1.5s, paginado).
- **HU-15** Curador aplica filtros combinados (colección + rango de años + material...), panel multifacético, AND/OR, conteo dinámico.
- **HU-16** Curador exporta resultados a PDF (estilo catálogo, miniatura + datos + encabezado oficial) y Excel (plano estructurado); descarga vía enlace temporal seguro.
- **HU-17** Administrador ve dashboard ejecutivo: total de piezas, % catalogación completa, piezas sin foto, piezas en restauración; gráficos por colección/subcolección.

## Módulo 5: Inteligencia Artificial (modelo Gemma 4)
- **HU-18** Catalogador recibe sugerencias de etiquetas/categorías (chips aceptar/ignorar/editar) al redactar la descripción.
- **HU-19** Catalogador genera descripción extendida asistida por IA (habilitado solo si material/técnica/época están completos); requiere revisión y confirmación explícita antes de guardar.
- **HU-20** Curador usa chatbot RAG/Text-to-SQL sobre el inventario ("¿Cuántos textiles de Ayacucho tenemos?"), responde con datos precisos y enlaces a fichas, restringido a datos autorizados.
- **HU-21** Administrador recibe bandeja semanal (batch programado) de posibles "piezas duplicadas encubiertas" (similitud semántica y de imágenes >85%), vista comparativa, opciones Fusionar/Descartar/Confirmar como distintas.

## Módulo 6: Seguridad y Autenticación
- **HU-22** Administrador crea usuarios y asigna roles (RBAC); integración SSO PUCP/Google Workspace; bitácora de seguridad de acciones críticas (alta, modificación, eliminación, descargas masivas).
