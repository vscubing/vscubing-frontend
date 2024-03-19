import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { CubeButton, HintSection, Pagination } from '@/components/ui'
import { Result, ResultSkeleton, ResultsHeader } from '../components'
import { type LeaderboardDTO, getLeaderboardQuery } from '../api'
import { cn, useAutofillHeight } from '@/utils'

const route = getRouteApi('/leaderboard/$discipline')
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const navigate = useNavigate({ from: route.id })

  const { discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()

  const query = getLeaderboardQuery({
    discipline,
    page,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })

  const { data, error, isFetching } = useQuery(query)

  if (error?.response?.status === 400) {
    void navigate({ search: { page: 1 }, params: { discipline } })
  }

  const caption = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header caption={caption} />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>Check out our best solves</h1>
      <NavigateBackButton className='self-start' />
      <div className='flex min-h-[5.75rem] items-center justify-between rounded-2xl bg-black-80 px-4'>
        <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ discipline: '3by3' }}>
          {({ isActive }) => <CubeButton asButton={false} cube='3by3' isActive={isActive} />}
        </Link>
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      </div>
      <ResultsList
        className='flex-1'
        results={data?.results}
        ownResult={data?.ownResult}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
      />
    </section>
  )
}

type ResultsListProps = {
  className?: string
  containerRef: React.RefObject<HTMLUListElement>
  fakeElementRef: React.RefObject<HTMLLIElement>
} & ResultsListInnerProps
function ResultsList({
  className,
  results,
  ownResult,
  pageSize,
  containerRef,
  fakeElementRef,
  isFetching,
}: ResultsListProps) {
  if (results?.length === 0) {
    return (
      <HintSection>
        <p>
          It seems this leaderboard is currently taking a breather and awaiting the triumphs of contenders like yourself
        </p>
      </HintSection>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1 rounded-2xl bg-black-80 p-6', className)}>
      <ResultsHeader className='md:hidden' />
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <ResultSkeleton className='invisible fixed' aria-hidden ref={fakeElementRef} />
        <ResultsListInner isFetching={isFetching} results={results} ownResult={ownResult} pageSize={pageSize} />
      </ul>
    </div>
  )
}

type ResultsListInnerProps = {
  results?: LeaderboardDTO['results']
  ownResult?: LeaderboardDTO['ownResult']
  pageSize?: number
  isFetching: boolean
}
function ResultsListInner({ results, ownResult, pageSize, isFetching }: ResultsListInnerProps) {
  if (!pageSize) {
    return null
  }

  const isOwnResultDisplayedSeparately = ownResult && (ownResult.isDisplayedSeparately || isFetching)
  const skeletonSize = isOwnResultDisplayedSeparately ? pageSize - 1 : pageSize

  return (
    <>
      {isOwnResultDisplayedSeparately && <Result isOwn result={ownResult.result} linkToPage={ownResult.page} />}
      {!results || isFetching
        ? Array.from({ length: skeletonSize }, (_, index) => <ResultSkeleton key={index} />)
        : results?.map((result) => (
            <Result isOwn={ownResult?.result.id === result.id} key={result.id} result={result} />
          ))}
    </>
  )
}
