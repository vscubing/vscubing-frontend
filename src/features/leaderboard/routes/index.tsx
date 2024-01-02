import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { getLeaderboardQuery } from '../api'
import { queryClient } from '@/lib/reactQuery'
import { Leaderboard } from './Leaderboard'

const leaderboardRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})
const indexRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    void navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})
export const disciplineRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '$discipline',
  loader: ({ params: { discipline }, navigate }) => {
    if (!isDiscipline(discipline)) {
      throw navigate({ to: '../', replace: true })
    }

    const query = getLeaderboardQuery(discipline, 0, 15)
    void queryClient.ensureQueryData(query)
    return query
  },
  component: Leaderboard,
})

export const leaderboardRoute = leaderboardRootRoute.addChildren([indexRoute, disciplineRoute])
