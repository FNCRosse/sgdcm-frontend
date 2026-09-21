import { NavLink } from 'react-router-dom'
import { IconoRetablo } from '@/components/IconoRetablo'
import { seccionesPara } from '@/app/secciones'
import type { Rol } from '@/types/sesion'

interface Props {
  rol: Rol
  variante: 'escritorio' | 'movil'
  onNavegar?: () => void
}

/** Enlaces filtrados por rol (§5: lo no permitido no se renderiza). */
export function NavEnlaces({ rol, variante, onNavegar }: Props) {
  const movil = variante === 'movil'
  return (
    <ul className={movil ? 'flex flex-col gap-6' : 'flex items-center gap-6'}>
      {seccionesPara(rol).map(({ ruta, nombre, icono: Icono }) => (
        <li key={ruta}>
          <NavLink
            to={ruta}
            end
            onClick={onNavegar}
            className={({ isActive }) =>
              movil
                ? `flex min-h-11 items-center gap-3 text-nav-movil font-semibold text-blanco ${isActive ? 'underline decoration-rojo decoration-4 underline-offset-8' : ''}`
                : `flex min-h-11 items-center gap-2 border-b-2 pb-1 font-semibold text-azul ${isActive ? 'border-rojo' : 'border-transparent hover:border-gris-1'}`
            }
          >
            {Icono ? (
              <Icono size={movil ? 32 : 20} aria-hidden />
            ) : (
              <IconoRetablo size={movil ? 32 : 20} />
            )}
            {nombre}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
