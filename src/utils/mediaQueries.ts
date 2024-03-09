import { rawTailwindConfig } from './tailwindConfig'

export const isTouchDevice = matchMedia('(pointer:coarse)').matches

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const screens = rawTailwindConfig.theme.extend.screens as Record<string, { raw?: string; max?: string; min?: string }>

// WARNING: double check if it works before using
export function matchesQuery(name: keyof typeof screens) {
  const data = screens[name]
  if (data?.raw) {
    return matchMedia(data.raw).matches
  }

  const query: string[] = []
  if (data?.min) {
    query.push(`(min-width: ${data.min})`)
  }
  if (data?.max) {
    query.push(`(max-width: ${data.max})`)
  }
  const queryString = query.join(' and ')

  return matchMedia(queryString).matches
}
