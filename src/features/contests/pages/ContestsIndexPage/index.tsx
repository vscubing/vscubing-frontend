import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { isInvalidPageError, matchesQuery } from '@/utils'
import type { ContestDTO, Discipline } from '@/types'
import { type ReactNode } from 'react'
import { ContestsListHeader } from './ContestsListHeader'
import { AutofillHeight, type ListWrapperProps, type ListProps } from '@/features/autofillHeight'
import { HintSection, NavigateBackButton, PageTitleMobile, Pagination } from '@/components/shared'

import { ContestRowSkeleton as ContestSkeletonDesktop, ContestRow as ContestDesktop } from './Contest'
import {
  Contest as ContestMobile,
  ContestSkeleton as ContestSkeletonMobile,
  getInfiniteContestsQuery,
  useContests,
} from '@/shared/contests'
import { NotFoundRedirect } from '@/features/NotFoundPage'
import { AxiosError } from 'axios'

const Contest = matchesQuery('sm') ? ContestMobile : ContestDesktop
const ContestSkeleton = matchesQuery('sm') ? ContestSkeletonMobile : ContestSkeletonDesktop

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithInfiniteScroll() {
  const { disciplineSlug } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getInfiniteContestsQuery({
    enabled: pageSize !== undefined,
    pageSize,
  })
  const { data, error, lastElementRef } = AutofillHeight.useInfiniteScroll(query)

  return (
    <ErrorHandler error={error}>
      <View discipline={disciplineSlug}>
        <ContestsList
          list={data?.pages.flatMap((page) => page.results)}
          pageSize={pageSize}
          containerRef={containerRef}
          fakeElementRef={fakeElementRef}
          lastElementRef={lastElementRef}
        />
      </View>
    </ErrorHandler>
  )
}

function ControllerWithPagination() {
  const { disciplineSlug, page } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const { data, error } = useContests({
    page,
    pageSize: pageSize ?? 0,
    enabled: pageSize !== undefined,
  })

  return (
    <ErrorHandler error={error}>
      <View withPagination pages={data?.pages} page={page} discipline={disciplineSlug}>
        <ContestsList
          list={data?.results}
          pageSize={pageSize}
          containerRef={containerRef}
          fakeElementRef={fakeElementRef}
        />
      </View>
    </ErrorHandler>
  )
}

type ViewProps = {
  page?: number
  pages?: number
  withPagination?: boolean
  discipline: Discipline
  children: ReactNode
}
function View({ withPagination = false, page, discipline, pages, children }: ViewProps) {
  const title = 'Explore contests'
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <Link search={{ page: 1, disciplineSlug: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {withPagination && <Pagination currentPage={page} pages={pages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ContestsListProps = Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListProps<ContestDTO>, 'pageSize' | 'lastElementRef' | 'list'>
function ContestsList({ list, pageSize, containerRef, fakeElementRef, lastElementRef }: ContestsListProps) {
  const { disciplineSlug } = route.useSearch()
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
          renderSkeleton={() => <ContestSkeleton />}
          renderItem={(contest) => <Contest disciplineSlug={disciplineSlug} contest={contest} />}
          getItemKey={(contest) => contest.id}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}

type ErrorHandlerProps = {
  error: AxiosError | null
  children: ReactNode
}
function ErrorHandler({ error, children }: ErrorHandlerProps) {
  if (!error) {
    return children
  }

  if (isInvalidPageError(error)) {
    return <Navigate search={(prev) => ({ ...prev, page: 1 })} replace />
  }

  if (error?.response?.status === 404) {
    return <NotFoundRedirect />
  }
}
