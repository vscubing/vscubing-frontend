import { rootRoute } from '@/router'
import { DEFAULT_DISCIPLINE, DISCIPLINES, castDiscipline } from '@/types'
import { Route, redirect } from '@tanstack/react-router'
import { ongoingContestNumberQuery } from '../api'
import { z } from 'zod'
import { queryClient } from '@/lib/reactQuery'
import { ContestsIndexPage } from './ContestsIndexPage'
import { ContestPage } from './ContestPage'

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

export const contestRoute = new Route({
  getParentRoute: () => parentRoute,
  path: '$contestNumber',
  validateSearch: disciplineSchema.merge(paginationSchema),
  beforeLoad: ({ params: { contestNumber }, search: { discipline, page } }) => {
    if (!z.coerce.number().int().safeParse(contestNumber).success) {
      throw redirect({
        to: ongoingContestRedirectRoute.id,
        replace: true,
      })
    }
    if (!discipline || !page) {
      throw redirect({
        search: { discipline: discipline ?? DEFAULT_DISCIPLINE, page: page ?? 1 },
        replace: true,
      })
    }
  },
  loaderDeps: ({ search }) => search,
  loader: ({ params: { contestNumber }, deps: { discipline, page } }) => {
    return { contestNumber: Number(contestNumber), discipline: discipline!, page: page! }
  },
  component: ContestPage,
})

export const contestsRoute = parentRoute.addChildren([indexRoute, ongoingContestRedirectRoute, contestRoute])
