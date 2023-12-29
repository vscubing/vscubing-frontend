import { useQuery } from '@tanstack/react-query'
import cubesCardBg from '@/assets/images/cubes-card-bg.svg'
import { CubeBadge, Header, PrimaryButton } from '@/components'
import { userQuery } from '@/features/auth'
import { Link } from '@tanstack/react-router'

export function Dashboard() {
  const { data: userData } = useQuery(userQuery)

  return (
    <>
      <Header caption={userData ? `Greetings, ${userData.username}` : 'Greetings, SpeedCubers'} />
      <h1 className='title-h1 px-4 py-10 text-center text-secondary-20'>
        Are you ready to take your love for cubing to the next level?
      </h1>
      <section className='card-gradient'>
        <div
          style={{ backgroundImage: `url(${cubesCardBg})` }}
          className='flex justify-between bg-contain bg-[position:35%,center] bg-no-repeat p-4'
        >
          <div className='flex flex-col items-start justify-between gap-2'>
            <h2 className='title-lg'>
              <span className='text-secondary-20'>Ongoing</span> Contest
            </h2>
            <PrimaryButton asChild>
              <Link to='contest'>Solve now</Link>
            </PrimaryButton>
          </div>
          <div className='text-right'>
            <p className='title-h3 mb-3'>Duration</p>
            <p className='mb-6 text-lg'>10 Dec 2023-17 Dec 2023</p>
            <CubeBadge cube='3by3' />
          </div>
        </div>
      </section>
      <div className='flex '>
        <section className='rounded-2xl bg-black-80 px-6 py-4'></section>
        <section className='rounded-2xl bg-black-80 px-6 py-4'></section>
      </div>
    </>
  )
}
