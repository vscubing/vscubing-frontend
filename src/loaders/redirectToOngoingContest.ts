import { getOngoingContestNumber } from '@/api/contests'
import { LoaderFunction, redirect } from 'react-router-dom'

export const redirectToOngoingContest: LoaderFunction<null> = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(String(ongoing))
}
