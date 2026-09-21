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
- Grafo del prototipo construido con `graphify graphify-corpus --backend claude-cli`
  (21 nodos, 34 edges), commiteado en `graphify-out/graph.json` (raíz del repo, hermano de
  `graphify-corpus/`). Verificado con queries de prueba — responde bien.

## Qué falta (todo lo demás)

Tokens→Tailwind, layout/shell, router, auth mock, y las 7 páginas. Ver `PLAN.md`.

## Decisiones tomadas en F0

- Repo nuevo en `PUCP 2026-2/DP2/sgdcm-frontend`, hermano de `Diseño - Museo/`, no anidado.
- `FRONTEND_DESIGN_SPEC.md` y `docs/historias-usuario.md` viven fuera de
  `graphify-corpus/` (son copias de referencia, no cápsulas escritas a mano) para no
  colisionar en numeración ni mezclarse con el grafo del código.

## Bloqueos

Ninguno. El bloqueo original (`claude-cli` sin sesión OAuth activa, sin API key de LLM en
el entorno) se resolvió: el usuario corrió `claude login` y se reconstruyó el grafo con
`graphify graphify-corpus --backend claude-cli`. **Nota de proceso:** ese comando escribe
`graphify-out/` dentro del argumento pasado (`graphify-corpus/graphify-out/`), no en la
raíz del repo — hay que moverlo a la raíz (`mv graphify-corpus/graphify-out .`) después de
cada build/rebuild para mantener la convención (grafo hermano del corpus).

## Deudas técnicas abiertas

- **Lint**: el scaffold de Vite trae `oxlint` por defecto; el spec §19 pide ESLint
  (`eslint-plugin-react`/`react-hooks`/`jsx-a11y`) + Prettier. Deps ya instaladas, falta
  decidir en F1 si se reemplaza el script `lint` o se justifica mantener oxlint.
- Sin PWA (deliberado, fuera de alcance de este prototipo — spec §15/§23 lo permite).
- Sin CI (`GitHub Actions`) todavía — no pedido explícitamente en F0.

Ver [00-prototipo-contexto.md] para el contexto general.
