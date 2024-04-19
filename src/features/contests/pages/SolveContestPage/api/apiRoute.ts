import type { Discipline } from '@/types'

export function getApiRoute(contestSlug: string, discipline: Discipline, query = '') {
  return `/contests/solve-contest/${contestSlug}/discipline/${discipline}/${query}`
}
