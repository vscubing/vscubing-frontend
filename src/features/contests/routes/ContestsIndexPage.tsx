import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, CubeIcon, Pagination, SecondaryButton } from '@/components/ui'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { getContestsQuery } from '..'
import { useQuery } from '@tanstack/react-query'
import { useAutofillHeight, useDebounceAfterFirst } from '@/utils'
import { useEffect } from 'react'
import type { ContestsListDTO } from '../api'
import type { Discipline } from '@/types'
import dayjs from 'dayjs'

const route = new RouteApi({ id: '/contest/' })
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
      void navigate({ search: { page: 1 } })
    }
  }, [error?.response?.status, navigate])

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

function ContestsListHeader() {
  return (
    <div className='flex justify-between bg-black-80 pl-3 text-grey-40'>
      <span className='mr-3'>Type</span>
      <span className='mr-8 flex-1'>Contest name</span>
      <span className='mr-10 w-44'>Duration</span>
      <SecondaryButton aria-hidden className='invisible h-px'>
        view contest
      </SecondaryButton>
    </div>
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

function Contest({ contest, discipline }: { contest: ContestsListDTO['contests'][number]; discipline: Discipline }) {
  return (
    <div className='flex h-15 items-center justify-between rounded-xl bg-grey-100 pl-4 text-lg'>
      <CubeIcon cube='3by3' className='mr-4' />
      <span className='relative mr-4 flex-1 pr-4 pt-[.2em] after:absolute after:right-0 after:top-1/2 after:h-6 after:w-px after:-translate-y-1/2 after:bg-grey-60'>
        Contest {contest.contestNumber}
      </span>
      <span className='mr-10 w-44 pt-[.2em]'>
        {formatDate(contest.start)} - {formatDate(contest.end!) /* TODO: remove type assertion */}
      </span>
      <SecondaryButton asChild>
        <Link
          to='/contest/$contestNumber/$discipline'
          params={{ contestNumber: String(contest.contestNumber), discipline }}
        >
          view contest
        </Link>
      </SecondaryButton>
    </div>
  )
}

function formatDate(date: string) {
  return dayjs(date).format('DD.MM.YYYY')
}

function ContestSkeleton() {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100'></div>
}

const FAKE_CONTEST: ContestsListDTO['contests'][number] = {
  id: 0,
  start: '2021-08-01T00:00:00.000Z',
  end: '2021-08-01T00:00:00.000Z',
  contestNumber: 0,
  ongoing: false,
}
