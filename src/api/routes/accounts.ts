import useSWRImmutable from 'swr/immutable'
import { LS_ACCESS_TOKEN, axiosClient } from '..'

const PREFIX = '/accounts'

export const useCurrentUser = () => {
  const authenticated = localStorage.getItem(LS_ACCESS_TOKEN)
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