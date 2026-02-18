import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Landing = () => {

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2500, }} />
      <Navbar />
      <Sidebar />

      <main className="relative z-20 bg-landing-car-1 bg-standard h-[100vh] ">
        <div className="absolute inset-0 bg-black/70 z-0">
          <div 
            className="flex flex-col text-center justify-center translate-x-[15%] md:translate-y-[15%] space-y-10 max-w-[75%]"
              aria-label="This is the main title of the landing page HelpMe - Car, also a link to home page. Welcome to the site!!"
          >
            <Link to='/reg'>
              <h1 className='font-poppins lan min-w-96 text-5xl md:text-8xl font-bold pb-2 md:pb-4 -translate-x-[3rem] sm:translate-x-0'>
                HelpMe - Car
              </h1>
            </Link>
            <p className='font-michroma pb-2 lan text-xl sm:text-2xl md:text-4xl'>
              Share helpful information / advisories about someone's car, if it needs it. Create a helper profile if you would like
            </p>

            <div className='font-inter text-white text-base sm:text-lg md:text-xl'>
              <p>If you see a fault with someone's car, this is a way of letting them know. Simply choose from a selection of various problems</p>
              <p>Help someone out</p>
              <p>Dark mode yields surprises...</p>
            </div>

            <div 
              className='lead'
                aria-label="This is anothe button to go to the home page. Welcome again"
            >
              <Link to='/reg' className='neon-button font-poppins'>This Way To Help Someone's Car</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Landing;