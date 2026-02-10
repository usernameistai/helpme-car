import { useEffect, type FC } from 'react';
import { particlePresets } from '../../utils/particlePresets';

// A mapping of your Tailwind color classes to hex codes
const tailwindColours: Record<string, string> = {
  "cyan-400": "#22d3ee",
  "purple-500": "#a855f7",
  "lime-400": "#a3e635",
  "rose-500": "#f43f5e",
  "amber-400": "#fbbf24",
  "yellow-300": "#FDE047",
  "teal-400": "#2DD4BF",
  "slate-900": "#0f172a",
  "blue-500": "#2196f3",
  "emerald-400": "#34d399",
};

interface ParticlesProps {
  theme?: keyof typeof particlePresets;
  colour?: string;
}

const ParticlesBg: FC<ParticlesProps> = ({theme = 'default', colour }) => {

  useEffect(() => {
    // Vite/React to ensure script is loaded and ID exists
    const init = () => {
      const pJS = (window as any).particlesJS;
      const pJSDom = (window as any).pJSDom;
      const container = document.getElementById('particles-js');

      // Stops the engines / active JS loops in memory
      if (pJSDom && pJSDom.length > 0) {
        for (let i = 0; i < pJSDom.length; i++) {
          // This destroys a pJS instance
          const instance = pJSDom[i].pJS || pJSDom[i]; 
          instance.fn?.vendors?.destroypJS?.();
        }
        // Clear global array so library thinks starting fresh
        (window as any).pJSDom = [];
      }
      if (container) {
        container.innerHTML = "";
      }

      if (pJS && container) {
        // Check if user is in Dark Mode via class on <html>
        const isDark = document.documentElement.classList.contains('dark');
        // Pick colour based on theme if not explicitly provided
        const finalColour = tailwindColours[colour || ""] || (isDark ? "#22d3ee" : "#0f172a");
        
        const config = JSON.parse(JSON.stringify(particlePresets[theme]));
        config.particles.color.value = finalColour;

        if (config.particles.line_linked) {
          config.particles.line_linked.color = finalColour;
          config.particles.line_linked.opacity = isDark ? 0.3 : 0.1; // Fainter on light mode
        }
        
        pJS('particles-js', config);
      }  
    };
    // Initialise
    init();

     // Re-run if the dark mode class changes on the body/html
    const observer = new MutationObserver(init);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
 
    return () => {
      observer.disconnect();
      // Optional: extra cleanup on unmount
      const pJSDom = (window as any).pJSDom;
      // if (pJSDom) (window as any).pJSDom = [];
      if (pJSDom && pJSDom.length > 0) {
        for (let i = 0; i < pJSDom.length; i++) {
          // Access the internal "cancel" function of particles.js
          if (pJSDom[i].pJS) {
            cancelAnimationFrame(pJSDom[i].pJS.fn.drawAnimFrame);
          }
        }
        (window as any).pJSDom = []; // Wipe the array
      }
    };
  }, [theme, colour]);

  return (
    <>
      <div 
        id="particles-js"
          className='fixed inset-0 z-10 bg-slate-200/30 dark:bg-slate-900 pointer-events-none'
            aria-hidden='true'
      />
    </>
  )
}

export default ParticlesBg;