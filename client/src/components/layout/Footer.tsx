const Footer = () => {
  return (
    <>
      <footer className="relative z-50 bg-gray-600 dark:bg-gray-800 mt-auto border-t-2 border-teal-500 dark:border-teal-900">
        <div className="container mx-auto text-slate-100 text-center text-xs md:text-sm py-4">
        <strong> HelpMe-Car 💠 Built to help, not to track.
         © {new Date().getFullYear() }  Future Source</strong>
        </div>
      </footer>
    </>
  );
};

export default Footer;