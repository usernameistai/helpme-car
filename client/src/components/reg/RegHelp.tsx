import type { FC } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ParticlesBg from "../layout/ParticlesBg";

const RegHelp: FC = () => {
  const articleClass = "flex flex-col justify-between";
  const divClass = "h-80 w-full rounded-lg shadow-lg shadow-zinc-500/50 dark:shadow-sky-100/50";
  const pClass = "font-inter w-full rounded-lg mb-8 p-4 font-semibold text-zinc-700/80 dark:text-zinc-200/90 text-lg md:text-xl justify-center flex leading-8";
  const buttonClass = "font-poppins text-zinc-700 font-semibold dark:bg-yellow-300 bg-sky-100 rounded px-4 py-3 h-12 mt-4 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

  return (
    <>
      <ParticlesBg theme="default" colour="cyan-400" />
      <section className="relative z-20 mx-auto mb-4 w-full max-w-6xl px-4 sm:px-0">
        <h1 className="font-space text-5xl font-bold my-8 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
          Why help a fellow human?
        </h1>
        <h2 className='font-space text-zinc-500/90 dark:text-zinc-200/90 text-xl sm:text-4xl font-bold mb-4'>Many, many good reasons...</h2>
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 md:gap-10">
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-16 bg-standard ${divClass}`}
                role="img"
                  aria-label="Stay Safe in scrabble tiles above a lovely latte with a heart in the milk foam"
            />
            <p className={`h-44 md:h-56 ${pClass}`}>Sometimes by not being a hindrance we can effectively be helping, however we all often go one step further (let someone know they've got blue smoke or a flat tyre haha)</p>
          </article>
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-17 bg-standard ${divClass}`}
                role="img"
                  aria-label="Lady taking a photo of flowers on a bridge in London"
            />
            <p className={`h-48 md:h-56 ${pClass}`}>e.g. Simply let someone know their brake lights aren't working, could help prevent accidents by less driving time with faulty equipment (Please try to not take photos of people's cars)</p>
          </article>
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-18 bg-standard ${divClass}`}
                role="img"
                  aria-label="Girl having stoplen mummy or daddy's phone and being sneaky"
            />
            <p className={`h-48 md:h-56 ${pClass}`}>Kids get a kick out of genuinely helping, as are more switched on than ever therefore can help (under the watchful eye of a parent / guardian). They also have excellent observational skills</p>
          </article>
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-19 bg-standard ${divClass}`}
                role="img"
                  aria-label="Image of 'Don't Give Up' on the side of a tree in American suburbia"
            />
            <p className={`h-56 ${pClass}`}>You can have helped someone randomly, anonymously... or someone you might know. Don't give up on your fellow humans, especially during these current times (or if their indicators aren't working). Don't give up... </p>
          </article>
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-20 bg-standard ${divClass}`}
                role="img"
                  aria-label="Three Hawaiian lads being excellent to each other, in cool Hawaiian shirts"
            />
            <p className={`h-30 lg:-translate-y-24 ${pClass}`}>Be.. excellent to each other...</p>
          </article>
          <article className={articleClass}>
            <div 
              className={`bg-rules-people-21 bg-standard ${divClass}`}
                role="img"
                  aria-label="A yellow, blue, red and green wheelie bin lined up from left to right"
            />
            <p className={`h-30 lg:-translate-y-24 ${pClass}`}>..and pick up your litter</p>
          </article>
        </section>
        
        <section className="bg-zinc-900/50 text-white text-center mx-auto py-4 mb-12">
          <h3 className="font-space text-base md:text-xl font-bold">Helpfulness Photo Credits from UnSplash</h3>
          <ul className="font-inter text-xs md:text-base">
            <br />
            <li>Stafe Safe and a Cup of Coffee - <strong>Sincerely Media</strong></li>
            <li>Lady Taking Photo of Flowers on Busy Bridge - <strong>Artur Tumasjan</strong></li>
            <li>Little Girl Having Fun with Mobile - <strong>Pan Xiaozhen</strong></li>
            <li>Don't Give Up - <strong>Rosie Kerr</strong></li>
            <li>Three Excellent Friends - <strong>Mareko Tamaleaa</strong></li>
            <li>Four Assorted-Colour Rubbish Bins - <strong>Pawel Czerwinski</strong></li>
          </ul>
        </section>

        <section className="relative mb-4 md:mb-32 lg:mb-28 z-50">
          <nav className='font-poppins flex flex-col sm:flex-row md:px-4 w-full max-w-4xl mx-auto text-sm md:text-base justify-between text-center'>
            <Link 
              to='/regsafety' 
                className={`${buttonClass} ${shimmerClass}`}
                  aria-label="Go to Help Me Car Safety page"
                    onClick={() => toast.success(`Remember, be excellent to each other and don't drop litter`)}
            >
              Car Help Safety
            </Link>
            <Link 
              to='/regrule' 
                className={`${buttonClass} ${shimmerClass}`}
            >
              HelpMe-Car Rules
            </Link>
            <Link 
              to='/reg' 
                className={`${buttonClass} ${shimmerClass}`}
                  aria-label="Return to Help Me Car Home page"
                    onClick={() => toast.success(`Remember, be excellent to each other and don't drop litter`)}
            >
              Car Help Home
            </Link>
          </nav>
        </section>
      </section>
    </>
  );
};

export default RegHelp;