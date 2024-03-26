import { Header, SectionHeader } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { CubeSwitcher, HintSection, PageTitleMobile, Pagination } from '@/components/ui'
import { Result, ResultSkeleton, ResultsHeader } from '../components'
import { type LeaderboardDTO, getLeaderboardQuery, type LeaderboardResult, getLeaderboardInfiniteQuery } from '../api'
import {
  type ListWithPinnedItemProps,
  type ListWrapperProps,
  AutofillHeight,
  type Behavior,
} from '@/features/autofillHeight'
import { matchesQuery } from '@/utils'
import { type ReactNode } from 'react'

const route = getRouteApi('/leaderboard/$discipline')
export function Leaderboard() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const navigate = useNavigate({ from: route.id })

  const { discipline, page } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()

  const query = getLeaderboardQuery({
    discipline,
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })
  const { data, error, isFetching } = useQuery(query)

  if (error?.response?.status === 400) {
    void navigate({ search: { page: 1 }, params: { discipline } })
  }

  return (
    <View totalPages={data?.totalPages} behavior='pagination'>
      <ResultsList
        behavior='pagination'
        list={data?.results ?? undefined}
        ownResult={data?.ownResult ?? null}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        isFetching={isFetching}
      />
    </View>
  )
}

function ControllerWithInfiniteScroll() {
  const { discipline } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getLeaderboardInfiniteQuery({
    discipline,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })
  const { data, isFetching, lastElementRef } = AutofillHeight.useInfiniteScroll(query)

  return (
    <View behavior='infinite-scroll'>
      <ResultsList
        behavior='infinite-scroll'
        list={data?.pages.flatMap((page) => page.results!)}
        ownResult={data?.pages.at(0)?.ownResult ?? null}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        lastElementRef={lastElementRef}
        isFetching={isFetching}
        pageSize={pageSize}
      />
    </View>
  )
}

type ViewProps = {
  behavior: Behavior
  totalPages?: number
  children: ReactNode
}
function View({ totalPages, children, behavior }: ViewProps) {
  const { discipline, page } = route.useLoaderData()
  const { data: user } = useQuery(userQuery)
  const title = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ discipline: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {behavior === 'pagination' && <Pagination currentPage={page} totalPages={totalPages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ResultsListProps = { ownResult: LeaderboardDTO['ownResult'] } & Pick<
  ListWrapperProps,
  'containerRef' | 'fakeElementRef'
> &
  Pick<ListWithPinnedItemProps<LeaderboardResult>, 'pageSize' | 'lastElementRef' | 'list' | 'isFetching' | 'behavior'>
function ResultsList({
  list,
  ownResult,
  pageSize,
  behavior,
  lastElementRef,
  containerRef,
  fakeElementRef,
  isFetching,
}: ResultsListProps) {
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
    <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3'>
      <ResultsHeader className='md:hidden' />
      <AutofillHeight.ListWrapper
        renderFakeElement={() => <ResultSkeleton />}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      >
        <AutofillHeight.ListWithPinnedItem
          behavior={behavior}
          pinnedItem={ownResult ?? undefined}
          isHighlighted={(item) => item.id === ownResult?.result.id}
          renderPinnedItem={(isFirst, linkToPage) =>
            ownResult ? (
              <div className='sm:-mt-3 sm:rounded-b-xl sm:bg-black-80 sm:pt-3'>
                <Result isOwn isFirstOnPage={isFirst} linkToPage={linkToPage} result={ownResult.result} />
              </div>
            ) : null
          }
          renderItem={(result, isFirst) => (
            <Result isFirstOnPage={isFirst} isOwn={result.id === ownResult?.result.id} result={result} />
          )}
          renderSkeleton={() => <ResultSkeleton />}
          pageSize={pageSize}
          list={list}
          isFetching={isFetching}
          lastElementRef={lastElementRef}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}
