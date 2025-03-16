import { type ContestsContestsRetrieveParams, contestsContestsRetrieve } from '@/api'
import { infiniteQueryOptions, queryOptions, useQuery } from '@tanstack/react-query'

type ContestQueryParams = {
  enabled?: boolean
} & ContestsContestsRetrieveParams

export function getContestsQuery({ enabled = true, pageSize, page, disciplineSlug }: ContestQueryParams) {
  return queryOptions({
    queryKey: ['contest-list', { pageSize, page, disciplineSlug }],
    queryFn: () => contestsContestsRetrieve({ pageSize, page, disciplineSlug }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getInfiniteContestsQuery({ pageSize, disciplineSlug }: Omit<ContestQueryParams, 'page'>) {
  return infiniteQueryOptions({
    queryKey: ['contests-list', { pageSize, disciplineSlug }],
    queryFn: async ({ pageParam: page }) => {
      await new Promise((res) => setTimeout(res, 1000))
      return contestsContestsRetrieve({ pageSize, page, disciplineSlug })
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
