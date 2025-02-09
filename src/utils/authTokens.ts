import { type AxiosInstance } from 'axios'

const LS_REFRESH_TOKEN = 'refresh-token'
const LS_ACCESS_TOKEN = 'access-token'

export function createAuthorizedRequestInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    } else {
      config.headers.delete('Authorization')
    }
    return config
  })
}

export function setAuthTokens({ refresh, access }: { refresh: string; access: string }) {
  localStorage.setItem(LS_REFRESH_TOKEN, refresh)
  localStorage.setItem(LS_ACCESS_TOKEN, access)
}

export function getAuthTokens() {
  const refresh = localStorage.getItem(LS_REFRESH_TOKEN)
  const access = localStorage.getItem(LS_ACCESS_TOKEN)

  return refresh && access ? { refresh, access } : null
}

export function deleteAuthTokens() {
  localStorage.removeItem(LS_REFRESH_TOKEN)
  localStorage.removeItem(LS_ACCESS_TOKEN)
}
