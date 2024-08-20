import { ComponentPropsWithoutRef } from 'react'
import logoFullImg from '@/assets/images/logo-full.svg'
import logoSmImg from '@/assets/images/logo-sm.svg'

const LOGO_VARIANTS = {
  full: logoFullImg,
  sm: logoSmImg,
} as const

export function Logo({
  variant = 'sm',
  ...props
}: ComponentPropsWithoutRef<'img'> & { variant?: keyof typeof LOGO_VARIANTS }) {
  return <img src={LOGO_VARIANTS[variant]} alt='vscubing - Virtual Speedcubing' {...props} />
}
