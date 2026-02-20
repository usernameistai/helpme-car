import { memo, type FC } from 'react';
import RegItem from './RegItem';
import Spinner from '../../layout/Spinner';
import type { IReg } from '../../../types/reg';

interface Props {
  regs: IReg[];
  isLoading:  boolean;
  isError: boolean;
}

const RegList: FC<Props> = memo(({ regs, isLoading, isError }) => {
  const animations = ['animate-spin', 'animate-bounce', 'animate-ping', 'animate-pulse'];
  const randomAnime = () => animations[Math.floor(Math.random() * animations.length)];

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error Loading Reg / Number plates</p>;
  return (
    <>
      <div className='z-50 flex flex-wrap items-center justify-center justify-items-center gap-1 sm:gap-4 w-full max-w-6xl mx-auto'>
        {!regs || regs.length === 0 
          ? (
            <p className='bg-slate-200 text-slate-700 font-semibold rounded shadow-lg px-4 py-2 text-center w-[100rem]'>No Registrations found in database 🔬</p>
          ) : (
            regs.map(( reg, index ) => (
              <div
                key={reg._id}
                  className={`shrink-0 transition z-20 
                  w-[31%] md:w-[23%] lg:w-[18%]
                  sm:mb-3 lg:mb-8 
                  animate-none hover:${randomAnime()}
                  ${index >= 3 ? 'hidden' : 'md:block'} ${index === 3 ? 'md:block' : ''} ${index >= 4 ? 'lg:block' : ''}
                  `}
                    style={{ transform: `rotate(${Math.random() * 8 - 4}deg) translateY(${Math.random() * 16 - 8}px)` }}
              >
                <RegItem reg={reg} />
              </div>
            ))
          )
        }
      </div>
    </>
  );
});

export default RegList

// import { useQuery } from '@tanstack/react-query';
// import { getAllRegs } from '../../../api/reg';
// const RegList: FC<Props> = ({ regs = [] }) => {

  // const { isLoading, isError } = useQuery<IReg[]>({
  //   queryKey: ['regs'],
  //   queryFn: getAllRegs,
  //   staleTime: 1000 * 60 * 5,
  // });

  //   useEffect(() => {
//     fetchRegs();
//   }, [fetchRegs]);
// }
