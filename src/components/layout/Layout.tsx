import { useAtom, useSetAtom } from 'jotai'
import { PickUsernameDialog, LogoWithLinkToLanding, Navbar, UsernameOrSignInButton } from './components'
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
import standWithUkraineImg from '@/assets/images/stand-with-ukraine.svg'

type LayoutProps = { children: React.ReactNode }
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <PickUsernameDialog />
      <PopupSidebar />
      <div className='bg-black-100'>
        <div
          vaul-drawer-wrapper='vaul-drawer-wrapper'
          className='flex h-svh gap-3 bg-black-100 p-[1.625rem] sm:flex-col sm:gap-0 sm:px-3 sm:py-0'
        >
          <Sidebar className='w-[clamp(16rem,20vw,21rem)] xl-short:min-w-[19rem] lg:sr-only' />
          <main className='flex flex-1 flex-col overflow-y-auto'>{children}</main>
          <BottomNavbar className='hidden sm:block' />
        </div>
      </div>
    </>
  )
}

function Sidebar({ className }: { className?: string }) {
  const setOpenOnMobile = useSetAtom(mobileMenuOpenAtom)

  return (
    <aside className={cn('flex flex-col gap-3', className)}>
      <div className='flex h-[7rem] xl-short:h-[var(--header-height)] lg:h-[var(--header-height)] lg:gap-3'>
        <LogoWithLinkToLanding className='flex w-full rounded-2xl bg-black-80 px-4 lg:hidden' />
        <LogoWithLinkToLanding className='hidden flex-shrink-0 rounded-2xl bg-black-80 px-4 lg:flex' variant='sm' />
        <div className='hidden flex-1 items-center justify-between rounded-2xl bg-black-80 py-3 pr-4 lg:flex lg:min-w-[17rem] sm:min-w-0 sm:pr-2'>
          <UsernameOrSignInButton usernameEllipsis className='flex-auto' />
          <div className='hidden lg:block'>
            <button onClick={() => setOpenOnMobile(false)} className='flex h-11 w-11 items-center justify-center'>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col rounded-2xl bg-black-80 py-6 lg:py-3'>
        <Navbar variant='vertical' onItemSelect={() => setOpenOnMobile(false)} />
        <div className='mb-4 mt-auto flex flex-col items-center gap-4 xl-short:flex-row xl-short:justify-center xl-short:gap-1 sm:gap-2'>
          <SocialLinks />
          {/* TODO: animate the social links to slide up after login before the log out button appears */}
          <LogoutButton />
        </div>
        <div className='flex justify-center border-t border-grey-80 pt-2'>
          <a href='https://u24.gov.ua/about'>
            <img src={standWithUkraineImg} />
          </a>
        </div>
      </div>
    </aside>
  )
}

function PopupSidebar() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction='right' shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black-1000/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
        <Drawer.Content className='fixed bottom-0 right-0 top-0' aria-describedby={undefined}>
          <Drawer.Title className='sr-only'>Navigation menu</Drawer.Title>
          <Sidebar className='h-full w-full bg-black-100 p-[1.625rem] sm:w-screen sm:p-3' />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useUser()
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  if (!user) {
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
        <DialogContent aria-describedby={undefined}>
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

function BottomNavbar({ className }: { className: string }) {
  return (
    <div className={cn('h-[var(--mobile-bottom-nav-height)] bg-black-100', className)}>
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
        { href: 'https://discord.gg/PxFrW9vTAy', children: <DiscordIcon /> },
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
