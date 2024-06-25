import { type ContestsContestsRetrieveParams, contestsContestsRetrieve } from '@/api'
import { infiniteQueryOptions, queryOptions, useQuery } from '@tanstack/react-query'

type ContestQueryParams = {
  enabled?: boolean
} & ContestsContestsRetrieveParams

export function getContestsQuery({ enabled = true, pageSize, page }: ContestQueryParams) {
  return queryOptions({
    queryKey: ['contest-list', { pageSize, page }],
    queryFn: () => contestsContestsRetrieve({ pageSize, page }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getInfiniteContestsQuery({ enabled = true, pageSize }: Omit<ContestQueryParams, 'page'>) {
  // TODO: figure out why this fetches more pages than needed
  if (pageSize !== undefined) {
    pageSize *= 2
  }

  return infiniteQueryOptions({
    queryKey: ['contests-list', pageSize],
    queryFn: ({ pageParam: page }) => contestsContestsRetrieve({ pageSize, page }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
