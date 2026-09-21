import type { Rol, Usuario } from '@/types/sesion'

/** Contrato estable del proveedor de sesión. Migrar a Supabase Auth = reemplazar solo este archivo. */
export interface AuthApi {
  login(email: string, password: string): Promise<Usuario>
  logout(): Promise<void>
  getSession(): Usuario | null
  getRole(): Rol | null
}

export const PASSWORD_PRUEBA = 'museo2026'

export const USUARIOS_PRUEBA: Usuario[] = [
  { id: 'u1', nombre: 'Ana Admin', email: 'admin@museo.test', rol: 'Administrador' },
  { id: 'u2', nombre: 'Carlos Curador', email: 'curador@museo.test', rol: 'Curador' },
  { id: 'u3', nombre: 'Clara Catalogadora', email: 'catalogador@museo.test', rol: 'Catalogador' },
  { id: 'u4', nombre: 'Cecilia Conservadora', email: 'conservador@museo.test', rol: 'Conservador' },
  { id: 'u5', nombre: 'Diego Consulta', email: 'consulta@museo.test', rol: 'Consulta' },
]

// Solo el id del usuario va a sessionStorage (nunca credenciales, §21).
const CLAVE = 'sgdcm.sesion'

function leer(): Usuario | null {
  const id = sessionStorage.getItem(CLAVE)
  return USUARIOS_PRUEBA.find((u) => u.id === id) ?? null
}

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const authMock: AuthApi = {
  async login(email, password) {
    await espera(300)
    const usuario = USUARIOS_PRUEBA.find((u) => u.email === email.trim().toLowerCase())
    if (!usuario || password !== PASSWORD_PRUEBA) {
      throw new Error('Correo o contraseña incorrectos.')
    }
    sessionStorage.setItem(CLAVE, usuario.id)
    return usuario
  },
  async logout() {
    sessionStorage.removeItem(CLAVE)
  },
  getSession: leer,
  getRole: () => leer()?.rol ?? null,
}
