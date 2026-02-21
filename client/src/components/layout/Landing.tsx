import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import { useRegs } from "../../hooks/useRegs";

const Landing = () => {
  useLeaderboard();
  useRegs();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2500, }} />
      <Navbar />
      <Sidebar />

      <main className="relative z-20 bg-landing-car-1 bg-standard h-[100vh] my-[-2.5rem]">
        <div className="absolute inset-0 bg-black/70 z-0">
          <div 
            className="flex flex-col text-center justify-center items-center mx-auto translate-y-[7%] space-y-5 max-w-[75%]"
              aria-label="This is the main title of the landing page HelpMe - Car, also a link to the proper home page. Welcome to the site!!"
          >
            <Link to='/reg'>
              <h1 className='font-poppins lan min-w-96 text-5xl md:text-8xl font-bold pb-2 md:pb-4'>
                HelpMe - Car
              </h1>
            </Link>
            
            <div className="space-y-2">
              <p className='font-michroma lan text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter'>
                Identify. Alert. Help.
              </p>
              <p className="font-inter text-white/90 text-sm md:text-base max-w-xl">
                The anonymous vehicle advisory system. Enter the registration, select the fault, and assist a fellow human.
              </p>
            </div>

            {/* Modular Glass Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
              <div className="p-4 border border-white/10 backdrop-blur-md bg-white/5 rounded-sm">
                <h3 className="font-michroma text-[var(--neon-colour)] text-[10px] tracking-widest mb-2">01 // VIEW</h3>
                <p className="font-inter text-white text-[11px] opacity-70">Focus on the registration plate.</p>
              </div>
              <div className="p-4 border border-white/10 backdrop-blur-md bg-white/5 rounded-sm">
                <h3 className="font-michroma text-[var(--neon-colour)] text-[10px] tracking-widest mb-2">02 // INPUT</h3>
                <p className="font-inter text-white text-[11px] opacity-70">Select the specific vehicle fault.</p>
              </div>
              <div className="p-4 border border-white/10 backdrop-blur-md bg-white/5 rounded-sm">
                <h3 className="font-michroma text-[var(--neon-colour)] text-[10px] tracking-widest mb-2">03 // DISPATCH</h3>
                <p className="font-inter text-white text-[11px] opacity-70">Alert the driver anonymously.</p>
              </div>
            </div>

            <div 
              className='lead pt-4' 
                aria-label="Initialise Help. This is another button to go to the home page. Welcome again"
            >
              <Link to='/reg' className='neon-button font-poppins'>Initialise Reporting Process</Link>
            </div>

            <div className="flex flex-col items-center mt-12 space-y-2">
              {/* A thin, technical divider line */}
              <div className='h-[1px] w-16 bg-[var(--neon-colour)] opacity-30 mb-2'></div>
              <p className='font-inter text-[10px] tracking-[0.5em] uppercase text-white opacity-90'>
                {/* The Pulsing Dot */}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--neon-colour)] mr-3 animate-pulse"></span>
                
                SYSTEM ACCESS: 
                {/* The Pulsing "Online" Text */}
                <span className="text-[var(--neon-colour)] ml-2 animate-pulse font-bold">
                  ONLINE
                </span> 
                <span className="ml-4 text-white/80">GOOGLE // GITHUB // GUEST</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Landing;