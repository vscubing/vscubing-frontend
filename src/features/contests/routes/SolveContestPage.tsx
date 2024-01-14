import { Link, RouteApi } from '@tanstack/react-router'
import { SolveContest } from '../components/solveContest'
import { Header } from '@/components/layout'
import { NavigateBackButton } from '@/components/NavigateBackButton'
import { CubeButton, HintPage, PrimaryButton, SignInButton } from '@/components/ui'
import { useLocalStorage } from 'usehooks-ts'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'

const route = new RouteApi({ id: '/contests/$contestNumber/solve' })
export function SolvePage() {
  return (
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Ongoing contest' /* TODO: add start/end date */ />
      <NavigateBackButton className='self-start' />
      <PageContent />
    </section>
  )
}

function PageContent() {
  const { contestNumber, discipline } = route.useLoaderData()
  const [hasSeenOngoingHint, setHasSeenOngoingHint] = useLocalStorage('vs-hasSeenOngoingHint', false)
  const { data: user } = useQuery(userQuery)

  if (!user) {
    return (
      <div>
        <p>You need to be signed in to participate in a contest</p>
        <SignInButton variant='primary' />
      </div>
    )
  }

  if (!hasSeenOngoingHint) {
    return (
      <HintPage>
        <p className='mb-10'>
          You can't see results of an ongoing round until you solve all scrambles or the round ends
        </p>
        <PrimaryButton onClick={() => setHasSeenOngoingHint(true)}>Got it</PrimaryButton>
      </HintPage>
    )
  }

  return (
    <>
      <div className='flex items-center justify-between rounded-xl bg-black-80 p-4'>
        <Link from={route.id} search={{ discipline: '3by3' }} params={true}>
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
      </div>
      <div className='flex flex-1 flex-col gap-1 rounded-xl bg-black-80 p-6'>
        <SolveContest contestNumber={contestNumber} discipline={discipline} />
      </div>
    </>
  )
}
