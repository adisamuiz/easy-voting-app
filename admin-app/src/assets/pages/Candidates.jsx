import {useState} from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
export default function Candidates() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return(
        <div>
            <div>
                <header
                    className=
                    {`
                        transform transition-transform duration-300 ease-in-out
                        ${isMenuOpen ? 'translate-x-64' : 'translate-x-0'}
                    `}
                >
                    <Header 
                        onMenuClick={toggleMenu}
                        menuState={isMenuOpen}
                    />
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col gap-6 rounded-2xl border border-slate-300 shadow-sm p-6 mt-8">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Name</label>
                                <input className="border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 w-full"/>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Candidate ID</label>
                                <input className="border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 w-full"/>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Level</label>
                                <select 
                                    className="border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 w-full"
                                >
                                    <option value="">Select Level</option>
                                    <option value="1">100 Level</option>
                                    <option value="2">200 Level</option>
                                    <option value="3">300 Level</option>
                                </select>
                            </div>
                            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full">
                                Add Candidate
                            </button>
                        </form>
                    </div>
                </main>
            </div>
            <div 
                className=
                    {`
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
    )
}