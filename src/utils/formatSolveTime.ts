export const SECOND_IN_MS = 1000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS

const getSeconds = (ms: number): number => Math.floor(ms / SECOND_IN_MS)
const getMinutes = (ms: number): number => Math.floor(ms / MINUTE_IN_MS)

export function formatSolveTime(ms: number, omitMinutesIfPossible = false): string {
  const fullSeconds = getSeconds(ms)
  const minutes = getMinutes(ms)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS

  const msString = (ms ?? 0).toString().slice(-3).padStart(3, '0')
  const secondsString = seconds.toString().padStart(2, '0')
  const minutesString = minutes.toString().padStart(2, '0')

  if (omitMinutesIfPossible && !seconds) return `${secondsString}.${msString}`
  return `${minutesString}:${secondsString}.${msString}`
}
