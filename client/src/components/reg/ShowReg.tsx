import { useState } from 'react';
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
    const shareData = {
      title: `HelpMe - All Clear!`,
      text: `Good news I checked the car ${selectedReg?.regplate} and it has a clean bill of health! 🚗✨`,
      url: window.location.href, // Shares current page linlk
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully");
      } else {
        // Fallback for Desktop/Incompatible browsers
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard! 📋");
      }
    } catch (err: any) {
      console.error("Error sharing", err);
    }
  }

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
      <ParticlesBg theme="bubble" colour='emerald-400'/>
      <section className='relative z-20 max-w-4xl mx-auto px-4'>
        <h1 className="font-michroma text-3xl md:text-5xl font-bold mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
          SCAN_RESULT: ALL_CLEAR
        </h1>
        
        <div className="relative flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl bg-zinc-300/50 dark:bg-zinc-900/50 border border-emerald-500/30 backdrop-blur-md shadow-[0_20px_50px_rgba(16,185,129,0.2)] overflow-hidden">
          {/* Diagnostic Background Detail */}
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-emerald-600 dark:text-emerald-300/80 text-right">
            SENSOR_ID: 0x77AF<br/>STATUS: NO_FAULTS_DETECTED
          </div>
  
          <h2 className="font-michroma text-xl md:text-2xl text-zinc-700 dark:text-zinc-100 mb-6 flex flex-wrap justify-center items-center gap-3">
            REG: <span className='px-4 py-1 bg-zinc-800 border border-emerald-400/50 text-emerald-400 rounded-lg shadow-[0_0_15px_rgba(52,211,153,0.3)] tracking-widest'>{regplate}</span>
          </h2>
  
          <div className="space-y-4 max-w-md text-center">
            <div className="inline-block px-4 py-1 rounded-full border-emerald-600/50 bg-emerald-400 text-emerald-600/80 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest border-2 animate-pulse">
              Safe to Proceed
            </div>
            <p className="text-zinc-700/90 dark:text-zinc-400 text-lg leading-relaxed font-inter">
              Our satellites have no record of active faults for this unit.
            </p>
            <p className="text-zinc-700/90 dark:text-zinc-500 text-xs italic">
              Note: Sensors only detect reported anomalies. Regular maintenance required.
            </p>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full sm:w-auto">
            <button 
              onClick={handleShare}
              className={`${buttonClass} ${shimmerClass} bg-emerald-500 text-zinc-900 min-w-[200px]`}
            >
              📢 Share Good News
            </button>
            
            <Link to='/reg' className={`${buttonClass} bg-zinc-800/50 text-zinc-300 border-2 border-white/30 hover:bg-zinc-700 min-w-[150px]`}>
              New Scan
            </Link>
          </div>
  
          {/* The "Mission Pulse" border */}
          <div className="absolute inset-0 rounded-2xl border border-emerald-400/20 pointer-events-none animate-pulse"></div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <ParticlesBg theme="default" colour='purple-500' />
      <section className="relative z-20 space-y-2 md:space-y-4 mx-2 sm:mx-0 -translate-y-10 sm:-translate-y-4">
        <h1 className="font-space text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 pb-2 lan">
          HelpMe-Advisories | Faults
        </h1>
        
        <div className="m-5 mx-auto py-6 md:py-10 px-8 space-y-5 text-zinc-500/90 dark:text-zinc-200/90 font-semibold rounded-lg shadow-[inset_1px_1px_15px_rgba(0,0,0,0.2)]">
          <h1 className='text-3xl md:text-4xl font-bold mb-2 text-transparent pb-4 bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-center'>
            Message for owner of
            <span
              className="text-center justify-center mx-2 md:mx-3 px-2 md:px-3 py-0.5 md:py-1 text-xl md:text-2xl w-48 font-bold text-zinc-700 shadow-lg rounded bg-zinc-50 border-2 border-blue-800 tracking-wide hover:shadow-[inset_0px_1px_10px_rgba(0,0,0,0.2)] transition ease-in-out">
              {selectedReg.regplate}
            </span>
          </h1>
          
          <section>
            <div className='mb-10'>
              <h1 className={`${h1Class}`}>The following faults may apply to your car: </h1>
              
              {ADVISORY_MAP.map(({ key, msg }) => (
                (selectedReg as any)?.[key] && (
                <AdvisoryBox key={key} message={msg} />
              )))}
            </div>
            <div>
              <h1 className={`${h1Class} mt-4`}>People said the following about your driving: </h1>
              {DRIVER_MAP.map(({ key, msg }) => (
                (selectedReg.driver as any)?.[key] && (
                <AdvisoryBox key={key} message={msg} />
              )))}
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