import dayjs from 'dayjs'

export function formatDate(date: string, size: 'short' | 'long' = 'short') {
  const format = size === 'short' ? 'DD.MM.YYYY' : 'DD MMM YYYY'
  return dayjs(date).format(format)
}
