import { DisciplinesTabsLayout } from '@/components'
import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { ContestDiscipline } from '../components'
import { ongoingContestNumberQuery, contestResultsQuery } from '../api'
import { userQuery } from '@/features/auth'

const allContestsRoute = new Route({ getParentRoute: () => rootRoute, path: '/contest' })
const allContestsIndexRoute = new Route({
  getParentRoute: () => allContestsRoute,
  path: '/',
  beforeLoad: async ({ navigate, context: { queryClient } }) => {
    navigate({
      to: '$contestNumber',
      params: { contestNumber: await queryClient.fetchQuery(ongoingContestNumberQuery) },
      replace: true,
    })
  },
})
const contestRoute = new Route({
  getParentRoute: () => allContestsRoute,
  path: '$contestNumber',
})
const contestIndexRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})

export const contestDisciplineRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '$discipline',
  loader: async ({ params, navigate, context: { queryClient } }) => {
    const contestNumber = Number(params.contestNumber)
    if (isNaN(contestNumber)) {
      throw navigate({ to: '../../', replace: true })
    }
    if (!isDiscipline(params.discipline)) {
      throw navigate({ to: '../', replace: true })
    }

    const userData = await queryClient.fetchQuery(userQuery)
    const query = contestResultsQuery(contestNumber, params.discipline)
    if (userData) queryClient.ensureQueryData(query)
    return query
  },
  component: () => (
    <DisciplinesTabsLayout>
      <ContestDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export const contestsRoute = allContestsRoute.addChildren([
  allContestsIndexRoute,
  contestRoute.addChildren([contestDisciplineRoute, contestIndexRoute]),
])
