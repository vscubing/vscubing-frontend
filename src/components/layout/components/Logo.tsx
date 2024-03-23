import { Link, type LinkProps } from '@tanstack/react-router'
import logoImg from '@/assets/images/logo.svg'
import logoSmImg from '@/assets/images/logo-sm.svg'
import { cn } from '@/utils'

type LogoProps = Omit<LinkProps, 'to' | 'children' | 'params'> & { variant?: 'normal' | 'sm' }
export function Logo({ variant = 'normal', className, ...props }: LogoProps) {
  return (
    <Link
      {...props}
      to='/'
      className={cn('title-h2 outline-ring flex items-center rounded-2xl bg-black-80 px-4', className)}
    >
      <img
        src={variant === 'normal' ? logoImg : logoSmImg}
        alt='vscubing - Virtual Speedcubing'
        className={cn({ 'w-[13rem] sm:w-[12rem]': variant === 'normal' })}
      />
    </Link>
  )
}
