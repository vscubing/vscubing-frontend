import { useContestResults } from '@/api/contests'
import { groupBy } from '@/utils'
import { useMemo } from 'react'
import { SolveContest, ContestResult } from '.'
import { Discipline } from '@/types'
import { useRequiredParams } from '@/utils/useRequiredParams'

export const ContestDiscipline = () => {
  const routeParams = useRequiredParams<{ contestNumber: string; discipline: string }>()

  const contestNumber = Number(routeParams.contestNumber)
  const discipline = routeParams.discipline as Discipline

  const { data: results, error } = useContestResults(contestNumber, discipline)
  const grouppedResults = useMemo(() => groupBy(results ?? [], (attempt) => attempt.username), [results])

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={discipline} />
  }

  if (error?.response.status === 401) {
    return "unauthorized, can't solve"
  }

  if (error) {
    return 'unknown error'
  }

  if (!results) {
    return 'loading...'
  }

  return Object.entries(grouppedResults).map(([username, solves]) => (
    <ContestResult key={username} username={username} solves={solves} />
  ))
}
