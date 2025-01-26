import { queryClient } from '@/lib/reactQuery'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '../auth'
import {
  type AccountsSettingsUpdateOutput,
  accountsSettingsRetrieveRetrieve,
  accountsSettingsUpdateCreate,
} from '@/api'
import { useEffect } from 'react'

const SETTINGS_QUERY_KEY = 'settings'

export type Settings = AccountsSettingsUpdateOutput

const settingsQuery = queryOptions({
  queryKey: [USER_QUERY_KEY, SETTINGS_QUERY_KEY],
  queryFn: accountsSettingsRetrieveRetrieve,
})

export function useSettings() {
  const query = useQuery(settingsQuery)
  useLegacySettingsPatch(query.data)
  return query
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

function useLegacySettingsPatch(settings?: Settings) {
  const { mutate: mutateSettings } = useMutateSettings()

  useEffect(() => {
    const LEGACY_ANIMATION_DURATION_LS_KEY = 'vs-vrc-speed'
    const legacyCsAnimationDuration = localStorage.getItem(LEGACY_ANIMATION_DURATION_LS_KEY)
    if (legacyCsAnimationDuration !== null && settings) {
      mutateSettings({ cstimerAnimationDuration: Number(legacyCsAnimationDuration) })
      localStorage.removeItem(LEGACY_ANIMATION_DURATION_LS_KEY)
    }
  }, [settings, mutateSettings])
}
