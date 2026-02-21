import { useEffect, useMemo, useState, type FC, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getRegByPlate } from "../../api/reg";
import { useRegs } from "../../hooks/useRegs";
import ParticlesBg from "../layout/ParticlesBg";
import GlassCard from "./components/GlassCard";
import RegList from "./components/RegList";
import { Search } from "./SearchReg";
import { Board } from "../../pages/Leaderboard";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Reg: FC = () => {
  const { data: regs = [], isLoading, isError } = useRegs();
  const { data: leaderboard = [] } = useLeaderboard();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [regplate, setRegplate] = useState("");
  const [showBoard, setShowBoard] = useState(false);

  const liClass = "relative z-30 flex flex-col group sm:my-8 py-2 sm:p-4 bg-zinc-100 dark:bg-zinc-900/10 backdrop-blur-sm border-t border-l border-white/20 rounded-2xl w-full sm:w-1/3 shadow-[15px_15px_35px_rgba(0,0,0,0.7),_inset_2px_2px_4px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out hover:border-cyan-400/50 hover:-translate-y-4 dark:shadow-[15px_15px_35px_rgba(0,0,0,0.7),_inset_2px_2px_4px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const h3Class = "font-space text-2xl md:text-xl lg:text-3xl font-bold mt-2 lg:mt-4 mb-4 text-zinc-600 dark:text-zinc-50 text-center";
  const titleClass = "font-inter font-semibold text-base md:text-base lg:text-lg mb-4 lg:my-6 px-4 lg:px-8 lg:leading-8 text-zinc-700/90 dark:text-zinc-300/80";
  const buttonClass = "font-poppins relative z-50 rounded shadow-lg bg-sky-100 px-3 py-2 my-4 lg:my-16 text-center text-zinc-700 text-base md:text-lg lg:text-xl font-semibold hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition";
  const brightBorderClass = "absolute inset-0 rounded-2xl border border-cyan-400/40 animate-pulse animate-pulse-glow";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
  const articleClass = "relative bg-zinc-100/10 dark:bg-zinc-900/20 border-t border-l border-white/10 rounded-2xl p-8 shadow-[15px_15px_35px_rgba(0,0,0,0.7),_inset_2px_2px_4px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(34,211,238,0.25),20px_20px_60px_rgba(0,0,0,0.8)]";
  const article2Class = "relative bg-zinc-100/10 dark:bg-zinc-900/20 border-t border-l border-white/10 rounded-2xl p-8 shadow-[15px_15px_35px_rgba(0,0,0,0.7),_inset_2px_2px_4px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
  const missionh3Class = "font-space text-xl font-bold mb-2 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300";
  const payloadClass = "mt-4 pt-4 border-t border-zinc-400/80 dark:border-white/5 font-mono text-[8px] text-zinc-700/80 dark:text-white/30 uppercase tracking-widest";
  
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

  useEffect(() => { // added by BG
    const timer = setTimeout(() => setShowBoard(true), 400);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRegSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!regplate) return;

    // Prefetch for job hunting
    queryClient.prefetchQuery({
      queryKey: ['reg', regplate],
      queryFn: () => getRegByPlate(regplate),
      staleTime: 1000 * 60 * 5,
    });
    navigate(`/reg/${regplate}`);
  };

  return (
    <>
      <ParticlesBg theme="default" colour="cyan-400"/>
      <section className="space-y-5 sm:mx-0 w-full">
        <section className="relative z-20 max-w-6xl mx-auto">
          <h1 className="relative mt-4 z-50 font-space text-4xl md:text-5xl lg:text-7xl font-bold ml-4 sm:ml-10 mb-4 md:mb-8 pb-4 w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
            Home of HelpMe-Car
          </h1>

          <section className="relative flex flex-col w-full min-h-fit mb-8 pb-20">
            <div className="relative pt-4 w-full">
              <h2 
                style={{ filter: 'drop-shadow(-10px 0 15px rgba(34,211,238,0.4)) drop-shadow(10px 0 15px rgba(250,204,21,0.4))' }}
                  className="font-space relative drop-shadow-cyan-400 text-center w-full mb-2 text-zinc-700/90 dark:text-zinc-100 text-3xl md:text-4xl lg:text-6xl lg:mt-14 font-extrabold"
              >
                A way to help your fellow Humans
              </h2>

              <section className="relative px-4">
                <motion.ul 
                  variants={containerVariants}
                    initial="hidden"
                      animate="visible"
                        className="flex flex-col relative z-50 sm:flex-row mb-10 justify-center items-stretch transform gap-7 w-[100vw] left-1/2 -translate-x-1/2 px-7 mx-auto overflow-visible"
                >
                  <motion.li
                    key="helpme-car"
                      variants={itemVariants}
                        whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
                          className={`${liClass}`}
                  >
                    <h3 className={`${h3Class}`}>Help Someone's Car</h3>
                    <p className={`${titleClass}`}>Add a car's number plate for any advisories you may have seen along your travels, for a passenger or not driving</p>
                    <div className="text-center my-4">
                      <Link 
                        to="/helpreg" 
                          className={` ${buttonClass}`}
                            aria-label="Click this button to go to the Help-Car page, to help someone's car"
                      >
                        HelpMe-Car
                      </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="mt-4 pt-4 border-t border-zinc-400/80 dark:border-white/5 font-mono text-[8px] text-zinc-700/80 dark:text-white/30 uppercase tracking-widest">
                        STATUS: OPERATIONAL // DATA_STREAM: 10k_PI
                      </div>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                  <motion.li 
                    key="helpme-car-search"
                      variants={itemVariants}
                        whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
                          className={`${liClass}`}
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
                    <div className="flex flex-col items-center text-center">
                      <div className="mt-4 pt-4 border-t border-zinc-400/80 dark:border-white/5 font-mono text-[8px] text-zinc-700/80 dark:text-white/30 uppercase tracking-widest">
                        Payload: 10,000_Digits_Pi // Protocol: f1(1)
                      </div>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                  <motion.li 
                    key="helpme-car-info"
                      variants={itemVariants}
                        whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
                          className={`${liClass}`}
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
                    <div className="flex flex-col items-center text-center">
                      <div className="mt-4 pt-4 border-t border-zinc-400/80 dark:border-white/5 font-mono text-[8px] text-zinc-700/80 dark:text-white/30 uppercase tracking-widest">
                        STATUS: OPERATIONAL // AGRI_SCAN: ACTIVE
                      </div>
                    </div>
                    <div className={`${brightBorderClass}`}></div>
                  </motion.li>
                </motion.ul>
              </section>
              

              <GlassCard title="Recently added registrations" className="z-30 font-space h-full relative w-full lg:w-[63vw] min-h-60 backdrop-blur-sm mx-auto hover:scale-100 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]">
                <p className="text-gray-900 dark:text-gray-200 text-base lg:text-xl m-1/2 sm:m-0 px-6 sm:px-8">Here are a few number plates from the database, if this is your car, click on it to see what advisories have been added. Maybe you could help someone else out?</p>
                <div className="relative z-30">
                  <div className="h-[1px] mt-2 w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
                  <div className="font-mono text-[8px] text-cyan-700/80 dark:text-cyan-400/50 tracking-[0.2em] mb-1">
                    STATUS: OPERATIONAL // AGRI_SCAN: ACTIVE
                  </div>
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

        <section className="relative max-w-6xl mx-auto grid grid-cols-1 z-20 w-full min-h-fit gap-8">
          <div className="">
            <Search
              regplate={regplate}
                setRegplate={setRegplate}
                  onSubmit={handleRegSearch}
                    className="relative w-full pt-2 mx-auto"
            />
          </div>
          <div className="">
            {showBoard && (
              <Board 
                leaderboard={leaderboard.slice(0, 5)}
                  className="rounded-2xl w-full mx-auto"
              />
            )}
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto z-20 mt-20 pb-20">
          <div className="flex items-center space-x-4 mb-12 px-5">
            <div className="h-[1px] w-12 bg-cyan-400 opacity-50"></div>
            <h2 
              className="font-space text-sm md:text-xl tracking-[0.3em] uppercase text-white/90 text-warm-glow"
                style={{ filter: 'drop-shadow(-10px 0 15px rgba(34,211,238,0.4)) drop-shadow(10px 0 15px rgba(250,204,21,0.4))' }}
            >
              HelpMe-Car Mission // Protocol & Intel
            </h2>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                STATUS: OPERATIONAL // OPT_LOAD: f1(1) // DATA_STREAM: 10k_PI // AGRI_SCAN: ACTIVE
              </span>
              <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5">
            <section className="space-y-9">
              <article className={articleClass} >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">04 // LEGAL</span>
                  <span className="text-white/20 group-hover:text-cyan-400 transition-colors">↗</span>
                </div>
                <Link to="/regrules" className="inline-block">
                  <h3 className={missionh3Class}>Rules & Regulations</h3>
                </Link>
                
                <div className="font-space font-semibold text-xs text-zinc-700/80 dark:text-white/50 space-y-1 leading-relaxed">
                  <p>• Authorized personnel only.</p>
                  <p>• Zero-use policy while operating machinery.</p>
                  <p>• Mobile device interference is strictly prohibited by law.</p>
                </div>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f1(1)
                </div>
              </article>

              <article className={articleClass} >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">05 // PEACE & PROSPERITY</span>
                  <div className="flex flex-col space-y-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                  </div>
                </div>
                <Link to="/reghelp" className="inline-block">
                  <h3 className={missionh3Class}>WHy People Should Help</h3>
                </Link>
                <p className="font-space text-xs text-zinc-700/80 dark:text-white/50 leading-relaxed">Helping strangers for zero reward. It is illogical, inefficient, and exactly what the mission requires. No sign-up, no tracking, just pure data altruism.</p>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f1(2)
                </div>
              </article>

              <article className={articleClass} >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">06 // SEEK OUT AND YE SHALL FIND (OR NOT HAHA)</span>
                  <span className="text-white/20 group-hover:text-cyan-400 transition-colors">↗</span>
                </div>
                <Link to="/search" className="inline-block">
                  <h3 className={missionh3Class}>Car Search</h3>
                </Link>
                
                <div className="font-space font-semibold text-xs text-zinc-700/80 dark:text-white/50 space-y-1 leading-relaxed">
                  <p>• This way to search for your car</p>
                  <p>• Or Family member or Friend's car</p>
                  <p>• Or someone in front of you (driving)</p>
                  <p>• Just not whilst driving</p>
                </div>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f1(3)
                </div>
              </article>

              <article className={articleClass} >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">07 // CAR SAFETY / ACCIDENT STATS</span>
                  <div className="flex flex-col space-y-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                  </div>
                </div>
                <Link to="/regsafety" className="inline-block">
                  <h3 className={missionh3Class}>RAS50002 & RAS20002 DOT Statistics</h3>
                </Link>
                <div className="font-space text-xs text-white/50 leading-relaxed">
                  <a 
                    rel='noopener noreferrer' 
                      target='_blank' 
                        href='https://www.gov.uk/government/collections/road-accidents-and-safety-statistics'
                          className="text-cyan-500 font-bold"
                            aria-label="This link goes to an offical site of tehe Department For Transport"
                  >
                    <p>Accident reports from The Department of Transport Statistics </p>
                  </a>
                </div>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f1(4)
                </div>
              </article>

              <article className={articleClass} >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">08 // SOMETIMES THE ANSWERS LIE AT THE BEGINNING</span>
                  <span className="text-white/20 group-hover:text-cyan-400 transition-colors">↗</span>
                </div>
                <Link 
                  to="/" 
                    onClick={() => toast.success(`Isn't the neon glow good?`)}
                      className="inline-block"
                >
                  <h3 className={missionh3Class}>Landing Page</h3>
                </Link>
                
                <div className="font-space font-semibold text-xs text-zinc-700/80 dark:text-white/50 space-y-1 leading-relaxed">
                  <p>• Want to start from the beginning?</p>
                  <p>• Now's your chance</p>
                  <p>• Back to the start with you!!</p>
                </div>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f1(5)
                </div>
              </article>
            </section>

            <section>
              <article 
                className={article2Class}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyan-400 tracking-widest">09 // ALTERNATIVE TRANSPORT / FARM VEHICLES</span>
                  <div className="flex flex-col space-y-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div></div>
                    <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-500/80 dark:bg-white/40"></div></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                    <div className="h-[2px] w-[35px] bg-cyan-400"></div>
                  </div>
                </div>
                <div className="relative left-1/2 p-1 font-mono text-[8px] text-yellow-800 dark:text-yellow-400 opacity-40">CRITICAL_OUTLIER_DETECTED</div>
                <div className="text-center space-y-6 relative z-10">
                  <h3 className={missionh3Class}>
                  SENSORS DETECTING
                  <span className="text-yellow-400 transition-transform inline-block mt-2 font-bold">AGRICULTURAL HARDWARE?</span>
                  </h3>
                  <p className="font-space text-sm text-zinc-700/80 dark:text-white/40 max-w-xs mx-auto">
                    Have you ever driven a car? Have you ever been a passenger in a car? Would you rather be romping around the countryside in a million pound harvesting machine? Have you ever considered a career in farming? If not, become a millionaire and live the farmer's lifestyle..
                  </p>

                  <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
                  <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                    STATUS: OPERATIONAL // AGRI_SCAN: ACTIVE
                  </span>

                  <article className={`${shimmerClass} z-10 flex mx-auto sm:w-[100%] mb-8 bg-search-combine bg-standard md:bg-fixed shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)] rounded-2xl hover:shadow-[0_20px_50px_rgba(34,211,238,0.3)] transition-all duration-500 group overflow-hidden`}>
                    <div className="flex flex-col min-h-[500px] landscape:min-h-[850px] p-8 items-center justify-center my-auto bg-zinc-900/30 group-hover:bg-zinc-900/10 transition-colors duration-500">
                      <div className="font-space text-2xl md:text-3xl lg:text-4xl text-white font-extrabold text-center leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500">
                        Maybe cars aren't for you... <br/>
                        <a 
                          href="https://www.deere.co.uk/en-gb/products-and-solutions/harvesting/combines"
                            target="_blank"
                              rel="noopener noreferrer"
                                className="text-yellow-400"
                        >
                          Maybe you would prefer a Combine Harvester?
                        </a>
                      </div>
                    </div>       
                  </article>
                  <div className="flex flex-col items-end">
                  <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                    STATUS: OPERATIONAL // AGRI_SCAN: ACTIVE
                  </span>
                  <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
                </div>

              
                </div>
                <div className={payloadClass}>
                  Payload: 10,000_Digits_Pi // Protocol: f2(1)
                </div>
              </article>
            </section>

          </section>
        </section>
      </section>
    </>
  )
}

export default Reg;