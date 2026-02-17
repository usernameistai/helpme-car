import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { IReg } from '../../types/reg';
import { useRegStore } from '../../store/useRegStore';
import Spinner from '../layout/Spinner';
import toast from 'react-hot-toast';
import { getMyProfile } from '../../api/profile';
import { useAuth } from '@clerk/clerk-react';
import { useProfileStore } from '../../store/useProfileStore';
import ParticlesBg from '../layout/ParticlesBg';

const RegForm: React.FC = () => {
  const navigate = useNavigate();
  const { createReg, loading } = useRegStore();
  const { getToken } = useAuth();
  const { setProfile } = useProfileStore();
  const [submitted, setSubmitted] = useState(false);
  
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

  const shadowClass = "relative p-5 rounded-xl leading-8 shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.5)] transition-shadow duration-300 bg-white/5 backdrop-blur-sm";
  const brightBorderClass = "absolute inset-0 rounded-xl border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const paneTitleClass = "font-michroma tracking-wider text-xl font-semibold text-zinc-500/90 dark:text-zinc-200/90 mb-2";
  const labelClass = "font-inter tracking-wider m-1 text-zinc-500/90 dark:text-zinc-200/90";
  const navClass = "font-poppins font-semibold px-4 py-3 mt-4 rounded shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition duration-200 ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;
  
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
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase().replace(/[\s-]/g, "") }));
    }
  };

  const onSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();

    // Front-End Validation
    const plate = formData.regplate?.trim().toUpperCase() || "";
    
    const regRegex = /^[A-Z0-9]{1,7}$/;
    if (!regRegex.test(plate)) {
      toast.error("Number plate must be 1-7 alphanumeric characters");
      return;
    }
    
    try {
      // Fetch token BEFORE API call
      const token = await getToken(); // Added to avoid bug
      console.log("Frontend Token Check:", token ? "Token acquired" : "Token NULL");
      // Call store to create the registration
      const newReg = await createReg(formData, token);

      if (newReg?.regplate) {
        // ADDED LOGIC START
        // Refresh the profile so the stars increment o the Dashboard
        if (token) {
          const freshProfile = await getMyProfile(getToken);
          setProfile(freshProfile);
        }

        setSubmitted(true); // logic added for visually impaired / disabled people
        navigate(`/reg/${newReg.regplate}`);
        toast.success(`Than you for helping ${newReg.regplate} ⭐`);
      }
    } catch (err: any) {
      // Check if the error is our 409 conflict
      if (err.response?.status === 409) {
        const { regplate } = err.response.data;

        alert("This vehicle is already registered. Redirecting to our edit page...");
        navigate(`/reg/${regplate}/edit`);
      } else {
        console.error("failed to create registration:", err);
        alert(err.response?.data?.message || "Failed to create registration.Check console.");
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <ParticlesBg theme='nasa' colour='purple-500' />
      <section className='relative z-20 mx-2 sm:mx-0'>
        <h1 className="font-space text-4xl sm:text-5xl font-bold ml-10 mt-[3rem] pb-4 w-[30rem] lan -translate-y-10 sm:-translate-y-8 mb-4">
          HelpMe-Out
        </h1>
        <section className="rounded-lg m-5 mx-auto py-5 sm:py-10 px-8 shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] -translate-y-10">
          <h2 className="font-michroma text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
            Help out fellow humans by adding their car number plate...
          </h2>
          <form onSubmit={onSubmit} className='space-y-5 '>
            {submitted && (
              <div role='status' aria-live='polite' className='sr-only'>
                Submission successful. You have helped out a fellow human or earthling. Gold star ✴️✴️✴️✴️✴️
              </div>
            )}

            {/* Regplate */}
            <fieldset>
              <legend className="sr-only">Enter the number plate in question, PS shift and tab button go back up through forms</legend>
              <div>
                <label htmlFor='reg-plate' className='text-sm -translate-y-3'>
                  <input 
                    type="text" 
                      name="regplate"
                        value={formData.regplate || ""}
                          onChange={onChange}
                            className='border border-sky-200 rounded-md p-2 w-full text-lg font-semibold text-gray-900 shadow-[inset_0px_1px_10px_rgba(0,0,0,0.2)]'
                              placeholder='Enter Registration Number'
                                required
                                  id="reg-plate"
                                    aria-label="Please enter the reg plate of the car you want to help"
                  />
                  <div className='ml-1 text-zinc-500/90 dark:text-zinc-200/90'>Please enter registration number, public or private</div></label>
              </div>
            </fieldset>

            {/* Brake Lights Condition */}
            <fieldset>
              <legend className='sr-only'>Brake lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Brake Lights Condition</h3>
                <div>
                  <label htmlFor='brake-light-centre' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightcentre"
                          checked={formData.brakelightcentre || false}
                            onChange={onChange}
                              id="brake-light-centre"
                    />
                    {''} Central Brake Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='brake-light-left' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightleft"
                          checked={formData.brakelightleft || false}
                            onChange={onChange}
                              id="brake-light-left"
                    />
                    {''} Left Brake Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='brake-light-right' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="brakelightright"
                          checked={formData.brakelightright || false}
                            onChange={onChange}
                              id="brake-light-right"
                    />
                    {''} Right Brake Light Out {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`} />
              </div>
            </fieldset>
          
            {/* Rear Car Lights Condition */}
            <fieldset>
              <legend className='sr-only'>Rear car lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Rear Car Lights Condition</h3>
                <div>
                  <label htmlFor='left-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="lightleft"
                          checked={formData.lightleft || false}
                            onChange={onChange}
                              id="left-light"
                    />
                    {''} Left Rear Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='right-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="lightright"
                          checked={formData.lightright || false}
                            onChange={onChange}
                              id="right-light"
                    />
                    {''} Right Rear Light Out {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='reg-light' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="reglight"
                          checked={formData.reglight || false}
                            onChange={onChange}
                              id="reg-light"
                    />
                    {''} Registration Number Plate Light Out {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`} />
              </div>
            </fieldset>

            {/* Indicator and Hazard / Warning Lights Condition */}
            <fieldset>
              <legend className="sr-only">Indicator and hazard or warning lights condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Indicator / Hazard Warning Lights Condition</h3>
                <div>
                  <label htmlFor='indicator-broken-on-one-side' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbrokenoneside"
                          checked={formData.indbrokenoneside || false}
                            onChange={onChange}
                              id='indicator-broken-on-one-side'
                    />
                    {''} Indicator Broken / Flashing On One Side {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='indicator-broken-on-both-sides' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbrokenbothsides"
                          checked={formData.indbrokenbothsides || false}
                            onChange={onChange}
                              id="indicator-broken-on-both-sides"
                    />
                    {''} Indicator Broken / Flashing On Both Sides {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='indicator-is-on-on-one-side' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indonesideon"
                          checked={formData.indonesideon || false}
                            onChange={onChange}
                              id='indicator-is-on-on-one-side'
                    />
                    {''} Indicator Is On One Side {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='indicator-is-on-on-both-sides' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="indbothsideson"
                          checked={formData.indbothsideson || false}
                            onChange={onChange}
                              id='indicator-is-on-on-both-sides'
                    />
                    {''} Indicator Is On Both Sides {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}/>
              </div>
            </fieldset>

            {/* Exhaust Smoke Colour */}
            <fieldset>
              <legend className="sr-only">Exhaust smoke colour</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Exhaust Smoke Colour</h3>
                <div>
                  <label htmlFor='exhaust-black-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exblacksmoke"
                          checked={formData.exblacksmoke || false}
                            onChange={onChange}
                              id='exhaust-black-smoke'
                    />
                    {''} Black Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='exhaust-blue-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exbluesmoke"
                          checked={formData.exbluesmoke || false}
                            onChange={onChange}
                              id='exhaust-blue-smoke'
                    />
                    {''} Blue Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='exhaust-white-smoke' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="exwhitesmoke"
                          checked={formData.exwhitesmoke || false}
                            onChange={onChange}
                              id='exhaust-white-smoke'
                    />
                    {''} White Smoke Coming From Exhaust {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}></div>
              </div>
            </fieldset>

            {/* Car Rear Tyre Condition */}
            <fieldset>
              <legend className="sr-only">Car rear tyre condition</legend>
              <div className={`${shadowClass}`}>
                <h3 className={`${paneTitleClass}`}>Car's Rear Tyre Condition</h3>
                <div>
                  <label htmlFor='flat-tyre-left' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="tyreflatleft"
                          checked={formData.tyreflatleft || false}
                            onChange={onChange}
                              id='flat-tyre-left'
                    />
                    {''} Left Tyre Is Flat / On It's Way {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='flat-tyre-right' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="tyreflatright"
                          checked={formData.tyreflatright || false}
                            onChange={onChange}
                              id='flat-tyre-right'
                    />
                    {''} Right Tyre Is Flat / On It's Way {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}></div>
              </div>
            </fieldset>

            {/* Driver Info */}
            <fieldset>
              <legend className="sr-only">Driver information about how they are driving</legend>
              <div className={`${shadowClass}`}>
                <h2 className={`${paneTitleClass}`}>Driver Capability</h2>
                <div>
                  <label htmlFor='superhero-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.superherodriver"
                          checked={formData.driver?.superherodriver || false}
                            onChange={onChange}
                              id='superhero-driver-ability'
                    />
                    {''} Super Hero Driver - (Drives Impeccably People in Awe of Said Skill) {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='good-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.gooddriver"
                          checked={formData.driver?.gooddriver || false}
                            onChange={onChange}
                              id='good-driver-ability'
                    />
                    {''} Good Driver - (Drives Safely and Courteously) {''}
                  </label>
                </div>
                <div>
                  <label htmlFor='room-for-improvement-driver-ability' className={`${labelClass}`}>
                    <input 
                      type="checkbox" 
                        name="driver.roomforimprov"
                          checked={formData.driver?.roomforimprov || false}
                            onChange={onChange}
                              id='room-for-improvement-driver-ability'
                    />
                    {''} Room For Improvement - (Not entirely Concentrating, Not 100% Safe Driver)  {''}
                  </label>
                </div>
                <div className={`${brightBorderClass}`}></div>
              </div>
            </fieldset>

            <nav className='flex justify-between'>
              <button 
                type="submit"
                  disabled={loading}
                    className={`${loading ? 'bg-gray-400' : 'bg-green-500'} text-white ${navClass} ${shimmerClass}`}
                      aria-label='Add a car entry which has faults button, after filling in the checkbox form'
              >
                {loading ? 'Adding...' : 'Add Registration'}
              </button>
              <Link 
                to="/reg" 
                  className={`text-slate-700 bg-yellow-300 ${navClass} ${shimmerClass}`}
                    aria-label='Go back to the home page button'
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

export default RegForm;