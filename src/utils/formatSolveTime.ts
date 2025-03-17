export const SECOND_IN_MS = 1000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS

const getSeconds = (ms: number): number => Math.floor(ms / SECOND_IN_MS)
const getMinutes = (ms: number): number => Math.floor(ms / MINUTE_IN_MS)

export function formatSolveTime(ms: number): string {
  const fullSeconds = getSeconds(ms)
  const minutes = getMinutes(ms)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS

  let msString = ms ? ms.toString().slice(-3) : '00'
  let secondsString = seconds.toString()
  let minutesString = minutes.toString()

  // TODO: padding
  if (msString.length === 1) {
    msString = '0' + msString
  }
  if (secondsString.length === 1) {
    secondsString = '0' + secondsString
  }
  if (minutesString.length === 1) {
    minutesString = '0' + minutesString
  }

  return `${minutesString}:${secondsString}.${msString}`
}
