import { type ContestsContestsRetrieveParams, contestsContestsRetrieve } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function useContestList(params: ContestsContestsRetrieveParams) {
  return useQuery({ queryKey: ['contest-list', params], queryFn: () => contestsContestsRetrieve(params) })
}
