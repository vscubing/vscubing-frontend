import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  type ContestsContestsLeaderboardRetrieveParams,
  contestsContestsLeaderboardRetrieve,
  type ContestsRoundSessionWithSolvesListOutput,
} from '@/api'

export function getContestQueryKey({ contestSlug, discipline }: { contestSlug: string; discipline: string }) {
  return [USER_QUERY_KEY, 'contest-results', contestSlug, discipline]
}

export type ContestResultsDTO = ContestsRoundSessionWithSolvesListOutput['results']
export type ContestSession = ContestResultsDTO['roundSessionSet'][0]

type ContestResultsParams = ContestsContestsLeaderboardRetrieveParams & {
  enabled?: boolean
}
export function getContestResultsQuery({
  contestSlug,
  disciplineSlug: discipline,
  page,
  pageSize,
  enabled,
}: ContestResultsParams) {
  return queryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, discipline }), { page, pageSize }],
    queryFn: () => contestsContestsLeaderboardRetrieve({ contestSlug, disciplineSlug: discipline, page, pageSize }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getContestResultsInfiniteQuery({
  contestSlug,
  disciplineSlug: discipline,
  pageSize,
  enabled,
}: Omit<ContestResultsParams, 'page'>) {
  if (pageSize !== undefined) {
    pageSize = Math.floor(pageSize * 2)
  }

  return infiniteQueryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, discipline }), pageSize],
    queryFn: ({ pageParam: page }) =>
      contestsContestsLeaderboardRetrieve({ contestSlug, disciplineSlug: discipline, page, pageSize }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}
