import { appRoute } from '@/router'
import { DEFAULT_DISCIPLINE, castDiscipline, isDiscipline } from '@/types'
import { Navigate, createRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { ContestResultsPage } from './pages/ContestResultsPage'
import { ContestsIndexPage } from './pages/ContestsIndexPage'
import { SolveContestPage } from './pages/SolveContestPage'
import { WatchSolvePage } from './pages/WatchSolvePage'
import { useOngoingContest } from '@/shared/contests'
import { Header } from '@/components/layout'
import { LoadingSpinnerPage } from '@/components/ui'
import { HintSection } from '@/shared/HintSection'
import { NavigateBackButton } from '@/shared/NavigateBackButton'

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1),
})

const disciplineSchema = z.object({ discipline: z.string().default(DEFAULT_DISCIPLINE) })

const parentRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/contests',
})

const indexRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '/',
  validateSearch: disciplineSchema.merge(paginationSchema),
  beforeLoad: ({ search: { page, discipline } }) => {
    // TODO: remove isDiscipline and castDiscipline once backend accepts disciplines
    if (!isDiscipline(discipline)) {
      throw redirect({
        from: indexRoute.fullPath,
        search: { discipline: castDiscipline(discipline), page },
        replace: true,
      })
    }
  },
  component: ContestsIndexPage,
})

const ongoingContestRedirectRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: 'ongoing',
  validateSearch: disciplineSchema,
  component: () => {
    const { data: ongoing } = useOngoingContest()
    const search = ongoingContestRedirectRoute.useSearch()
    if (!ongoing) {
      return (
        <>
          <Header />
          <LoadingSpinnerPage />
        </>
      )
    }
    if (ongoing.isOnMaintenance) {
      // TODO: OnMaintenance note
      return (
        <div className='flex flex-1 flex-col gap-3 sm:gap-2'>
          <Header />
          <NavigateBackButton className='self-start' />
          <HintSection>
            <p>The ongoing contest is currently down for maintenance</p>
          </HintSection>
        </div>
      )
    }
    return <Navigate to={contestRoute.to} params={{ contestSlug: ongoing.data.slug }} search={search} replace />
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
        to={contestResultsRoute.to}
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
