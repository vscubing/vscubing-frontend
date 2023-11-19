import { Outlet } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'

export const LeaderboardPage = () => {
  return (
    <>
      <div className='mb-[26px] flex h-[52px] w-[72px] items-center justify-center rounded-[5px] bg-primary'>
        <CubeIcon className='w-[23px] text-white' />
      </div>
      <Outlet />
    </>
  )
}
