import {
  DialogCloseCross,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  UnderlineButton,
} from '@/components/ui'
import { type ComponentPropsWithoutRef } from 'react'

export function KeyMapDialogTrigger(props: ComponentPropsWithoutRef<typeof UnderlineButton>) {
  return (
    <DialogTrigger asChild>
      <UnderlineButton size='sm' {...props}>
        Virtual Cube Key Map
      </UnderlineButton>
    </DialogTrigger>
  )
}

export function KeyMapDialogContent({ overlayClassname }: { overlayClassname?: string }) {
  return (
    <DialogPortal>
      <DialogOverlay withCubes={false} className={overlayClassname} />
      <DialogContent className='max-w-none p-10'>
        <div className='grid grid-cols-[repeat(10,auto)] gap-1'>
          <header className='col-span-full flex items-center justify-between rounded-xl bg-black-80 p-4'>
            <h1 className='title-h2 text-secondary-20'>Virtual Cube Key Map</h1>
            <DialogCloseCross />
          </header>

          <ul className='contents'>
            {keyMap.map(({ keyName, cubeMovement }) => (
              <KeyTile key={keyName} keyName={keyName} cubeMovement={cubeMovement} />
            ))}
          </ul>
        </div>
      </DialogContent>
    </DialogPortal>
  )
}

function KeyTile({ keyName, cubeMovement }: (typeof keyMap)[number]) {
  return (
    <li
      className='title-h3 flex h-[4.625rem] w-[4.625rem] flex-col justify-between rounded-xl bg-black-80 px-3 py-1'
      aria-hidden={!cubeMovement}
    >
      <span className='text-grey-20'>{keyName}</span>
      <span className='text-end'>{cubeMovement}</span>
    </li>
  )
}

const keyMap = [
  { keyName: '1' },
  { keyName: '2' },
  { keyName: '3' },
  { keyName: '4' },
  { keyName: '5', cubeMovement: 'M' },
  { keyName: '6', cubeMovement: 'M' },
  { keyName: '7' },
  { keyName: '8' },
  { keyName: '9' },
  { keyName: '10' },
  { keyName: 'Q', cubeMovement: "z'" },
  { keyName: 'W', cubeMovement: "B'" },
  { keyName: 'E', cubeMovement: "L'" },
  { keyName: 'R', cubeMovement: "Lw'" },
  { keyName: 'T', cubeMovement: 'x' },
  { keyName: 'Y', cubeMovement: 'x' },
  { keyName: 'U', cubeMovement: 'Rw' },
  { keyName: 'I', cubeMovement: 'R' },
  { keyName: 'O', cubeMovement: "B'" },
  { keyName: 'P', cubeMovement: 'z' },
  { keyName: 'A', cubeMovement: "y'" },
  { keyName: 'S', cubeMovement: 'D' },
  { keyName: 'D', cubeMovement: 'L' },
  { keyName: 'F', cubeMovement: "U'" },
  { keyName: 'G', cubeMovement: "F'" },
  { keyName: 'H', cubeMovement: 'F' },
  { keyName: 'J', cubeMovement: 'U' },
  { keyName: 'K', cubeMovement: "R'" },
  { keyName: 'L', cubeMovement: "D'" },
  { keyName: ';', cubeMovement: 'y' },
  { keyName: 'Z', cubeMovement: 'Dw' },
  { keyName: 'X', cubeMovement: "M'" },
  { keyName: 'C', cubeMovement: "Uw'" },
  { keyName: 'V', cubeMovement: 'Lw' },
  { keyName: 'B', cubeMovement: "x'" },
  { keyName: 'N', cubeMovement: "x'" },
  { keyName: 'M', cubeMovement: "Rw'" },
  { keyName: ',', cubeMovement: 'Uw' },
  { keyName: '.', cubeMovement: "M'" },
  { keyName: '/', cubeMovement: "Dw'" },
]
