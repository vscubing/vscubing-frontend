import { Header, SectionHeader } from '@/components/layout'
import { useUser } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import {
  NavigateBackButton,
  HintSection,
  PageTitleMobile,
  Pagination,
  PaginationInvalidPageHandler,
  NotFoundHandler,
} from '@/components/shared'
import { CubeSwitcher, OverlaySpinner } from '@/components/ui'
import { Link, getRouteApi } from '@tanstack/react-router'
import { Result, ResultSkeleton, ResultsHeader } from '../components'
import { getLeaderboardInfiniteQuery, getLeaderboardQuery, type LeaderboardDTO } from '../api'
import {
  type ListWithPinnedItemProps,
  type ListWrapperProps,
  AutofillHeight,
  type Behavior,
} from '@/features/autofillHeight'
import { matchesQuery } from '@/utils'
import { type ReactNode } from 'react'

const route = getRouteApi('/leaderboard/$disciplineSlug')
export function Leaderboard() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { page } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()

  const query = getLeaderboardQuery({
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })
  const { data, error, isFetching } = useQuery(query)

  return (
    <PaginationInvalidPageHandler error={error}>
      <NotFoundHandler error={error}>
        <View pages={data?.pages} behavior='pagination'>
          <ResultsList
            behavior='pagination'
            list={data?.results.solveSet ?? undefined}
            ownResult={data?.results.ownResult}
            pageSize={pageSize}
            containerRef={containerRef}
            fakeElementRef={fakeElementRef}
            isFetching={isFetching}
          />
        </View>
      </NotFoundHandler>
    </PaginationInvalidPageHandler>
  )
}

function ControllerWithInfiniteScroll() {
  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getLeaderboardInfiniteQuery({
    pageSize,
    enabled: pageSize !== undefined,
  })
  const { data, error, isFetching, isLoading, lastElementRef } = AutofillHeight.useInfiniteScroll(query)
  const isFetchingNotFirstPage = isFetching && !isLoading

  return (
    <NotFoundHandler error={error}>
      <OverlaySpinner isVisible={isFetchingNotFirstPage} />
      <View behavior='infinite-scroll'>
        <ResultsList
          behavior='infinite-scroll'
          list={data?.pages.flatMap((page) => page.results.solveSet)}
          ownResult={data?.pages.at(0)?.results.ownResult}
          containerRef={containerRef}
          fakeElementRef={fakeElementRef}
          lastElementRef={lastElementRef}
          isFetching={isFetching}
          pageSize={pageSize}
        />
      </View>
    </NotFoundHandler>
  )
}

type ViewProps = {
  behavior: Behavior
  pages?: number
  children: ReactNode
}
function View({ pages, children, behavior }: ViewProps) {
  const { disciplineSlug } = route.useParams()
  const { page } = route.useSearch()
  const { data: user } = useUser()
  const title = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <Link activeOptions={{ exact: true, includeSearch: false }} search={{}} params={{ disciplineSlug: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={disciplineSlug === '3by3'} />
        </Link>
        {behavior === 'pagination' && <Pagination currentPage={page} pages={pages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ResultsListProps = { ownResult?: LeaderboardDTO['ownResult'] } & Pick<
  ListWrapperProps,
  'containerRef' | 'fakeElementRef'
> &
  Pick<
    ListWithPinnedItemProps<LeaderboardDTO['solveSet'][0]>,
    'pageSize' | 'lastElementRef' | 'list' | 'isFetching' | 'behavior'
  >
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
  const { data: currentUser } = useUser()
  const { disciplineSlug } = route.useLoaderData()
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
          getItemKey={(item) => item.solve.id}
          behavior={behavior}
          pinnedItem={ownResult ?? undefined}
          isHighlighted={(item) => item.solve.id === ownResult?.solve.id}
          renderPinnedItem={(isFirst) =>
            ownResult ? (
              <div className='sm:-mt-3 sm:rounded-b-xl sm:bg-black-80 sm:pt-3'>
                <Result
                  isOwn
                  isFirstOnPage={isFirst}
                  linkToPage={behavior === 'pagination' ? ownResult.page : undefined}
                  disciplineSlug={disciplineSlug}
                  result={{
                    place: ownResult.place,
                    solve: {
                      user: currentUser!,
                      ...ownResult.solve,
                    },
                  }}
                />
              </div>
            ) : null
          }
          renderItem={(result, isFirst) => (
            <Result
              disciplineSlug={disciplineSlug}
              isFirstOnPage={isFirst}
              isOwn={result.solve.id === ownResult?.solve.id}
              result={result}
            />
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
