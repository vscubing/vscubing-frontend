import { type ComponentPropsWithoutRef } from 'react'
import logoFullImg from '@/assets/images/logo-full.svg'
import logoSmImg from '@/assets/images/logo-sm.svg'
import { cn } from '@/utils'

const LOGO_VARIANTS = {
  full: logoFullImg,
  sm: logoSmImg,
} as const

export function Logo({
  variant = 'sm',
  className,
  ...props
}: ComponentPropsWithoutRef<'span'> & { variant?: keyof typeof LOGO_VARIANTS }) {
  return (
    <span {...props} className={cn('relative', className)}>
      <img src={LOGO_VARIANTS[variant]} className='h-full w-full' alt='vscubing - Virtual Speedcubing' />
      {import.meta.env.MODE === 'development' && <span className='title-h1 absolute top-0 text-white-100'>DEV</span>}
      {import.meta.env.MODE === 'test' && <span className='title-h1 absolute top-0 text-white-100'>TEST</span>}
    </span>
  )
}
