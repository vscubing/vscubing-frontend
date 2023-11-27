import { AxiosInstance } from 'axios'

const LS_REFRESH_TOKEN = 'refresh-token'
const LS_ACCESS_TOKEN = 'access-token'

export function createAuthorizedRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
  })
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
