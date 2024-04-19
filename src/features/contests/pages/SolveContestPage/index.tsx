import { Link, Navigate, getRouteApi, notFound } from '@tanstack/react-router'
import { CubeSwitcher, ExclamationCircleIcon, LoadingSpinner, PrimaryButton, UnderlineButton } from '@/components/ui'
import { useLocalStorage } from 'usehooks-ts'
import { useQuery } from '@tanstack/react-query'
import { Header, SectionHeader } from '@/components/layout'
import { solveContestStateQuery } from './api'
import { SolveContestForm } from './components/SolveContestForm'
import { isTouchDevice, matchesQuery } from '@/utils'
import { NavigateBackButton, HintSection, HintSignInSection } from '@/components/shared'

const route = getRouteApi('/contests/$contestSlug/solve')
export function SolveContestPage() {
  const title = (
    <>
      Ongoing contest <span className='whitespace-nowrap'>(17 Dec 2023 - 23 Dec 2023)</span>
    </>
  )

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header title={title} /* TODO: add start/end date once backend is updated */ />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>{title}</h1>

      <NavigateBackButton className='self-start' />
      <SolvePageContent />
    </section>
  )
}

export function SolvePageContent() {
  const { contestSlug } = route.useParams()
  const { discipline } = route.useSearch()

  const [hasSeenOngoingHint, setHasSeenOngoingHint] = useLocalStorage('vs-hasSeenOngoingHint', false)
  const { data: state, error } = useQuery(solveContestStateQuery(contestSlug, discipline))
  const errorStatus = error?.response?.status

  if (errorStatus === 403) {
    return (
      <Navigate
        to='/contests/$contestSlug/results'
        params={{ contestSlug: String(contestSlug) }}
        search={{ discipline, page: 1 }}
        replace
      />
    )
  }

  if (errorStatus === 404) {
    throw notFound()
  }

  if (isTouchDevice) {
    return (
      <HintSection>
        <p>Solving from mobile devices is currently not supported</p>
        <PrimaryButton asChild size={matchesQuery('sm') ? 'sm' : 'lg'} className='sm:self-stretch'>
          <Link to='/'>Go to dashboard</Link>
        </PrimaryButton>
      </HintSection>
    )
  }

  if (errorStatus === 401) {
    return <HintSignInSection description='You need to be signed in to participate in a contest' />
  }

  if (!state) {
    return (
      <div className='flex flex-1 items-center justify-center rounded-2xl bg-black-80'>
        <LoadingSpinner />
      </div>
    )
  }

  if (state.submittedSolves.length === 0 && !hasSeenOngoingHint) {
    return (
      <HintSection>
        <p>You can't see results of an ongoing round until you solve all scrambles or the round ends</p>
        <PrimaryButton onClick={() => setHasSeenOngoingHint(true)}>Got it</PrimaryButton>
      </HintSection>
    )
  }

  return (
    <>
      <SectionHeader>
        <div>
          <Link from={route.id} search={{ discipline: '3by3' }} params={{ contestSlug: String(contestSlug) }}>
            <CubeSwitcher asButton={false} cube='3by3' isActive={discipline === '3by3'} />
          </Link>
        </div>
        <div className='ml-10 flex flex-1 items-center gap-4'>
          <ExclamationCircleIcon />
          <p>You can't see results of an ongoing round until you solve all scrambles or the round ends</p>
        </div>
      </SectionHeader>

      <div className='relative flex flex-1 flex-col rounded-2xl bg-black-80 pb-8 pt-7 xl-short:pb-6 xl-short:pt-4'>
        <UnderlineButton size='sm' className='absolute right-4 top-4' /* TODO: add the instructions modal */>
          Virtual Cube Key Map
        </UnderlineButton>
        <p className='title-h2 mb-6 text-center text-secondary-20'>You have five attempts to solve the contest</p>
        <SolveContestForm contestSlug={contestSlug} discipline={discipline} state={state} />
      </div>
    </>
  )
}
