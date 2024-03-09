import { rawTailwindConfig } from './tailwindConfig'

export const isTouchDevice = matchMedia('(pointer:coarse)').matches

type Screen = keyof typeof rawTailwindConfig.theme.extend.screens
type Query = { min?: string; max?: string } | { raw: string }
const screens: Record<Screen, Query> = rawTailwindConfig.theme.extend.screens
// WARNING: double check if it works before using
export function matchesQuery(name: keyof typeof screens) {
  const data = screens[name]
  if ('raw' in data) {
    return matchMedia(data.raw).matches
  }

  const query: string[] = []
  if ('min' in data) {
    query.push(`(min-width: ${data.min})`)
  }
  if ('max' in data) {
    query.push(`(max-width: ${data.max})`)
  }
  const queryString = query.join(' and ')

  return matchMedia(queryString).matches
}
