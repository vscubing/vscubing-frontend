import classNames from 'classnames'
import { Link } from 'react-router-dom'

type ContestLinkProps = { number: number; ongoing: boolean }
export const ContestLink = ({ number, ongoing }: ContestLinkProps) => {
  return (
    <Link
      className={classNames(ongoing ? 'bg-[#233D50]' : 'bg-panels', 'rounded-[5px] px-[25px] py-[9px] text-[18px]')}
      to={`/contest/${number}`}
    >
      Contest {number} {ongoing ? '(ongoing)' : null}
    </Link>
  )
}
