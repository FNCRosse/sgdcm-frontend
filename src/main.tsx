import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'

/** MSW solo en desarrollo; el import dinámico lo deja fuera del bundle de producción. */
async function habilitarMocks() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  // Si el navegador no permite Service Workers, la app arranca igual (sin datos).
  await worker.start({ onUnhandledRequest: 'bypass' }).catch((e) => console.warn('[MSW]', e))
}

habilitarMocks().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  ),
)
