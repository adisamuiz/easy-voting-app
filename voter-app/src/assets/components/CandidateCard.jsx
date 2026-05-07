export default function CandidateCard({id, onClick, candidateName, candidatePosition}) {
    return (
        <div key={id} onClick={onClick} className="bg-white text-card-foreground flex items-start gap-6 rounded-2xl space-y-1 cursor-pointer hover:shadow-lg transition-all border-2 border-gray-300 hover:border-green-500 p-4">
            <div>
                <img src="https://via.placeholder.com/150" alt="Candidate" className="w-16 h-16 rounded-full object-cover mb-4" />  
            </div>
            <div className="gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{candidateName}</h3>
                <p className="text-sm text-gray-600">{candidatePosition}</p>
            </div>
        </div>
    );
}