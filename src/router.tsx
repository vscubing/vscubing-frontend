import { Layout, DevResetSession } from './components'
import { DashboardPage, dashboardLoader } from './pages'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Route, Router, rootRouteWithContext } from '@tanstack/react-router'
import leaderboardRoute from './pages/leaderboard/leaderboardRoute'
import contestsRoute from './pages/contest/contestsRoute'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from './api/reactQuery'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const rootRoute = rootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <>
      <Layout />
      {import.meta.env.MODE === 'development' && (
        <>
          <TanStackRouterDevtools /> <ReactQueryDevtools />
        </>
      )}
    </>
  ),
})
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
  loader: dashboardLoader,
})

const devResetSessionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dev/reset-session',
  component: DevResetSession,
})

const routeTree = rootRoute.addChildren([indexRoute, leaderboardRoute, contestsRoute, devResetSessionRoute])
export const router = new Router({
  routeTree,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
