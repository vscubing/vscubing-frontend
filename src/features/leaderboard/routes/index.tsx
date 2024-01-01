import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { LeaderboardDiscipline } from '../components'
import { DisciplinesTabsLayout } from '@/components/DisciplinesTabsLayout'
import { leaderboardQuery } from '../api'

const route = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})
const indexRoute = new Route({
  getParentRoute: () => route,
  path: '/',
  beforeLoad: ({ navigate }) => {
    void navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})
export const disciplineRoute = new Route({
  getParentRoute: () => route,
  path: '$discipline',
  pendingComponent: () => <div>Loading...</div>,
  loader: ({ params: { discipline }, navigate, context: { queryClient } }) => {
    if (!isDiscipline(discipline)) {
      throw navigate({ to: '../', replace: true })
    }

    const query = leaderboardQuery(discipline)
    void queryClient.ensureQueryData(query)
    return query
  },
  component: () => (
    <DisciplinesTabsLayout>
      <LeaderboardDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export const leaderboardRoute = route.addChildren([indexRoute, disciplineRoute])
