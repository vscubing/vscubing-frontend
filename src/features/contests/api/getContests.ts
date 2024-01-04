import type { Discipline } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type ContestsListDTO = {
  totalPages: number
  contests: {
    id: number
    contestNumber: number
    start: string
    end: string | null
    ongoing: boolean
  }[]
}

export function getContestsQuery({
  discipline,
  page,
  pageSize,
  isEnabled,
}: {
  discipline: Discipline
  page: number
  pageSize: number
  isEnabled: boolean
}) {
  return queryOptions({
    queryKey: ['contests-list', discipline, page, pageSize],
    queryFn: async () => {
      await timeout(500)
      return getMockContests({ page, pageSize })
    },
    enabled: isEnabled,
  })
}

function getMockContests({ page, pageSize }: { page: number; pageSize: number }): ContestsListDTO {
  const totalPages = Math.ceil(MOCK_CONTESTS.length / pageSize)
  if (page > totalPages) {
    throw new AxiosError('Too big page number for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }
  const firstIndex = (page - 1) * pageSize
  return { totalPages, contests: MOCK_CONTESTS.slice(firstIndex, firstIndex + pageSize) }
}

const MOCK_CONTESTS: ContestsListDTO['contests'] = Array.from({ length: randomInteger(0, 50) }, (_, i) =>
  getMockContest(i + 1),
).reverse()

function getMockContest(contestNumber: number): ContestsListDTO['contests'][number] {
  return {
    id: Math.random(),
    contestNumber,
    start: '2023-12-31T16:05:18.595737Z',
    end: '2023-12-31T16:29:59Z',
    ongoing: false,
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
