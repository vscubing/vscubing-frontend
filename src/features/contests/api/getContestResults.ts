import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  type ContestsContestsLeaderboardRetrieveParams,
  contestsContestsLeaderboardRetrieve,
  type ContestsRoundSessionWithSolvesListOutput,
} from '@/api'

// TODO: remove type hacks after API is fixed (ownResult should be nullable and all the fieds of ownResult should be required)

export function getContestQueryKey({ contestSlug, disciplineSlug }: { contestSlug: string; disciplineSlug: string }) {
  return [USER_QUERY_KEY, 'contest-results', contestSlug, disciplineSlug]
}

export type ContestResultsDTO = Omit<ContestsRoundSessionWithSolvesListOutput['results'], 'ownResult'> & {
  ownResult: {
    isDisplayedSeparately: boolean
    page: number
    place: number
    roundSession: NonNullable<ContestsRoundSessionWithSolvesListOutput['results']['ownResult']['roundSession']>
  } | null
}
export type ContestSession = ContestResultsDTO['roundSessionSet'][0]

type ContestResultsPatched = Omit<ContestsRoundSessionWithSolvesListOutput, 'results'> & { results: ContestResultsDTO }
async function getContestResultsPatched(
  params: ContestsContestsLeaderboardRetrieveParams,
): Promise<ContestResultsPatched> {
  const res = await contestsContestsLeaderboardRetrieve(params)

  return {
    ...res,
    results: {
      ownResult: res.results.ownResult.roundSession ? res.results.ownResult : null,
      roundSessionSet: res.results.roundSessionSet,
    } as ContestResultsDTO,
  }
}

type ContestResultsParams = ContestsContestsLeaderboardRetrieveParams & {
  enabled?: boolean
}
export function getContestResultsQuery({ contestSlug, disciplineSlug, page, pageSize, enabled }: ContestResultsParams) {
  return queryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, disciplineSlug }), { page, pageSize }],
    queryFn: () => getContestResultsPatched({ contestSlug, disciplineSlug, page, pageSize }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function getContestResultsInfiniteQuery({
  contestSlug,
  disciplineSlug,
  pageSize,
  enabled,
}: Omit<ContestResultsParams, 'page'>) {
  if (pageSize !== undefined) {
    pageSize = Math.floor(pageSize * 2)
  }

  return infiniteQueryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, disciplineSlug }), pageSize],
    queryFn: ({ pageParam: page }) => getContestResultsPatched({ contestSlug, disciplineSlug, page, pageSize }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}
