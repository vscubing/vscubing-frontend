import { type ContestsContestsRetrieveParams, contestsContestsRetrieve } from '@/api'
import { type Discipline } from '@/types'
import { infiniteQueryOptions, queryOptions, useQuery } from '@tanstack/react-query'

type ContestQueryParams = {
  enabled?: boolean
  discipline: Discipline
  pagination: ContestsContestsRetrieveParams
}

export function getContestsQuery({ discipline, enabled = true, pagination }: ContestQueryParams) {
  if (pagination.orderBy === undefined) {
    pagination.orderBy = '-created_at'
  }
  return queryOptions({
    queryKey: ['contest-list', discipline, pagination],
    queryFn: () => contestsContestsRetrieve(pagination),
    placeholderData: (prev) => prev && { ...prev, limit: prev.limit }, // TODO: change to totalPages when it's available
    enabled,
  })
}

export function getInfiniteContestsQuery({
  discipline,
  enabled = true,
  pagination,
}: {
  discipline: Discipline
  enabled: boolean
  pagination: Omit<ContestsContestsRetrieveParams, 'page'>
}) {
  return infiniteQueryOptions({
    queryKey: ['contests-list', discipline, pagination],
    queryFn: ({ pageParam: page }) => contestsContestsRetrieve({ ...pagination, page }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
