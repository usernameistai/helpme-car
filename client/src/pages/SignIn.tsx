import { SignIn } from "@clerk/clerk-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SignInPage = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="relative flex flex-1 bg-search-car bg-standard items-center justify-center shadow-2xl shadow-zinc-700">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />
        {/* Content Stack */}
        <div className="flex flex-col justify-center items-center z-10 px-4 -translate-y-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-5 mb-10 pb-4 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-300">
            HelpMe-Car - Sign In
          </h1>
          <SignIn 
            fallbackRedirectUrl="/dashboard"
              redirectUrl="/"
                appearance={{ variables: {
                  colorBackground: '#4B5563',
                  colorText: '#f5f5f5',
                  },
                }}
          />
        </div>
      </main>

      <Footer />
      </div>
    </>
  )
}

export default SignInPage;