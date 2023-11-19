export type Scramble = { scramble: string; position: string; extra: boolean; id: number }
export type Discipline = (typeof DISCIPLINES)[number]

const DISCIPLINES = ['3by3'] as const
export const isDiscipline = (str: string): str is Discipline => {
  return DISCIPLINES.includes(str as Discipline)
}
