import classNames from 'classnames'

const COLOR_MAP = {
  primary: 'bg-primary',
  secondary: 'bg-[#9B2527]',
} as const

type ActionButtonProps = { color: 'primary' | 'secondary'; children: string }
export const ActionButton = ({ color, children }: ActionButtonProps) => {
  return (
    <button type='button' className={classNames(COLOR_MAP[color], 'w-[82px] rounded-[5px] py-[8px]')}>
      {children}
    </button>
  )
}
