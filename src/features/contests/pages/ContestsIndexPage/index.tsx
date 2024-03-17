import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, HintSection, Pagination } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { cn, matchesQuery, useAutofillHeight } from '@/utils'
import type { Discipline } from '@/types'
import { getContestsQuery, getInfiniteContestsQuery, type ContestsListDTO } from '../../api'
import { ContestRowSkeleton, ContestRow } from './Contest'
import { ContestsListHeader } from './ContestsListHeader'
import { Contest as ContestMobile, ContestSkeleton as ContestMobileSkeleton } from '@/components/Contest'
import { useIntersectionObserver } from 'usehooks-ts'
import { useEffect } from 'react'

const Contest = matchesQuery('sm') ? ContestMobile : ContestRow
const ContestSkeleton = matchesQuery('sm') ? ContestMobileSkeleton : ContestRowSkeleton

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithInfiniteScroll() {
  const { page, discipline } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight(undefined, page === 1)

  const query = getInfiniteContestsQuery({
    discipline,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })
  const { data, fetchNextPage } = useInfiniteQuery(query)

  const totalPages = data?.pages?.[0].totalPages
  const allPagesLoaded = totalPages && data?.pages?.length === totalPages

  const { isIntersecting, entry: lastEntry, ref: lastElementRef } = useIntersectionObserver({ rootMargin: '10%' })
  useEffect(() => {
    if (isIntersecting && !allPagesLoaded) {
      void fetchNextPage()
    }
  }, [lastEntry, isIntersecting, allPagesLoaded, fetchNextPage])

  if (page !== 1) {
    return <Navigate from={route.id} params={discipline} search={{ page: 1 }} />
  }

  return (
    <View
      withPagination={false}
      contests={data?.pages.flatMap((page) => page.contests!)}
      pageSize={pageSize}
      discipline={discipline}
      containerRef={containerRef}
      fakeElementRef={fakeElementRef}
      lastElementRef={lastElementRef}
    />
  )
}

function ControllerWithPagination() {
  const { page, discipline } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()

  const query = getContestsQuery({
    discipline,
    page,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })

  const { data, error } = useQuery(query)

  if (error?.response?.status === 400) {
    return <Navigate from={route.id} params={discipline} search={{ page: 1 }} />
  }

  return (
    <View
      withPagination={true}
      contests={data?.contests}
      totalPages={data?.totalPages}
      page={page}
      pageSize={pageSize}
      discipline={discipline}
      containerRef={containerRef}
      fakeElementRef={fakeElementRef}
    />
  )
}

type ViewProps = ContestsListWrapperProps & {
  page?: number
  totalPages?: number
  withPagination: boolean
}
function View({
  withPagination,
  page,
  contests,
  discipline,
  pageSize,
  totalPages,
  containerRef,
  fakeElementRef,
  lastElementRef,
}: ViewProps) {
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header caption={<h1>Explore contests</h1>} />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>Explore contests</h1>
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-2xl bg-black-80 p-4 sm:p-3'>
        <Link from={route.id} search={{ discipline: '3by3' }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {withPagination && page !== undefined && <Pagination currentPage={page} totalPages={totalPages} />}
      </div>
      <ContestsListWrapper
        className='flex-1'
        contests={contests}
        discipline={discipline}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        lastElementRef={lastElementRef}
      />
    </section>
  )
}

type ContestsListWrapperProps = ContestsListProps & {
  containerRef: React.RefObject<HTMLUListElement>
  fakeElementRef: React.RefObject<HTMLLIElement>
}
function ContestsListWrapper({
  className,
  contests,
  discipline,
  pageSize,
  containerRef,
  fakeElementRef,
  lastElementRef,
}: ContestsListWrapperProps) {
  if (contests?.length === 0) {
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
    <div className={cn('flex flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3', className)}>
      <ContestsListHeader className='sm:hidden' />
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <ContestRowSkeleton ref={fakeElementRef} className='invisible fixed' aria-hidden />
        <ContestsList lastElementRef={lastElementRef} contests={contests} discipline={discipline} pageSize={pageSize} />
      </ul>
    </div>
  )
}

type ContestsListProps = {
  className?: string
  contests?: ContestsListDTO['contests']
  discipline: Discipline
  pageSize?: number
  lastElementRef?: (node?: Element | null) => void
}
function ContestsList({ contests, discipline, pageSize, lastElementRef }: ContestsListProps) {
  if (pageSize === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ContestSkeleton key={index} />)
  }

  return contests.map(({ contestNumber, id, endDate, startDate }, index) => (
    <Contest
      ref={index === contests.length - 1 ? lastElementRef : undefined}
      key={id}
      contest={{ id, contestNumber, start: startDate, end: endDate }}
      discipline={discipline}
    />
  ))
}
