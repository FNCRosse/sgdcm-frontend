# API mock con MSW

**Estado: sin endpoints todavía.** MSW está instalado (`devDependencies`) pero no
inicializado (sin `src/mocks/`, sin `setupWorker`) — se construye a partir de F1 (login) y
crece por fase (F2 colección, F6 ubicación, F7 importación, etc.).

## Contrato futuro (FastAPI + Supabase real)

El frontend real consumirá FastAPI vía REST/JSON para lógica de negocio y
`@supabase/supabase-js` directo para auth/storage/Postgres. MSW debe imitar la FORMA de
esa API (rutas, códigos de estado, shape de respuesta, errores, latencia simulada) para que
migrar de mock a real sea un cambio de capa `lib/`, no de componentes.

## Convención de endpoints (a seguir según se agreguen)

- Prefijo `/api/...` (ej. `/api/piezas`, `/api/auth/login`).
- Cada endpoint nuevo/modificado se documenta aquí: método, forma de request/response,
  códigos de error usados, y qué HU lo necesita.
- Contenido de los mocks: genérico a propósito ("Pieza 001", "Categoría A", "Ubicación
  B-2"), ~50 registros para probar paginación/filtros. Sin nombres de artesanía inventados.
- Imágenes: placeholders SVG planos con colores de la paleta, no imágenes externas.

## Endpoints existentes

Ninguno todavía. Esta tabla se completa fase a fase:

| Endpoint | Método | Fase | HU |
|---|---|---|---|
| — | — | — | — |

Ver [06-estado-fases.md] para la fase actual.
