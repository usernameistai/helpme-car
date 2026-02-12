import React, { type FC } from 'react'
import { getLeaderboard } from '../api/profile';  
import Spinner from '../components/layout/Spinner';
import GlassCard from '../components/reg/components/GlassCard';
import ParticlesBg from '../components/layout/ParticlesBg';
import { useQuery } from '@tanstack/react-query';
import { GiTrophyCup } from "react-icons/gi";

interface BoardProps {
  leaderboard: any[];
  className?: string;
}

export const Board: FC<BoardProps> = ({ leaderboard, className = "" }) => {
  return (
    <>
      <div className={className}>
        <GlassCard title='HelpMe-Car Leaderboards' className="michroma landscape:min-h-[500px] backdrop-blur-xl shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]" >
          <ul className="space-y-4">
            {leaderboard.map((entry: any, index: number) => (
              <li 
                key={entry.clerkId} 
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
              </li>
            ))}
          </ul>
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
        <section className="p-6 mx-auto lg:mx-56 bg-rules-people-8 bg-fixed bg-black/30 min-h-screen">
          <h1 className="relative flex justify-between text-center z-10 text-2xl sm:text-5xl font-bold mt-5 mb-4 pb-2 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
            <span className="space-grotesk">Global Hero Rankings</span> 
            <span className=""><GiTrophyCup className='text-yellow-300'/></span>
          </h1>
            <Board leaderboard={leaderboard}/>
          </section>
      </section>
    </>
  );
};

export default Leaderboard;