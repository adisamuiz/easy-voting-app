import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function VoterLogin() {
  const [studentEmail, setStudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists() &&  docSnap.data().role === "voter") {
                navigate("/voting");
            } else {
                setError("Unauthorized access. Only voters can log in.");
                signOut(auth);
            }
        }
    }); 
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError("");
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        console.error("Google Login failed:", err);
        setError("Google login failed. Please try again.");
        setLoading(false);
    } finally {
        setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        await signInWithEmailAndPassword(auth, studentEmail, password);
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
                <h2 className="text-2xl text-center">Voter Authentication</h2>
                <p className="text-sm text-gray-600 text-center mt-2">positions available</p>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <button 
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </button>
                {/* Visual Divider ("OR") */}
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <form 
                    onSubmit={handleEmailLogin} 
                    className="space-y-6"
                >
                    <label className = "block text-sm font-medium text-slate-700 mb-1">
                        Student Email:
                    </label>
                    <input 
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
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
                        diabled = {loading}
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

export default VoterLogin;