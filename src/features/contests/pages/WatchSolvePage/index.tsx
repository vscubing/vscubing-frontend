import { NavigateBackButton } from '@/components/shared'
import { Header, SectionHeader } from '@/components/layout'
import { CubeBadge, LoadingSpinner, SecondaryButton, ShareIcon } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Navigate, getRouteApi } from '@tanstack/react-router'
import { copyToClipboard, formatSolveTime } from '@/utils'
import { z } from 'zod'
import { reconstructionQuery } from '../../api'
import { Suspense, lazy } from 'react'
import { toast } from '@/components/ui'
const TwistySection = lazy(() => import('./TwistySection.lazy'))

const route = getRouteApi('/contests/$contestNumber/watch/$solveId')
export function WatchSolvePage() {
  const { contestNumber, discipline, solveId } = route.useLoaderData()

  const { data: reconstruction, error } = useQuery(reconstructionQuery(solveId))

  let scramble = reconstruction?.scramble.scramble
  let solution = reconstruction?.reconstruction.replace(/\/\*\d+?\*\//g, '')

  if (error?.response?.status === 404) {
    // TODO: add a 404 page

    scramble = `F U2 L2 B2 F' U L2 U R2 D2 L' B L2 B' R2 U2`
    solution = `y x' // inspection
                U R2 U' F' L F' U' L' // XX-Cross + EO
                U' R U R' // 3rd slot
                R' U R U2' R' U R // 4th slot
                U R' U' R U' R' U2 R // OLL / ZBLL
                U // AUF

                // this is a mock reconstruction from http://cubesolv.es/solve/5757`
  }

  if (
    reconstruction &&
    (reconstruction.contestNumber !== contestNumber || reconstruction.discipline.name !== discipline)
  ) {
    return (
      <Navigate
        from={route.id}
        to={route.id}
        params={{ contestNumber: String(reconstruction.contestNumber), solveId }}
        search={{ discipline: reconstruction.discipline.name }}
      />
    )
  }

  function copyWatchSolveLink() {
    copyToClipboard(window.location.href).then(
      // TODO: replace with a toast
      () => toast({ title: 'Link copied', description: 'You can now share the link with your friends.' }),
      () =>
        toast({
          title: 'Uh-oh! An error occured while copying the link',
          description: 'Try changing permissions in your browser settings.',
        }),
    )
  }

  return (
    <section className='flex flex-1 flex-col gap-3'>
      <Header title='Watch solve' />

      <NavigateBackButton className='self-start' />
      <div className='grid flex-1 grid-cols-[1.22fr_1fr] grid-rows-[min-content,1fr] gap-3 lg:grid-cols-2 sm:grid-cols-1 sm:grid-rows-[min-content,min-content,1fr]'>
        <SectionHeader className='gap-8'>
          <CubeBadge cube='3by3' />
          <div>
            <p className='title-h2 mb-1 text-secondary-20'>Contest {contestNumber}</p>
            <p className='text-large'>
              Scramble {formatScramblePosition(reconstruction?.scramble.position).trim() || '1'}
              {/* TODO: remove mock */}
            </p>
          </div>
        </SectionHeader>
        <div className='flex items-center justify-between rounded-2xl bg-black-80 px-4 py-2'>
          <div className='sm:min-h-14'>
            <p className='title-h3 mb-1'>
              {reconstruction?.user.username ?? 'Yusheng Du'} {/* TODO: remove mock */}
            </p>
            <p className='text-large text-grey-20'>
              {getFormattedTimeFromSolution(reconstruction?.reconstruction).trim() || '00:03.470'}
              {/* TODO: remove mock */}
            </p>
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
          <TwistySection scramble={scramble} solution={solution} />
        </Suspense>
      </div>
    </section>
  )
}

function formatScramblePosition(position?: string): string {
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

function getFormattedTimeFromSolution(solution?: string): string {
  // TODO: remove this once we can get solve time from the backend
  if (!solution) {
    return ''
  }

  const withoutLastTwoChars = solution.slice(0, -2)
  const parts = withoutLastTwoChars.split('/*')
  const timeMs = Number(parts[parts.length - 1])
  if (isNaN(timeMs)) throw Error('invalid time in reconstruction')
  return formatSolveTime(Number(timeMs))
}
