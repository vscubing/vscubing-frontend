import { useState } from 'react'

export function DeviceWarningModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: (isIgnoreChecked: boolean) => void
}) {
  const [isIgnoreChecked, setIsIgnoreChecked] = useState(false)

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
      className='fixed flex h-full w-full flex-col items-center justify-center rounded-[5px] bg-black bg-opacity-40 px-5 text-white'
    >
      <div className='rounded-[5px] bg-panels px-[40px] py-[25px] text-center md:text-left'>
        <p className='mb-4 text-[24px]'>Solving without a keyboard is currently not supported.</p>
        <label className='mb-3 block'>
          <input
            checked={isIgnoreChecked}
            onChange={(event) => setIsIgnoreChecked(event.target.checked)}
            type='checkbox'
          />
          Do not show this message again
        </label>
        <div className='flex justify-center gap-[17px] md:justify-start'>
          <button onClick={onCancel} className='rounded-[5px] bg-[#9B2527] px-2 py-2'>
            go back
          </button>
          <button onClick={() => onConfirm(isIgnoreChecked)} className='rounded-[5px] bg-primary px-2 py-2'>
            continue anyway
          </button>
        </div>
      </div>
    </div>
  )
}
