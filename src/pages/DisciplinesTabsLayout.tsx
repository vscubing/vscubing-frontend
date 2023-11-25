import { Outlet } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'

export const DisciplinesTabsLayout = () => {
  return (
    <>
      <div className='mb-4 flex aspect-[18/13] w-[52px] items-center justify-center rounded-[5px] bg-primary md:mb-6 md:w-[72px]'>
        <CubeIcon className='h-[44%] text-white' />
      </div>
      <Outlet />
    </>
  )
}
