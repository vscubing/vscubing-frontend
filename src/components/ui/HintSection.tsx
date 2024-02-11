export function HintSection({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex-1 overflow-y-clip rounded-xl bg-black-80 p-6'>
      <div className='bg-cubes absolute inset-0 h-full w-full bg-cover bg-left-bottom bg-no-repeat opacity-40'></div>
      <div className='title-h3 card-gradient flex min-h-72 flex-col items-center justify-center px-[15%] text-center'>
        {children}
      </div>
    </div>
  )
}
