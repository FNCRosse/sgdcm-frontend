import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { authMock, PASSWORD_PRUEBA, USUARIOS_PRUEBA } from '@/features/auth/authMock'
import { rutas } from './rutas'
import { SECCIONES } from './secciones'

function montar(ruta: string) {
  const router = createMemoryRouter(rutas, { initialEntries: [ruta] })
  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  )
  return router
}

beforeEach(() => sessionStorage.clear())

describe('authMock', () => {
  it('rechaza credenciales incorrectas y acepta las de prueba', async () => {
    await expect(authMock.login('admin@museo.test', 'mal')).rejects.toThrow()
    expect(authMock.getSession()).toBeNull()
    const u = await authMock.login('Curador@museo.test ', PASSWORD_PRUEBA)
    expect(u.rol).toBe('Curador')
    expect(authMock.getRole()).toBe('Curador')
    await authMock.logout()
    expect(authMock.getSession()).toBeNull()
  })
})

describe('guards y navegación por rol', () => {
  it('sin sesión redirige a /login', () => {
    const router = montar('/coleccion')
    expect(router.state.location.pathname).toBe('/login')
  })

  it('login con error muestra el aviso; con éxito entra al panel', async () => {
    const user = userEvent.setup()
    const router = montar('/login')
    await user.type(screen.getByLabelText('Correo institucional'), 'consulta@museo.test')
    await user.type(screen.getByLabelText('Contraseña'), 'mal')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('incorrectos')
    await user.clear(screen.getByLabelText('Contraseña'))
    await user.type(screen.getByLabelText('Contraseña'), PASSWORD_PRUEBA)
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(await screen.findByRole('heading', { name: 'Panel principal' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })

  it.each(USUARIOS_PRUEBA)('$rol solo ve sus secciones en el nav', async ({ id, rol }) => {
    sessionStorage.setItem('sgdcm.sesion', id)
    montar('/')
    const nav = within(screen.getAllByRole('navigation', { name: 'Principal' })[0])
    const visibles = nav.getAllByRole('link').map((a) => a.textContent)
    expect(visibles).toEqual(SECCIONES.filter((s) => s.roles.includes(rol)).map((s) => s.nombre))
  })

  it('ruta no permitida por rol redirige al panel', () => {
    sessionStorage.setItem('sgdcm.sesion', 'u5') // Consulta
    const router = montar('/administracion')
    expect(router.state.location.pathname).toBe('/')
  })
})
