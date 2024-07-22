import { rootRoute } from '@/router'
import { Dashboard } from './Dashboard'
import { createRoute } from '@tanstack/react-router'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})
