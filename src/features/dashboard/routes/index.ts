import { rootRoute } from '@/router'
import { Dashboard } from './Dashboard'
import { Route } from '@tanstack/react-router'
import { dashboardQuery } from '../api'
import { queryClient } from '@/lib/reactQuery'

export const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
  loader: () => {
    void queryClient.ensureQueryData(dashboardQuery)
    return dashboardQuery
  },
})
