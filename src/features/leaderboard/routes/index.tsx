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
      params: { discipline: DEFAULT_DISCIPLINE },
      replace: true,
    })
  },
})

const paginationSchema = z.object({
  page: z.number().int().gte(1).catch(1).optional(),
})

export const disciplineRoute = new Route({
  getParentRoute: () => leaderboardRootRoute,
  path: '$discipline',
  validateSearch: paginationSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ params: { discipline }, deps: { page }, navigate }) => {
    if (!isDiscipline(discipline)) {
      throw navigate({ to: '../', replace: true })
    }
    if (page === undefined) {
      throw navigate({ search: { page: 1 }, replace: true })
    }
    return { discipline, page }
  },
  component: Leaderboard,
})

export const leaderboardRoute = leaderboardRootRoute.addChildren([indexRoute, disciplineRoute])
