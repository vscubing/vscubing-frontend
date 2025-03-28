import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { CubeProvider } from './features/cube'
import { queryClient } from './lib/reactQuery'
import { router } from './router'
import { Toaster } from './components/ui'
import * as Sentry from '@sentry/react'
import { SOLVE_REJECTED_ERROR_TEXT } from './features/contests/pages/SolveContestPage/api'

if (import.meta.env.DEV && window.location.origin === 'http://localhost:3000') {
  const msg = "don't use localhost, use 127.0.0.1, you won't be able to log in otherwise"
  alert(msg)
  throw new Error(msg)
}

Sentry.init({
  dsn: 'https://ad4ae74aa3be7afcfee2ca4cf9df2c52@o4508506299564032.ingest.de.sentry.io/4508506301988944',
  environment: import.meta.env.MODE,
  integrations: [],
  beforeSend: (error) => {
    return error.exception?.values?.at(0)?.value === SOLVE_REJECTED_ERROR_TEXT ? error : null
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
        <CubeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CubeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
