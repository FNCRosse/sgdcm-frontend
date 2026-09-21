# SGDCM · Especificación de diseño para el frontend
### Museo de Artes y Tradiciones Populares "Luis Repetto Málaga" (PUCP)

**Qué es este archivo:** instrucciones ejecutables para un agente de IA que va a construir el frontend del Sistema de Gestión y Digitalización de Colecciones Museográficas (SGDCM). No es un entregable académico — es la fuente única de verdad de diseño para código. Consolida y **reemplaza** (en lo que toca a diseño/frontend) cuatro documentos previos: *General Style Guidelines*, *Web Style Guide*, *Mobile Style Guide* y *Arquitectura de la Información* (todos en Drive → GRUPO 1 → Semana 06, y sus copias en este repo). Si algo no está cubierto aquí, esos documentos son el respaldo; si algo aquí contradice una versión anterior de esos documentos, **este archivo manda** (incorpora correcciones ya aplicadas).

---

## 0. Resumen para el agente (leer primero)

1. **Es un sistema interno, no un sitio público.** Todo está detrás de login (SSO PUCP / Google Workspace). No existen páginas de visitante, exposiciones públicas, "Inicio" institucional, ni contenido sin autenticar. Si una tarea pide algo así, es un error de alcance — confirmar antes de construir.
2. **Todo el acceso es por rol (RBAC).** 5 roles: Administrador, Curador, Catalogador, Conservador, Usuario de Consulta. Cada sección/acción tiene una regla de visibilidad explícita en la §7. Los ítems de navegación no permitidos por rol se **ocultan**; las acciones dentro de una página permitida pero no autorizada para ese rol se muestran **deshabilitadas**.
3. **El logotipo no se genera ni se redibuja.** Se usan los SVG ya construidos en `Logo_MATP/` (§3). El isotipo del barco es un signo registrado de la PUCP.
4. **Paleta, tipografía y espaciado son fijos** (§4). No usar colores, fuentes o radios fuera de los tokens definidos aquí.
5. **Iconos: Lucide** (monolínea, ISC, gratis) + un único ícono propio (`icon_retablo_24.svg`, sección Colección). No diseñar iconos nuevos.
6. Stack de referencia del proyecto (Análisis de Factibilidad v2): **React** (con capacidades PWA) en frontend, **FastAPI** (Python) en backend, **PostgreSQL vía Supabase**. Esta guía es agnóstica de framework de UI, pero los tokens están pensados para volcarse directo a CSS custom properties / theme de cualquier librería de componentes.

---

## 1. Contexto y restricciones duras

- Cliente: Museo de Artes y Tradiciones Populares "Luis Repetto Málaga", unidad del Instituto Riva-Agüero, bajo la Dirección de Asuntos Culturales (DACU) de la PUCP.
- Alcance funcional: 6 módulos — Gestión de colecciones, Ubicación y control físico, Importación y calidad de datos, Consulta/búsqueda/reportes, Asistencia con IA, Usuarios y seguridad. Fuente: Historias de Usuario v1.0 (22 HU) y Matriz de Requerimientos ISO/IEC/IEEE 29148:2018 (44 RF, 5 RIA, 15 RNF).
- **Validado con el cliente y no negociable:** *"El sistema opera únicamente para uso interno del museo en esta fase; no se publica información al público general"* (RF-043). El modelo de datos deja espacio para un futuro catálogo público/investigador, pero **no se diseña ni se construye en esta fase**.
- Plataforma: aplicación web responsive únicamente. Sin desarrollo nativo iOS/Android (Acta de Constitución v1.1).
- No hay tesauro definitivo todavía: categorías, materiales, técnicas, estados de conservación y tipos de identificador deben ser **configurables por el Administrador**, nunca fijos en el código (RN-010).

---

## 2. Marca: logotipo y activos

### 2.1 Construcción del logotipo (ya resuelta, no recalcular)

- Isotipo: el SVG oficial del barco/vela/estrella/olas (`icono pucp.svg`, en la raíz del repo), usado tal cual — es un signo registrado de la PUCP, nunca redibujado.
- Texto del lockup: Montserrat convertido a trazados. Unidad D = ancho del disco del isotipo.
  - Separación isotipo→texto: 1/5 D.
  - Línea 1-2 "MUSEO DE ARTES Y / TRADICIONES POPULARES": Montserrat Regular, caja alta 0.134D.
  - Línea 3-4 "LUIS REPETTO / MÁLAGA": Montserrat ExtraBold, caja alta 0.216D.
  - Área de protección: D/4 en los 4 lados (ya incluida en el viewBox de cada archivo).
  - Tamaño mínimo: 90px de ancho digital.

### 2.2 Qué archivo usar dónde (todos en `Logo_MATP/`)

