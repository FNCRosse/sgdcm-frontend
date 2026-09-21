# Design tokens (§3) e iconografía (§4)

**Estado: hecho en F1.** Tokens en `src/styles/tokens.css`; `src/index.css` importa Tailwind y
los tokens y fija la base (body, foco global, h1-h3).

## Dónde viven

- `src/styles/tokens.css`: bloque `:root` **copiado literal** del spec §3 (`--azul`, `--rojo`,
  `--rojo-oscuro`, `--gris-1/2`, `--blanco`, apoyo `--arcilla/--paja/--verde`, derivados
  `--texto/--fondo-suave/--linea/--foco`, `--font-ui/--font-acento`, `--radio-*`, `--sombra`,
  `--space-1..5`).
- Debajo, un bloque `@theme inline` de **Tailwind 4 (CSS-first)**: no existe `tailwind.config`
  (desviación documentada respecto al texto del spec §15, mismo resultado). Las paletas por
  defecto de Tailwind se anulan (`--color-*: initial`, `--font-*`, `--radius-*`, `--shadow-*`,
  `--text-*`, `--breakpoint-*`) para que solo existan utilidades derivadas de los tokens.
- Integración: plugin `@tailwindcss/vite` en `vite.config.ts` (sin PostCSS).

## Utilidades disponibles (únicas permitidas)

- Color: `bg-/text-/border-` + `azul | rojo | rojo-oscuro | gris-1 | gris-2 | blanco | arcilla |
  paja | verde | texto | fondo-suave | linea | foco`.
- Fuente: `font-ui`, `font-acento`. Radio: `rounded-btn | card | modal | pill`. Sombra: `shadow-sombra`.
- Tamaños de texto (escala §3): `text-h1 | h1-movil | h2 | h2-movil | h3 | h3-movil | cuerpo |
  cuerpo-movil | boton (15) | miga (14) | etiqueta (12) | nav-movil (24)`.
- Breakpoints §11: `md:` = 768px (tableta), `lg:` = 1280px (escritorio). `max-w-contenido` = 1200px.
- Espaciado: se mantiene la escala por defecto de Tailwind (base 4px): `1/2/4/6/10` ≙
  `--space-1..5` (4/8/16/24/40px). Sin valores arbitrarios (`p-[13px]`).

## Base global (`src/index.css`)

`body`: `bg-blanco font-ui text-texto`, 16px móvil / 17px escritorio, interlineado 1.6.
`:focus-visible`: anillo 3px `--foco`, offset 2px — regla única, nunca se sobreescribe.
Fuentes Google (Montserrat 400/600/800, Source Serif 4 italic) enlazadas en `index.html`.

## Iconografía (§4)

`lucide-react` (`size` 20 nav escritorio / 24 acciones / 32 menú móvil, `aria-hidden`).
Mapa de sección→ícono en `src/app/secciones.ts`. Ícono propio `icon_retablo_24.svg` se
renderiza con `src/components/IconoRetablo.tsx` (máscara CSS + `bg-current` → hereda
`currentColor` sin tocar el SVG). Favicon: `public/brand/matp_avatar_rojo.svg`.

Ver [04-arquitectura-codigo.md] y [06-estado-fases.md].
