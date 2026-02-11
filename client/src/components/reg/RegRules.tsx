import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { SiStartrek } from "react-icons/si";
import { FaJediOrder } from "react-icons/fa";
import ParticlesBg from '../layout/ParticlesBg';

const RegRules: FC = () => {
  const sectionClass = "flex flex-row justify-between my-2";
  const sectionTwo = "rounded-2xl m-5 mx-auto py-10 px-8 mb-10 shadow-[inset_1px_5px_20px_rgba(0,0,0,0.2)]";
  const articleClass = "relative rounded-2xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const textClass = "roboto rounded-lg shadow-lg dark:shadow-sky-100/50 h-60 md:h-80 lg:h-96 w-[47.5%] p-4 text-cyan-200 text-2xl md:text-3xl font-semibold drop-shadow-md";
  const pClass = "roboto px-6 py-4 lg:text-xl text-zinc-500/90 dark:text-zinc-200/90 font-semibold leading-7 md:leading-8";
  const brightBorder = "absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const imageClass = "h-60 md:h-80 lg:h-96 w-[49%] rounded-lg mb-8 font-semibold text-zinc-700 justify-center flex shadow-lg dark:shadow-sky-100/50";
  const divClass = "roboto md:h-80 lg:h-96 w-[49%] text-sm sm:text-base md:text-xl rounded-lg p-2 md:p-4 mb-8 font-semibold text-zinc-700 dark:text-zinc-200/90 justify-center flex leading-6 md:leading-8";

  return (
    <>
      <ParticlesBg theme='bubble' colour='#94a3b8' />
      <section className='relative z-20 mx-2 sm:mx-0 my-[-1.5rem]'>
        <h1 className="space-grotesk text-4xl md:text-5xl font-bold my-5 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
          HelpMe - Rules & Regulations
        </h1>

        <h2 className='space-grotesk text-zinc-500/90 dark:text-zinc-200/90 text-xl sm:text-4xl font-bold mb-2'>Rules (Please don't break them)</h2>
        <section className='relative bg-rules-car rounded-2xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]'>
          <div className='bg-black/50 text-center h-44 rounded-2xl shadow-lg flex items-start justify-center' >
            <span className='michroma text-lg sm:text-xl md:text-3xl font-bold text-cyan-400 pt-6'>
              No driver(s) may enter data
            </span>
          </div>
        </section>

        <section className='text-center'>
          <p className='robot font-semibold text-md md:text-lg text-cyan-500'>Until safely stopped* / MSM**</p>
        </section>

        <section className='rounded-lg m-5 mx-auto py-10 px-8 mb-10 shadow-[inset_1px_5px_20px_rgba(0,0,0,0.2)]'>
          <article className={`flex ${articleClass}`}>
            <div className='flex flex-row items-center mx-auto text-center'>
              <p className={pClass}> Live long ... and prosper  </p>
              <SiStartrek className='text-zinc-500/90 dark:text-zinc-200/90 shadow-md m-5'/>
            </div>
            <div className={brightBorder} />
          </article>
        </section>

        <section className={`${sectionClass} mb-10`}>
          <div 
            className={`bg-rules-people-1 ${textClass}`}
          >
            People allowed to enter data include the following :
          </div>
          <div 
            className={`bg-rules-people-2 ${textClass}`}
          >
            Passengers in cars & lorries, not on motorcycles
          </div>
        </section>

        <section className={sectionTwo}>
          <article className={articleClass}>
            <p className={pClass}>
              One aspect of human thought is reflection and for introspection. We thought it would be good to help out motorists who may not be able to check their own car.
              When in a safe place, if viable please share what is observably wrong but only if safe to do so. You have just looked out for someone
            </p>
            <div className={brightBorder} />
          </article>
        </section>

        <section className={`${sectionClass} mb-10`}>
          <div 
            className={`bg-rules-people-3 ${textClass}`}
          >
            Cyclists (not currently cycling)
          </div>
          <div 
            className={`bg-rules-people-4 ${textClass}`}
          >
            Pedestrians (not crossing the road)
          </div>
        </section>

        <section className={sectionTwo}>
          <article className={articleClass}>
            <p className={pClass}>Strictly no drivers currently driving may use this site's functionality please, we do not want people crashing </p>
            <div className={brightBorder}></div>
          </article>
        </section>

        <section className={`${sectionClass} mb-10`}>
          <div 
            className={`bg-rules-people-5 ${textClass}`}
          >
            People sitting on benches
          </div>
          <div 
            className={`bg-rules-people-6 ${textClass}`}
          >
            People who have just recently stopped skateboarding or bmxing
          </div>
        </section>

        <section className={sectionTwo}>
          <article className={articleClass}>
            <div className="mx-auto text-center">
              <p className={pClass}>One world. One race. Lots of people with potentially faulty cars</p>
              <div className={brightBorder} />
            </div>
          </article>
        </section>

        <section className={`${sectionClass} mb-10`}>
          <div 
            className={`bg-rules-people-7 ${textClass}`}
          >
            People with mobiles
          </div>
          <div 
            className={`bg-rules-people-8 ${textClass}`}
          >
            People who take life seriously
          </div>
        </section>

        <section className={sectionTwo}>
          <article className={articleClass}>
            <div className="mx-auto text-center">
              <p className={pClass}>Remember to be courteous to drivers around you and drive safely </p>
              <div className={brightBorder} />
            </div>
          </article>
        </section>

        <section className={`${sectionClass} mb-10`}>
          <div 
            className={`bg-rules-people-9 ${textClass}`}
          >
            People who don't take life seriously
          </div>
          <div 
            className={`bg-rules-people-10 ${textClass}`}
          >
            Anyone who wants to help
          </div>
        </section>

        <section className={sectionTwo}>
          <article className={articleClass}>
            <div className="mx-auto text-center">
              <p className='px-6 py-4 shadow-lg rounded-2xl lg:text-xl text-zinc-500/90 dark:text-zinc-200/90 font-semibold leading-7 md:leading-8'>Please let a passenger use this site or pullover</p>
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse" />
            </div>
          </article>
        </section>
        
        <section className='bg-zinc-900/50 text-white text-center py-4'>
          <h3 className='space-grotesk text-lg md:text-xl lg:text-2xl font-bold'>Rules Photo Credits from UnSplash</h3>
          <ul className='roboto text-sm md:text-base lg:text-lg mb-2'>
            <br />
            <li>Little Girl Having Fun with Mobile - <strong>Pan Xiaozhen</strong></li>
            <li>Three Gents Being Passengers - <strong>Luke Porter</strong></li>
            <li>Lady Cycling through City - <strong>Vitor Pinto</strong></li>
            <li>People Crossing Tokyo Busy Junction - <strong>Timo Volz</strong></li>
            <li>Lady Sitting on a Bench - <strong>Jorge Dominguez</strong></li>
            <li>Skate Park with People Stopped - <strong>Jan Kopriva</strong></li>
            <li>Mobile Phone Amongst Technology - <strong>Caspar Camille Rubin</strong></li>
            <li>Magnificent Waterfall - <strong>Josh Gordon</strong></li>
            <li>Four Gents Laughing at Computer- <strong>Priscilla Du Preez</strong></li>
            <li>Smiling Helpful lady - <strong>David Hurley</strong></li>
            <li>Not a picture of someone not driving - <strong>I.M.Notdriving</strong></li>
          </ul>
        </section>

        <section className="mb-2 text-sm md:text-lg">
          <h3 className='roboto font-bold text-zinc-700 dark:text-zinc-200/90'>* Pulled over correctly and safely and are not blocking traffic, so not driving</h3>
          <h3 className='roboto font-bold text-zinc-700 dark:text-zinc-200/90'>**MSM - Mirror Signal Manoeuvre (this is still driving, so not this)</h3>
        </section>

        <nav className='poppins flex flex-col md:flex-row mb-4 md:mb-20 px-4 w-full max-w-4xl mx-auto text-sm md:text-base justify-center md:justify-between text-center'> 
          <Link 
            to='/reghelp'
              className='poppins text-slate-700 font-semibold bg-yellow-300 rounded my-2 px-4 py-3 h-12 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition'
                onClick={() => toast.success(`Being helpful is great!!`)}
          >
            The Point of Being Helpful
          </Link>
          <Link 
            to='/reg' 
              className='poppins text-slate-700 font-semibold bg-yellow-300 rounded my-2 px-4 py-3 h-12 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition'
          >
            HelpMe-Car Home
          </Link>
        </nav>

        <section>
          <h2 className='space-grotesk text-zinc-500 dark:text-zinc-200/90 text-2xl md:text-4xl font-bold mb-2'>Regulations</h2>

          <section className='relative bg-rules-car rounded-2xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]'>
            <div className='bg-black/50 text-center h-44 rounded-2xl shadow-lg flex items-start justify-center'>
              <span className='michroma text-lg md:text-3xl font-bold text-cyan-400 pt-6'>
                Drive safely and follow the Highway Code
              </span>
            </div>
          </section>

          <section className='mt-8 lg:space-y-10'>
            <article className={sectionClass}>
              <div className={`h-60 ${divClass}`}>
                <p>
                  Generally following the laws laid down in the 
                  <span>
                    <Link to='https://www.gov.uk/browse/driving/highway-code-road-safety' className='text-cyan-500'> High Way Code  
                    </Link>
                  </span> 
                  {' '} will ensure no problems when driving, apart from other cars. Let's hope their equipment isn't faulty! Also, the signs won't be as compliacated as they are on the right...
                </p>
              </div>
              <div className={`bg-rules-people-11 ${imageClass}`} />
            </article>

            <article className={sectionClass}>
              <div className={`bg-rules-people-12 ${imageClass}`} />
              <div className={`h-40 ${divClass}`}>
                <p>Every year we must get our cars checked to be officially road worthy to pass our <span><Link to='https://www.gov.uk/check-mot-status' className='text-cyan-500'> MOT Test</Link></span>, wherein said faults will have been sorted (we hope) or our cars can become fossils, maybe not as extremely as on the left!</p>
              </div>
            </article>

            <article className={sectionClass}>
              <div className={`h-60 ${divClass}`}>
                <p>The point of this site is mainly human and car safety, hopefully with working lights and other elements we might stay safer, get in less accidents and incur less costs</p>
              </div>
              <div className={`bg-rules-people-13 ${imageClass}`} />
            </article>

            <article className={sectionClass}>
              <div className={`bg-rules-people-14 ${imageClass}`} />
              <div className={`h-60 ${divClass}`}>
                <p>At some point in our lives we were happy little people, then cynicism and self-importance takes hold. We're taught to try to be better than each other. Be more little person (PS I'm not not including trans people, that's for another time)</p>
              </div>
            </article>
            
            <article className={sectionClass}>
              <div className={`h-60 ${divClass}`}>
                <p>Now is the time to start smiling, now is the time to help each other, now is the time to forget this and that and just be the helpful selfless human that is inside you, like this fellow. Or other people illustrated here</p>
              </div>
              <div className={`bg-rules-people-15 ${imageClass}`} />
            </article>
          </section>
        </section>

        <section>
          <article className='bg-zinc-900/50 text-white text-center py-4 mb-2'>
            <h3 className='space-grotesk text-lg md:text-xl lg:text-2xl font-bold'>Regulations Photo Credits from UnSplash</h3>
            <ul className='roboto text-sm md:text-base lg:text-lg mb-2'>
              <br />
              <li>Daunting Road Signs  - <strong>Nick Fewings</strong></li>
              <li>Abandoned American 1950's Pick-Up - <strong>Christopher Burns</strong></li>
              <li>Car Reflection on Mobile Lying on Keyboard - <strong>Tarun Dhiman</strong></li>
              <li>Little Boy Laughing on Bench with Book - <strong>Ben White</strong></li>
              <li>A Happy Man as People Should Be - <strong>Charles Etoroma</strong></li>
              <li>Remember, nnnnooo drivers - <strong>I.M.Notdriving</strong></li>
            </ul>
          </article>

          <nav className='poppins flex flex-col mb-4 md:mb-20 px-4 md:flex-row w-full max-w-4xl mx-auto text-sm md:text-base justify-center md:justify-between text-center'>
            <Link 
              to='/reghelp'
                className='text-slate-700 font-semibold bg-yellow-300 rounded px-4 py-3 h-12 mt-4 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition'
                  onClick={() => toast.success(`Being helpful is great!!`)}
            >
              The Point of Being Helpful
            </Link>
            <Link 
              to='/reg' 
                className='text-slate-700 font-semibold bg-yellow-300 rounded py-3 h-12 mt-4 md:px-4 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition'
            >
              HelpMe-Car Home
            </Link>
          </nav>

          <article className='space-grotesk flex relative items-center justify-center rounded-2xl bg-sky-100 p-2 mb-4 shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]'>
            <FaJediOrder size={25} className='text-zinc-700 font-bold mr-5'/>
            <p className='font-bold text-zinc-700 text-base sm:text-lg md:text-2xl lg:text-3xl'>Thank you for reading the rules </p>
            <FaJediOrder size={25} className='text-zinc-700 font-bold ml-5'/>
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse" />
          </article>
        </section>
      </section>
    </>
  );
};

export default RegRules;