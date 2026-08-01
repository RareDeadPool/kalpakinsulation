import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdminDashboard from "./pages/AdminDashboard"
import VerifyCertificate from "./pages/VerifyCertificate"
import { initializeDatabase } from './services/dbServices';
import { AuthProvider } from './context/AuthContext';
import { trackVisitor } from './services/firebase';

function App() {
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        // Track visitor when the app loads
        await trackVisitor();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    init();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
              <Route path="/verify-certificate/:code" element={<VerifyCertificate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App
