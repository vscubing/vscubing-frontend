import { Header, SectionHeader } from '@/components/layout'
import { useUser } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { CubeSwitcher, OverlaySpinner } from '@/components/ui'
import { Link, getRouteApi } from '@tanstack/react-router'
import { Result, ResultSkeleton, ResultsHeader } from '../components'
import { getLeaderboardInfiniteQuery, getLeaderboardQuery, type LeaderboardDTO } from '../api'
import {
  type ListWithPinnedItemProps,
  type ListWrapperProps,
  AutofillHeight,
  type Behavior,
} from '@/shared/autofillHeight'
import { matchesQuery } from '@/utils'
import { type ReactNode } from 'react'
import { PaginationInvalidPageHandler, NotFoundHandler } from '@/shared/ErrorHandlers'
import { HintSection } from '@/shared/HintSection'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import { PageTitleMobile } from '@/shared/PageTitleMobile'
import { Pagination } from '@/shared/Pagination'
import { useAvailableDisciplines } from '@/shared/contests'

const route = getRouteApi('/_app/leaderboard/$discipline')
export function Leaderboard() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { page } = route.useSearch()
  const { discipline } = route.useParams()
  const {
    fittingCount: pageSize,
    optimalElementHeight,
    containerRef,
    fakeElementRef,
  } = AutofillHeight.useFittingCount()

  const query = getLeaderboardQuery({
    page,
    disciplineSlug: discipline,
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
            optimalElementHeight={optimalElementHeight}
          />
        </View>
      </NotFoundHandler>
    </PaginationInvalidPageHandler>
  )
}

function ControllerWithInfiniteScroll() {
  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const { discipline } = route.useParams()
  const query = getLeaderboardInfiniteQuery({
    pageSize,
    enabled: pageSize !== undefined,
    disciplineSlug: discipline,
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
  const { discipline: currentDiscipline } = route.useParams()
  const { page } = route.useSearch()
  const { data: user } = useUser()
  const title = user?.username ? `${user.username}, check out our best solves` : 'Check out our best solves'
  const { data: availableDisciplines } = useAvailableDisciplines()

  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2 animate-fade-in'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start hover-lift-subtle' />
      <SectionHeader>
        <div className='flex gap-3'>
          {availableDisciplines?.map(({ slug: discipline }) => (
            <Link
              to='/leaderboard/$discipline'
              activeOptions={{ exact: true, includeSearch: false }}
              search={{ page: 1 }}
              params={{ discipline }}
              key={discipline}
            >
              <CubeSwitcher asButton={false} cube={discipline} isActive={currentDiscipline === discipline} />
            </Link>
          ))}
        </div>
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
  > & { optimalElementHeight?: number }
function ResultsList({
  list,
  ownResult,
  pageSize,
  behavior,
  lastElementRef,
  containerRef,
  fakeElementRef,
  isFetching,
  optimalElementHeight,
}: ResultsListProps) {
  const { data: currentUser } = useUser()
  const { discipline } = route.useParams()
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
    <div className='flex flex-1 flex-col gap-1 rounded-2xl glass-card glass-card-hover p-6 sm:p-3 animate-slide-up'>
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
                  discipline={discipline}
                  result={{
                    place: ownResult.place,
                    solve: {
                      user: currentUser!,
                      ...ownResult.solve,
                    },
                  }}
                  height={optimalElementHeight}
                />
              </div>
            ) : null
          }
          renderItem={({ item: result, isFirst }) => (
            <Result
              discipline={discipline}
              isFirstOnPage={isFirst}
              isOwn={result.solve.id === ownResult?.solve.id}
              result={result}
              height={optimalElementHeight}
            />
          )}
          renderSkeleton={() => <ResultSkeleton height={optimalElementHeight} />}
          pageSize={pageSize}
          list={list}
          isFetching={isFetching}
          lastElementRef={lastElementRef}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}
