import type { Discipline } from '@/types'

export function getApiRoute(contestNumber: number, discipline: Discipline, query = '') {
  return `/contests/solve-contest/${contestNumber}/discipline/${discipline}${query}/`
}
