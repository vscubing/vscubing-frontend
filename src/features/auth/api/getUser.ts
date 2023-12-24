import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'

type UserData = { username: string; authCompleted: boolean }

async function getUser() {
  try {
    const res = await axiosClient.get<UserData>('accounts/current_user/')
    return res.data
  } catch (err) {
    return null
  }
}

export const USER_QUERY_KEY = 'user'
export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
})
