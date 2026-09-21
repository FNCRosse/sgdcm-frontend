export type Rol = 'Administrador' | 'Curador' | 'Catalogador' | 'Conservador' | 'Consulta'

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: Rol
}