| Archivo | Uso |
|---|---|
| `matp_lockup_positivo.svg` | Cabecera sobre fondo blanco/claro |
| `matp_lockup_sobre_azul.svg` | Fondo azul, texto rojo (alto contraste) |
| `matp_lockup_sobre_azul_blanco.svg` | Fondo azul, todo blanco — **usar este en el footer** |
| `matp_lockup_sobre_rojo.svg` | Fondos rojo MATP / banners de campaña |
| `matp_lockup_blanco.svg` | Una tinta blanca, sobre fotografía oscura |
| `matp_lockup_negro.svg` | Una tinta negra, impresión/PDF exportado |
| `pucp_isotipo_positivo.svg` / `pucp_isotipo_blanco.svg` | Solo el isotipo, cuando el lockup completo no cabe (loaders, favicons intermedios, tarjetas pequeñas) |
| `matp_avatar_rojo.svg` / `matp_avatar_azul.svg` | Favicon y app icon. Exportar a 512/192/180 (apple-touch)/32/16 px |
| `matp_emblema_retablo.svg` | Emblema de apoyo "El retablo abierto". **Recurso gráfico, no logo**: nunca sustituye al lockup, siempre convive con él en la misma pantalla (el header basta). Acepta `currentColor`. Úsalo en: fondo del panel principal vacío, estado "sin resultados", trama decorativa de baja densidad |
| `icon_retablo_24.svg` | Ícono de navegación de la sección "Colección" (24px, mismo trazo que Lucide) |

### 2.3 Qué NO hacer con el logo

- No usar el monograma "MATP" tipográfico ni ninguna tipografía display como logotipo.
- No recolorear el logotipo fuera de las versiones dadas (nada de terracota, ciruela, azul acero).
- No estirar, inclinar, aplicar sombra/degradado, ni ponerlo sobre foto con bajo contraste.
- No fusionar el emblema del retablo con el isotipo PUCP en una sola figura.

---

## 3. Tokens de diseño

Copiar tal cual como variables CSS (o al theme del sistema de componentes que se use):

```css
:root {
  /* Color institucional */
  --azul: #042354;          /* PANTONE 281 C — isotipo, títulos, nav, fondos oscuros */
  --rojo: #EB3156;          /* PANTONE 1925 C — color del museo: acentos, acción primaria */
  --rojo-oscuro: #C3094A;   /* PANTONE 1945 C — hover/active del rojo */
  --gris-1: #BDC3C9;        /* PANTONE 429 C — bordes, divisores */
  --gris-2: #959EA9;        /* PANTONE 430 C — texto secundario, etiquetas */
  --blanco: #FFFFFF;

  /* Color de apoyo — máx. 1 por pantalla, nunca en el logotipo */
  --arcilla: #FF6E26;       /* PANTONE 1585 C */
  --paja: #F0AE19;          /* PANTONE 7406 C */
  --verde: #009A73;         /* PANTONE 2400 C */

  /* Derivados de interfaz */
  --texto: #1B2B4B;
  --fondo-suave: #F3F5F8;
  --linea: #E3E7EC;
  --foco: #5366FF;          /* PANTONE 660 C — anillo de foco, nunca se quita */

  /* Tipografía */
  --font-ui: "Montserrat", system-ui, sans-serif;
  --font-acento: "Source Serif 4", Georgia, serif;

  /* Radios (por componente, no uniformes) */
  --radio-btn: 6px;
  --radio-card: 8px;
  --radio-modal: 12px;
  --radio-pill: 9999px;     /* chips */

  /* Única sombra permitida */
  --sombra: 0 2px 12px rgba(4, 35, 84, 0.08);

  /* Espaciado (múltiplos de 8px, y 4px para interiores pequeños) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;
}
```

