import { TOASTS_PRESETS, toast } from '@/components/ui'
import { refreshAccessToken } from '@/features/auth/api/refreshAccessToken'
import { createAuthorizedRequestInterceptor, getAuthTokens } from '@/utils'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const axiosParams = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
} satisfies AxiosRequestConfig

axios.defaults.headers.Accept = axiosParams.headers.Accept
axios.defaults.headers['Content-Type'] = axiosParams.headers['Content-Type']
axios.defaults.timeout = axiosParams.timeout

createAuthorizedRequestInterceptor(axios)
createAuthRefreshInterceptor(axios, () => refreshAccessToken(axiosParams), {
  shouldRefresh: (err) => err.response?.status === 401 && !!getAuthTokens(),
})

axios.interceptors.response.use(undefined, (err: unknown) => {
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

export const axiosClient = axios // I'm intending to use global axios instance, this is a workaround for gradual migration
