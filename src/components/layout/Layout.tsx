import { Outlet } from '@tanstack/react-router'
import { useAtom, useSetAtom } from 'jotai'
import { PickUsernameDialog, Logo, Navbar, UsernameOrSignInButton } from './components'
import { cn } from '@/utils'
import {
  CloseIcon,
  DialogOverlay,
  DialogPortal,
  DiscordIcon,
  GhostButton,
  GithubIcon,
  LinkedinIcon,
  LogoutIcon,
} from '../ui'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { logout, useUser } from '@/features/auth'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose, DialogFooter } from '../ui'
import { Drawer } from 'vaul'

type LayoutProps = { children?: React.ReactNode }
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <PickUsernameDialog />
      <PopupMenu />
      <div
        vaul-drawer-wrapper='vaul-drawer-wrapper'
        className='flex min-h-dvh gap-3 p-[1.625rem] sm:flex-col sm:px-3 sm:pb-0 sm:pt-0'
      >
        <Sidebar className='w-[clamp(16rem,20vw,21rem)] xl-short:min-w-[19rem] lg:sr-only' />
        <main className='contents'>{children ?? <Outlet />}</main>
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
            <p className='text-caption mt-6 text-center text-white-100'>© Virtual Speedcubing, 2024</p>
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
        <Drawer.Overlay className='fixed inset-0 bg-black-1000/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Drawer.Content className='fixed bottom-0 right-0 top-0'>
          <Sidebar className='h-full w-full bg-black-100 p-[1.625rem] sm:w-screen sm:p-3' />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useUser()
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  if (user === undefined || user.isAuthed === false) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GhostButton className={className}>
          Log out <LogoutIcon />
        </GhostButton>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogFooter className='sm:grid sm:grid-cols-2'>
            <DialogClose version='secondary'>Stay</DialogClose>
            <DialogClose
              version='primary'
              onClick={() => {
                setMobileMenuOpen(false)
                void logout()
              }}
            >
              Log out
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function StickyNavbar({ className }: { className: string }) {
  return (
    <div className={cn('sticky bottom-0 z-50 bg-black-100 pb-3 pt-2', className)}>
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
