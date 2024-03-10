import { CubeIcon, Ellipsis, MinusIcon, PlusIcon, SecondaryButton, SolveTimeLinkOrDnf } from '@/components/ui'
import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'
import { forwardRef, type ComponentProps, useState } from 'react'
import { PlaceLabel } from '@/components/ui'

type ResultProps = { result: LeaderboardResult; linkToPage?: number; isOwn?: boolean } & ComponentProps<'li'>
export const Result = forwardRef<HTMLLIElement, ResultProps>(
  ({ result, isOwn, linkToPage, className, ...props }, ref) => {
    const [accordionOpen, setAccordionOpen] = useState(false)

    let username = result.user.username
    if (isOwn) {
      username = username + ' (you)'
    }

    return (
      <li
        ref={ref}
        className={cn(
          'flex h-15 items-center whitespace-nowrap rounded-xl pl-2 md:flex-wrap md:px-4 md:py-2',
          accordionOpen ? 'md:h-auto' : 'md:h-[4.75rem]',
          isOwn ? 'bg-secondary-80' : 'bg-grey-100',
          className,
        )}
        {...props}
      >
        <span
          className={cn('flex flex-1 items-center md:w-full', {
            'md:mb-4 md:border-b md:border-grey-60': accordionOpen,
          })}
        >
          <PlaceLabel className='mr-3' linkToPage={linkToPage}>
            {result.place}
          </PlaceLabel>
          <CubeIcon className='mr-3' cube={result.discipline.name} />
          <Ellipsis className='vertical-alignment-fix flex-1'>{username}</Ellipsis>
          <span className='mr-6 md:mr-10'>
            <span className='mb-1 hidden text-center text-grey-40 md:block'>Single time</span>
            <SolveTimeLinkOrDnf
              timeMs={result.timeMs}
              solveId={result.id}
              contestNumber={result.contest.contestNumber}
            />
          </span>
          <button onClick={() => setAccordionOpen((prev) => !prev)} className='outline-ring hidden md:block'>
            {accordionOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </span>
        <span className={cn('flex items-center md:items-start', accordionOpen ? 'md:w-full' : 'md:sr-only')}>
          <span className='vertical-alignment-fix w-36 border-l border-grey-60 text-center md:w-auto md:min-w-24 md:border-none md:pt-0'>
            <span className='mb-2 hidden text-center text-grey-40 md:block'>Solve date</span>
            {formatDate(result.created)}
          </span>
          <span className='vertical-alignment-fix mr-10 w-[9.375rem] text-center md:pt-0'>
            <span className='mb-2 hidden text-center text-grey-40 md:block'>Contest name</span>
            Contest {result.contest.contestNumber}
          </span>
          <SecondaryButton asChild className='md:mb-2 md:ml-auto'>
            <Link
              to='/contests/$contestNumber'
              params={{ contestNumber: String(result.contest.contestNumber) }}
              search={{ discipline: result.discipline.name }}
            >
              view contest
            </Link>
          </SecondaryButton>
        </span>
      </li>
    )
  },
)

export const ResultSkeleton = forwardRef<HTMLLIElement, ComponentProps<'li'>>(({ className, ...props }, ref) => {
  return (
    <li ref={ref} {...props} className={cn('h-15 animate-pulse rounded-xl bg-grey-100 md:h-[4.75rem]', className)}></li>
  )
})

export function ResultsHeader({ className }: { className: string }) {
  return (
    <div className={cn('flex whitespace-nowrap pl-2 text-grey-40', className)}>
      <span className='mr-2 w-11 text-center'>Place</span>
      <span className='mr-2'>Type</span>
      <span className='flex-1'>Nickname</span>
      <span className='mr-6 w-24 text-center'>Single time</span>
      <span className='w-36 text-center'>Solve date</span>
      <span className='mr-10 w-[9.375rem] text-center'>Contest name</span>
      <SecondaryButton aria-hidden className='invisible h-px'>
        view contest
      </SecondaryButton>
    </div>
  )
}
