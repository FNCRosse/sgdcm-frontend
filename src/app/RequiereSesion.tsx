import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSesion } from '@/hooks/useSesion'
import { SECCIONES } from './secciones'

/** Guard: sin sesión → login; con sesión pero sin rol para la sección → panel principal. */
export function RequiereSesion() {
  const { usuario } = useSesion()
  const { pathname } = useLocation()
  if (!usuario) return <Navigate to="/login" replace state={{ desde: pathname }} />
  const seccion = SECCIONES.find((s) => s.ruta === pathname)
  if (seccion && !seccion.roles.includes(usuario.rol)) return <Navigate to="/" replace />
  return <Outlet />
}
