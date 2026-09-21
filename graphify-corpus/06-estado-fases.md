# Estado de fases

**Fase actual: F3 ✅ (cerrada el 2026-09-20).** Próxima: F4 (Panel principal: KPIs, gráfico de
distribución por colección, alertas de datos incompletos). Ver `PLAN.md` en la raíz.

## Qué está hecho

- **F0**: repo en GitHub, scaffold Vite + React + TS, deps del stack, carpetas §16, assets de
  marca en `public/brand/`, spec y HU copiados, grafo del prototipo.
- **F1**: tokens §3 + `@theme` Tailwind 4; foco global; `AuthProvider` mock (5 usuarios,
  `museo2026`); router con guard `RequiereSesion`; shell `Layout`/`Header`/`NavEnlaces`;
  `LoginPage`; `Boton`, `CampoTexto`; 9 tests (`src/app/rutas.test.tsx`).
- **F2**: MSW activo (`src/mocks/`, `/api/piezas`, `/api/piezas/filtros`, `/api/piezas/:id`,
  50 piezas genéricas); `lib/api.ts`; `types/pieza.ts`; hook `usePiezas` (TanStack Query);
  componentes `Chip`, `Paginacion`, `TarjetaColeccion`, `FiltroPanel`; `ColeccionPage`
  (filtros en URL, retícula 1/3/4 col, 12 por página, estados carga/vacío/error);
  5 tests (`src/pages/coleccion/ColeccionPage.test.tsx`, MSW en node). Total 14 tests.
  Verificado visualmente a 375px y escritorio (parche in-page de `fetch` porque el panel
  del navegador integrado bloquea Service Workers — en Chrome normal el worker funciona).
- **F3**: `pages/coleccion/FichaPage.tsx` en `/coleccion/:id` (guard `RequiereSesion` ahora
  matchea rutas hijas por prefijo, no solo exacto); hook `usePieza` + mutación
  `useCambiarEstadoFicha` en `features/fichas/usePiezas.ts`; `apiPatch` en `lib/api.ts`;
  endpoint `PATCH /api/piezas/:id/estado` en `handlers.ts` (flujo Borrador→En revisión→
  Aprobada/Rechazada, rechazo exige justificación); botones de aprobación deshabilitados por
  rol (§5); migas de pan (`>` escritorio / botón "volver" móvil); modal de imagen con
  `<dialog>` nativo. 7 tests nuevos (`FichaPage.test.tsx`). Total 21 tests.

## Qué falta

Panel principal (F4), Consultas, Ubicación, Importación, Asistente IA, Administración;
buscador global (§6, quitado del Header hasta que tenga a dónde navegar — ver desviaciones).

## Decisiones tomadas

- F0: repo hermano de `Diseño - Museo/`; spec y HU fuera de `graphify-corpus/`.
- F1: Tailwind 4 CSS-first (`@theme`); lint = oxlint; sesión mock en `sessionStorage`;
  lo no permitido por rol no se renderiza (nav) y redirige (ruta directa) a `/`.
- F2: filtros/página en `useSearchParams` (no estado local). Selects nativos (§9 no pide
  combobox propio). Imágenes mock como `data:` SVG (cero archivos). MSW arranca con
  `.catch` → la app nunca se queda en blanco si el SW falla. Tests con `msw/node` por
  archivo, no global. `POR_PAGINA = 12` (múltiplo de 3 y 4 → retícula llena).
- F3: galería de una sola imagen (el modelo `Pieza` no tiene array de fotos) → sin
  swipe/puntos, solo botón que abre un `<dialog>` con la imagen ampliada; se añade
  swipe/puntos si el modelo pasa a multi-imagen. Mutación de estado optimista simple
  (`onSuccess` reescribe la query) sin rollback porque MSW no falla aleatoriamente.

## Desviaciones respecto al spec (acumuladas)

- §15 "tailwind.config": sustituido por `@theme` (Tailwind 4).
- §19 "ESLint + Prettier en pre-commit y CI": oxlint + Prettier como scripts; sin CI.
- §6 buscador global: botón quitado del `Header` (sin comportamiento no aportaba); vuelve
  cuando tenga una acción real que navegar.
- §3 espaciado: escala nativa de Tailwind (4px) equivalente a `--space-*`.
- F2 §11 `srcset` en 2 resoluciones: no aplica a SVG vectorial; queda para imágenes reales.
- F2 §10 "cargando: trama del retablo animada": ícono retablo en `--gris-1` + texto con
  `animate-pulse`, no una trama repetida.
- F2 §9 bottom sheet: sin gesto de arrastre (solo botones cerrar/"Ver resultados", que es la
  alternativa por botón que §11 exige); sin trampa de foco (deuda, ver abajo).
- F2 §11 "Filtros de Colección" en escritorio: fila sobre `--fondo-suave`, no panel lateral
  (el spec no fija posición).
- F3 §8/§9 "galería": el modelo `Pieza` solo trae una imagen de portada, así que la
  "galería" es esa imagen + modal de ampliación; no hay swipe/puntos por falta de datos
  multi-imagen que animarlos.

## Bloqueos

Ninguno. `graphify graphify-corpus --update` desde la raíz escribe `graphify-out/` en la raíz.

## Deudas técnicas abiertas

- Sin CI ni pre-commit (spec §19/§20). Sin PWA (deliberado).
- Menú móvil y bottom sheet de filtros no atrapan el foco → F10 (accesibilidad).
- `Paginacion` lista todas las páginas; añadir ventana si hay >10 páginas (comentario
  `ponytail:` en el archivo).
- `.env.example` sin uso hasta que exista cliente Supabase.

Ver [00-prototipo-contexto.md] para el contexto general.
