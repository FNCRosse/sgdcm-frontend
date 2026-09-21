import { useCallback, useState, type ReactNode } from 'react'
import type { Usuario } from '@/types/sesion'
import { authMock, type AuthApi } from './authMock'
import { SesionContext } from './sesionContext'

export function AuthProvider({ api = authMock, children }: { api?: AuthApi; children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => api.getSession())

  const login = useCallback<AuthApi['login']>(
    async (email, password) => {
      const u = await api.login(email, password)
      setUsuario(u)
      return u
    },
    [api],
  )
  const logout = useCallback(async () => {
    await api.logout()
    setUsuario(null)
  }, [api])

  return (
    <SesionContext.Provider value={{ usuario, login, logout }}>{children}</SesionContext.Provider>
  )
}
