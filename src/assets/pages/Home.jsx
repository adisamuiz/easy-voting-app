import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {db} from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ElectionCard from "../components/ElectionCard";
      
function Home() {
  const navigate = useNavigate()
  const [elections, setElections] = useState([]);
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const electionsCollection = collection(db, "Elections");
        const electionSnapshot = await getDocs(electionsCollection);
        const electionList = electionSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setElections(electionList);
        console.log(electionList);
      } catch (error) {
        console.error("Error fetching elections: ", error);
      }
    };
    fetchElections();
  }, []);
  const handleClick = (electionId) => {
    navigate(`/voter-login/${electionId}`);
  };
  return (
  <>
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">VoltEE</h1>
        </div>
      </div>
    </header>
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md"> 
        <div className="text-center mb-8"> 
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to VoltEE</h1>
          <p className="text-gray-600">Welcome to the secure portal for your departmental elections. Select an election below to begin voting.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elections.map((election) => (
            <ElectionCard 
              id={election.id}
              onClick={() => handleClick(election.id)}
              className="bg-white text-card-foreground flex flex-col gap-6 rounded-2xl space-y-4 cursor-pointer hover:shadow-lg transition-all border-2 border-gray-300 hover:border-green-500"
              electionTitle={election.title}
              positions={election.positions.length + " positions available"}
              electionStatus={election.status ? "● Live" : "● Closed"}
            />
          ))}
        </div>
      </div>
    </main>
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        © 2026 VoltEE. Secure Election Management System.
      </div>
    </footer>
  </div>
  </>
  
  )
}

export default Home
