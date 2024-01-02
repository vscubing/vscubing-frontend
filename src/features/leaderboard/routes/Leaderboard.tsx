import { Header } from '@/components/layout'
import { ResultsList } from '../components'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Link, RouteApi } from '@tanstack/react-router'
import { CubeButton } from '@/components/ui'
import { ResultsHeader } from '../components/Result'

const route = new RouteApi({ id: '/leaderboard/$discipline' })
export function Leaderboard() {
  const { data: user } = useQuery(userQuery)

  const query = route.useLoaderData()
  const params = route.useParams()
  const { data } = useQuery(query)

  const caption = user ? `${user.username}, check out our best solves` : 'Check out our best solves'
  return (
    <section className='flex h-full flex-col'>
      <Header caption={caption} />
      <NavigateBackButton className='my-3 self-start' />
      <div className='mb-3 rounded-2xl bg-black-80 p-4'>
        <Link to='/leaderboard/$discipline' params={{ discipline: '3by3' }}>
          <CubeButton asButton={false} cube='3by3' active={params.discipline === '3by3'} />
        </Link>
      </div>
      <div className='flex flex-1 flex-col rounded-2xl bg-black-80 p-6'>
        <ResultsHeader className='mb-1' />
        <ResultsList results={data?.results} ownResult={data?.ownResult ?? undefined} />
      </div>
    </section>
  )
}
