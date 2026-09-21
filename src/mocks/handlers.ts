import { delay, http, HttpResponse } from 'msw'
import type { EstadoFicha, FiltrosPieza, PaginaPiezas, Pieza } from '@/types/pieza'
import { OPCIONES, PIEZAS } from './datos'

/** Transiciones válidas del flujo de aprobación HU-05. */
const TRANSICIONES: Record<EstadoFicha, EstadoFicha[]> = {
  Borrador: ['En revisión'],
  'En revisión': ['Aprobada', 'Rechazada'],
  Aprobada: [],
  Rechazada: ['En revisión'],
}

/** Latencia simulada de la futura FastAPI; cero en tests. */
const latencia = () => delay(import.meta.env.MODE === 'test' ? 0 : 400)

const FILTROS_EXACTOS = [
  'coleccion',
  'procedencia',
  'autor',
  'material',
  'epoca',
  'estadoConservacion',
  'estadoFicha',
] as const satisfies readonly (keyof Pieza & keyof FiltrosPieza)[]

export const handlers = [
  http.get('/api/piezas/filtros', async () => {
    await latencia()
    return HttpResponse.json(OPCIONES)
  }),

  http.get('/api/piezas', async ({ request }) => {
    await latencia()
    const p = new URL(request.url).searchParams
    const pagina = Math.max(1, Number(p.get('pagina') ?? 1))
    const porPagina = Math.min(48, Math.max(1, Number(p.get('porPagina') ?? 12)))
    const q = (p.get('q') ?? '').trim().toLowerCase()

    const filtradas = PIEZAS.filter(
      (pz) =>
        (!q || pz.codigo.toLowerCase().includes(q) || pz.nombre.toLowerCase().includes(q)) &&
        FILTROS_EXACTOS.every((f) => !p.get(f) || pz[f] === p.get(f)),
    )
    const inicio = (pagina - 1) * porPagina
    const body: PaginaPiezas = {
      datos: filtradas.slice(inicio, inicio + porPagina),
      total: filtradas.length,
      pagina,
      porPagina,
    }
    return HttpResponse.json(body)
  }),

  http.get('/api/piezas/:id', async ({ params }) => {
    await latencia()
    const pieza = PIEZAS.find((pz) => pz.id === params.id)
    return pieza
      ? HttpResponse.json(pieza)
      : HttpResponse.json({ detail: 'Pieza no encontrada' }, { status: 404 })
  }),

  http.patch('/api/piezas/:id/estado', async ({ params, request }) => {
    await latencia()
    const pieza = PIEZAS.find((pz) => pz.id === params.id)
    if (!pieza) return HttpResponse.json({ detail: 'Pieza no encontrada' }, { status: 404 })

    const body = (await request.json()) as { estado?: EstadoFicha; justificacion?: string }
    const destino = body.estado
    if (!destino || !TRANSICIONES[pieza.estadoFicha].includes(destino)) {
      return HttpResponse.json({ detail: 'Transición no permitida' }, { status: 400 })
    }
    if (destino === 'Rechazada' && !body.justificacion?.trim()) {
      return HttpResponse.json(
        { detail: 'El rechazo requiere una justificación' },
        { status: 400 },
      )
    }

    pieza.estadoFicha = destino
    return HttpResponse.json(pieza)
  }),
]
