import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { CubeButton, Pagination } from '@/components/ui'
import { FAKE_RESULT, Result, ResultSkeleton, ResultsHeader } from '../components'
import { type LeaderboardDTO, getLeaderboardQuery } from '../api'
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

  const { data, error, isFetching } = useQuery(query)

  if (error?.response?.status === 400) {
    void navigate({ search: { page: 1 }, params: { discipline } })
  }

  const caption = user ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption={caption} />
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-2xl bg-black-80 p-4'>
        <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ discipline: '3by3' }}>
          {({ isActive }) => <CubeButton asButton={false} cube='3by3' isActive={isActive} />}
        </Link>
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
        <ResultsHeader />
        <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
          <Result className='invisible fixed' aria-hidden ref={fakeElementRef} result={FAKE_RESULT} />
          <OwnResult isLoading={isFetching} ownResult={data?.ownResult} />
          <ResultsSkeleton isLoading={isFetching} pageSize={pageSize} ownResult={data?.ownResult} />
          <Results results={data?.results} />
        </ul>
      </div>
    </section>
  )
}

function OwnResult({ ownResult, isLoading }: { ownResult: LeaderboardDTO['ownResult']; isLoading: boolean }) {
  if (!ownResult) {
    return null
  }
  if (ownResult.isDisplayedSeparately || isLoading) {
    return <Result result={ownResult.result} linkToPage={ownResult.page} />
  }
  return null
}

function ResultsSkeleton({
  pageSize,
  ownResult,
  isLoading,
}: {
  pageSize?: number
  ownResult?: LeaderboardDTO['ownResult']
  isLoading: boolean
}) {
  if (!pageSize || !isLoading) {
    return null
  }

  let skeletonSize = pageSize
  if (ownResult) {
    skeletonSize--
  }
  return Array.from({ length: skeletonSize }, (_, index) => <ResultSkeleton key={index} />)
}

function Results({ results }: { results?: LeaderboardDTO['results'] }) {
  if (!results) {
    return null
  }
  if (results.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  return results.map((result) => <Result result={result} key={result.id} />)
}
