export function SessionsListHeader() {
  return (
    <div className='flex whitespace-nowrap px-2 text-grey-40'>
      <span className='mr-2 w-11 text-center'>Place</span>
      <span className='mr-2'>Type</span>
      <span className='flex-1'>Nickname</span>
      <span className='mr-4 w-24 text-center'>Average time</span>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className='mr-2 w-24 text-center last:mr-0'>
          Attempt {index + 1}
        </span>
      ))}
    </div>
  )
}
