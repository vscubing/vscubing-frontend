import { LoadingSpinner } from '@/components/ui'
import { StopwatchIcon } from '../../shared/icons'
import { KEY_MAP, KeyMapTile } from '@/shared/KeyMapDialog'
import { Container } from '../../shared/Container'
import { AnimatedBlob } from '../../shared/AnimatedBlob'
import { StaticLinkToApp } from '../../shared/LinkToApp'
import { Suspense, lazy } from 'react'
import { matchesQuery } from '@/utils'
const TwistySection = lazy(() => import('./TwistySection.lazy'))

export function HeroSection() {
  return (
    <Container>
      <section className='flex min-h-svh flex-col justify-center pb-12 pt-28'>
        <div className='grid max-h-[40rem] min-h-[35rem] flex-1 grid-cols-[1fr,auto] grid-rows-[auto,1fr] gap-3 lg:max-h-none lg:grid-cols-[1fr,30rem] lg:grid-rows-[40rem,auto]'>
          <div
            style={{ clipPath: matchesQuery('lg') ? CLIP_PATH_POLYGON_TABLET : CLIP_PATH_POLYGON }}
            className='row-span-2 flex h-full flex-col items-start justify-center rounded-3xl p-10 [background:linear-gradient(159deg,rgba(73,76,116,1)_0%,rgba(27,30,37,1)_71%)] lg:col-span-2 lg:row-span-1'
          >
            <h1 className='landing-h1 mb-10 flex flex-wrap text-white-100'>
              <span className='whitespace-nowrap'>
                Join <span className='landing-h3 text-grey-40'>the</span> exciting world
              </span>
              <span className='whitespace-nowrap'>
                <span className='landing-h3 text-grey-40'>of</span> <StopwatchIcon className='-mt-2 inline' /> virtual
                speedcubing
              </span>
            </h1>
            <p className='mb-6 flex items-center gap-2 text-white-100 '>
              <AlternatingText text1='Improve' text2='Compete' text3='Have fun' />{' '}
              <span className='text-[1.125rem]'>with our online contests</span>
            </p>
            <StaticLinkToApp className='h-[4.5rem] px-20' />
          </div>

          <div className='flex aspect-square w-[21rem] shrink-0 flex-col items-center justify-center rounded-3xl bg-black-100 pb-4 lg:mt-[-19rem] lg:aspect-square lg:w-auto'>
            <Suspense fallback={<LoadingSpinner />}>
              <TwistySection />
            </Suspense>
          </div>
          <div className='relative -ml-[22rem] flex items-center justify-center overflow-clip rounded-3xl bg-secondary-80 lg:col-start-1 lg:row-start-2 lg:ml-0'>
            <AnimatedBackground />
            <ul className='absolute grid -rotate-[18deg] grid-cols-[repeat(10,auto)] gap-1 lg:scale-75'>
              {KEY_MAP.map(({ keyName, cubeMovement }) => (
                <KeyMapTile
                  key={keyName}
                  keyName={keyName}
                  cubeMovement={cubeMovement}
                  className='h-12 w-12 rounded-lg py-1 pl-2 pr-2 text-sm'
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  )
}

function AlternatingText({ text1, text2, text3 }: { text1: string; text2: string; text3: string }) {
  return (
    <span className='relative inline-block h-9 w-[6.5rem] overflow-y-clip rounded-xl border border-secondary-20 text-center text-[1.125rem] font-medium'>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text'>
        {text1}
      </span>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text [animation-delay:-2s]'>
        {text2}
      </span>
      <span className='vertical-alignment-fix absolute left-0 h-9 w-full animate-landing-alternating-text [animation-delay:-4s]'>
        {text3}
      </span>
    </span>
  )
}

function AnimatedBackground() {
  return (
    <>
      <AnimatedBlob fromLeft='-10%' fromTop='-30%' toLeft='60%' toTop='-80%' className='h-[110%] bg-secondary-40' />
      <AnimatedBlob fromLeft='70%' fromTop='-38%' toLeft='15%' toTop='120%' className='h-[110%] bg-primary-100' />
      <AnimatedBlob fromLeft='28%' fromTop='-34%' toLeft='-10%' toTop='25%' className='h-[110%] bg-secondary-20' />
      <AnimatedBlob fromLeft='68%' fromTop='30%' toLeft='30%' toTop='-3%' className='h-[110%] bg-primary-80' />
      <AnimatedBlob fromLeft='-5%' fromTop='55%' toLeft='-8%' toTop='-95%' className='h-[110%] bg-primary-60' />
      <AnimatedBlob fromLeft='28%' fromTop='20%' toLeft='80%' toTop='30%' className='h-[110%] bg-secondary-40' />
    </>
  )
}

const CLIP_PATH_POLYGON =
  'polygon( calc(100% - 24px) 0px, 24px 0px, 24px 0px, 20.1070836px 0.3141204px, 16.4141568px 1.2235392px, 12.9706332px 2.6788428px, 9.8259264px 4.6306176px, 7.02945px 7.02945px, 4.6306176px 9.8259264px, 2.6788428px 12.9706332px, 1.2235392px 16.4141568px, 0.3141204px 20.1070836px, 3.9733444681785e-31px 24px, 0px calc(100% - 24px), 0px calc(100% - 24px), 0.3141204px calc(100% - 20.107035px), 1.2235392px calc(100% - 16.41408px), 2.6788428px calc(100% - 12.970545px), 4.6306176px calc(100% - 9.82584px), 7.02945px calc(100% - 7.0293750000001px), 9.8259264px calc(100% - 4.6305599999999px), 12.9706332px calc(100% - 2.678805px), 16.4141568px calc(100% - 1.22352px), 20.1070836px calc(100% - 0.3141149999999px), 24px calc(100% - 1.1368683772162e-13px), calc(100% - 374px) calc(100% - 0px), calc(100% - 374px) calc(100% - 0px), calc(100% - 370.107035px) calc(100% - 0.3141149999999px), calc(100% - 366.41408px) calc(100% - 1.2235199999999px), calc(100% - 362.970545px) calc(100% - 2.678805px), calc(100% - 359.82584px) calc(100% - 4.6305600000001px), calc(100% - 357.029375px) calc(100% - 7.0293750000001px), calc(100% - 354.63056px) calc(100% - 9.82584px), calc(100% - 352.678805px) calc(100% - 12.970545px), calc(100% - 351.22352px) calc(100% - 16.41408px), calc(100% - 350.314115px) calc(100% - 20.107035px), calc(100% - 350px) calc(100% - 24px), calc(100% - 350px) 363px, calc(100% - 350px) 363px, calc(100% - 349.685885px) 359.107035px, calc(100% - 348.77648px) 355.41408px, calc(100% - 347.321195px) 351.970545px, calc(100% - 345.36944px) 348.82584px, calc(100% - 342.970625px) 346.029375px, calc(100% - 340.17416px) 343.63056px, calc(100% - 337.029455px) 341.678805px, calc(100% - 333.58592px) 340.22352px, calc(100% - 329.892965px) 339.314115px, calc(100% - 326px) 339px, calc(100% - 24px) 339px, calc(100% - 24px) 339px, calc(100% - 20.10825px) 338.685885px, calc(100% - 16.416px) 337.77648px, calc(100% - 12.97275px) 336.321195px, calc(100% - 9.828px) 334.36944px, calc(100% - 7.03125px) 331.970625px, calc(100% - 4.6320000000001px) 329.17416px, calc(100% - 2.6797500000002px) 326.029455px, calc(100% - 1.2239999999999px) 322.58592px, calc(100% - 0.3142499999999px) 318.892965px, calc(100% - 2.2737367544323e-13px) 315px, calc(100% - 0px) 24px, calc(100% - 0px) 24px, calc(100% - 0.3142499999999px) 20.1070836px, calc(100% - 1.2239999999997px) 16.4141568px, calc(100% - 2.67975px) 12.9706332px, calc(100% - 4.6320000000001px) 9.8259264px, calc(100% - 7.03125px) 7.02945px, calc(100% - 9.828px) 4.6306176px, calc(100% - 12.97275px) 2.6788428px, calc(100% - 16.416px) 1.2235392px, calc(100% - 20.10825px) 0.3141204px, calc(100% - 24px) 3.9733444681785e-31px)'

const CLIP_PATH_POLYGON_TABLET =
  'polygon(calc(100% - 24px) 0px, 24px 0px, 24px 0px, 20.1070836px 0.3141204px, 16.4141568px 1.2235392px, 12.9706332px 2.6788428px, 9.8259264px 4.6306176px, 7.02945px 7.02945px, 4.6306176px 9.8259264px, 2.6788428px 12.9706332px, 1.2235392px 16.4141568px, 0.3141204px 20.1070836px, 3.9733444681785E-31px 24px, 0px calc(100% - 24px), 0px calc(100% - 24px), 0.3141204px calc(100% - 20.107035px), 1.2235392px calc(100% - 16.41408px), 2.6788428px calc(100% - 12.970545px), 4.6306176px calc(100% - 9.82584px), 7.02945px calc(100% - 7.0293750000001px), 9.8259264px calc(100% - 4.6305600000001px), 12.9706332px calc(100% - 2.678805px), 16.4141568px calc(100% - 1.22352px), 20.1070836px calc(100% - 0.31411500000002px), 24px calc(100% - 1.1368683772162E-13px), calc(100% - 516.027px) calc(100% - 0px), calc(100% - 516.027px) calc(100% - 0px), calc(100% - 512.134278px) calc(100% - 0.31411499999979px), calc(100% - 508.441464px) calc(100% - 1.2235199999998px), calc(100% - 504.997986px) calc(100% - 2.678805px), calc(100% - 501.853272px) calc(100% - 4.6305600000001px), calc(100% - 499.05675px) calc(100% - 7.0293750000001px), calc(100% - 496.657848px) calc(100% - 9.82584px), calc(100% - 494.705994px) calc(100% - 12.970545px), calc(100% - 493.250616px) calc(100% - 16.41408px), calc(100% - 492.341142px) calc(100% - 20.107035px), calc(100% - 492.027px) calc(100% - 24px), calc(100% - 492.027px) 358px, calc(100% - 492.027px) 358px, calc(100% - 491.712885px) 354.107035px, calc(100% - 490.80348px) 350.41408px, calc(100% - 489.348195px) 346.970545px, calc(100% - 487.39644px) 343.82584px, calc(100% - 484.997625px) 341.029375px, calc(100% - 482.20116px) 338.63056px, calc(100% - 479.056455px) 336.678805px, calc(100% - 475.61292px) 335.22352px, calc(100% - 471.919965px) 334.314115px, calc(100% - 468.027px) 334px, calc(100% - 24px) 334px, calc(100% - 24px) 334px, calc(100% - 20.107035px) 333.685885px, calc(100% - 16.41408px) 332.77648px, calc(100% - 12.970545px) 331.321195px, calc(100% - 9.82584px) 329.36944px, calc(100% - 7.0293750000001px) 326.970625px, calc(100% - 4.6305599999999px) 324.17416px, calc(100% - 2.678805px) 321.029455px, calc(100% - 1.22352px) 317.58592px, calc(100% - 0.3141149999999px) 313.892965px, calc(100% - 0px) 310px, calc(100% - 0px) 24px, calc(100% - 0px) 24px, calc(100% - 0.3141149999999px) 20.1070836px, calc(100% - 1.2235199999998px) 16.4141568px, calc(100% - 2.6788049999999px) 12.9706332px, calc(100% - 4.6305600000001px) 9.8259264px, calc(100% - 7.0293750000001px) 7.02945px, calc(100% - 9.82584px) 4.6306176px, calc(100% - 12.970545px) 2.6788428px, calc(100% - 16.41408px) 1.2235392px, calc(100% - 20.107035px) 0.3141204px, calc(100% - 24px) 3.9733444681785E-31px)'