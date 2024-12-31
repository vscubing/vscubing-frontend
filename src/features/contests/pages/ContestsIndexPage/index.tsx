import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, OverlaySpinner } from '@/components/ui'
import { Link, getRouteApi } from '@tanstack/react-router'
import { matchesQuery } from '@/utils'
import type { ContestDTO } from '@/types'
import { type ReactNode } from 'react'
import { ContestsListHeader } from './ContestsListHeader'
import { AutofillHeight, type ListWrapperProps, type ListProps } from '@/shared/autofillHeight'

import { ContestRowSkeleton as ContestSkeletonDesktop, ContestRow as ContestDesktop } from './Contest'
import {
  Contest as ContestMobile,
  ContestSkeleton as ContestSkeletonMobile,
  getInfiniteContestsQuery,
  useAvailableDisciplines,
  useContests,
} from '@/shared/contests'
import { NotFoundHandler, PaginationInvalidPageHandler } from '@/shared/ErrorHandlers'
import { HintSection } from '@/shared/HintSection'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import { PageTitleMobile } from '@/shared/PageTitleMobile'
import { Pagination } from '@/shared/Pagination'

const Contest = matchesQuery('sm') ? ContestMobile : ContestDesktop
const ContestSkeleton = matchesQuery('sm') ? ContestSkeletonMobile : ContestSkeletonDesktop

const route = getRouteApi('/_app/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithPagination() {
  const { discipline, page } = route.useSearch()

  const {
    fittingCount: pageSize,
    optimalElementHeight,
    containerRef,
    fakeElementRef,
  } = AutofillHeight.useFittingCount()
  const { data, error } = useContests({
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })

  return (
    <PaginationInvalidPageHandler error={error}>
      <NotFoundHandler error={error}>
        <View withPagination pages={data?.pages} page={page} discipline={discipline}>
          <ContestsList
            list={data?.results}
            pageSize={pageSize}
            containerRef={containerRef}
            fakeElementRef={fakeElementRef}
            optimalElementHeight={optimalElementHeight}
          />
        </View>
      </NotFoundHandler>
    </PaginationInvalidPageHandler>
  )
}

function ControllerWithInfiniteScroll() {
  const { discipline } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getInfiniteContestsQuery({
    enabled: pageSize !== undefined,
    pageSize,
  })
  const { data, isFetching, isLoading, error, lastElementRef } = AutofillHeight.useInfiniteScroll(query)
  const isFetchingNotFirstPage = isFetching && !isLoading

  return (
    <NotFoundHandler error={error}>
      <OverlaySpinner isVisible={isFetchingNotFirstPage} />
      <View discipline={discipline}>
        <ContestsList
          list={data?.pages.flatMap((page) => page.results)}
          pageSize={pageSize}
          containerRef={containerRef}
          fakeElementRef={fakeElementRef}
          lastElementRef={lastElementRef}
        />
      </View>
    </NotFoundHandler>
  )
}

type ViewProps = {
  page?: number
  pages?: number
  withPagination?: boolean
  discipline: string
  children: ReactNode
}
function View({ withPagination = false, page, discipline: currentDiscipline, pages, children }: ViewProps) {
  const title = 'Explore contests'
  const { data: availableDisciplines } = useAvailableDisciplines()
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <div className='flex gap-3'>
          {availableDisciplines?.map(({ slug: discipline }) => (
            <Link search={{ page: 1, discipline }} key={discipline}>
              <CubeSwitcher asButton={false} cube={discipline} isActive={discipline === currentDiscipline} />
            </Link>
          ))}
        </div>
        {withPagination && <Pagination currentPage={page} pages={pages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ContestsListProps = Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListProps<ContestDTO>, 'pageSize' | 'lastElementRef' | 'list'> & { optimalElementHeight?: number }
function ContestsList({
  list,
  pageSize,
  containerRef,
  fakeElementRef,
  lastElementRef,
  optimalElementHeight,
}: ContestsListProps) {
  const { discipline } = route.useSearch()
  if (list?.length === 0) {
    return (
      <HintSection>
        <p>
          While this page may be empty now, it's brimming with potential for thrilling contests that will soon fill this
          space.
        </p>
      </HintSection>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3'>
      <ContestsListHeader className='sm:hidden' />
      <AutofillHeight.ListWrapper
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        renderFakeElement={() => <ContestSkeleton />}
      >
        <AutofillHeight.List
          lastElementRef={lastElementRef}
          pageSize={pageSize}
          list={list}
          renderSkeleton={() => <ContestSkeleton height={optimalElementHeight} />}
          renderItem={({ item: contest }) => (
            <Contest discipline={discipline} contest={contest} height={optimalElementHeight} />
          )}
          getItemKey={(contest) => contest.id}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}
