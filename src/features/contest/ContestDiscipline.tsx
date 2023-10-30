import { useContestResults } from '@/api/contests'
import { useCallback, useEffect } from 'react'
import { Discipline } from '@/types'
import { useRequiredParams } from '@/utils/useRequiredParams'
import { SolveContest } from './SolveContest'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useReconstructor } from '../reconstructor'
import { PublishedSessionResults } from './PublishedSessionResults'

export const ContestDiscipline = () => {
  const routeParams = useRequiredParams<{ contestNumber: string; discipline: string }>()

  const contestNumber = Number(routeParams.contestNumber)
  const disciplineName = routeParams.discipline as Discipline // TODO add type guard

  useReconstructorFromSearchParam()
  const { data: results, error } = useContestResults(contestNumber, disciplineName)

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={disciplineName} />
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

  return results.map(({ id, avg_ms, solve_set }) => (
    <PublishedSessionResults key={id} username={'not implemented'} avgMs={avg_ms ?? 0} solves={solve_set} />
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
