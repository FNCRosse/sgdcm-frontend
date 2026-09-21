import {
  Bot,
  LayoutDashboard,
  Search,
  Settings,
  Upload,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'
import type { Rol } from '@/types/sesion'

export interface Seccion {
  ruta: string
  nombre: string
  /** Ícono Lucide (§4); `null` = ícono propio del retablo (Colección). */
  icono: LucideIcon | null
  roles: Rol[]
}

const TODOS: Rol[] = ['Administrador', 'Curador', 'Catalogador', 'Conservador', 'Consulta']

/** Matriz sección × rol del spec §6. El orden es el del menú. */
export const SECCIONES: Seccion[] = [
  { ruta: '/', nombre: 'Panel principal', icono: LayoutDashboard, roles: TODOS },
  {
    ruta: '/coleccion',
    nombre: 'Colección',
    icono: null,
    roles: ['Administrador', 'Curador', 'Catalogador', 'Consulta'],
  },
  {
    ruta: '/ubicacion-y-movimientos',
    nombre: 'Ubicación y movimientos',
    icono: Warehouse,
    roles: ['Administrador', 'Conservador'],
  },
  {
    ruta: '/importacion',
    nombre: 'Importación',
    icono: Upload,
    roles: ['Administrador', 'Catalogador'],
  },
  {
    ruta: '/consultas-y-reportes',
    nombre: 'Consultas y reportes',
    icono: Search,
    roles: ['Administrador', 'Curador', 'Consulta'],
  },
  {
    ruta: '/asistente-ia',
    nombre: 'Asistente IA',
    icono: Bot,
    roles: ['Administrador', 'Curador', 'Catalogador'],
  },
  { ruta: '/administracion', nombre: 'Administración', icono: Settings, roles: ['Administrador'] },
]

export const seccionesPara = (rol: Rol) => SECCIONES.filter((s) => s.roles.includes(rol))
