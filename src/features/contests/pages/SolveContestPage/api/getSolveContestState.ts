import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
  contestsOngoingContestCurrentRoundSessionProgressRetrieve,
} from '@/api'

export function getSolveContestStateQuery({
  disciplineSlug,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', disciplineSlug],
    queryFn: () => contestsOngoingContestCurrentRoundSessionProgressRetrieve({ disciplineSlug }),
  })
}

export function useSolveContestState({
  disciplineSlug,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return useQuery(getSolveContestStateQuery({ disciplineSlug }))
}
