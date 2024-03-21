import { TwistyScrubber, TwistyPlayer, TwistyAlgViewer, TwistyControls, TwistyTempo } from './twisty'
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { MinusIcon, PlusIcon } from '@/components/ui'
import { cn, matchesQuery } from '@/utils'
import * as Accordion from '@radix-ui/react-accordion'

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
        <Accordion.Root
          className='flex flex-1 flex-col gap-3 md:grid md:grid-cols-2 sm:flex'
          ref={movesWrapperRef}
          type='multiple'
          defaultValue={matchesQuery('sm') ? [] : ['Scramble', 'Solve']}
        >
          <AccordionItem value='Scramble'>
            <div className='flex flex-col border-t border-secondary-20 pt-2'>
              <div className='scrollbar basis-0 overflow-y-auto pr-2 md:overflow-y-visible' ref={scrambleWrapperRef}>
                <span ref={scrambleRef}>{scramble}</span>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem value='Solve' className='flex-1'>
            <div className={cn('flex flex-col border-t border-secondary-20 pt-2', 'h-full')}>
              <div className={cn('scrollbar basis-0 overflow-y-auto pr-2 md:overflow-y-visible', 'flex-grow')}>
                <TwistyAlgViewer twistyPlayer={player} />
              </div>
            </div>
          </AccordionItem>
        </Accordion.Root>

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

type AccordionItemProps = { value: string; className?: string; children: ReactNode }
function AccordionItem({ value, className, children }: AccordionItemProps) {
  return (
    <Accordion.Item className={cn('flex flex-col rounded-2xl bg-black-80 p-4', className)} value={value}>
      <Accordion.Header className='flex justify-between'>
        <div className='title-h3 text-grey-20'>{value}</div>
        <Accordion.Trigger className='outline-ring group hidden sm:block'>
          <PlusIcon className='block group-data-[state=open]:hidden' />
          <MinusIcon className='hidden group-data-[state=open]:block' />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        className={cn(
          'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down title-h3 h-full overflow-y-clip tracking-wide',
        )}
      >
        {children}
      </Accordion.Content>
    </Accordion.Item>
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
