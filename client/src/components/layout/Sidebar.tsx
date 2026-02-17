import { useState, type FC } from 'react'
import { FaHandsHelping } from 'react-icons/fa';
import { FaHelmetSafety, FaRankingStar } from 'react-icons/fa6';
import { GiRuleBook } from 'react-icons/gi';
import { IoClose, IoHome, IoMenu } from 'react-icons/io5';
import { LuSearchCode } from 'react-icons/lu';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const Sidebar: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const linkClass = "font-michroma block p-4 text-zinc-100 hover:bg-cyan-400/20 hover:text-cyan-400 transition-all border-l-4 border-transparent hover:border-cyan-400";

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if ( newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1f2937';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f1f5f91a';
    }
  };

  return (
    <>
      {/* 1. Hamburger Button */}
      <label 
        htmlFor="sidebar-toggle" 
          className="fixed group top-10 sm:top-[0.6rem] left-0 sm:left-[0.5rem] z-[105] p-2 bg-gray-600 dark:bg-gray-800/50 hover:bg-gray-700 backdrop-blur-md rounded-lg border-cyan-400/80 hover:border-b-2 hover:border-cyan-400 text-cyan-400 cursor-pointer lg:hidden transition-transform shadow-lg"
      >
        <IoMenu className='text-xs sm:text-2xl'/>
        <span aria-hidden="true" className={`absolute top-12 left-12 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top border border-cyan-400/70 bg-slate-900/90 backdrop-blur-md text-cyan-300 text-xs py-1 px-2 rounded shadow-xl pointer-events-none lg:hidden z-50 text-center w-24`}>Sidebar Menu</span>
      </label>
      {/* 2. The Peer / Hidden Checkbox */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      {/* 3. Dark Overlay */}
      <label 
        htmlFor="sidebar-toggle" 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] hidden peer-checked:block transition-all"
      />

      {/* 4. Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-72 z-[120] -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out bg-slate-900/90 backdrop-blur-xl border-r border-cyan-400/30 shadow-2xl">
        {/* Close Button Inside Sidebar */}
        <div className="flex justify-end p-4">
          <label htmlFor="sidebar-toggle" className="p-2 fixed top-2 left-2 text-cyan-400 cursor-pointer hover:rotate-90 transition-transform">
            <IoClose size={40} />
          </label>
        </div>

        <nav className="mt-4 flex flex-col">
          <h2 className="font-michroma px-5 text-sm font-bold text-zinc-500 uppercase tracking-widest my-4">Navigation</h2>
          <NavLink to="/reg" className={`${linkClass} flex justify-between`}>
            <div>Home</div>
            <div><IoHome /></div>
          </NavLink>
          <NavLink to="/helpreg" className={`${linkClass} flex justify-between`}>
            <div>Help A Car</div>
            <div><FaHandsHelping /></div>
          </NavLink>
          <NavLink to="/search" className={`${linkClass} flex justify-between`}>
            <div>Search By Number Plate</div>
            <div><LuSearchCode /></div>
          </NavLink>
          <NavLink to="/dashboard" className={`${linkClass} flex justify-between`}>
            <div>Dashboard</div>
            <div><TbLayoutDashboardFilled /></div>
          </NavLink>
          <NavLink to="/leaderboard" className={`${linkClass} flex justify-between`}>
            <div>Leaderboard</div>
            <div><FaRankingStar /></div>
          </NavLink>
          <NavLink to="/regrules" className={`${linkClass} flex justify-between`}>
            <div>The Rules</div>
            <div><GiRuleBook /></div>
          </NavLink>
          <NavLink to="/reghelp" className={`${linkClass} flex justify-between`}>
            <div>Being Helpful</div>
            <div><FaHandsHelping /></div>
          </NavLink>
          <NavLink to="/regsafety" className={`${linkClass} flex justify-between`}>
            <div>Importance of Safety</div>
            <div><FaHelmetSafety /></div>
          </NavLink>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} aria-label="Toggle theme" className={`${linkClass}`}>
            {theme === 'light' ? (
              <div className="flex items-center justify-between gap-x-2"><span className="flex font-bold">Dark Mode</span><span>🌙</span></div>
            ) : (
              <div className="flex items-center justify-between gap-x-2"><span className="flex font-bold">Light Mode</span><span>☀️</span></div>
            )}
          </button>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar