import useSWR from 'swr'
import axiosClient from '../axios'

const PREFIX = '/accounts'

export const useUserTest = () => {
  const { data, error, isLoading, mutate } = useSWR<{ data: string }>(PREFIX + '/user_test/', axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
