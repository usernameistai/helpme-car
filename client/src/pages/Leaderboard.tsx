import React, { type FC } from 'react'
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
}

interface BoardProps {
  leaderboard: any[];
  className?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
        <GlassCard title='HelpMe-Car Leaderboards' className="michroma hover:scale-100 landscape:min-h-[500px] backdrop-blur-xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]" >
          <motion.ul 
            className="space-y-4 pt-2"
              variants={containerVariants}
                initial="hidden"
                  animate="visible"
          >
            {leaderboard.map((entry: LeaderboardProps, index: number) => {
              // Define styles for the top 3 spots
              const isTopThree = index < 3;
              const medalColors = [
                "text-yellow-400 border-yellow-400/50 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]", // Gold
                "text-zinc-300 border-zinc-300/50 bg-zinc-300/10", // Silver
                "text-amber-600 border-amber-600/50 bg-amber-600/10", // Bronze
              ];

              return (
                <motion.li 
                  key={entry.clerkId} 
                    variants={rowVariants}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        className={`
                          flex justify-between items-center roboto p-2 sm:p-4 rounded-xl transition-all border
                          ${isTopThree ? medalColors[index] : "bg-white/5 border-transparent text-gray-400"}
                        `}
                >
                  <div className="flex items-center gap-4">
                    {/* Special Icon for the Winner */}
                    <span className={`text-lg sm:text-2xl font-mono ${isTopThree ? 'font-bold' : ''}`}>
                    {index === 0 ? "👑" : 
                      index === 1 ? "🥈" : 
                        index === 2 ? "🥉" : 
                          `#${index + 1}`}
                    </span>
                    <span className={`text-lg sm:text-xl font-semibold ${isTopThree ? 'text-white' : 'text-gray-400'}`}>
                      {entry.username}
                    </span>
                  </div>

                  <div className="flex gap-6 items-center">
                    <span className={`text-xs sm:text-sm ${index === 0 ? 'text-yellow-300' : 'text-cyan-400'}`}>
                      {entry.carsHelped} Car(s)
                    </span>
                    <span className="text-lg sm:text-2xl font-bold">
                      {entry.starsGiven} ⭐
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </GlassCard>
      </div>
    </>
  )
}

const Leaderboard: React.FC = () => {
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
      <section className='relative z-20 my-[-1.5rem] '>
        <section className="p-6 mx-auto max-w-6xl bg-rules-people-8 bg-fixed bg-black/30 min-h-screen">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 mb-8 md:mb-12">
            <h1 className="text-center text-3xl sm:text-6xl pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 space-grotesk tracking-tight">
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

{/* {leaderboard.map((entry: any, index: number) => (
  <motion.li 
    key={entry.clerkId}
      variants={rowVariants}
        className="flex justify-between items-center roboto p-2 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
  >
    <div className="flex items-center gap-4">
      <span className="text-lg sm:text-2xl font-mono text-zinc-500 dark:text-zinc-100">#{index + 1}</span>
      <span className="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-100">{entry.username}</span>
    </div>
    <div className="flex gap-6 items-center">
      <span className="text-xs sm:text-sm text-cyan-400">{entry.carsHelped} Car(s)</span>
      <span className="text-lg sm:text-2xl font-bold text-yellow-300">{entry.starsGiven} ⭐</span>
    </div>
  </motion.li>
))} */}