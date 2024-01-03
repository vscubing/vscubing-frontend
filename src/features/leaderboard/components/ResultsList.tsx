import { Result, ResultSkeleton } from './Result'
import { type LeaderboardResult } from '../api'
import { useAutofillHeight } from '@/utils'
import { useEffect, useState } from 'react'

export function AdaptiveResultsList({
  onPageSizeChange,
  results,
}: {
  results?: LeaderboardResult[]
  onPageSizeChange: (pageSize: number) => void
}) {
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>()
  useDebounceAfterFirst(pageSize, onPageSizeChange, 200)

  return (
    <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
      <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
        <Result result={FAKE_RESULT} />
      </li>
      <ResultsList results={results} pageSize={pageSize} />
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

function useDebounceAfterFirst<T>(value: T | undefined, onChange: (value: T) => void, debounceMs: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>()
  useEffect(() => {
    if (value === undefined) {
      return
    }

    if (debouncedValue === undefined) {
      setDebouncedValue(value)
      onChange(value)
      return
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value)
      onChange(value)
    }, debounceMs)
    return () => clearTimeout(timeout)
  }, [value, debouncedValue, onChange, debounceMs])
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