Carga de tipografías (Google Fonts, gratis — sustitutos oficialmente autorizados de TT Norms y Strato Pro):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&family=Source+Serif+4:ital,wght@1,400;1,600&display=swap" rel="stylesheet">
```

### Escala tipográfica (escritorio → móvil)

| Rol | Fuente | Tamaño | Color |
|---|---|---|---|
| H1 | Montserrat 800 | 44 → 32px, interlineado 1.1 | `--azul` |
| H2 | Montserrat 800 | 32 → 26px | `--azul` |
| H3 | Montserrat 600 | 22 → 20px | `--azul` |
| Acento (nombre de pieza) | Source Serif 4 600 italic | 1.25× del texto que acompaña | `--rojo` |
| Cuerpo | Montserrat 400 | 17 → 16px, interlineado 1.6 | `--texto` |
| Etiqueta/overline | Montserrat 600 | 12px, mayúsculas, tracking +8% | `--gris-2` |
| Botón | Montserrat 600 | 15px | según fondo |

**Regla dura de móvil:** el cuerpo nunca baja de 16px — por debajo, iOS Safari hace zoom automático al enfocar un input y rompe el layout.

---

## 4. Iconografía

Librería: **Lucide** (lucide.dev, ISC, gratis). Monolínea, trazo 2px (1.75px en UI densa), retícula 24px, terminaciones redondeadas — mismo lenguaje visual que el emblema del retablo. `stroke: currentColor` siempre. Tamaños: 20 / 24 / 32px, un solo tamaño por contexto. El rojo se reserva para el estado activo de navegación; el resto hereda el color del texto.

Único ícono propio: `icon_retablo_24.svg` (sección Colección).

| Uso | Ícono Lucide |
|---|---|
| Panel principal | `layout-dashboard` |
| Colección | `icon_retablo_24.svg` (propio) |
| Ubicación y movimientos | `warehouse` (sección) / `route` (registrar traslado) |
| Importación | `upload` |
| Consultas y reportes | `search` (sección) / `file-down` (exportar) |
| Asistente IA | `bot` |
| Administración | `settings` |
| Buscador global | `search` |
| Menú de cuenta | `circle-user` |
| Cerrar sesión | `log-out` |
| Menú móvil / cerrar | `menu` / `x` |
| Volver (móvil, breadcrumb) | `chevron-left` |
| Editar ficha | `pencil` |
| Aprobar | `check` |
| Rechazar | `x` |
| Estado "en revisión" | `clock` |
| Código QR de ubicación | `qr-code` |
| Filtros | `sliders-horizontal` |
| Vista de catálogo | `layout-grid` / `list` |
| Paginación / galería | `chevron-left` / `chevron-right` |
| Ampliar imagen | `zoom-in` / `maximize-2` |
| Estados de sistema | `circle-check` (éxito) / `triangle-alert` (aviso/error) / `circle-x` (error) / `info` |
| Descargar (ficha, reporte) | `download` |

**Categorías de pieza** (para chips, filtros y tarjetas):

| Categoría | Ícono |
|---|---|
| Cerámica | `amphora` |
| Textil e indumentaria | `shirt` |
| Madera y talla / retablos | `icon_retablo_24.svg` |
| Imaginería y arte religioso | `church` |
| Platería y metal | `gem` |
| Máscaras y danza | `drama` |
| Instrumentos musicales | `music` |
| Mate burilado y calabaza | `circle-dot` |
| Pintura popular | `palette` |
| Documentos y fotografía | `scroll` / `camera` |

No usar (pertenecían a un sitio público descartado — ver §23): `languages`, `ticket`, `calendar-days` (talleres), `book-open` (educación), `map-pin`/`clock`/`route` como sección "Visita", `phone`, `message-circle`, `share-2`, íconos de redes sociales.

---

## 5. Roles y permisos (RBAC)

5 roles (Historias de Usuario v1.0):

| Rol | Puede | No puede |
|---|---|---|
| **Administrador** | Todo: usuarios/roles, catálogos maestros, vocabularios, auditoría, dashboard completo | — |
| **Curador** | Aprobar/rechazar fichas, filtrado avanzado, exportar PDF/Excel, curaduría | Gestionar usuarios ni catálogos maestros |
| **Catalogador** | Registrar/editar fichas en borrador, adjuntar archivos, importación masiva | Aprobar sus propias fichas, editar catálogo maestro |
| **Conservador** | Estado de conservación, ubicación física, movimientos/traslados | Editar la ficha descriptiva, aprobar fichas |
| **Usuario de Consulta** | Buscar, filtrar, ver fichas aprobadas (solo lectura) | Crear, editar, importar, exportar |

**Regla de implementación:** todo endpoint y toda vista requieren sesión autenticada — no existe ninguna ruta pública. Un ítem de navegación que el rol no puede usar **no se renderiza** (no solo se oculta con CSS). Una acción dentro de una página sí visible para el rol pero no permitida (p. ej. un Catalogador viendo el botón "Aprobar") se muestra **deshabilitada**, no oculta.

---

## 6. Mapa de navegación

Matriz sección × rol (✓ = acceso, — = sin acceso):

| Sección | Admin. | Curador | Catalog. | Conserv. | Consulta |
|---|---|---|---|---|---|
| Panel principal | ✓ | ✓ | ✓ | ✓ | ✓ |
| Colección | ✓ | ✓ | ✓ | — | ✓ |
| Ubicación y movimientos | ✓ | — | — | ✓ | — |
| Importación | ✓ | — | ✓ | — | — |
| Consultas y reportes | ✓ | ✓ | — | — | ✓ |
| Asistente IA | ✓ | ✓ | ✓ | — | — |
| Administración | ✓ | — | — | — | — |

**Estructura de la cabecera** (escritorio, fija al hacer scroll): logotipo (`matp_lockup_positivo.svg`) a la izquierda → enlaces de navegación (Montserrat SemiBold, solo las secciones permitidas por rol) → buscador global (ícono `search`) → menú de cuenta (avatar, nombre, rol, `log-out`). Sección activa: subrayado rojo (`--rojo`); resto en azul (`--azul`).

**Móvil (< 768px):** cabecera reducida al isotipo PUCP solo + indicador breve del rol activo + botón `menu`. Al tocar, panel a pantalla completa en `--azul` con los enlaces en Montserrat 24px (blanco) filtrados por rol, botón `x` para cerrar arriba a la derecha.

**Migas de pan:** Montserrat Regular 14px, `--gris-2`, separador `>`, nivel actual en `--azul`. Ejemplo: `Colección > Colección Alfonso Cabrera Ganoza > MATP-2026-0143`. En móvil se ocultan y se reemplazan por un botón único "volver" (`chevron-left` + nombre de la sección anterior).

**Footer:** fondo `--azul`, logo `matp_lockup_sobre_azul_blanco.svg`, una línea centrada: versión del sistema + enlace a manual de usuario/soporte + atribución "Instituto Riva-Agüero · Dirección de Asuntos Culturales · Pontificia Universidad Católica del Perú". Sin columnas de contenido — no es un footer de sitio público.

**Distinción importante — Colección vs. Consultas y reportes:** ambas tienen filtros, pero cumplen funciones distintas y no deben construirse como el mismo componente:
- **Colección** = pantalla de trabajo/gestión (CRUD de fichas), con filtros básicos de apoyo a la edición (colección, procedencia, autor, material, época, estado de conservación).
- **Consultas y reportes** = búsqueda avanzada multifacética de solo lectura sobre todo el catálogo, pensada para Curador/Consulta, con combinación AND/OR, conteo en vivo y exportación PDF/Excel.

---

## 7. Modelo de contenido (entidades)

| Entidad | Campos / notas clave |
|---|---|
| **Pieza / Ficha técnica** | ID interno único (clave real, inmutable) + identificadores externos de tipo parametrizable (el museo ha usado hasta 5 códigos históricos distintos para una misma pieza); nombre, colección/subcolección, procedencia, autor, material, técnica (manufactura/acabado/decoración), época (campo estructurado), descripción, estado de conservación (vocabulario controlado), régimen de tenencia (propiedad / comodato / préstamo temporal — **comodato nunca recibe código de inventario general**), fotos/documentos adjuntos (JPG/PNG ≤15MB, PDF ≤25MB, miniatura automática, una imagen de portada), estado de flujo: `Borrador → En revisión → Aprobada / Rechazada` |
| **Colección / Subcolección** | Jerarquía de 2 niveles |
| **Ubicación** | Jerarquía `sede → espacio → mueble/rack → nivel → contenedor`; solo el primer nivel (sede/espacio) es obligatorio en esta fase; código QR asociado |
| **Movimiento de ubicación** | Origen, destino, fecha, responsable, motivo (préstamo / exposición / restauración / reordenamiento); registro inmutable |
| **Lote de importación** | Mapeo de columnas usado (guardable como plantilla reutilizable), filas insertadas/actualizadas/omitidas, reporte de errores descargable |
| **Usuario** | Identidad, rol asignado, bitácora de auditoría de sus acciones |
| **Vocabulario controlado** | Material, técnica, estado de conservación, tipos de identificador — todos administrables por el rol Administrador, nunca codificados en el software |

### Estados de la ficha (chip de color)

| Estado | Color del chip |
|---|---|
| Borrador | `--gris-2` sobre `--fondo-suave` |
| En revisión | `--paja` |
| Aprobada | `--verde` |
| Rechazada | `--rojo` |

### Orden de criterios de búsqueda (validado con el cliente, RF-031/P26)

`código de inventario (cualquier tipo) → colección → procedencia/zona → autor → material/tipología → época → estado de conservación`

---

## 8. Las 7 páginas

| Página | Roles | Estructura | HU relacionadas |
|---|---|---|---|
| **Panel principal** | Todos | Tarjetas KPI (total de piezas, % catalogación completa, piezas sin imagen, piezas en restauración) + gráfico de distribución por colección + alertas de piezas con ubicación/estado incompletos | HU-17, HU-09 |
| **Colección** | Admin, Curador, Catalogador, Consulta | Filtros básicos + retícula de tarjetas cuadradas + paginación. Ficha individual: galería a la izquierda, datos técnicos y flujo de aprobación a la derecha, nombre de la pieza en Source Serif 4 cursiva | HU-01 a HU-05 |
| **Ubicación y movimientos** | Admin, Conservador | Vista jerárquica de ubicación + generación/impresión de QR + formulario de traslado (origen, destino, motivo, responsable) + historial de movimientos | HU-07, HU-08 |
| **Importación** | Admin, Catalogador | Carga de Excel/CSV → mapeo interactivo de columnas (autocompletado + plantillas guardables) → previsualización con errores resaltados y edición inline → gestión de duplicados (omitir/sobrescribir/nueva versión) → reporte final descargable | HU-10 a HU-13 |
| **Consultas y reportes** | Admin, Curador, Consulta | Panel de búsqueda multifacética (AND/OR, conteo en vivo) + retícula de resultados + exportación PDF (estilo catálogo) / Excel | HU-14 a HU-16 |
| **Asistente IA** | Admin, Curador, Catalogador | Sugerencia de etiquetas/categorías sobre la ficha activa (chips aceptar/rechazar) + generación asistida de descripción (requiere material/técnica/época completos + confirmación explícita antes de guardar) + chat de consulta (RAG/Text-to-SQL) restringido al catálogo autorizado, con fuentes citadas + bandeja semanal de posibles duplicados (>85% similitud, comparación lado a lado, fusionar/descartar/confirmar distintas) | HU-18 a HU-21, RIA-01 a RIA-05 |
| **Administración** | Admin | CRUD de usuarios y roles + catálogos maestros/vocabularios controlados + bitácora de auditoría | HU-06, HU-22 |

---

## 9. Componentes UI

**Botones**
| Variante | Uso | Estilo |
|---|---|---|
| Primario | Acción principal (Guardar ficha, Aprobar, Confirmar importación) | fondo `--rojo`, texto blanco, `--radio-btn`; hover `--rojo-oscuro` |
| Secundario | Acción alternativa (Exportar, Descargar reporte) | borde 2px `--azul`, texto `--azul`, fondo transparente |
| Texto | Bajo énfasis dentro de tarjetas | sin fondo/borde, texto `--azul`, subrayado en hover |

Móvil: ancho completo del contenedor, alto mínimo 48px.

**Campos de formulario:** etiqueta Montserrat SemiBold 14px arriba; borde 1px `--gris-1`, `--radio-btn`; foco → borde `--azul` + anillo `--foco` 3px, offset 2px (nunca se quita el foco). Error: texto rojo + ícono `triangle-alert` a la izquierda. Un campo por fila en móvil, teclado numérico/email según tipo de dato.

**Tarjetas:** cuadradas, fondo blanco, `--radio-card`, imagen recortada arriba sobre fondo plano de la paleta, título Montserrat SemiBold, nombre de pieza en Source Serif 4 cursiva cuando aplique. Sombra: solo `--sombra`. Móvil: una columna, imagen cuadrada a la izquierda + texto a la derecha.

**Chips/etiquetas:** fondo `--fondo-suave`, texto `--azul` 12px mayúsculas, `--radio-pill`. Usos: categoría de pieza, estado de ficha (tabla §7).

**Pestañas y paginación:** pestaña activa con subrayado rojo 2px. Paginación: números centrados, `chevron-left`/`chevron-right`, página activa fondo `--azul` texto blanco.

**Modales:** fondo blanco, `--radio-modal`, overlay `--azul` al 60% de opacidad. Usos: galería de imágenes, confirmar envío a aprobación, mapeo de columnas en importación. Móvil: pantalla completa (no recuadro centrado), botón de cierre siempre visible arriba.

**Filtros de Colección / Consultas y reportes (móvil):** se colapsan en un botón "Filtrar" → panel inferior deslizable (bottom sheet).

---

## 10. Estados de interacción

| Estado | Tratamiento |
|---|---|
| Reposo | Sin alteraciones |
| Hover | Oscurecer 10% (rojo → `--rojo-oscuro`; azul → tono más oscuro) |
| Foco (teclado) | Anillo 3px `--foco`, offset 2px — nunca se elimina |
| Activo/presionado | −2px de sombra + 5% adicional de oscurecimiento sobre hover |
| Deshabilitado | Opacidad 40%, cursor `not-allowed`; también se usa cuando el **rol** no permite la acción |
| Cargando | Trama del emblema retablo en `--gris-1`, animación sutil |
| Vacío / sin resultados | Emblema del retablo + mensaje breve + acción para limpiar filtros o volver |

---

## 11. Layout responsive

| Punto de quiebre | Ancho | Grid |
|---|---|---|
| Móvil pequeño | 320–374px | 4 columnas, medianil 16px, márgenes 16px (mínimo soportado) |
| Móvil estándar | 375–767px | Igual, base del diseño mobile-first |
| Tableta | 768–1279px | 8 columnas, medianil 24px, márgenes 32px |
| Escritorio | ≥ 1280px | 12 columnas, medianil 24px, ancho máx. de contenido 1200px, márgenes 40px |

- Mobile-first: estilos base para el ancho mínimo, ampliar con media queries hacia arriba.
- Móvil: todo el contenido se apila en una sola columna (filtros, tarjetas, ficha, formularios).
- Respetar áreas seguras del dispositivo (notch/gestos): +8px arriba/abajo cuando aplique.
- Ancho de línea de texto ≤ 60 caracteres en móvil.
- Elevación: una sola sombra (`--sombra`) para tarjetas y menús flotantes — no apilar elevaciones.

**Áreas táctiles (móvil):** todo elemento interactivo ≥ 44×44px, separación mínima 8px (WCAG 2.5.5). Todo gesto (swipe en galería, arrastrar para cerrar un panel) tiene alternativa por botón.

**Componentes adaptados a móvil**

| Componente | Adaptación |
|---|---|
| Botones | Ancho completo, alto mínimo 48px |
| Tarjetas de Colección | Una columna, imagen izquierda + texto derecha |
| Formularios | Un campo por fila, teclado según tipo de dato |
| Galería de imágenes | Swipe horizontal, indicadores en puntos, sin flechas laterales |
| Modales | Pantalla completa, botón de cierre siempre visible arriba |
| Filtros | Botón "Filtrar" → bottom sheet |

**Rendimiento en móvil:** cada foto de pieza en al menos 2 resoluciones (`srcset`); imágenes fuera de pantalla con `loading="lazy"`; peso objetivo de la página Colección < 1.5MB en carga inicial.

---

## 12. Imágenes y medios

- Fotografía de piezas: recorte cuadrado (nunca libre), fondo plano de la paleta, luz uniforme, sin sombras duras.
- Relación de aspecto fija 1:1 para tarjetas de Colección y resultados de búsqueda.
- Placeholder de carga: bloque gris suave (`--fondo-suave`), sin animaciones llamativas.
- Todo elemento decorativo (trama del retablo, formas de fondo) lleva `aria-hidden="true"`.

---

## 13. Accesibilidad (WCAG 2.1 AA — mínimo, no negociable)

- Contraste verificado: `--azul` sobre blanco 14.6:1; `--rojo` sobre blanco 4.5:1 (por eso el rojo en texto solo a partir de 18px o negrita); blanco sobre `--rojo` 4.5:1.
- Foco visible en todo elemento interactivo, nunca eliminado por CSS.
- Texto alternativo descriptivo en toda fotografía de pieza.
- Navegación completa por teclado.
- Un solo `<h1>` por página, jerarquía de encabezados coherente.
- Todo campo de formulario asociado a su `<label>`; errores descritos en texto, no solo con color.
- Objetivos táctiles ≥ 44×44px con alternativa a todo gesto (criterio 2.5.5).

---

## 14. Tono y microcopy

- "Instituto Riva-Agüero" con guion. "Universidad" con mayúscula cuando se refiere a la PUCP.
- Fechas/horas en formato de 12 horas.
- Mensajes de error: describir qué pasó y qué hacer, en texto plano (no solo un ícono rojo).
- Botones con verbo en infinitivo o imperativo claro ("Guardar ficha", "Confirmar importación"), nunca "Aceptar"/"OK" genéricos cuando hay una acción más específica que nombrar.

---

## 15. Stack tecnológico del frontend

Fuente: Análisis de Factibilidad v2 (Drive → GRUPO 1 → Semana 06). El documento fija el stack de plataforma, no las librerías internas del frontend — lo marcado como **(recomendado, no especificado por el cliente)** es una decisión razonable de esta guía, no un requisito validado; el agente puede sustituirlo si el equipo decide otra cosa, siempre que respete §0–§14.

**Fijado por el cliente/proyecto:**
- Frontend: **React** con capacidades de **PWA** (instalable, funciona con conectividad intermitente — relevante porque el museo registra piezas en salas sin buena señal).
- Backend: Python + **FastAPI** (consumido por el frontend solo vía API REST/JSON — no es responsabilidad de esta guía).
- Datos/auth/almacenamiento: **Supabase** (PostgreSQL, autenticación, storage de fotos/documentos de fichas).
- Repositorio en GitHub con GitHub Actions (CI/CD). Hosting freemium (Vercel para el frontend, según el mismo análisis). Presupuesto $0 USD — evitar librerías de pago o con límites de uso agresivos en el tier gratuito.

**Recomendado (no especificado por el cliente):**
- Bundler: **Vite** (arranque y HMR rápidos, integra PWA fácilmente vía `vite-plugin-pwa`).
- Lenguaje: **TypeScript** — el modelo de contenido (§7) tiene suficientes entidades y estados como para que los tipos prevengan errores de catalogación en tiempo de compilación.
- Enrutamiento: **React Router**, una ruta por cada una de las 7 páginas (§8), protegidas por el rol de sesión (§5).
- Datos remotos: **TanStack Query** sobre el cliente `@supabase/supabase-js` (auth/storage) y `fetch`/`axios` para FastAPI — resuelve caching, loading y error sin reinventarlo en cada página.
- Estado global mínimo: **Context de React** para sesión/rol activo; no se justifica un store externo (Redux/Zustand) para el alcance actual (§0–§8).
- Estilos: **Tailwind CSS**, con `tailwind.config` extendiendo el theme a partir de los tokens de §3 (custom properties `--azul`, `--rojo`, `--space-*`, `--radio-*`, etc.) — nunca un sistema de color/espaciado paralelo ni valores sueltos fuera del theme.
- Iconos: `lucide-react` (coherente con §4).
- Tests: **Vitest + React Testing Library**, mínimos por página/componente crítico (ver §18 sobre alcance de tests).

---

## 16. Estructura de carpetas

```
src/
  app/            # enrutador, providers globales (sesión/rol, QueryClient)
  pages/          # una carpeta por página de §8 (panel-principal, coleccion, ubicacion-movimientos,
                  #   importacion, consultas-reportes, asistente-ia, administracion)
  features/       # lógica de negocio por módulo (fichas, ubicaciones, importacion, busqueda, ia, usuarios)
  components/     # UI reutilizable de §9 (Boton, TarjetaColeccion, Chip, Modal, FiltroPanel...)
  hooks/          # hooks compartidos (useRolActivo, useSesion...)
  lib/            # cliente supabase, cliente API FastAPI, helpers puros
  styles/         # tokens.css (copia de §3), globals.css
  assets/         # SVG de Logo_MATP/ y iconos propios, servidos por el bundler
  types/          # tipos TS del modelo de contenido (§7)
