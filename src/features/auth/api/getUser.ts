import { queryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { USER_QUERY_KEY } from '../userQueryKey'

type UserData =
  | { isAuthed: true; username: string | null; authCompleted: boolean }
  | { isAuthed: false; username: null; authCompleted: null }

async function getUser(): Promise<UserData> {
  // try {
  //   const res = (await accountsCurrentUserRetrieve()) as unknown as { username: string | null; authCompleted: boolean }
  // return { ...res, isAuthed: true }
  // } catch (err) {
  //   if (err instanceof AxiosError && err.response?.status === 401) {
  return { isAuthed: false, username: null, authCompleted: null }
  // TODO: fix when codegen is ready
  // }
  // throw err
  // }
}

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
})

export function useUser() {
  return useQuery(userQuery)
}
