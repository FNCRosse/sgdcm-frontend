import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  pagina: number
  totalPaginas: number
  onCambio: (pagina: number) => void
}

const base =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40'

/** Paginación §9: números centrados, chevrons, activa en azul con texto blanco. */
// ponytail: lista todas las páginas; añadir ventana (1 … 4 5 6 … 20) cuando haya >10 páginas.
export function Paginacion({ pagina, totalPaginas, onCambio }: Props) {
  if (totalPaginas <= 1) return null
  return (
    <nav aria-label="Paginación" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={pagina <= 1}
        onClick={() => onCambio(pagina - 1)}
        className={`${base} text-azul hover:bg-fondo-suave`}
      >
        <ChevronLeft size={24} aria-hidden />
      </button>
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === pagina ? 'page' : undefined}
          onClick={() => onCambio(n)}
          className={`${base} ${n === pagina ? 'bg-azul text-blanco' : 'text-azul hover:bg-fondo-suave'}`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Página siguiente"
        disabled={pagina >= totalPaginas}
        onClick={() => onCambio(pagina + 1)}
        className={`${base} text-azul hover:bg-fondo-suave`}
      >
        <ChevronRight size={24} aria-hidden />
      </button>
    </nav>
  )
}
