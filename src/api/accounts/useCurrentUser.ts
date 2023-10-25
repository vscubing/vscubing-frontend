import { getAuthTokens } from '@/features/auth'
import { axiosClient } from '..'
import useSWRImmutable from 'swr/immutable'

const API_ROUTE = 'accounts/current_user/'
export const useCurrentUser = () => {
  const authenticated = getAuthTokens() !== null
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: string }>(
    authenticated ? API_ROUTE : null,
    axiosClient.get,
  )

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
