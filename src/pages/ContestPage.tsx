import { Navigate, Outlet, redirect, useParams } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { Discipline } from '@/types'
import { getOngoingContestNumber } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const ContestPage = () => {
  const routeParams = useParams<{ discipline: Discipline }>()
  const discipline = routeParams.discipline

  if (!discipline) {
    return <Navigate to={DEFAULT_DISCIPLINE} />
  }

  return (
    <>
      <div className='mb-[26px] flex h-[52px] w-[72px] items-center justify-center rounded-[5px] bg-primary'>
        <CubeIcon className='w-[23px] text-white' />
      </div>
      <Outlet />
    </>
  )
}
