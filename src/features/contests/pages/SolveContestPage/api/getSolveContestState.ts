import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
  contestsOngoingContestCurrentRoundSessionProgressRetrieve,
} from '@/api'

export function getSolveContestStateQuery({
  contestSlug,
  disciplineSlug,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', contestSlug, disciplineSlug],
    queryFn: () => contestsOngoingContestCurrentRoundSessionProgressRetrieve({ contestSlug, disciplineSlug }),
  })
}

export function useSolveContestState({
  contestSlug,
  disciplineSlug,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return useQuery(getSolveContestStateQuery({ contestSlug, disciplineSlug }))
}
