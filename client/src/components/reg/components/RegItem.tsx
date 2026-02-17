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
        <div className="relative group p-2 my-2 rounded">
          <h3 
            className="font-poppins text-center text-base md:text-2xl lg:text-3xl font-bold text-zinc-700 shadow-lg mx-2 rounded px-1 py-0.5 md:px-2 md:py-1 bg-zinc-50 border-[3px] border-blue-800 tracking-wide hover:scale-105 opacity-100">
            {reg.regplate}
          </h3>
          {/* The "Pulse" - Only visible or prominent on hover? */}
          <div className="text-[10px] text-zinc-700 italic mt-1 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Helped {timeAgo(reg.createdAt)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default RegItem;