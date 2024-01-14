import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, castDiscipline } from '@/types'
import { Navigate, Route, redirect } from '@tanstack/react-router'
import { ongoingContestNumberQuery } from '../api'
import { z } from 'zod'
import { queryClient } from '@/lib/reactQuery'
import { ContestsIndexPage } from './ContestsIndexPage'
import { ContestResultsPage } from './ContestResultsPage'
import { SolvePage } from './SolveContestPage'

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
  validateSearch: disciplineSchema.merge(paginationSchema),
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

const contestRoute = new Route({
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
        search: (prev) => ({ ...prev, discipline: discipline ?? DEFAULT_DISCIPLINE }),
        replace: true,
      })
    }
  },
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { discipline } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline! }
  },
})

const contestIndexRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/',
  component: () => {
    const contestNumber = contestRoute.useParams().contestNumber
    return (
      <Navigate from={contestIndexRoute.id} params={{ contestNumber }} to='/contests/$contestNumber/results' replace />
    )
  },
})

const contestResultsRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/results',
  validateSearch: paginationSchema,
  beforeLoad: ({ search: { page } }) => {
    if (!page) {
      throw redirect({
        search: (prev) => ({ ...prev, page: page ?? 1 }),
        replace: true,
      })
    }
  },
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { page, discipline } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline!, page: page! }
  },
  component: ContestResultsPage,
})

const solveContestRoute = new Route({
  getParentRoute: () => contestRoute,
  path: '/solve',
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { discipline } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline! }
  },
  component: SolvePage,
})

export const contestsRoute = parentRoute.addChildren([
  indexRoute,
  ongoingContestRedirectRoute,
  contestRoute.addChildren([contestIndexRoute, contestResultsRoute, solveContestRoute]),
])
