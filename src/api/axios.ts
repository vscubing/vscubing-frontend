import axios from 'axios'
import { LS_ACCESS_TOKEN } from './accessToken'
import { refreshAccessToken } from '.'

const axiosClient = axios.create({
  baseURL: `http://${window.location.hostname}:8000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessToken()
      return axiosClient(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default axiosClient
