import { TwistyScrubber, TwistyPlayer, TwistyAlgViewer, TwistyControls, TwistyTempo } from './twisty'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TwistyPlayer as Player } from '@vscubing/cubing/twisty'

export default function TwistySection({ scramble, solution }: { scramble?: string; solution?: string }) {
  const { player } = useTwistyPlayer(scramble, solution)
  if (!player || !scramble || !solution) {
    return null
  }
  return <TwistySectionContent player={player} scramble={scramble} />
}

function TwistySectionContent({ player, scramble }: { player: Player; scramble: string }) {
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
    })
    setPlayer(newPlayer)
    return () => setPlayer(null)
  }, [scramble, solution])

  return { player }
}
