import { queryClient } from '@/lib/reactQuery'
import { USER_QUERY_KEY, postLogin } from './api'
import { setAuthTokens, deleteAuthTokens } from './authTokens'
import { useGoogleLogin } from '@react-oauth/google'

export { createAuthorizedRequestInterceptor } from './authTokens'
export * from './api'

export function useLogin() {
  return useGoogleLogin({
    onSuccess: ({ code }) => void login(code),
    onError: () => console.log('error'), // TODO: add notification
    flow: 'auth-code',
  })
}

async function login(googleCode: string) {
  const response = await postLogin(googleCode)
  const { refresh, access } = response.data

  setAuthTokens({ refresh, access })
  await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
}

export async function logout() {
  deleteAuthTokens()
  await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
}
