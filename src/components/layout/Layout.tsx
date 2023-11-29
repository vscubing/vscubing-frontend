import { Outlet } from 'react-router-dom'
import { LoginSection, NavBar } from './components'
import { PickUsernameModal } from '..'

export const Layout = () => {
  return (
    <>
      <PickUsernameModal />
      <div className='min-h-screen bg-background text-white'>
        <div className='flex h-[50px] justify-between gap-4 border-b-[1px] border-white/10 px-5 lg:h-[55px] lg:px-20 xl:px-36'>
          <NavBar />
          <LoginSection />
        </div>
        <div className='px-5 py-8 lg:px-20 lg:py-16 xl:px-36 xl:py-24'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
