# Estado de fases

**Fase actual: F0 ✅ (recién cerrada).** Próxima: F1 (sistema de diseño, layout, router,
AuthProvider mock, login, guards por rol). Ver `PLAN.md` en la raíz para el corte completo
F0-F10.

## Qué está hecho (F0)

- Repo `sgdcm-frontend` creado en GitHub (independiente de la carpeta de diseño), scaffold
  Vite + React + TS, primer commit y push.
- Dependencias del stack fijo instaladas (§15): react-router-dom, @tanstack/react-query,
  @supabase/supabase-js, lucide-react, tailwindcss, msw, vitest + RTL, eslint + plugins,
  prettier.
- Estructura de carpetas de §16 creada (vacía, `.gitkeep`).
- Assets de marca copiados sin modificar a `public/brand/` (Logo_MATP/* + icono pucp.svg).
- `FRONTEND_DESIGN_SPEC.md` y `docs/historias-usuario.md` copiados al repo (autocontenido).
- **Grafo del prototipo: BLOQUEADO.** Ver "Bloqueos" abajo. Las 7 cápsulas están escritas
  y commiteadas; falta correr `graphify graphify-corpus` con éxito.

## Qué falta (todo lo demás)

Tokens→Tailwind, layout/shell, router, auth mock, y las 7 páginas. Ver `PLAN.md`.

## Decisiones tomadas en F0

- Repo nuevo en `PUCP 2026-2/DP2/sgdcm-frontend`, hermano de `Diseño - Museo/`, no anidado.
- `FRONTEND_DESIGN_SPEC.md` y `docs/historias-usuario.md` viven fuera de
  `graphify-corpus/` (son copias de referencia, no cápsulas escritas a mano) para no
  colisionar en numeración ni mezclarse con el grafo del código.

## Bloqueos

- **`graphify graphify-corpus` no puede construir el grafo todavía**: la extracción
  semántica de los 7 `.md` (son texto, no código) necesita un backend LLM. Sin
  `GEMINI_API_KEY`/`GOOGLE_API_KEY`/`ANTHROPIC_API_KEY`/etc. en el entorno, y el backend
  `claude-cli` falla con `OAuth session expired and could not be refreshed` (la sesión de
  `claude` CLI local, separada de esta sesión de Claude Code, no está autenticada).
  **Acción pendiente del usuario**: exportar una API key soportada (Gemini tiene tier
  gratis) o correr `claude login` para refrescar la CLI, y luego `graphify
  graphify-corpus` desde la raíz del repo. Hasta entonces, este grafo no responde queries
  — usar `FRONTEND_DESIGN_SPEC.md`/`docs/historias-usuario.md` y esta cápsula directamente.

## Deudas técnicas abiertas

- **Lint**: el scaffold de Vite trae `oxlint` por defecto; el spec §19 pide ESLint
  (`eslint-plugin-react`/`react-hooks`/`jsx-a11y`) + Prettier. Deps ya instaladas, falta
  decidir en F1 si se reemplaza el script `lint` o se justifica mantener oxlint.
- Sin PWA (deliberado, fuera de alcance de este prototipo — spec §15/§23 lo permite).
- Sin CI (`GitHub Actions`) todavía — no pedido explícitamente en F0.

Ver [00-prototipo-contexto.md] para el contexto general.
