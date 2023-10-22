const LS_ACCESS_TOKEN = 'access-token'
const LS_REFRESH_TOKEN = 'refresh-token'
type Token = string | null

export const getAccessTokenLS: () => Token = () => {
  return localStorage.getItem(LS_ACCESS_TOKEN)
}

export const setAccessTokenLS = (value: Token) => {
  if (value) {
    localStorage.setItem(LS_ACCESS_TOKEN, value)
  } else {
    localStorage.removeItem(LS_ACCESS_TOKEN)
  }
}

export const getRefreshTokenLS: () => Token = () => {
  return localStorage.getItem(LS_REFRESH_TOKEN)
}

export const setRefreshTokenLS = (value: Token) => {
  if (value) {
    localStorage.setItem(LS_REFRESH_TOKEN, value)
  } else {
    localStorage.removeItem(LS_REFRESH_TOKEN)
  }
}
