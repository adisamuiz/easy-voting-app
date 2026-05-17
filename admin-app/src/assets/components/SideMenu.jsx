import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

function SideMenu({onMenuClick, menuState}) {
    const [selectedOption, setSelectedOption] = useState('None');
    const menuOptions = [
        {name: 'Dashboard', path: '/dashboard'}, 
        {name: 'Voters', path: '/voters'}, 
        {name: 'Candidates', path: '/candidates'}, 
        {name: 'Results', path: '/results'}, 
        {name: 'Elections', path: '/elections'}, 
        {name: 'Settings', path: '/settings'}
    ];
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        () => menuState(false);
        navigate(option.path);
    };
    return(
        <>
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm h-20">
                <button 
                    onClick={() => onMenuClick()}
                    className="p-1"
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
        </>
    )
}
export default SideMenu