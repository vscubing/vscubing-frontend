import { axiosClient } from '..'

const API_ROUTE = 'accounts/google/login/'
export const postLogin = (googleCode: string) =>
  axiosClient.post<{ code: string }, { data: { access: string; refresh: string } }>(API_ROUTE, {
    code: googleCode,
  })
