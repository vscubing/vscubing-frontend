import { Header, SectionHeader } from '@/components/layout'
import { CubeBadge, LoadingSpinner, SecondaryButton, ShareIcon } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { copyToClipboard, formatSolveTime } from '@/utils'
import { z } from 'zod'
import { getReconstructionQuery } from '../../api'
import { Suspense, lazy } from 'react'
import { toast } from '@/components/ui'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import { useQuery } from '@tanstack/react-query'
const TwistySection = lazy(() => import('./TwistySection.lazy'))

const route = getRouteApi('/_app/contests/$contestSlug/watch/$solveId')
export function WatchSolvePage() {
  const params = route.useParams()
  const search = route.useSearch()

  const { data: res, error } = useQuery(getReconstructionQuery(Number(params.solveId)))

  if (error?.response?.status === 404) {
    return <Navigate to='/404' replace />
  }

  if (res && (res.contest.slug !== params.contestSlug || res.discipline.slug !== search.discipline)) {
    return (
      <Navigate
        to='/contests/$contestSlug/watch/$solveId'
        params={{ contestSlug: res.contest.slug, solveId: params.solveId }}
        search={{ discipline: res.discipline.slug }}
      />
    )
  }

  function copyWatchSolveLink() {
    copyToClipboard(window.location.href).then(
      () =>
        toast({
          title: 'Link copied',
          description: 'You can now share the link with your friends.',
          duration: 'short',
        }),
      () =>
        toast({
          title: 'Uh-oh! An error occured while copying the link',
          description: 'Try changing permissions in your browser settings.',
        }),
    )
  }

  return (
    <section className='flex flex-1 flex-col gap-3 animate-fade-in'>
      <Header title='Watch the solution' />

      <NavigateBackButton className='self-start hover-lift-subtle' />
      <div className='grid flex-1 grid-cols-[1.22fr_1fr] grid-rows-[min-content,1fr] gap-3 lg:grid-cols-2 sm:grid-cols-1 sm:grid-rows-[min-content,min-content,1fr]'>
        <SectionHeader className='gap-4'>
          <CubeBadge cube={search.discipline} />
          <div>
            <Link
              to='/contests/$contestSlug'
              search={{ discipline: search.discipline }}
              params={{ contestSlug: params.contestSlug }}
              className='title-h2 mb-1 text-gradient-subtle'
            >
              Contest {params.contestSlug}
            </Link>
            <p className='text-large'>Scramble {expandScramblePosition(res?.scramble.position)}</p>
          </div>
        </SectionHeader>
        <div className='flex items-center justify-between rounded-2xl glass-card px-4 py-2 animate-slide-up'>
          <div className='sm:min-h-14'>
            <p className='title-h3 mb-1 text-gradient-subtle'>{res?.user.username}</p>
            <p className='text-large text-grey-20'>{res ? formatSolveTime(res.timeMs) : null}</p>
          </div>
          <SecondaryButton size='iconSm' onClick={copyWatchSolveLink} className='hover-lift-subtle'>
            <ShareIcon />
          </SecondaryButton>
        </div>

        <Suspense
          fallback={
            <div className='col-span-full flex items-center justify-center rounded-2xl glass-card animate-slide-up'>
              <LoadingSpinner />
            </div>
          }
        >
          <TwistySection solveId={Number(params.solveId)} />
        </Suspense>
      </div>
    </section>
  )
}

function expandScramblePosition(position?: string): string {
  if (!position) {
    return ''
  }
  const result = z.enum(['1', '2', '3', '4', '5', 'E1', 'E2']).safeParse(position)
  if (!result.success) {
    throw Error('invalid scramble position')
  }
  if (result.data === 'E1') {
    return 'Extra 1'
  }
  if (result.data === 'E2') {
    return 'Extra 2'
  }
  return position
}
