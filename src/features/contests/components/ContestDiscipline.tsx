import { InfoBox } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { Discipline } from '@/types'
import { SolveContest } from '@/features/solveContest'
import { contestDisciplineRoute } from '../routes'
import { PublishedSession } from './PublishedSession'
import { ContestResultsDTO } from '../api'
import { userQuery } from '@/features/auth'

export function ContestDiscipline() {
  const { data: userData } = useQuery(userQuery)
  const routeParams = contestDisciplineRoute.useParams()
  const query = contestDisciplineRoute.useLoaderData()
  const { data: sessions, error, isLoading } = useQuery({ ...query, enabled: !!userData })

  if (isLoading) {
    return <InfoBox>Loading...</InfoBox>
  }

  if (userData === null) {
    return <InfoBox>You need to be signed in to participate in a contest</InfoBox>
  }

  if (error?.response?.status === 403) {
    return (
      <SolveContest
        contestNumber={Number(routeParams.contestNumber)}
        discipline={routeParams.discipline as Discipline}
      />
    )
  }

  if (error || sessions === undefined) {
    return <InfoBox>An unknown error occured</InfoBox>
  }

  let ownSession: ContestResultsDTO[number] | undefined = undefined
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
