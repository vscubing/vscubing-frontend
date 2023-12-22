import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { DashboardPage, LeaderboardDiscipline, ContestDiscipline } from './pages'
import './App.tw.css'
import { redirectToOngoingContest, redirectToDefaultDiscipline } from './loaders'
import { DevResetSession, DisciplinesTabsLayout, Layout } from './components'
import { CubeProvider } from './integrations/cube'
import { ReconstructorProvider } from './integrations/reconstructor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      { path: '*', loader: () => redirect('/') },
      {
        path: 'contest',
        loader: redirectToOngoingContest,
      },
      {
        path: 'contest/:contestNumber',
        loader: redirectToDefaultDiscipline,
        element: <DisciplinesTabsLayout />,
        children: [
          {
            path: ':discipline',
            element: <ContestDiscipline />,
          },
        ],
      },
      {
        path: 'leaderboard',
        loader: redirectToDefaultDiscipline,
        element: <DisciplinesTabsLayout />,
        children: [
          {
            path: ':discipline',
            element: <LeaderboardDiscipline />,
          },
        ],
      },
      { path: 'dev/reset-session', element: <DevResetSession /> },
    ],
  },
])

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
