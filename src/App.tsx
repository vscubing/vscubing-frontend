import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './providers/AuthProvider'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Contest, Dashboard, Root } from './routes'

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
        path: 'contest/:contestId/:discipline',
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
