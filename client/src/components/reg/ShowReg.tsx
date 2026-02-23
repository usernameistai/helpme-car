import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRegStore } from '../../store/useRegStore';
import Spinner from '../layout/Spinner';
import Modal from '../layout/Modal';
import toast from 'react-hot-toast';
import ParticlesBg from '../layout/ParticlesBg';
import { useQueryClient } from '@tanstack/react-query';
import { useRegdetail } from '../../hooks/useRegs';

const ShowReg = () => {
  const { regplate } = useParams<{ regplate: string }>();
  const { data: selectedReg, isLoading, isError } = useRegdetail(regplate || '');
  const { deleteReg } = useRegStore();
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const h1Class = "text-xl md:text-2xl mb-2 md:mb-4 font-bold text-zinc-500/90 dark:text-zinc-200/90";
  const divClass = "relative group transition-all duration-300 rounded-xl mb-4 shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1";
  const titleClass = "font-inter tracking-wider font-bold shadow-lg px-5 py-4 rounded-xl mb-4";
  const brightBorderClass = "absolute inset-0 rounded-xl blur-xs border border-cyan-400/40 pointer-events-none animate-pulse-glow animate-pulse";
  const buttonClass = "flex text-center items-center justify-center font-poppins px-4 py-3 mt-4 text-small md:text-lg font-semibold rounded shadow-lg hover:shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)] hover:translate-y-[0.03rem] transition ease-in-out";
  const shimmerClass = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`;

  useEffect(() => {
    // If loading is done, and we have no data, and there isn't a hard network error... 
    if (!isLoading && !selectedReg && !isError) {
      setNotFound(true);
    } else if (selectedReg) {
      setNotFound(false);
    }
  }, [selectedReg, isLoading, isError]);

  const handleDeleteClick = () => setModalOpen(true);
  const handleDelete = async () => {
    if (!selectedReg?.regplate) return;
    setNotFound(false); // added this
    try {
      await deleteReg(selectedReg.regplate.trim().toUpperCase());
      // PRO MOVE: Clear the cache so the deleted car doesn't "ghost".
      queryClient.invalidateQueries({ queryKey: ['reg', regplate] });

      toast.success(`Vehicle ${selectedReg.regplate} cleared! Safe travels and thanks for fixing it! 🚗✨. (Try Halfords or a local dealer)`)
      navigate('/reg');
    } catch (err: any) {
      toast.error(err.message || `Failed to delete reg`);
    }
  };
  const handleCancelDelete = () => setModalOpen(false);

  const handleShare = async () => {
    // Generate a mock "Access Token" based on the plate + current minute
    const accessCode = btoa(`${selectedReg?.regplate}-${Math.floor(Date.now() / 60000)}`).substring(0, 8).toUpperCase();
    const shareData = {
      title: `HMC_INTEL_REPORT: ${regplate}`,
      text: `📡 MISSION_STATUS: ALL_CLEAR\n🔑 ACCESS_CODE: [${accessCode}]\n🎯 TARGET: ${regplate}\n\nIntel provided by HelpMe Satellite Uplink.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully");
      } else {
        // Fallback for Desktop/Incompatible browsers
        await navigator.clipboard.writeText(`${shareData.text} \nLink: ${shareData.url}`);
        toast.success("Access code & Link copied to clipboard! 📋");
      }
    } catch (err: any) {
      console.error("Error sharing", err);
    }
  };

  interface AdvisoryBoxProps {
    key: string;
    message: string;
  }
  const AdvisoryBox = ({ message }: AdvisoryBoxProps) => (
    <>
      <div className="animate-materialize">
        <div className={`${divClass} mb-5`}>
          <div className={`${titleClass} flex justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]" />
              <p>{message}</p>
            </div>
            <div className="flex flex-col space-y-[3px] opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
              <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
              <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
              <div className="flex space-x-[3px]"><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div><div className="h-[2px] w-4 bg-zinc-700/80 dark:bg-white/40"></div></div>
              <div className="h-[2px] w-[35px] animate-pulse bg-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"></div>
              <div className="h-[2px] w-[35px] animate-pulse bg-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"></div>
              <div className="h-[2px] w-[35px] animate-pulse bg-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]"></div>
            </div>
          </div>
          <div className={`${brightBorderClass}`} />
        </div>
      </div>
    </>
  );
  const ADVISORY_MAP = [
    { key: 'brakelightcentre', msg: 'Your centre brake light is out' },
    { key: 'brakelightleft', msg: 'Your left brake light is out' },
    { key: 'brakelightright', msg: 'Your right brake light is out' },
    { key: 'lightleft', msg: 'Your left rear light is out' },
    { key: 'lightright', msg: 'Your right rear light is out' },
    { key: 'reglight', msg: 'Your number plate light is out' },
    { key: 'indbrokenoneside', msg: 'Your indicator is broken / flashing on one side' },
    { key: 'indbrokenbothsides', msg: 'Your indicator is broken / flashing on both sides' },
    { key: 'indonesideon', msg: 'Your indicator is on continuously on one side' },
    { key: 'indbothsideson', msg: 'Both indicators are on continuously on both sides' },
    { key: 'exblacksmoke', msg: 'Black smoke is coming from your exhaust' },
    { key: 'exbluesmoke', msg: 'Blue smoke is coming from your exhaust' },
    { key: 'exwhitesmoke', msg: 'White smoke is coming from your exhaust' },
    { key: 'tyreflatleft', msg: "Left tyre is flat / on it's way to being flat" },
    { key: 'tyreflatright', msg: "Right tyre is flat / on it's way to being flat" },
  ];
  const DRIVER_MAP = [
    { key: 'superherodriver', msg: 'Super Hero Driver - (Drives Impeccably People in Awe of Said Skill)' },
    { key: 'gooddriver', msg: 'Good Driver - (Drives Safely and Courteously)' },
    { key: 'roomforimprov', msg: 'Room For Improvement - (Not entirely Concentrating, Not 100% Safe Driver)' },
  ];

  if (isLoading) return <Spinner />;
  if (isError || notFound) return (
    <>
      <ParticlesBg 
        theme="bubble" 
        colour='emerald-400' 
        className='opacity-50 dark:opacity-100 contrast-150 saturate-150 dark:contrast-100'
      />
      <div className="scanline fixed inset-0 z-30" />
      <section className='relative z-20 max-w-4xl mx-auto px-4 py-10 space-y-6'>
        <h1 className="font-michroma text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
          SCAN_RESULT: ALL_CLEAR
        </h1>
  
        {/* INTERCEPT DATA PACKET */}
        <div className="relative p-6 border-l-4 border-emerald-500 bg-zinc-900/40 backdrop-blur-md rounded-r-xl">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
          <h2 className="font-michroma text-emerald-400 text-[8px] md:text-base tracking-tighter animate-pulse">
            &gt; DECODING_PAYLOAD_FROM_T'AI_SATELLITE_BASE_HUB...
          </h2>
          <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] inline-block">
            [CHECKSUM: OK] [ENCRYPTION: AES-256] [UPLINK: ACTIVE]
          </div>
        </div>
  
        {/* MAIN DIAGNOSTIC CARD */}
        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl bg-zinc-300/50 dark:bg-zinc-900/60 border border-emerald-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(16,185,129,0.2)] overflow-hidden">
          
          {/* SENSOR METADATA CORNERS */}
          <div className="absolute top-4 left-4 font-mono text-[9px] uppercase opacity-60 text-emerald-600 dark:text-emerald-400">
            LAT: 55.8642° N <br />
            LONG: 4.2518° W <br />
            SIGNAL: |||||||..
          </div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-emerald-600 dark:text-emerald-400 text-right opacity-60">
            SENSOR_ID: 0x77AF<br/>
            STREAMS: STABLE
          </div>
  
          {/* REG PLATE DISPLAY */}
          <h2 className="font-michroma text-xl md:text-2xl text-zinc-700 mt-12 md:mt-4 dark:text-zinc-100 mb-6 flex flex-wrap justify-center items-center gap-3">
            REG_: <span className='px-4 py-1 bg-zinc-800 border border-emerald-400/50 text-emerald-400 rounded-lg shadow-[0_0_15px_rgba(52,211,153,0.3)] tracking-widest'>{regplate}</span>
          </h2>
  
          {/* STATUS MESSAGE */}
          <div className="space-y-4 max-w-md text-center">
            <div className="inline-block px-4 py-1 rounded-full border-emerald-600/50 bg-emerald-400 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest border-2 animate-pulse">
              Safe to Proceed
            </div>
            <p className="text-zinc-700/90 dark:text-zinc-300 text-lg leading-relaxed font-inter">
              No active faults detected in the current grid sector.
            </p>
            <p className="text-zinc-700/90 dark:text-zinc-500 text-xs italic">
              // Note: Sensors only detect reported anomalies. <a href='https://www.halfords.com/' target="_blank" rel="noopener noreferrer" className="text-emerald-400/80">Regular maintenance required. </a>//
           </p>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-1 md:gap-4 justify-center mt-4 md:mt-10 w-full sm:w-auto">
            <button onClick={handleShare} className={`${buttonClass} ${shimmerClass} bg-emerald-500 text-zinc-900 min-w-[200px]`}>
              📢 Share Intel
            </button>
            <Link to='/reg' className={`${buttonClass} bg-zinc-800/50 text-zinc-300 border-2 border-white/30 hover:bg-zinc-700 min-w-[150px]`}>
              New Scan
            </Link>
          </div>
          <div className="absolute inset-0 rounded-2xl border border-emerald-400/20 pointer-events-none animate-pulse"></div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <ParticlesBg theme="default" colour='purple-500' />
      <div className="scanline fixed inset-0 z-30" />
      <section className="relative z-20 max-w-6xl mx-auto space-y-2 md:space-y-4">
        <h1 className="font-space text-4xl md:text-5xl lg:text-7xl font-bold ml-2 pb-4 lan">
          HelpMe-Advisories | Faults
        </h1>
        
        <div className="m-5 mx-auto py-5 px-8 space-y-5 font-semibold rounded-lg shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]">
          <h2 
            style={{ filter: 'drop-shadow(-10px 0 15px rgba(34,211,238,0.4)) drop-shadow(10px 0 15px rgba(250,204,21,0.4))' }}
              className="relative text-center drop-shadow-cyan-400 w-full mb-4 text-zinc-500/90 dark:text-zinc-100 text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            Message for owner of 
            <span
              className="text-center justify-center mx-2 md:mx-3 px-2 md:px-3 py-0.5 md:py-1 text-xl md:text-2xl w-48 font-bold text-zinc-700 shadow-lg rounded bg-zinc-50 border-2 border-blue-800 tracking-wide hover:shadow-[inset_0px_1px_10px_rgba(0,0,0,0.2)] transition ease-in-out">
              {selectedReg.regplate}
            </span>
          </h2>
          
          <section className='text-zinc-500/90 dark:text-zinc-200/90'>
            <div className='mb-10'>
              <h1 className={`${h1Class}`}>The following faults may apply to your car: </h1>
              
              {ADVISORY_MAP.map(({ key, msg }) => (
                (selectedReg as any)?.[key] && (
                <AdvisoryBox key={key} message={msg} />
              )))}
              <div className="flex flex-col items-end">
                <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                  STATUS: OPERATIONAL // OPT_LOAD: f1(1) // CAR_FAULTS: ...
                </span>
                <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
              </div>
            </div>
            <div>
              <h1 className={`${h1Class} mt-4`}>People said the following about your driving: </h1>
              {DRIVER_MAP.map(({ key, msg }) => (
                (selectedReg.driver as any)?.[key] && (
                <AdvisoryBox key={key} message={msg} />
              )))}
              <div className="flex flex-col items-end">
                <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                  STATUS: OPERATIONAL // OPT_LOAD: f1(1) // DRIVER_FAULTS: ...
                </span>
                <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
              </div>
            </div>
          </section>

        </div>

        <nav className="flex gap-4 mt-4 justify-between">
          <Link 
            to={`/reg/${selectedReg.regplate}/edit`} 
              className={`pt-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 ${buttonClass} ${shimmerClass}`}
          >
            Edit Reg
          </Link>

          <div className="">
            <button
              onClick={handleDeleteClick}
                className={`bg-red-500/20 text-red-400 border border-red-500/50 ${buttonClass} ${shimmerClass}`}
            >
              Delete Reg
            </button>
          </div>
          {/* Modal */}
          <Modal 
            isOpen={modalOpen}
              title='Delete Reg'
                message={`Are you sure you want to delete ${selectedReg?.regplate}?`}
                  onConfirm={handleDelete}
                    onCancel={handleCancelDelete}
          />
          <Link 
            to="/reg" 
              className={`pt-3 bg-sky-500/20 text-sky-400 border border-sky-500/50 ${buttonClass} ${shimmerClass}`}
                  onClick={() => toast.success(`Not your car?`)}
          >
            Home
          </Link>
        </nav>
      </section>
    </>
  );
};

export default ShowReg;