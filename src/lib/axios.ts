import { createAuthorizedRequestInterceptor, refreshAccessToken } from '@/features/auth'
import { getAuthTokens } from '@/features/auth/authTokens'
import axios, { type AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import applyCaseMiddleware from 'axios-case-converter'

const axiosParams: AxiosRequestConfig = {
  baseURL: `/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
const _axiosClient = axios.create(axiosParams)

applyCaseMiddleware(_axiosClient)
createAuthorizedRequestInterceptor(_axiosClient)
createAuthRefreshInterceptor(_axiosClient, () => refreshAccessToken(axiosParams), {
  shouldRefresh: (err) => err.response?.status === 401 && !!getAuthTokens(),
})

export const axiosClient = _axiosClient
