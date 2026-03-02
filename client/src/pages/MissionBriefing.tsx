import React from 'react';
import ParticlesBg from '../components/layout/ParticlesBg';
import { Link } from 'react-router-dom';

const MissionBriefing: React.FC = () => {
  const elementClass = "relative z-30 flex flex-col group mt-8 py-4 sm:py-7 p-5 sm:p-4 bg-zinc-100 dark:bg-zinc-900/10 backdrop-blur-sm border-l border-t border-cyan-400/20 rounded-2xl w-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out hover:border-cyan-400/50 hover:shadow-[0_10px_20px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]";
  const numberClass  = "bg-emerald-500 rounded-sm text-sm sm:text-base text-slate-900 px-2 py-1 font-bold";
  const h2Class = " text-base sm:text-xl font-bold uppercase tracking-widest";
  const pClass = "pl-12 text-sm sm:text-base text-slate-300 leading-relaxed";

  return (
    <>
      <ParticlesBg theme='default' colour='' className='' />
      <div className="min-h-screen bg-slate-900 text-emerald-400 p-8 font-mono relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          <header className="border-b border-emerald-500/30 pb-4 animate-mission-fade">
            <div className="flex items-center space-x-4 mb-2 px-5">
              <div className="h-[1px] w-12 bg-cyan-400 opacity-50"></div>
              <h2 
                className="font-space text-xs md:text-xl tracking-[0.3em] uppercase text-cyan-400/90 text-warm-glow"
                  style={{ filter: 'drop-shadow(-10px 0 15px rgba(34,211,238,0.4)) drop-shadow(10px 0 15px rgba(250,204,21,0.4))' }}
              >
                System Protocol: HelpMe // MISSION_BRIEFING
              </h2>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[7px] sm:text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
                  STATUS: OPERATIONAL // STRICTLY FOR FIELD OPERATORS ONLY // CLEARANCE L1
                </span>
                <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
              </div>
            </div>
          </header>

          <section className="space-y-6">
            {/* Step 1 */}
            <div className={`animate-materialize ${elementClass}`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-2 ">
                <span className={numberClass}>01</span>
                <h2 className={h2Class}>Anomaly / Fault Detection</h2>
              </div>
              <p className={pClass}>
                Identify a target vehicle exhibiting mechanical or safety discrepancies. 
                <span className="block mt-2 text-xs sm:text-sm text-yellow-500/80 italic">
                  Note: Requires situational awareness. Deactivate "Self-Obsessed" mode before proceeding and pull car over to side of road if "driving".
                </span>
              </p>
            </div>

            {/* Step 2 */}
            <div className={`animate-materialize ${elementClass}`} style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-4 mb-2">
                <span className={numberClass}>02</span>
                <h2 className={h2Class}>Data Uplink</h2>
              </div>
              <p className={pClass}>
                Input the registration plate into the HUD. The interface is engineered to be 
                completely self-explanatory. (Enter Faults / Advisories)
                <span className="block mt-2 text-xs sm:text-sm text-emerald-500/70">
                  // DIAGNOSTIC_SCAN --AUTO_INTUITION_ENABLED
                </span>
              </p>
            </div>

            {/* Step 3 */}
            <div className={`animate-materialize ${elementClass}`} style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-4 mb-2">
                <span className={numberClass}>03</span>
                <h2 className={h2Class}>Mission Completion</h2>
              </div>
              <p className={pClass}>
                Mission Completed. Disconnect from altruism and return to standby.
              </p>
              <div className="mt-8 pt-4 border-t border-emerald-500/10 text-center font-bold text-lg sm:text-2xl tracking-[0.5em] opacity-40">
                FIN.
              </div>
            </div>
          </section>

          <section className="flex flex-col items-end">
            <span className="font-mono text-[8px] text-cyan-400/50 tracking-[0.2em] mb-1">
              STATUS: OPERATIONAL // OPT_LOAD: f1(1) // REG_ADD: 7/CHAR // LINK: ACTIVE
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
          </section>

          {/* Action Button */}
          <div className="flex justify-center pt-2">
            <button className="neon-button">
              <Link to="/reg">
                ACCEPT MISSION
              </Link>
            </button>
          </div>

          <div className="flex flex-col z-20 items-center space-y-2">
            {/* A thin, technical divider line */}
            <div className='h-[1px] w-16 bg-[var(--neon-colour)] opacity-30 mb-2'></div>
            <p className='font-inter text-[6px] sm:text-[10px] tracking-[0.5em] uppercase text-white opacity-90'>
              {/* The Pulsing Dot */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--neon-colour)] mr-3 animate-pulse"></span>
              
              SYSTEM ACCESS: 
              {/* The Pulsing "Online" Text */}
              <span className="text-[var(--neon-colour)] ml-2 animate-pulse font-bold">
                ONLINE
              </span> 
              <span className="ml-4 text-white/80">MISSION // BRIEF</span>
            </p>
          </div>
        </div>

        
        
        {/* The cinematic scanline you wanted—only on this static page! */}
        <div className="scanline" />
      </div>
    </>
  );
};

export default MissionBriefing;