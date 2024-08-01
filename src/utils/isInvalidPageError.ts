import { AxiosError } from 'axios'

// this handles the case when the page number is greater than the total number of pages, so that we can redirect to the first page
// NOTE: this should be used before checking for 404 status code
export function isInvalidPageError(error: AxiosError | null) {
  const response = error?.response
  return (
    response?.status === 404 &&
    response.data &&
    typeof response.data === 'object' &&
    'detail' in response.data &&
    response.data.detail === 'Invalid page.'
  )
}
