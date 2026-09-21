# Las 7 páginas y sus HU

**Estado: ninguna construida todavía** (fases F1-F9, ver [06-estado-fases.md] y
`PLAN.md` en la raíz). Resumen de estructura y qué HU cubre cada una (spec §8,
`docs/historias-usuario.md`).

| Página | Estructura prevista | HU | Fase |
|---|---|---|---|
| Panel principal | KPIs (total piezas, % catalogación, sin imagen, en restauración) + gráfico distribución por colección + alertas | HU-17, HU-09 | F4 |
| Colección | Filtros básicos + retícula de tarjetas + paginación; ficha individual: galería + datos técnicos + flujo de aprobación | HU-01 a HU-05 | F2, F3 |
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
