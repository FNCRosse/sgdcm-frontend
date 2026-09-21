# CLAUDE.md — Prototipo frontend SGDCM

Prototipo MVP solo frontend del Sistema de Gestión y Digitalización de Colecciones
Museográficas del Museo de Artes y Tradiciones Populares "Luis Repetto Málaga" (PUCP),
curso 1INF47. Sin backend real: todos los datos vienen de MSW.

## Cómo trabajar aquí

- Una fase por sesión. `PLAN.md` manda: léelo primero, ejecuta solo la fase marcada 🔄
  o la siguiente ⬜, y actualízalo al cerrar.
- Control de tokens: consulta los grafos antes de leer, no leas archivos completos, no
  vuelques código en el chat, no ejecutes builds ni instalaciones que la fase no necesite.

## Los dos grafos — consultar SIEMPRE antes de leer

1. **Grafo del prototipo** (este repo, `graphify-out/`): qué componentes existen, dónde
   vive cada capa, qué endpoints simula MSW, qué rutas y guards hay, en qué fase vamos.
   Es lo primero que consultas al arrancar cualquier fase, en vez de explorar el repo.
2. **Grafo de diseño** (carpeta "Diseño - Museo"): marca, tokens, tipografía, iconos,
   RBAC, arquitectura de información, las 7 páginas, las 22 HU.
3. Si ninguno alcanza, lee por secciones acotadas. Nunca abras los .docx ni los .pdf.

## Mantener el grafo del prototipo al día — responsabilidad de cada sesión

El corpus vive en `graphify-corpus/`: cápsulas Markdown cortas (~60 líneas máximo)
escritas a mano, no volcados de código. Son índices para consultar.

    00-prototipo-contexto.md   Qué es, alcance, qué NO incluye, stack
    01-design-tokens.md        Tokens en tailwind.config, tipografía, radios, iconos
    02-rbac-y-rutas.md         5 roles, tabla ruta → rol → guard
    03-paginas-y-hu.md         Las 7 páginas y las HU que cubre cada una
    04-arquitectura-codigo.md  Carpetas, capas, patrones, convenciones
    05-api-mock-msw.md         Endpoints simulados, contratos, errores
    06-estado-fases.md         Fase actual, hecho/pendiente, decisiones, deuda técnica

Al cerrar CUALQUIER fase: edita las cápsulas que quedaron desactualizadas (siempre
`06-estado-fases.md`), corre `graphify graphify-corpus --update` desde la raíz y verifica
con una query que el cambio se refleja. Si aparece un área nueva que ninguna cápsula
cubre, crea una cápsula nueva siguiendo el patrón. Si una cápsula se pasa de ~60 líneas,
pártela. Un grafo desactualizado es peor que no tenerlo: hace que la sesión siguiente
trabaje sobre información falsa.

Se commitean `graphify-corpus/` y `graphify-out/graph.json`. `graphify-out/cache/` va en
el .gitignore.

## Fuentes de verdad

- `FRONTEND_DESIGN_SPEC.md` (copia local): única fuente para tokens, tipografía, iconos,
  componentes, RBAC, breakpoints y estructura. Si algo lo contradice, manda el spec.
- `docs/historias-usuario.md`: 22 HU en 6 módulos, 5 roles.

## Restricciones que no se rompen

- Sistema **exclusivamente interno**. Ninguna vista pública ni de visitantes, nunca.
- RBAC de 5 roles (Administrador, Curador, Catalogador, Conservador, Consulta). Toda ruta
  y toda acción se filtran por rol según §5.
- Los SVG de `public/brand/` son finales y son signos registrados de la PUCP. No se
  redibujan, recolorean, recortan ni regeneran. Qué archivo va en cada sitio: spec §2.2.
- WCAG 2.1 AA es el mínimo. El anillo de foco nunca se elimina.
- Presupuesto $0: sin dependencias de pago ni con tier gratuito restrictivo.
- Sin PWA en este prototipo (decisión tomada; pendiente anotado en PLAN.md).

## Estilos

Tailwind con el theme extendido a partir de los tokens CSS del spec §3. Prohibido cualquier
color, espaciado, radio o sombra escrito a mano fuera del theme. Iconos solo de
`lucide-react`, según el mapa de §4.

## Datos

MSW simula la API REST/JSON de la futura FastAPI (formas de respuesta, códigos de estado,
errores y latencia). El contenido es genérico a propósito ("Pieza 001", "Categoría A"):
no inventes nombres de piezas ni datos que parezcan del inventario real del museo.
Todo endpoint nuevo o modificado se refleja en `graphify-corpus/05-api-mock-msw.md`.

## Autenticación

`AuthProvider` con interfaz estable; la implementación mock vive en un único archivo.
Migrar a Supabase Auth debe tocar ese archivo y ninguna pantalla. 5 usuarios de prueba,
uno por rol, documentados en el README.

## Stack

React · Vite · TypeScript · React Router · Tailwind · TanStack Query · Context de React ·
lucide-react · MSW · Vitest + React Testing Library.
No añadas dependencias fuera de esta lista sin preguntar.

## Cierre de fase — los 5 pasos

1. Tests mínimos con Vitest + RTL.
2. Checklist contra el spec, con las desviaciones listadas explícitamente.
3. Cápsulas actualizadas + `graphify graphify-corpus --update` + query de verificación.
4. PLAN.md: fase marcada ✅ y arranque de la siguiente escrito en 3-5 líneas.
5. Commit (corpus y graph.json incluidos) y push.
