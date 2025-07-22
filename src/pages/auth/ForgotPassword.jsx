import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth(); // ✅ updated
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email); // ✅ updated
      setEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      await resetPassword(email); // ✅ updated
      toast.success('Reset email resent');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="bg-gray-850 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-200 mb-4">Check Your Email</h2>

            <p className="text-gray-400 mb-6">We've sent a password reset link to:</p>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-200">{email}</p>
            </div>

            <div className="space-y-4 text-sm text-gray-400 mb-8">
              <p>• Click the link in the email to reset your password</p>
              <p>• The link will expire in 1 hour for security</p>
              <p>• Check your spam folder if you don't see the email</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white"
                isLoading={loading}
              >
                Resend Email
              </Button>

              <Link to="/login">
                <Button variant="outline" className="w-full border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-900 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Still having trouble?</strong> Contact our support team at{' '}
                <a href="mailto:support@cardcraft.com" className="underline text-blue-400 hover:text-blue-300">
                  support@cardcraft.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-bold text-gray-200 mb-2">Forgot Password?</h2>
            <p className="text-gray-400">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="h-5 w-5 text-gray-500" />}
              placeholder="Enter your email address"
              className="bg-gray-800 border-gray-700 text-gray-200"
            />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              isLoading={loading}
              disabled={!email}
            >
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center justify-center text-blue-400 hover:text-blue-300 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-200 mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• We'll send a secure reset link to your email</li>
              <li>• Click the link to create a new password</li>
              <li>• The link expires in 1 hour for security</li>
              <li>• You can then login with your new password</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
