import { useQuery } from '@tanstack/react-query'
import { Result } from './Result'
import { userQuery } from '@/features/auth'
import { type LeaderboardDTO } from '../api'
import { useAutofillHeight } from '@/utils'

export function ResultsList({ results }: { results?: LeaderboardDTO }) {
  results = results && Array(8).fill(results[0])
  results = results && [
    ...results
      .slice(1)
      .map((result) => ({ ...result, id: Math.random(), user: { id: 123, username: String(Math.random()) } })),
    results[0],
  ]

  const { data: currentUser } = useQuery(userQuery)
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>(!!results)

  if (results === undefined) {
    return 'Loading...' // TODO: add loading state
  }
  if (results.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  const fittingResults = results.slice(0, fittingCount)

  const ownResult = currentUser && results.find((result) => result.user.username === currentUser.username)
  const isOwnResultDisplayedSeparately = ownResult && !fittingResults.includes(ownResult)

  if (isOwnResultDisplayedSeparately) {
    fittingResults.pop()
  }

  return (
    <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
      <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
        <Result result={FAKE_RESULT} placeNumber={1} />
      </li>
      {isOwnResultDisplayedSeparately && <Result result={ownResult} placeNumber={results.indexOf(ownResult) + 1} />}
      {fittingResults.map((result, index) => (
        <li key={result.id}>
          <Result result={result} placeNumber={index + 1} />
        </li>
      ))}
    </ul>
  )
}

const FAKE_RESULT: LeaderboardDTO[number] = {
  id: 1,
  user: {
    id: 1,
    username: 'username',
  },
  discipline: { name: '3by3' },
  timeMs: 1000,
  scramble: { id: 1, scramble: '' },
  contest: { contestNumber: 1 },
  created: '2021-01-01T00:00:00.000Z',
}
