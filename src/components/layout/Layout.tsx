import { GhostButton, LogoutIcon, PickUsernameModal } from '..'
import { Link, Outlet } from '@tanstack/react-router'
import { SocialLinks, Navbar } from './components'
import { useQuery } from '@tanstack/react-query'
import { userQuery, logout } from '@/features/auth'

export function Layout() {
  const { data: user } = useQuery(userQuery)
  return (
    <>
      <PickUsernameModal />
      <div className='flex min-h-screen gap-3 p-[1.625rem]'>
        <aside className='flex w-[clamp(15rem,23vw,21rem)] flex-col gap-3 text-grey-20'>
          <div className='title-h2 flex h-[7.1rem] items-center justify-center rounded-2xl bg-black-80'>
            <Link to='/'>LOGO</Link>
          </div>
          <div className='flex flex-1 flex-col justify-between rounded-2xl bg-black-80 py-4'>
            <Navbar />
            <div className='flex flex-col items-center'>
              <SocialLinks className='mb-10' />
              {/* TODO: animate the social links to slide up after login before the log out button appears */}
              {user && (
                <GhostButton className='mb-8' onClick={() => logout()}>
                  Log out <LogoutIcon />
                </GhostButton>
              )}
              <p className='text-caption text-white'>© Virtual Speedcubing, 2023</p>
            </div>
          </div>
        </aside>
        <main className='flex-1'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
