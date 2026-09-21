# RBAC y rutas

**Estado: pendiente de fase 1.** El `AuthProvider`, los guards y el router aún no existen
en el código — esta cápsula fija el contrato que F1 debe implementar (spec §5/§6).

## Los 5 roles

Administrador, Curador, Catalogador, Conservador, Usuario de Consulta. Detalle de permisos
por rol en spec §5.

## Tabla ruta → sección → roles con acceso

| Ruta prevista | Sección | Roles |
|---|---|---|
| `/` (panel-principal) | Panel principal | todos |
| `/coleccion` | Colección | Admin, Curador, Catalogador, Consulta |
| `/ubicacion-y-movimientos` | Ubicación y movimientos | Admin, Conservador |
| `/importacion` | Importación | Admin, Catalogador |
| `/consultas-y-reportes` | Consultas y reportes | Admin, Curador, Consulta |
| `/asistente-ia` | Asistente IA | Admin, Curador, Catalogador |
| `/administracion` | Administración | Admin |

## Contrato de `AuthProvider` (capa aislada, spec "Autenticación")

Interfaz `login`, `logout`, `getSession`, `getRole` en un único archivo mock
intercambiable (`src/lib/` o `src/features/auth/`, a decidir en F1) — migrar a Supabase
Auth después debe tocar solo ese archivo, ninguna pantalla. 5 usuarios de prueba, uno por
rol, documentados en el README al cerrar F1.

## Regla de guard

Ítem de navegación no permitido por rol → **no se renderiza** (no solo se oculta con CSS).
Acción visible pero no autorizada dentro de una página permitida → se muestra
**deshabilitada**. El RBAC visual es UX, no autorización real (no aplica aquí porque no hay
backend, pero se documenta para cuando lo haya — spec §21).

Ver [03-paginas-y-hu.md] para la estructura de cada página, [06-estado-fases.md] para el
estado real de implementación.
