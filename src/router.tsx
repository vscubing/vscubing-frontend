import { Layout } from './components'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Router, rootRouteWithContext } from '@tanstack/react-router'
import { leaderboardRoute } from './features/leaderboard'
import { contestsRoute } from './features/contests'
import { type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { dashboardRoute } from './features/dashboard'
import { queryClient } from './lib/reactQuery'
import { devRoute } from './features/dev'

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

const indexRoute = dashboardRoute

const routeTree = rootRoute.addChildren([indexRoute, leaderboardRoute, contestsRoute, devRoute])
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
