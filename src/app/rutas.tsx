import { Navigate, type RouteObject } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LoginPage } from '@/pages/login/LoginPage'
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
        children: SECCIONES.map((s) => ({ path: s.ruta, element: <Placeholder /> })),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]
