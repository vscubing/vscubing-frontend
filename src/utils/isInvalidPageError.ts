import { AxiosError } from 'axios'

// NOTE: this should be used before checking for 404 status code
export function isInvalidPageError(error: AxiosError | null) {
  const response = error?.response
  return (
    response?.status === 404 &&
    response.data &&
    typeof response.data === 'object' &&
    'detail' in response.data &&
    response.data.detail === 'Invalid Page'
  )
}
