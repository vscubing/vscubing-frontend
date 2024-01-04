import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { ContestDiscipline } from '../components'
import { contestResultsQuery, ongoingContestNumberQuery } from '../api'
import { z } from 'zod'
import { DisciplinesTabsLayout } from '@/components/DisciplinesTabsLayout'
import { queryClient } from '@/lib/reactQuery'

const disciplineSearchSchema = z.object({
  discipline: z.enum(DISCIPLINES).catch(DEFAULT_DISCIPLINE).optional(),
})

const contestsRootRoute = new Route({ getParentRoute: () => rootRoute, path: '/contest' })
const contestsIndexRoute = new Route({
  getParentRoute: () => contestsRootRoute,
  path: '/',
  validateSearch: disciplineSearchSchema,
  loaderDeps: ({ search: { discipline } }) => ({
    discipline,
  }),
  loader: ({ navigate, deps: { discipline } }) => {
    if (!discipline) {
      void navigate({
        to: '/contest',
        search: { discipline: DEFAULT_DISCIPLINE },
        replace: true,
      })
    }
    return { discipline }
  },
  component: () => 'all contests',
})

const ongoingContestRedirectRoute = new Route({
  getParentRoute: () => contestsRootRoute,
  path: '/ongoing',
  validateSearch: disciplineSearchSchema,
  beforeLoad: async ({ navigate, search: { discipline } }) => {
    const contestNumber = await queryClient.fetchQuery(ongoingContestNumberQuery)
    void navigate({
      to: '/contest/$contestNumber/$discipline',
      params: {
        discipline,
        contestNumber: String(contestNumber),
      },
      replace: true,
    })
  },
})

const contestRoute = new Route({
  getParentRoute: () => contestsRootRoute,
  path: '$contestNumber',
})
const contestIndexRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    void navigate({ to: '$discipline', params: { discipline: DEFAULT_DISCIPLINE }, replace: true })
  },
})

export const contestDisciplineRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '$discipline',
  loader: ({ params, navigate }) => {
    const contestNumber = Number(params.contestNumber)
    if (isNaN(contestNumber)) {
      throw navigate({ to: '../../', replace: true })
    }
    if (!isDiscipline(params.discipline)) {
      throw navigate({ to: '../', replace: true })
    }

    const query = contestResultsQuery(contestNumber, params.discipline)
    void queryClient.ensureQueryData(query)
    return query
  },
  component: () => (
    <DisciplinesTabsLayout>
      <ContestDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export const contestsRoute = contestsRootRoute.addChildren([
  contestsIndexRoute,
  contestRoute.addChildren([ongoingContestRedirectRoute, contestDisciplineRoute, contestIndexRoute]),
])
