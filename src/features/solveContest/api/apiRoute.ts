import type { Discipline } from '@/types'

export function getApiRoute(contestNumber: number, discipline: Discipline) {
  return `/contests/solve-contest/${contestNumber}/discipline/${discipline}`
}
