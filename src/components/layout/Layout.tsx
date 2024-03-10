import { Outlet } from '@tanstack/react-router'
import { useAtom, useSetAtom } from 'jotai'
import { Logo, Navbar, UsernameOrSignInButton } from './components'
import { PickUsernameModal } from '../PickUsernameModal'
import { cn } from '@/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseIcon, DiscordIcon, GhostButton, GithubIcon, LinkedinIcon, LogoutIcon } from '../ui'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { userQuery, logout } from '@/features/auth'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/AlertDialog'
import { useQuery } from '@tanstack/react-query'
import { AlertDialogFooter } from '../AlertDialog'

export function Layout() {
  return (
    <>
      <PickUsernameModal />
      <MobileMenu />
      <div className='flex min-h-screen gap-3 p-[1.625rem]'>
        <Sidebar className='lg:hidden' />
        <main className='contents'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

function Sidebar({ className }: { className?: string }) {
  const setOpenOnMobile = useSetAtom(mobileMenuOpenAtom)

  return (
    <>
      <aside
        className={cn('flex w-[clamp(16rem,20vw,21rem)] flex-col gap-3 lg:w-[23rem] xl-short:min-w-[19rem]', className)}
      >
        <div className='flex h-[7rem] lg:h-[4.375rem] lg:gap-3 xl-short:h-[4.375rem]'>
          <Logo className='w-full lg:hidden' />
          <Logo className='hidden lg:flex' variant='sm' onClick={() => setOpenOnMobile(false)} />
          <div className='hidden flex-1 items-center justify-end rounded-2xl bg-black-80 px-4 py-3 lg:flex'>
            <UsernameOrSignInButton />
          </div>
        </div>
        <div className='flex flex-1 flex-col rounded-2xl bg-black-80 py-6 lg:pt-0'>
          <div className='mb-4 hidden justify-end p-3 lg:flex'>
            <button onClick={() => setOpenOnMobile(false)} className='flex h-11 w-11 items-center justify-center'>
              <CloseIcon />
            </button>
          </div>
          <Navbar onItemSelect={() => setOpenOnMobile(false)} />
          <div className='mt-auto'>
            <div className='flex flex-col items-center gap-4 xl-short:flex-row xl-short:justify-center xl-short:gap-1'>
              <SocialLinks />
              {/* TODO: animate the social links to slide up after login before the log out button appears */}
              <LogoutButton />
            </div>
            <p className={cn('text-caption mt-6 text-center text-white-100', className)}>
              © Virtual Speedcubing, 2023
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

function MobileMenu() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-black-1000/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Dialog.Content className='fixed bottom-0 right-0 top-0 z-50 flex flex-col gap-3 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'>
          <div className='h-full bg-black-100 p-[1.625rem]'>
            <Sidebar className='h-full' />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useQuery(userQuery)
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  if (user === undefined || user.isAuthed === false) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <GhostButton className={className}>
          Log out <LogoutIcon />
        </GhostButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setMobileMenuOpen(false)
              void logout()
            }}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center gap-4 xl-short:gap-1', className)}>
      {[
        { href: 'https://github.com/vscubing', children: <GithubIcon /> },
        { href: 'https://www.linkedin.com/company/vscubing', children: <LinkedinIcon /> },
        { href: '#', children: <DiscordIcon /> } /* TODO: add discord link */,
      ].map(({ href, children }) => (
        <a
          href={href}
          key={href}
          className='transition-base outline-ring flex h-11 w-11 items-center justify-center text-[1.5rem] text-grey-20 hover:text-primary-80'
        >
          {children}
        </a>
      ))}
    </div>
  )
}
