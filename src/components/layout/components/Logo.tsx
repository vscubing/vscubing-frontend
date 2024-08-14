import { Link, type LinkComponent } from '@tanstack/react-router'
import logoImg from '@/assets/images/logo.svg'
import logoSmImg from '@/assets/images/logo-sm.svg'
import { cn } from '@/utils'
import { type ComponentProps } from 'react'

type LogoProps = ComponentProps<LinkComponent<'a'>> & { variant?: 'normal' | 'sm' }
export function Logo({ variant = 'normal', className, ...props }: LogoProps) {
  return (
    <Link {...props} to='/landing' className={cn('title-h2 outline-ring flex items-center rounded-2xl', className)}>
      <img
        src={variant === 'normal' ? logoImg : logoSmImg}
        alt='vscubing - Virtual Speedcubing'
        className={cn({ 'w-[13rem] sm:w-[12rem]': variant === 'normal' })}
      />
    </Link>
  )
}
