import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please log in to access this page.');
        setRedirectPath('/login');
      } else if (requireAdmin && user.role !== 'admin') {
        toast.error('Access denied. Admins only.');
        setRedirectPath('/dashboard');
      }
    }
  }, [loading, user, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-gray-100">Loading...</p>
      </div>
    );
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
