import { postLogin } from '@/api/accounts'
import { setAuthTokens, deleteAuthTokens } from './authTokens'

export const login = async (googleCode: string) => {
  const response = await postLogin(googleCode)
  const { refresh, access } = response.data

  setAuthTokens({ refresh, access })
  window.location.reload()
}

export const logout = () => {
  deleteAuthTokens()
  window.location.reload()
}
