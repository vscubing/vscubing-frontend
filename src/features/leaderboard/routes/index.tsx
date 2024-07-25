import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline, type Discipline, castDiscipline } from '@/types'
import { Navigate, type SearchSchemaInput, redirect, createRoute } from '@tanstack/react-router'
import { Leaderboard } from './Leaderboard'
import { z } from 'zod'

const parentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})

const indexRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '/',
  component: () => (
    <Navigate to={disciplineRoute.id} search={{ page: 1 }} params={{ disciplineSlug: DEFAULT_DISCIPLINE }} replace />
  ),
})

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1),
})

export const disciplineRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '$disciplineSlug',
  validateSearch: (search: { page?: number } & SearchSchemaInput) => paginationSchema.parse(search),
  beforeLoad: ({ params: { disciplineSlug }, search: { page } }) => {
    if (!isDiscipline(disciplineSlug) || page === undefined) {
      throw redirect({
        to: disciplineRoute.id,
        params: { disciplineSlug: castDiscipline(disciplineSlug) },
        search: { page: page ?? 1 },
        replace: true,
      })
    }
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ params: { disciplineSlug }, deps: { page } }) => {
    return { disciplineSlug: disciplineSlug as Discipline, page: page! }
  },
  component: Leaderboard,
})

export const leaderboardRoute = parentRoute.addChildren([indexRoute, disciplineRoute])