public/           # manifest PWA, favicons (matp_avatar_*.svg exportado a PNG, §2.2)
```

Cada carpeta de `pages/` importa solo de `features/`, `components/` y `hooks/` — nunca al revés, para evitar dependencias circulares entre página y lógica de negocio.

---

## 17. Convenciones de nombres de archivos y nomenclatura

- **Componentes React:** PascalCase, un componente por archivo, nombre de archivo = nombre del componente (`TarjetaColeccion.tsx`, `PanelFiltros.tsx`).
- **Hooks:** camelCase con prefijo `use` (`useRolActivo.ts`, `useFichasColeccion.ts`).
- **Utilidades/lib:** camelCase (`formatearFecha.ts`, `clienteSupabase.ts`).
- **Tipos/interfaces TS:** PascalCase sin prefijo `I` (`Pieza`, `EstadoFicha`, `Movimiento`).
- **Carpetas de `pages/` y `features/`:** kebab-case, en español y alineadas a §6/§8 (`ubicacion-movimientos/`, `consultas-reportes/`).
- **Rutas/URLs:** kebab-case en español, reflejando la sección tal cual aparece en §6 (`/coleccion`, `/ubicacion-y-movimientos`, `/consultas-y-reportes`, `/asistente-ia`, `/administracion`).
- **Vocabulario de negocio en el código** (variables, tipos, nombres de función que representan conceptos del dominio): en español y consistente con los términos ya validados con el cliente — "ficha", "colección", "traslado", "vocabulario controlado" (§7) — no traducir estos términos al inglés. Nombres puramente técnicos (helpers genéricos de UI, tipos de infraestructura) sí pueden ir en inglés.
- **CSS:** Tailwind — sin archivos `.css` por componente; clases utilitarias en el JSX usando siempre el theme extendido (`bg-azul`, `text-rojo`, `p-space-3`...), nunca colores/espaciados arbitrarios (`bg-[#042354]`) salvo excepción justificada.

---

## 18. Buenas prácticas de programación frontend

- Componentes de presentación pequeños y de una sola responsabilidad; la lógica de datos vive en `features/`/`hooks/`, nunca dentro del componente visual.
- Máximo 2 niveles de prop-drilling — a partir de ahí, usar el contexto de sesión/rol (§15) en vez de pasar props en cascada.
- Nunca hardcodear vocabularios controlados (material, técnica, estado de conservación, tipos de identificador) en componentes o constantes del frontend — siempre vienen de la API, son administrables por el rol Administrador (RN-010, §7).
- Un único punto de verdad para diseño: cualquier color, tamaño o radio fuera de `styles/tokens.css` (§3) es un error, no una excepción de estilo.
- Toda llamada a FastAPI/Supabase pasa por TanStack Query — no duplicar `useState`/`useEffect` manuales para fetch en cada página.
- Validar formularios en cliente para feedback inmediato, pero nunca como única defensa — la API vuelve a validar siempre (ver también §21 Seguridad).
- Code splitting por página (`React.lazy` + `Suspense`) — necesario para cumplir el presupuesto de rendimiento móvil de §11 (< 1.5MB en Colección).
- Colección y Consultas y reportes (§6) comparten hooks/servicios de datos y solo difieren en la UI — no duplicar la lógica de búsqueda/filtrado entre ambas.
- Un test mínimo (Vitest + RTL) por componente con lógica no trivial (validación, cálculo, estado de flujo Borrador→Aprobada) — no se exige cobertura exhaustiva, sí una prueba que falle si la lógica se rompe.

---

## 19. Estilo de código

- TypeScript en modo `strict`; `any` solo si está justificado con un comentario que explique por qué.
- ESLint (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` — este último refuerza §20) + Prettier, ambos corriendo en pre-commit y en CI (GitHub Actions, §15).
- Componentes funcionales con hooks exclusivamente — sin componentes de clase.
- Sin comentarios que expliquen el "qué" (el código y los nombres ya lo dicen) — solo el "porqué" cuando no sea obvio: una restricción de negocio no evidente, un workaround puntual.
- Import ordenado: librerías externas → alias internos (`@/features`, `@/components`) → relativos — con `eslint-plugin-import` o el ordenamiento nativo de Prettier si el equipo lo prefiere.

---

## 20. Accesibilidad en el código

Complementa los criterios visuales y de contenido de §13 (que no cambian); esto es lo que garantiza que se cumplan en la implementación:

- HTML semántico primero (`<button>`, `<nav>`, `<main>`, `<label>`) antes que `role=`/ARIA — ARIA solo cuando no existe un elemento nativo equivalente.
- `eslint-plugin-jsx-a11y` activo en CI, sin reglas silenciadas por conveniencia.
- Todo componente interactivo debe operarse por teclado: si no es un elemento nativo (`<div onClick>`), agregar `tabIndex` y `onKeyDown` para Enter/Espacio.
- Antes de cada entrega, probar con lector de pantalla (NVDA o VoiceOver) al menos Panel principal, Colección y Consultas y reportes — son las páginas de mayor uso (§8).
- Lighthouse/axe en CI para detectar regresiones de contraste y foco — no reemplaza la revisión manual, la complementa.

---

## 21. Seguridad

- Ninguna vista se renderiza sin verificar sesión activa primero — el RBAC visual de §5 (ocultar/deshabilitar por rol) es una capa de UX, **no** el control de autorización real: eso siempre lo valida FastAPI/Supabase en el backend.
- Sesión/token gestionados por `@supabase/supabase-js` (cookies, refresh automático) — no reimplementar manejo de tokens a mano ni guardar credenciales en `localStorage`.
- Nunca exponer la `service_role key` de Supabase en el frontend — solo la `anon key` pública, protegida por Row Level Security en las tablas.
- Sanitizar todo contenido proveniente de datos importados (Excel/CSV, página Importación §8) antes de renderizarlo — nunca `dangerouslySetInnerHTML` con datos de importación o de usuario sin sanitizar.
- Adjuntos de fichas (fotos/documentos, §7): validar tipo y tamaño en cliente (JPG/PNG ≤15MB, PDF ≤25MB) solo como UX inmediata; el límite real lo aplica el backend/Supabase Storage.
- Dependencias: `npm audit` y Dependabot activos en el repositorio (GitHub, §15) — sin librerías sin mantenimiento para funciones sensibles (auth, sanitización, parseo de Excel).

---

## 22. Variables de entorno

Nunca hardcodear URLs ni llaves en el código. Mínimo esperado en `.env.local` (nunca commiteado — debe estar en `.gitignore`; commitear solo `.env.example` con las claves vacías como plantilla):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=         # FastAPI
VITE_APP_ENV=development|staging|production
```

- Prefijo `VITE_` obligatorio (con Vite, §15) — es la única forma en que el bundler expone una variable al código de cliente; cualquier variable sin ese prefijo queda solo en el servidor de build.
- La `anon key` de Supabase es pública por diseño (protegida por RLS) — aun así nunca subir el archivo `.env` real al repositorio.
- En producción, configurar estas mismas variables como entorno del hosting (Vercel, §15) en vez de archivos `.env` desplegados.

---

## 23. Fuera de alcance — no construir

- Ninguna página de visitante público: nada de "Inicio" institucional, "Exposiciones", "Visita e información", horarios/mapa para el público, ni contenido sin login.
- Nada de compartir en redes sociales ni íconos de redes.
- Sin selector de idioma (no está especificado en los requisitos).
- Sin app nativa iOS/Android — todo es la misma web responsive.
- Sin pasarela de pago, ticketing ni venta de entradas.
- El "catálogo público/investigador" queda preparado en el modelo de datos pero **sin pantallas**; no diseñar ni enrutar nada para él hasta que el cliente lo apruebe como fase nueva.

---

## 24. Notas de implementación no especificadas explícitamente en los documentos fuente

Para que el agente no confunda estas decisiones razonables con requisitos formales del cliente:

- Altura de botón en escritorio: no está fijada en los documentos (solo el mínimo de 48px en móvil). Usar 40–44px por consistencia visual con los demás componentes.
- Selector de accesibilidad en cabecera: no se especifica un control dedicado; cumplir accesibilidad por defecto en todos los componentes (§13) en lugar de agregar un toggle.
- Librería de componentes concreta (MUI, Radix, shadcn/ui, etc.): no está definida — cualquiera es válida siempre que los tokens de esta guía se apliquen vía theme/CSS variables, sin pelear contra los estilos por defecto de la librería.

---

## 25. Fuentes

- General Style Guidelines (branding, tipografía, colores) — v1.0
- Web Style Guide — v1.1 (corregido)
- Mobile Style Guide — v1.1 (corregido)
- Arquitectura de la Información — v1.0
- Historias de Usuario — v1.0 (22 HU, 6 módulos, 5 roles)
- Matriz de Requerimientos ISO/IEC/IEEE 29148:2018
- Manual de identidad visual PUCP — medios impresos (DCI, abril 2025)
- Análisis de Factibilidad v2 (stack tecnológico: React PWA + FastAPI + Supabase, §15)

Todos en Drive → GRUPO 1 → Semana 06, y sus copias `.docx`/`.md` en este repositorio.
