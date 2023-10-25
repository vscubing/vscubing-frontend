import { deleteAuthTokens, getAuthTokens, setAuthTokens } from '@/features/auth'
import axios, { AxiosRequestConfig } from 'axios'

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
        refresh: refresh,
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
