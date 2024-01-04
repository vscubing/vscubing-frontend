import { USER_QUERY_KEY } from '@/features/auth'
import { type Discipline, type Scramble } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type LeaderboardDTO = {
  results: LeaderboardResult[]
  totalPages: number
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
    queryFn: () => {
      return fetchMockLeaderboard(page, pageSize)
    },
    retry(_, error) {
      if (error.response?.status === 400) return false
      return true
    },
    enabled: isEnabled,
  })

async function fetchMockLeaderboard(page: number, pageSize: number): Promise<LeaderboardDTO> {
  let totalRows = MOCK_LEADERBOARD_RESULTS.length
  if (MOCK_OWN_RESULT) {
    totalRows += Math.ceil((totalRows - pageSize) / pageSize)
  }
  const totalPages = Math.ceil(totalRows / pageSize)
  if (page > totalPages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  let ownResultPage: number | undefined
  if (MOCK_OWN_RESULT) {
    const ownResultPlace = MOCK_OWN_RESULT.placeNumber
    const baseOwnResultPage = Math.ceil(ownResultPlace / pageSize)
    ownResultPage = Math.ceil((ownResultPlace + baseOwnResultPage) / pageSize)
  }

  let ownResultShift = 0
  if (ownResultPage) {
    ownResultShift = page
    if (page >= ownResultPage) {
      ownResultShift--
    }
  }

  const results = MOCK_LEADERBOARD_RESULTS.slice(
    Math.max(0, (page - 1) * pageSize - ownResultShift),
    page * pageSize - ownResultShift,
  )

  if (MOCK_OWN_RESULT && !results.includes(MOCK_OWN_RESULT)) {
    if (page !== 1) {
      results[0] = MOCK_OWN_RESULT
    } else {
      results.unshift(MOCK_OWN_RESULT)
    }
  }

  await timeout(200)
  return {
    results,
    totalPages,
  }
}

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array.from({ length: randomInteger(0, 100) }, (_, i) =>
  getMockResult(i + 1),
)
const withOwnResult = Math.random() > 0.1
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
