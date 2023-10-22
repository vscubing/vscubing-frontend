import { Navbar } from '@/components'
import { Outlet } from 'react-router-dom'

export function Root() {
  return (
    <div className='h-screen w-screen bg-slate-800 text-center text-white'>
      <Navbar />
      <Outlet />
    </div>
  )
}
