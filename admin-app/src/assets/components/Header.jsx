export default function Header({onMenuClick, menuState, onSignOut}) {
    return(
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm h-20">
                {!menuState && (
                    <button 
                        onClick={() => onMenuClick()}
                    >
                        <svg className="h-5 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
                <div className=" items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">VoltEE Admin Dashboard</h1>
                    <p className="text-sm text-gray-600">Election Management System</p>          
                </div>
                <div>
                    <button onClick={() => onSignOut()} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                        Sign Out
                    </button>
                </div>
            </div>
    )
}