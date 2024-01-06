import { InfoBox } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { PublishedSession } from './PublishedSession'
import { type ContestResultsDTO } from '../api'
import { userQuery } from '@/features/auth'
import { RouteApi } from '@tanstack/react-router'
import { SolveContest } from './solveContest'

const route = new RouteApi({ id: '/contests/$contestNumber' })
export function ContestDiscipline() {
  const { data: userData } = useQuery(userQuery)
  const { contestNumber } = route.useParams()
  const { discipline } = route.useSearch()
  const query = route.useLoaderData()
  const { data: sessions, error, isLoading } = useQuery(query)

  if (isLoading) {
    return <InfoBox>loading...</InfoBox>
  }

  if (error?.response?.status === 403) {
    return <SolveContest contestNumber={Number(contestNumber)} discipline={discipline!} />
  }

  if (error?.response?.status === 401) {
    return <InfoBox>You need to be signed in to participate in a contest</InfoBox>
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
