import { createContext } from 'react'
import type { Usuario } from '@/types/sesion'
import type { AuthApi } from './authMock'

export interface Sesion {
  usuario: Usuario | null
  login: AuthApi['login']
  logout: AuthApi['logout']
}

export const SesionContext = createContext<Sesion | null>(null)
