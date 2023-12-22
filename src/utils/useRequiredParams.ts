import { useParams } from 'react-router-dom'

export function useRequiredParams<T extends Record<string, unknown>>() {
  return useParams() as T
}
