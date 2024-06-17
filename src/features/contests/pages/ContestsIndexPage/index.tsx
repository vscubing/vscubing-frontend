import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { matchesQuery } from '@/utils'
import type { ContestDTO, Discipline } from '@/types'
import { getInfiniteContestsQuery } from '../../api'
import { type ReactNode } from 'react'
import { ContestsListHeader } from './ContestsListHeader'
import { AutofillHeight, type ListWrapperProps, type ListProps } from '@/features/autofillHeight'
import { HintSection, NavigateBackButton, PageTitleMobile, Pagination } from '@/components/shared'

import { ContestRowSkeleton as ContestSkeletonDesktop, ContestRow as ContestDesktop } from './Contest'
import { Contest as ContestMobile, ContestSkeleton as ContestSkeletonMobile, useContests } from '@/shared/contests'

const Contest = matchesQuery('sm') ? ContestMobile : ContestDesktop
const ContestSkeleton = matchesQuery('sm') ? ContestSkeletonMobile : ContestSkeletonDesktop

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithInfiniteScroll() {
  const { discipline } = route.useSearch()

  const { fittingCount: pageSize, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const query = getInfiniteContestsQuery({ discipline, pageSize })
  const { data, lastElementRef } = AutofillHeight.useInfiniteScroll(query)

  return (
    <View discipline={discipline}>
      <ContestsList
        list={data?.pages.flatMap((page) => page.contests!)}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
        lastElementRef={lastElementRef}
      />
    </View>
  )
}

function ControllerWithPagination() {
  const { discipline, page } = route.useSearch()

  const { fittingCount: limit, containerRef, fakeElementRef } = AutofillHeight.useFittingCount()
  const { data, error } = useContests({
    discipline,
    pagination: {
      page,
      limit: limit ?? 0,
    },
    enabled: limit !== undefined,
  })

  if (error?.response?.status === 404) {
    return <Navigate search={(prev) => ({ ...prev, page: 1 })} />
  }

  const totalPages = data?.count && limit && Math.ceil(data?.count / limit) // TODO: fix after api is updated
  return (
    <View withPagination totalPages={totalPages} page={page} discipline={discipline}>
      <ContestsList list={data?.results} pageSize={limit} containerRef={containerRef} fakeElementRef={fakeElementRef} />
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
        <Link search={{ page: 1, discipline: '3by3' }}>
          <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {withPagination && <Pagination currentPage={page} totalPages={totalPages} className='ml-auto' />}
      </SectionHeader>
      {children}
    </section>
  )
}

type ContestsListProps = Pick<ListWrapperProps, 'containerRef' | 'fakeElementRef'> &
  Pick<ListProps<ContestDTO>, 'pageSize' | 'lastElementRef' | 'list'>
function ContestsList({ list, pageSize, containerRef, fakeElementRef, lastElementRef }: ContestsListProps) {
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
          renderSkeleton={() => <ContestSkeleton />}
          renderItem={(contest) => <Contest discipline={discipline} contest={contest} />}
        />
      </AutofillHeight.ListWrapper>
    </div>
  )
}
