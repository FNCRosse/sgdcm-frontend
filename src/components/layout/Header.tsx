import { CircleUser, LogOut, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSesion } from '@/hooks/useSesion'
import type { Usuario } from '@/types/sesion'
import { NavEnlaces } from './NavEnlaces'

export function Header({ usuario }: { usuario: Usuario }) {
  const { logout } = useSesion()
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)

  const salir = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-10 border-b border-linea bg-blanco">
      <div className="mx-auto flex max-w-contenido items-center gap-4 px-4 py-2 md:px-8 lg:px-10">
        {/* Escritorio (§6): lockup positivo → nav → buscador → cuenta */}
        <img
          src="/brand/matp_lockup_positivo.svg"
          alt="Museo de Artes y Tradiciones Populares Luis Repetto Málaga"
          className="hidden h-14 shrink-0 md:block"
        />
        <nav aria-label="Principal" className="hidden min-w-0 flex-1 md:block">
          <NavEnlaces rol={usuario.rol} variante="escritorio" />
        </nav>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Buscar en todo el sistema"
            className="grid size-11 place-items-center rounded-btn text-azul hover:bg-fondo-suave"
          >
            <Search size={24} aria-hidden />
          </button>
          <div className="flex items-center gap-2 text-azul">
            <CircleUser size={24} aria-hidden />
            <div className="leading-tight">
              <p className="text-miga font-semibold">{usuario.nombre}</p>
              <p className="text-etiqueta tracking-wider text-gris-2 uppercase">{usuario.rol}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={salir}
            aria-label="Cerrar sesión"
            className="grid size-11 place-items-center rounded-btn text-azul hover:bg-fondo-suave"
          >
            <LogOut size={24} aria-hidden />
          </button>
        </div>

        {/* Móvil (§6): isotipo + rol + menú */}
        <img src="/brand/pucp_isotipo_positivo.svg" alt="PUCP" className="h-11 md:hidden" />
        <span className="text-etiqueta font-semibold tracking-wider text-gris-2 uppercase md:hidden">
          {usuario.rol}
        </span>
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
          className="grid size-11 place-items-center rounded-btn text-azul md:hidden"
        >
          <Menu size={24} aria-hidden />
        </button>
      </div>

      {abierto && (
        <div className="fixed inset-0 z-20 flex flex-col bg-azul p-6 md:hidden">
          <button
            type="button"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar menú"
            className="grid size-11 place-items-center self-end rounded-btn text-blanco"
          >
            <X size={24} aria-hidden />
          </button>
          <nav aria-label="Principal" className="mt-6 grow">
            <NavEnlaces rol={usuario.rol} variante="movil" onNavegar={() => setAbierto(false)} />
          </nav>
          <button
            type="button"
            onClick={salir}
            className="flex min-h-12 items-center gap-2 text-boton font-semibold text-blanco"
          >
            <LogOut size={24} aria-hidden /> Cerrar sesión ({usuario.nombre})
          </button>
        </div>
      )}
    </header>
  )
}
