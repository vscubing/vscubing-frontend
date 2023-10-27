import { ReconstructTimeButton } from '@/components'
import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'
import { useReconstructor } from '../reconstructor'
import { useCallback, useEffect } from 'react'

type ContestantResultsProps = { username: string; solves: Array<{ id: number; time_ms: number }> } // TODO fix to camelCase
export const ContestantResults = ({ username, solves }: ContestantResultsProps) => {
  const { showReconstructionHandler } = useSolveIdSearchParam()

  const timeArr = solves.map((solve) => solve.time_ms)
  const bestIndex = timeArr.indexOf(Math.min(...timeArr))
  const worstIndex = timeArr.indexOf(Math.max(...timeArr))

  return (
    <div className='mb-[26px] grid grid-cols-[1fr_repeat(6,min-content)] items-center gap-[8px] rounded-[5px] bg-panels py-[12px] pl-[27px] pr-[56px] last:mb-0'>
      <span>{username}</span>
      <span className='mr-[22px] border-r-[1px] border-[#A0A0A0]/50 pr-[30px]'>
        <span className='block w-[80px] text-center text-[#79A1EF]'>00:00.00</span>
      </span>
      {solves.map(({ id, time_ms }, index) => {
        return (
          <ReconstructTimeButton
            className={classNames({
              'text-[#69C382]': bestIndex === index,
              'text-[#E45B5B]': worstIndex === index,
            })}
            onClick={() => showReconstructionHandler(id)}
            key={id}
            time_ms={time_ms}
          />
        )
      })}
    </div>
  )
}

const useSolveIdSearchParam = () => {
  const { showReconstruction } = useReconstructor()
  const [searchParams, setSearchParams] = useSearchParams()

  const setParam = (solveId: number) => {
    setSearchParams((params) => {
      params.append('solveId', String(solveId))
      return params
    })
  }

  const deleteParam = useCallback(
    () =>
      setSearchParams((params) => {
        params.delete('solveId')
        return params
      }),
    [setSearchParams],
  )

  useEffect(() => {
    const openedSolveId = Number(searchParams.get('solveId'))
    if (openedSolveId) {
      showReconstruction(openedSolveId, deleteParam)
    }
  }, [searchParams, showReconstruction, deleteParam])

  return { showReconstructionHandler: setParam }
}
