import { type ReactNode } from 'react'
import { Cube3Icon } from '.'

export function DisciplinesTabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='mb-4 flex aspect-[18/13] w-[52px] items-center justify-center rounded-[5px] bg-primary md:mb-6 md:w-[72px]'>
        <Cube3Icon className='h-[44%] text-white' />
      </div>
      {children}
    </>
  )
}
