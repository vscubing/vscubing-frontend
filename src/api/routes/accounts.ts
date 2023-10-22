import useSWR from 'swr'
import axiosClient from '../axios'

const PREFIX = '/accounts'

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<{ data: string }>(PREFIX + '/current_user/', axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
