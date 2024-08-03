import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, castDiscipline, isDiscipline } from '@/types'
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
    <Navigate to={disciplineRoute.id} search={{ page: 1 }} params={{ discipline: DEFAULT_DISCIPLINE }} replace />
  ),
})

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1),
})

export const disciplineRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '$discipline',
  validateSearch: (search: { page?: number } & SearchSchemaInput) => paginationSchema.parse(search),
  beforeLoad: ({ params: { discipline }, search: { page } }) => {
    // we can remove isDiscipline and castDiscipline once backend accepts disciplines
    if (!isDiscipline(discipline) || page === undefined) {
      throw redirect({
        to: disciplineRoute.id,
        params: { discipline: castDiscipline(discipline) },
        search: { page: page ?? 1 },
        replace: true,
      })
    }
  },
  component: Leaderboard,
})

export const leaderboardRoute = parentRoute.addChildren([indexRoute, disciplineRoute])
