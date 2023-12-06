import { useOngoingContestNumber } from '@/api/contests'
import { cn } from '@/utils'
import { ButtonHTMLAttributes, useMemo, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'

export const NavBar = () => {
  const { data: ongoingContestNumber } = useOngoingContestNumber()
  const params = useParams()
  const openedContestNumber = params?.contestNumber ? Number(params?.contestNumber) : null
  const [isMobileNavVisible, setIsMovileNavVisible] = useState(false)

  const links = useMemo(() => {
    const list = [
      { text: 'Dashboard', to: '/' },
      { text: 'Leaderboard', to: `/leaderboard` },
      { text: 'Ongoing contest', to: `/contest/${ongoingContestNumber}` },
    ]

    if (openedContestNumber && openedContestNumber !== ongoingContestNumber) {
      list.push({ text: `Contest ${openedContestNumber}`, to: `/contest/${openedContestNumber}` })
    }

    return list
  }, [ongoingContestNumber, openedContestNumber])

  return (
    <nav>
      <div className='flex h-full items-center md:hidden' onClick={() => setIsMovileNavVisible((prev) => !prev)}>
        <HamburgerButton isOpen={isMobileNavVisible} />
      </div>
      <ul
        className={cn(
          { 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100': !isMobileNavVisible },
          'fixed bottom-0 left-0 right-0 top-[50px] z-10 py-8 text-2xl backdrop-blur-3xl transition-all duration-300 md:static md:flex md:h-full md:gap-6 md:py-0 md:text-base lg:top-[55px] lg:gap-8 xl:gap-16',
        )}
      >
        {links.map(({ text, to }) => (
          <li key={text} className='md:h-full'>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  isActive ? 'pointer-events-none border-primary text-white' : 'text-white/50 md:border-transparent',
                  'block px-5 py-3 md:flex md:h-full md:items-center md:border-t-[3px] md:px-0 md:py-0 lg:text-xl',
                )
              }
              onClick={() => setIsMovileNavVisible(false)}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const HamburgerButton = ({
  isOpen,
  className,
  ...props
}: { isOpen: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={cn('flex flex-col items-center justify-center', className)}>
    <span
      className={cn(
        'ease-out-expo block h-0.5 w-6 rounded-sm bg-white transition-all duration-300',
        isOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5',
      )}
    ></span>
    <span
      className={cn(
        'ease-out-expo my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300',
        isOpen ? 'opacity-0' : 'opacity-100',
      )}
    ></span>
    <span
      className={cn(
        'ease-out-expo block h-0.5 w-6 rounded-sm bg-white transition-all duration-300',
        isOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5',
      )}
    ></span>
  </button>
)