import { z } from 'zod'
import { type ContestsContestListOutput } from './api'

export type Scramble = { scramble: string; position: string; extra: boolean; id: number }
export type Discipline = (typeof DISCIPLINES)[number]

/**
 * @deprecated ContestDTO should be used instead
 */
export type ContestInfo = { id: number; contestSlug: string; start: string; end: string }

export type ContestDTO = ContestsContestListOutput['results'][number]
export type ContestList = ContestsContestListOutput

export const DEFAULT_DISCIPLINE: Discipline = '3by3'
export const DISCIPLINES = ['3by3'] as const
export function isDiscipline(str: string): str is Discipline {
  return z.enum(DISCIPLINES).safeParse(str).success
}
export function castDiscipline(str?: string): Discipline {
  return z.enum(DISCIPLINES).catch(DEFAULT_DISCIPLINE).parse(str)
}
