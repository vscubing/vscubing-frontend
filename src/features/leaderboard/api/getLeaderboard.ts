import {
  type ContestsSingleResultLeaderboardOutput,
  type ContestsSolvesSingleResultLeaderboardRetrieveParams,
  contestsSolvesSingleResultLeaderboardRetrieve,
} from '@/api'
import { USER_QUERY_KEY } from '@/features/auth'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

// TODO: remove type hacks after API is fixed (ownResult should be nullable and all the fieds of ownResult should be required)

export type LeaderboardDTO = Omit<ContestsSingleResultLeaderboardOutput['results'], 'ownResult'> & {
  ownResult: {
    isDisplayedSeparately: boolean
    page: number
    place: number
    solve: NonNullable<ContestsSingleResultLeaderboardOutput['results']['ownResult']['solve']>
  } | null
}
export type LeaderboardResult = LeaderboardDTO['solveSet'][0]

type LeaderboardParams = {
  enabled?: boolean
} & ContestsSolvesSingleResultLeaderboardRetrieveParams

type LeaderboardResponsePatched = Omit<ContestsSingleResultLeaderboardOutput, 'results'> & { results: LeaderboardDTO }
async function getSingleResultLeaderboardPatched(
  params: ContestsSolvesSingleResultLeaderboardRetrieveParams,
): Promise<LeaderboardResponsePatched> {
  const res = await contestsSolvesSingleResultLeaderboardRetrieve(params)

  return {
    ...res,
    results: {
      solveSet: res.results.solveSet,
      ownResult: res.results.ownResult.solve ? res.results.ownResult : null,
    } as LeaderboardDTO,
  }
}

export function getLeaderboardQuery({ enabled = true, disciplineSlug, page, pageSize }: LeaderboardParams) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', disciplineSlug, { page, pageSize }],
    queryFn: () => getSingleResultLeaderboardPatched({ disciplineSlug, page, pageSize }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getLeaderboardInfiniteQuery({
  enabled = true,
  disciplineSlug,
  pageSize,
}: Omit<LeaderboardParams, 'page'>) {
  if (pageSize !== undefined) {
    pageSize = Math.floor(pageSize * 2)
  }

  return infiniteQueryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', disciplineSlug, pageSize],
    queryFn: ({ pageParam: page }) => getSingleResultLeaderboardPatched({ disciplineSlug, page, pageSize }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}
