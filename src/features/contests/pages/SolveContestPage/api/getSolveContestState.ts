import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
  contestsOngoingContestCurrentRoundSessionProgressRetrieve,
} from '@/api'

export function getSolveContestStateQuery({
  disciplineSlug: discipline,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', discipline],
    queryFn: () => contestsOngoingContestCurrentRoundSessionProgressRetrieve({ disciplineSlug: discipline }),
  })
}

export function useSolveContestState({
  disciplineSlug,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams) {
  return useQuery(getSolveContestStateQuery({ disciplineSlug }))
}
