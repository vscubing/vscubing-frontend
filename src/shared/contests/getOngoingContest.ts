import { contestsOngoingContestRetrieveRetrieve } from '@/api'
import { formatContestDuration } from '@/utils'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const ongoingContestQuery = queryOptions({
  queryKey: ['ongoing-contest-metadata'],
  queryFn: async () => {
    try {
      const data = await contestsOngoingContestRetrieveRetrieve()
      if (data.id === null) {
        throw Error('no ongoing contest, probably on maintenance')
      }
      return { isOnMaintenance: false, data } as const
    } catch (err) {
      return { isOnMaintenance: true, data: undefined } as const
    }
  },
})

export function useOngoingContest() {
  return useQuery(ongoingContestQuery)
}

export function useOngoingContestDuration() {
  const { data: contest } = useOngoingContest()

  if (!contest || contest.isOnMaintenance) {
    return null
  }
  return formatContestDuration(contest.data)
}
