import useSWRImmutable from 'swr/immutable'
import { axiosClient } from '..'
import { getAuthTokens } from '@/features/auth'

const PREFIX = '/accounts'

export const useCurrentUser = () => {
  const authenticated = getAuthTokens() !== null
  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: string }>(
    authenticated ? PREFIX + '/current_user/' : null,
    axiosClient.get,
  )

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
