import { rootRoute } from '@/router'
import { Dashboard } from './Dashboard'
import { createRoute } from '@tanstack/react-router'
import { dashboardQuery } from '../api'
import { queryClient } from '@/lib/reactQuery'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
  loader: () => {
    void queryClient.ensureQueryData(dashboardQuery)
    return dashboardQuery
  },
})
