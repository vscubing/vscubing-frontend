import { Header } from '@/components'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className='min-h-screen w-screen bg-[#11191F] text-center text-white'>
      <Header />
      <Outlet />
    </div>
  )
}
