import hintPageCubes from '@/assets/images/hint-page-cubes.svg'

export function HintSection({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex-1 overflow-y-clip rounded-xl bg-black-80 p-6'>
      <img src={hintPageCubes} className='pointer-events-none absolute bottom-0 left-0 object-contain opacity-40' />
      <div className='title-h3 card-gradient flex min-h-72 flex-col items-center justify-center px-[15%] text-center'>
        {children}
      </div>
    </div>
  )
}
