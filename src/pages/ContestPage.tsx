import { getOngoingContestNumber } from '@/api'
import { redirect, useParams } from 'react-router-dom'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const DEFAULT_DISCIPLINE = '3by3'

export const ContestPage = () => {
  const { contestNumber, discipline } = useParams()

  return (
    <>
      <div>contestNumber: {contestNumber}</div>
      <div>discipline: {discipline}</div>
    </>
  )
}
