import { type Discipline, type Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY, userQuery } from '@/features/auth'
import { getOwnResultPage, getPageStartEndIndexes, getTotalPages, timeout } from '@/utils'
import { AxiosError, type AxiosResponse } from 'axios'
import { queryClient } from '@/lib/reactQuery'
import { ongoingContestNumberQuery } from './getOngoingContestNumber'
import { axiosClient } from '@/lib/axios'

export type ContestResultsDTO = {
  totalPages: number
  sessions: ContestSessionDTO[] | null
  ownSession: {
    session: ContestSessionDTO
    page: number
    isDisplayedSeparately: boolean
  } | null
}

export type ContestSessionDTO = {
  id: number
  avgMs: number | null
  discipline: { name: Discipline }
  user: { username: string }
  placeNumber: number
  solveSet: Array<{
    id: number
    timeMs: number | null
    dnf: boolean
    scramble: Pick<Scramble, 'position'>
    state: 'submitted' | 'changed_to_extra'
  }>
}

export function getContestQueryKey({ contestNumber, discipline }: { contestNumber: number; discipline: Discipline }) {
  return [USER_QUERY_KEY, 'contest-results', contestNumber, discipline]
}
export function getContestResultsQuery({
  contestNumber,
  discipline,
  page,
  pageSize,
  isEnabled = true,
}: {
  contestNumber: number
  discipline: Discipline
  page: number
  pageSize: number
  isEnabled: boolean
}) {
  return queryOptions({
    queryKey: [...getContestQueryKey({ contestNumber, discipline }), page, pageSize],
    queryFn: async () => {
      const ongoing = await queryClient.fetchQuery(ongoingContestNumberQuery)
      if (contestNumber === ongoing) {
        try {
          await axiosClient.get(`/contests/contest/${contestNumber}/discipline/${discipline}/`)
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
        totalPages: prev.totalPages,
        sessions: null,
        ownSession: prev.ownSession,
      },
    enabled: isEnabled,
  })
}

async function getMockContestResults({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}): Promise<ContestResultsDTO> {
  const { allSessions, ownSession } = await getMockSessionsWithOwn()

  const totalPages = getTotalPages(!!ownSession, allSessions.length, pageSize)
  if (page > totalPages) {
    throw new AxiosError('Page number is too big for this pageSize', undefined, undefined, undefined, {
      status: 400,
    } as AxiosResponse)
  }

  const ownSessionPage = getOwnResultPage(ownSession?.placeNumber, pageSize)

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
    totalPages,
    ownSession: ownSessionData,
  }
}

async function getMockSessionsWithOwn() {
  const user = await queryClient.fetchQuery(userQuery)
  if (!user) return { allSessions: MOCK_SESSIONS, ownResult: null }

  const ownSession = MOCK_SESSIONS[MOCK_OWN_INDEX]
  ownSession.user.username = user.username
  return { allSessions: MOCK_SESSIONS, ownSession }
}

const MOCK_SESSIONS = Array.from({ length: randomInteger(0, 100) }, () => getMockSession())
  .sort((a, b) => {
    if (a.avgMs === null) return Infinity
    if (b.avgMs === null) return -Infinity
    return a.avgMs - b.avgMs
  })
  .map((session, i) => ({ ...session, placeNumber: i + 1 }))
const MOCK_OWN_INDEX = randomInteger(0, MOCK_SESSIONS.length - 1)

function getMockSession(): Omit<ContestSessionDTO, 'placeNumber'> {
  const solveSet = getMockSolveSet()
  return {
    id: Math.random(),
    avgMs: getAverage(solveSet),
    discipline: {
      name: '3by3',
    },
    user: {
      username: String(Math.random()),
    },
    solveSet,
  }
}

function getAverage(solveSet: ContestSessionDTO['solveSet']): number | null {
  const countingSolves = [...solveSet]
    .sort((a, b) => {
      if (a.timeMs === null) return Infinity
      if (b.timeMs === null) return -Infinity
      return a.timeMs - b.timeMs
    })
    .slice(1, 4)
  if (countingSolves.some(({ timeMs }) => timeMs === null)) return null
  return countingSolves.reduce((acc, { timeMs }) => acc + timeMs!, 0) / countingSolves.length
}

function getMockSolveSet(): ContestSessionDTO['solveSet'] {
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

function getMockSolve(position: string): ContestSessionDTO['solveSet'][number] {
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
