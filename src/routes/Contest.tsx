import { useParams } from 'react-router-dom'

export const Contest = () => {
  const { contestNumber, discipline } = useParams()

  return (
    <>
      <div>contestNumber: {contestNumber}</div>
      <div>discipline: {discipline}</div>
    </>
  )
}
