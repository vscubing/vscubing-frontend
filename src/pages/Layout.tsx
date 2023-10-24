import { NavBar, LoginSection } from '@/components'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='min-h-screen bg-[#11191F] text-white'>
      <div className='flex justify-between border-b-[1px] border-white/10 px-[146px]'>
        <NavBar />
        <LoginSection />
      </div>
      <div className='px-[146px]'>
        <Outlet />
      </div>
    </div>
  )
}
