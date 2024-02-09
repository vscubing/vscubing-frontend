import type { Discipline } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type ContestsListDTO = {
  totalPages: number
  contests?: ContestListItemDTO[]
}

export type ContestListItemDTO = {
  id: number
  contestNumber: number
  startDate: string
  endDate: string | null
  isOngoing: boolean
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
    queryFn: () => getMockContests({ page, pageSize }),
    placeholderData: (prev) => prev && { totalPages: prev.totalPages, contests: undefined },
    enabled: isEnabled,
  })
}

async function getMockContests({ page, pageSize }: { page: number; pageSize: number }): Promise<ContestsListDTO> {
  const totalPages = Math.ceil(MOCK_CONTESTS.length / pageSize)
  if (page > totalPages) {
    throw new AxiosError('Too big page number for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }
  const firstIndex = (page - 1) * pageSize
  await timeout(500)
  return { totalPages, contests: MOCK_CONTESTS.slice(firstIndex, firstIndex + pageSize) }
}

const MOCK_CONTESTS: ContestListItemDTO[] = Array.from({ length: randomInteger(0, 50) }, (_, i) =>
  getMockContest(i + 1),
).reverse()

function getMockContest(contestNumber: number): ContestListItemDTO {
  return {
    id: Math.random(),
    contestNumber,
    startDate: '2023-12-31T16:05:18.595737Z',
    endDate: '2023-12-31T16:29:59Z',
    isOngoing: false,
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
