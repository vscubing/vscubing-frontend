import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { refreshAccessToken } from './accounts'
import { createAuthorizedRequestInterceptor } from './authTokens'

const axiosParams = {
  baseURL: `/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
const _axiosClient = axios.create(axiosParams)

createAuthorizedRequestInterceptor(_axiosClient)
createAuthRefreshInterceptor(_axiosClient, () => refreshAccessToken(axiosParams))

export const axiosClient = _axiosClient
