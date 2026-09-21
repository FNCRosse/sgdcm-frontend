import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Boton } from '@/components/Boton'
import { CampoTexto } from '@/components/CampoTexto'
import { useSesion } from '@/hooks/useSesion'

export function LoginPage() {
  const { usuario, login } = useSesion()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [error, setError] = useState<string>()
  const [cargando, setCargando] = useState(false)

  if (usuario) return <Navigate to="/" replace />

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const datos = new FormData(e.currentTarget)
    setCargando(true)
    setError(undefined)
    try {
      await login(String(datos.get('email')), String(datos.get('password')))
      navigate(state?.desde ?? '/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-fondo-suave px-4 py-10">
      <form
        onSubmit={enviar}
        aria-labelledby="titulo-login"
        className="flex w-full max-w-md flex-col gap-6 rounded-card bg-blanco p-6 shadow-sombra md:p-10"
      >
        <img
          src="/brand/matp_lockup_positivo.svg"
          alt="Museo de Artes y Tradiciones Populares Luis Repetto Málaga"
          className="mx-auto h-24"
        />
        <div>
          <p className="text-etiqueta font-semibold tracking-wider text-gris-2 uppercase">
            Sistema interno
          </p>
          <h1 id="titulo-login" className="text-h1-movil font-extrabold md:text-h2">
            Gestión de colecciones
          </h1>
        </div>
        <CampoTexto
          etiqueta="Correo institucional"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
        />
        <CampoTexto
          etiqueta="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          error={error}
        />
        <Boton type="submit" disabled={cargando} className="md:w-full">
          {cargando ? 'Ingresando…' : 'Ingresar'}
        </Boton>
      </form>
    </main>
  )
}
