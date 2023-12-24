import { queryClient } from '@/lib/reactQuery'
import { postLogin, USER_QUERY_KEY } from './api'
import { setAuthTokens, deleteAuthTokens } from './authTokens'

export { createAuthorizedRequestInterceptor } from './authTokens'

export * from './api'

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
