import { contestsOngoingContestRetrieveRetrieve } from '@/api'
import { formatContestDuration } from '@/utils'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const ongoingContestQuery = queryOptions({
  queryKey: ['ongoing-contest-metadata'],
  queryFn: contestsOngoingContestRetrieveRetrieve,
})

export function useOngoingContest() {
  return useQuery(ongoingContestQuery)
}

export function useOngoingContestDuration() {
  const { data: contest } = useOngoingContest()

  if (!contest) {
    return null
  }
  return formatContestDuration(contest)
}
