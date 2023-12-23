import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.tw.css'
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router'
import { CubeProvider } from './integrations/cube'
import { ReconstructorProvider } from './integrations/reconstructor'
import { Layout, DisciplinesTabsLayout, DevResetSession } from './components'
import { DashboardPage, ContestDiscipline, LeaderboardDiscipline } from './pages'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { DEFAULT_DISCIPLINE, isDiscipline } from './types'
import { getOngoingContestNumber } from './api/contests'

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Layout />
      {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />}
    </>
  ),
})
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: DashboardPage })

const leaderboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})
const leaderboardIndexRoute = new Route({
  getParentRoute: () => leaderboardRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})
export const leaderboardDisciplineRoute = new Route({
  getParentRoute: () => leaderboardRoute,
  path: '$discipline',
  loader: ({ params, navigate }) => {
    if (!isDiscipline(params.discipline)) {
      navigate({ to: '../', replace: true })
    }
  },
  component: () => (
    <DisciplinesTabsLayout>
      <LeaderboardDiscipline />
    </DisciplinesTabsLayout>
  ),
})

const allContestsRoute = new Route({ getParentRoute: () => rootRoute, path: '/contest' })
const allContestsIndexRoute = new Route({
  getParentRoute: () => allContestsRoute,
  path: '/',
  beforeLoad: async ({ navigate }) => {
    navigate({ to: '$contestNumber', params: { contestNumber: await getOngoingContestNumber() }, replace: true })
  },
})
const contestRoute = new Route({
  getParentRoute: () => allContestsRoute,
  path: '$contestNumber',
})
const contestIndexRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})

export const contestDisciplineRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '$discipline',
  loader: ({ params, navigate }) => {
    const contestNumber = Number(params.contestNumber)
    if (isNaN(contestNumber)) {
      navigate({ to: '../../', replace: true })
    }
    if (!isDiscipline(params.discipline)) {
      navigate({ to: '../', replace: true })
    }
  },
  component: () => (
    <DisciplinesTabsLayout>
      <ContestDiscipline />
    </DisciplinesTabsLayout>
  ),
})

const devResetSessionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dev/reset-session',
  component: DevResetSession,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  leaderboardRoute.addChildren([leaderboardIndexRoute, leaderboardDisciplineRoute]),
  allContestsRoute.addChildren([
    allContestsIndexRoute,
    contestRoute.addChildren([contestDisciplineRoute, contestIndexRoute]),
  ]),
  devResetSessionRoute,
])
const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

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
