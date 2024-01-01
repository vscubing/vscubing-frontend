import { Layout } from './components'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { RootRoute, Router } from '@tanstack/react-router'
import { leaderboardRoute } from './features/leaderboard'
import { contestsRoute } from './features/contests'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { dashboardRoute } from './features/dashboard'
import { devRoute } from './features/dev'

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Layout />
      {import.meta.env.MODE === 'development' && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </>
  ),
})

const indexRoute = dashboardRoute

const routeTree = rootRoute.addChildren([indexRoute, leaderboardRoute, contestsRoute, devRoute])
export const router = new Router({
  routeTree,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
