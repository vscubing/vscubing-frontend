import { accountsCurrentUserRetrieve } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'

type UserData = { username: string | null; authCompleted: boolean } | null

async function getUser(): Promise<UserData> {
  const res = (await accountsCurrentUserRetrieve()) as unknown as { username: string | null; authCompleted: string }
  // TODO: remove this type assertion when the API scheme is fixed
  if (res.authCompleted === 'True') {
    // TODO: remove this 'True' workaround later
    return { username: res.username, authCompleted: true }
  }
  return { username: null, authCompleted: false }
}

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser,
})

export function useUser() {
  return useQuery(userQuery)
}
