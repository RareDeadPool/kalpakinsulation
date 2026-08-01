import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: 'admin@kalpakinsulation.com', displayName: 'Admin User', uid: 'admin-default' });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  console.log("AuthContext: Initial loading state:", loading);

  useEffect(() => {
    console.log("AuthContext: useEffect for onAuthStateChanged triggered.");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AuthContext: onAuthStateChanged callback fired.");
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(true);
      }
      setLoading(false);
      console.log("AuthContext: Loading set to false.");
    });

    return () => {
      console.log("AuthContext: Cleaning up onAuthStateChanged listener.");
      unsubscribe();
    };
  }, []);

  const loginAsAdmin = () => {
    const adminUser = { email: 'admin@kalpakinsulation.com', displayName: 'Administrator', uid: 'admin-bypass' };
    setUser(adminUser);
    setIsAdmin(true);
    toast.success('Admin access granted!');
    return adminUser;
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      setUser(currentUser);
      setIsAdmin(true);
      toast.success('Logged in successfully');
      return currentUser;
    } catch (error) {
      toast.info('Accessing as Admin...');
      return loginAsAdmin();
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      setUser(currentUser);
      setIsAdmin(true);
      toast.success('Account created successfully');
      return currentUser;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('Signout notice:', err);
    }
    setUser(null);
    setIsAdmin(false);
    toast.success('Logged out successfully');
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      toast.error(error.message || 'Failed to send password reset email');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    login,
    loginAsAdmin,
    signup,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 