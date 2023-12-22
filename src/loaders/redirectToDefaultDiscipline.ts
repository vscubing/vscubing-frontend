import { DEFAULT_DISCIPLINE } from '@/constants'
import { isDiscipline } from '@/types'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export async function redirectToDefaultDiscipline({ params }: LoaderFunctionArgs) {
  const discipline = params.discipline

  if (!discipline || !isDiscipline(discipline)) {
    return redirect(DEFAULT_DISCIPLINE)
  }
  return null
}
