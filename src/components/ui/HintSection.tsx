export function HintSection({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex-1 overflow-y-clip rounded-2xl bg-black-80 p-6'>
      <div className='absolute inset-0 h-full w-full bg-cubes bg-cover bg-bottom opacity-40'></div>
      <div className='title-h3 bg-card-gradient flex min-h-72 flex-col items-center justify-center rounded-xl px-[15%] text-center'>
        {children}
      </div>
    </div>
  )
}
