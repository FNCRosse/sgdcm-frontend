import { useContext } from 'react'
import { SesionContext, type Sesion } from '@/features/auth/sesionContext'

export function useSesion(): Sesion {
  const ctx = useContext(SesionContext)
  if (!ctx) throw new Error('useSesion debe usarse dentro de <AuthProvider>')
  return ctx
}
