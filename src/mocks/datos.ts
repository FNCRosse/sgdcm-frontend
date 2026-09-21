import type {
  EstadoConservacion,
  EstadoFicha,
  OpcionesFiltros,
  Pieza,
  Regimen,
} from '@/types/pieza'

/** Vocabularios genéricos a propósito (CLAUDE.md "Datos"): nada parece inventario real. */
export const OPCIONES: OpcionesFiltros = {
  coleccion: ['Colección A', 'Colección B', 'Colección C', 'Colección D'],
  procedencia: ['Zona Norte', 'Zona Centro', 'Zona Sur', 'Zona Oriente'],
  autor: ['Autor 1', 'Autor 2', 'Autor 3', 'Autor desconocido'],
  material: ['Material A', 'Material B', 'Material C', 'Material D', 'Material E'],
  epoca: ['Siglo XIX', 'Siglo XX (1900-1950)', 'Siglo XX (1950-2000)', 'Siglo XXI'],
  estadoConservacion: ['Bueno', 'Regular', 'Malo', 'Requiere restauración'],
  estadoFicha: ['Borrador', 'En revisión', 'Aprobada', 'Rechazada'],
}

const REGIMENES: Regimen[] = [
  'Propiedad',
  'Propiedad',
  'Propiedad',
  'Comodato',
  'Préstamo temporal',
]
/* Colores planos de la paleta §3 para los placeholders (§12: fondo plano, recorte 1:1). */
const FONDOS = ['#042354', '#c73c3c', '#b8734a', '#d9b96b', '#4c8f5c', '#8a8f99']

/** SVG plano 1:1 como data URI: sin archivos externos, sin peso. */
function imagenPlaceholder(n: number) {
  const fondo = FONDOS[n % FONDOS.length]
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    `<rect width="400" height="400" fill="${fondo}"/>` +
    '<rect x="120" y="120" width="160" height="160" rx="16" fill="#ffffff" fill-opacity="0.35"/>' +
    '</svg>'
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const pick = <T>(lista: readonly T[], i: number) => lista[i % lista.length]

/** 50 piezas deterministas (índices en vez de aleatorio → tests estables). */
export const PIEZAS: Pieza[] = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1
  const regimen = pick(REGIMENES, i * 7)
  return {
    id: String(n),
    codigo: regimen === 'Comodato' ? '' : `MATP-2026-${String(n).padStart(4, '0')}`,
    nombre: `Pieza ${String(n).padStart(3, '0')}`,
    coleccion: pick(OPCIONES.coleccion, i),
    subcoleccion: `Subcolección ${pick(['1', '2'], i)}`,
    procedencia: pick(OPCIONES.procedencia, i * 3),
    autor: pick(OPCIONES.autor, i * 5),
    material: pick(OPCIONES.material, i * 2),
    tecnica: pick(['Técnica A', 'Técnica B', 'Técnica C'], i),
    epoca: pick(OPCIONES.epoca, i * 3 + 1),
    descripcion: `Descripción genérica de la pieza ${n}.`,
    estadoConservacion: pick(OPCIONES.estadoConservacion, i * 3) as EstadoConservacion,
    regimen,
    estadoFicha: pick(OPCIONES.estadoFicha, i) as EstadoFicha,
    imagen: n % 9 === 0 ? null : imagenPlaceholder(i),
  }
})
