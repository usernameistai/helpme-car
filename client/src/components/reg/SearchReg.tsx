import React, { type FC, type BaseSyntheticEvent, useState } from 'react';
import { useRegStore } from '../../store/useRegStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import toast from 'react-hot-toast';
import ParticlesBg from '../layout/ParticlesBg';
import { useQueryClient } from '@tanstack/react-query';
import { getRegByPlate } from '../../api/reg';
import { useSearchStore } from '../../store/useSearchStore';

const buttonClass = "flex items-center text-center text-zinc-700 font-semibold text-base md:text-lg rounded px-4 py-2 h-12 my-auto shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

interface SearchProps {
  regplate: string;
  setRegplate: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  className?: string;
}

export const Search: FC<SearchProps> = ({ regplate, setRegplate, onSubmit, className = "" }) => {
  const { history, clearHistory, addSearch } = useSearchStore();
  const recentHistory = history.slice(0, 7);

  const handleInternalSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalisedPlate = regplate.trim().toUpperCase().replace(/[\s-]/g, "");

    if (normalisedPlate) {
      addSearch(normalisedPlate);
      onSubmit(e); // Send to main SearchReg component
    } else {
      toast.error("Please enter a valid reg");
    }
  }

  return (
    <>
      <section className={`z-20 absolute inset-x-0 rounded-2xl backdrop-blur-sm shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] transition-transform ${className}`}>
        <h2 
          className='font-michroma text-lg sm:text-xl md:text-2xl lg:text-3xl ml-5 landscape:ml-7 mt-4 text-blue-500 font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]'
            style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5)) drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}
        >
          Search for the reg number in question
        </h2>
        <form 
          onSubmit={handleInternalSubmit} 
            className='mx-auto p-6 rounded-b-2xl'
              aria-label="Search bar form, image in background is toy car being looked at under microscope"
        >
          <fieldset>
            <legend className="sr-only">Search bar with search pane, hope you're having a nice day.</legend>
            <div className='flex flex-col'>
              <input
                type="text"
                  placeholder='Enter registration number'
                    value={regplate}
                      onChange={(e) => setRegplate(e.target.value.trim().toUpperCase().replace(/[\s-]/g, ""))}
                        className='w-full font-inter p-3 rounded-xl text-base md:text-lg bg-white/10 backdrop-blur-sm text-zinc-700 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_8px_rgba(0, 255, 255, 0.6)] transition shadow-[inset_0px_1px_10px_rgba(0,0,0,0.2)]'
                          aria-label="This is the number plate search input box"
              />
              <div className='flex flex-col '>
                {/* THE MEMORY SECTION: Show recently searched plates */}
                {recentHistory.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="font-michroma text-[10px] uppercase tracking-widest text-zinc-400 mb-1 ml-1 my-5 whitespace-nowrap">
                      Recent:
                    </span>
                    {recentHistory.map((plate, index) => (
                      <button
                        key={plate}
                        type="button" // Important: Prevents form submission
                        onClick={() => setRegplate(plate)} // Fills the box for the user
                        className={`items-center px-3 py-1 my-3 max-h-[42px] bg-cyan-500/10 text-cyan-600/80 dark:text-cyan-400 text-xs rounded-lg border border-cyan-400/30 hover:bg-cyan-500/20 transition-all font-poppins font-semibold shadow-sm
                          ${index < 3 ? 'flex' : 'hidden'}  /* Hide items 4-7 on mobile */
                          ${index >= 3 && index < 5 ? 'md:flex' : ''} /* show 4 & 5 on mediu screens */
                          ${index >= 5 ? 'lg:flex' : ''}  /* Hide items 6-7 on medium */    
                        `}
                      >
                        {plate}
                      </button>
                    ))}
                    {/* THE CLEAR BUTTON */}
                    <button
                      type="button"
                        onClick={clearHistory}
                          className="font-inter ml-auto text-[10px] text-red-400/60 hover:text-red-500 font-bold uppercase tracking-tighter transition-colors px-2"
                            aria-label="Clear search history"
                    >
                      <div className='flex flex-wrap'><span className='hidden md:block md:mr-1'>Clear</span> <span>×</span></div>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between ">
                <button 
                  type='submit' 
                    // className='poppins bg-cyan-500 text-zinc-50 dark:text-zinc-700 text-base md:text-lg font-semibold px-4 py-2 rounded mt-4 shadow-lg active:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out opacity-105'
                    className={`${buttonClass} ${shimmerClass} bg-cyan-500 text-zinc-50 dark:text-zinc-700` }
                      aria-label='Search button, click here after entering number plate'
                >
                  Search
                </button>
                <div className='mt-6 hidden sm:block'>
                  <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
                  <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                    STATUS: OPERATIONAL // CAR_SCAN: ACTIVE
                  </span>
                </div>
                <Link 
                  to="/reg" 
                    className={`${buttonClass} ${shimmerClass} bg-sky-100` }
                      aria-label='Home button'
                >
                  Home
                </Link>
              </div>
            </div>
          </fieldset>
        </form>
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse animate-pulse-glow"></div>
      </section>
    </>
  );
}

const SearchReg: FC = () => {
  const [regplate, setRegplate] = useState('');
  const { loading } = useRegStore();
  const { addSearch } = useSearchStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Added for caching

  const onSubmit = ( e: BaseSyntheticEvent ) => {
    e.preventDefault();
    
    if (!regplate) {
      navigate(`/reg`); // Want to change to a not found page which needs making
    } else {
      addSearch(regplate);

      queryClient.prefetchQuery({
        queryKey: ['reg', regplate],
        queryFn: () => getRegByPlate(regplate),
        staleTime: 1000 * 60 * 5, // Cache for 5 mins
      });

      toast.success(`You are on your way to searching for your ${regplate}, I hope it isn't here..`);
      navigate(`/reg/${regplate}`);
    };
  };
  if (loading) return <Spinner />;

  return (
    <>
      <ParticlesBg theme="snow" colour="purple-500" />
      <section className='relative bg-search-car bg-standard h-[100vh] z-20 mx-auto max-w-6xl my-[-5rem] sm:my-[-3rem]'>
        <div className="absolute inset-0 bg-zinc-700/50" /> 
        <h1 className="font-space relative z-10 w-full text-4xl sm:text-5xl font-bold px-8 py-6 landscape:py-10 mt-[5rem] md:mt-5 mb-2 landscape:mb-[-1.7rem] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
          HelpMe-Search...
        </h1>
        <section className='relative h-[75vh] mx-auto top-8 landscape:h-[185px] hover:scale-[1.05] '>
          <Search
            regplate={regplate}
              setRegplate={setRegplate}
                onSubmit={onSubmit}
                  className='bg-white dark:bg-gray-800/95'
          />
        </section>
      </section>
    </>
  );
};

export default SearchReg;