import { GhostButton, LogoutIcon } from '../ui'
import { Outlet } from '@tanstack/react-router'
import { SocialLinks, Navbar, Logo } from './components'
import { useQuery } from '@tanstack/react-query'
import { userQuery, logout } from '@/features/auth'
import { PickUsernameModal } from '../PickUsernameModal'
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
  AlertDialogFooter,
} from '../AlertDialog'

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
              <p className='text-caption mt-6 text-center text-white-100'>© Virtual Speedcubing, 2023</p>
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

function LogoutButton() {
  const { data: user } = useQuery(userQuery)

  if (user === undefined || user.isAuthed === false) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <GhostButton>
          Log out <LogoutIcon />
        </GhostButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout()}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
