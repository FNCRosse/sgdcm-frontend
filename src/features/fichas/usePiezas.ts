import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiGet, apiPatch } from '@/lib/api'
import type { EstadoFicha, FiltrosPieza, OpcionesFiltros, PaginaPiezas, Pieza } from '@/types/pieza'

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

/** Ficha individual (F3). */
export function usePieza(id: string) {
  return useQuery({
    queryKey: ['piezas', id],
    queryFn: () => apiGet<Pieza>(`/api/piezas/${id}`),
  })
}

/** Flujo de aprobación HU-05: Borrador→En revisión→Aprobada/Rechazada. */
export function useCambiarEstadoFicha(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { estado: EstadoFicha; justificacion?: string }) =>
      apiPatch<Pieza>(`/api/piezas/${id}/estado`, payload),
    onSuccess: (pieza) => {
      queryClient.setQueryData(['piezas', id], pieza)
    },
  })
}
