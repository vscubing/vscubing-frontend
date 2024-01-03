import { Header } from '@/components/layout'
import { AdaptiveResultsList } from '../components'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { CubeButton, Pagination } from '@/components/ui'
import { ResultsHeader } from '../components/Result'
import { getLeaderboardQuery } from '../api'
import { useEffect, useState } from 'react'

const route = new RouteApi({ id: '/leaderboard/$discipline' })
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const search = route.useSearch()
  const navigate = useNavigate()

  const { discipline } = route.useLoaderData()
  const [pageSize, setPageSize] = useState<number>()

  const query = getLeaderboardQuery({
    discipline,
    page: search.page,
    pageSize: pageSize ?? 0,
    isEnabled: pageSize !== undefined,
  })

  const { data: leaderboard, error } = useQuery(query)

  useEffect(() => {
    if (error?.response?.status === 400) {
      void navigate({ search: { page: 1 } })
    }
  }, [error?.response?.status, navigate])

  const caption = user ? `${user.username}, check out our best solves` : 'Check out our best solves'

  return (
    <section className='flex h-full flex-col'>
      <Header caption={caption} />
      <NavigateBackButton className='my-3 self-start' />
      <div className='mb-3 flex items-center justify-between rounded-2xl bg-black-80 p-4'>
        <Link
          activeOptions={{ includeSearch: false }}
          search={{ page: 1 }}
          to='/leaderboard/$discipline'
          params={{ discipline: '3by3' }}
        >
          {({ isActive }) => <CubeButton asButton={false} cube='3by3' isActive={isActive} />}
        </Link>
        <Pagination currentPage={search.page} totalPages={leaderboard?.totalPages} />
      </div>
      <div className='flex flex-1 flex-col rounded-2xl bg-black-80 p-6'>
        <ResultsHeader className='mb-1' />
        <AdaptiveResultsList onPageSizeChange={setPageSize} results={leaderboard?.results} />
      </div>
    </section>
  )
}
