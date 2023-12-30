import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReconstructorProvider } from './features/reconstructor'
import { queryClient } from './lib/reactQuery'
import { CubeProvider } from './features/cube'

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
