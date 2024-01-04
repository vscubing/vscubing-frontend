import { Header } from '@/components/layout'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { CubeButton, Pagination } from '@/components/ui'
import { FAKE_RESULT, Result, ResultSkeleton, ResultsHeader } from '../components'
import { getLeaderboardQuery } from '../api'
import { useEffect } from 'react'
import { AutofillHeightList } from '@/components/AutofillHeightList'
import { useDebounceAfterFirst } from '@/utils'

const route = new RouteApi({ id: '/leaderboard/$discipline' })
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const navigate = useNavigate({ from: route.id })

  const { discipline, page } = route.useLoaderData()
  const [debouncedPageSize, setPageSize] = useDebounceAfterFirst<number>(200)

  const query = getLeaderboardQuery({
    discipline,
    page,
    pageSize: debouncedPageSize ?? 0,
    isEnabled: debouncedPageSize !== undefined,
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
        <Pagination currentPage={page} totalPages={leaderboard?.totalPages} />
      </div>
      <div className='flex flex-1 flex-col rounded-2xl bg-black-80 p-6'>
        <ResultsHeader className='mb-1' />
        <AutofillHeightList
          Item={Result}
          ItemSkeleton={ResultSkeleton}
          items={leaderboard?.results}
          fakeItem={FAKE_RESULT}
          onFittingCountChange={setPageSize}
        />
      </div>
    </section>
  )
}
