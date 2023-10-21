import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `http://${window.location.hostname}:8000/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
