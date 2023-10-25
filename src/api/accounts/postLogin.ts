import { axiosClient } from '../axios'

type RequestBody = { code: string }
type Response = { access: string; refresh: string }

const API_ROUTE = 'accounts/google/login/'
export const postLogin = (googleCode: string) =>
  axiosClient.post<RequestBody, { data: Response }>(API_ROUTE, {
    code: googleCode,
  })
