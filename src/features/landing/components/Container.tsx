import { ReactNode } from '@tanstack/react-router'

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className='px-6'>
      <div className='mx-auto max-w-[86rem]'>{children}</div>
    </div>
  )
}
