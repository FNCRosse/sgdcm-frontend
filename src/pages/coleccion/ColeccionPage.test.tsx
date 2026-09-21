import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { handlers } from '@/mocks/handlers'
import { PIEZAS } from '@/mocks/datos'
import { ColeccionPage } from './ColeccionPage'

const server = setupServer(...handlers)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function montar(ruta = '/coleccion') {
  const router = createMemoryRouter([{ path: '/coleccion', element: <ColeccionPage /> }], {
    initialEntries: [ruta],
  })
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return router
}

const tarjetas = () => within(screen.getByRole('list', { name: 'Piezas' })).getAllByRole('listitem')

describe('mock /api/piezas', () => {
  it('tiene 50 piezas genéricas y ninguna en comodato lleva código', () => {
    expect(PIEZAS).toHaveLength(50)
    expect(PIEZAS.every((p) => (p.regimen === 'Comodato') === (p.codigo === ''))).toBe(true)
    expect(PIEZAS.some((p) => p.imagen === null)).toBe(true)
  })
})

describe('ColeccionPage', () => {
  it('muestra la primera página de 12 tarjetas y el total', async () => {
    montar()
    expect(await screen.findByText('50 piezas')).toBeInTheDocument()
    expect(tarjetas()).toHaveLength(12)
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')
  })

  it('pagina y refleja la página en la URL', async () => {
    const user = userEvent.setup()
    const router = montar()
    await screen.findByText('50 piezas')
    await user.click(screen.getByRole('button', { name: 'Página siguiente' }))
    expect(router.state.location.search).toContain('pagina=2')
    expect(await screen.findByText('MATP-2026-0013')).toBeInTheDocument()
  })

  it('filtra por estado de ficha desde la URL y permite limpiar', async () => {
    const user = userEvent.setup()
    montar('/coleccion?estadoFicha=Aprobada')
    const esperadas = PIEZAS.filter((p) => p.estadoFicha === 'Aprobada').length
    expect(await screen.findByText(`${esperadas} piezas`)).toBeInTheDocument()
    expect(tarjetas().length).toBeLessThanOrEqual(12)
    await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }))
    expect(await screen.findByText('50 piezas')).toBeInTheDocument()
  })

  it('estado vacío con acción para limpiar filtros', async () => {
    montar('/coleccion?q=nada-coincide')
    expect(await screen.findByText(/No hay piezas/)).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Piezas' })).not.toBeInTheDocument()
  })
})
