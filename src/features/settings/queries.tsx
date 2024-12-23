import { queryClient } from '@/lib/reactQuery'
import { useMutation, useQuery } from '@tanstack/react-query'

const SETTINGS_QUERY_KEY = 'settings'
const SETTINGS_LS_KEY = 'vs-settings'

type Settings = { animationDuration?: number }
export function useSettings() {
  return useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: getSettings,
  })
}

function getSettings(): Settings {
  const settings = localStorage.getItem(SETTINGS_LS_KEY)
  if (!settings) return {}
  return JSON.parse(settings)
}

export function useMutateSettings() {
  return useMutation({
    mutationFn: async (newSettings: Partial<Settings>) => {
      const oldSettings = getSettings()
      localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify({ ...oldSettings, ...newSettings }))
      queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] })
    },
  })
}
