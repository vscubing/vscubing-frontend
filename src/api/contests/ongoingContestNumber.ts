import { axiosClient } from '../axios'
import { queryOptions } from '@tanstack/react-query'

const API_ROUTE = '/contests/ongoing-contest-number/'
async function fetchOngoingContestNumber() {
  const res = await axiosClient.get<number>(API_ROUTE)
  return res.data
}

export const ongoingContestNumberQuery = queryOptions({
  queryKey: ['ongoing-contest-number'],
  queryFn: () => fetchOngoingContestNumber(),
})
