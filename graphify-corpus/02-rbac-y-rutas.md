# RBAC y rutas

**Estado: hecho en F1** (guards y router reales; las páginas son placeholders hasta F2+).

## Los 5 roles

Tipo `Rol` en `src/types/sesion.ts`: `Administrador | Curador | Catalogador | Conservador |
Consulta`. Permisos por rol en spec §5.

## Tabla ruta → sección → roles (fuente: `src/app/secciones.ts`, constante `SECCIONES`)

| Ruta | Sección | Ícono | Roles |
|---|---|---|---|
| `/` | Panel principal | `layout-dashboard` | todos |
| `/coleccion` | Colección | retablo (propio) | Admin, Curador, Catalogador, Consulta |
| `/ubicacion-y-movimientos` | Ubicación y movimientos | `warehouse` | Admin, Conservador |
| `/importacion` | Importación | `upload` | Admin, Catalogador |
| `/consultas-y-reportes` | Consultas y reportes | `search` | Admin, Curador, Consulta |
| `/asistente-ia` | Asistente IA | `bot` | Admin, Curador, Catalogador |
| `/administracion` | Administración | `settings` | Admin |

`/login` es la única ruta sin sesión. `*` redirige a `/`. `seccionesPara(rol)` filtra la lista
para el menú. Para añadir una sección basta con una fila aquí: router, guard y nav la leen.

## Router y guards (`src/app/`)

- `rutas.tsx`: árbol de rutas (`RouteObject[]`, exportado para tests) →
  `App.tsx` crea `createBrowserRouter` y monta `QueryClientProvider` + `AuthProvider`.
- `RequiereSesion.tsx` (layout route): sin sesión → `<Navigate to="/login" state={{desde}}>`;
  con sesión pero rol no incluido en `SECCIONES[ruta].roles` → `/`. Envuelve a `Layout`.
- `LoginPage` con sesión activa → `/`. Tras login, vuelve a `state.desde` o `/`.

## Contrato de `AuthProvider` (`src/features/auth/`)

- `authMock.ts`: **único archivo a reemplazar** para migrar a Supabase Auth. Interfaz
  `AuthApi { login, logout, getSession, getRole }` + `USUARIOS_PRUEBA` (5, uno por rol,
  `*@museo.test`) + `PASSWORD_PRUEBA = 'museo2026'`. Persiste solo el `id` en
  `sessionStorage` (`sgdcm.sesion`), nunca credenciales (§21). Latencia simulada 300ms.
- `sesionContext.ts`: `SesionContext` + tipo `Sesion { usuario, login, logout }`.
- `AuthProvider.tsx`: estado `usuario` en Context; acepta `api` inyectable (tests).
- `src/hooks/useSesion.ts`: hook de acceso; lanza si falta el provider.

## Regla de guard (implementada)

Ítem de nav no permitido → **no se renderiza** (`NavEnlaces` itera `seccionesPara(rol)`).
Acción no permitida dentro de una página visible → `disabled` (F2+, `Boton` ya soporta
`disabled` con opacidad 40%). El RBAC visual es UX, no autorización (§21).

Ver [03-paginas-y-hu.md], [04-arquitectura-codigo.md], [06-estado-fases.md].
