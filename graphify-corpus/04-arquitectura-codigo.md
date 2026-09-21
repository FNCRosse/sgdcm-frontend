# Arquitectura de código

## Estructura de carpetas (§16, ya creada — carpetas vacías con `.gitkeep`)

```
src/
  app/            # enrutador, providers globales (sesión/rol, QueryClient) — F1
  pages/          # una carpeta por página de §8 — F2 en adelante
  features/       # lógica de negocio por módulo (fichas, ubicaciones, importacion, busqueda, ia, usuarios)
  components/     # UI reutilizable (Boton, TarjetaColeccion, Chip, Modal, FiltroPanel...)
  hooks/          # hooks compartidos (useRolActivo, useSesion...)
  lib/            # cliente supabase (mock), cliente API, helpers puros
  styles/         # tokens.css (copia de §3), globals.css — F1
  assets/         # SVG propios servidos por el bundler (Logo_MATP/* vive en public/brand/)
  types/          # tipos TS del modelo de contenido (§7)
public/brand/     # SVG finales de Logo_MATP/ + icono pucp.svg (NUNCA redibujar)
```

Regla dura: `pages/` importa de `features/`, `components/`, `hooks/` — nunca al revés.

## Convenciones (§17-19)

- Componentes React: PascalCase, un componente por archivo (`TarjetaColeccion.tsx`).
- Hooks: camelCase con prefijo `use` (`useRolActivo.ts`).
- Lib/utils: camelCase (`formatearFecha.ts`).
- Tipos: PascalCase sin prefijo `I` (`Pieza`, `EstadoFicha`).
- Carpetas `pages/`/`features/`: kebab-case en español (`ubicacion-movimientos/`).
- Rutas: kebab-case en español (`/ubicacion-y-movimientos`).
- Vocabulario de negocio (ficha, colección, traslado...) en español; helpers técnicos
  genéricos sí pueden ir en inglés.
- CSS: solo clases Tailwind del theme extendido, sin `.css` por componente ni valores
  arbitrarios (`bg-[#042354]`).
- TypeScript `strict`; `any` solo con comentario justificando por qué.
- Componentes funcionales + hooks, sin clases. Comentarios solo para el "porqué".

## Estado real de esta fase (F0)

Nada de lo anterior existe todavía como código — es el contrato para F1 en adelante.
Único código presente: el boilerplate por defecto de `npm create vite@latest --template
react-ts` (`App.tsx`, `main.tsx`), sin tocar. Linting: se instalaron `eslint` +
`eslint-plugin-react`/`react-hooks`/`jsx-a11y` + `prettier` como deps (§19), pero el
scaffold de Vite trae `oxlint` como linter por defecto (`.oxlintrc.json`, script `lint`) —
**desviación pendiente de resolver en F1**: reemplazar el script `lint` por ESLint
configurado con esos plugins, o justificar explícitamente mantener oxlint.

Ver [06-estado-fases.md].
