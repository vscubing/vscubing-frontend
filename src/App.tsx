import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.tw.css'
import { RouterProvider } from '@tanstack/react-router'
import { CubeProvider } from './integrations/cube'
import { ReconstructorProvider } from './integrations/reconstructor'
import { router } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/reactQuery'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
        <ReconstructorProvider>
          <CubeProvider>
            <RouterProvider router={router} />
          </CubeProvider>
        </ReconstructorProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}
