import { queryClient } from '@/lib/reactQuery'
import { getAuthTokens } from '@/utils'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { USER_QUERY_KEY } from '../auth'

const SETTINGS_QUERY_KEY = 'settings'
const SETTINGS_LS_KEY = 'vs-settings'

export type Settings = { csAnimationDuration: number; csInspectionVoiceAlert: 'Male' | 'Female' | null }

const settingsQuery = queryOptions({
  queryKey: [USER_QUERY_KEY, SETTINGS_QUERY_KEY],
  queryFn: getSettings,
})

export function useSettings() {
  return useQuery(settingsQuery)
}

export function useMutateSettings() {
  return useMutation({
    mutationFn: patchSettings,
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

// eslint-disable-next-line @typescript-eslint/require-await
async function getSettings(): Promise<Settings> {
  // @ts-expect-error mock backend
  if (!getAuthTokens()) throw new AxiosError('Unauthorized', undefined, undefined, undefined, { status: 401 })
  const settings = localStorage.getItem(SETTINGS_LS_KEY)
  if (!settings) return { csAnimationDuration: 100, csInspectionVoiceAlert: 'Male' }
  return JSON.parse(settings)
}

async function patchSettings(patchedSettings: Partial<Settings>) {
  const oldSettings = await getSettings()
  localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify({ ...oldSettings, ...patchedSettings }))
}

const LEGACY_ANIMATION_DURATION_LS_KEY = 'vs-vrc-speed'
const legacyCsAnimationDuration = localStorage.getItem(LEGACY_ANIMATION_DURATION_LS_KEY)
if (legacyCsAnimationDuration !== null) {
  void patchSettings({ csAnimationDuration: Number(legacyCsAnimationDuration) })
  localStorage.removeItem(LEGACY_ANIMATION_DURATION_LS_KEY)
}
