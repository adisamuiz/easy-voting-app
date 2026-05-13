import { useRef, useState } from 'react';
function Voters() {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        //const droppedFile = e.dataTransfer.files[0];
        
    };
    return(
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">VoltEE Admin Dashboard</h1>
                    <p className="text-sm text-gray-600">Election Management System</p>          
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Voters Management</h1>
                <p className="text-lg text-gray-600 text-center">
                    Manage your voters here. You can add new voters, edit existing ones, and keep track of their information.
                </p>
                <div className="flex flex-col gap-6 rounded-2xl border border-slate-300 shadow-sm p-6 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Bulk Import (CSV)</h2>
                    <p className="text-sm text-slate-500 mb-4">
                        Upload a CSV file. The first row MUST contain headers exactly named <strong>name</strong> and <strong>email</strong>.
                    </p>
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className= {`
                            border-2 border-dashed  rounded-xl p-6 text-center hover:border-blue-500 cursor-pointer transition-colors
                            ${
                                isDragging ? 
                                'border-blue-500' : 
                                'border-gray-300'
                            }
                        `}
                    >
                        <p className="text-sm text-gray-600 mb-2">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            CSV file with columns: Name, Student ID, Access Code
                        </p>
                        <input
                            type="file" 
                            accept=".csv"
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-6 rounded-2xl border border-slate-300 shadow-sm p-6 mt-8">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Voter Name</label>
                            <input className="border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 w-full"/>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Voter ID</label>
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
                            Add Voter
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
export default Voters