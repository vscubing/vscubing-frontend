import { Layout } from './components/layout/'
import { Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { leaderboardRoute } from './features/leaderboard'
import { contestsRoute } from './features/contests'
import { dashboardRoute } from './features/dashboard'
import { devRoute } from './features/dev'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NotFoundPage, notFoundRoute } from './features/NotFoundPage'
import { landingRoute } from './features/landing'

export const rootRoute = createRootRoute()

export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_app',
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
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

const routeTree = rootRoute.addChildren([
  landingRoute,
  appRoute.addChildren([indexRoute, leaderboardRoute, contestsRoute, devRoute, notFoundRoute]),
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
