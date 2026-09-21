# Las 7 páginas y sus HU

**Estado: Colección (listado + ficha) construida en F2/F3; el resto pendiente** (ver
[06-estado-fases.md] y `PLAN.md` en la raíz). Resumen de estructura y qué HU cubre cada una
(spec §8, `docs/historias-usuario.md`).

| Página | Estructura prevista | HU | Fase |
|---|---|---|---|
| Panel principal | KPIs (total piezas, % catalogación, sin imagen, en restauración) + gráfico distribución por colección + alertas | HU-17, HU-09 | F4 |
| Colección | **Completa (F2+F3)**: `pages/coleccion/ColeccionPage.tsx` — filtros básicos (`FiltroPanel`, 7 criterios en el orden §7 + búsqueda por código/nombre) + retícula de `TarjetaColeccion` (1/3/4 columnas) + `Paginacion` (12 por página); filtros y página viven en la URL. Ficha (`pages/coleccion/FichaPage.tsx`, ruta `/coleccion/:id`): imagen a la izquierda (botón abre modal `<dialog>` con overlay `bg-azul/60`, sin galería multi-imagen porque el modelo `Pieza` solo tiene un campo `imagen`), datos técnicos + descripción a la derecha, nombre en `font-acento italic`, `Chip` de estado, migas de pan (`>` en escritorio, botón "volver" con `chevron-left` en móvil). Flujo de aprobación HU-05 inline: botones según rol (ver abajo) que llaman `useCambiarEstadoFicha` (`PATCH /api/piezas/:id/estado`); rechazo exige `CampoTexto` de justificación antes de habilitar "Confirmar rechazo". | HU-01 a HU-05 | F2 ✅, F3 ✅ |
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

## Flujo de aprobación de ficha (HU-05, botones por rol en `FichaPage`)

`Borrador → En revisión → Aprobada / Rechazada` (`Rechazada` puede reenviarse a `En revisión`).
Botones **visibles pero deshabilitados** si el rol no permite la acción (spec §5, no se
ocultan): "Enviar a revisión" (Administrador, Catalogador; estado Borrador o Rechazada);
"Aprobar"/"Rechazar" (Administrador, Curador; estado En revisión). Consulta ve los botones
siempre deshabilitados (solo lectura). Conservador no llega a esta página (fuera de RBAC de
Colección, ver [02-rbac-y-rutas.md]).

Ver [02-rbac-y-rutas.md] para qué rol ve cada página.
