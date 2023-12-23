import { USER_QUERY_KEY, postLogin } from '@/api/accounts'
import { setAuthTokens, deleteAuthTokens } from './authTokens'
import { queryClient } from './reactQuery'

export async function login(googleCode: string) {
  const response = await postLogin(googleCode)
  const { refresh, access } = response.data

  setAuthTokens({ refresh, access })
  queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
}

export function logout() {
  deleteAuthTokens()
  queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
}
