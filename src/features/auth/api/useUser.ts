import { accountsCurrentUserRetrieve } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: accountsCurrentUserRetrieve,
})

export function useUser() {
  return useQuery(userQuery)
}
