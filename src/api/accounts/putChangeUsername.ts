import { axiosClient } from '../axios'

const API_ROUTE = 'accounts/change_username/'
export function putChangeUsername(username: string) {
  return axiosClient.put(API_ROUTE, {
    username,
  })
}
