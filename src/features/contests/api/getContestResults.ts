import { type Discipline, type Scramble } from '@/types'
import { queryOptions } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/features/auth'
import { timeout } from '@/utils'

export type ContestResultsDTO = Array<{
  id: number
  avgMs: number | null
  discipline: { name: Discipline }
  user: { username: string }
  solveSet: Array<{
    id: number
    timeMs: number | null
    dnf: boolean
    scramble: Pick<Scramble, 'position'>
    state: 'submitted' | 'changed_to_extra'
  }>
}>

const MOCK_CONTEST_RESULTS = Array(Math.floor(Math.random() * 100))
  .fill(undefined)
  .map(() => getMockSession())

export const contestResultsQuery = (
  contestNumber: number,
  discipline: Discipline,
  startIndex?: number,
  endIndex?: number,
) =>
  queryOptions({
    queryKey: [USER_QUERY_KEY, 'contest-results', contestNumber, discipline, { startIndex, endIndex }],
    queryFn: async () => {
      await timeout(500)
      return MOCK_CONTEST_RESULTS.slice(startIndex, endIndex)
    },
  })

function getMockSession(): ContestResultsDTO[number] {
  return {
    id: Math.random(),
    avgMs: null,
    discipline: {
      name: '3by3',
    },
    user: {
      username: String(Math.random()),
    },
    solveSet: getMockSolveSet(),
  }
}

function getMockSolveSet() {
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

function getMockSolve(position: string): ContestResultsDTO[number]['solveSet'][number] {
  const dnf = Math.random() > 0.2
  return {
    id: Math.random(),
    timeMs: dnf ? Math.random() * 10000 : null,
    dnf,
    state: 'submitted',
    scramble: {
      position: position,
    },
  }
}
