import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, HintSection, Pagination } from '@/components/ui'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cn, useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useEffect } from 'react'
import type { Discipline } from '@/types'
import { getContestsQuery, type ContestsListDTO } from '../../api'
import { ContestSkeleton, Contest } from './Contest'
import { ContestsListHeader } from './ContestsListHeader'

const route = getRouteApi('/contests/')
export function ContestsIndexPage() {
  const { page, discipline } = route.useLoaderData()
  const navigate = useNavigate({ from: route.id })
  const { fittingCount: pageSize, containerRef, fakeElementRef } = useAutofillHeight()
  const debouncedPageSize = useDebounceAfterFirst(pageSize)

  const query = getContestsQuery({
    discipline,
    page,
    pageSize: debouncedPageSize ?? 0,
    isEnabled: debouncedPageSize !== undefined,
  })

  const { data, error } = useQuery(query)

  useEffect(() => {
    if (error?.response?.status === 400) {
      void navigate({ from: route.id, params: { discipline }, search: { page: 1 } })
    }
  }, [error?.response?.status, navigate, discipline])

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header caption={<h1>Explore contests</h1>} />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>Explore contests</h1>
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-2xl bg-black-80 p-4'>
        <Link from={route.id} search={{ discipline: '3by3' }}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      </div>
      <ContestsListWrapper
        className='flex-1'
        contests={data?.contests}
        discipline={discipline}
        pageSize={debouncedPageSize}
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
    <div className={cn('flex flex-col gap-1 rounded-2xl bg-black-80 p-6', className)}>
      <ContestsListHeader />
      <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
        <ContestSkeleton ref={fakeElementRef} className='invisible fixed' aria-hidden />
        <ContestsList contests={contests} discipline={discipline} pageSize={pageSize} />
      </ul>
    </div>
  )
}

type ContestsListProps = {
  contests?: ContestsListDTO['contests']
  discipline: Discipline
  pageSize?: number
}
function ContestsList({ contests, discipline, pageSize }: ContestsListProps) {
  if (pageSize === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ContestSkeleton key={index} />)
  }

  return contests.map((contest) => <Contest key={contest.id} contest={contest} discipline={discipline} />)
}
