import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ParticlesBg from '../layout/ParticlesBg';

const RegSafety: FC = () => {
  const quoteClass = "font-space bg-gray-200 dark:bg-gray-700 dark:text-zinc-200/90 mb-2 px-4 py-4 rounded-lg shadow-lg dark:shadow-sky-100/50 backdrop-blur-md border border-white/20";
  const pClass = "font-inter mb-5 px-6 py-4 text-sm md:text-base text-zinc-700/80 dark:text-zinc-200/90 leading-6";
  const buttonClass = "text-zinc-700 font-semibold dark:bg-yellow-300 bg-sky-100 rounded px-4 py-3 h-12 mt-4 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
  
  return (
    <>
      <ParticlesBg theme='nasa' colour='blue-500'/>
      <section className='relative z-20 mx-2 mb-4'>
        <h1 className="font-space text-4xl sm:text-5xl font-bold my-8 pb-1 w-96 text-transparent 
          bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 leading-[4rem]"
        >
          HelpMe-Safety
        </h1>
        <section className='roboto'>
        <h2 className='font-space text-zinc-500/90 dark:text-zinc-200/90 text-xl sm:text-4xl font-bold mb-4'>Driver Accident Statistics from DoT</h2>
          <section aria-labelledby='safety-intent'>
            <h2 id="safety-intent" className='sr-only'>
              This site could potentially redce the number of accidents, even only a little bit
            </h2>
            <blockquote className='mb-2'>
              <p className={quoteClass}>
                "The best thing this site could hope to achieve is reduce the number of accidents on the road and the very least could help drivers ensure their car's are safe and roadworthy. Below is some analysis of vehicle stats, maybe worth considering. Drive safely"
              </p>
              <footer className='flex flex-row-reverse mt-1 text-cyan-600'> - me</footer>
            </blockquote>
          </section>

          <hr className='border-t border-zinc-500/50'/>
          <br />

          <section className='mx-2 sm:mx-0'>
            <p className='text-sm md:text-base text-zinc-700/80 dark:text-zinc-200/90'>The following data is from the <span>
              <a className='text-cyan-600' rel='noopener noreferrer' target='_blank' href='https://www.gov.uk/government/statistical-data-sets/ras50-contributory-factors'> Department for Transport Statistics </a></span>
            </p>
            <div className='text-cyan-600 font-semibold text-sm md:text-base'>
              <h3>RAS50002 Contributory factors allocated to vehicles or pedestrians in reported accidents, Great Britain, 2014-2018</h3>
            </div>
            <figure>
              <div 
                className='bg-safety-car-1 md:max-w-[100vw] lg:w-[50%] mx-auto h-56 md:h-[27rem] my-[2rem] py-4 rounded shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]'
                  role='img'
                    aria-label='Chart showing contributory accident factors, Great Britain 2014 - 2018'
              />
              <figcaption className='sr-only'>
                Department for Transprot accident statistics chart
              </figcaption>
            </figure>
          </section>
          
          <section aria-labelledby='faulty-components' className='mx-2 sm:mx-0'>
            <h3 
              className='text-cyan-600 font-semibold text-sm md:text-base'
                id="faulty-components"
            >
              The following are the potential top associated accidents with having faulty components
            </h3>
            <br />
            <article>
              <blockquote className={quoteClass}>"Driver / Rider failed to look properly - 40% of accidents in 2018"</blockquote>
              <p className={pClass}>If a car involved had faulty brake or indicator lights, this could be a contributory factor towards said driver not looking properly and then not seeing the potential car</p>
            </article>

            <article>
              <blockquote className={quoteClass}>"Driver / Rider failed to judge other person's path or speed - 21% of accidents in 2018"</blockquote>
              <p className={pClass}>At times with poor visibility such as at night, heavy rain or during fog, people are strained to see the other person's car with lights fully working. When not working this puts an extra strain on driver's surrounding the car with faulty lights and again could be a contributory factor as reduces said driver's distance perception</p>
            </article>

            <article>
              <blockquote className={quoteClass}>"Poor turn or manoeuvre - 13% of accidents in 2018"</blockquote>
              <p className={pClass}>The poor action of the driver and people getting into accidents could be poor equipment on top of poor driving. Many people now brake and then indicate, which gives no prior warning for cars around</p>
            </article>

            <article>
              <blockquote className={quoteClass}>"Sudden braking - 5% of accidents in 2018"</blockquote>
              <p className={pClass}>Personally I have nearly fallen victim to this when people suddenly brake and only have one out of three potential brake lights working (that's assuming the car is clean the lights are clear when applied), only through paying 100% attention have avoided several accidents</p>
            </article>

            <article>
              <article>
                <blockquote className={quoteClass}>"There is a substantial trend towards the overall decrease in accidents from 115673 accidents in 2014 to 84968 accidents in 2018. What could be the causes of this?"</blockquote>
                <p className={pClass}>The poor action of the driver and people getting into accidnts could be poor equipmwent on top of poor driving. Many people now brake and then indicate, which gives no prior warning for cars around</p>
              </article>
              <ol className='ml-3 mb-6 text-sm md:text-base leading-8 md:leading-10 text-zinc-700/80 dark:text-zinc-200/90'>
                <li>1. The inclusion of more 20mph zones around cities</li>
                <li>2. More automatic indication of faulty car parts in newer cars</li>
                <li>3. People are driving better and more considerately</li>
                <li>4. Less people are driving - using public transport or cycling</li>
              </ol>
              <article>
                <blockquote className={quoteClass}>Yet despite these encouranging trends, driving on the roads it appears less people are interested in following The Highway Code or driving appropriately (i.e. safely and considerately)
                <p className='px-2 sm:text-center text-sm md:text-base'>e.g. People braking before indicating (not following the MSM principle)</p>
                </blockquote>
              </article>
            </article>
          </section>

          <br />
          <hr className='border-t border-zinc-500/50 mb-4'/>
          <br />

          <section className='mx-2 sm:mx-0'>
          <h2 className='font-space text-zinc-500/90 dark:text-zinc-200/90 text-xl sm:text-4xl font-bold mb-4'>Gender Variation Statistics from DoT</h2>
          <section aria-labelledby='safety-intent'>
            <h2 id="safety-intent" className='sr-only'>
              Hopefully people will see how they tenmselves might be at risk of an accident. 
            </h2>
            <blockquote className='mb-2'>
              <p className={quoteClass}>
                "The table below talks about the relative number of casualties for males and females relating to certain age groups, also collective results."
              </p>
              <footer className='flex flex-row-reverse mt-1 text-cyan-600'> - me</footer>
            </blockquote>
          </section>
            <p className='text-sm md:text-base'>The following data is from the 
              <span>
                <a className='text-cyan-600' rel='noopener noreferrer' target='_blank' href='https://www.gov.uk/government/statistical-data-sets/ras20-drivers-riders-and-vehicles-in-reported-road-accidents'> Department for Transport Statistics </a>
              </span>
            </p>
            <div className='text-cyan-600 font-semibold text-sm md:text-base'>
              <h3>RAS20002 Drivers in reported accidents by gender, number injured, road user type and age, Great Britain, 2018</h3>
            </div>
            <figure className='dark:text-zinc-200/90'>
              <div 
                className='bg-safety-car-2 h-[20rem] md:h-[40rem] mt-[2rem] py-[2rem] lg:w-[50%] mx-auto rounded shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]'
                  role='img'
                    aria-label='Chart showing accidents by gender, Great Britain 2018'
              />
              <aside className='text-[0.6rem] md:text-xs mx-auto lg:mx-[20vw] mt-2 mb-4 text-zinc-700/80 dark:text-zinc-200/90'>
                <figcaption className='sr-only'>Department for Transport gender accident statistics</figcaption>
                <figcaption className='flex justify-between'>
                  <p>1. Includes cases where gender was not reported. </p>
                  <span className='font-semibold'>Source: DfT STATS19</span>
                </figcaption>
                <figcaption className='flex justify-between'>
                  <p>2. Includes electric motorcycles and cases where engine size was not reported. </p>
                  <span className='font-semibold'>The figures in this table are National Statistics</span>
                </figcaption>
              </aside>
            </figure>
          </section>

          <section className='mx-2 sm:mx-0'>
            <article className='my-5'>
              <header className='text-cyan-600 mb-1'>The table above shows two immediate patterns</header>
              <blockquote className={quoteClass}>
                "Males are nearly twice as likely to be involved in accidents than females - 92005 compared to 55268"
              </blockquote>
              <p className='p-5 text-zinc-700/80 dark:text-zinc-200/90'>And...</p>
              <blockquote className={quoteClass}>
                "If females are involved in accidents they are more likely to be casualties  - 53% compared to 38%"
              </blockquote>
              <div className="text-zinc-700/80 dark:text-zinc-200/90">
                <p className='p-5 text-sm md:text-base leading-6'>There appears to be less variation across the age ranges with females drivers. Males have more definite peaks with the age ranges 25 - 29 and 30 - 34 to the highest peaks being 40 - 49 (highest number number of accidents) and 50 - 59 (second highest)</p>
                <p className='p-5 text-sm md:text-base leading-6'>Not counting the age range 25 - 34 (which would be far and away the highest number of accidents in an age range), both female and male drivers between the ages of 40 - 49 had the highest number of incidents in 2018</p>
                <p className='p-5 text-sm md:text-base leading-6'> There are potentially more males requiring to keep an eye on their faulty components and as such should use this site. Females, you could help other females and males out by not only driving more safely but also letting people know their car needs a little work.. (before it's MOT) </p>
              </div>
            </article>
          </section>

          <br />
          <hr className='border-t border-zinc-500/50 mb-4'/>
          <br />

          <section className='mx-2 sm:mx-0'>
          <h2 className='font-space text-zinc-500/90 dark:text-zinc-200/90 text-xl sm:text-4xl font-bold mb-4'>Driver Density UK from DoT</h2>
          <section aria-labelledby='safety-intent'>
            <h2 id="safety-intent" className='sr-only'>
              Hopefully people will see how they tenmselves might be at risk of an accident. 
            </h2>
            <blockquote className='mb-2'>
              <p className={quoteClass}>
                "The figure below shows the relative car density per 1000 head of population. London appers to have amongst the lowest frequencies of car owners."
              </p>
              <footer className='flex flex-row-reverse mt-1 text-cyan-600'> - me</footer>
            </blockquote>
          </section>
            <p className='text-sm md:text-base text-zinc-700/80 dark:text-zinc-200/90'>Data and map from 
              <a className='text-cyan-600' rel='noopener noreferrer' target='_blank' href='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/800502/vehicle-licensing-statistics-2018.pdf'> Vehicle Licensing Statistics: Annual 2018 </a>
              release
            </p>
            <div className='text-sm md:text-base text-cyan-600 font-semibold'>
              <h4>Map of licensed vehicles per 1000 head of population by unitary authority, Uniten Kingdom, 2018</h4>
            </div>
            <figure>
              <div 
                className='bg-safety-car-3 h-[18rem] md:h-[35rem] mt-[2rem] p-[2rem] md:w-[77vw] lg:w-[50%] mx-auto rounded shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]'
                  role='img'
                    aria-label='Map of licensed vehicle distribution, United Kingdom 2018'
              />
              <figcaption className='sr-only'>
                Vehicle Licensing Statistics: Annual 2018
              </figcaption>
            </figure>
          </section>
          <br />

          <section className='mx-2 sm:mx-0'>
            <article>
              <p className='text-sm md:text-base text-cyan-600 mb-1'>Vehicle Licensing Statistics: Annual 2018 - Page 9. </p>
              <blockquote className={quoteClass}><p> "In the United Kingdom, there were 39.4 million licensed vehicles at the end of 2018.This figure was made of 32.5 million (83%) vehicles registered to an address in England, 1.9 million (5%) in Wales, 3.0 million (8%) in Scotland, and 1.2 million (3%) in Northern Ireland" </p></blockquote>
            </article>

            <article className='text-zinc-700/80 dark:text-zinc-200/90'>
              <p className='p-5 text-sm md:text-base leading-6'>Regionally, this was markedly lower in London (348 per 1000 head) than in any other region or country, potentially reflecting its highly urbanised nature and / or provision of excellent public transportation. There was less variation between the other regions, with the rate being highest in the southern English regions (of which the South West was highest at 729) and lowest among the northern English regions (of which the North East was lowest at 521)</p>
              <p className='p-1 text-sm md:text-base'>Data and map from 
                <a className='text-cyan-600 ' rel='noopener noreferrer' target='_blank' href='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/800502/vehicle-licensing-statistics-2018.pdf'> Vehicle Licensing Statistics: Annual 2018 </a> 
                release
              </p>
            </article>
          </section>

          <section className="relative mb-8 md:mb-32 lg:mb-10 z-50 top-0 sm:top-24">
            <nav className='font-poppins flex flex-col md:flex-row mb-4 md:mb-20 px-4 w-full max-w-4xl mx-auto text-sm md:text-base justify-center md:justify-between text-center'>
              <Link 
                to='/reg' 
                  className={`${buttonClass} ${shimmerClass}`}
              >
                HelpMe-Car Home
              </Link>
              <Link 
                to='/reghelp'
                  className={`${buttonClass} ${shimmerClass}`}
                    onClick={() => toast.success(`Being helpful is great!!`)}
              >
                The Point of Being Helpful
              </Link>
            </nav>
          </section>
        </section>
      </section>
    </>
  );
};

export default RegSafety;