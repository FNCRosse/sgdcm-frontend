# Arquitectura de código

## Estructura de carpetas (§16) — estado real tras F2

```
src/
  main.tsx                 # monta <App/> + index.css
  index.css                # @import tailwindcss + tokens; base body/foco/h1-h3
  styles/tokens.css        # :root del spec §3 + @theme de Tailwind 4
  app/
    App.tsx                # QueryClientProvider > AuthProvider > RouterProvider
    rutas.tsx              # RouteObject[]: /login, RequiereSesion > Layout > 7 placeholders, *
    RequiereSesion.tsx     # guard sesión + rol
    secciones.ts           # SECCIONES (ruta, nombre, ícono, roles) + seccionesPara(rol)
    rutas.test.tsx         # tests F1 (auth mock, guards, nav por rol, login)
  features/auth/           # authMock.ts (intercambiable), sesionContext.ts, AuthProvider.tsx
  features/fichas/usePiezas.ts  # usePiezas(filtros, pagina) + useOpcionesFiltros (TanStack Query, keepPreviousData); POR_PAGINA=12
  hooks/useSesion.ts
  components/
    Boton.tsx              # variantes primario/secundario/texto (§9), disabled 40%
    CampoTexto.tsx         # label + input + error con triangle-alert, aria-invalid/describedby
    IconoRetablo.tsx       # ícono propio vía máscara CSS
    layout/Layout.tsx      # shell: Header + <main max-w-contenido> + footer azul
    layout/Header.tsx      # escritorio (lockup, nav, buscador, cuenta, salir) y móvil (isotipo, rol, menú a pantalla completa)
    layout/NavEnlaces.tsx  # enlaces filtrados por rol, activo = subrayado rojo
  pages/login/LoginPage.tsx
  pages/coleccion/ColeccionPage.tsx  # filtros+página en useSearchParams; estados carga/vacío/error; test propio
  pages/Placeholder.tsx    # título de sección + "en construcción" (queda en 6 rutas)
  types/sesion.ts, types/pieza.ts
  lib/api.ts               # apiGet<T> + ApiError (ver 05-api-mock-msw.md)
  mocks/                   # datos.ts, handlers.ts, browser.ts (MSW)
  assets/                  # vacía
  test-setup.ts            # jest-dom
public/brand/              # SVG finales (NUNCA redibujar)
public/mockServiceWorker.js  # generado por `npx msw init`, no editar
```

Alias `@/` → `src/` (tsconfig `paths` + `resolve.alias` en `vite.config.ts`).
Regla dura: `pages/` importa de `features/`, `components/`, `hooks/` — nunca al revés.

## Tooling (decisiones F1)

- **Lint: se mantiene `oxlint`** (deuda de F0 resuelta). Justificación: parsea TS sin
  parser extra y trae integrados los plugins `react`, `react-hooks` (`rules-of-hooks`,
  `exhaustive-deps`) y `jsx-a11y` que el spec §19 pedía vía ESLint; `eslint*` se desinstaló
  para no dejar deps muertas. Config en `.oxlintrc.json` (`categories.correctness: error`).
- Prettier (`.prettierrc`: sin `;`, comillas simples, 100 cols) — `npm run format`.
- Vitest: `environment: jsdom`, `globals: true`, setup `src/test-setup.ts` (config dentro de
  `vite.config.ts`, sin archivo aparte). `npm test`.
- Tailwind 4 vía `@tailwindcss/vite` (único dep añadido en F1, parte de la familia Tailwind).

## Convenciones (§17-19)

- Componentes PascalCase, un componente por archivo; hooks `useX`; tipos PascalCase sin `I`;
  carpetas/rutas kebab-case en español; vocabulario de negocio en español.
- Solo clases Tailwind del theme (ver [01-design-tokens.md]); sin `.css` por componente ni
  valores arbitrarios. Única excepción documentada: `style` inline de máscara en `IconoRetablo`.
- TS `strict`; funcionales + hooks; comentarios solo para el "porqué".
- Un archivo solo exporta componentes (fast refresh): contexto, hooks y constantes van aparte.
- Estado de listado (filtros, página) en la URL vía `useSearchParams`, no en `useState`: compartible y con "atrás" gratis.
- oxlint `jsx-a11y/prefer-tag-over-role`: usar `<output>` en vez de `role="status"`, `sr-only` en vez de `role="img"`+aria-label; no `role="search"` en `<form>`.
- TS `erasableSyntaxOnly`: sin parameter properties en constructores (ver `ApiError`).

Ver [06-estado-fases.md].
