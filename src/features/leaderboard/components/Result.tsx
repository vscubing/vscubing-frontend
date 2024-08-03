import { CubeIcon, Ellipsis, MinusIcon, PlusIcon, SecondaryButton } from '@/components/ui'
import { SolveTimeLinkOrDnf } from '@/components/shared'
import { cn, formatDate, matchesQuery } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type LeaderboardResult } from '../api'
import { PlaceLabel } from '@/components/shared'
import * as Accordion from '@radix-ui/react-accordion'

type ResultProps = {
  result: LeaderboardResult
  linkToPage?: number
  discipline: string
  isOwn?: boolean
  isFirstOnPage: boolean
  height?: number
}
export function Result({ result, isOwn, linkToPage, discipline, isFirstOnPage, height }: ResultProps) {
  let username = result.solve.user.username
  if (isOwn) {
    username = username + ' (you)'
  }

  return (
    <Accordion.Root type='single' collapsible value={matchesQuery('md') ? undefined : 'result'}>
      <Accordion.Item
        value='result'
        className={cn(
          'flex min-h-15 items-center rounded-xl pl-2 md:min-h-[4.75rem] md:flex-wrap md:px-4 md:py-2 sm:min-h-28 sm:p-4',
          isOwn ? 'bg-secondary-80' : 'bg-grey-100',
        )}
        style={{ minHeight: height }}
      >
        <Accordion.Header className='flex flex-1 items-center md:w-full sm:grid sm:grid-flow-col sm:grid-cols-[min-content_1fr_min-content] sm:grid-rows-[min-content_min-content] sm:gap-x-3 sm:gap-y-1'>
          <PlaceLabel className='mr-3 sm:mr-0' linkToPage={linkToPage}>
            {result.place}
          </PlaceLabel>
          <CubeIcon className='mr-3 sm:mr-0' cube={discipline} />
          <Ellipsis className='vertical-alignment-fix flex-1 sm:col-span-2 sm:w-auto'>{username}</Ellipsis>
          <span className='mr-6 md:mr-10 sm:mr-0 sm:flex sm:items-center'>
            <span className='sm:vertical-alignment-fix mb-1 hidden text-center text-grey-40 md:block sm:mb-0'>
              Single time
            </span>
            <SolveTimeLinkOrDnf
              canShowHint={isFirstOnPage}
              timeMs={result.solve.timeMs}
              isDnf={result.solve.isDnf}
              solveId={result.solve.id}
              contestSlug={result.solve.contest.slug}
              discipline={discipline}
            />
          </span>
          <Accordion.Trigger className='outline-ring group hidden md:block sm:py-2'>
            <PlusIcon className='block group-data-[state=open]:hidden' />
            <MinusIcon className='hidden group-data-[state=open]:block' />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className='overflow-y-clip data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down md:w-full'>
          <span className='flex items-center md:items-start md:border-t md:border-grey-60 md:pt-4 sm:grid sm:grid-cols-2 sm:gap-4'>
            <span className='vertical-alignment-fix w-36 border-l border-grey-60 text-center md:w-auto md:min-w-24 md:border-none md:pt-0 sm:ml-auto sm:w-24'>
              <span className='mb-2 hidden text-center text-grey-40 md:block sm:mb-0'>Solve date</span>
              {formatDate(result.solve.createdAt)}
            </span>
            <span className='vertical-alignment-fix mr-10 w-[9.375rem] text-center md:pt-0 sm:order-first sm:mr-0 sm:w-auto sm:text-left'>
              <span className='mb-2 hidden text-center text-grey-40 md:block sm:hidden'>Contest name</span>
              Contest {result.solve.contest.slug}
            </span>
            <SecondaryButton
              asChild
              size={matchesQuery('sm') ? 'sm' : 'lg'}
              className='md:mb-2 md:ml-auto sm:col-span-full sm:m-0 sm:w-full'
              style={{ height: matchesQuery('md') ? undefined : height }}
            >
              <Link
                to='/contests/$contestSlug'
                params={{ contestSlug: result.solve.contest.slug }}
                search={{ discipline }}
              >
                <span className='sm:hidden'>view contest</span>
                <span className='hidden sm:block'>View contest</span>
              </Link>
            </SecondaryButton>
          </span>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export function ResultSkeleton({ height }: { height?: number }) {
  return <div className='h-15 animate-pulse rounded-xl bg-grey-100 md:h-[4.75rem] sm:h-28' style={{ height }}></div>
}

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
