import axios, { type AxiosRequestConfig } from 'axios'
import { getAuthTokens, setAuthTokens, deleteAuthTokens } from '../authTokens'

export async function refreshAccessToken(axiosParams: AxiosRequestConfig) {
  const tokens = getAuthTokens()
  if (!tokens) {
    return
  }
  const { refresh } = tokens

  try {
    const response = await axios.post<{ refresh: string }, { data: { access: string } }>(
      '/accounts/token/refresh/',
      {
        refresh,
      },
      axiosParams, // use clean axios with default params to avoid 401 error recursion
    )
    const newAccess = response.data.access

    setAuthTokens({ refresh, access: newAccess })
  } catch (error) {
    deleteAuthTokens()
    window.location.reload()
  }
}
