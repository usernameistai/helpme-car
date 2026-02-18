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

  const sectionClass = "mb-4 p-4 sm:p-6 z-50 relative bg-slate-200/10 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white/20 hover:scale-105 hover:shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const h2Class = "font-space text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300 mb-4";
  const brightBorder = "absolute inset-0 rounded-2xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const buttonLink = "font-poppins relative z-10 max-w-44 font-semibold rounded px-2 sm:px-4 py-3 h-12 mt-0 sm:mt-4 shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
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
  if (error) return <p>Sorry Dave, there's an error: {error}</p>

  return (
    <>
      <ParticlesBg theme='snow' colour='cyan-400' />
      <div className={`relative z-20 p-4 sm:p-6 bg-search-combine bg-standard bg-fixed shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] rounded-lg `}>
        <div className="absolute inset-0 bg-zinc-700/50" />
        <h1 className="font-space relative z-10 text-3xl sm:text-5xl font-bold mt-5 mb-4 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
          Here you can update {''} <span className="text-5xl sm:text-7xl">{profile?.username}'s</span>{''} profile
        </h1>
        <form onSubmit={onSubmit}>
          {editted && (
            <div role='status' aria-live='polite' className='sr-only'>Submission successful. You have helped out a fellow human or earthling. Gold star ✴️✴️✴️✴️✴️</div>
          )}

          <section className={sectionClass}>
            <h2 className={h2Class}>Edit your name fields</h2>

              {/* Edit First Name */}
              <fieldset>
                <div className='mb-4'>
                  <label htmlFor="edit-first-name" className='roboto text-zinc-100 mb-2 sm:text-lg'>
                    Edit First Name
                    <input 
                      type="text" 
                        name="firstName"
                          value={formData.firstName || ""}
                            onChange={handleInputChange}
                              className='border border-sky-200 rounded-md p-1 sm:p-2 w-full text-base sm:text-lg text-gray-700'
                                placeholder='Enter your First Name'
                                  id="edit-first-name"
                                    required
                                      aria-label='Enter your first name please'
                    />
                  </label>
                </div>
              </fieldset>

              {/* Edit Last Name */}
              <fieldset>
                <div className='mb-4'>
                  <label htmlFor="edit-last-name" className='roboto text-zinc-100 mb-2 sm:text-lg'>
                    Edit Last Name / Surname
                    <input 
                      type="text" 
                        name="lastName"
                          value={formData.lastName || ""}
                            onChange={handleInputChange}
                              className='border border-sky-200 rounded-md p-1 sm:p-2 w-full text-base sm:text-lg text-gray-700'
                                placeholder='Enter your Last Name / Surname'
                                  id="edit-last-name"
                                    required
                                      aria-label='Enter your last name / surname please'
                    />
                  </label>
                </div>
              </fieldset>

            <div className={brightBorder}></div>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Edit {profile?.username} Superpowers</h2>
            {/* Edit Super Powers */}
            <fieldset>
              <div className='mb-4'>
                <label htmlFor="edit-superpowers" className='roboto text-zinc-100 mb-2 sm:text-lg'>
                  {/* Input Box */}
                  Add Superpowers, e.g. Picking Up Litter, AI, Housework, Flying...
                  <input 
                    type="text" 
                      name="superpowers"
                        value={currentPower}
                          onChange={(e) => setCurrentPower(e.target.value)}
                            onKeyDown={handleAddPower}
                              placeholder='Type a power and hit Enter...'
                                id="edit-superpowers"
                                  className='border border-sky-200 rounded-md p-1 sm:p-2 w-full text-base sm:text-lg text-zinc-700'
                  />
                </label>

                {/* The Visual Tags */}
                <div className="flex flex-wrap gap-2 my-4">
                  {formData.superpowers?.map((power) => (
                    <span
                      key={power}
                        className='flex items-center gap-1 px-4 py-[0.3rem] text-base sm:text-lg bg-gradient-to-r from-cyan-500 to-green-700 text-zinc-700 rounded-full font-semibold shadow-lg animate-in zoom-in'
                    >
                      ✨ {power}
                      <button
                        type='button'
                          onClick={() => removePower(power)}
                            className='ml-2 font-bold hover:text-red-400 transition-colors'
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </fieldset>
            <div className={brightBorder}></div>
          </section>

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
                  <span className="roboto text-xl font-semibold text-zinc-100 capitalize group-hover:text-yellow-300 transition-colors">
                  { t === 'light' ? '☀️' : '🌙'} {t} Theme
                  </span>
                </label>
              ))}
            </div>
            <div className={brightBorder}></div>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>Quick Actions</h2>
            <div className="mb-4">
              <nav className="flex justify-between items-center text-sm sm:text-lg">
                <button 
                  type="submit"
                    className={`${buttonLink} ${shimmerClass} bg-blue-500 max-w-40 text-white`}
                >
                  Save Changes
                </button>
                <Link 
                  to="/dashboard" 
                    className={`${buttonLink} ${shimmerClass} text-slate-700 bg-yellow-300 max-w-32`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/helpreg" 
                    className={`${buttonLink} ${shimmerClass} text-slate-700 bg-yellow-300 max-w-32`}
                >
                  Help A Car
                </Link>
              </nav>
            </div>
            <div className={brightBorder}></div>
          </section>
        </form>
      </div>
    </>
  );
};

export default DashboardForm;