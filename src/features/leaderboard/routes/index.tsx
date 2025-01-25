import { appRoute } from '@/router'
import { DEFAULT_DISCIPLINE } from '@/types'
import { Navigate, createRoute } from '@tanstack/react-router'
import { Leaderboard } from './Leaderboard'
import { z } from 'zod'

const parentRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/leaderboard',
})

const indexRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '/',
  component: () => (
    <Navigate to={disciplineRoute.to} search={{ page: 1 }} params={{ discipline: DEFAULT_DISCIPLINE }} replace />
  ),
})

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1),
})

export const disciplineRoute = createRoute({
  getParentRoute: () => parentRoute,
  path: '$discipline',
  validateSearch: paginationSchema,
  component: Leaderboard,
})

export const leaderboardRoute = parentRoute.addChildren([indexRoute, disciplineRoute])
