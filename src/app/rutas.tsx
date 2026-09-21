import { Navigate, type RouteObject } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LoginPage } from '@/pages/login/LoginPage'
import { ColeccionPage } from '@/pages/coleccion/ColeccionPage'
import { Placeholder } from '@/pages/Placeholder'
import { RequiereSesion } from './RequiereSesion'
import { SECCIONES } from './secciones'

export const rutas: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequiereSesion />,
    children: [
      {
        element: <Layout />,
        children: SECCIONES.map((s) => ({
          path: s.ruta,
          element: s.ruta === '/coleccion' ? <ColeccionPage /> : <Placeholder />,
        })),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]
