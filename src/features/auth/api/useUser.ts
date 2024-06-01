import { type User, getUser } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: getUser as () => Promise<User & { authCompleted: boolean }>, // TODO: fix after api schema is updated
})

export function useUser() {
  return useQuery(userQuery)
}
