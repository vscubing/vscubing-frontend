import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, Pagination } from '@/components/ui'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { getContestsQuery } from '..'
import { useQuery } from '@tanstack/react-query'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useEffect } from 'react'
import type { ContestListItemDTO, ContestsListDTO } from '../api'
import type { Discipline } from '@/types'
import { ContestsListHeader, Contest, ContestSkeleton } from '../components'

const route = new RouteApi({ id: '/contests/' })
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
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Explore contests' />
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
          <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
            <Contest contest={FAKE_CONTEST} discipline={discipline} />
          </li>
          <ContestsList contests={data?.contests} discipline={discipline} pageSize={pageSize} />
        </ul>
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

const FAKE_CONTEST: ContestListItemDTO = {
  id: 0,
  start: '2021-08-01T00:00:00.000Z',
  end: '2021-08-01T00:00:00.000Z',
  contestNumber: 0,
  ongoing: false,
}
