import { axiosClient } from '../axios'
import useSWRImmutable from 'swr/immutable'

const API_ROUTE = 'accounts/current_user/'
export type UserData = { username: string; hasFinishedRegistration: boolean }

export const useUserData = (isAuthenticated: boolean) => {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: string }>(
    isAuthenticated ? API_ROUTE : null,
    axiosClient.get,
  )

  return {
    data: data ? { username: data.data, hasFinishedRegistration: true } : null, // TODO remove mock data after backend is updated
    isLoading,
    isError: error,
    mutate,
  }
}
