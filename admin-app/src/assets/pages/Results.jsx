import {useState} from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
export default function Results() {
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
                <main>

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