import { appRoute } from '@/router'
import { Dashboard } from './Dashboard'
import { createRoute } from '@tanstack/react-router'

export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  component: Dashboard,
})
