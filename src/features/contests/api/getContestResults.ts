import { type Discipline, type Scramble } from '@/types'
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY, userQuery } from '@/features/auth'
import { getOwnResultPage, getPageStartEndIndexes, getTotalPages, timeout } from '@/utils'
import { AxiosError, type AxiosResponse } from 'axios'
import { queryClient } from '@/lib/reactQuery'
import { axiosClient } from '@/lib/axios'
import { ongoingSlugQuery } from '@/shared/contests'
import {
  type ContestsContestsLeaderboardRetrieveParams,
  contestsContestsLeaderboardRetrieve,
  type ContestsRoundSessionWithSolvesListOutput,
} from '@/api'

// TODO: remove type hacks after API is fixed (ownResult should be nullable and all the fieds of ownResult should be required)

export type _ContestResultsDTO = {
  pages: number
  sessions: _ContestSessionDTO[] | null
  ownSession: {
    session: _ContestSessionDTO
    page: number
    isDisplayedSeparately: boolean
  } | null
}

export type _ContestSessionDTO = {
  id: number
  avgMs: number | null
  discipline: { name: Discipline }
  user: { username: string }
  place: number
  solves: Array<{
    id: number
    timeMs: number | null
    dnf: boolean
    scramble: Pick<Scramble, 'position'>
    state: 'submitted' | 'changed_to_extra'
  }>
}

export function getContestQueryKey({ contestSlug, disciplineSlug }: { contestSlug: string; disciplineSlug: string }) {
  return [USER_QUERY_KEY, 'contest-results', contestSlug, disciplineSlug]
}

export type ContestResultsDTO = Omit<ContestsRoundSessionWithSolvesListOutput['results'], 'ownResult'> & {
  ownResult: {
    isDisplayedSeparately: boolean
    page: number
    place: number
    roundSession: NonNullable<ContestsRoundSessionWithSolvesListOutput['results']['ownResult']['roundSession']>
  } | null
}
export type ContestSession = ContestResultsDTO['roundSessionSet'][0]

type ContestResultsPatched = Omit<ContestsRoundSessionWithSolvesListOutput, 'results'> & { results: ContestResultsDTO }
async function getContestResultsPatched(
  params: ContestsContestsLeaderboardRetrieveParams,
): Promise<ContestResultsPatched> {
  const res = await contestsContestsLeaderboardRetrieve(params)

  return {
    ...res,
    results: {
      ownResult: res.results.ownResult.roundSession ? res.results.ownResult : null,
      roundSessionSet: res.results.roundSessionSet,
    } as ContestResultsDTO,
  }
}

type ContestResultsParams = ContestsContestsLeaderboardRetrieveParams & {
  enabled?: boolean
}
export function getContestResultsQuery({ contestSlug, disciplineSlug, page, pageSize, enabled }: ContestResultsParams) {
  return queryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, disciplineSlug }), { page, pageSize }],
    queryFn: () => getContestResultsPatched({ contestSlug, disciplineSlug, page, pageSize }),
    placeholderData: (prev) => prev,
    enabled,
  })
}

export function _getContestResultsQuery({
  contestSlug,
  discipline,
  page,
  pageSize,
  enabled,
}: {
  contestSlug: string
  discipline: Discipline
  page: number
  pageSize: number
  enabled: boolean
}) {
  return queryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, disciplineSlug: discipline }), page, pageSize],
    queryFn: async () => {
      const ongoing = await queryClient.fetchQuery(ongoingSlugQuery)
      if (contestSlug === ongoing) {
        try {
          await axiosClient.get(`/contests/contest/${contestSlug}/discipline/${discipline}/`)
        } catch (e) {
          if (e instanceof AxiosError && (e?.response?.status === 403 || e?.response?.status === 401)) {
            throw e
          }
        }
      }
      return getMockContestResults({ page, pageSize })
    },
    placeholderData: (prev) =>
      prev && {
        pages: prev.pages,
        sessions: null,
        ownSession: prev.ownSession,
      },
    enabled,
  })
}

