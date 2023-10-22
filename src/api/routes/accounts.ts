import useSWR from 'swr'
import { axiosClient } from '..'

const PREFIX = '/accounts'

export const API_CURRENT_USER = PREFIX + '/current_user/'
export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<{ data: string }>(API_CURRENT_USER, axiosClient.get)

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

export const postLogin = (googleCode: string) =>
  axiosClient.post<{ code: string }, { data: { access: string; refresh: string } }>(PREFIX + '/google/login/', {
    code: googleCode,
  })
