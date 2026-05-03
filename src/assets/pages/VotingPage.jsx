//import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {db, auth} from "../../firebase";  
import { doc, getDoc, collection, getDocs, runTransaction, increment } from "firebase/firestore";  

import CandidateCard from "../components/candidateCard";
import ProgressBar from "../components/ProgressBar"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

function VotingPage() {
    //const navigate = useNavigate()
    const [totalPositions, setTotalPositions] = useState(0);
    const [positionsVoted, setPositionsVoted] = useState(0);
    const [positions, setPositions] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [userUid, setUserUid] = useState(""); // Store the authenticated user's UID   

    const currentPosition = positions[positionsVoted];

    const handleNext = () => {
        if (positionsVoted < totalPositions) {
            setPositionsVoted(positionsVoted + 1);   
        }
    };
    const handleClick = async() => {
        const candidateRef = doc(db, "candidates", "EI4kyGVPkow9KCpvzRhk"); // Replace with actual candidate ID
        const userRef = doc(db, "users", userUid); // Replace with actual user ID
        try {
            await runTransaction(db, async (transaction) => {
                const candidateDoc = await transaction.get(candidateRef);
                const userDoc = await transaction.get(userRef);
                if (!candidateDoc.exists()) {
                    throw "Candidate does not exist!";
                }
                if (!userDoc.exists()) {
                    throw "User does not exist!";
                }
                if (userDoc.data().hasVoted) {
                    throw "User has already voted!";
                }
                transaction.update(candidateRef, { votes: increment(1) });
                transaction.update(userRef, { hasVoted: true });
            });
        }
        catch (error) {
            console.error("Transaction failed: ", error);
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists() &&  docSnap.data().role === "voter") {
                    setUserUid(user.uid); // Store the authenticated user's UID in state
                } else {
                    signOut(auth);
                }
            }
        });
        
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
        return () => unsubscribe();
    } , []);
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
            <header className="sticky top-0 z-50 bg-white shadow-sm">
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
                                onClick={handleClick}
                            /> : null
                        ))}
                    </div>
                    <button onClick={handleNext} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                        Next
                    </button>
                </div>
            </main>
        </div>
        </>
    )
    
}
export default VotingPage;