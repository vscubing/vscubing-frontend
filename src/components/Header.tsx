import { useCurrentUser, useOngoingContestNumber } from '@/api'
import { useAuth } from '@/providers'
import { useGoogleLogin } from '@react-oauth/google'
import classNames from 'classnames'
import { useMemo } from 'react'
import { NavLink, useParams } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='flex justify-between'>
      <NavBar />
      <LoginSection />
    </div>
  )
}

const NavBar = () => {
  const { data: ongoingContestNumber } = useOngoingContestNumber()
  const params = useParams()
  const openedContestNumber = params?.contestNumber ? Number(params?.contestNumber) : null

  const links = useMemo(() => {
    const list = [
      { text: 'Dashboard', to: '/', active: true },
      { text: 'Ongoing contest', to: `/contest/${ongoingContestNumber}` },
    ]

    if (openedContestNumber && openedContestNumber !== ongoingContestNumber) {
      list.push({ text: `Contest ${openedContestNumber}`, to: `/contest/${openedContestNumber}` })
    }

    return list
  }, [ongoingContestNumber, openedContestNumber])

  return (
    <nav>
      <ul className='flex gap-4'>
        {links.map(({ text, to }) => (
          <li key={text}>
            <NavLink to={to} className={({ isActive }) => classNames('text-blue-400', { underline: isActive })}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const LoginSection = () => {
  const { loggedIn, login, logout } = useAuth()
  const { data: userData } = useCurrentUser()

  const loginHandler = useGoogleLogin({
    onSuccess: ({ code }) => login(code),
    onError: () => console.log('error'),
    flow: 'auth-code',
  })

  return (
    <div>
      {userData}
      {loggedIn ? (
        <>
          <button className='border-2 px-5 py-2' onClick={() => logout()}>
            log out
          </button>
        </>
      ) : (
        <button className='border-2 px-5 py-2' onClick={() => loginHandler()}>
          log in with google
        </button>
      )}
    </div>
  )
}
