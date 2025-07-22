import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/verify-email', {
        email,
        code,
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Email verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-gray-850 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">Verify Email</h2>
            <p className="text-gray-400">
              A verification code has been sent to {email}.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleVerify}>
            <Input
              label="Verification Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              icon={<Mail className="h-5 w-5 text-gray-500" />}
              placeholder="Enter verification code"
              className="bg-gray-800 border-gray-700 text-gray-200"
            />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              isLoading={loading}
              disabled={!code}
            >
              Verify
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center justify-center text-blue-400 hover:text-blue-300 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;