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
  const { data: myCars, isLoading: loadingCars } = useMyActivity()
  const hasWelcomed = useRef(false);

  const dashClass = "font-inter tracking-wider flex justify-between text-lg sm:text-xl font-semibold text-gray-100";
  const navClass = "font-poppins text-slate-700 font-semibold bg-yellow-300 max-w-36 text-center rounded px-4 py-2 sm:py-4 h-16 mt-6 justify-center shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
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
      <ParticlesBg theme="snow" colour="cyan-400" />
      <section className={`relative z-20 p-6 my-[-1.5rem] ${profile.theme === "dark" ? "text-white" : "text-gray-900"} mx-auto max-w-6xl relative bg-search-combine bg-standard bg-fixed shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]`}>
        <div className="absolute inset-0 bg-zinc-950/60" />
        <div className="relative z-10">
        <h1 className="relative font-space z-10 text-4xl sm:text-5xl font-bold mt-5 mb-4 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300" >
          Welcome back {''}
          <span className="text-5xl sm:text-7xl">
            {profile?.username}
          </span>
        </h1>

        {/* Profile Section  */}
        <GlassCard title={`${profile?.username}'s Profile`} className="font-space backdrop-blur-md z-30">
          <div className="m-4">
            <p className={`${dashClass}`}>
              <span className="hidden sm:flex">First Name: </span>
              <span className="ml-1 sm:ml-0">{profile?.firstName || "Not set"} </span>
            </p>
            <p className={`${dashClass}`}>
              <span className="hidden sm:flex">Last Name: </span>
              <span className="ml-1 sm:ml-0">{profile?.lastName || "Not set"} </span>
            </p>
            <p className={`${dashClass}`}>
              <span className="hidden sm:flex">Username: </span>
              <span className="ml-1 sm:ml-0">{profile?.username || "Not set"} </span>
            </p>
            <p className={`${dashClass}`}>
              <span className="hidden sm:flex">Email: </span>
              <span className="ml-1 sm:ml-0">{profile?.email || "Not set"} </span>
            </p>
          </div>
        </GlassCard>

        {/* Cars I have helped */}
        <GlassCard title="Your Impact" className="font-space backdrop-blur-md z-30">
          <div className="m-4">
            <p className={`${dashClass}`}>
              <span>Cars Helped: </span>
              <span>{profile.carsHelped} 🚗 </span>
            </p>
            <p className={`${dashClass}`}>
              <span>Stars given: </span>
              <span>{profile.starsGiven} 🌟 </span>
            </p>

            {/* NEW: The Logbook Section */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <h3 className="text-sm font-bold text-cyan-400 mb-3 font-michroma tracking-tighter">
                Recent Acts of Kindess
              </h3>

              {loadingCars ? (
                <p className="text-xs animate-pulse text-zinc-400">Consulting the records...</p>
              ) : myCars?.length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-4">
                  {myCars.slice(0, 6).map((car: any) => (
                    <Link
                      key={car._id}
                        to={`/reg/${car.regplate}`}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded text-yellow-300 text-sm hover:border-cyan-400/50 hover:bg-white/10 transition duration-300 shadow-sm"
                    >
                      {car.regplate}
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No cars loged yet. Your first help is waiting!</p>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Superpowers (for fun) */}
        <GlassCard title="Superpowers" className="font-space backdrop-blur-md z-30">
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
        </GlassCard>

        {/* Quick Actions  */}
        <GlassCard title="Quick Actions" className="backdrop-blur-md z-30">
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
        </GlassCard>
        </div>

      </section>
    </>
  );
};

export default Dashboard;