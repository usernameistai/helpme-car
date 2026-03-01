import type { FC } from 'react';
import GlassCard from '../components/reg/components/GlassCard';
import { useUser } from '@clerk/clerk-react';
import { useProfileStore } from '../store/useProfileStore';
import { useMyActivity } from '../hooks/useMyActivity';
import Spinner from '../components/layout/Spinner';
import { Link } from 'react-router-dom';
import ParticlesBg from '../components/layout/ParticlesBg';
import { twMerge } from 'tailwind-merge';


const DashboardRegs: FC = () => {
  const { user } = useUser(); // Clerk session
  const { profile, loading, error } = useProfileStore();
  const { data: myCars } = useMyActivity();

  const dashClass = "font-inter tracking-wider flex justify-between text-lg sm:text-xl font-semibold text-gray-100";
  const navClass = "font-poppins dark:bg-yellow-500/20 dark:text-yellow-400 border dark:border-yellow-500/50 bg-sky-500/20 text-sky-400 border-2 border-sky-500/50 font-semibold max-w-36 text-center rounded px-4 py-2 sm:py-4 h-16 mt-6 justify-center shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

  if (!user) return <p>Please sign in to view your dashboard</p>
  if (loading) return <Spinner />
  if (error) return <p className="text-red-500">{error}</p>
  if (!profile) return <p>Loading profile data...</p>;
  return (
    <>
      <ParticlesBg theme="snow" colour="cyan-400" className="fixed inset-0 z-0 pointer-events-none touch-none"/>
      <section className={`relative z-10 p-4 sm:p-6 min-h-screen ${profile.theme === "dark" ? "text-white" : "text-gray-900"} mx-auto max-w-6xl relative bg-search-combine bg-standard md:bg-fixed shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]`}>
        <div className="absolute inset-0 bg-zinc-950/60 pointer-events-none" />
        <div className="relative z-20 space-y-7">
          <div className="flex items-center gap-4 mb-6 font-michroma text-[10px] tracking-widest uppercase opacity-70">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400">System: Operational</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            <div className="text-zinc-400 hidden sm:block">Sector: English / The Universe</div>
            <div className="text-zinc-400">Node: {profile?.userId?.slice(-6) || "-----"}</div>
          </div>
          <h1 className="relative font-space z-10 text-4xl sm:text-5xl font-bold mt-5 mb-4 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300" >
            All the cars helped by: {''}
            <span className="text-5xl sm:text-7xl">
              {profile?.username}
            </span>
          </h1>
          {/* Cars I have helped */}
          <GlassCard title={`${profile?.username}'s Impact`} className="overflow-visible touch-pan-y font-space backdrop-blur-md z-10 hover:scale-100 sm:hover:scale-[1.05]">
            <div className="m-4 flex items-center justify-around bg-cyan-500/5 rounded-lg border border-white/5 py-3">
              {/* Cars Helped Metric */}
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-michroma text-zinc-400 tracking-[0.2em] uppercase mb-1">
                  Cars_Helped
                </span>
                <p className={`${dashClass} !m-0 !p-0 flex items-center gap-2`}>
                  <span className="text-xl font-bold tracking-tighter">{profile.carsHelped}</span>
                  <span className="text-sm opacity-70">🚗</span>
                </p>
              </div>

              {/* Mission Divider */}
              <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

              {/* Stars Given Metric */}
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-michroma text-zinc-400 tracking-[0.2em] uppercase mb-1">
                  Stars_Given
                </span>
                <p className={`${dashClass} !m-0 !p-0 flex items-center gap-2`}>
                  <span className="text-xl font-bold tracking-tighter">{profile.starsGiven}</span>
                  <span className="text-sm opacity-70">🌟</span>
                </p>
              </div>
            </div>

            {/* LOGBOOK SECTION - Fixed Height Containment */}
            <div className="mt-4 border-t border-cyan-500/10 pt-4 flex flex-col">
              {/* REPLACEMENT LOGBOOK HEADER */}
              <div className="mt-4 border-t border-cyan-500/20 pt-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-o">
                  <div className='text-center sm:text-left'>
                    <h2 className="text-cyan-500 font-michroma text-[10px] uppercase tracking-[0.2em]">
                      Archive_Database_v1.0
                    </h2>
                    <p className="text-zinc-500 text-[8px] mt-1 font-mono uppercase tracking-tighter">
                      Status: Encrypted // Location: {profile?.username || "Unknown"}_Vault
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-[8px] text-cyan-500/60 block uppercase font-michroma tracking-widest">
                      Incomplete_Units_Helped
                    </span>
                    <span className="text-2xl text-yellow-400 font-black tracking-tighter leading-none">
                      {myCars?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* THE GRID: Locked to 2x2 for clean presentation */}
              <div className="mt-4 border-t border-cyan-500/10 pt-4 flex flex-col">
                <div className="grid grid-cols-2 gap-3 flex-none">
                  {myCars?.sort(() => Math.random() - 0.5).slice(0, myCars?.length).map((car: any) => (
                    <Link
                      key={car._id}
                      to={`/reg/${car.regplate}`}
                      className="group relative flex flex-col justify-center items-center p-4 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-sm hover:border-cyan-500/50 transition-all duration-300 overflow-visible touch-pan-y"
                    >
                      {/* Decorative Corner Flange */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                      
                      <span className="text-yellow-400 font-black text-lg tracking-[0.15em] drop-shadow-[0_0_8px_rgba(250,204,21,0.2)]">
                        {car.regplate}
                      </span>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                        <span className="text-[8px] text-cyan-500 font-michroma uppercase">
                          Unit_Link
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FOOTER ACTION: Only shows if more than 4 exist */}
              <button className="mt-3 w-full py-1.5 border border-white/5 bg-white/5 text-[8px] font-michroma text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-white/10 transition-all uppercase tracking-widest">
                <Link to="https://www.halfords.com/" target="_blank" rel="noopener noreferrer">
                  Access Archive HALFORDS
                </Link>
              </button>
              <button className="mt-3 w-full py-1.5 border border-white/5 bg-white/5 text-[8px] font-michroma text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-white/10 transition-all uppercase tracking-widest">
                <Link to="https://www.eurocarparts.com/" target="_blank" rel="noopener noreferrer">
                  Access Archive EURO_CAR_PARTS
                </Link>
              </button>
              <button className="mt-3 w-full py-1.5 border border-white/5 bg-white/5 text-[8px] font-michroma text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-white/10 transition-all uppercase tracking-widest">
                <Link to="https://www.gsfcarparts.com/" target="_blank" rel="noopener noreferrer">
                  Access Archive GSF_CAR_PARTS
                </Link>
              </button>
              <div className="flex flex-col items-center mt-8">
                <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.2em]">
                  STATUS: IMPACT // FUNC_DASH_REGS_PAGE: CARS_HELPED
                </span>
                <div className="h-[1px] w-24 mt-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions  */}
          <GlassCard title="Quick Actions" className="font-space backdrop-blur-md z-10 hover:scale-100 sm:hover:scale-[1.05]">
            <div className="mb-4">
              {/* Grid layout for mobile, single row for desktop */}
              <nav className='grid grid-cols-1 sm:flex justify-center sm:justify-between items-center gap-4 w-full text-base sm:text-lg'>
                {[
                  { to: `/dashboard/${profile.userId}/edit`, label: 'Edit Profile', color: 'cyan' },
                  { to: "/helpreg", label: 'Help A Car', color: 'yellow' },
                  { to: "/reg", label: 'Home Page', color: 'cyan' }
                ].map((link, idx) => (
                  <Link 
                    key={idx}
                    to={link.to} 
                    className={twMerge(
                      navClass, 
                      shimmerClass,
                      "relative group flex items-center max-w-full sm:max-w-none mt-0 h-14 font-poppins transition-all"
                    )}
                  >
                    {/* Static Corner Detail for the button */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-400" />
                    
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Glitch-style underline on hover */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-400 group-hover:w-3/4 transition-all duration-300 shadow-[0_0_8px_cyan]" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer Telemetry */}
            <div className="flex flex-col items-center mt-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.2em]">
                  STATUS: PAGE_EXIT // FUNC_DASH_PAGE: READY_FOR_DISPATCH
                </span>
              </div>
              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
};

export default DashboardRegs;