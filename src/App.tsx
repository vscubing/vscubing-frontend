import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout, redirectToOngoingContest, ContestPage, DashboardPage } from './pages'
import './App.tw.css'
import { ReconstructorProvider } from './features/reconstructor'
import { AuthProvider } from './features/auth'
import { ContestDiscipline } from './features/contest'

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
        // rename all page componente to <AcmePage/>
        element: <ContestPage />,
        children: [
          {
            path: ':discipline',
            element: <ContestDiscipline />,
          },
        ],
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
