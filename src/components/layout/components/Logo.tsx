import { Link } from '@tanstack/react-router'
import logoImg from '@/assets/images/logo.svg'
import { cn } from '@/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to='/' className={cn('title-h2 outline-ring flex items-center rounded-2xl bg-black-80 px-4', className)}>
      <img src={logoImg} alt='vscubing - Virtual Speedcubing' className='w-[13rem]' />
    </Link>
  )
}
