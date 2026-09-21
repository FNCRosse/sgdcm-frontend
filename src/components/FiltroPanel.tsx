import { SlidersHorizontal, X } from 'lucide-react'
import { useId, useState } from 'react'
import type { FiltrosPieza, OpcionesFiltros } from '@/types/pieza'
import { Boton } from './Boton'

interface Props {
  filtros: FiltrosPieza
  opciones?: OpcionesFiltros
  onCambio: (filtros: FiltrosPieza) => void
}

/** Orden = criterios de búsqueda validados con el cliente (§7, RF-031). */
const CAMPOS: { clave: keyof OpcionesFiltros; etiqueta: string }[] = [
  { clave: 'coleccion', etiqueta: 'Colección' },
  { clave: 'procedencia', etiqueta: 'Procedencia' },
  { clave: 'autor', etiqueta: 'Autor' },
  { clave: 'material', etiqueta: 'Material' },
  { clave: 'epoca', etiqueta: 'Época' },
  { clave: 'estadoConservacion', etiqueta: 'Estado de conservación' },
  { clave: 'estadoFicha', etiqueta: 'Estado de ficha' },
]

const campo =
  'min-h-12 rounded-btn border border-gris-1 bg-blanco px-3 text-cuerpo-movil focus:border-azul md:min-h-10'

/**
 * Filtros básicos de Colección (§6). Escritorio: fila siempre visible.
 * Móvil (§9/§11): botón "Filtrar" → bottom sheet.
 */
// ponytail: el bottom sheet no atrapa el foco (misma deuda que el menú móvil); revisar en F10.
export function FiltroPanel({ filtros, opciones, onCambio }: Props) {
  const [abierto, setAbierto] = useState(false)
  const id = useId()
  const activos = Object.values(filtros).filter(Boolean).length
  const set = (clave: keyof FiltrosPieza, valor: string) =>
    onCambio({ ...filtros, [clave]: valor || undefined })

  return (
    <>
      <Boton
        type="button"
        variante="secundario"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto(true)}
        className="md:hidden"
      >
        <SlidersHorizontal size={24} aria-hidden /> Filtrar{activos ? ` (${activos})` : ''}
      </Boton>

      {abierto && (
        <button
          type="button"
          aria-label="Cerrar filtros"
          onClick={() => setAbierto(false)}
          className="fixed inset-0 z-20 bg-azul/60 md:hidden"
        />
      )}

      <form
        id={id}
        aria-label="Filtros de la colección"
        onSubmit={(e) => e.preventDefault()}
        className={`${abierto ? 'fixed inset-x-0 bottom-0 z-30 flex max-h-dvh flex-col gap-4 overflow-y-auto rounded-t-modal bg-blanco p-4 shadow-sombra' : 'hidden'} md:static md:z-auto md:grid md:max-h-none md:grid-cols-4 md:gap-4 md:overflow-visible md:rounded-card md:bg-fondo-suave md:p-4 md:shadow-none`}
      >
        <div className="flex items-center justify-between md:hidden">
          <h2 className="text-h3-movil font-semibold">Filtrar</h2>
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={() => setAbierto(false)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn text-azul"
          >
            <X size={32} aria-hidden />
          </button>
        </div>

        <label className="flex flex-col gap-1 md:col-span-4">
          <span className="text-miga font-semibold">Código o nombre</span>
          <input
            type="search"
            value={filtros.q ?? ''}
            onChange={(e) => set('q', e.target.value)}
            placeholder="MATP-2026-0001"
            className={campo}
          />
        </label>

        {CAMPOS.map(({ clave, etiqueta }) => (
          <label key={clave} className="flex flex-col gap-1">
            <span className="text-miga font-semibold">{etiqueta}</span>
            <select
              value={filtros[clave] ?? ''}
              onChange={(e) => set(clave, e.target.value)}
              className={campo}
            >
              <option value="">Todas</option>
              {opciones?.[clave].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}

        <div className="flex flex-col gap-2 md:col-span-4 md:flex-row md:justify-end">
          <Boton type="button" variante="texto" disabled={!activos} onClick={() => onCambio({})}>
            Limpiar filtros
          </Boton>
          <Boton type="button" onClick={() => setAbierto(false)} className="md:hidden">
            Ver resultados
          </Boton>
        </div>
      </form>
    </>
  )
}
