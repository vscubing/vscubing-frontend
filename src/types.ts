export type Scramble = { scramble: string; position: string; extra: boolean; id: number }
export type Discipline = (typeof DISCIPLINES)[number]

export const DEFAULT_DISCIPLINE: Discipline = '3by3'
const DISCIPLINES = ['3by3'] as const
export function isDiscipline(str: string): str is Discipline {
  return DISCIPLINES.includes(str as Discipline)
}
export function castDiscipline(str: string): Discipline {
  return isDiscipline(str) ? str : DEFAULT_DISCIPLINE
}
