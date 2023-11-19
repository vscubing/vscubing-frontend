import { getOngoingContestNumber } from '@/api/contests'
import { DEFAULT_DISCIPLINE } from '@/constants'
import { isDiscipline } from '@/types'
import { LoaderFunction, redirect } from 'react-router-dom'

export const redirectToOngoingContest: LoaderFunction<null> = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(String(ongoing))
}

export const redirectToDefaultDiscipline: LoaderFunction<null> = async ({ params }) => {
  const discipline = params.discipline

  if (!discipline || !isDiscipline(discipline)) {
    return redirect(DEFAULT_DISCIPLINE)
  }
  return null
}
