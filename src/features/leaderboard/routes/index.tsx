import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, isDiscipline } from '@/types'
import { Route } from '@tanstack/react-router'
import { Leaderboard } from './Leaderboard'
import { z } from 'zod'

const leaderboardRootRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
})
const indexRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '/',
  beforeLoad: ({ navigate }) => {
    void navigate({
      to: '$discipline',
      search: { page: 1 },
      params: { discipline: DEFAULT_DISCIPLINE },
      replace: true,
    })
  },
})

const paginationSchema = z.object({
  page: z.number().gte(1).catch(1),
})

export const disciplineRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '$discipline',
  validateSearch: paginationSchema,
  loader: ({ params: { discipline }, navigate }) => {
    if (!isDiscipline(discipline)) {
      throw navigate({ to: '../', replace: true })
    }
    return { discipline }
  },
  component: Leaderboard,
})

export const leaderboardRoute = leaderboardRootRoute.addChildren([indexRoute, disciplineRoute])
