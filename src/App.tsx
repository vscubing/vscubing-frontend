import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './providers/AuthProvider'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Contest, DEFAULT_DISCIPLINE, Dashboard, Root, redirectToOngoingContest } from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
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
        element: <Contest />,
      },
    ],
  },
])

export function App() {
  return (
    <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
