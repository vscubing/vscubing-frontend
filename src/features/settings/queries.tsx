import { queryClient } from '@/lib/reactQuery'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../auth'
import {
  type AccountsSettingsUpdateOutput,
  accountsSettingsRetrieveRetrieve,
  accountsSettingsUpdateCreate,
} from '@/api'

const SETTINGS_QUERY_KEY = 'settings'

export type Settings = AccountsSettingsUpdateOutput

const settingsQuery = queryOptions({
  queryKey: [USER_QUERY_KEY, SETTINGS_QUERY_KEY],
  queryFn: accountsSettingsRetrieveRetrieve,
})

export function useSettings() {
  return useQuery(settingsQuery)
}

export function useMutateSettings() {
  return useMutation({
    mutationFn: accountsSettingsUpdateCreate,
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries(settingsQuery)
      const oldSettings = queryClient.getQueryData(settingsQuery.queryKey)
      queryClient.setQueryData(settingsQuery.queryKey, (old) => old && { ...old, ...newSettings })
      return { oldSettings }
    },
    onError: (_, _1, context) => {
      queryClient.setQueryData(settingsQuery.queryKey, context?.oldSettings)
    },
    onSettled: () => {
      void queryClient.invalidateQueries(settingsQuery)
    },
  })
}
