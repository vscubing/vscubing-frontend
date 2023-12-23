import { Layout, DevResetSession } from './components'
import { DashboardPage } from './pages'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { RootRoute, Route, Router } from '@tanstack/react-router'
import leaderboardRoute from './pages/leaderboard/leaderboardRoute'
import contestsRoute from './pages/contest/contestsRoute'

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Layout />
      {import.meta.env.MODE === 'development' && <TanStackRouterDevtools />}
    </>
  ),
})
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: DashboardPage })

const devResetSessionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'dev/reset-session',
  component: DevResetSession,
})

const routeTree = rootRoute.addChildren([indexRoute, leaderboardRoute, contestsRoute, devResetSessionRoute])
export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
