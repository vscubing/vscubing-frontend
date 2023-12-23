import { queryOptions } from '@tanstack/react-query'
import { axiosClient } from '../axios'

const API_ROUTE = 'accounts/current_user/'
type UserData = { username: string; authCompleted: boolean }

async function fetchUser() {
  try {
    const res = await axiosClient.get<UserData>(API_ROUTE)
    return res.data
  } catch (err) {
    return null
  }
}

export const USER_QUERY_KEY = 'user'
export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: fetchUser,
})
