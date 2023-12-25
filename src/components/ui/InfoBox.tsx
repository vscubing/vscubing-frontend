import { type ReactNode } from 'react'

export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className='flex justify-center rounded-[5px] bg-panels px-4 py-8 text-center text-base md:px-[10%] md:py-12 md:text-xl lg:py-16 lg:text-2xl xl:px-[20%] xl:py-20'>
      {children}
    </div>
  )
}
