import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCarRear, FaHands, FaHelmetSafety, FaRankingStar } from "react-icons/fa6";
import { LuSearchCode } from "react-icons/lu";
import { FcRules } from "react-icons/fc";
import { GiRuleBook } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BsMenuUp } from "react-icons/bs";
import { PiSignInDuotone } from "react-icons/pi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const menuRef = useRef<HTMLDivElement>(null);

  const navItemBase = "group relative flex items-center gap-x-1 sm:gap-x-2 p-1 sm:p-2 rounded-xl transition-all duration-300 border-b-2 border-transparent hover:border-cyan-400 hover:bg-white/10 hover:text-cyan-400";
  const navItemsOneTwo = "absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top border border-cyan-400/70 bg-slate-900/90 backdrop-blur-md text-cyan-300 text-xs py-1 px-2 rounded shadow-xl pointer-events-none lg:hidden z-50 text-center";
  const activeClass = "bg-cyan-400/20 text-cyan-400 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]";
  const menuClass = "flex justify-between px-4 py-2 border-b border-zinc-200 hover:bg-gray-100 text-center";

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Focus first menu item on open
  useEffect(() => {
    if (open) {
      const firstItem = document.querySelector('#hmc-menu [role="menuitem"]') as HTMLElement;
      firstItem?.focus();
    }
  }, [open]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if ( newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLUListElement>) => {
    const items = Array.from(document.querySelectorAll('#hmc-menu [role="menuitem"]')) as HTMLElement[];
    if (!items.length) return;
    
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    console.log(currentIndex);

    if (e.key === 'Escape') {
      setOpen(false);
      (document.querySelector('button[aria-controls="hmc-menu"]') as HTMLElement)?.focus();
    };
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus(); 
    }
  };

  return (
    <>
      <nav className="sticky top-0 backdrop-blur-md bg-gray-600 dark:bg-gray-800 text-white shadow-lg border-b-2 border-teal-500 dark:border-teal-900 z-[100] transition-colors duration-500">
        <section className="container mx-auto flex items-center justify-between px-4 py-1">
          {/* Logo */}
          <Link to="/" className={`${navItemBase} group text-xl md:text-2xl lg:text-3xl hover:text-cyan-400 transition-colors font-semibold`}>
            <FaHands aria-hidden="true"/><FaCarRear aria-hidden="true"/>
            <span className="hidden md:block">HelpMe - Car</span>
            <span aria-hidden="true" className={navItemsOneTwo}>Landing Page</span>
          </Link>

          {/* Nav Links */}
          <section className="flex items-center gap-x-2 text-sm md:text-base font-bold">
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme" className={`${navItemBase} group`}>
              {theme === 'light' ? (
                <div className="flex items-center gap-x-2"><span>🌙</span> <span className="hidden lg:flex font-bold">| Dark</span></div>
              ) : (
                <div className="flex items-center gap-x-2"><span>☀️</span><span className="hidden lg:flex font-bold">| Light</span></div>
              )}
              <span aria-hidden="true" className={`${navItemsOneTwo} w-20 space-x-2`}><span> ☀️ </span><span>|</span> <span>🌙 </span> </span>
            </button>

            {[
              { to: "/reg", icon: <IoHome />, label: "Home", aria: "Main home page", tooltip: "Home" },
              { to: "/helpreg", icon: <FaHandsHelping />, label: "HelpMyCar", aria: "Help someone's car page", tooltip: "HelpMyCar" },
              { to: "/search", icon: <LuSearchCode />, label: "Search", aria: "The search page", tooltip: "Search" },
              { to: "/dashboard", icon: <TbLayoutDashboardFilled />, label: "Dashboard", aria: "View the dashboard", tooltip: "Dashboard" },
              { to: "/leaderboard", icon: <FaRankingStar />, label: "Leaderboard", aria: "View community leaderboard and top-contributors", tooltip: "Leaderboard" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className={({ isActive }) => `${navItemBase} ${isActive ? activeClass : ""}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden lg:block">{item.label}</span>
                <span aria-hidden="true" className={`${navItemsOneTwo} w-24`}>{item.tooltip}</span>
              </NavLink>
            ))}

            <section aria-label="Sign in or out" className={`${navItemBase} group`}>
              
              {/* <div className="hidden lg:block font-bold"> */}
                <SignedOut>
                  <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                    <button className="flex items-center gap-x-2">
                      <PiSignInDuotone aria-hidden="true" className="my-auto" size={22}/>
                      <span className="hidden lg:block font-bold">Sign In</span>
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <SignOutButton redirectUrl="/">
                    <button className="flex items-center gap-x-2">
                      <PiSignInDuotone aria-hidden="true" className="my-auto" size={22} />
                      <span className="hidden lg:block font-bold">Sign Out</span>
                    </button>
                  </SignOutButton>
                </SignedIn>
              {/* </div> */}
              <span aria-hidden="true" className={`${navItemsOneTwo} w-24 text-center`}>Sign In / Out</span>
            </section>

            {/* HMC Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(o => !o)}
                  onKeyDown={handleKeyDown}
                    aria-label="Open HelpMe-Car Menu"
                      aria-haspopup="true"
                        aria-expanded={open}
                          aria-controls="hmc-menu"
                            className={`${navItemBase} ${open ? 'text-cyan-400 border-cyan-400' : ''}`}
              > 
                <div className="flex justify-between gap-2">
                  <BsMenuUp aria-hidden="true" className="text-xl sm:text-2xl font-bold"/>
                  <span className="hidden lg:block font-semibold transition-all duration-300">Menu</span>
                  <span aria-hidden="true" className={`${navItemsOneTwo} w-24 text-center`}>Menu</span>
                </div>
                {open && (
                  <ul 
                    id="hmc-menu"
                      role="menu"
                        onKeyDown={handleKeyDown}
                          aria-label="HelpMe-Car Menu"
                            aria-orientation="vertical"
                              className="absolute right-4 sm:right-[-3.5rem] lg:right-[-1.5rem] mt-2 top-12 landscape:top-0 mx-2 w-48 rounded-md border bg-white shadow-lg z-50 text-zinc-500"
                  >
                    {
                      [
                        { to: "/reg", label: "HMC Home", icon: <IoHome className="my-auto text-cyan-500"/>},
                        { to: "/helpreg", label: "Help A Car", icon: <FaHands className="my-auto text-cyan-500"/>,  icon2: <FaCarRear className="my-auto text-cyan-500"/>},
                        { to: "/search", label: "Search", icon: <LuSearchCode className="my-auto text-cyan-500" size={20}/>},
                        { to: "/dashboard", label: "Dashboard", icon: <TbLayoutDashboardFilled className="my-auto text-cyan-500"/>},
                        { to: "/leaderboard", label: "Leaderboard", icon: <FaRankingStar className="my-auto text-cyan-500"/>},
                        { to: "/regrules", label: "HMC Rules", icon: <FcRules className="my-auto text-cyan-500"/>, icon2: <GiRuleBook className="my-auto text-cyan-500"/>},
                        { to: "/reghelp", label: "HMC Help", icon: <FaHandsHelping className="my-auto text-cyan-500"/>},
                        { to: "/regsafety", label: "HMC Safety", icon: <FaHelmetSafety className="my-auto text-cyan-500"/>},
                        { to: "/signin", label: "HMC Sign In", icon: <PiSignInDuotone className="my-auto text-cyan-500" size={20}/>}
                      ].map((menu) => (
                        <li role="none">
                          <Link to={menu.to} role="menuitem" tabIndex={0} className={menuClass}>
                            <span>{menu.label}</span>
                            <span className="flex gap1 ml-1">{menu.icon}{menu.icon2}</span>
                          </Link>
                        </li>
                      ))
                    }                    
                  </ul>
                )}
              </button>
            </div>
          </section>

        </section>
      </nav>
    </>
  );
};

export default Navbar;