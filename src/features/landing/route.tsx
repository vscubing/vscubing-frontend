import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/router'

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/landing',
}).lazy(() => import('./LandingPage.lazy').then((d) => d.Route))
