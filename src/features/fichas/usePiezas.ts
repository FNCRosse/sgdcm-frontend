import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/api'
import type { FiltrosPieza, OpcionesFiltros, PaginaPiezas } from '@/types/pieza'

export const POR_PAGINA = 12

/** Listado paginado. Colección (F2) y Consultas (F5) comparten este hook, no la UI (§18). */
export function usePiezas(filtros: FiltrosPieza, pagina: number) {
  return useQuery({
    queryKey: ['piezas', filtros, pagina],
    queryFn: () =>
      apiGet<PaginaPiezas>('/api/piezas', { ...filtros, pagina, porPagina: POR_PAGINA }),
    placeholderData: keepPreviousData,
  })
}

export function useOpcionesFiltros() {
  return useQuery({
    queryKey: ['piezas', 'filtros'],
    queryFn: () => apiGet<OpcionesFiltros>('/api/piezas/filtros'),
    staleTime: Infinity,
  })
}
