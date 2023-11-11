import { LoaderFunction, Outlet, redirect } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { getOngoingContestNumber } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'

export const redirectToOngoingContest: LoaderFunction<null> = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(String(ongoing))
}

export const redirectToDefaultDiscipline: LoaderFunction<null> = async ({ params }) => {
  const discipline = params.discipline

  if (!discipline) {
    return redirect(DEFAULT_DISCIPLINE)
  }
  return null
}

export const ContestPage = () => {
  return (
    <>
      <div className='mb-[26px] flex h-[52px] w-[72px] items-center justify-center rounded-[5px] bg-primary'>
        <CubeIcon className='w-[23px] text-white' />
      </div>
      <Outlet />
    </>
  )
}
