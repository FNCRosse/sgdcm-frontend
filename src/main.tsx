import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'

/** MSW solo en desarrollo; el import dinámico lo deja fuera del bundle de producción. */
async function habilitarMocks() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  try {
    await worker.start({ onUnhandledRequest: 'bypass' })
  } catch (e) {
    // El navegador rechazó el Service Worker (política/sandbox/extensión): mismos
    // mocks, interceptando `fetch` a mano en vez de vía SW. Ver mocks/fetchFallback.ts.
    console.warn('[MSW] Service Worker no disponible, uso fetch directo.', e)
    const { activarRespaldoFetch } = await import('./mocks/fetchFallback')
    activarRespaldoFetch()
  }
}

habilitarMocks().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  ),
)
