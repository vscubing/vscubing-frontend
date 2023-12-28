import { axiosClient } from '@/lib/axios'

type RequestBody = { code: string }
type Response = { access: string; refresh: string }

export function postLogin(googleCode: string) {
  return axiosClient.post<RequestBody, { data: Response }>('accounts/google/login/', {
    code: googleCode,
  })
}
