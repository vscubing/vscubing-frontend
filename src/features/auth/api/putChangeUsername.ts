import { axiosClient } from '@/lib/axios'

export function putChangeUsername(username: string) {
  return axiosClient.put('accounts/change-username/', {
    username,
  })
}
