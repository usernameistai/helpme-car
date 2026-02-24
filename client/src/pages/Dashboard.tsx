import { useEffect, useRef, type FC } from "react";
import { Link } from "react-router-dom";
import { useProfileStore } from "../store/useProfileStore";
import { getMyProfile } from "../api/profile";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMyActivity } from "../hooks/useMyActivity";
import { BsFillLightningChargeFill } from "react-icons/bs";
import GlassCard from "../components/reg/components/GlassCard";
import Spinner from "../components/layout/Spinner";
import ParticlesBg from "../components/layout/ParticlesBg";
import toast from "react-hot-toast";

const Dashboard: FC = () => {
  const { user } = useUser(); // Clerk session
  const { isLoaded, getToken } = useAuth();
  const { profile, loading, error, setProfile, setLoading, setError } = useProfileStore();
  const { data: myCars, isLoading: loadingCars } = useMyActivity();
  const hasWelcomed = useRef(false);

  const dashClass = "font-inter tracking-wider flex justify-between text-lg sm:text-xl font-semibold text-gray-100";
  const navClass = "font-poppins dark:bg-yellow-500/20 dark:text-yellow-400 border dark:border-yellow-500/50 bg-sky-500/20 text-sky-400 border-2 border-sky-500/50 font-semibold max-w-36 text-center rounded px-4 py-2 sm:py-4 h-16 mt-6 justify-center shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getMyProfile(getToken);
        setProfile(data);
        if (!hasWelcomed.current) {
          toast.success(`Welcome to your dashboard`, {
            id: 'welcome-toast',
            duration: 2500,
          });
          hasWelcomed.current = true;
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load profile");
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, isLoaded]); //  

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
            Welcome back {''}
            <span className="text-5xl sm:text-7xl">
              {profile?.username}
            </span>
          </h1>

          {/* Profile Section  */}
          <GlassCard 
            title={`${profile?.username}'s Profile`} 
              className="font-space backdrop-blur-md z-10 overflow-visible touch-pan-y group min-h-[450px]"
          >
            {/* TOP TIER: DATA Dossier */}
            <div className="m-4 flex-1 space-y-4">
              {[
                { label: "First Name", value: profile?.firstName },
                { label: "Last Name", value: profile?.lastName },
                { label: "Username", value: profile?.username },
                { label: "Email Address", value: profile?.email }
              ].map((item, idx) => (
                <div key={idx} className="relative group/item">
                  {/* Tactical Label */}
                  <span className="text-[10px] font-michroma text-cyan-500/60 uppercase tracking-[0.2em] block mb-1">
                    {item.label.replace(" ", "_")}
                  </span>
                  
                  {/* Value with "Active Cursor" effect */}
                  <div className="flex items-center gap-3 bg-white/5 border-l-2 border-cyan-400/30 p-2 rounded-r-md group-hover/item:bg-white/10 transition-all">
                    <span className="text-white font-bold tracking-wide">
                      {item.value || "NOT_SET"}
                    </span>
                    <div className="h-4 w-[2px] bg-cyan-400 animate-pulse opacity-0 group-hover/item:opacity-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM TIER: MISSION TELEMETRY (Pinned) */}
            <div className="p-6 bg-gradient-to-t from-cyan-900/20 to-transparent">
              <div className="flex flex-col items-center">
                {/* Dynamic Status Indicator */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-400/50" />
                  <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] animate-pulse">
                    CONNECTED_SESSION
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-400/50" />
                </div>

                <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.1em] uppercase">
                  STATUS: PROFILE // FUNC_DASH_PAGE: {profile?.username || "GUEST"}
                </span>
                
                {/* The "Magic" Footer Bar */}
                <div className="relative w-full max-w-[200px] h-[2px] mt-4 bg-white/10 overflow-visible touch-pan-y">
                  <div className="absolute inset-0 bg-cyan-400 w-1/3 animate-scan-fast shadow-[0_0_10px_cyan]" />
                </div>
              </div>
            </div>
          </GlassCard>
         
          {/* Cars I have helped */}
          <GlassCard title="Your Impact" className="overflow-visible touch-pan-y font-space backdrop-blur-md z-10">
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
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-michroma text-cyan-400 tracking-widest uppercase">
                    Active_Recon
                  </span>
                  <span className="text-[7px] text-zinc-500 font-mono italic">
                    MAX_DISPLAY: 04_UNITS
                  </span>
                </div>
                <span className="text-[10px] text-zinc-300 font-mono bg-white/5 px-2 py-0.5 rounded border border-cyan-400/10">
                  TOTAL: {myCars?.length || 0}
                </span>
              </div>

              {/* THE GRID: Locked to 2x2 for clean presentation */}
              <div className="mt-4 border-t border-cyan-500/10 pt-4 flex flex-col">
                <div className="grid grid-cols-2 gap-3 flex-none">
                  {myCars?.slice(0, 10).map((car: any) => (
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
              {myCars?.length > 4 && (
                <button className="mt-3 w-full py-1.5 border border-white/5 bg-white/5 text-[8px] font-michroma text-zinc-400 hover:text-cyan-400 hover:bg-white/10 transition-all uppercase tracking-widest">
                  Access Archive DB (+{myCars.length - 4})
                </button>
              )}
              <div className="flex flex-col items-center mt-8">
                <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.2em]">
                  STATUS: IMPACT // FUNC_DASH_PAGE: CARS_HELPED
                </span>
                <div className="h-[1px] w-24 mt-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
              </div>
            </div>
          </GlassCard>

          {/* Superpowers (for fun) */}
          <GlassCard title="Superpowers" className="font-space backdrop-blur-md z-10">
            <div className="m-4">
              {profile.superpowers?.length ? (
                <ul className="space-x-2">
                  {profile.superpowers?.map((s, i) => (
                    <li key={i} className="flex flex-row text-xl gap-2 items-center">
                      <BsFillLightningChargeFill className="text-yellow-300"/>
                      <div className="text-gray-100 ">{s}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="">
                  <p className={`${dashClass}`}>
                    <span>No superpowers yet </span>
                    <span><BsFillLightningChargeFill className="text-yellow-300 inline mx-2"/></span>
                    <span>⚡ ⚡️ 🌩️ ⛈️ 🔌 🧨 💥</span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center mt-16">
              <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.2em]">
                STATUS: SUPERPOWERS // FUNC_DASH_PAGE: LIST_INCLUDED
              </span>
              <div className="h-[1px] w-24 mt-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
            </div>
          </GlassCard>

          {/* Quick Actions  */}
          <GlassCard title="Quick Actions" className="font-space backdrop-blur-md z-10">
            <div className="mb-4">
              <nav className='flex justify-between items-center text-base sm:text-lg gap-3'>
                <Link to={`/dashboard/${profile.userId}/edit`} className={`${navClass} ${shimmerClass}`} aria-label='Go back to the home page button'>
                  Edit Profile
                </Link>
                <Link to="/helpreg" className={`${navClass} ${shimmerClass}`} aria-label='Go back to the home page button'>
                  Help A Car
                </Link>
                <Link to="/reg" className={`${navClass} ${shimmerClass}`} aria-label='Go back to the home page button'>
                  Home Page
                </Link>
              </nav>
            </div>
            <div className="flex flex-col items-center mt-8">
              <span className="font-mono text-[0.7rem] text-cyan-400/50 tracking-[0.2em]">
                STATUS: PAGE_EXIT // FUNC_DASH_PAGE: QUICK_LINKS
              </span>
              <div className="h-[1px] w-24 mt-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
};

export default Dashboard;