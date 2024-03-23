import { Outlet } from '@tanstack/react-router'
import { useAtom, useSetAtom } from 'jotai'
import { Logo, Navbar, UsernameOrSignInButton } from './components'
import { PickUsernameModal } from '../PickUsernameModal'
import { cn } from '@/utils'
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
import { Drawer } from 'vaul'

export function Layout() {
  return (
    <>
      <PickUsernameModal />
      <PopupMenu />
      <div
        vaul-drawer-wrapper='vaul-drawer-wrapper'
        className='flex min-h-screen gap-3 p-[1.625rem] sm:flex-col sm:px-3 sm:pb-0 sm:pt-0'
      >
        <Sidebar className='w-[clamp(16rem,20vw,21rem)] xl-short:min-w-[19rem] lg:sr-only' />
        <main className='contents'>
          <Outlet />
        </main>
        <StickyNavbar className='hidden sm:block' />
      </div>
    </>
  )
}

function Sidebar({ className }: { className?: string }) {
  const setOpenOnMobile = useSetAtom(mobileMenuOpenAtom)

  return (
    <>
      <aside className={cn('flex flex-col gap-3', className)}>
        <div className='flex h-[7rem] xl-short:h-[var(--header-height)] lg:h-[var(--header-height)] lg:gap-3'>
          <Logo className='w-full lg:hidden' />
          <Logo className='hidden flex-shrink-0 lg:flex' variant='sm' onClick={() => setOpenOnMobile(false)} />
          <div className='hidden flex-1 items-center justify-end rounded-2xl bg-black-80 py-3 pl-2 pr-4 lg:flex lg:min-w-[17rem] sm:min-w-0'>
            <UsernameOrSignInButton usernameEllipsis className='flex-auto' />
          </div>
        </div>
        <div className='flex flex-1 flex-col rounded-2xl bg-black-80 py-6 lg:py-3'>
          <div className='mb-10 hidden justify-end px-3 lg:flex sm:mb-0 sm:pb-0'>
            <button onClick={() => setOpenOnMobile(false)} className='flex h-11 w-11 items-center justify-center'>
              <CloseIcon />
            </button>
          </div>
          <Navbar variant='vertical' onItemSelect={() => setOpenOnMobile(false)} />
          <div className='mt-auto'>
            <div className='flex flex-col items-center gap-4 xl-short:flex-row xl-short:justify-center xl-short:gap-1 sm:gap-2'>
              <SocialLinks />
              {/* TODO: animate the social links to slide up after login before the log out button appears */}
              <LogoutButton />
            </div>
            <p className='text-caption mt-6 text-center text-white-100'>© Virtual Speedcubing, 2023</p>
          </div>
        </div>
      </aside>
    </>
  )
}

function PopupMenu() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction='right' shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-50 bg-black-1000/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Drawer.Content className='fixed bottom-0 right-0 top-0 z-50'>
          <Sidebar className='h-full w-full bg-black-100 p-[1.625rem] sm:w-screen sm:p-3' />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
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

function StickyNavbar({ className }: { className: string }) {
  return (
    <div className={cn('sticky bottom-0 z-50 bg-black-100 px-3 pb-3 pt-2', className)}>
      <div className='rounded-b-xl border-b border-grey-20'>
        <Navbar variant='horizontal' />
      </div>
    </div>
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
