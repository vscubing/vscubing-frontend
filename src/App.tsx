import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Layout, DashboardPage, DisciplinesTabsLayout } from './pages'
import './App.tw.css'
import { ReconstructorProvider } from './features/reconstructor'
import { AuthProvider } from './features/auth'
import { ContestDiscipline } from './features/contest'
import { CubeProvider } from './features/cube'
import { redirectToOngoingContest, redirectToDefaultDiscipline } from './loaders'
import { LeaderboardDiscipline } from './features/leaderboard/LeaderboardDiscipline'

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
    ],
  },
])

export const App = () => {
  return (
    <GoogleOAuthProvider clientId='224901023614-r1i84dq9h7535drcufl03b7fddc2mvvv.apps.googleusercontent.com'>
      <AuthProvider>
        <ReconstructorProvider>
          <CubeProvider>
            <RouterProvider router={router} />
          </CubeProvider>
        </ReconstructorProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
