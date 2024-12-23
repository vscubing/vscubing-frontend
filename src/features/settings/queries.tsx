import { queryClient } from '@/lib/reactQuery'
import { useMutation, useQuery } from '@tanstack/react-query'

const SETTINGS_QUERY_KEY = 'settings'
const SETTINGS_LS_KEY = 'vs-settings'

export type Settings = { csAnimationDuration: number }
export function useSettings() {
  return useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: getSettings,
  })
}

export function useMutateSettings() {
  return useMutation({
    mutationFn: async (updatedSettings: Partial<Settings>) => {
      patchSettings(updatedSettings)
      queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] })
    },
  })
}

function getSettings(): Settings {
  const settings = localStorage.getItem(SETTINGS_LS_KEY)
  if (!settings) return { csAnimationDuration: 100 }
  return JSON.parse(settings)
}

function patchSettings(patchedSettings: Partial<Settings>) {
  const oldSettings = getSettings()
  localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify({ ...oldSettings, ...patchedSettings }))
}

const LEGACY_ANIMATION_DURATION_LS_KEY = 'vs-vrc-speed'
const legacyCsAnimationDuration = localStorage.getItem(LEGACY_ANIMATION_DURATION_LS_KEY)
console.log(legacyCsAnimationDuration)
if (legacyCsAnimationDuration !== null) {
  patchSettings({ csAnimationDuration: Number(legacyCsAnimationDuration) })
  localStorage.removeItem(LEGACY_ANIMATION_DURATION_LS_KEY)
}
