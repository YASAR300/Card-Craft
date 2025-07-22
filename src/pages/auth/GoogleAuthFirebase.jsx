// GoogleAuthFirebase.jsx
import React from 'react';
import { signInWithPopup, auth, provider } from '../../config/firebase';
import toast from 'react-hot-toast';

const GoogleAuthFirebase = ({ onLogin, disabled }) => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // Send token to your backend
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (onLogin) onLogin(data);
    } catch (err) {
      console.error(err);
      toast.error('Google sign-in failed');
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="w-full p-2 border border-gray-500 text-white rounded-md mt-2"
      disabled={disabled}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuthFirebase;
