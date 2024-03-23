import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'
import { AxiosError } from 'axios'

type UserData =
  | { isAuthed: true; username: string | null; authCompleted: boolean }
  | { isAuthed: false; username: null; authCompleted: null }

async function getUser(): Promise<UserData> {
  try {
    const res = await axiosClient.get<{ username: string | null; authCompleted: boolean }>('accounts/current-user/')
    return { ...res.data, isAuthed: true }
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 401) {
      return { isAuthed: false, username: null, authCompleted: null }
    }
    throw err
  }
}

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
})
