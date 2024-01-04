import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { CubeButton, Pagination } from '@/components/ui'
import { FAKE_RESULT, Result, ResultSkeleton, ResultsHeader } from '../components'
import { type LeaderboardDTO, getLeaderboardQuery } from '../api'
import { useEffect } from 'react'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'

const route = new RouteApi({ id: '/leaderboard/$discipline' })
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const navigate = useNavigate({ from: route.id })

  const { discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const debouncedPageSize = useDebounceAfterFirst(pageSize)

  const query = getLeaderboardQuery({
    discipline,
    page,
    pageSize: debouncedPageSize ?? 0,
    isEnabled: debouncedPageSize !== undefined,
  })

  const { data: leaderboard, error } = useQuery(query)

  useEffect(() => {
    if (error?.response?.status === 400) {
      void navigate({ search: { page: 1 } })
    }
  }, [error?.response?.status, navigate])

  const caption = user ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption={caption} />
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-2xl bg-black-80 p-4'>
        <Link activeOptions={{ exact: true, includeSearch: false }} params={{ discipline: '3by3' }}>
          {({ isActive }) => <CubeButton asButton={false} cube='3by3' isActive={isActive} />}
        </Link>
        <Pagination currentPage={page} totalPages={leaderboard?.totalPages} />
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <ResultsHeader />
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
            <Result result={FAKE_RESULT} />
          </li>
          <Results results={leaderboard?.results} pageSize={pageSize} />
        </ul>
      </div>
    </section>
  )
}

function Results({ results, pageSize }: { results?: LeaderboardDTO['results']; pageSize?: number }) {
  if (pageSize === undefined) {
    return null
  }
  if (results === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ResultSkeleton key={index} />)
  }
  if (results.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  return results.map((result) => (
    <li key={result.id}>
      <Result result={result} />
    </li>
  ))
}
