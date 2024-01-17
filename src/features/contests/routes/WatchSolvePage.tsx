import { NavigateBackButton } from '@/components/NavigateBackButton'
import { Header } from '@/components/layout'
import { CubeButton } from '@/components/ui'
import { reconstructionQuery } from '@/features/reconstructor/api'
import { useQuery } from '@tanstack/react-query'
import { Link, RouteApi, useNavigate } from '@tanstack/react-router'
import { TwistyAlgViewer, TwistyPlayer } from '../components'
import { useEffect, useState } from 'react'
import { TwistyPlayer as Player } from 'cubing/twisty'

const route = new RouteApi({ id: '/contests/$contestNumber/watch/$solveId' })
export function WatchSolvePage() {
  const { contestNumber, discipline, solveId } = route.useLoaderData()
  const navigate = useNavigate({ from: route.id })
  const [player, setPlayer] = useState<Player | null>(null)

  const { data: reconstruction, error } = useQuery(reconstructionQuery(solveId))
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
    <section className='flex h-full flex-col gap-3'>
      <Header caption='Watch solve' />
      <NavigateBackButton className='self-start' />
      <div className='flex items-center justify-between rounded-xl bg-black-80 p-4'>
        <Link
          from={route.id}
          params={{ contestNumber: String(contestNumber), solveId }}
          search={{ discipline: '3by3' }}
        >
          <CubeButton asButton={false} cube='3by3' isActive={discipline === '3by3'} />
        </Link>
      </div>
      {player && (
        <div className='flex flex-1 flex-col gap-1 rounded-xl bg-black-80 p-6'>
          <TwistyPlayer player={player} />
          <TwistyAlgViewer twistyPlayer={player} />
        </div>
      )}
    </section>
  )
}
