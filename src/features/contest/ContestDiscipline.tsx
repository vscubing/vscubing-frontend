import { useContestResults } from '@/api/contests'
import { useCallback, useEffect } from 'react'
import { Discipline } from '@/types'
import { SolveContest } from './SolveContest'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useReconstructor } from '../reconstructor'
import { useRequiredParams } from '@/utils'
import { PublishedSession } from './PublishedSession'

export const ContestDiscipline = () => {
  const routeParams = useRequiredParams<{ contestNumber: string; discipline: string }>()

  const contestNumber = Number(routeParams.contestNumber)
  const disciplineName = routeParams.discipline as Discipline // TODO add type guard

  useReconstructorFromSearchParam()
  const { data: sessions, error } = useContestResults(contestNumber, disciplineName)

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={disciplineName} />
  }

  if (error?.response.status === 401) {
    return "unauthorized, can't solve"
  }

  if (error) {
    return 'unknown error'
  }

  if (!sessions) {
    return 'loading...'
  }

  return sessions.map((session) => <PublishedSession key={session.id} {...session} />)
}

const useReconstructorFromSearchParam = () => {
  const { showReconstruction, closeReconstruction } = useReconstructor()
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
    if (!openedSolveId) {
      closeReconstruction()
      return
    }
    showReconstruction(openedSolveId, deleteParam)
  }, [searchParams, deleteParam, showReconstruction, closeReconstruction])
}

export const useNavigateToSolve = () => {
  const navigate = useNavigate()
  const navigateToSolve = (solveId: number) => navigate(`?solveId=${solveId}`)
  return { navigateToSolve }
}
