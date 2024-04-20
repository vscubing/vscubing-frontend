import { USER_QUERY_KEY } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { type Discipline, type Scramble } from '@/types'
import { timeout } from '@/utils'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
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
  contest: { contestSlug: string }
  place: number
}

export const getLeaderboardQuery = ({
  discipline,
  page,
  pageSize,
  enabled = true,
}: {
  discipline: Discipline
  page: number
  pageSize: number
  enabled: boolean
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
    enabled,
  })

export const getLeaderboardInfiniteQuery = ({
  discipline,
  pageSize,
  enabled = true,
}: {
  discipline: Discipline
  pageSize: number
  enabled: boolean
}) => {
  pageSize = Math.floor(pageSize * 2)

  return infiniteQueryOptions({
    queryKey: [USER_QUERY_KEY, 'leaderboard', discipline, pageSize],
    queryFn: ({ pageParam: page }) => fetchMockLeaderboard(page, pageSize),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

async function fetchMockLeaderboard(page: number, pageSize: number): Promise<LeaderboardDTO> {
  const { resultsWithoutOwn, ownResult, ownResultIndex } = await getMockResultsWithoutOwn()
  if (ownResult) {
    pageSize--
  }

  const totalPages = Math.floor(resultsWithoutOwn.filter((result) => result.id !== ownResult?.id).length / pageSize + 1)
  if (page > totalPages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  const pageResults = MOCK_LEADERBOARD_RESULTS.filter((result) => result.id !== ownResult?.id)
    .slice((page - 1) * pageSize, page * pageSize)
    .map((result, index) => {
      return {
        ...result,
        place: (page - 1) * pageSize + index + 1,
      }
    })

  let ownResultData: LeaderboardDTO['ownResult'] | null = null
  if (ownResult) {
    const ownResultPage = Math.floor(ownResultIndex / pageSize + 1)
    let ownResultIndexOnPage: number | undefined = undefined
    if (page === ownResultPage) {
      ownResultIndexOnPage = ownResultIndex % pageSize
      pageResults.splice(ownResultIndexOnPage, 0, ownResult)
    }
    const ownResultGlobalShift = page > ownResultPage ? 1 : 0
    pageResults.forEach((result, index) => {
      result.place += ownResultGlobalShift
      if (ownResultIndexOnPage && index > ownResultIndexOnPage) {
        result.place++
      }
    })

    ownResultData =
      ownResult && ownResultPage
        ? {
            result: ownResult,
            page: ownResultPage,
            isDisplayedSeparately: page !== ownResultPage,
          }
        : null
  }

  await timeout(500)
  return {
    results: pageResults,
    totalPages,
    ownResult: ownResultData,
  }
}

async function getMockResultsWithoutOwn() {
  const user = await queryClient.fetchQuery(userQuery)
  if (!user.username) return { resultsWithoutOwn: MOCK_LEADERBOARD_RESULTS, ownResult: null, ownResultIndex: null }

  const resultsWithoutOwn = MOCK_LEADERBOARD_RESULTS.filter((result) => result.user.username !== user.username)
  const ownResultIndex = MOCK_OWN_RESULT_INDEX
  const ownResult = MOCK_LEADERBOARD_RESULTS[ownResultIndex]
  ownResult.place = ownResultIndex + 1

  ownResult.user.username = user.username
  return {
    resultsWithoutOwn,
    ownResult,
    ownResultIndex,
  }
}

const MOCK_LEADERBOARD_RESULTS: LeaderboardResult[] = Array.from({ length: randomInteger(0, 50) }, getMockResult)
const MOCK_OWN_RESULT_INDEX = randomInteger(0, MOCK_LEADERBOARD_RESULTS.length - 1)

function getMockResult(): LeaderboardResult {
  return {
    place: 0,
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
      contestSlug: '1',
    },
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
