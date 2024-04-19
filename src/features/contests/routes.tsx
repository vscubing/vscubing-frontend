import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, castDiscipline } from '@/types'
import { Navigate, createRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { queryClient } from '@/lib/reactQuery'
import { ContestResultsPage } from './pages/ContestResultsPage'
import { ContestsIndexPage } from './pages/ContestsIndexPage'
import { SolveContestPage } from './pages/SolveContestPage'
import { WatchSolvePage } from './pages/WatchSolvePage'
import { ongoingContestIdQuery } from '@/shared/contests'

const paginationSchema = z.object({
  page: z.number().int().gte(1).optional().catch(undefined),
})

const disciplineSchema = z.object({ discipline: z.enum(DISCIPLINES).optional().catch(undefined) })

const parentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contests',
})

const indexRoute = createRoute({
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

const ongoingContestRedirectRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: 'ongoing',
  validateSearch: z.object({ discipline: z.enum(DISCIPLINES).optional().catch(DEFAULT_DISCIPLINE) }),
  beforeLoad: async ({ search: { discipline } }) => {
    const contestNumber = await queryClient.fetchQuery(ongoingContestIdQuery)
    void redirect({
      to: contestRoute.id,
      params: { contestNumber: String(contestNumber) },
      search: { discipline: castDiscipline(discipline) },
      replace: true,
      throw: true,
    })
  },
})

const contestRoute = createRoute({
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
        search: (prev: object) => ({ ...prev, discipline: discipline ?? DEFAULT_DISCIPLINE }),
        replace: true,
      })
    }
  },
})

const contestIndexRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/',
  component: () => {
    const contestNumber = contestRoute.useParams().contestNumber
    return (
      <Navigate from={contestIndexRoute.id} params={{ contestNumber }} to='/contests/$contestNumber/results' replace />
    )
  },
})

const contestResultsRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/results',
  validateSearch: paginationSchema,
  beforeLoad: ({ search: { page } }) => {
    if (!page) {
      throw redirect({
        search: (prev: object) => ({ ...prev, page: page ?? 1 }),
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

const solveContestRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/solve',
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { discipline } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline! }
  },
  component: SolveContestPage,
})

const watchSolveIndexRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/watch/',
  beforeLoad: ({ params, search }) => {
    redirect({ to: contestIndexRoute.id, search, params, replace: true, throw: true })
  },
})

const watchSolveRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/watch/$solveId',
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber, solveId }, deps: { discipline } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline!, solveId }
  },
  component: WatchSolvePage,
})

export const contestsRoute = parentRoute.addChildren([
  indexRoute,
  ongoingContestRedirectRoute,
  contestRoute.addChildren([
    contestIndexRoute,
    contestResultsRoute,
    solveContestRoute,
    watchSolveIndexRoute,
    watchSolveRoute,
  ]),
])
