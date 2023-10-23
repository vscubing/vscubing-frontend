import { NavBar, LoginSection } from '@/components'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='min-h-screen w-screen bg-[#11191F] text-center text-white'>
      <div className='flex justify-between'>
        <NavBar />
        <LoginSection />
      </div>
      <Outlet />
    </div>
  )
}
