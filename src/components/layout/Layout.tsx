import { Outlet } from 'react-router-dom'
import { LoginSection, NavBar } from './components'
import { PickUsernameModal } from '..'

export const Layout = () => {
  return (
    <>
      <PickUsernameModal />
      <div className='min-h-screen bg-background text-white'>
        <header className='wrapper flex h-[50px] justify-between gap-4 border-b-[1px] border-white/10 lg:h-[55px]'>
          <NavBar />
          <LoginSection />
        </header>
        <main className='wrapper py-8 lg:py-16 xl:py-24'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
