import { NavBar, LoginSection } from '@/components'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='bg-background min-h-screen text-white'>
      <div className='flex items-center justify-between border-b-[1px] border-white/10 px-[146px]'>
        <NavBar />
        <LoginSection />
      </div>
      <div className='px-[146px] pt-[90px]'>
        <Outlet />
      </div>
    </div>
  )
}
