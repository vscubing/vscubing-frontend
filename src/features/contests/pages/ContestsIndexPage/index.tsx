import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, HintSection, Pagination } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cn, matchesQuery, useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import type { Discipline } from '@/types'
import { getContestsQuery, type ContestsListDTO } from '../../api'
import { ContestRowSkeleton, ContestRow } from './Contest'
import { ContestsListHeader } from './ContestsListHeader'
import { Contest as ContestMobile, ContestSkeleton as ContestMobileSkeleton } from '@/components/Contest'

const Contest = matchesQuery('sm') ? ContestMobile : ContestRow
const ContestSkeleton = matchesQuery('sm') ? ContestMobileSkeleton : ContestRowSkeleton

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  return matchesQuery('sm') ? <ControllerWithInfiniteScroll /> : <ControllerWithPagination />
}

function ControllerWithInfiniteScroll() {
  const { page, discipline } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()

  const query = getContestsQuery({
    discipline,
    page: 1,
    pageSize: 1000,
    isEnabled: true,
  })
  const { data } = useQuery(query)

  if (page !== 1) {
    return <Navigate from={route.id} params={discipline} search={{ page: 1 }} />
  }

  return (
    <View
      behavior='infinite-scroll'
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

function ControllerWithPagination() {
  const { page, discipline } = route.useLoaderData()
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const debouncedPageSize = useDebounceAfterFirst(pageSize)

  const query = getContestsQuery({
    discipline,
    page,
    pageSize: debouncedPageSize ?? 0,
    isEnabled: debouncedPageSize !== undefined,
  })

  const { data, error } = useQuery(query)

  if (error?.response?.status === 400) {
    return <Navigate from={route.id} params={discipline} search={{ page: 1 }} />
  }

  return (
    <View
      behavior='pagination'
      contests={data?.contests}
      totalPages={data?.totalPages}
      page={page}
      pageSize={debouncedPageSize}
      discipline={discipline}
      containerRef={containerRef}
      fakeElementRef={fakeElementRef}
    />
  )
}

type ViewProps = ContestsListWrapperProps & { page?: number; totalPages?: number }
function View({ behavior, page, contests, discipline, pageSize, totalPages, containerRef, fakeElementRef }: ViewProps) {
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header caption={<h1>Explore contests</h1>} />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>Explore contests</h1>
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-2xl bg-black-80 p-4 sm:p-3'>
        <Link from={route.id} search={{ discipline: '3by3' }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        {behavior === 'pagination' && <Pagination currentPage={page ?? 1} totalPages={totalPages ?? 1} />}
      </div>
      <ContestsListWrapper
        behavior={behavior}
        className='flex-1'
        contests={contests}
        discipline={discipline}
        pageSize={pageSize}
        containerRef={containerRef}
        fakeElementRef={fakeElementRef}
      />
    </section>
  )
}

type ContestsListWrapperProps = {
  className?: string
  containerRef: React.RefObject<HTMLUListElement>
  fakeElementRef: React.RefObject<HTMLLIElement>
} & ContestsListProps
function ContestsListWrapper({
  behavior,
  className,
  contests,
  discipline,
  pageSize,
  containerRef,
  fakeElementRef,
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
        <ContestsList behavior={behavior} contests={contests} discipline={discipline} pageSize={pageSize} />
      </ul>
    </div>
  )
}

type ContestsListProps = {
  className?: string
  contests?: ContestsListDTO['contests']
  discipline: Discipline
  pageSize?: number
  behavior: 'pagination' | 'infinite-scroll'
}
function ContestsList({ contests, discipline, pageSize }: ContestsListProps) {
  if (pageSize === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ContestSkeleton key={index} />)
  }

  return contests.map(({ contestNumber, id, endDate, startDate }) => (
    <Contest key={id} contest={{ id, contestNumber, start: startDate, end: endDate }} discipline={discipline} />
  ))
}
