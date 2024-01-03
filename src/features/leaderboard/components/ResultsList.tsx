import { Result, ResultSkeleton } from './Result'
import { type LeaderboardResult } from '../api'
import { useAutofillHeight } from '@/utils'
import { useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'

export function AdaptiveResultsList({
  onPageSizeChange,
  results,
  ownResult,
}: {
  results?: LeaderboardResult[]
  ownResult?: LeaderboardResult
  onPageSizeChange: (pageSize: number) => void
}) {
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>()
  const debouncedPageSize = useDebounce<number | undefined>(pageSize, 200)

  useEffect(() => {
    if (debouncedPageSize !== undefined) {
      onPageSizeChange(debouncedPageSize)
    }
  }, [debouncedPageSize, onPageSizeChange])

  console.log(results, pageSize)
  let fittingResults = results?.slice(0, pageSize)

  let isOwnResultDisplayedSeparately = false
  if (ownResult && fittingResults) {
    isOwnResultDisplayedSeparately = fittingResults.every((result) => result.user.username !== ownResult.user.username)
    // TODO: change username to id
  }

  if (isOwnResultDisplayedSeparately && pageSize) {
    fittingResults = fittingResults?.slice(0, pageSize - 1)
  }

  return (
    <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
      <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
        <Result result={FAKE_RESULT} />
      </li>
      {ownResult && isOwnResultDisplayedSeparately && <Result result={ownResult} />}
      <ResultsList results={fittingResults} pageSize={pageSize} />
    </ul>
  )
}

function ResultsList({ results, pageSize }: { results?: LeaderboardResult[]; pageSize?: number }) {
  if (pageSize === undefined) {
    return null
  }
  if (results?.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }
  if (results === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ResultSkeleton key={index} />)
  }
  return results.map((result) => (
    <li key={result.id}>
      <Result result={result} />
    </li>
  ))
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
