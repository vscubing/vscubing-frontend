import { USER_QUERY_KEY, userQuery } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline, type Scramble } from '@/types'
import { getOwnResultPage, getPageStartEndIndexes, getTotalPages, timeout } from '@/utils'
import { queryOptions } from '@tanstack/react-query'
import { AxiosError, type AxiosResponse } from 'axios'

export type LeaderboardDTO = {
  totalPages: number
  results: LeaderboardResult[] | null
  ownResult: {
    result: LeaderboardResult
    page: number
    isDisplayedSeparately: boolean
  } | null
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
    queryKey: [USER_QUERY_KEY, 'leaderboard', discipline, page, pageSize],
    queryFn: () => fetchMockLeaderboard(page, pageSize),
    placeholderData: (prev) =>
      prev && {
        totalPages: prev.totalPages,
        ownResult: prev.ownResult,
        results: null,
      },
    enabled: isEnabled,
  })

async function fetchMockLeaderboard(page: number, pageSize: number): Promise<LeaderboardDTO> {
  const { allResults, ownResult } = await getMockResultsWithOwn()

  const totalPages = getTotalPages(!!ownResult, allResults.length, pageSize)
  if (page > totalPages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  const ownResultPage = getOwnResultPage(ownResult?.placeNumber, pageSize)

  const { startIndex, endIndex } = getPageStartEndIndexes(page, pageSize, ownResultPage)

  const pageResults = MOCK_LEADERBOARD_RESULTS.slice(startIndex, endIndex)
  const ownResultData =
    ownResult && ownResultPage
      ? {
          result: ownResult,
          page: ownResultPage,
          isDisplayedSeparately: page !== ownResultPage,
        }
      : null

  await timeout(500)
  return {
    results: pageResults,
    totalPages,
    ownResult: ownResultData,
  }
}

async function getMockResultsWithOwn() {
  const user = await queryClient.fetchQuery(userQuery)
  if (!user) return { allResults: MOCK_LEADERBOARD_RESULTS, ownResult: null }

  const ownResult = MOCK_LEADERBOARD_RESULTS[MOCK_OWN_RESULT_INDEX]
  ownResult.user.username = user.username
  return { allResults: MOCK_LEADERBOARD_RESULTS, ownResult }
}

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array.from({ length: randomInteger(0, 800) }, (_, i) =>
  getMockResult(i + 1),
)
const MOCK_OWN_RESULT_INDEX = randomInteger(0, MOCK_LEADERBOARD_RESULTS.length - 1)

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
