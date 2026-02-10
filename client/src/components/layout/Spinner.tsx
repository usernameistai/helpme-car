import type { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useRegStore } from "../../store/useRegStore";

const Spinner: FC = () => {
  const { loading } = useRegStore();

  if (!loading) return null; // render nothing when not loding / below added inset-o
  return (
    <>
      <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"> 
        <div className="flex flex-col items-center p-6 rounded-2xl animate-in zoom-in duration-300">
          {/* The spinner itself spins indefinitely due to 'animate-spin' */}
          <ImSpinner2 className='animate-spin text-cyan-400 text-6xl shadow-cyan-500/20'/>
          <p className="mt-4 text-cyan-400 font-bold text-sm tracking-widest animate-pulse">
            AWESOME, CAN YOU READ THIS... ? JUST LOADING
          </p>
        </div>
      </div>
    </>
  );
};

export default Spinner;