import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { CubeProvider } from './features/cube'
import { queryClient } from './lib/reactQuery'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
        <CubeProvider>
          <RouterProvider router={router} />
        </CubeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
