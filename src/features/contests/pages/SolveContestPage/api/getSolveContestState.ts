import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import {
  type ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams,
  contestsOngoingContestCurrentRoundSessionProgressRetrieve,
} from '@/api'
import { queryClient } from '@/lib/reactQuery'
import { ongoingContestQuery } from '@/shared/contests'
import { AxiosError } from 'axios'

export function getSolveContestStateQuery({
  disciplineSlug: discipline,
  contestSlug: contest,
}: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams & { contestSlug: string }) {
  return queryOptions({
    queryKey: [USER_QUERY_KEY, 'solve-contest-state', contest, discipline],
    queryFn: async () => {
      const ongoing = await queryClient.fetchQuery(ongoingContestQuery)
      if (ongoing.data?.slug !== contest) {
        // @ts-expect-error hack to redirect to results if the contest is over
        throw new AxiosError("This contest isn't ongoing", undefined, undefined, undefined, { status: 403 })
      }
      return contestsOngoingContestCurrentRoundSessionProgressRetrieve({ disciplineSlug: discipline })
    },
  })
}

export function useSolveContestState(
  params: ContestsOngoingContestCurrentRoundSessionProgressRetrieveParams & { contestSlug: string },
) {
  return useQuery(getSolveContestStateQuery(params))
}
