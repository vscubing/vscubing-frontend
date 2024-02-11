import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, Pagination } from '@/components/ui'
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
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
    <section className='contents'>
      <Header caption='Explore contests' />
      <div className='flex flex-col gap-3'>
        <NavigateBackButton className='self-start' />
        <div className='flex items-center justify-between rounded-xl bg-black-80 p-4'>
          <Link from={route.id} search={{ discipline: '3by3' }}>
            <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
          </Link>
          <Pagination currentPage={page} totalPages={data?.totalPages} />
        </div>
        <div className='flex flex-1 flex-col gap-1 rounded-xl bg-black-80 p-6'>
          <ContestsListHeader />
          <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
            <ContestSkeleton ref={fakeElementRef} className='invisible fixed' aria-hidden />
            <ContestsList contests={data?.contests} discipline={discipline} pageSize={pageSize} />
          </ul>
        </div>
      </div>
    </section>
  )
}

function ContestsList({
  contests,
  discipline,
  pageSize,
}: {
  contests?: ContestsListDTO['contests']
  discipline: Discipline
  pageSize?: number
}) {
  if (pageSize === undefined) {
    return null
  }
  if (contests === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <ContestSkeleton key={index} />)
  }
  if (contests.length === 0) {
    return 'Seems like there are no contests hmm...' // TODO: add empty state
  }

  return contests.map((contest) => <Contest key={contest.id} contest={contest} discipline={discipline} />)
}
