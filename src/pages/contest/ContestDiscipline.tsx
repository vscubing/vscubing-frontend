import { ContestResultsResponse } from '@/api/contests'
import { PublishedSession } from './components/PublishedSession'
import { SolveContest } from './components/SolveContest'
import { InfoBox } from '@/components'
import { useUser } from '@/api/accounts'
import { contestDisciplineRoute } from './contestsRoute'
import { useQuery } from '@tanstack/react-query'
import { Discipline } from '@/types'

export function ContestDiscipline() {
  const { userData } = useUser()
  const routeParams = contestDisciplineRoute.useParams()
  const query = contestDisciplineRoute.useLoaderData()
  const { data: sessions, error, isLoading } = useQuery(query)

  if (isLoading) {
    return <InfoBox>loading...</InfoBox>
  }

  if (error?.response?.status === 403) {
    return (
      <SolveContest
        contestNumber={Number(routeParams.contestNumber)}
        discipline={routeParams.discipline as Discipline}
      />
    )
  }

  if (error?.response?.status === 401) {
    return <InfoBox>You need to be signed in to participate in a contest</InfoBox>
  }

  if (error || sessions === undefined) {
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
