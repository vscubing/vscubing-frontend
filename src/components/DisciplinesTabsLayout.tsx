import { type ReactNode } from 'react'
import { CubeIcon } from './ui'

export function DisciplinesTabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='bg-primary mb-4 flex aspect-[18/13] w-[52px] items-center justify-center rounded-[5px] md:mb-6 md:w-[72px]'>
        <CubeIcon cube='3by3' className='h-[44%] text-white' />
      </div>
      {children}
    </>
  )
}
