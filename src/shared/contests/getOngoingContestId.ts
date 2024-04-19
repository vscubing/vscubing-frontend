import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'

async function getOngoingContestId() {
  const res = await axiosClient.get<{ id: number }>('/contests/ongoing-contest/retrieve/')
  return res.data.id
}

export const ongoingContestIdQuery = queryOptions({
  queryKey: ['ongoing-contest-number'],
  queryFn: getOngoingContestId,
})
