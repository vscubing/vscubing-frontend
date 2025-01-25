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

export function getInfiniteContestsQuery({
  enabled = true,
  pageSize,
  disciplineSlug,
}: Omit<ContestQueryParams, 'page'>) {
  // TODO: figure out why this fetches more pages than needed
  if (pageSize !== undefined) {
    pageSize *= 2
  }

  return infiniteQueryOptions({
    queryKey: ['contests-list', { pageSize, disciplineSlug }],
    queryFn: ({ pageParam: page }) => contestsContestsRetrieve({ pageSize, page, disciplineSlug }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
