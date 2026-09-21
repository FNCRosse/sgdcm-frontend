# PLAN — SGDCM Frontend (prototipo MVP)

Una fase por sesión. Al cerrar una fase: tests mínimos, checklist contra el spec, grafo del
prototipo sincronizado (`graphify-corpus/` + `graphify update`/rebuild), este archivo
actualizado, commit y push. Ver `CLAUDE.md` para las reglas permanentes.

Leyenda: ⬜ pendiente · 🔄 en curso · ✅ hecha

---

## F0 — Plan, repo, scaffold, assets de marca, corpus y grafo del prototipo ✅

- **Objetivo:** repo autocontenido e independiente de la carpeta de diseño, listo para F1.
- **Archivos:** scaffold completo de Vite (`src/`, `public/`, configs), `public/brand/*`,
  `FRONTEND_DESIGN_SPEC.md`, `docs/historias-usuario.md`, `graphify-corpus/00..06`,
  `PLAN.md`, `CLAUDE.md`.
- **Spec/HU:** todo el spec (orientación), sin HU específica todavía.
- **Cápsulas que actualiza al cerrar:** las 7, recién creadas.
- **Criterios de aceptación:** repo en GitHub con push hecho; SVGs de marca sin modificar;
  ninguna vista pública creada; `npm install` funciona; carpetas de §16 existen.
- **Qué NO hacer:** código de pantallas, tailwind.config, AuthProvider, rutas.
- **Bloqueo real:** el grafo del prototipo (`graphify-out/graph.json`) no se pudo construir
  — falta un backend LLM autenticado (ver `graphify-corpus/06-estado-fases.md` §Bloqueos).
  Las cápsulas están escritas; falta correr `graphify graphify-corpus` con éxito.

---

## F1 — Sistema de diseño, layout/shell, router, AuthProvider, login, guards ⬜

- **Objetivo:** tokens de §3 en `tailwind.config`, shell de navegación (header/footer/menú
  móvil) de §6, rutas protegidas por rol, login mock funcional.
- **Archivos:** `src/styles/tokens.css`, `tailwind.config.*`, `src/app/` (router, providers,
  guards), `src/features/auth/` (o `src/lib/auth*`), `src/components/` (Boton, layout),
  `src/pages/login/` (o equivalente), `README.md` (5 usuarios de prueba).
- **Spec/HU:** §3, §4 (mapa de íconos), §5, §6, §9 (botones/campos), login del bloque
  "Autenticación" del prompt de tarea. Sin HU numerada directa (infraestructura).
- **Cápsulas a actualizar:** `01-design-tokens.md` (pasa de "pendiente" a hecho),
  `02-rbac-y-rutas.md` (guards reales), `04-arquitectura-codigo.md` (decidir lint
  oxlint vs. ESLint — deuda de F0), `06-estado-fases.md`.
- **Criterios de aceptación:** login con foco visible (anillo `--foco` 3px, offset 2px,
  nunca eliminado), error con `triangle-alert` + texto; ítems de nav no permitidos por rol
  no se renderizan; ningún color/radio/espaciado fuera del theme; responsive 320-1280px.
- **Qué NO hacer:** construir las 7 páginas de contenido (solo el shell + placeholder por
  ruta); conectar Supabase real.

---

## F2 — Colección: retícula + filtros + paginación ⬜

HU-01 a HU-05 (parcial: listado). `src/pages/coleccion/`, `src/features/fichas/`,
mocks MSW de `/api/piezas` (~50 registros, imágenes placeholder SVG). Actualizar
`03-paginas-y-hu.md`, `05-api-mock-msw.md`, `06-estado-fases.md`.

## F3 — Ficha individual de pieza ⬜

Galería + datos técnicos + flujo de aprobación (Borrador→En revisión→Aprobada/Rechazada).
HU-01 a HU-05 (completa). Comparte `features/fichas/` con F2. Actualizar
`03-paginas-y-hu.md`, `05-api-mock-msw.md`, `06-estado-fases.md`.

## F4 — Panel principal ⬜

KPIs, gráfico de distribución por colección, alertas de datos incompletos. HU-17, HU-09.
`src/pages/panel-principal/`. Actualizar `03-paginas-y-hu.md`, `05-api-mock-msw.md`,
`06-estado-fases.md`.

## F5 — Consultas y reportes ⬜

Búsqueda multifacética AND/OR, conteo en vivo, export PDF/Excel mock. HU-14 a HU-16.
`src/pages/consultas-reportes/`, reutiliza hooks de búsqueda de `features/fichas/` (no
duplicar con Colección — regla §18). Actualizar `03-paginas-y-hu.md`, `05-api-mock-msw.md`,
`06-estado-fases.md`.

## F6 — Ubicación y movimientos ⬜

Jerarquía sede→espacio→mueble→nivel→contenedor, QR, formulario de traslado, historial.
HU-07, HU-08. `src/pages/ubicacion-movimientos/`, `src/features/ubicaciones/`. Actualizar
`02-rbac-y-rutas.md` (si cambia algo de guards), `03-paginas-y-hu.md`, `05-api-mock-msw.md`,
`06-estado-fases.md`.

## F7 — Importación Excel/CSV ⬜

Mapeo interactivo de columnas (plantillas guardables), preview con errores inline, gestión
de duplicados, reporte descargable. HU-10 a HU-13. `src/pages/importacion/`,
`src/features/importacion/`. Actualizar `03-paginas-y-hu.md`, `05-api-mock-msw.md`,
`06-estado-fases.md`.

## F8 — Asistente IA ⬜

Chips de sugerencia, descripción asistida, chat RAG/Text-to-SQL con fuentes citadas,
bandeja de duplicados. HU-18 a HU-21. `src/pages/asistente-ia/`, `src/features/ia/`.
Actualizar `03-paginas-y-hu.md`, `05-api-mock-msw.md`, `06-estado-fases.md`.

## F9 — Administración ⬜

CRUD usuarios/roles, catálogos maestros/vocabularios controlados, bitácora de auditoría.
HU-06, HU-22. `src/pages/administracion/`, `src/features/usuarios/`. Actualizar
`02-rbac-y-rutas.md`, `03-paginas-y-hu.md`, `05-api-mock-msw.md`, `06-estado-fases.md`.

## F10 — Pase final ⬜

Responsive end-to-end, accesibilidad (lector de pantalla en Panel/Colección/Consultas),
estados vacío/carga/error consistentes en las 7 páginas, checklist WCAG 2.1 AA completo.
Sin archivos nuevos de negocio — solo ajustes transversales. Actualizar `06-estado-fases.md`
a "prototipo completo".

---

## Pendiente explícito (no se construye en este prototipo)

PWA (`vite-plugin-pwa`, manifest, service worker) — anotado como fuera de alcance por
instrucción explícita de la tarea, no del spec. Backend real (FastAPI/Supabase) — la capa
`AuthProvider`/`lib/` queda preparada para enchufarlo después, pero no se conecta aquí.

## Punto de arranque exacto para F1

1. Leer `graphify-corpus/01-design-tokens.md` y `02-rbac-y-rutas.md` (grafo o archivo
   directo mientras el grafo esté bloqueado).
2. Copiar el bloque `:root` de `FRONTEND_DESIGN_SPEC.md` §3 a `src/styles/tokens.css`.
3. Extender `tailwind.config` desde esas custom properties.
4. Decidir y resolver la deuda de lint (oxlint vs. ESLint) antes de escribir componentes.
5. Construir `AuthProvider` mock + guards + shell de navegación + página de login.
