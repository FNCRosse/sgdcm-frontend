import { ImageOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Pieza } from '@/types/pieza'
import { Chip } from './Chip'

/**
 * Tarjeta §9: imagen 1:1 arriba, código Montserrat SemiBold, nombre en Source Serif cursiva,
 * chip de estado. Móvil: imagen a la izquierda + texto a la derecha (§11).
 */
export function TarjetaColeccion({ pieza }: { pieza: Pieza }) {
  const titulo = pieza.codigo || 'Comodato · sin código'
  return (
    <Link
      to={`/coleccion/${pieza.id}`}
      className="relative flex overflow-hidden rounded-card bg-blanco shadow-sombra transition-all duration-200 hover:z-10 hover:scale-105 hover:bg-fondo-suave md:flex-col"
    >
      {pieza.imagen ? (
        <img
          src={pieza.imagen}
          alt=""
          loading="lazy"
          className="aspect-square w-28 shrink-0 object-cover md:w-full"
        />
      ) : (
        <div className="flex aspect-square w-28 shrink-0 items-center justify-center bg-fondo-suave text-gris-2 md:w-full">
          <ImageOff size={32} aria-hidden />
          <span className="sr-only">Sin imagen</span>
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-1 p-3">
        <p className="truncate text-miga font-semibold text-azul">{titulo}</p>
        <p className="truncate font-acento text-cuerpo-movil italic">{pieza.nombre}</p>
        <p className="truncate text-etiqueta text-gris-2">{pieza.coleccion}</p>
        <div className="mt-auto pt-1">
          <Chip estado={pieza.estadoFicha}>{pieza.estadoFicha}</Chip>
        </div>
      </div>
    </Link>
  )
}
