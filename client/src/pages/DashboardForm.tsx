import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import type { IProfile } from '../types/profile';
import { useProfileStore } from '../store/useProfileStore';
import toast from 'react-hot-toast';
import Spinner from '../components/layout/Spinner';
import { useAuth } from '@clerk/clerk-react';
import { api } from '../api/profile';
import ParticlesBg from '../components/layout/ParticlesBg';

const DashboardForm: React.FC = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { profile, loading, error, setLoading, setProfile  } = useProfileStore();
  const [currentPower, setCurrentPower] = useState("");
  const [editted, setEditted] = useState(false);
  // Initialise formData but keep it empty until profile loads
  const [formData, setFormData] = useState<Partial<IProfile>>({});

  const sectionClass = "mb-4 p-4 sm:p-6 z-50 relative bg-zinc-100/10 dark:bg-zinc-900/20 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const h2Class = "font-space text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 mb-4";
  const brightBorder = "absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const buttonLink = "font-poppins relative z-10 max-w-44 font-semibold items-center text-center justify-center rounded px-3 md:px-4 py-2 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
  const inputStyle = "bg-zinc-950/40 border border-cyan-400/30 rounded-lg p-2 sm:p-3 w-full text-base sm:text-lg text-cyan-50 focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all outline-none placeholder:text-zinc-600";
  // Sync profile from Store to Form once it loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        theme: profile.theme,
        superpowers: profile.superpowers,
      });
    }
  }, [profile]);

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();
      // Send data to MongoDB via axios
      const res = await api.put("/", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update the Zustand store with FRESH data from MongoDB
      setProfile(res.data);
      toast.success("Profile Updated! 🌟")
      setEditted(true);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Failed to submit form:", err);
      toast.error("Not updated");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPower = ( e: React.KeyboardEvent ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const power = currentPower.trim().replace(',', '');
      const existingPowers = formData.superpowers || [];

      if (power && !existingPowers.includes(power)) {
        // Update local state / store
        setFormData({
          ...formData,
          superpowers: [...existingPowers, power],
        });
        setCurrentPower("");
      }
    }
  };

  const removePower = (powerToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      superpowers: prev.superpowers?.filter(p => p !== powerToRemove) || [],
    }))
  };

  if (loading) return <Spinner />;
  if (error) return <p>Sorry Dave, there's an error: {error}</p>;

  return (
    <>
      <ParticlesBg theme='snow' colour='cyan-400' />
      <div className="relative z-20 p-4 sm:p-6 bg-search-combine bg-standard bg-fixed shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 bg-zinc-950/60 pointer-events-none" />
        
        {/* Header with improved typography */}
        <h1 className="font-space relative z-10 text-3xl sm:text-5xl font-bold mt-5 mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 leading-tight">
          Personnel Update: <span className="text-5xl sm:text-7xl block sm:inline">{profile?.username}</span>
        </h1>

        <form onSubmit={onSubmit} className="relative z-10 space-y-6">
        {editted && (
          <div role='status' aria-live='polite' className='sr-only'>Submission successful. You have helped out a fellow human or earthling. Gold star ✴️✴️✴️✴️✴️</div>
        )}
          {/* SECTION 1: IDENTITY */}
          <section className={`${sectionClass} hover:scale-100 sm:hover:scale-[1.02]`}>
            <h2 className={h2Class}>Helper Dossier Identity</h2>
            <div className='space-y-4'>
              <fieldset>
                <label htmlFor="edit-first-name" className='font-michroma text-[10px] text-cyan-400/60 uppercase tracking-widest block mb-2'>
                  First Name / ID_01
                </label>
                <input 
                  type="text" 
                    name="firstName"
                      value={formData.firstName || ""}
                        onChange={handleInputChange}
                          className={inputStyle}
                            placeholder='Enter First Name...'
                              id="edit-first-name"
                                required
                />
              </fieldset>

              <fieldset>
                <label htmlFor="edit-last-name" className='font-michroma text-[10px] text-cyan-400/60 uppercase tracking-widest block mb-2'>
                  Last Name / ID_02
                </label>
                <input 
                  type="text" 
                    name="lastName"
                      value={formData.lastName || ""}
                        onChange={handleInputChange}
                          className={inputStyle}
                            placeholder='Enter Last Name...'
                              id="edit-last-name"
                                required
                />
              </fieldset>
            </div>
            <div className={brightBorder}></div>
          </section>

          {/* SECTION 2: AUGMENTATIONS */}
          <section className={`${sectionClass} hover:scale-100 sm:hover:scale-[1.02]`}>
            <h2 className={h2Class}>Superpower Augmentations</h2>
            <fieldset>
              <label htmlFor="edit-superpowers" className='font-michroma text-[10px] text-cyan-400/60 uppercase tracking-widest block mb-2'>
                Add Ability (Press Enter to Lock)
              </label>
              <input 
                type="text" 
                  value={currentPower}
                    onChange={(e) => setCurrentPower(e.target.value)}
                      onKeyDown={handleAddPower}
                        placeholder='Type power and hit Enter / Return...'
                          id="edit-superpowers"
                            className={inputStyle}
              />

              <div className="flex flex-wrap gap-2 mt-6">
                {formData.superpowers?.map((power) => (
                  <span key={power} className='flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-md font-space text-sm animate-in zoom-in'>
                    <span className="text-yellow-400 text-xs">⚡</span> {power}
                    <button type='button' onClick={() => removePower(power)} className='hover:text-red-400 transition-colors ml-1 font-bold'>×</button>
                  </span>
                ))}
              </div>
            </fieldset>
            <div className={brightBorder}></div>
          </section>

          {/* SECTION 3: CHOOSE THE THEME */}
          <section className={sectionClass}>
           <h2 className={h2Class}>Choose your theme, light | dark</h2>
            <div className="flex gap-6 items-center">
             {['light', 'dark'].map((t) => (
              <label key={t} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                    name="theme"
                      value={t}
                        checked={formData.theme === t}
                          onChange={handleInputChange} // This works because your handler uses e.target.name
                            className="w-5 h-5 accent-yellow-300 cursor-pointer"
                />
                <span className="roboto text-base sm:text-xl font-semibold text-zinc-100 capitalize group-hover:text-yellow-300 transition-colors">
                { t === 'light' ? '☀️' : '🌙'} {t} Theme
                </span>
              </label>
            ))}
            </div>
            <div className={brightBorder}></div>
          </section>

          {/* SECTION 4: QUICK ACTIONS (Centered & Congruent) */}
          <section className={`${sectionClass} hover:scale-100`}>
            <h2 className={h2Class}>Mission Protocol</h2>
            <nav className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 w-full">
              <button 
                type="submit"
                className={`${buttonLink} ${shimmerClass} bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 w-full sm:flex-1 max-w-[280px] sm:max-w-none h-14 text-base sm:text-lg font-poppins`}
              >
                Update Dossier
              </button>
              <Link 
                to="/dashboard" 
                className={`${buttonLink} ${shimmerClass} flex items-center justify-center bg-white/5 text-zinc-300 border border-white/10 w-full sm:flex-1 max-w-[280px] sm:max-w-none h-14 text-base sm:text-lg font-poppins`}
              >
                Abort Mission
              </Link>
            </nav>
            <div className={brightBorder}></div>
          </section>
        </form>
      </div>
    </>
  );

  
};

export default DashboardForm;