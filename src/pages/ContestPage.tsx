import { Discipline, getOngoingContestNumber, useContestData } from '@/api'
import { ReconstructTimeButton } from '@/components'
import { groupBy } from '@/utils'
import { useMemo } from 'react'
import { redirect, useParams } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import classNames from 'classnames'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const DEFAULT_DISCIPLINE = '3by3'

export const ContestPage = () => {
  const routeParams = useParams<{ contestNumber: string; discipline: Discipline }>()

  if (!routeParams.contestNumber || !routeParams.discipline) throw Error('no contest number or discipline')

  const { data: solves, isError } = useContestData(Number(routeParams.contestNumber), routeParams.discipline)
  const grouppedSolves = useMemo(() => groupBy(solves ?? [], (attempt) => attempt.username), [solves])

  if (isError) {
    return 'mock data not available'
  }

  if (!solves) {
    return 'loading...'
  }

  return (
    <>
      <div className='bg-primary mb-[26px] flex h-[52px] w-[72px] items-center justify-center rounded-[5px]'>
        <CubeIcon className='w-[23px] text-white' />
      </div>
      {Object.entries(grouppedSolves).map(([username, solves]) => {
        const timeArr = solves.map((solve) => solve.time_ms)
        const bestIndex = timeArr.indexOf(Math.min(...timeArr))
        const worstIndex = timeArr.indexOf(Math.max(...timeArr))

        return (
          <div
            key={username}
            className='bg-panels mb-[26px] grid grid-cols-[1fr_repeat(6,min-content)] items-center gap-[8px] rounded-[5px] py-[12px] pl-[27px] pr-[56px] last:mb-0'
          >
            <span>{username}</span>
            <span className='mr-[22px] border-r-[1px] border-[#A0A0A0]/50 pr-[30px]'>
              <span className='block w-[80px] text-center'>00:00.00</span>
            </span>
            {solves.map(({ id, time_ms }, index) => {
              return (
                <ReconstructTimeButton
                  className={classNames({
                    'text-[#69C382]': bestIndex === index,
                    'text-[#E45B5B]': worstIndex === index,
                  })}
                  key={id}
                  solveId={id}
                  time_ms={time_ms}
                />
              )
            })}
          </div>
        )
      })}
    </>
  )
}
