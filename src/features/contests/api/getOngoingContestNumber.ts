import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'
import { ONGOING_CONTEST_NUMBER_QUERY_KEY } from '../queryKeys'

async function getOngoingContestNumber() {
  const res = await axiosClient.get<number>('/contests/ongoing-contest-number/')
  return res.data
}

export const ongoingContestNumberQuery = queryOptions({
  queryKey: [ONGOING_CONTEST_NUMBER_QUERY_KEY],
  queryFn: () => getOngoingContestNumber(),
})
