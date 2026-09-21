import { Outlet } from 'react-router-dom'
import { useSesion } from '@/hooks/useSesion'
import { Header } from './Header'

/** Shell autenticado (§6): header fijo, contenido centrado a 1200px, footer azul de una línea. */
export function Layout() {
  const { usuario } = useSesion()
  if (!usuario) return null // RequiereSesion ya redirigió; evita un render sin sesión (§21)
  return (
    <div className="flex min-h-screen flex-col">
      <Header usuario={usuario} />
      <main className="mx-auto w-full max-w-contenido grow px-4 py-6 md:px-8 lg:px-10">
        <Outlet />
      </main>
      <footer className="bg-azul px-4 py-6 text-blanco">
        <div className="mx-auto flex max-w-contenido flex-col items-center gap-4 text-center text-miga">
          <img
            src="/brand/matp_lockup_sobre_azul_blanco.svg"
            alt="Museo de Artes y Tradiciones Populares Luis Repetto Málaga"
            className="h-16"
          />
          <p>
            SGDCM v0.1 ·{' '}
            <a href="mailto:soporte@museo.test" className="underline">
              Manual de usuario y soporte
            </a>{' '}
            · Instituto Riva-Agüero · Dirección de Asuntos Culturales · Pontificia Universidad
            Católica del Perú
          </p>
        </div>
      </footer>
    </div>
  )
}
