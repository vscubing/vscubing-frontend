import { axiosClient } from '../axios'
import useSWRImmutable from 'swr/immutable'

const API_ROUTE = 'accounts/current_user/'
export type UserData = { username: string; auth_completed: boolean }

export function useUser() {
  const { data, error, isLoading } = useSWRImmutable<{ data: UserData }>(API_ROUTE, axiosClient.get)

  return {
    userData: data ? data.data : null,
    isLoading,
    isError: error,
  }
}
