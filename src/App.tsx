import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.tw.css'
import { RouterProvider } from '@tanstack/react-router'
import { CubeProvider } from './integrations/cube'
import { ReconstructorProvider } from './integrations/reconstructor'
import { router } from './router'

export function App() {
  return (
    <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
      <ReconstructorProvider>
        <CubeProvider>
          <RouterProvider router={router} />
        </CubeProvider>
      </ReconstructorProvider>
    </GoogleOAuthProvider>
  )
}
