import { type Discipline, type Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import { timeout } from '@/utils'

export type ContestResultsDTO = {
  totalPages: number
  sessions: ContestSessionDTO[]
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
export function getContestQuery({
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
    queryFn: () => getMockContestResults({ page, pageSize }),
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
  await timeout(500)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const totalPages = Math.ceil(MOCK_SESSIONS.length / pageSize)
  return { totalPages, sessions: MOCK_SESSIONS.slice(startIndex, endIndex) }
}

const MOCK_SESSIONS = Array.from({ length: randomInteger(0, 100) }, () => getMockSession())
  .sort((a, b) => {
    if (a.avgMs === null) return Infinity
    if (b.avgMs === null) return -Infinity
    return a.avgMs - b.avgMs
  })
  .map((session, i) => ({ ...session, placeNumber: i + 1 }))

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
