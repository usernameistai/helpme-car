import { type FC, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const GlassCard: FC<GlassCardProps> = ({ children, title, className = "" }) => {
  return (
    <>  
      <section className={twMerge(
        `relative z-10 mb-6 p-6 
        bg-slate-200/10 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-400/20 shadow-xl 
        transition-all duration-200 ease-in-out min-h-56 sm:h-[25vh] landscape:min-h-64
        hover:bg-white/20 hover:scale-[1.05] hover:-translate-y-1 
        hover:shadow-[0_20px_50px_rgba(34,211,238,0.3),inset_5px_5px_10px_rgba(255,255,255,0.2)]`,
        className
        )}
      >
        {/* Dynamic Title with Wizard Gradient */}
        {title && (
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 
            text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300"
          >
            {title}
          </h2>
        )}

        {/* The main content slot */}
        <div className="text-white text-sm sm:text-base">
          {children}
        </div>

        {/* The 'Magic' Pulse Border */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 pointer-events-none animate-pulse animate-pulse-glow hover:opacity-50" />
      </section>
    </>
  );
};

export default GlassCard;