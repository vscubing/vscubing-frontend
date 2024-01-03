import { USER_QUERY_KEY } from '@/features/auth'
import { type Discipline, type Scramble } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type LeaderboardDTO = {
  ownResult: LeaderboardResult | null
  results: LeaderboardResult[]
  totalResults: number
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
  let realPageSize = pageSize
  console.log('leaderboard backend', page, pageSize)
  if (MOCK_OWN_RESULT && MOCK_LEADERBOARD_RESULTS.includes(MOCK_OWN_RESULT)) {
    realPageSize--
  }
  const results = MOCK_LEADERBOARD_RESULTS.slice((page - 1) * realPageSize, page * realPageSize)

  if (MOCK_OWN_RESULT) {
    if (!results.includes(MOCK_OWN_RESULT)) {
      results.unshift(MOCK_OWN_RESULT)
    }
  }

  // const ownResultRow = MOCK_OWN_RESULT ? 1 : 0

  // if ((page - 1) * (pageSize - ownResultRow) - pageSize > MOCK_LEADERBOARD_RESULTS.length) {
  // throw new AxiosError('Too big page', '400', undefined, undefined, { status: 400 } as AxiosResponse)
  // }

  // await timeout(1000)
  return {
    ownResult: MOCK_OWN_RESULT,
    results: MOCK_LEADERBOARD_RESULTS.slice((page - 1) * pageSize, page * pageSize + 1),
    totalResults: MOCK_LEADERBOARD_RESULTS.length,
  }
}

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array.from({ length: 22 }, (_, i) => getMockResult(i + 1))
// const withOwnResult = Math.random() > 0.1
const withOwnResult = true
const MOCK_OWN_RESULT: LeaderboardResult | null = withOwnResult
  ? MOCK_LEADERBOARD_RESULTS[randomInteger(0, MOCK_LEADERBOARD_RESULTS.length)]
  : null
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
