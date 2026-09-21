import type { RequestHandler } from 'msw'
import { handlers } from './handlers'

/**
 * Respaldo sin Service Worker: algunos navegadores/entornos (política de seguridad,
 * extensiones, sandbox) rechazan registrar el SW de MSW. Si eso pasa, `worker.start()`
 * rechaza su promesa y la app se queda pegada a la red real (que en dev devuelve el
 * `index.html` de Vite, no JSON) — de ahí el error "No se pudo cargar la colección".
 *
 * Este respaldo intercepta `fetch` a mano usando el mismo array de `handlers`, vía el
 * método público `run()` de MSW (el mismo mecanismo que usan sus interceptors internos).
 */
export function activarRespaldoFetch() {
  const original = window.fetch.bind(window)

  window.fetch = async (input, init) => {
    // `input` puede ser relativo ("/api/piezas"): se resuelve contra location antes de
    // tocar `URL`/`Request`, igual que hace el `fetch` nativo del navegador.
    const bruto = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const url = new URL(bruto, window.location.origin)

    if (url.pathname.startsWith('/api/')) {
      const request = new Request(url, init)
      for (const handler of handlers as RequestHandler[]) {
        const resultado = await handler.run({
          request: request.clone(),
          requestId: crypto.randomUUID(),
        })
        if (resultado?.response) return resultado.response
      }
    }
    return original(input, init)
  }
}
