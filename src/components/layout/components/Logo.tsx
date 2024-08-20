import { Link, type LinkComponent } from '@tanstack/react-router'
import { cn } from '@/utils'
import { type ComponentProps } from 'react'
import { Logo } from '@/components/ui'

type LogoProps = ComponentProps<LinkComponent<'a'>> & { variant?: 'full' | 'sm' }
export function LogoWithLinkToLanding({ variant = 'full', className, ...props }: LogoProps) {
  return (
    <Link {...props} to='/landing' className={cn('title-h2 outline-ring', className)}>
      <Logo variant={variant} className={cn({ 'w-[13rem] sm:w-[12rem]': variant === 'full' })} />
    </Link>
  )
}
