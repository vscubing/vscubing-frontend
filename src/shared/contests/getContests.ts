import { type ContestsContestsRetrieveParams, contestsContestsRetrieve, type ContestsContestListOutput } from '@/api'
import { type Discipline } from '@/types'
import { infiniteQueryOptions, queryOptions, useQuery } from '@tanstack/react-query'

async function contestsRetreiveWithFixedTotalPages(
  params?: ContestsContestsRetrieveParams,
): Promise<ContestsContestListOutput & { totalPages: number }> {
  // TODO: remove this wrapper function after api is updated

  const res = await contestsContestsRetrieve(params)
  const count = res?.count
  const limit = params?.limit
  if (count === undefined || limit === undefined) {
    throw new Error('count and limit are required')
  }
  const totalPages = Math.ceil(count / limit)
  return { ...res, totalPages }
}

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
    queryFn: () => contestsRetreiveWithFixedTotalPages(pagination),
    placeholderData: (prev) => prev,
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
  if (pagination.limit !== undefined) {
    pagination.limit *= 2
  }

  return infiniteQueryOptions({
    queryKey: ['contests-list', discipline, pagination],
    queryFn: ({ pageParam: page }) => contestsRetreiveWithFixedTotalPages({ ...pagination, page }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
