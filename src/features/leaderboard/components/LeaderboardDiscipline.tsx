import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { LeaderboardResult } from './LeaderboardResult'
import { userQuery } from '@/features/auth'
import { RouteApi } from '@tanstack/react-router'

const route = new RouteApi({ id: '/leaderboard/$discipline' })
export function LeaderboardDiscipline() {
  const { data: userData } = useQuery(userQuery)

  const query = route.useLoaderData()
  const { data: results } = useSuspenseQuery(query)

  const ownResult = userData && results.find((result) => result.user.username === userData.username)

  return (
    <>
      {ownResult && <LeaderboardResult {...ownResult} placeNumber={results.indexOf(ownResult) + 1} isOwnResult />}
      {results.map((result, index) => (
        <LeaderboardResult {...result} placeNumber={index + 1} key={result.id} />
      ))}
    </>
  )
}
