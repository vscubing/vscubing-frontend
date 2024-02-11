import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, SecondaryButton, ShareIcon } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { Link, Navigate, getRouteApi } from '@tanstack/react-router'
import { TwistyScrubber, TwistyPlayer, TwistyAlgViewer, TwistyControls, TwistyTempo } from './twisty'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { formatSolveTime } from '@/utils'
import { z } from 'zod'
import { reconstructionQuery } from '../../api'

const route = getRouteApi('/contests/$contestNumber/watch/$solveId')
export function WatchSolvePage() {
  const { contestNumber, discipline, solveId } = route.useLoaderData()

  const { data: reconstruction, error } = useQuery(reconstructionQuery(solveId))

  const scramble = reconstruction?.scramble.scramble
  const solution = reconstruction?.reconstruction.replace(/\/\*\d+?\*\//g, '')

  const { player } = useTwistyPlayer(scramble, solution)

  if (error?.response?.status === 404) {
    alert('404') // TODO: add a 404 page
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
    navigator.clipboard.writeText(window.location.href).then(
      // TODO: replace with a toast
      () => alert('Link copied'),
      () => alert('An unexpected error occured while copying the link'),
    )
  }

  return (
    <section className='contents'>
      <Header caption={<h1>Watch solve</h1>} />
      <div className='flex flex-col gap-3'>
        <NavigateBackButton className='self-start' />
        <div className='grid flex-1 grid-cols-[11fr_9fr] grid-rows-[min-content,1fr] gap-3'>
          <div className='flex items-center gap-8 rounded-xl bg-black-80 p-4'>
            <Link
              from={route.id}
              params={{ contestNumber: String(contestNumber), solveId }}
              search={{ discipline: '3by3' }}
            >
              <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
            </Link>
            <div className='-my-2'>
              <p className='title-h2 mb-1 text-secondary-20'>
                Contest {reconstruction?.contestNumber /* TODO: replace with slug */}
              </p>
              <p className='text-lg'>Scramble {formatScramblePosition(reconstruction?.scramble.position)}</p>
            </div>
          </div>
          <div className='flex items-center justify-between rounded-xl bg-black-80 px-4 py-2'>
            <div>
              <p className='title-h3 mb-1'>{reconstruction?.user.username}</p>
              <p className='text-lg text-grey-20'>{getFormattedTimeFromSolution(reconstruction?.reconstruction)}</p>
            </div>
            <SecondaryButton onClick={copyWatchSolveLink}>
              <ShareIcon />
            </SecondaryButton>
          </div>
          {player && scramble && <TwistySection player={player} scramble={scramble} />}
        </div>
      </div>
    </section>
  )
}

function TwistySection({ player, scramble }: { player: Player; scramble: string }) {
  const movesWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrambleWrapperRef = useRef<HTMLDivElement | null>(null)
  const scrambleRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(
    function handleScrambleScrollableHeight() {
      if (!scrambleWrapperRef.current || !scrambleRef.current || !movesWrapperRef.current) {
        return
      }
      const wrapperHeight = movesWrapperRef.current.clientHeight
      const scrambleHeight = scrambleRef.current.offsetHeight
      scrambleWrapperRef.current.style.flexBasis = Math.min(wrapperHeight / 4, scrambleHeight) + 'px'
    },
    [scrambleWrapperRef, scrambleRef, movesWrapperRef],
  )

  return (
    <>
      <div className='flex flex-1 flex-col gap-10 rounded-xl bg-black-80 pb-6'>
        <TwistyPlayer player={player} className='flex-1' />
        <div className='flex flex-col items-center gap-2 px-14'>
          <TwistyScrubber twistyPlayer={player} className='w-full max-w-[25rem]' />
          <TwistyControls twistyPlayer={player} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-1 flex-col gap-3' ref={movesWrapperRef}>
          <div className='flex flex-col rounded-xl bg-black-80 p-4'>
            <h2 className='title-h3 mb-2 border-b border-secondary-20 text-grey-20'>Scramble</h2>
            <span className='title-h3 scrollbar basis-0 overflow-y-auto pr-2 tracking-wide' ref={scrambleWrapperRef}>
              <span ref={scrambleRef}>{scramble}</span>
            </span>
          </div>

          <div className='flex flex-1 flex-col rounded-xl bg-black-80 p-4'>
            <h2 className='title-h3 mb-2 border-b border-secondary-20 text-grey-20'>Solve</h2>
            <TwistyAlgViewer
              twistyPlayer={player}
              className='title-h3 scrollbar flex-grow basis-0 overflow-y-auto pr-2 tracking-wide'
            />
          </div>
        </div>

        <div className='rounded-xl bg-black-80 p-4'>
          <h2 className='title-h3 mb-1 text-grey-20'>Speed</h2>
          <TwistyTempo twistyPlayer={player} />
        </div>
      </div>
    </>
  )
}

function useTwistyPlayer(scramble?: string, solution?: string) {
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    if (!scramble || !solution) {
      return
    }

    const newPlayer = new Player({
      controlPanel: 'none',
      background: 'none',
      visualization: 'PG3D',
      experimentalSetupAlg: scramble,
      alg: solution,
    }) // TODO: add lazy loading
    setPlayer(newPlayer)
    return () => setPlayer(null)
  }, [scramble, solution])

  return { player }
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
