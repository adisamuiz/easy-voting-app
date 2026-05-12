import {useState} from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
function DashBoard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('None');
  const menuOptions = [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Voters', path: '/voters' }, { name: 'Settings', path: '/settings' }];
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    setIsMenuOpen(false);
    navigate(option.path);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className=""          
            onClick={toggleMenu}
            >
            <svg className="h-5 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className=" items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">VoltEE Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Election Management System</p>          
          </div>
        </div>
      </header>
      <main 
        className={`
          flex flex-col items-center justify-center p-8 
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-64' : 'translate-x-0'}
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
      {/* {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        ></div>
      )} */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-200 text-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <button 
            onClick={toggleMenu}
            className="p-1 hover:text-red-400 transition-colors"
          >
            <svg className="h-5 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          <ul className="flex flex-col gap-2">
            {menuOptions.map((option) => (
              <li key={option.name}>
                <button 
                  className={`
                    block w-full text-left px-6 py-3 hover:bg-slate-300 transition-colors 
                    ${selectedOption === option.name
                      ? 'bg-blue-600 border-l-4 border-blue-400 text-white font-semibold' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-white border-l-4 border-transparent'
                    }
                  `}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default DashBoard;