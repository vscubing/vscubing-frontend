import { postLogin } from '@/api/accounts'
import { setAuthTokens, deleteAuthTokens } from './authTokens'

export async function login(googleCode: string) {
  const response = await postLogin(googleCode)
  const { refresh, access } = response.data

  setAuthTokens({ refresh, access })
  window.location.reload()
}

export function logout() {
  deleteAuthTokens()
  window.location.reload()
}
