import { createRoute } from '@tanstack/react-router'
import { LandingPage } from './LandingPage'
import { rootRoute } from '@/router'

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: LandingPage,
  path: 'landing',
})
