import axios from 'axios'
import { getAccessTokenLS } from './accessToken'

export const axiosClient = axios.create({
  baseURL: `http://${window.location.hostname}:8000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenLS()
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
