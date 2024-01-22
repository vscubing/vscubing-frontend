import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton, SecondaryButton, ShareIcon } from '@/components/ui'
import { reconstructionQuery } from '@/features/reconstructor/api'
import { useQuery } from '@tanstack/react-query'
import { Link, RouteApi } from '@tanstack/react-router'
import { TwistyScrubber, TwistyPlayer, TwistyAlgViewer, TwistyControls } from '../components'
import { useEffect, useState } from 'react'
import { TwistyPlayer as Player } from '@vscubing/cubing/twisty'

const route = new RouteApi({ id: '/contests/$contestNumber/watch/$solveId' })
export function WatchSolvePage() {
  const { contestNumber, discipline, solveId } = route.useLoaderData()
  const [player, setPlayer] = useState<Player | null>(null)

  const { data: reconstruction } = useQuery(reconstructionQuery(solveId))
  const scramble = reconstruction?.scramble.scramble
  const solution = reconstruction?.reconstruction.replace(/\/\*\d+?\*\//g, '')

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

  // useEffect(() => {
  //   if (error?.response?.status === 400) {
  //     void navigate({ from: route.id, params: { discipline }, search: { page: 1 } })
  //   }
  // }, [error?.response?.status, navigate, discipline])

  return (
    <section className='contents'>
      <Header caption='Watch solve' />
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
              <p className='title-h2 mb-1 text-secondary-20'>Contest 2</p>
              <p className='text-lg'>Scramble 2</p>
            </div>
          </div>
          <div className='flex items-center justify-between rounded-xl bg-black-80 px-4 py-2'>
            <div>
              <p className='title-h3 mb-1'>Nickname</p>
              <p className='text-lg text-grey-20'>00:00.000</p>
            </div>
            <SecondaryButton /* TODO: copy on click */>
              <ShareIcon />
            </SecondaryButton>
          </div>
          {player && (
            <>
              <div className='row-span-2 flex flex-1 flex-col gap-1  rounded-xl bg-black-80 pb-6'>
                <TwistyPlayer player={player} className='flex-1' />
                <div className='flex flex-col items-center gap-2 px-14'>
                  <TwistyScrubber twistyPlayer={player} className='w-full max-w-[25rem]' />
                  <TwistyControls twistyPlayer={player} />
                </div>
              </div>
              <div className='rounded-xl bg-black-80 p-6'>Scramble</div>
              <div className='rounded-xl bg-black-80 p-6'>
                <TwistyAlgViewer twistyPlayer={player} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
