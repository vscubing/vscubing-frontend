import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { ContestDiscipline } from '../components'
import { contestResultsQuery } from '../api'
import { z } from 'zod'
import { DisciplinesTabsLayout } from '@/components/DisciplinesTabsLayout'
import { ongoingContestNumberQuery } from '@/features/misc'
import { queryClient } from '@/lib/reactQuery'

const ongoingContestRedirectSchema = z.object({
  discipline: z.enum(DISCIPLINES).optional().default(DEFAULT_DISCIPLINE),
})
const allContestsRoute = new Route({ getParentRoute: () => rootRoute, path: '/contest' })
const allContestsIndexRoute = new Route({
  getParentRoute: () => allContestsRoute,
  path: '/',
  validateSearch: ongoingContestRedirectSchema,
  beforeLoad: async ({ navigate, search: { discipline }, context: { queryClient } }) => {
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
  getParentRoute: () => allContestsRoute,
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

export const contestsRoute = allContestsRoute.addChildren([
  allContestsIndexRoute,
  contestRoute.addChildren([contestDisciplineRoute, contestIndexRoute]),
])
