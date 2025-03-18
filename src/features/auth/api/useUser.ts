import { accountsCurrentUserRetrieve } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../userQueryKey'
import { getAuthTokens } from '@/utils'
import * as Sentry from '@sentry/react'

export const userQuery = queryOptions({
  queryKey: [USER_QUERY_KEY],
  queryFn: async () => {
    if (!getAuthTokens()) return null
    const user = await accountsCurrentUserRetrieve()
    Sentry.setUser({ username: user.username })
    return user
  },
})

export function useUser() {
  return useQuery(userQuery)
}
