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
import { motion } from "motion/react";

const Reg: FC = () => {
  const { fetchRegs } = useRegStore();
  // const regs = useRegStore((state) => state.regs); // did just have destructured above
  const { data: regs = [], isLoading, isError } = useRegs();
  const { data: leaderboard = [] } = useLeaderboard();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [regplate, setRegplate] = useState("");

  const liClass = "relative z-30 lg:min-h-[275px] group sm:my-8 py-2 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-1/3 shadow-lg will-change-transform hover:bg-white/50 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const h3Class = "space-grotesk text-base md:text-xl lg:text-3xl font-bold mt-2 lg:mt-4 mb-4 text-zinc-500 dark:text-zinc-800 text-center";
  const titleClass = "space-grotesk font-semibold text-sm md:text-base lg:text-lg mb-4 lg:my-6 px-4 lg:px-8 lg:leading-8 text-zinc-800/90";
  const buttonClass = "poppins relative z-50 rounded shadow-lg bg-sky-100 px-3 py-2 my-4 lg:my-16 text-center text-zinc-700 text-sm md:text-lg lg:text-2xl font-semibold hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
  const brightBorderClass = "absolute inset-0 rounded-2xl group-hover:rotate-1 border border-cyan-400/40 animate-pulse animate-pulse-glow";
  const linksClass = "poppins text-base md:text-lg lg:text-xl text-white font-semibold bg-sky-100 text-zinc-700 px-4 py-2 rounded shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem]";
  const linkClass = "font-mono text-base md:text-lg lg:text-xl font-semibold my-4 pl-1 text-gray-500";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
  
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: window.innerWidth > 640 ? 0.2 : 0,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" } // Custom cubic-bezier for "slick" motion
  },
} as const;
  
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
        <section className="relative z-20 ">
          <h1 className="relative mt-4 z-50 space-grotesk text-4xl md:text-5xl font-bold ml-4 sm:ml-10 mb-8 pb-4 w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
            Home of HelpMe-Car
          </h1>

          <section className="relative flex flex-col w-full min-h-fit bg-home-car bg-fixed mb-8 pb-20">
            <div className="absolute inset-0 dark:bg-zinc-700/40" />

            <div className="relative pt-4">
              <h2 className="space-grotesk relative text-center w-full mb-2 text-zinc-700/90 dark:text-zinc-100 text-3xl md:text-4xl lg:text-7xl lg:mt-14 font-extrabold">
                A way to help fellow your Humans
              </h2> 

              <section className="relative px-4">
                <motion.ul 
                  variants={containerVariants}
                    initial="hidden"
                      animate="visible"
                        className="flex flex-col relative z-50 sm:flex-row mb-10 justify-between items-center transform top-8 gap-6 sm:-translate-x-10 lg:-translate-x-20 w-full md:w-[110vw] max-w-[110%] mx-auto overflow-x-hidden"
                >
                  <motion.li 
                    variants={itemVariants}
                      className={`${liClass} w-full sm:w-1/3`}
                  >
                    <h3 className={`${h3Class}`}>Help Someone's Car</h3>
                    <p className={`${titleClass}`}>Add a car's number plate for any advisories you may have seen along your travels</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/helpreg" 
                          className={` ${buttonClass}`}
                            aria-label="Click this button to go to the Help-Car page, to help someone's car"
                      >
                        HelpMe-Car
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                      className={`${liClass} w-full sm:w-1/3`}
                  >
                    <h3 className={`${h3Class}`}>Search for your Car</h3>
                    <p className={`${titleClass}`}>Please enter a number plate to see if anyone has entered information about YOUR car!!</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/search" 
                          className={` ${buttonClass}`}
                            aria-label="Click this button after entering a number plate to go to the display page"
                      >
                      Regplate Search
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                  <motion.li 
                    variants={itemVariants}
                      className={`${liClass} w-full sm:w-1/3`}
                  >
                    <h3 className={`${h3Class}`}>HelpMe Information</h3>
                    <p className={`${titleClass}`}>Important Information, Rules & Regulations, Guidance about HelpMe-Car and more...</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/regrules"
                          className={`mt-9 md:mt-4 ${buttonClass}`}
                            aria-label="Click this button to hear about the rules and regulatations subsequently about being helpful"
                      >
                        HelpMe - Info?
                      </Link>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                </motion.ul>
              </section>
              

              <GlassCard title="Recently added registrations" className="z-30 space-grotesk h-full relative w-full lg:w-[63vw] min-h-60 backdrop-blur-xl mx-auto hover:scale-100 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]">
                <p className="text-gray-900 dark:text-gray-200 text-base lg:text-xl m-1/2 sm:m-0 px-6 sm:px-8">Here are a few number plates from the database, if this is your car, click on it to see what advisories have been added. Maybe you could help someone else out?</p>
                <div className="lg:mb-16 z-30">
                  <RegList 
                    regs={displayedRegs}
                      isLoading={isLoading}
                        isError={isError}
                  />
                </div>
              </GlassCard>
            </div>
          </section>
        </section>

        <section className="relative grid grid-cols-1 py-24 z-20 w-full min-h-fit gap-8">
          <div className="">
            <Search
              regplate={regplate}
                setRegplate={setRegplate}
                  onSubmit={handleRegSearch}
                    className="relative w-full sm:w-full pt-2 mx-auto"
            />
          </div>
          <div className="">
            <Board 
              leaderboard={leaderboard.slice(0, 5)}
                className="rounded-2xl w-full sm:w-full mx-auto dark:bg-zinc-900/50"
            />
          </div>
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

            <article className={`${shimmerClass} z-10 flex w-[80vw] mx-auto sm:w-[95%] md:max-w-[45%] mb-8 bg-search-combine bg-fixed shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)] rounded-2xl border border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3)] transition-all duration-500 group overflow-hidden`}>
              <div className="flex flex-col min-h-[500px] landscape:min-h-[850px] p-8 items-center justify-center my-auto bg-zinc-900/30 group-hover:bg-zinc-900/10 transition-colors duration-500">
                <div className="space-grotesk text-2xl md:text-3xl lg:text-4xl text-white font-extrabold text-center leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500">
                  Maybe cars aren't for you... <br/>
                  <span className="text-yellow-400">Maybe you would prefer a Combine Harvester?</span>
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