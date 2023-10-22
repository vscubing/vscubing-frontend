import axios from 'axios'
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from './accessToken'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const axiosParams = {
  baseURL: `http://${window.location.hostname}:8000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
const _axiosClient = axios.create(axiosParams)

_axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return config
})

async function refreshAccessToken() {
  const refresh = localStorage.getItem(LS_REFRESH_TOKEN)
  try {
    const response = await axios.post<{ refresh: string }, { data: { access: string } }>(
      '/accounts/token/refresh/',
      {
        refresh: refresh,
      },
      axiosParams, // use clean axios with default params to avoid 401 error recursion
    )
    localStorage.setItem(LS_ACCESS_TOKEN, response.data.access)
  } catch (error) {
    localStorage.removeItem(LS_REFRESH_TOKEN)
    localStorage.removeItem(LS_ACCESS_TOKEN)
    window.location.reload()
  }
}
createAuthRefreshInterceptor(_axiosClient, refreshAccessToken)

export const axiosClient = _axiosClient
