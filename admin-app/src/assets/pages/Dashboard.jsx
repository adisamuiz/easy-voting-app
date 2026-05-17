import {useState} from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase"
import StatCard from "../components/StatCard";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
function DashBoard() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <div 
        className={`
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-64' : 'translate-x-0'}
        `}
      >
        <header>
          <Header 
            onMenuClick={toggleMenu}
            menuState={isMenuOpen}
            onSignOut={handleSignOut}
          />
        </header>
        <main 
          className={`
            flex flex-col items-center justify-center p-8 
        `}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600 text-center">
            Welcome to the dashboard! Here you can find an overview of your activities and statistics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <StatCard 
              title="Voter Turnout"
              value="75%"
              description="2 of 5 voters"
              icon="📊"
            />
            <StatCard 
              title="Total Votes"
              value="1,234"
              description="Increased by 15% from last month"
              icon="📈"
            />
            <StatCard 
              title="Active Voters"
              value="890"
              description="Out of 1,000 registered voters"
              icon="👥"
            />
          </div>
        </main>
      </div>
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-200 text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SideMenu 
          onMenuClick={toggleMenu}
          menuState={setIsMenuOpen}
        />
      </div>
    </div>
  );
}
export default DashBoard;