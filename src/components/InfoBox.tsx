import { ReactNode } from 'react'

export const InfoBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center rounded-[5px] bg-panels py-[80px]'>
      <p className='max-w-[609px] text-center text-[24px]'>{children}</p>
    </div>
  )
}
