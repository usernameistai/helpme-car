import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";

const Layout: FC = () => {
  
  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-200/30 dark:bg-gray-800 transition-colors duration-300">
        <Toaster position="top-center" toastOptions={{ duration: 2500, }} />
        
        <Navbar />
        <Sidebar />
        {/* Main content fills remaining space */}
        <main className="flex-1">
          <div className="sm:container mx-auto py-6">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;