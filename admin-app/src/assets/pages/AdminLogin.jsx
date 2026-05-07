import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword, /*signInWithPopup, GoogleAuthProvider,*/ onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function AdminLogin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDoc);
            if (
                docSnap.exists() && 
                docSnap.data().role === "admin"
                ) 
            {
                navigate('/dashboard');
            } else {
                setError("Unauthorized access. Only admins can log in.");
                signOut(auth);
            }
        }
    }); 
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        await signInWithEmailAndPassword(auth, adminEmail, password);
    }
    catch (err) {
        console.error("Email Login failed:", err);
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
    } finally {
        setLoading(false);
    }

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
        <main className ="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl text-center">Admin Authentication</h2>
                {/* <p className="text-sm text-gray-600 text-center mt-2">{electionTitle}</p> */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <form 
                    onSubmit={handleEmailLogin} 
                    className="space-y-6"
                >
                    <label className = "block text-sm font-medium text-slate-700 mb-1">
                        Admin Email:
                    </label>
                    <input 
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        type="email" 
                        placeholder="name@company.com"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    >
                    </input>
                    <label className = "block text-sm font-medium text-slate-700 mb-1">
                        Password:
                    </label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    >
                    </input>
                    <button 
                        className= "w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98]"
                        disabled = {loading}
                        type = "submit"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © 2026 VoltEE. Secure Election Management System.
        </div>
      </footer>
    </div>
    </>
  );
}

export default AdminLogin;