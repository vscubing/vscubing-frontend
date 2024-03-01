import { Outlet } from '@tanstack/react-router'
import { SocialLinks, Navbar, Logo, Copyright, LogoutButton } from './components'
import { PickUsernameModal } from '../PickUsernameModal'

export function Layout() {
  return (
    <>
      <PickUsernameModal />
      <div className='flex min-h-screen gap-3 p-[1.625rem]'>
        <aside className='flex w-[clamp(16rem,20vw,21rem)] flex-col gap-3 md:hidden lg-short:min-w-[19rem]'>
          <Logo className='h-[7rem] md:hidden lg-short:h-[4.375rem]' />
          <div className='flex flex-1 flex-col justify-between rounded-2xl bg-black-80 py-6'>
            <Navbar />
            <div>
              <div className='flex flex-col items-center gap-4 lg-short:flex-row lg-short:justify-center lg-short:gap-1'>
                <SocialLinks />
                {/* TODO: animate the social links to slide up after login before the log out button appears */}
                <LogoutButton />
              </div>
              <Copyright className='mt-6' />
            </div>
          </div>
        </aside>
        <main className='contents'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
