//import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {db} from "../../firebase";  
import { doc, getDoc, collection, getDocs } from "firebase/firestore";  

import CandidateCard from "../components/candidateCard";
import ProgressBar from "../components/ProgressBar"; 

function VotingPage() {
    //const navigate = useNavigate()
    const [totalPositions, setTotalPositions] = useState(0);
    const [positionsVoted, setPositionsVoted] = useState(0);
    const [positions, setPositions] = useState([]);
    const [currentPosition, setCurrentPosition] = useState("");
    const [candidates, setCandidates] = useState([]);
    const handleButtonClick = () => {
        setPositionsVoted(positionsVoted + 1);
        setCurrentPosition(positions[positionsVoted]);
        
    };
    useEffect(() => {
        const fetchPositionData = async () => {
            try {
                const positionRef = await doc(db, "Elections", "eee-2026");
                const positionSnap = await getDoc(positionRef);
                const positionList = positionSnap.data().positions;
                console.log("positionList:" , positionList);
                setTotalPositions(positionList.length);
                setPositions(positionList);
            } catch (error) {
                console.error("Error fetching position data: ", error);
            }
        }

        const fetchCandidateData = async () => {
            try {
                const candidateCollection = await collection(db, "candidates");
                const candidateSnapshot = await getDocs(candidateCollection);
                const candidateList = candidateSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                setCandidates(candidateList);
                console.log("candidates:" , candidates);
            } catch (error) {
                console.error("Error fetching candidate data: ", error);
            }
        };

        fetchPositionData();
        fetchCandidateData();
    } , []);
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">VoltEE</h1>
                    </div>
                </div>
                <div>
                    <ProgressBar 
                        positionsVoted={positionsVoted}
                        totalPositions={totalPositions}
                    />
                </div>
            </header>
            <main className="max-w-md mx-auto px-4 py-6">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2"> {currentPosition} </h1>
                        <p className="text-gray-600">Choose a candidate for this position</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {candidates.map((candidate) => (
                            candidate.position === currentPosition ?
                            <CandidateCard
                                id={candidate.id}
                                candidateName={candidate.name}
                                candidatePosition={candidate.position}
                            /> : null
                        ))}
                    </div>
                    <button onClick={handleButtonClick} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                        Next
                    </button>
                </div>
            </main>
        </div>
        </>
    )
    
}
export default VotingPage;