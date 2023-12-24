import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'

async function getOngoingContestNumber() {
  const res = await axiosClient.get<number>('/contests/ongoing-contest-number/')
  return res.data
}

export const ongoingContestNumberQuery = queryOptions({
  queryKey: ['ongoing-contest-number'],
  queryFn: () => getOngoingContestNumber(),
})
