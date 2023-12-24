import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../queryKeys'

type UserData = { username: string; authCompleted: boolean }

async function getUser() {
  try {
    const res = await axiosClient.get<UserData>('accounts/current_user/')
    return res.data
  } catch (err) {
    return null
  }
}

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
})
