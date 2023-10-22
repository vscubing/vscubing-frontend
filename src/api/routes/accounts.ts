import useSWR from 'swr'
import axiosClient from '../axios'
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from '..'

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
  axiosClient.post<{ code: string }, { data: { access: string; refresh: string } }>('/accounts/google/login/', {
    code: googleCode,
  })

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem(LS_REFRESH_TOKEN)
  const response = await axiosClient.post<{ refresh: string }, { data: { access: string } }>(
    PREFIX + '/token/refresh/',
    { refresh: refresh },
  )

  localStorage.setItem(LS_ACCESS_TOKEN, response.data.access)
}
