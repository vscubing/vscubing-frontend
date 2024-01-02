import { type Discipline, type Scramble } from '@/types'
import { timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'

export type LeaderboardDTO = {
  ownResult: LeaderboardResult | null
  results: LeaderboardResult[]
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

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array(randomInteger(0, 50))
  .fill(undefined)
  .map((_, i) => getMockResult(i + 1))
const withOwnSolve = Math.random() > 0.1
const MOCK_OWN_RESULT: LeaderboardResult | null = withOwnSolve
  ? MOCK_LEADERBOARD_RESULTS[randomInteger(0, MOCK_LEADERBOARD_RESULTS.length)]
  : null

export const getLeaderboardQuery = (discipline: Discipline, startIndex: number, endIndex: number) =>
  queryOptions({
    queryKey: ['leaderboard', discipline, startIndex, endIndex],
    queryFn: async () => {
      await timeout(500)
      return {
        ownResult: MOCK_OWN_RESULT,
        results: MOCK_LEADERBOARD_RESULTS.slice(startIndex, endIndex),
      } satisfies LeaderboardDTO
    },
  })

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
