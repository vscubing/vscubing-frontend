import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, HintSection, PageTitleMobile, Pagination } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cn, matchesQuery, useAutofillHeight, useControllerWithInfiniteScroll } from '@/utils'
import type { Discipline } from '@/types'
import { getContestsQuery, getInfiniteContestsQuery, type ContestsListDTO } from '../../api'
import { type ReactNode } from 'react'
import { ContestsListHeader } from './ContestsListHeader'

import { ContestRowSkeleton as ContestSkeletonDesktop, ContestRow as ContestDesktop } from './Contest'
import { Contest as ContestMobile, ContestSkeleton as ContestSkeletonMobile } from '@/components/Contest'
const Contest = matchesQuery('sm') ? ContestMobile : ContestDesktop
const ContestSkeleton = matchesQuery('sm') ? ContestSkeletonMobile : ContestSkeletonDesktop

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithInfiniteScroll() {
  const { discipline } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const query = getInfiniteContestsQuery({ discipline, pageSize })
  const { data, lastElementRef } = useControllerWithInfiniteScroll(query)

  return (
    <View discipline={discipline}>
      <ContestsList
        contests={data?.pages.flatMap((page) => page.contests!)}
        pageSize={pageSize}
        discipline={discipline}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        lastElementRef={lastElementRef}
      />
    </View>
  )
}

function ControllerWithPagination() {
  const { page, discipline } = route.useLoaderData()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const query = getContestsQuery({ discipline, page, pageSize })
  const { data, error } = useQuery(query)

  if (error?.response?.status === 400) {
    return <Navigate from={route.id} params={discipline} search={{ page: 1 }} />
  }

  return (
    <View withPagination totalPages={data?.totalPages} page={page} discipline={discipline}>
      <ContestsList
        contests={data?.contests}
        pageSize={pageSize}
        discipline={discipline}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      />
    </View>
  )
}

type ViewProps = {
  page?: number
  totalPages?: number
  withPagination?: boolean
  discipline: Discipline
  children: ReactNode
}
function View({ withPagination = false, page, discipline, totalPages, children }: ViewProps) {
  const title = 'Explore contests'
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <Link from={route.id} search={{ discipline: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {withPagination && <Pagination currentPage={page} totalPages={totalPages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ContestsListProps = ContestsListInnerProps & {
  containerRef: React.RefObject<HTMLUListElement>
  fakeElementRef: React.RefObject<HTMLLIElement>
}
function ContestsList({
  className,
  contests,
  discipline,
  pageSize,
  containerRef,
  fakeElementRef,
  lastElementRef,
}: ContestsListProps) {
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
    <div className={cn('flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3', className)}>
      <ContestsListHeader className='sm:hidden' />
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <ContestSkeleton ref={fakeElementRef} className='invisible fixed' aria-hidden />
        <ContestsListInner
          lastElementRef={lastElementRef}
          contests={contests}
          discipline={discipline}
          pageSize={pageSize}
        />
      </ul>
    </div>
  )
}

type ContestsListInnerProps = {
  className?: string
  contests?: ContestsListDTO['contests']
  discipline: Discipline
  pageSize?: number
  lastElementRef?: (node?: Element | null) => void
}
function ContestsListInner({ contests, discipline, pageSize, lastElementRef }: ContestsListInnerProps) {
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
