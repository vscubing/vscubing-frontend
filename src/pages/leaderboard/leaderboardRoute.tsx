import { leaderboardQuery } from '@/api/contests'
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
  pendingComponent: () => <div>Loading...</div>,
  loader: ({ params: { discipline }, navigate, context: { queryClient } }) => {
    if (!isDiscipline(discipline)) {
      navigate({ to: '../', replace: true })
      return
    }
    queryClient.ensureQueryData(leaderboardQuery(discipline))
  },
  component: () => (
    <DisciplinesTabsLayout>
      <LeaderboardDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export default leaderboardRoute.addChildren([leaderboardIndexRoute, leaderboardDisciplineRoute])
