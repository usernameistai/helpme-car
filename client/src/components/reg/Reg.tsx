import { useEffect, useMemo, useState, type FC, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegStore } from "../../store/useRegStore";
import { useQueryClient } from "@tanstack/react-query";
import { getRegByPlate } from "../../api/reg";
import ParticlesBg from "../layout/ParticlesBg";
import GlassCard from "./components/GlassCard";
import RegList from "./components/RegList";
import { Search } from "./SearchReg";
import { Board } from "../../pages/Leaderboard";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import toast from "react-hot-toast";
import { useRegs } from "../../hooks/useRegs";

const Reg: FC = () => {
  const { fetchRegs } = useRegStore();
  // const regs = useRegStore((state) => state.regs); // did just have destructured above
  const { data: regs = [], isLoading, isError } = useRegs();
  const { data: leaderboard = [] } = useLeaderboard();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [regplate, setRegplate] = useState("");

  const liClass = "relative z-30 group group-hover:-translate-y-4 sm:my-8 py-2 sm:p-4 lg:h-72 bg-white/10 backdrop-blur-md border border-white/20 w-1/3 rounded-2xl shadow-lg hover:bg-white/50 hover:scale-105 transition-transform hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const h3Class = "space-grotesk text-base md:text-xl lg:text-3xl font-bold mt-2 lg:mt-4 mb-4 text-gray-500 dark:text-gray-800 text-center";
  const titleClass = "space-grotesk text-sm md:text-base lg:text-lg mb-4 lg:my-6 px-4 lg:px-20 lg:leading-8 lg:font-semibold text-gray-900";
  const buttonClass = "poppins relative z-50 rounded shadow-lg px-3 py-2 my-4 lg:my-12 text-center text-white text-sm md:text-lg lg:text-2xl font-bold hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
  const brightBorderClass = "absolute inset-0 rounded-2xl group-hover:rotate-1 border border-cyan-400/40 animate-pulse animate-pulse-glow";
  const linksClass = "poppins text-base md:text-lg lg:text-xl text-white font-semibold bg-sky-100 text-zinc-700 px-4 py-2 rounded shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem]";
  const linkClass = "font-mono text-base md:text-lg lg:text-xl font-semibold my-4 pl-1 text-gray-500";
  
  
  useEffect(() => {
    fetchRegs();
  }, [fetchRegs]);

  const displayedRegs = useMemo(() => {
    if (!regs || regs.length === 0) return [];
    const copy = [...regs];

    // Fisher-Yates shuffle
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    const count = Math.min(Math.floor(Math.random() * 5) + 1, copy.length);
    return copy.slice(0, count);
  }, [regs]);

  const handleRegSearch = (e: FormEvent) => {
    e.preventDefault();

    if(!regplate) return;

    // Prefetch for job hunting
    queryClient.prefetchQuery({
      queryKey: ['reg', regplate],
      queryFn: () => getRegByPlate(regplate),
      staleTime: 1000 * 60 * 5,
    });
    // 2. Navigate
    navigate(`/reg/${regplate}`);
  }

  return (
    <>
      <ParticlesBg theme="default" colour="cyan-400"/>
      <section className="space-y-10 sm:mx-0">
        <section className="relative my-[-1.5rem] z-20">
          <h1 className="flex relative space-grotesk text-4xl md:text-5xl font-bold mb-8 pb-4 w-full lan">
            Home of HelpMe-Car
          </h1>

          <section className="relative w-full min-h-[75vh] pb-20 overflow-visible">
            {/* 1. The Parallax Wrapper - This clips the image to this section only */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ clip: 'rect(0, auto, auto, 0)' }}>
              {/* 2. The Actual Image - 'fixed' position inside a clipped container creates parallax */}
              <div className="fixed inset-0 w-full h-full bg-home-car" style={{ zIndex: -1, height: '100vh' }} /> {/* This ensures it works on older Firefox ESR and Mobile */}
              {/* 3. The Overlay - Nested here to stay with the image */}
              <div className="fixed inset-0 bg-zinc-700/60 z-0" />
            </div>

            {/* 4. The Content - Must be relative and high z-index */}
            <div className="relative z-30">
              <h2 className="space-grotesk pt-10 tracking-wide text-zinc-100 text-2xl lg:text-4xl font-extrabold w-full text-center">
                A way to help fellow Humans and potentially why... ?
              </h2>

              <section className="relative my-10 mb-28">
                <ul className="flex flex-col sm:flex-row mb-10 justify-between items-center transform top-8 gap-6 sm:-translate-x-10 lg:-translate-x-20 w-[90vw] md:w-[110vw] max-w-[110%] mx-auto">
                {/* //absolute transform -translate-x-1/2 gap-2 md:gap-6 lg:gap-10  */}
                  <li className={`${liClass} w-full sm:w-1/3`}>
                    <h3 className={`${h3Class}`}>Help Someone's Car</h3>
                    <p className={`${titleClass}`}>Add a car's number plate for any advisories you may have seen along your travels</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/helpreg" 
                          className={`bg-gradient-to-br from-cyan-400 to-yellow-300 ${buttonClass}`}
                            aria-label="Click this button to go to the Help-Car page, to help someone's car"
                      >
                        HelpMe-Car
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </li>
                  <li className={`${liClass} w-full sm:w-1/3`}>
                    <h3 className={`${h3Class}`}>Search for your Car</h3>
                    <p className={`${titleClass}`}>Please enter a number plate to see if anyone has entered information about YOUR car!!</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/search" 
                          className={`bg-gradient-to-br from-green-300 to-zinc-300 ${buttonClass}`}
                            aria-label="Click this button after entering a number plate to go to the display page"
                      >
                      Regplate Search
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </li>
                  <li className={`${liClass} w-full sm:w-1/3`}>
                    <h3 className={`${h3Class}`}>HelpMe Information</h3>
                    <p className={`${titleClass}`}>Important Information, Rules & Regulations, Guidance about HelpMe-Car and more...</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/regrules"
                          className={`bg-gradient-to-br from-yellow-300 to-red-300 mt-9 md:mt-4 ${buttonClass}`}
                            aria-label="Click this button to hear about the rules and regulatations subsequently about being helpful"
                      >
                        HelpMe - Info?
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </li>
                </ul>
              </section>
            </div>

            <GlassCard title="Recently added registrations" className="z-30 space-grotesk relative w-full lg:w-[63vw] backdrop-blur-xl mx-auto hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]">
              <p className="text-gray-900 dark:text-gray-200 text-base lg:text-xl m-1/2 sm:m-0 px-6 sm:px-8">Here are a few number plates from the database, if this is your car, click on it to see what advisories have been added. Maybe you could help someone else out?</p>
              <div className="lg:mb-16 z-30">
                <RegList 
                  regs={displayedRegs}
                    isLoading={isLoading}
                      isError={isError}
                />
              </div>
            </GlassCard>
          </section>
        </section>

        <section className="relative z-20 w-full h-[100vh] sm:h-[90vh] lg:space-y-10">
          <Search
            regplate={regplate}
              setRegplate={setRegplate}
                onSubmit={handleRegSearch}
                  className="relative mt-10 w-[90vw] sm:w-full pt-2 mx-auto md:hover:scale-100"
          />
          <Board 
            leaderboard={leaderboard.slice(0, 5)}
              className="rounded-2xl w-[90vw] sm:w-full mx-auto md:hover:scale-100 translate-y-32 lg:translate-y-10 dark:bg-zinc-900/50"
          />
        </section>
        
        <section className="relative bg-gradient-to-br z-20 from-cyan-300 to-white sm:mt-10">
          <h2 className="space-grotesk text-xl md:text-3xl lg:text-5xl font-bold text-zinc-700 p-8 mx-2 md:mx-5">A little bit about HelpMe-Car site</h2>
          <section className="relative flex flex-col md:flex-row justify-between ml-1 md:ml-3 lg:ml-10 md:my-5">            
            <article className="w-[80vw] sm:w-[95%] md:max-w-[50%] mx-auto mb-8">
              <Link 
                to='/regrules'
                  className={`${linksClass}`}
                    aria-label="Again, this button will take you to rules and regulations"
              >
                Rules & Regulations
              </Link>
              <div className={`${linkClass}`}>
                <p>Who should be using it & rules</p>
                <p>Please do not use whilst driving 
                  (you shouldn't be reading this)</p>
                <p>It is illegal to use your phone whilst driving</p>
              </div>
              <br />
              <Link 
                to='/reghelp' 
                  className={`${linksClass}`}
                    aria-label="This button will take you to the helpfulness page"
              >
                Why people should help
              </Link>
              <div className={`${linkClass}`}>
                <p>Why be helpful?</p>
                <p>Don't need to sign up to help someone</p>
                <p>Be helpful </p>
              </div>
              <br />
              <Link 
                to='/search' 
                  className={`${linksClass}`}
                    aria-label="This is another button to go to the car search page"
              >
                Search for your car
              </Link>
              <div className={`${linkClass}`}>
                <p>This way to search for your car, or a family member or friend's</p>
              </div>
              <br />
              <Link
                to='/regsafety' 
                  className={`${linksClass}`}
                    aria-label="This button takes you to the safety page where some stats are presented"
              >
                Car stats / accidents 2018
              </Link>
              <div className={`${linkClass}`}>
                <a 
                  rel='noopener noreferrer' 
                    target='_blank' 
                      href='https://www.gov.uk/government/collections/road-accidents-and-safety-statistics'
                        className="text-cyan-500 font-bold"
                          aria-label="This link goes to an offical site of tehe Department For Transport"
                >
                  <p>Accident reports from The Department of Transport Statistics </p>
                </a>
                <p>RAS50002 & RAS20002 DOT Statistics</p>
              </div>
              <br />
              <Link 
                to='/' 
                  className={`${linksClass}`}
                    onClick={() => toast.success(`Isn't the neon glow good?`)}
                      aria-label="This button will take you back to the landing page"
              >
                Landing page
              </Link>
              <div className={`${linkClass}`}>
                <p>Want to start from the beginning </p>
              </div>
            </article>

            <article className="bg-search-combine bg-fixed z-5 flex w-[80vw] mx-auto sm:w-[95%] md:max-w-[45%] mb-8 shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)] rounded-2xl border border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] transition-all duration-500">
              <div className="flex flex-col h-[90vh] w-full rounded-2xl p-8 items-center justify-center my-auto dark:bg-zinc-900/40">
                <div className="space-grotesk text-3xl md:text-4xl text-white font-extrabold text-center -translate-y-44">
                  Maybe cars aren't for you, maybe you'd prefer a Combine Harvester?
                </div>
              </div>
            </article>
          </section>
        </section>
      </section>
    </>
  )
}

export default Reg;

