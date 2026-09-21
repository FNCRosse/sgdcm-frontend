/** Entidad Pieza / Ficha técnica (spec §7). Solo los campos que el prototipo usa. */
export type EstadoFicha = 'Borrador' | 'En revisión' | 'Aprobada' | 'Rechazada'
export type EstadoConservacion = 'Bueno' | 'Regular' | 'Malo' | 'Requiere restauración'
export type Regimen = 'Propiedad' | 'Comodato' | 'Préstamo temporal'

export interface Pieza {
  id: string
  /** Código de inventario general (MATP-AAAA-NNNN). Vacío en comodato (§7). */
  codigo: string
  nombre: string
  coleccion: string
  subcoleccion: string
  procedencia: string
  autor: string
  material: string
  tecnica: string
  epoca: string
  descripcion: string
  estadoConservacion: EstadoConservacion
  regimen: Regimen
  estadoFicha: EstadoFicha
  /** Imagen de portada (placeholder SVG en el mock); `null` = sin imagen. */
  imagen: string | null
}

/** Filtros básicos de Colección (§6). Todos opcionales; `q` busca por código/nombre. */
export interface FiltrosPieza {
  q?: string
  coleccion?: string
  procedencia?: string
  autor?: string
  material?: string
  epoca?: string
  estadoConservacion?: string
  estadoFicha?: string
}

export interface PaginaPiezas {
  datos: Pieza[]
  total: number
  pagina: number
  porPagina: number
}

/** Opciones disponibles para cada filtro (vocabularios controlados del mock). */
export type OpcionesFiltros = Record<Exclude<keyof FiltrosPieza, 'q'>, string[]>
