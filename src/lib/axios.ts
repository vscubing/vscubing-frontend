import { TOASTS_PRESETS, toast } from '@/components/ui'
import { refreshAccessToken } from '@/features/auth/api/refreshAccessToken'
import { createAuthorizedRequestInterceptor, getAuthTokens } from '@/utils'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const axiosParams: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
}
const _axiosClient = axios.create(axiosParams)

createAuthorizedRequestInterceptor(_axiosClient)
createAuthRefreshInterceptor(_axiosClient, () => refreshAccessToken(axiosParams), {
  shouldRefresh: (err) => err.response?.status === 401 && !!getAuthTokens(),
})

_axiosClient.interceptors.response.use(undefined, (err: unknown) => {
  if (!(err instanceof AxiosError)) {
    throw err
  }

  if (err.response?.status === 500) {
    toast(TOASTS_PRESETS.internalError)
  }

  const timeout = err.code === 'ECONNABORTED' && err.message.includes('timeout')
  const noConnection = err.code === 'ERR_NETWORK'
  if (timeout || noConnection) {
    toast(TOASTS_PRESETS.noConnection)
  }

  throw err
})

export const axiosClient = _axiosClient
