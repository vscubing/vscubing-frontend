import { useCurrentUser } from '@/api'
import { useAuth } from '@/providers'
import { useGoogleLogin } from '@react-oauth/google'

export const Header = () => {
  return (
    <div className='flex justify-between'>
      <NavBar />
      <LoginSection />
    </div>
  )
}

const NavBar = () => {
  //   const { pathname } = useLocation()
  //   const openedContestNumber = getOpenedContestNumber(pathname)
  //
  //   const links = useMemo(
  //     () => [
  //       { text: 'Dashboard', to: '/', active: true },
  //       { text: 'Ongoing contest', to: `/contest/${ongoingContest?.contest_id}/3by3` },
  //       // { text: 'ontest', to: `/contest/${ongoingContest?.contest_id}/3by3` },
  //     ],
  //     [ongoingContest?.contest_id],
  //   )
  //
  //   return (
  //     <nav>
  //       <ul className='flex gap-4'>
  //         {links.map(({ text, to }) => (
  //           <li key={text}>
  //             <NavLink to={to} className={({ isActive }) => (isActive ? 'underline' : undefined)}>
  //               {text}
  //             </NavLink>
  //           </li>
  //         ))}
  //       </ul>
  //     </nav>
  //   )
  return null
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
