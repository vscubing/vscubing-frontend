import { ContestResultsResponse, useContestResults } from '@/api/contests'
import { useCallback, useEffect } from 'react'
import { Discipline } from '@/types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRequiredParams } from '@/utils'
import { PublishedSession } from './components/PublishedSession'
import { SolveContest } from './components/SolveContest'
import { InfoBox } from '@/components'
import { useUser } from '@/api/accounts'
import { useReconstructor } from '@/integrations/reconstructor'

export const ContestDiscipline = () => {
  const { userData } = useUser()
  const routeParams = useRequiredParams<{ contestNumber: string; discipline: string }>()

  const contestNumber = Number(routeParams.contestNumber)
  const disciplineName = routeParams.discipline as Discipline // TODO add type guard

  useReconstructorFromSearchParam()
  const { data: sessions, error, isLoading } = useContestResults(contestNumber, disciplineName)

  if (isLoading) {
    return <InfoBox>loading...</InfoBox>
  }

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={disciplineName} />
  }

  if (error?.response.status === 401) {
    return <InfoBox>You need to be signed in to participate in a contest</InfoBox>
  }

  if (error || !sessions) {
    return <InfoBox>An unknown error occured</InfoBox>
  }

  let ownSession: ContestResultsResponse[number] | undefined = undefined
  if (userData) {
    ownSession = sessions.find((session) => session.user.username === userData?.username)
  }

  return (
    <>
      {ownSession && <PublishedSession {...ownSession} isOwnSession placeNumber={sessions.indexOf(ownSession) + 1} />}
      {sessions.map((session, index) => (
        <PublishedSession key={session.id} {...session} placeNumber={index + 1} />
      ))}
    </>
  )
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
