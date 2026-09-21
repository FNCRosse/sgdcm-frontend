# Design tokens (§3) e iconografía (§4)

**Estado: pendiente de fase 1.** Los tokens viven hoy solo en
`FRONTEND_DESIGN_SPEC.md` §3 — todavía no hay `tailwind.config` ni `src/styles/tokens.css`
en este repo. Esta cápsula documenta el mapeo previsto para cuando F1 lo construya.

## Tokens (a copiar tal cual desde el spec §3)

Color: `--azul #042354`, `--rojo #EB3156`, `--rojo-oscuro #C3094A`, `--gris-1 #BDC3C9`,
`--gris-2 #959EA9`, `--blanco`, apoyo `--arcilla`/`--paja`/`--verde` (máx. 1 por pantalla),
derivados `--texto`/`--fondo-suave`/`--linea`/`--foco #5366FF`.

Tipografía: `--font-ui` Montserrat, `--font-acento` Source Serif 4 (Google Fonts, ver spec).

Radios: `--radio-btn 6px`, `--radio-card 8px`, `--radio-modal 12px`, `--radio-pill 9999px`.
Sombra única: `--sombra`. Espaciado: `--space-1..5` (4/8/16/24/40px).

## Plan de implementación (F1)

- `src/styles/tokens.css`: copia literal del bloque `:root` del spec §3.
- `tailwind.config`: `theme.extend` leyendo esas custom properties (`bg-azul`, `text-rojo`,
  `p-space-3`, `rounded-btn`...). Prohibido cualquier color/espaciado/radio suelto
  (`bg-[#042354]`) fuera de este theme — regla dura de §17/§18.

## Iconografía (§4)

Lucide (`lucide-react`) monolínea 24px `stroke: currentColor`, más un ícono propio
(`icon_retablo_24.svg`, ya copiado a `public/brand/`) para la sección Colección. Mapa
completo uso→ícono en spec §4 (dashboard, colección, ubicación, importación, consultas,
IA, administración, categorías de pieza). Nunca diseñar íconos nuevos.

Ver [00-prototipo-contexto.md] y [06-estado-fases.md].
