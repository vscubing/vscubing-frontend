import { accountsCurrentUserRetrieve } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'
import { getAuthTokens } from '@/utils'

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: () => {
    if (!getAuthTokens()) return null
    return accountsCurrentUserRetrieve()
  },
})

export function useUser() {
  return useQuery(userQuery)
}
