import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline, type Discipline, castDiscipline } from '@/types'
import { Navigate, Route, type SearchSchemaInput, redirect } from '@tanstack/react-router'
import { Leaderboard } from './Leaderboard'
import { z } from 'zod'

const leaderboardRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})

const indexRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '/',
  component: () => <Navigate to={disciplineRoute.id} params={{ discipline: DEFAULT_DISCIPLINE }} replace />,
})

const paginationSchema = z.object({
  page: z.number().int().gte(1).optional().catch(undefined),
})

export const disciplineRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '$discipline',
  validateSearch: (search: { page?: number } & SearchSchemaInput) => paginationSchema.parse(search),
  beforeLoad: ({ params: { discipline }, search: { page } }) => {
    if (!isDiscipline(discipline) || page === undefined) {
      throw redirect({
        to: disciplineRoute.id,
        params: { discipline: castDiscipline(discipline) },
        search: { page: page ?? 1 },
        replace: true,
      })
    }
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ params: { discipline }, deps: { page } }) => {
    return { discipline: discipline as Discipline, page: page! }
  },
  component: Leaderboard,
})

export const leaderboardRoute = leaderboardRootRoute.addChildren([indexRoute, disciplineRoute])
