import { fetchLeaderboard } from '@/api/contests'
import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { DisciplinesTabsLayout } from '@/components'
import { LeaderboardDiscipline } from './LeaderboardDiscipline'

const leaderboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})
const leaderboardIndexRoute = new Route({
  getParentRoute: () => leaderboardRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})
export const leaderboardDisciplineRoute = new Route({
  getParentRoute: () => leaderboardRoute,
  path: '$discipline',
  loader: ({ params, navigate }) => {
    if (isDiscipline(params.discipline)) {
      return fetchLeaderboard(params.discipline)
    }
    navigate({ to: '../', replace: true })
  },
  component: () => (
    <DisciplinesTabsLayout>
      <LeaderboardDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export default leaderboardRoute.addChildren([leaderboardIndexRoute, leaderboardDisciplineRoute])
