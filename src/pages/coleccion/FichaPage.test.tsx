import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { handlers } from '@/mocks/handlers'
import { PIEZAS } from '@/mocks/datos'
import { SesionContext } from '@/features/auth/sesionContext'
import type { Usuario } from '@/types/sesion'
import { FichaPage } from './FichaPage'

const server = setupServer(...handlers)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function montar(id: string, usuario: Usuario | null) {
  const router = createMemoryRouter([{ path: '/coleccion/:id', element: <FichaPage /> }], {
    initialEntries: [`/coleccion/${id}`],
  })
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <SesionContext.Provider value={{ usuario, login: async () => usuario!, logout: async () => {} }}>
        <RouterProvider router={router} />
      </SesionContext.Provider>
    </QueryClientProvider>,
  )
}

const catalogador: Usuario = { id: 'u1', nombre: 'C', email: 'c@museo.test', rol: 'Catalogador' }
const curador: Usuario = { id: 'u2', nombre: 'R', email: 'r@museo.test', rol: 'Curador' }
const consulta: Usuario = { id: 'u3', nombre: 'Q', email: 'q@museo.test', rol: 'Consulta' }

describe('FichaPage', () => {
  it('muestra nombre, chip de estado y datos técnicos de la pieza', async () => {
    const borrador = PIEZAS.find((p) => p.estadoFicha === 'Borrador')!
    montar(borrador.id, catalogador)
    expect(await screen.findByRole('heading', { name: borrador.nombre })).toBeInTheDocument()
    expect(screen.getByText('Borrador')).toBeInTheDocument()
    expect(screen.getByText(borrador.autor)).toBeInTheDocument()
  })

  it('Catalogador puede enviar un borrador a revisión; Consulta no', async () => {
    const borrador = PIEZAS.find((p) => p.estadoFicha === 'Borrador')!
    const user = userEvent.setup()
    montar(borrador.id, catalogador)
    const boton = await screen.findByRole('button', { name: 'Enviar a revisión' })
    expect(boton).toBeEnabled()
    await user.click(boton)
    expect(await screen.findByText('En revisión')).toBeInTheDocument()
  })

  it('Consulta ve el botón de enviar a revisión deshabilitado', async () => {
    const borrador = PIEZAS.find((p) => p.estadoFicha === 'Borrador')!
    montar(borrador.id, consulta)
    expect(await screen.findByRole('button', { name: 'Enviar a revisión' })).toBeDisabled()
  })

  it('Curador puede aprobar una ficha en revisión', async () => {
    const enRevision = PIEZAS.find((p) => p.estadoFicha === 'En revisión')!
    const user = userEvent.setup()
    montar(enRevision.id, curador)
    const aprobar = await screen.findByRole('button', { name: 'Aprobar' })
    expect(aprobar).toBeEnabled()
    await user.click(aprobar)
    expect(await screen.findByText('Aprobada')).toBeInTheDocument()
  })

  it('rechazar exige justificación antes de confirmar', async () => {
    const enRevision = PIEZAS.find((p) => p.estadoFicha === 'En revisión' && p.id !== '')!
    const user = userEvent.setup()
    montar(enRevision.id, curador)
    await user.click(await screen.findByRole('button', { name: 'Rechazar' }))
    const confirmar = screen.getByRole('button', { name: 'Confirmar rechazo' })
    expect(confirmar).toBeDisabled()
    await user.type(screen.getByLabelText('Justificación del rechazo'), 'Falta información')
    expect(confirmar).toBeEnabled()
    await user.click(confirmar)
    expect(await screen.findByText('Rechazada')).toBeInTheDocument()
  })
})
