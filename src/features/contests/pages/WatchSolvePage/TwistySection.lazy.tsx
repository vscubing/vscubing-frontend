import { TwistyScrubber, TwistyPlayer, TwistyAlgViewer, TwistyControls, TwistyTempo } from './twisty'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { MinusIcon, PlusIcon } from '@/components/ui'
import { cn } from '@/utils'

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

  const [scrambleAccordionOpen, setScrambleAccordionOpen] = useState(false)
  const [solveAccordionOpen, setSolveAccordionOpen] = useState(false)
  return (
    <>
      <div className='flex flex-col gap-10 rounded-2xl bg-black-80 pb-6 md:col-span-full sm:overflow-x-clip'>
        <TwistyPlayer player={player} className='flex-1 md:min-h-[20rem] sm:-mx-5' />
        <div className='flex justify-center px-3'>
          <div className='flex w-[27rem] max-w-full flex-col items-center gap-2'>
            <TwistyScrubber twistyPlayer={player} className='w-full px-4' />
            <TwistyControls twistyPlayer={player} className='w-full' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 md:col-span-full md:flex-col-reverse'>
        <div className='flex flex-1 flex-col gap-3 md:grid md:grid-cols-2 sm:flex' ref={movesWrapperRef}>
          <div className='flex flex-col rounded-2xl bg-black-80 p-4'>
            <div
              className={cn('mb-2 flex justify-between border-b border-secondary-20', {
                'sm:mb-0 sm:border-none': !scrambleAccordionOpen,
              })}
            >
              <h2 className='title-h3 text-grey-20'>Scramble</h2>
              <button
                onClick={() => setScrambleAccordionOpen((prev) => !prev)}
                className='outline-ring hidden sm:block'
              >
                {scrambleAccordionOpen ? <MinusIcon /> : <PlusIcon />}
              </button>
            </div>
            <span
              className={cn(
                'title-h3 scrollbar basis-0 overflow-y-auto pr-2 tracking-wide md:basis-auto md:overflow-y-visible',
                { 'sm:sr-only': !scrambleAccordionOpen },
              )}
              ref={scrambleWrapperRef}
            >
              <span ref={scrambleRef}>{scramble}</span>
            </span>
          </div>

          <div className='flex flex-1 flex-col rounded-2xl bg-black-80 p-4'>
            <div
              className={cn('mb-2 flex justify-between border-b border-secondary-20', {
                'sm:mb-0 sm:border-none': !scrambleAccordionOpen,
              })}
            >
              <h2 className='title-h3 text-grey-20'>Solve</h2>
              <button onClick={() => setSolveAccordionOpen((prev) => !prev)} className='outline-ring hidden sm:block'>
                {solveAccordionOpen ? <MinusIcon /> : <PlusIcon />}
              </button>
            </div>
            <TwistyAlgViewer
              twistyPlayer={player}
              className={cn(
                'title-h3 scrollbar flex-grow basis-0 overflow-y-auto pr-2 tracking-wide md:basis-auto md:overflow-y-visible',
                { 'sm:sr-only': !solveAccordionOpen },
              )}
            />
          </div>
        </div>

        <div className='rounded-2xl bg-black-80 p-4 md:flex md:justify-center'>
          <div className='md:w-[25rem] md:max-w-full'>
            <h2 className='title-h3 mb-1 text-grey-20'>Speed</h2>
            <TwistyTempo twistyPlayer={player} />
          </div>
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
