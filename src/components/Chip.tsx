import type { EstadoFicha } from '@/types/pieza'

/** Chips §9: fondo suave + azul 12px mayúsculas. Estados de ficha: colores de la tabla §7. */
const ESTADOS: Record<EstadoFicha, string> = {
  Borrador: 'bg-fondo-suave text-gris-2',
  'En revisión': 'bg-paja text-texto',
  Aprobada: 'bg-verde text-blanco',
  Rechazada: 'bg-rojo text-blanco',
}

export function Chip({ children, estado }: { children: string; estado?: EstadoFicha }) {
  return (
    <span
      className={`inline-block rounded-pill px-2 py-0.5 text-etiqueta font-semibold uppercase ${
        estado ? ESTADOS[estado] : 'bg-fondo-suave text-azul'
      }`}
    >
      {children}
    </span>
  )
}
