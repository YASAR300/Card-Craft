import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const res = await fetch('http://localhost:5000/api/me', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          const data = await res.json();

          if (!res.ok) {
            console.error('Could not verify user from backend.');
            setUser(null);
          } else {
            localStorage.setItem('token', idToken); // ✅ Save token for auth
            setUser({
              firebaseUid: data.firebaseUid,
              email: data.email,
              name: data.name,
              role: data.role,
              token: idToken,
            });
          }

        } catch (err) {
          console.error('Error verifying user from backend:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', idToken); // ✅ Save token
      toast.success('Login successful');

    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerWithGoogle = async (role, name, adminSecret = '') => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, role, name, adminSecret }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      localStorage.setItem('token', idToken); // ✅ Save token
      toast.success('Registered successfully');

    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token'); // ✅ Clear token on logout
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };
  

  const value = {
    user,
    loading,
    loginWithGoogle,
    registerWithGoogle,
    registerWithEmail,
    loginWithEmail,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
