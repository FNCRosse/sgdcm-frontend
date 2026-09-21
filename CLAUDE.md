# CLAUDE.md

Guía para trabajar en este repo — prototipo MVP solo-frontend del SGDCM (Museo de Artes y
Tradiciones Populares "Luis Repetto Málaga", PUCP, curso 1INF47).

## Antes de tocar código

1. `graphify query "<pregunta>"` sobre `graphify-out/graph.json` **de este repo** para
   preguntas de código (qué existe, dónde vive, en qué fase va). Si el grafo está
   bloqueado (ver `graphify-corpus/06-estado-fases.md` §Bloqueos), leer las cápsulas de
   `graphify-corpus/` directamente en vez de releer el código a ciegas.
2. Para preguntas de diseño/marca/RBAC/HU, el grafo correcto es el de la carpeta de diseño
   (`...\Diseño - Museo\graphify-out\`), **no este**. No confundir los dos grafos.
3. `FRONTEND_DESIGN_SPEC.md` (raíz de este repo) es la única fuente de verdad de diseño
   para código. Si algo contradice al spec, gana el spec.
4. `PLAN.md` dice en qué fase va el proyecto y qué toca la siguiente sesión.

## Restricciones duras (no negociables)

- Sistema **exclusivamente interno**. Cero páginas públicas o de visitante.
- RBAC de 5 roles (Administrador, Curador, Catalogador, Conservador, Consulta) — spec §5.
  Ítem de nav no permitido por rol → no se renderiza (no CSS `hidden`). Acción no permitida
  dentro de página visible → deshabilitada, no oculta.
- Logotipos de `public/brand/*.svg`: copias finales, signos registrados de la PUCP. Nunca
  redibujar, recolorear ni regenerar.
- Presupuesto $0: nada de librerías de pago ni tier gratuito restrictivo.
- WCAG 2.1 AA mínimo, foco visible siempre (anillo `--foco` 3px, offset 2px, nunca se
  quita con CSS).
- Sin PWA en este prototipo (deliberado — ver `PLAN.md`).

## Stack fijo (spec §15) — no añadir dependencias fuera de esta lista sin preguntar

Vite + React + TypeScript · React Router · TanStack Query · Tailwind CSS (theme SOLO desde
los tokens de §3, prohibido cualquier color/espaciado/radio suelto) · Context de React para
sesión/rol (nada de Redux/Zustand) · lucide-react · MSW · Vitest + React Testing Library.

## Convenciones de código (spec §17-19, resumen)

- Componentes PascalCase, un archivo por componente. Hooks `useAlgo.ts`. Tipos PascalCase
  sin prefijo `I`. Carpetas de `pages/`/`features/` y rutas en kebab-case **en español**.
- Vocabulario de negocio (ficha, colección, traslado, vocabulario controlado) en español;
  helpers técnicos genéricos pueden ir en inglés.
- `pages/` importa de `features/`/`components/`/`hooks/`, nunca al revés.
- TypeScript `strict`; `any` solo con comentario justificando por qué.
- Sin comentarios de "qué" — solo de "por qué" cuando no sea obvio.
- Un test mínimo (Vitest + RTL) por lógica no trivial (validación, cálculo, estado de
  flujo) — no cobertura exhaustiva.

## Datos mock

MSW imitando la forma de la futura API FastAPI (`/api/...`), contenido genérico ("Pieza
001", "Categoría A") — nunca nombres de artesanía inventados —, ~50 registros para probar
paginación/filtros. Cada endpoint nuevo se documenta en `graphify-corpus/05-api-mock-msw.md`.

## Cierre de cada fase (los 5 pasos, sin excepción)

1. Tests mínimos de lo construido en la fase.
2. Checklist contra el spec (tokens, tipografía, íconos, RBAC, responsive, WCAG) — listar
   desviaciones explícitamente.
3. Sincronizar `graphify-corpus/` (sobre todo `06-estado-fases.md`) y reconstruir/actualizar
   el grafo del prototipo; verificar con una query.
4. Actualizar `PLAN.md`: marcar la fase ✅ y escribir el punto de arranque exacto de la
   siguiente.
5. Commit (incluyendo `graphify-corpus/` y `graphify-out/graph.json`) y push.

## Control de tokens

Una fase por sesión. Nunca volcar el contenido completo de un archivo en el chat — editar
en disco y resumir en prosa. Consultar el grafo antes de leer/explorar a ciegas.
