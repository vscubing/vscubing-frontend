import { Link, RouteApi } from '@tanstack/react-router'
import { SolveContest } from '../components/solveContest'
import {
  CubeButton,
  ExclamationCircleIcon,
  HintSection,
  PrimaryButton,
  SignInButton,
  UnderlineButton,
} from '@/components/ui'
import { useLocalStorage } from 'usehooks-ts'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout'
import { NavigateBackButton } from '@/components/NavigateBackButton'

const route = new RouteApi({ id: '/contests/$contestNumber/solve' })
export function SolveContestPage() {
  return (
    <section className='flex h-full flex-col gap-3'>
      <Header
        caption='Ongoing contest (17 Dec 2023 - 23 Dec 2023)' /* TODO: add start/end date once backend is updated */
      />
      <NavigateBackButton className='self-start' />
      <SolvePageContent />
    </section>
  )
}

export function SolvePageContent() {
  const { contestNumber, discipline } = route.useLoaderData()
  const [hasSeenOngoingHint, setHasSeenOngoingHint] = useLocalStorage('vs-hasSeenOngoingHint', false)
  const { data: user } = useQuery(userQuery)

  if (!user) {
    return (
      <HintSection>
        <p className='mb-10'>You need to be signed in to participate in a contest</p>
        <SignInButton variant='primary' />
      </HintSection>
    )
  }

  if (!hasSeenOngoingHint) {
    return (
      <HintSection>
        <p className='mb-10'>
          You can't see results of an ongoing round until you solve all scrambles or the round ends
        </p>
        <PrimaryButton onClick={() => setHasSeenOngoingHint(true)}>Got it</PrimaryButton>
      </HintSection>
    )
  }

  return (
    <>
      <div className='flex min-h-[5.75rem] items-center justify-between gap-10 rounded-xl bg-black-80 px-4'>
        <div>
          <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestNumber: String(contestNumber) }}>
            <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
          </Link>
        </div>
        <div className='flex flex-1 items-center gap-4'>
          <ExclamationCircleIcon />
          <p>You can't see results of an ongoing round until you solve all scrambles or the round ends</p>
        </div>
      </div>
      <div className='relative flex flex-1 flex-col gap-10 rounded-xl bg-black-80 px-16 py-16 pb-10'>
        <UnderlineButton className='absolute right-4 top-4' /* TODO: add the instructions modal */>
          Virtual Cube Key Map
        </UnderlineButton>
        <p className='title-h2 text-center text-secondary-20'>You have five attempts to solve the contest</p>
        <SolveContest contestNumber={contestNumber} discipline={discipline} />
      </div>
    </>
  )
}
