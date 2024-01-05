import { USER_QUERY_KEY } from '@/features/auth'
import { type Discipline, type Scramble } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type LeaderboardDTO = {
  results?: LeaderboardResult[]
  totalPages: number
  ownResult?: {
    result: LeaderboardResult
    page: number
    isDisplayedSeparately: boolean
  }
}

export type LeaderboardResult = {
  id: number
  timeMs: number
  created: string
  scramble: Pick<Scramble, 'id' | 'scramble'>
  discipline: { name: Discipline }
  user: { id: number; username: string }
  contest: { contestNumber: number }
  placeNumber: number
}

export const getLeaderboardQuery = ({
  discipline,
  page,
  pageSize,
  isEnabled = true,
}: {
  discipline: Discipline
  page: number
  pageSize: number
  isEnabled: boolean
}) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', discipline, { page, pageSize }],
    queryFn: () => fetchMockLeaderboard(page, pageSize),
    placeholderData: (prev) =>
      prev && {
        totalPages: prev.totalPages,
        ownResult: prev.ownResult,
        results: undefined,
      },
    enabled: isEnabled,
  })

function getCompoundShift(place: number, pageSize: number) {
  let totalShift = 0
  let shift = Math.ceil((place - 1) / pageSize)
  while (shift > 0) {
    totalShift += shift
    shift = Math.floor(shift / pageSize)
  }
  return totalShift
}

async function fetchMockLeaderboard(page: number, pageSize: number): Promise<LeaderboardDTO> {
  let totalRows = MOCK_LEADERBOARD_RESULTS.length
  if (MOCK_OWN_RESULT) {
    totalRows += getCompoundShift(MOCK_LEADERBOARD_RESULTS.length, pageSize)
  }
  const totalPages = Math.ceil(totalRows / pageSize)
  if (page > totalPages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  let ownResultPage: number | undefined
  if (MOCK_OWN_RESULT) {
    let ownResultPlace = MOCK_OWN_RESULT.placeNumber
    ownResultPlace += getCompoundShift(ownResultPlace, pageSize)
    ownResultPage = Math.ceil(ownResultPlace / pageSize)
  }

  let flatShift = 0
  if (ownResultPage) {
    flatShift = page * -1 + 1
    if (page > ownResultPage) {
      flatShift += 1
    }
  }

  const startIndex = (page - 1) * pageSize + flatShift
  let endIndex = page * pageSize + flatShift

  if (MOCK_OWN_RESULT && page !== ownResultPage) {
    endIndex--
  }

  const results = MOCK_LEADERBOARD_RESULTS.slice(startIndex, endIndex)
  let ownResult = undefined
  if (MOCK_OWN_RESULT && ownResultPage) {
    ownResult = {
      result: MOCK_OWN_RESULT,
      page: ownResultPage,
      isDisplayedSeparately: page !== ownResultPage,
    }
  }

  await timeout(500)
  return {
    results,
    totalPages,
    ownResult,
  }
}

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array.from({ length: randomInteger(0, 800) }, (_, i) =>
  getMockResult(i + 1),
)
const withOwnResult = true
const MOCK_OWN_RESULT: LeaderboardResult | undefined = withOwnResult
  ? MOCK_LEADERBOARD_RESULTS[randomInteger(0, MOCK_LEADERBOARD_RESULTS.length - 1)]
  : undefined
if (MOCK_OWN_RESULT) MOCK_OWN_RESULT.user.username = 'ddd'

function getMockResult(placeNumber: number): LeaderboardResult {
  return {
    placeNumber,
    id: Math.random(),
    timeMs: Math.random() * 10000,
    created: '2023-12-31T16:06:09.988921Z',
    scramble: {
      id: 1,
      scramble: 'D B D',
    },
    discipline: {
      name: '3by3',
    },
    user: {
      id: 2,
      username: Math.random().toString(),
    },
    contest: {
      contestNumber: 1,
    },
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
