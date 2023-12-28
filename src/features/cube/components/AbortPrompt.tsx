export function AbortPrompt({ onCancel, onConfirm }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className='absolute flex h-full w-full flex-col items-center justify-center rounded-[5px] bg-[#11191F] text-white'>
      <div className='rounded-[5px] bg-panels px-[40px] py-[25px]'>
        <p className='mb-[25px] text-center text-[24px]'>
          If you quit now,
          <br />
          your result will be DNFed
        </p>
        <div className='flex justify-center gap-[17px]'>
          <button onClick={onConfirm} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
            quit
          </button>
          <button onClick={onCancel} className='w-[82px] rounded-[5px] bg-primary py-[8px]'>
            resume
          </button>
        </div>
      </div>
    </div>
  )
}
