# Las 7 páginas y sus HU

**Estado: Colección (listado) construida en F2; el resto pendiente** (ver [06-estado-fases.md] y
`PLAN.md` en la raíz). Resumen de estructura y qué HU cubre cada una (spec §8,
`docs/historias-usuario.md`).

| Página | Estructura prevista | HU | Fase |
|---|---|---|---|
| Panel principal | KPIs (total piezas, % catalogación, sin imagen, en restauración) + gráfico distribución por colección + alertas | HU-17, HU-09 | F4 |
| Colección | **Listado hecho (F2)**: `pages/coleccion/ColeccionPage.tsx` — filtros básicos (`FiltroPanel`, 7 criterios en el orden §7 + búsqueda por código/nombre) + retícula de `TarjetaColeccion` (1/3/4 columnas) + `Paginacion` (12 por página); filtros y página viven en la URL (`?q=&coleccion=&pagina=`). Estados: carga (retablo gris), vacío (retablo + "Limpiar filtros"), error (`triangle-alert` + Reintentar). Tarjeta enlaza a `/coleccion/:id` (ruta de F3, aún sin página). Ficha individual: F3 | HU-01 a HU-05 | F2 ✅, F3 |
| Ubicación y movimientos | Jerarquía sede→espacio→mueble→nivel→contenedor + QR + formulario de traslado + historial | HU-07, HU-08 | F6 |
| Importación | Excel/CSV → mapeo columnas → preview con errores → gestión duplicados → reporte | HU-10 a HU-13 | F7 |
| Consultas y reportes | Búsqueda multifacética AND/OR + retícula resultados + export PDF/Excel mock | HU-14 a HU-16 | F5 |
| Asistente IA | Chips sugerencia etiquetas + descripción asistida + chat RAG/Text-to-SQL + bandeja duplicados | HU-18 a HU-21 | F8 |
| Administración | CRUD usuarios/roles + catálogos maestros + bitácora | HU-06, HU-22 | F9 |

## Distinción Colección vs. Consultas y reportes

No son el mismo componente aunque ambas tengan filtros: Colección es la pantalla de
trabajo/CRUD (filtros básicos de apoyo a edición); Consultas y reportes es búsqueda
avanzada de solo lectura sobre todo el catálogo (AND/OR, conteo en vivo, exportación).
Comparten hooks/servicios de datos (§18), pero difieren en UI.

Ver [02-rbac-y-rutas.md] para qué rol ve cada página.
