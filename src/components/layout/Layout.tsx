import { GhostButton, LogoutIcon } from '../ui'
import { Link, Outlet } from '@tanstack/react-router'
import { SocialLinks, Navbar } from './components'
import { useQuery } from '@tanstack/react-query'
import { userQuery, logout } from '@/features/auth'
import { PickUsernameModal } from '../PickUsernameModal'
import logoImg from '@/assets/images/logo.svg'

export function Layout() {
  const { data: user } = useQuery(userQuery)
  return (
    <>
      <PickUsernameModal />
      <div className='flex min-h-screen gap-3 p-[1.625rem]'>
        <aside className='flex w-[clamp(15rem,23vw,21rem)] flex-col gap-3 text-grey-20'>
          <div className='title-h2 flex h-[7.1rem] items-center rounded-2xl bg-black-80 p-4'>
            <Link to='/'>
              <img src={logoImg} alt='VSCubing - Virtual Speedcubing' />
            </Link>
          </div>
          <div className='flex flex-1 flex-col justify-between rounded-2xl bg-black-80 py-6'>
            <Navbar />
            <div>
              <div className='flex flex-col items-center gap-4 lg-short:flex-row lg-short:justify-center lg-short:gap-1'>
                <SocialLinks />
                {/* TODO: animate the social links to slide up after login before the log out button appears */}
                {user?.isAuthed === true && (
                  <GhostButton onClick={() => logout()}>
                    Log out <LogoutIcon />
                  </GhostButton>
                )}
              </div>
              <p className='text-caption mt-6 text-center text-white'>© Virtual Speedcubing, 2023</p>
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
