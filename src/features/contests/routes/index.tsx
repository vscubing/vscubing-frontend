import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, castDiscipline } from '@/types'
import { Route, redirect } from '@tanstack/react-router'
import { ContestDiscipline } from '../components'
import { contestResultsQuery, ongoingContestNumberQuery } from '../api'
import { z } from 'zod'
import { DisciplinesTabsLayout } from '@/components/DisciplinesTabsLayout'
import { queryClient } from '@/lib/reactQuery'
import { ContestsIndexPage } from './ContestsIndexPage'

const paginationSchema = z.object({
  page: z.number().int().gte(1).optional().catch(undefined),
})

const disciplineSchema = z.object({ discipline: z.enum(DISCIPLINES).optional().catch(undefined) })

const parentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contests',
})

const indexRoute = new Route({
  getParentRoute: () => parentRoute,
  path: '/',
  validateSearch: paginationSchema.merge(disciplineSchema),
  beforeLoad: ({ search: { discipline, page } }) => {
    if (!page || !discipline) {
      throw redirect({
        search: { page: page ?? 1, discipline: discipline ?? DEFAULT_DISCIPLINE },
        replace: true,
      })
    }
  },
  loaderDeps: ({ search }) => search,
  loader: ({ deps: { discipline, page } }) => {
    return { discipline: discipline!, page: page! }
  },
  component: ContestsIndexPage,
})

const ongoingContestRedirectRoute = new Route({
  getParentRoute: () => parentRoute,
  path: 'ongoing',
  validateSearch: z.object({ discipline: z.enum(DISCIPLINES).optional().catch(DEFAULT_DISCIPLINE) }),
  beforeLoad: async ({ search: { discipline } }) => {
    const contestNumber = await queryClient.fetchQuery(ongoingContestNumberQuery)
    void redirect({
      to: contestRoute.id,
      params: { contestNumber: String(contestNumber) },
      search: { discipline: castDiscipline(discipline) },
      replace: true,
      throw: true,
    })
  },
})

export const contestRoute = new Route({
  getParentRoute: () => parentRoute,
  path: '$contestNumber',
  validateSearch: disciplineSchema,
  beforeLoad: ({ params: { contestNumber }, search: { discipline } }) => {
    if (!z.coerce.number().int().safeParse(contestNumber).success) {
      throw redirect({
        to: ongoingContestRedirectRoute.id,
        replace: true,
      })
    }
    if (!discipline) {
      throw redirect({
        search: { discipline: DEFAULT_DISCIPLINE },
        replace: true,
      })
    }
  },
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { discipline } }) => {
    const query = contestResultsQuery(Number(contestNumber), discipline!)
    void queryClient.ensureQueryData(query)
    return query
  },
  component: () => (
    <DisciplinesTabsLayout>
      <ContestDiscipline />
    </DisciplinesTabsLayout>
  ),
})

export const contestsRoute = parentRoute.addChildren([indexRoute, ongoingContestRedirectRoute, contestRoute])
