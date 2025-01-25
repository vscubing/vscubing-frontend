import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import {
  CubeSwitcher,
  Dialog,
  DialogOverlay,
  DialogPortal,
  ExclamationCircleIcon,
  LoadingSpinner,
  PrimaryButton,
} from '@/components/ui'
import { useLocalStorage } from 'usehooks-ts'
import { Header, SectionHeader } from '@/components/layout'
import { useSolveContestState } from './api'
import { SolveContestForm } from './components/SolveContestForm'
import { isTouchDevice, matchesQuery } from '@/utils'
import { NotFoundRedirect } from '@/features/NotFoundPage'
import { useOngoingContest, useOngoingContestDuration } from '@/shared/contests'
import { useUser } from '@/features/auth'
import { HintSection, HintSignInSection } from '@/shared/HintSection'
import { KeyMapDialogTrigger, KeyMapDialogContent } from '@/shared/KeyMapDialog'
import { NavigateBackButton } from '@/shared/NavigateBackButton'

const route = getRouteApi('/_app/contests/$contestSlug/solve')
export function SolveContestPage() {
  const duration = useOngoingContestDuration()
  const title = <>Ongoing contest {duration && <span className='whitespace-nowrap'>({duration})</span>}</>

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header title={title} />
      <h1 className='title-h2 hidden text-secondary-20 lg:block'>{title}</h1>

      <NavigateBackButton className='self-start' />
      <SolvePageContent />
    </section>
  )
}

export function SolvePageContent() {
  const { contestSlug } = route.useParams()
  const { discipline: currentDiscipline } = route.useSearch()
  const { data: user, isFetching: isUserFetching } = useUser()

  const [hasSeenOngoingHint, setHasSeenOngoingHint] = useLocalStorage('vs-hasSeenOngoingHint', false)
  const {
    data: state,
    error,
    isFetching: isStateFetching,
  } = useSolveContestState({ disciplineSlug: currentDiscipline, contestSlug })
  const errorStatus = error?.response?.status
  const { data: metadata } = useOngoingContest()

  if (errorStatus === 403 && user?.isVerified) {
    // user?.isVerified prevents a redirect cycle
    return (
      <Navigate
        to='/contests/$contestSlug/results'
        params={{ contestSlug: contestSlug }}
        search={{ discipline: currentDiscipline, page: 1 }}
        replace
      />
    )
  }

  if (errorStatus === 404) {
    return <NotFoundRedirect />
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

  if (!state || isUserFetching || user?.isVerified === false) {
    return (
      <div className='flex flex-1 items-center justify-center rounded-2xl bg-black-80'>
        <LoadingSpinner />
      </div>
    )
  }

  if ((!state.submittedSolveSet || state.submittedSolveSet.length === 0) && !hasSeenOngoingHint) {
    return (
      <HintSection>
        <p>You can't see the results of an ongoing round until you solve all scrambles or the round ends</p>
        <PrimaryButton onClick={() => setHasSeenOngoingHint(true)}>Got it</PrimaryButton>
      </HintSection>
    )
  }

  return (
    <>
      <SectionHeader>
        <div className='flex gap-3'>
          {metadata?.data?.disciplineSet.map(({ slug: discipline }) => (
            <Link from='/contests/$contestSlug/solve' search={{ discipline }} params={{ contestSlug }} key={discipline}>
              <CubeSwitcher asButton={false} cube={discipline} isActive={currentDiscipline === discipline} />
            </Link>
          ))}
        </div>
        <div className='ml-10 flex flex-1 items-center gap-4'>
          <ExclamationCircleIcon />
          <p>You can't see the results of an ongoing round until you solve all scrambles or the round ends</p>
        </div>
      </SectionHeader>

      <div className='relative flex flex-1 flex-col rounded-2xl bg-black-80 pb-8 pt-7 xl-short:pb-6 xl-short:pt-4'>
        <Dialog>
          <KeyMapDialogTrigger className='absolute right-4 top-4' />
          <DialogPortal>
            <DialogOverlay className='bg-black-1000/40' withCubes={false} />
            <KeyMapDialogContent />
          </DialogPortal>
        </Dialog>

        <p className='title-h2 mb-6 text-center text-secondary-20'>You have five attempts to solve the contest</p>
        <SolveContestForm state={state} isStateFetching={isStateFetching} />
      </div>
    </>
  )
}
