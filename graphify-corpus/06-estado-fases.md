# Estado de fases

**Fase actual: F1 ✅ (cerrada el 2026-09-20).** Próxima: F2 (Colección: retícula + filtros +
paginación, MSW `/api/piezas`). Ver `PLAN.md` en la raíz para el corte completo F0-F10.

## Qué está hecho

- **F0**: repo en GitHub, scaffold Vite + React + TS, deps del stack, carpetas §16, assets de
  marca en `public/brand/`, spec y HU copiados, grafo del prototipo.
- **F1**: tokens §3 → `src/styles/tokens.css` + `@theme` Tailwind 4; base global con foco
  3px `--foco`; `AuthProvider` mock (5 usuarios, `museo2026`) + `useSesion`; router con
  guard `RequiereSesion` (sesión + rol); shell `Layout`/`Header`/`NavEnlaces` (escritorio y
  menú móvil a pantalla completa en azul); footer azul de una línea; `LoginPage` con error
  `triangle-alert`; `Boton` (3 variantes) y `CampoTexto`; 7 placeholders (uno por sección);
  9 tests Vitest+RTL (`src/app/rutas.test.tsx`); README con usuarios de prueba.
  Verificado visualmente a 375px y 1280px.

## Qué falta

Las 7 páginas de contenido, MSW (`src/lib/` + `mocks/`), TanStack Query en uso real
(el `QueryClientProvider` ya está montado), buscador global (botón presente sin acción),
migas de pan (§6, sin páginas anidadas todavía no aplica).

## Decisiones tomadas

- F0: repo hermano de `Diseño - Museo/`; spec y HU fuera de `graphify-corpus/`.
- F1: Tailwind 4 CSS-first (`@theme`) en vez de `tailwind.config` — mismo contrato, cero
  archivos extra. Se anulan paletas por defecto para hacer imposible un color fuera del theme.
- F1: lint = oxlint (react/react-hooks/jsx-a11y integrados); ESLint desinstalado.
- F1: sesión mock persiste solo el `id` en `sessionStorage` (no `localStorage`, §21).
- F1: lo no permitido por rol no se renderiza (nav) y redirige (ruta directa) a `/`.
- F1: enlace "manual de usuario/soporte" del footer apunta a `mailto:soporte@museo.test`
  (no hay manual aún); versión mostrada `v0.1`.

## Desviaciones respecto al spec (listadas en el cierre de F1)

- §15 "tailwind.config": sustituido por `@theme` (Tailwind 4).
- §19 "ESLint + Prettier en pre-commit y CI": oxlint + Prettier como scripts; sin pre-commit
  ni CI todavía.
- §6 buscador global: solo el botón con `aria-label`; sin comportamiento.
- §3 espaciado: se usa la escala nativa de Tailwind (4px) equivalente a `--space-*`, no
  utilidades con nombre `space-N`.

## Bloqueos

Ninguno. Nota de proceso: `graphify graphify-corpus --update` escribe/lee
`graphify-out/` en la raíz del repo (hermano del corpus) — verificado en F1.

## Deudas técnicas abiertas

- Sin CI (`GitHub Actions`) ni hooks de pre-commit (spec §19/§20 los piden).
- Sin PWA (deliberado, fuera de alcance).
- Menú móvil: no atrapa el foco (no es `<dialog>` modal); aceptable para el prototipo,
  revisar en F10 (pase de accesibilidad).
- `.env.example` sin uso hasta que exista cliente API/Supabase.

Ver [00-prototipo-contexto.md] para el contexto general.
