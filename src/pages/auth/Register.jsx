import React, { useState } from 'react';
import {
  User, Shield, Building, ChevronDown, Eye, EyeOff, ArrowLeft, Mail, Lock
} from 'lucide-react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider
} from '../../config/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [showAdminSecret, setShowAdminSecret] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      if (!name.trim()) throw new Error('Name is required');
      if (!email.trim()) throw new Error('Email is required');
      if (!password) throw new Error('Password is required');
      if (!role) throw new Error('Please select a role');
      if (role === 'admin' && !adminSecret) throw new Error('Admin secret is required for admin role');

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      await sendEmailVerification(userCredential.user);

      const payload = {
        idToken,
        name,
        role,
        ...(role === 'admin' && { adminSecret })
      };

      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/register`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      alert('Verification email sent. Please verify your email before logging in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      if (!name.trim()) throw new Error('Name is required');
      if (!role) throw new Error('Please select a role');
      if (role === 'admin' && !adminSecret) throw new Error('Admin secret is required for admin role');

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const payload = {
        idToken,
        name,
        role,
        ...(role === 'admin' && { adminSecret })
      };

      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/register`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      alert('Google registration successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'user': return <User className="w-5 h-5" />;
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'franchise': return <Building className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (roleType) => {
    switch (roleType) {
      case 'user': return 'from-blue-500 to-blue-600';
      case 'admin': return 'from-red-500 to-red-600';
      case 'franchise': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/login')} className="flex items-center text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Choose your role and get started</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8">
          {error && <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" required />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Role</label>
              <div className="relative">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none">
                  <option value="" disabled>Choose your role</option>
                  <option value="user">👤 User</option>
                  <option value="admin">🛡️ Admin</option>
                  <option value="franchise">🏢 Franchise</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{getRoleIcon(role)}</div>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Admin Secret */}
            {role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Admin Secret Key</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type={showAdminSecret ? 'text' : 'password'} placeholder="Enter admin secret key" value={adminSecret} onChange={(e) => setAdminSecret(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400" required />
                  <button type="button" onClick={() => setShowAdminSecret(!showAdminSecret)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                    {showAdminSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-red-400 mt-1">⚠️ Admin secret is required for administrative access</p>
              </div>
            )}

            {/* Register Button */}
            <button onClick={handleRegister} disabled={loading || !name || !email || !password || !role || (role === 'admin' && !adminSecret)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Register with Email'
              )}
            </button>

            {/* Google */}
            <div className="text-center text-gray-400">or</div>
            <button onClick={handleGoogleRegister} disabled={loading || !name || !role || (role === 'admin' && !adminSecret)} className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105">
              {loading ? 'Processing...' : 'Register with Google'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
