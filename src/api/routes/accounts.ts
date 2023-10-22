import useSWR from 'swr'
import axiosClient from '../axios'
import { getRefreshTokenLS, setAccessTokenLS } from '..'

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

export const refreshAccessToken = async () => {
  const refresh = getRefreshTokenLS()
  const response = await axiosClient.post<{ refresh: string }, { data: { access: string } }>(
    PREFIX + '/token/refresh/',
    { refresh: refresh },
  )

  setAccessTokenLS(response.data.access)
}

window.refresh = refreshAccessToken
