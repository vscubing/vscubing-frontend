import { cn } from '@/utils'

export function Progress({ currentSolveNumber }: { currentSolveNumber: number }) {
  return (
    <div className='flex flex-col gap-14'>
      {[1, 2, 3, 4, 5].map((number) => (
        <span
          key={number}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full border border-grey-60 bg-transparent text-grey-60 duration-1000 ease-in-out',
            {
              'border-primary-80 bg-primary-80 text-black-100': number < currentSolveNumber,
              'border-primary-80 text-primary-80': number === currentSolveNumber,
              'relative after:absolute after:left-1/2 after:top-12 after:h-12 after:w-1 after:-translate-x-1/2 after:bg-solve-contest-progress-divider after:bg-repeat-y':
                number < 5,
            },
          )}
        >
          {number}
        </span>
      ))}
    </div>
  )
}
