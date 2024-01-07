import { cn } from '@/utils'
import { Link } from '@tanstack/react-router'

export function PlaceLabel({
  children: placeNumber,
  linkToPage,
  className,
}: {
  children: number
  linkToPage?: number
  className?: string
}) {
  const Comp = linkToPage ? Link : 'span'
  return (
    <Comp
      params={{}}
      search={linkToPage ? (prev) => ({ ...prev, page: linkToPage }) : undefined}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border border-primary-60 pt-[.2em] text-lg',
        {
          'transition-base outline-ring hover:border-primary-80 active:border-primary-80 active:text-primary-80':
            !!linkToPage,
        },
        className,
      )}
    >
      {placeNumber}
    </Comp>
  )
}
