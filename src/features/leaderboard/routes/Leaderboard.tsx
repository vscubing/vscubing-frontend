import { Header, SectionHeader } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { CubeSwitcher, HintSection, PageTitleMobile, Pagination } from '@/components/ui'
import { Result, ResultSkeleton, ResultsHeader } from '../components'
import { LeaderboardDTO, getLeaderboardQuery, type LeaderboardResult } from '../api'
import { type ListWithPinnedItemProps, type ListWrapperProps, AutofillHeight } from '@/features/autofillHeight'

const route = getRouteApi('/leaderboard/$discipline')
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const navigate = useNavigate({ from: route.id })

  const { discipline, page } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()

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

  const title = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ discipline: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <Pagination currentPage={page} totalPages={data?.totalPages} className='ml-auto' />
      </SectionHeader>
      <ResultsList
        list={data?.results ?? undefined}
        ownResult={data?.ownResult ?? null}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
      />
    </section>
  )
}

type ResultsListProps = { ownResult: LeaderboardDTO['ownResult'] } & Pick<
  ListWrapperProps,
  'containerRef' | 'fakeElementRef'
> &
  Pick<ListWithPinnedItemProps<LeaderboardResult>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching'>
function ResultsList({ list, ownResult, pageSize, containerRef, fakeElementRef, isFetching }: ResultsListProps) {
  if (list?.length === 0) {
    return (
      <HintSection>
        <p>
          It seems this leaderboard is currently taking a breather and awaiting the triumphs of contenders like yourself
        </p>
      </HintSection>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6'>
      <ResultsHeader className='md:hidden' />
      <AutofillHeight.ListWrapper
        renderFakeElement={() => <ResultSkeleton />}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      >
        <AutofillHeight.ListWithPinnedItem
          pinnedItem={ownResult ?? undefined}
          renderPinnedItem={() =>
            ownResult ? <Result isOwn linkToPage={ownResult.page} result={ownResult.result} /> : null
          }
          renderItem={(result) => <Result isOwn={result.id === ownResult?.result.id} result={result} />}
          renderSkeleton={() => <ResultSkeleton />}
          pageSize={pageSize}
          list={list}
          isFetching={isFetching}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}
