import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Layout, redirectToOngoingContest, ContestPage, DashboardPage } from './pages'
import './App.tw.css'
import { ReconstructorProvider } from './features/reconstructor'
import { AuthProvider } from './features/auth'
import { DEFAULT_DISCIPLINE } from './constants'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: 'contest',
        loader: redirectToOngoingContest,
      },
      {
        path: 'contest/:contestNumber',
        loader: () => redirect(DEFAULT_DISCIPLINE),
      },
      {
        path: 'contest/:contestNumber/:discipline',
        // rename all page componente to <AcmePage/>
        element: <ContestPage />,
      },
    ],
  },
])

export const App = () => {
  return (
    <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
      <AuthProvider>
        <ReconstructorProvider>
          <RouterProvider router={router} />
        </ReconstructorProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
