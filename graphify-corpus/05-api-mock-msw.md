# API mock con MSW

**Estado: activo desde F2.** `src/mocks/handlers.ts` (handlers), `src/mocks/datos.ts` (datos
deterministas + vocabularios), `src/mocks/browser.ts` (`setupWorker`). El worker arranca en
`src/main.tsx` solo con `import.meta.env.DEV` (import dinámico → fuera del bundle de prod);
si el navegador bloquea Service Workers, la app arranca igual y las pantallas muestran su
estado de error. Script del SW: `public/mockServiceWorker.js` (generado por `msw init`,
registrado en `package.json > msw.workerDirectory`). Tests: `setupServer(...handlers)` de
`msw/node` en cada `*.test.tsx` que consuma la API (no hay servidor global en `test-setup.ts`).

## Cliente HTTP — `src/lib/api.ts`

`apiGet<T>(path, params?)`: arma la URL (omite params vacíos/undefined), lanza `ApiError`
(`status`, `message` = `detail` del body, forma FastAPI) si `!res.ok`. `apiPatch<T>(path, body)`
(F3): PATCH con JSON, mismo manejo de `ApiError`. `VITE_API_URL` como prefijo opcional: migrar
a FastAPI real es cambiar ese archivo, no las pantallas.

## Contrato futuro (FastAPI + Supabase real)

MSW imita la FORMA de la API (rutas `/api/...`, códigos, shape JSON, latencia 400 ms — 0 en
`MODE=test`). Errores con `{ detail: string }` como FastAPI.

## Endpoints existentes

| Endpoint | Método | Fase | HU | Notas |
|---|---|---|---|---|
| `/api/piezas` | GET | F2 | HU-01..05 (listado) | Query: `pagina` (1..), `porPagina` (≤48, def. 12), `q` (código o nombre, substring), filtros exactos `coleccion`, `procedencia`, `autor`, `material`, `epoca`, `estadoConservacion`, `estadoFicha`. Respuesta `PaginaPiezas { datos, total, pagina, porPagina }` |
| `/api/piezas/filtros` | GET | F2 | HU-01..05 | `OpcionesFiltros`: opciones por filtro (vocabularios del mock) |
| `/api/piezas/:id` | GET | F2/F3 | HU-01..05 (ficha) | `Pieza` o 404 `{ detail }` |
| `/api/piezas/:id/estado` | PATCH | F3 | HU-05 | Body `{ estado, justificacion? }`. Transiciones válidas: Borrador→En revisión, En revisión→Aprobada/Rechazada, Rechazada→En revisión (tabla `TRANSICIONES` en `handlers.ts`). 400 si la transición no está permitida o si `estado: 'Rechazada'` sin `justificacion` no vacía. 404 si no existe la pieza. Devuelve la `Pieza` actualizada (muta el array `PIEZAS` en memoria — se resetea al recargar). |

## Datos del mock (`datos.ts`)

50 piezas `Pieza 001..050`, generadas por índice (sin aleatorio → tests estables).
Vocabularios genéricos: Colección A-D, Zona Norte/Centro/Sur/Oriente, Autor 1-3/desconocido,
Material A-E, Siglo XIX..XXI, conservación Bueno/Regular/Malo/Requiere restauración, ficha
Borrador/En revisión/Aprobada/Rechazada, régimen Propiedad/Comodato/Préstamo temporal.
Reglas §7 respetadas: **comodato → `codigo` vacío**; 1 de cada 9 sin imagen (`imagen: null`).
Imágenes: SVG 1:1 plano con colores de la paleta como `data:` URI (sin archivos, §12).

Tipos en `src/types/pieza.ts`: `Pieza`, `EstadoFicha`, `EstadoConservacion`, `Regimen`,
`FiltrosPieza`, `PaginaPiezas`, `OpcionesFiltros`.

Ver [06-estado-fases.md] para la fase actual.
