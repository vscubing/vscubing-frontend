import { axiosClient } from '../axios'

const API_ROUTE = 'accounts/change_username/'
export const putChangeUsername = (username: string) =>
  axiosClient.put(API_ROUTE, {
    username,
  })
