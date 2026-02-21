import { useEffect, type FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useRegStore } from "./store/useRegStore";
import { useProfileStore } from "./store/useProfileStore";

import Layout from "./components/layout/Layout";
import Reg from "./components/reg/Reg";
import ShowReg from "./components/reg/ShowReg";
import EditReg from "./components/reg/EditReg";
import SearchReg from "./components/reg/SearchReg";
import RegList from "./components/reg/components/RegList";
import RegForm from "./components/reg/RegForm";
import Spinner from "./components/layout/Spinner";
import Landing from "./components/layout/Landing";
import RegRules from "./components/reg/RegRules";
import RegHelp from "./components/reg/RegHelp";
import RegSafety from "./components/reg/RegSafety";
import ScrollToTop from "./ScrollToTop";
import SignInPage from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import DashboardForm from "./pages/DashboardForm";
import Leaderboard from "./pages/Leaderboard";

const App: FC = () => {
  const { regs, loading } = useRegStore();
  const { profile } = useProfileStore();
  // Global Theme Listener, added after changes to dahsboard form
  useEffect(() => {
    const theme = profile?.theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [profile?.theme]);

  return (
    <>
      {loading && <Spinner />} {/* Display Spinner when loading */}
      <ScrollToTop />
      <Routes>
        <Route index element={ <Landing /> } />
        <Route path="/signin" element={ <SignInPage /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/reg" element={ <Reg /> } />
          <Route path="/reglist" element={ <RegList regs={regs} isLoading isError /> } />
          <Route path="/regrules" element={ <RegRules /> } />
          <Route path="/reghelp" element={ <RegHelp /> } />
          <Route path="/regsafety" element={ <RegSafety /> } />
          <Route path="/search" element={ <SearchReg /> } />
          <Route path="/helpreg" element={ <RegForm/> } />
          <Route path="/reg/:regplate" element={ <ShowReg /> } />
          <Route path="/reg/:regplate/edit" element={ <EditReg /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/dashboard/:userId/edit" element={ <DashboardForm /> } />
          <Route path="/leaderboard" element={ <Leaderboard /> } />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </>
  );
};

export default App;