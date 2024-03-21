import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

type PlaceLabelProps = {
  children: number
  linkToPage?: number
  className?: string
  size?: 'small' | 'normal'
}
export function PlaceLabel({ children: place, linkToPage, size = 'normal', className }: PlaceLabelProps) {
  const Comp = linkToPage ? Link : 'span'
  return (
    <Comp
      params={{}}
      search={linkToPage ? (prev) => ({ ...prev, page: linkToPage }) : undefined}
      className={cn(
        'vertical-alignment-fix flex items-center justify-center rounded-full border border-primary-60',
        {
          'transition-base outline-ring hover:border-primary-80 active:border-primary-80 active:text-primary-80':
            !!linkToPage,
        },
        size === 'small' ? 'caption h-6 w-6' : 'text-large h-11 w-11 sm:h-9 sm:w-9',
        className,
      )}
    >
      {place}
    </Comp>
  )
}
