import { toast } from '@/components/toasts'
import { refreshAccessToken } from '@/features/auth/api/refreshAccessToken'
import { createAuthorizedRequestInterceptor, getAuthTokens } from '@/utils'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import applyCaseMiddleware from 'axios-case-converter'

const axiosParams: AxiosRequestConfig = {
  baseURL: `/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
}
const _axiosClient = axios.create(axiosParams)

applyCaseMiddleware(_axiosClient)
createAuthorizedRequestInterceptor(_axiosClient)
createAuthRefreshInterceptor(_axiosClient, () => refreshAccessToken(axiosParams), {
  shouldRefresh: (err) => err.response?.status === 401 && !!getAuthTokens(),
})

_axiosClient.interceptors.response.use(undefined, (err) => {
  if (!(err instanceof AxiosError)) {
    throw err
  }

  if (err.response?.status === 500) {
    toast('internalError')
  }

  const timeout = err.code === 'ECONNABORTED' && err.message.includes('timeout')
  const noConnection = err.code === 'ERR_NETWORK'
  if (timeout || noConnection) {
    toast('noConnection')
  }

  throw err
})

export const axiosClient = _axiosClient
