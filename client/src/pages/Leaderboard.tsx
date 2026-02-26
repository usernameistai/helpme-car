import { type FC } from 'react'
import { getLeaderboard } from '../api/profile';  
import Spinner from '../components/layout/Spinner';
import GlassCard from '../components/reg/components/GlassCard';
import ParticlesBg from '../components/layout/ParticlesBg';
import { useQuery } from '@tanstack/react-query';
import { GiTrophyCup } from "react-icons/gi";
import { motion } from 'motion/react';

interface LeaderboardProps {
  clerkId: string;
  username: string;
  carsHelped: number;
  starsGiven: number;
};
interface BoardProps {
  leaderboard: any[];
  className?: string;
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const rowVariants = {
  hidden: { opacity: 0, x: -20 }, // Slide in slightly from the left
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
} as const;

export const Board: FC<BoardProps> = ({ leaderboard, className = "" }) => {
  return (
    <>
      <div className={className}>
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500 z-40" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500 z-40" />
        <GlassCard title='SYSTEM_STATUS: Hero Leaderboards' className="font-michroma hover:scale-100 landscape:min-h-[500px] backdrop-blur-xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]" >
          <motion.ul 
            className="space-y-4 pt-2 relative z-10"
              variants={containerVariants}
                initial="hidden"
                  animate="visible"
          >
            {leaderboard.map((entry: LeaderboardProps, index: number) => {
              const isTopThree = index < 3;
              const medalStyles = [
                "text-yellow-400 border-l-yellow-400 border-b-yellow-400/30 bg-yellow-400/5 shadow-[inset_10px_0_15px_-10px_rgba(250,204,21,0.3)]", // Gold
                "text-zinc-300 border-l-zinc-300 border-b-zinc-300/20 bg-zinc-300/5 shadow-[inset_10px_0_15px_-10px_rgba(212,212,216,0.2)]", // Silver
                "text-amber-600 border-l-amber-600 border-b-amber-600/20 bg-amber-600/5 shadow-[inset_10px_0_15px_-10px_rgba(217,119,6,0.2)]", // Bronze
              ];

              return (
                <motion.li 
                  key={`${index}`} 
                    variants={rowVariants}
                      // whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      whileHover={{ x: 10, backgroundColor: "rgba(34, 211, 238, 0.08" }}
                        className={`
                        flex justify-between items-center p-2 sm:p-4 transition-all relative rounded-r-md
                        ${isTopThree 
                          ? `${medalStyles[index]} border-l-4 border-b` 
                          : "bg-black/20 border-l-2 border-l-zinc-800 border-b border-white/5 text-zinc-500"}
                      `}
                >
                  <div className="flex items-center gap-6">
                    {/* RANK SECTION: Icon above ID */}
                    <div className="flex flex-col items-center justify-center min-w-[33px]">
                      <span className="text-base sm:text-xl mb-1">
                        {index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-widest opacity-60">
                        { (index + 1).toString().padStart(2, '0') }
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className={`font-space uppercase tracking-[0.2em] text-zinc-700/80 text-xs sm:text-base ${isTopThree ? 'dark:text-white' : 'dark:text-zinc-400'}`}>
                        {entry.username}
                      </span>
                      <span className="text-[9px] font-mono opacity-40 uppercase">
                        AUTH_LEVEL: {isTopThree ? 'ELITE' : 'RESERVE'}
                      </span>
                    </div>
                  </div>

                  <div className="flex font-mono gap-10 items-center text-right">
                    {/* ASSISTS SECTION */}
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[8px] opacity-40 uppercase tracking-tighter">Assists</span>
                      <span className="text-cyan-400 text-sm">
                        {entry.carsHelped.toString().padStart(3, '0')}
                      </span>
                    </div>
                    
                    {/* MERIT SECTION: Stars underneath score */}
                    <div className="flex flex-col items-center sm:items-end min-w-[70px]">
                      <span className="pr-2 sm:pr-0 text-[8px] opacity-40 uppercase tracking-tighter">Merit</span>
                      <span className={`text-xl font-black leading-none ${isTopThree ? 'text-white' : 'text-zinc-300'}`}>
                        {entry.starsGiven}
                      </span>
                      <div className="flex gap-0.5 mt-1">
                        {/* Visual Star-line */}
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-[10px] ${isTopThree ? 'text-yellow-400' : 'text-zinc-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
 
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              Data_Stream: 128-bit_Encrypted
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500/50 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse [animation-delay:0.2s]" />
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
};

const Leaderboard: FC = () => {
  const { data: leaderboard = [], isLoading, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard, // existing API call function
    staleTime: 1000 * 60 * 2,
    placeholderData: (prevData) => prevData,
  });

  if (isLoading) return <Spinner />
  if (isError) return <p className="text-red-500 text-center">Failed to load rankings.</p>

  return (
    <>
      <ParticlesBg theme='nasa' colour='yellow-300' />
      <section className='relative z-20 my-[-1.5rem]'>
        <section className="p-6 mx-auto max-w-6xl bg-rules-people-8 bg-standard bg-fixed bg-black/50 min-h-screen">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 mb-8 md:mb-12">
            <h1 className="font-space text-center text-3xl sm:text-6xl pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 tracking-tight">
              Global Hero Rankings
            </h1>
            <motion.div
              animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <GiTrophyCup className="text-4xl sm:text-6xl text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
            </motion.div>
          </div>
          <Board leaderboard={leaderboard}/>
        </section>
      </section>
    </>
  );
};

export default Leaderboard;