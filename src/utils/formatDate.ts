import dayjs from 'dayjs'

export function formatDate(string: string) {
  return dayjs(string).format('DD MMM YYYY')
}
