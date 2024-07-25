import { NavigateBackButton } from '@/components/shared'
import { Header, SectionHeader } from '@/components/layout'
import { CubeBadge, LoadingSpinner, SecondaryButton, ShareIcon } from '@/components/ui'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { copyToClipboard, formatSolveTime } from '@/utils'
import { z } from 'zod'
import { useReconstruction } from '../../api'
import { Suspense, lazy } from 'react'
import { toast } from '@/components/ui'
import { Discipline } from '@/types'
const TwistySection = lazy(() => import('./TwistySection.lazy'))

const route = getRouteApi('/contests/$contestSlug/watch/$solveId')
export function WatchSolvePage() {
  const params = route.useParams()
  const search = route.useSearch()

  const { data: res, error } = useReconstruction(Number(params.solveId))

  if (error?.response?.status === 404) {
    return <Navigate to='/404' replace />
  }

  if (res && (res.contest.slug !== params.contestSlug || res.discipline.slug !== search.disciplineSlug)) {
    return (
      <Navigate
        from={route.id}
        to={route.id}
        params={{ contestSlug: res.contest.slug, solveId: params.solveId }}
        search={{ disciplineSlug: res.discipline.slug as Discipline }}
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
    <section className='flex flex-1 flex-col gap-3'>
      <Header title='Watch the solution' />

      <NavigateBackButton className='self-start' />
      <div className='grid flex-1 grid-cols-[1.22fr_1fr] grid-rows-[min-content,1fr] gap-3 lg:grid-cols-2 sm:grid-cols-1 sm:grid-rows-[min-content,min-content,1fr]'>
        <SectionHeader className='gap-8'>
          <CubeBadge cube='3by3' />
          <div>
            <Link
              to='/contests/$contestSlug'
              // @ts-expect-error this error will disappear once we remove the unnecessary type safety on discipline param here
              search={{ discipline: res?.discipline?.slug! }}
              className='title-h2 mb-1 text-secondary-20'
            >
              Contest {res?.contest.slug}
            </Link>
            <p className='text-large'>Scramble {expandScramblePosition('E1')}</p>
            {/* TODO: replace mock scramble position */}
          </div>
        </SectionHeader>
        <div className='flex items-center justify-between rounded-2xl bg-black-80 px-4 py-2'>
          <div className='sm:min-h-14'>
            <p className='title-h3 mb-1'>{res?.user.username}</p>
            <p className='text-large text-grey-20'>{res ? formatSolveTime(res.timeMs) : null}</p>
          </div>
          <SecondaryButton size='iconSm' onClick={copyWatchSolveLink}>
            <ShareIcon />
          </SecondaryButton>
        </div>

        <Suspense
          fallback={
            <div className='col-span-full flex items-center justify-center rounded-2xl bg-black-80'>
              <LoadingSpinner />
            </div>
          }
        >
          <TwistySection scramble={res?.scramble.moves} solution={res?.reconstruction.replace(/\/\*\d+?\*\//g, '')} />
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
