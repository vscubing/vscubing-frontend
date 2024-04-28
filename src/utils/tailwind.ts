import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import resolveConfig from 'tailwindcss/resolveConfig'
import rawConfig from '@/../tailwind.config.js'

const rawTailwindConfig = rawConfig
export const tailwindConfig = resolveConfig(rawConfig)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function tw(className: string) {
  // NOTE: a wrapper used to trigger Tailwind LSP completion
  return className
}

export const isTouchDevice = matchMedia('(pointer:coarse)').matches

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
type Screen = keyof typeof rawTailwindConfig.theme.screens
type Query = { min?: string; max?: string } | { raw: string }
const screens: Record<Screen, Query> = rawTailwindConfig.theme.screens
