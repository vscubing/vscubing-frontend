import { useContestResults } from '@/api/contests'
import { groupBy } from '@/utils'
import { useCallback, useEffect, useMemo } from 'react'
import { Discipline } from '@/types'
import { useRequiredParams } from '@/utils/useRequiredParams'
import { ContestantResults } from './ContestantResults'
import { SolveContest } from './SolveContest'
import { useNavigate } from 'react-router-dom'
import { useReconstructor } from '../reconstructor'

export const ContestDiscipline = () => {
  const routeParams = useRequiredParams<{ contestNumber: string; discipline: string }>()

  const contestNumber = Number(routeParams.contestNumber)
  const discipline = routeParams.discipline as Discipline

  useReconstructorFromSearchParam()
  const { data: results, error } = useContestResults(contestNumber, discipline)
  const grouppedResults = useMemo(() => results && groupBy(results, (attempt) => attempt.username), [results])

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={discipline} />
  }

  if (error?.response.status === 401) {
    return "unauthorized, can't solve"
  }

  if (error) {
    return 'unknown error'
  }

  if (!grouppedResults) {
    return 'loading...'
  }

  return Object.entries(grouppedResults).map(([username, solves]) => (
    <ContestantResults key={username} username={username} solves={solves} />
  ))
}

const useReconstructorFromSearchParam = () => {
  const { showReconstruction } = useReconstructor()
  const [searchParams, setSearchParams] = useSearchParams()

  const deleteParam = useCallback(
    () =>
      setSearchParams((params) => {
        params.delete('solveId')
        return params
      }),
    [setSearchParams],
  )

  useEffect(() => {
    const openedSolveId = Number(searchParams.get('solveId'))
    if (openedSolveId) {
      showReconstruction(openedSolveId, deleteParam)
    }
  }, [searchParams, showReconstruction, deleteParam])
}

export const useNavigateToSolve = () => {
  const navigate = useNavigate()
  const navigateToSolve = (solveId: number) => navigate(`?solveId=${solveId}`)
  return { navigateToSolve }
}
