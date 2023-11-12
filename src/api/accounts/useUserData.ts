import { axiosClient } from '../axios'
import useSWRImmutable from 'swr/immutable'

const API_ROUTE = 'accounts/current_user/'
export type UserData = { username: string; hasFinishedRegistration: boolean }

export const useUserData = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: string }>(API_ROUTE, axiosClient.get)

  return {
    data: data ? { username: data.data, hasFinishedRegistration: data.data !== 'user' } : null, // TODO remove mock data after backend is updated
    isLoading,
    isError: error,
    mutate,
  }
}
