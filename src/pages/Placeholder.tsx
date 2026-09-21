import { useLocation } from 'react-router-dom'
import { SECCIONES } from '@/app/secciones'

/** Marcador temporal: F2+ reemplaza cada ruta por su página real (spec §8). */
export function Placeholder() {
  const { pathname } = useLocation()
  const nombre = SECCIONES.find((s) => s.ruta === pathname)?.nombre ?? 'Sección'
  return (
    <>
      <h1 className="text-h1-movil font-extrabold md:text-h1">{nombre}</h1>
      <p className="mt-4 text-gris-2">Página en construcción.</p>
    </>
  )
}
