import { TriangleAlert } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Boton } from '@/components/Boton'
import { FiltroPanel } from '@/components/FiltroPanel'
import { IconoRetablo } from '@/components/IconoRetablo'
import { Paginacion } from '@/components/Paginacion'
import { TarjetaColeccion } from '@/components/TarjetaColeccion'
import { POR_PAGINA, useOpcionesFiltros, usePiezas } from '@/features/fichas/usePiezas'
import type { FiltrosPieza } from '@/types/pieza'

const CLAVES: (keyof FiltrosPieza)[] = [
  'q',
  'coleccion',
  'procedencia',
  'autor',
  'material',
  'epoca',
  'estadoConservacion',
  'estadoFicha',
]

/** Colección §8: filtros básicos + retícula de tarjetas cuadradas + paginación (HU-01..05, listado). */
export function ColeccionPage() {
  // Filtros y página viven en la URL: compartibles y con "atrás" gratis.
  const [params, setParams] = useSearchParams()
  const filtros: FiltrosPieza = Object.fromEntries(
    CLAVES.flatMap((k) => (params.get(k) ? [[k, params.get(k)!]] : [])),
  )
  const pagina = Math.max(1, Number(params.get('pagina') ?? 1))

  const cambiarFiltros = (f: FiltrosPieza) =>
    setParams(Object.fromEntries(Object.entries(f).filter(([, v]) => v)) as Record<string, string>)
  const cambiarPagina = (p: number) =>
    setParams((prev) => {
      prev.set('pagina', String(p))
      return prev
    })

  const opciones = useOpcionesFiltros()
  const piezas = usePiezas(filtros, pagina)
  const total = piezas.data?.total ?? 0
  const totalPaginas = Math.ceil(total / POR_PAGINA)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-h1-movil font-extrabold md:text-h1">Colección</h1>
          <p className="text-gris-2" aria-live="polite">
            {piezas.data ? `${total} ${total === 1 ? 'pieza' : 'piezas'}` : ' '}
          </p>
        </div>
        <FiltroPanel filtros={filtros} opciones={opciones.data} onCambio={cambiarFiltros} />
      </div>

      {piezas.isPending && (
        <output className="flex flex-col items-center gap-2 py-10 text-gris-1">
          <IconoRetablo size={48} />
          <span className="animate-pulse">Cargando piezas…</span>
        </output>
      )}

      {piezas.isError && (
        <p role="alert" className="flex items-center gap-2 text-rojo">
          <TriangleAlert size={24} aria-hidden /> No se pudo cargar la colección.{' '}
          <Boton variante="texto" onClick={() => piezas.refetch()}>
            Reintentar
          </Boton>
        </p>
      )}

      {piezas.data && total === 0 && (
        <div className="flex flex-col items-center gap-4 py-10 text-center text-gris-2">
          <span className="text-gris-1">
            <IconoRetablo size={48} />
          </span>
          <p>No hay piezas que coincidan con los filtros.</p>
          <Boton variante="secundario" onClick={() => cambiarFiltros({})}>
            Limpiar filtros
          </Boton>
        </div>
      )}

      {piezas.data && total > 0 && (
        <>
          <ul
            aria-label="Piezas"
            className={`grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 ${piezas.isFetching ? 'opacity-40' : ''}`}
          >
            {piezas.data.datos.map((p) => (
              <li key={p.id}>
                <TarjetaColeccion pieza={p} />
              </li>
            ))}
          </ul>
          <Paginacion pagina={pagina} totalPaginas={totalPaginas} onCambio={cambiarPagina} />
        </>
      )}
    </div>
  )
}
