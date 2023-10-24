import { useOngoingContestNumber } from '@/api'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useParams, NavLink } from 'react-router-dom'

export const NavBar = () => {
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
      <ul className='flex gap-16'>
        {links.map(({ text, to }) => (
          <li key={text}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames(
                  isActive ? 'border-[#238636] text-white' : 'border-transparent text-white/50',
                  'block border-t-[3px] py-[12px] text-[20px]',
                )
              }
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
