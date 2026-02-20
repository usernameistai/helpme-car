import { Link } from 'react-router-dom';
import type { IReg } from '../../../types/reg';
import { timeAgo } from '../../../utils/formatTime';

interface Props {
  reg: IReg;
};

const RegItem = ({ reg }: Props) => {

  return (
    <>
      <Link to={`/reg/${reg.regplate}`} >
        <div className="relative flex group p-1 md:p-2 my-2 rounded w-full max-w-[280px] mx-auto">
          <h3 
            className="font-poppins xs:text-sm sm:text-base md:text-2xl lg:text-3xl font-bold
             text-zinc-700 shadow-lg mx-2 rounded px-1 py-0.5 md:px-4 md:py-1
              bg-zinc-50 border-[2px] md:border-[3px] border-blue-800 
              tracking-wide transition-transform hover:scale-105 "
          >
            {reg.regplate}
          </h3>
          {/* The "Pulse" - Only visible or prominent on hover? */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] text-center text-[10px] text-zinc-700 dark:text-zinc-300 italic mt-1 pl-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {/* <div className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-full text-center text-[8px] md:text-[10px] text-zinc-300 italic opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"> */}
            Helped {timeAgo(reg.createdAt)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default RegItem;