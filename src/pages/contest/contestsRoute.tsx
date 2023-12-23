import { DisciplinesTabsLayout } from '@/components'
import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { ContestDiscipline } from './ContestDiscipline'
import { ongoingContestNumberQuery } from '@/api/contests'

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
  loader: ({ params, navigate }) => {
    const contestNumber = Number(params.contestNumber)
    if (isNaN(contestNumber)) {
      navigate({ to: '../../', replace: true })
    }
    if (!isDiscipline(params.discipline)) {
      navigate({ to: '../', replace: true })
    }
  },
  component: () => (
    <DisciplinesTabsLayout>
      <ContestDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export default allContestsRoute.addChildren([
  allContestsIndexRoute,
  contestRoute.addChildren([contestDisciplineRoute, contestIndexRoute]),
])
