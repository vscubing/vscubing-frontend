import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from './routes/Root'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './providers/AuthProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/test',
        element: <div>test</div>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
