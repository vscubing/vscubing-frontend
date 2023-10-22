const LS_ACCESS_TOKEN = 'access-token'
export type AccessToken = string | null

export const getAccessTokenLS: () => AccessToken = () => {
  return localStorage.getItem(LS_ACCESS_TOKEN)
}

export const setAccessTokenLS = (value: AccessToken) => {
  if (value) {
    localStorage.setItem(LS_ACCESS_TOKEN, value)
  } else {
    localStorage.removeItem(LS_ACCESS_TOKEN)
  }
}
