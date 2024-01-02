import type { Discipline } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'

export type ContestDTO = {
  id: number
  contestNumber: number
  start: string
  end: string | null
  ongoing: boolean
}

const MOCK_CONTESTS: ContestDTO[] = Array(Math.floor(Math.random() * 100))
  .fill(undefined)
  .map(() => getMockContest())

export function getContestsQuery(discipline: Discipline, startIndex: number, endIndex: number) {
  return queryOptions({
    queryKey: ['contests-list', discipline, startIndex, endIndex],
    queryFn: async () => {
      await timeout(500)
      return MOCK_CONTESTS.slice(startIndex, endIndex)
    },
  })
}

function getMockContest(): ContestDTO {
  return {
    id: Math.random(),
    contestNumber: Math.floor(Math.random() * 100),
    start: '2023-12-31T16:05:18.595737Z',
    end: '2023-12-31T16:29:59Z',
    ongoing: false,
  }
}
