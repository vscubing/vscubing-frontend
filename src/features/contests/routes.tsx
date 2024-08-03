import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES } from '@/types'
import { Navigate, createRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { queryClient } from '@/lib/reactQuery'
import { ContestResultsPage } from './pages/ContestResultsPage'
import { ContestsIndexPage } from './pages/ContestsIndexPage'
import { SolveContestPage } from './pages/SolveContestPage'
import { WatchSolvePage } from './pages/WatchSolvePage'
import { ongoingContestQuery } from '@/shared/contests'

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1),
})

// we can remove discipline validation once backend accepts discipline as a query parameter
const disciplineSchema = z.object({ discipline: z.enum(DISCIPLINES).catch(DEFAULT_DISCIPLINE) })

const parentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contests',
})

const indexRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '/',
  validateSearch: disciplineSchema.merge(paginationSchema),
  component: ContestsIndexPage,
})

const ongoingContestRedirectRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: 'ongoing',
  validateSearch: disciplineSchema,
  beforeLoad: async ({ search: { discipline } }) => {
    const ongoing = await queryClient.fetchQuery(ongoingContestQuery)
    void redirect({
      to: contestRoute.id,
      params: { contestSlug: ongoing.slug },
      search: { discipline },
      replace: true,
      throw: true,
    })
  },
})

const contestRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '$contestSlug',
  validateSearch: disciplineSchema,
})

const contestIndexRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/',
  component: () => {
    const { contestSlug } = contestRoute.useParams()
    return (
      <Navigate
        search={{ discipline: DEFAULT_DISCIPLINE, page: 1 }}
        params={{ contestSlug }}
        to='/contests/$contestSlug/results'
        replace
      />
    )
  },
})

const contestResultsRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/results',
  validateSearch: paginationSchema,
  component: ContestResultsPage,
})

const solveContestRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/solve',
  component: SolveContestPage,
})

const watchSolveRoute = createRoute({
  getParentRoute: () => contestRoute,
  path: '/watch/$solveId',
  component: WatchSolvePage,
})

export const contestsRoute = parentRoute.addChildren([
  indexRoute,
  ongoingContestRedirectRoute,
  contestRoute.addChildren([contestIndexRoute, contestResultsRoute, solveContestRoute, watchSolveRoute]),
])
