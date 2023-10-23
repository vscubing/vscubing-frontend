import { getOngoingContestNumber, useContestData } from '@/api'
import { formatSolveTime, groupBy } from '@/utils'
import { useMemo } from 'react'
import { redirect, useParams } from 'react-router-dom'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const DEFAULT_DISCIPLINE = '3by3'

export const ContestPage = () => {
  const { contestNumber, discipline } = useParams()
  if (!contestNumber || !discipline) throw Error('no contest number or discipline')

  const { data: solves, isError } = useContestData(Number(contestNumber), discipline)
  const grouppedSolves = useMemo(() => groupBy(solves ?? [], (attempt) => attempt.username), [solves])

  if (isError) {
    return 'mock data not available'
  }

  if (!solves) {
    return 'loading...'
  }

  return (
    <>
      <div className='text-left'>{discipline}</div>
      {Object.entries(grouppedSolves).map(([username, solves]) => (
        <div key={username} className='flex gap-2'>
          <span>{username}</span>
          {solves.map(({ id, time_ms }) => (
            <span key={id}>{formatSolveTime(time_ms)}</span>
          ))}
        </div>
      ))}
    </>
  )
}
