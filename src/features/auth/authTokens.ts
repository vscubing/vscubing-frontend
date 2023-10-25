import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const LS_REFRESH_TOKEN = 'refresh-token'
const LS_ACCESS_TOKEN = 'access-token'

export const createAuthorizedRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
  })
}

export const refreshAccessToken = async (axiosParams: AxiosRequestConfig) => {
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

export const setAuthTokens = ({ refresh, access }: { refresh: string; access: string }) => {
  localStorage.setItem(LS_REFRESH_TOKEN, refresh)
  localStorage.setItem(LS_ACCESS_TOKEN, access)
}

export const getAuthTokens = () => {
  const refresh = localStorage.getItem(LS_REFRESH_TOKEN)
  const access = localStorage.getItem(LS_ACCESS_TOKEN)

  return refresh && access ? { refresh, access } : null
}

export const deleteAuthTokens = () => {
  localStorage.removeItem(LS_REFRESH_TOKEN)
  localStorage.removeItem(LS_ACCESS_TOKEN)
}
