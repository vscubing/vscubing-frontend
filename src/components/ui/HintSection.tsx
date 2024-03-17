export function HintSection({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-1 flex-col overflow-y-clip rounded-2xl bg-black-80 p-6 sm:p-0'>
      <div className='absolute inset-0 h-full w-full bg-cubes bg-cover bg-bottom opacity-40 sm:hidden'></div>
      <div className='title-h3 bg-card-gradient flex min-h-72 flex-col items-center justify-center gap-10 rounded-xl px-[15%] text-center md:gap-6 md:px-[5%] sm:flex-1 sm:justify-start sm:px-3 sm:py-10'>
        {children}
      </div>
    </div>
  )
}