export function _getContestResultsInfiniteQuery({
  contestSlug,
  discipline,
  pageSize,
  enabled,
}: {
  contestSlug: string
  discipline: Discipline
  pageSize: number
  enabled: boolean
}) {
  pageSize = Math.floor(pageSize * 2)

  return infiniteQueryOptions({
    queryKey: [...getContestQueryKey({ contestSlug, disciplineSlug: discipline }), pageSize],
    queryFn: ({ pageParam: page }) => getMockContestResults({ page, pageSize }),
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
    enabled,
  })
}

async function getMockContestResults({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}): Promise<_ContestResultsDTO> {
  const { allSessions, ownSession } = await getMockSessionsWithOwn()

  const pages = getTotalPages(!!ownSession, allSessions.length, pageSize)
  if (page > pages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  const ownSessionPage = getOwnResultPage(ownSession?.place, pageSize)

  const { startIndex, endIndex } = getPageStartEndIndexes(page, pageSize, ownSessionPage)

  const sessions = MOCK_SESSIONS.slice(startIndex, endIndex)
  const ownSessionData =
    ownSession && ownSessionPage
      ? {
          session: ownSession,
          page: ownSessionPage,
          isDisplayedSeparately: page !== ownSessionPage,
        }
      : null

  await timeout(500)
  return {
    sessions,
    pages,
    ownSession: ownSessionData,
  }
}

async function getMockSessionsWithOwn() {
  const user = await queryClient.fetchQuery(userQuery)
  if (!user.username) return { allSessions: MOCK_SESSIONS, ownResult: null }

  const ownSession = MOCK_SESSIONS[MOCK_OWN_INDEX]
  ownSession.user.username = user.username
  return { allSessions: MOCK_SESSIONS, ownSession }
}

const MOCK_SESSIONS = Array.from({ length: 100 }, () => getMockSession())
  .sort((a, b) => {
    if (a.avgMs === null) return Infinity
    if (b.avgMs === null) return -Infinity
    return a.avgMs - b.avgMs
  })
  .map((session, i) => ({ ...session, place: i + 1 }))
const MOCK_OWN_INDEX = randomInteger(0, MOCK_SESSIONS.length - 1)

function getMockSession(): Omit<_ContestSessionDTO, 'place'> {
  const solves = getMockSolves()
  return {
    id: Math.random(),
    avgMs: getAverage(solves),
    discipline: {
      name: '3by3',
    },
    user: {
      username: String(Math.random()),
    },
    solves,
  }
}

function getAverage(solves: _ContestSessionDTO['solves']): number | null {
  const countingSolves = [...solves]
    .sort((a, b) => {
      if (a.timeMs === null) return Infinity
      if (b.timeMs === null) return -Infinity
      return a.timeMs - b.timeMs
    })
    .slice(1, 4)
  if (countingSolves.some(({ timeMs }) => timeMs === null)) return null
  return countingSolves.reduce((acc, { timeMs }) => acc + timeMs!, 0) / countingSolves.length
}

function getMockSolves(): _ContestSessionDTO['solves'] {
  let firstExtraIndex = Math.floor(Math.random() * 10)
  let secondExtraIndex = Math.floor(Math.random() * 10)
  if (firstExtraIndex > secondExtraIndex) {
    ;[firstExtraIndex, secondExtraIndex] = [secondExtraIndex, firstExtraIndex] // eslint-disable-line
  }
  const positions = Array(5)
    .fill(undefined)
    .map((_, index) => {
      if (index === firstExtraIndex) return 'E1'
      if (index === secondExtraIndex) return 'E2'
      return String(index + 1)
    })
  return positions.map((position) => getMockSolve(position))
}

function getMockSolve(position: string): _ContestSessionDTO['solves'][number] {
  const dnf = Math.random() > 0.9
  return {
    id: Math.random(),
    timeMs: dnf ? null : randomInteger(4730, 50000),
    dnf,
    state: 'submitted',
    scramble: {
      position: position,
    },
  }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
