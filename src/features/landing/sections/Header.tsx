import { Logo } from '@/components/layout/components'
import { PrimaryButton } from '@/components/ui'
import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setTimeout(() => {
        // without setTimeout the scroll is blocked at the starting point because it gets snapped back
        if (window.scrollY >= 20) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
          window.scrollTo({ top: 0 })
        }
      }, 200)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex rounded-[1rem] bg-black-120 pl-9 pr-2 transition-all duration-100',
        isScrolled ? 'items-center bg-black-80/75 py-2 backdrop-blur-lg' : 'items-end pb-2 pt-9',
      )}
    >
      <div className='flex w-full items-center gap-[6.25rem]'>
        <Logo />
        <nav className='vertical-alignment-fix flex gap-10 font-bold'>
          {/* TODO: add anchor links */}
          <a>About</a>
          <a>Features</a>
          <a>Guide</a>
          <a>Contacts</a>
        </nav>
        <PrimaryButton asChild className='ml-auto h-14 px-10'>
          <Link to='/'>Start cubing now</Link>
        </PrimaryButton>
      </div>
    </header>
  )
}
