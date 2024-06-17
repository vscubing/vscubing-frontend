import { type ContestsContestsRetrieveParams, contestsContestsRetrieve } from '@/api'
import { type Discipline } from '@/types'
import { queryOptions, useQuery } from '@tanstack/react-query'

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
    enabled,
  })
}

export function useContests(params: ContestQueryParams) {
  return useQuery(getContestsQuery(params))
}
