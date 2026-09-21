import { activarRespaldoFetch } from './fetchFallback'

describe('activarRespaldoFetch', () => {
  const originalFetch = window.fetch

  afterEach(() => {
    window.fetch = originalFetch
  })

  it('responde /api/* con los mismos handlers de MSW, sin tocar la red real', async () => {
    activarRespaldoFetch()
    const res = await fetch('/api/piezas?porPagina=5')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.datos).toHaveLength(5)
  })

  it('deja pasar rutas fuera de /api/ al fetch original', async () => {
    let llamado = false
    window.fetch = (async () => {
      llamado = true
      return new Response('ok')
    }) as typeof fetch
    activarRespaldoFetch()
    await fetch('/otra-ruta')
    expect(llamado).toBe(true)
  })
})
