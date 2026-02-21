import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import type { IReg } from '../../types/reg';
import { useRegStore } from '../../store/useRegStore';
import { useProfileStore } from '../../store/useProfileStore';
import Spinner from '../layout/Spinner';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import { getMyProfile } from '../../api/profile';
import ParticlesBg from '../layout/ParticlesBg';
import { useQueryClient } from '@tanstack/react-query';


const EditReg: FC = () => {
  const { regplate } = useParams<{ regplate: string }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { fetchRegByPlate, updateReg, selectedReg, loading } = useRegStore();
  const { setProfile } = useProfileStore();
  const queryClient = useQueryClient();

  const [editted, setEditted] = useState(false);
  const [formData, setFormData] = useState<Partial<IReg>>({
    regplate: "",
    brakelightcentre: false,
    brakelightleft: false,
    brakelightright: false,
    lightleft: false,
    lightright: false,
    reglight: false,
    indbrokenoneside: false,
    indbrokenbothsides: false,
    indonesideon: false,
    indbothsideson: false,
    exblacksmoke: false,
    exbluesmoke: false,
    exwhitesmoke: false,
    tyreflatleft: false,
    tyreflatright: false,
    driver: {
      superherodriver: false,
      gooddriver: false,
      roomforimprov: false,
    },
  });

  const shadowClass = "relative p-5 rounded-xl leading-8 shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.5)] transition-shadow duration-300 bg-zinc-100/10 dark:bg-zinc-900/20 backdrop-blur-sm";
  const brightBorderClass = "absolute inset-0 rounded-xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const paneTitleClass = "font-michroma text-xl font-semibold text-zinc-500/90 dark:text-zinc-200/90 mb-1";
  const labelClass = "font-inter tracking-wider ml-1 text-zinc-500/90 dark:text-zinc-200/90";
  const navClass = "flex items-center justify-center text-center font-poppins bg-sky-100 text-zinc-700/90 font-semibold px-4 py-3 mt-4 rounded shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

  // Fetch reg once
  useEffect(() => {
    if (!regplate) {
      return 
    } else {
      fetchRegByPlate(regplate);
    }
  }, [regplate, fetchRegByPlate]);
  // Populate form when store updates
  useEffect(() => {
    if (selectedReg) setFormData(selectedReg);
  }, [selectedReg]);

  const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name.startsWith("driver.")) {
        setFormData((prev) => ({
          ...prev,
          driver: {
            ...prev.driver,
            [name.split(".")[1]]: checked,
          }
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    }
  };

  const onSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    if (!regplate) return;

    try {
      const token = await getToken();
      await updateReg(regplate, formData, token);

      queryClient.invalidateQueries({ queryKey: ['reg', regplate] }); // <--- The "Pro" line
      queryClient.invalidateQueries({ queryKey: ['regs'] }); 

      // Refresh profile if logged in
      if (token) {
        const freshProfile = await getMyProfile(getToken);
        setProfile(freshProfile);
      }

      setEditted(true);
      toast.success(`Reg plate ${regplate} updated 🌟`);
      navigate(`/reg/${formData.regplate}`);
    } catch (err) {
      console.error("Failed to update registration:", err);
      toast.error(`Not updated`);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <ParticlesBg theme='nasa' colour='purple-500' />
      <section className='relative z-20 mx-2 sm:mx-0 -translate-y-10 sm:-translate-y-8'>
        <h1 className="font-space text-4xl sm:text-5xl font-bold mb-2 sm:mb-8 pb-2 lan">
          HelpMe-Edit the Reg... please
        </h1>
        
        <section className="rounded-lg m-5 mx-auto py-10 px-8 shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]">
          <h1 className="font-michroma text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
            Help your fellow human, update their car ...
          </h1>
          <form onSubmit={onSubmit} className='space-y-4'>
            {editted && (
              <div role='status' aria-live='polite' className='sr-only'>
                Submission successful. You have helped out a fellow human or earthling. Gold star ✴️✴️✴️✴️✴️
              </div>
            )}

            {/* Regplate */}
            <fieldset>
              <legend className='sr-only'>Leave the number plate alone unless you need to edit it</legend>
              <div>
                <label htmlFor='edit-reg-plate' className='text-sm text-zinc-500/90 dark:text-zinc-200/90 -translate-y-3'>
                  <input 
                    type="text" 
                      name="regplate"
                        value={formData.regplate || ""}
                          onChange={onChange}
                            className='border border-sky-200 rounded-md p-2 w-full text-lg text-gray-700'
                              placeholder='Enter Registration Number'
                                required
                                  id="edit-reg-plate"
                                    aria-label='Edit reg plate if necessary'
                  />
                    <div className='roboto ml-1'>Please enter registration number, public or private</div>
                  </label>
                </div>
            </fieldset>

            {/* Brake Lights Condition */}
            <fieldset>
              <legend className='sr-only'>Edit brake lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Brake Lights Condition</h3>
                <div>
                  <label htmlFor='edit-brake-light-centre' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightcentre"
                          checked={formData.brakelightcentre || false}
                            onChange={onChange}
                              id="edit-brake-light-centre"
                    />
                    {''} Central Brake Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-brake-light-left' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightleft"
                          checked={formData.brakelightleft || false}
                            onChange={onChange}
                              id='edit-brake-light-left'
                    />
                    {''} Left Brake Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-brake-light-right' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightright"
                          checked={formData.brakelightright || false}
                            onChange={onChange}
                              id='edit-brake-light-right'
                    />
                    {''} Right Brake Light Out {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            {/* Rear Car Lights Condition */}
            <fieldset>
              <legend className='sr-only'>Edit rear car lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Rear Car Lights Condition</h3>
                <div>
                  <label htmlFor='edit-left-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="lightleft"
                          checked={formData.lightleft || false}
                            onChange={onChange}
                              id='edit-left-light'
                    />
                    {''} Left Rear Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-right-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="lightright"
                          checked={formData.lightright || false}
                            onChange={onChange}
                              id='edit-right-light'
                    />
                    {''} Right Rear Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-reg-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="reglight"
                          checked={formData.reglight || false}
                            onChange={onChange}
                              id='edit-reg-light'
                    />
                    {''} Registration Number Plate Light Out {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`} />
              </div>
            </fieldset>

            {/* Indicator and Hazard / Warning Lights Condition */}
            <fieldset>
              <legend className="sr-only">Edit indicator and hazard or warning lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Indicator and Hazard / Warning Lights Condition</h3>
                <div>
                  <label htmlFor='edit-indicator-broken-on-one-side' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbrokenoneside"
                          checked={formData.indbrokenoneside || false}
                            onChange={onChange}
                              id='edit-indicator-broken-on-one-side'
                    />
                    {''} Indicator Broken / Flashing On One Side {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-indicator-broken-on-both-sides' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbrokenbothsides"
                          checked={formData.indbrokenbothsides || false}
                            onChange={onChange}
                              id='edit-indicator-broken-on-both-sides'
                    />
                    {''} Indicator Broken / Flashing On Both Sides {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-indicator-is-on-on-one-side' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indonesideon"
                          checked={formData.indonesideon || false}
                            onChange={onChange}
                              id='edit-indicator-is-on-on-one-side'
                    />
                    {''} Indicator Is On One Side {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-indicator-is-on-on-both-sides' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbothsideson"
                          checked={formData.indbothsideson || false}
                            onChange={onChange}
                              id='edit-indicator-is-on-on-both-sides'
                    />
                    {''} Indicator Is On Both Sides {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            {/* Exhaust Smoke Colour */}
            <fieldset>
              <legend className="sr-only">Edit exhaist smoke colour</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Exhaust Smoke Colour</h3>
                <div>
                  <label htmlFor='edit-exhaust-black-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exblacksmoke"
                          checked={formData.exblacksmoke || false}
                            onChange={onChange}
                              id='edit-exhaust-black-smoke'
                    />
                    {''} Black Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-exhaust-blue-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exbluesmoke"
                          checked={formData.exbluesmoke || false}
                            onChange={onChange}
                              id='edit-exhaust-blue-smoke'
                    />
                    {''} Blue Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-exhaust-white-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exwhitesmoke"
                          checked={formData.exwhitesmoke || false}
                            onChange={onChange}
                              id='edit-exhaust-white-smoke'
                    />
                    {''} White Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            {/* Car Rear Tyre Condition */}
            <fieldset>
              <legend className="sr-only">Edit car rear tyre condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Car's Rear Tyre Condition <small>(might only be slightly flat)</small></h3>
                <div>
                  <label htmlFor='edit-flat-tyre-left' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="tyreflatleft"
                          checked={formData.tyreflatleft || false}
                            onChange={onChange}
                              id='edit-flat-tyre-left'
                    />
                    {''} Left Tyre Is Flat / On It's Way {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-flat-tyre-right' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="tyreflatright"
                          checked={formData.tyreflatright || false}
                            onChange={onChange}
                              id='edit-flat-tyre-right'
                    />
                    {''} Right Tyre Is Flat / On It's Way {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            {/* Driver Info */}
            <fieldset>
              <legend className="sr-only">Edit driver information about how they are driving</legend>
              <div className={`${shadowClass}`}>
                <h2 className="text-xl font-semibold text-zinc-500/90 dark:text-zinc-200/90 mb-1">Driver Capability</h2>
                <div>
                  <label htmlFor='edit-superhero-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.superherodriver"
                          checked={formData.driver?.superherodriver || false}
                            onChange={onChange}
                              id='edit-superhero-driver-ability'
                    />
                    {''} Super Hero Driver - (Drives Impeccably People in Awe of Said Skill) {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-gooddriver-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.gooddriver"
                          checked={formData.driver?.gooddriver || false}
                            onChange={onChange}
                              id='edit-gooddriver-driver-ability'
                    />
                    {''} Good Driver - (Drives Safely and Courteously) {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='edit-roomforimprov-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.roomforimprov"
                          checked={formData.driver?.roomforimprov || false}
                            onChange={onChange}
                              id='edit-roomforimprov-driver-ability'
                    />
                    {''} Room For Improvement - (Not entirely Concentrating, Not 100% Safe Driver)  {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            <nav className='flex justify-between'>
              <button
                type='submit'
                  className={`dark:bg-sky-500/20 dark:text-sky-400 border dark:border-sky-500/50  ${navClass} ${shimmerClass}`}
              >
                Save Changes
              </button>
              <Link 
                to="/reg" 
                  className={`dark:bg-yellow-500/20 dark:text-yellow-400 border dark:border-yellow-500/50 ${navClass} ${shimmerClass}`}
              >
                Home
              </Link>
            </nav>
          </form>
        </section>
      </section>
    </>
  );
};

export default EditReg;