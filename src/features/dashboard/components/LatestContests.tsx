import { cn, formatDate } from '@/utils'
import { Link } from '@tanstack/react-router'
import { type DashboardDTO } from '../api'
import { ArrowRightIcon, SecondaryButton } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export function LatestContests({ className, contests }: { className: string; contests?: DashboardDTO['contests'] }) {
  const sortedContests = contests && [...contests].reverse().filter(({ ongoing }) => !ongoing)

  const containerRef = useRef<HTMLUListElement>(null)
  const mockElementRef = useRef<HTMLDivElement>(null)
  const [fittingAmount, setFittingAmount] = useState(0)

  useEffect(() => {
    function computeFittingAmount() {
      flushSync(() => setFittingAmount(0))
      const containerHeight = containerRef.current?.clientHeight
      const mockElementHeight = mockElementRef.current?.clientHeight
      if (mockElementHeight && containerHeight) {
        const gap = parseInt(getComputedStyle(containerRef.current).gap)
        setFittingAmount(Math.floor((containerHeight + gap) / (mockElementHeight + gap)))
      }
    }
    addEventListener('resize', computeFittingAmount)
    setTimeout(() => computeFittingAmount(), 0) // setTimeout to suppress "flushSync was called from inside a lifecycle method" warning
    return () => removeEventListener('resize', computeFittingAmount)
  }, [containerRef, mockElementRef])

  return (
    <>
      {
        <ul className={cn('flex flex-col gap-3', className)} ref={containerRef}>
          <div className='invisible fixed' aria-hidden='true' ref={mockElementRef}>
            <Contest contest={MOCK_CONTEST} />
          </div>
          {sortedContests
            ? sortedContests.slice(0, fittingAmount).map((contest) => <Contest contest={contest} key={contest.id} />)
            : 'Loading...'}
        </ul>
      }
    </>
  )
}

const MOCK_CONTEST: DashboardDTO['contests'][number] = {
  id: 1,
  contestNumber: 1,
  start: '2021-01-01T00:00:00.000Z',
  end: '2021-01-01T00:00:00.000Z',
  ongoing: false,
}

function Contest({ contest: { contestNumber, start, end } }: { contest: DashboardDTO['contests'][number] }) {
  return (
    <li className='flex justify-between rounded-xl bg-grey-100'>
      <div className='py-3 pl-4 pr-8'>
        <p className='title-h3'>Contest {contestNumber}</p>
        <p className='text-grey-40'>
          {formatDate(start)}-{formatDate(end!)}
        </p>
      </div>
      <SecondaryButton size='iconLg' asChild>
        <Link
          className={cn('rounded-md py-2 pl-4 pr-2 md:px-6 md:py-2 md:text-lg')}
          to='/contest/$contestNumber'
          params={{ contestNumber: String(contestNumber) }}
        >
          <ArrowRightIcon />
        </Link>
      </SecondaryButton>
    </li>
  )
}
