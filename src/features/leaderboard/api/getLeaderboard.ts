import {
  type ContestsSingleResultLeaderboardOutput,
  type ContestsSolvesSingleResultLeaderboardRetrieveParams,
  contestsSolvesSingleResultLeaderboardRetrieve,
} from '@/api'
import { USER_QUERY_KEY } from '@/features/auth'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

export type LeaderboardDTO = ContestsSingleResultLeaderboardOutput['results']
export type LeaderboardResult = LeaderboardDTO['solveSet'][0]

type LeaderboardParams = {
  enabled?: boolean
} & ContestsSolvesSingleResultLeaderboardRetrieveParams

export function getLeaderboardQuery({ enabled = true, page, pageSize }: LeaderboardParams) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', { page, pageSize }],
    queryFn: () => contestsSolvesSingleResultLeaderboardRetrieve({ page, pageSize }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getLeaderboardInfiniteQuery({ enabled = true, pageSize }: Omit<LeaderboardParams, 'page'>) {
  if (pageSize !== undefined) {
    pageSize = Math.floor(pageSize * 2)
  }

  return infiniteQueryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', pageSize],
    queryFn: ({ pageParam: page }) => contestsSolvesSingleResultLeaderboardRetrieve({ page, pageSize }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}
