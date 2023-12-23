import { ContestResultsResponse, useContestResults } from '@/api/contests'
import { Discipline } from '@/types'
import { PublishedSession } from './components/PublishedSession'
import { SolveContest } from './components/SolveContest'
import { InfoBox } from '@/components'
import { useUser } from '@/api/accounts'
import { contestDisciplineRoute } from '@/router'

export function ContestDiscipline() {
  const { userData } = useUser()
  const routeParams = contestDisciplineRoute.useParams()

  const contestNumber = Number(routeParams.contestNumber)
  const disciplineName = routeParams.discipline as Discipline // TODO add type guard

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
