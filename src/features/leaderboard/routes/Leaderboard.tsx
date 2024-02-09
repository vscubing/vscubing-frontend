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

  const caption = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='contents'>
      <Header caption={caption} />
      <div className='flex flex-col gap-3'>
        <NavigateBackButton className='self-start' />
        <div className='flex min-h-[5.75rem] items-center justify-between rounded-2xl bg-black-80 px-4'>
          <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ discipline: '3by3' }}>
            {({ isActive }) => <CubeButton asButton={false} cube='3by3' isActive={isActive} />}
          </Link>
          <Pagination currentPage={page} totalPages={data?.totalPages} />
        </div>
        <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
          <ResultsHeader />
          <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
            <Result className='invisible fixed' aria-hidden ref={fakeElementRef} result={FAKE_RESULT} />
            <Results results={data?.results} ownResult={data?.ownResult} isFetching={isFetching} pageSize={pageSize} />
          </ul>
        </div>
      </div>
    </section>
  )
}

function Results({
  results,
  ownResult,
  pageSize,
  isFetching,
}: {
  results?: LeaderboardDTO['results']
  ownResult?: LeaderboardDTO['ownResult']
  pageSize?: number
  isFetching: boolean
}) {
  if (!pageSize) {
    return null
  }
  if (results?.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  const isOwnResultDisplayedSeparately = ownResult && (ownResult.isDisplayedSeparately || isFetching)
  const skeletonSize = isOwnResultDisplayedSeparately ? pageSize - 1 : pageSize

  return (
    <>
      {isOwnResultDisplayedSeparately && <Result isOwn result={ownResult.result} linkToPage={ownResult.page} />}
      {!results || isFetching ? (
        <ResultsSkeleton size={skeletonSize} />
      ) : (
        results?.map((result) => <Result isOwn={ownResult?.result.id === result.id} key={result.id} result={result} />)
      )}
    </>
  )
}

function ResultsSkeleton({ size }: { size: number }) {
  return Array.from({ length: size }, (_, index) => <ResultSkeleton key={index} />)
}
