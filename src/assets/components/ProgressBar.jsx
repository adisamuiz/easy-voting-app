export default function ProgressBar({positionsVoted, totalPositions}) {
    if (totalPositions === 0) return null;
    
    const rawPercentage = (positionsVoted / totalPositions) * 100;
    const percentage = Math.min(rawPercentage, 100).toFixed(0); 

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" >
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Your Voting Progress</h3>
                    <p className="text-sm text-slate-500">
                        You have voted in {positionsVoted} out of {totalPositions} elections.
                    </p>
                </div>
                <span className="text-green-600 font-bold text-lg">{percentage}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                <div className="bg-green-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}