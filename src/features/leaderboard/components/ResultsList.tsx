import { Result } from './Result'
import { type LeaderboardResult } from '../api'
import { useAutofillHeight } from '@/utils'

export function ResultsList({ results, ownResult }: { results?: LeaderboardResult[]; ownResult?: LeaderboardResult }) {
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>(!!results)

  if (results === undefined) {
    return 'Loading...' // TODO: add loading state
  }
  if (results.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  const fittingResults = results.slice(0, fittingCount)

  const isOwnResultDisplayedSeparately = ownResult && !fittingResults.includes(ownResult)

  if (isOwnResultDisplayedSeparately) {
    fittingResults.pop()
  }

  return (
    <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
      <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
        <Result result={FAKE_RESULT} />
      </li>
      {isOwnResultDisplayedSeparately && <Result isOwnResult result={ownResult} />}
      {fittingResults.map((result) => (
        <li key={result.id}>
          <Result result={result} isOwnResult={ownResult && result.id === ownResult.id} />
        </li>
      ))}
    </ul>
  )
}

const FAKE_RESULT: LeaderboardResult = {
  id: 1,
  placeNumber: 1,
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
