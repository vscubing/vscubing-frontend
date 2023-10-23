import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { createAuthorizedRequestInterceptor, refreshAccessToken } from './auth'

const axiosParams = {
  baseURL: `http://${window.location.hostname}:8000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}
const _axiosClient = axios.create(axiosParams)

createAuthorizedRequestInterceptor(_axiosClient)
createAuthRefreshInterceptor(_axiosClient, () => refreshAccessToken(axiosParams))

export const axiosClient = _axiosClient
