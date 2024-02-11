export function AbortPrompt({
  isVisible,
  onCancel,
  onConfirm,
}: {
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!isVisible) {
    return null
  }

  return (
    <div className='text-white-100 absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-[5px] bg-[#11191F]'>
      <div className='bg-panels rounded-[5px] px-[40px] py-[25px]'>
        <p className='mb-[25px] text-center text-[24px]'>
          If you quit now,
          <br />
          your result will be DNFed
        </p>
        <div className='flex justify-center gap-[17px]'>
          <button onClick={onConfirm} className='w-[82px] rounded-[5px] bg-[#9B2527] py-[8px]'>
            quit
          </button>
          <button onClick={onCancel} className='bg-primary w-[82px] rounded-[5px] py-[8px]'>
            resume
          </button>
        </div>
      </div>
    </div>
  )
}
