const Footer = () => {
  return (
    <>
      <footer className="font-space relative z-50 bg-gray-600 dark:bg-gray-800 mt-auto border-t-2 border-teal-500 dark:border-teal-900">
        <div className="container mx-auto text-slate-100 text-center text-xs md:text-sm pt-3 pb-4">
        <strong> 
          {/* HelpMe-Car 💠 Built to help, not to track.
         © {new Date().getFullYear() }  Future Source */}
         <div className="flex flex-col items-center">
            <span className="font-mono text-[12px] text-cyan-400/50 tracking-[0.2em] mb-2">
            HelpMe-Car // 💠 // BUILT_TO_HELP: NOT_TO_TRACK
         © {new Date().getFullYear() }  David J.J. Battye - Future Source / The Universe.
            </span>
            <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400 to-transparent opacity-50"></div>
          </div>
         </strong>
        </div>
      </footer>
    </>
  );
};

export default Footer;