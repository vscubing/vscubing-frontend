import { rootRoute } from '@/router'
import { Dashboard } from './Dashboard'
import { Route } from '@tanstack/react-router'
import { dashboardQuery } from '../api'

export const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(dashboardQuery)
    return dashboardQuery
  },
})
