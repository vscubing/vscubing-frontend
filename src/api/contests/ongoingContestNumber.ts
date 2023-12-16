import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '../axios'

type Response = number

const API_ROUTE = '/contests/ongoing-contest-number/'
export const getOngoingContestNumber = async () => {
  const res = await axiosClient.get<Response>(API_ROUTE)
  return res.data
}

export const useOngoingContestNumber = () => {
  const { data, error, isLoading } = useSWRImmutable<{ data: Response }>(API_ROUTE, axiosClient.get)

  return { data: data?.data, isLoading, isError: error }
}
