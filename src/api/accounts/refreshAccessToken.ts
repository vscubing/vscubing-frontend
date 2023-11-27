import axios, { AxiosRequestConfig } from 'axios'
import { getAuthTokens, setAuthTokens, deleteAuthTokens } from '../authTokens'

const API_ROUTE = '/accounts/token/refresh/'
export async function refreshAccessToken(axiosParams: AxiosRequestConfig) {
  const tokens = getAuthTokens()
  if (!tokens) {
    return
  }
  const { refresh } = tokens

  try {
    const response = await axios.post<{ refresh: string }, { data: { access: string } }>(
      API_ROUTE,
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
