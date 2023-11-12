import { axiosClient } from '../axios'
import useSWRImmutable from 'swr/immutable'

const API_ROUTE = 'accounts/current_user/'
export type UserData = { username: string; auth_completed: boolean }

export const useUserData = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: UserData }>(API_ROUTE, axiosClient.get)

  return {
    data: data ? data.data : null,
    isLoading,
    isError: error,
    mutate,
  }
}
