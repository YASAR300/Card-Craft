import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CardCreate from './pages/CardCreate';
import CardPreview from './pages/CardPreview';
import StudentCardCreate from './pages/StudentCardCreate';
import StudentCardPreview from './pages/StudentCardPreview';
import ProfessionalCardCreate from './pages/ProfessionalCardCreate.jsx';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import SubscriptionPlans from './pages/SubscriptionPlans.jsx';
import Templates from './pages/Templates';
import AdminPanel from './pages/Adminpanel.jsx';
// import VerifyEmail from './pages/auth/VerifyEmail';
// import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
                {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/subscribe" element={<SubscriptionPlans />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/ProfessionalCardCreate" element={<ProfessionalCardCreate />} />
                
                {/* Dashboard */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                {/* Business Card Routes */}
                <Route path="/card/create" element={
                  <ProtectedRoute>
                    <CardCreate />
                  </ProtectedRoute>
                } />
                <Route path="/card/preview" element={<CardPreview />} />
                
                {/* Student Card Routes */}
                <Route path="/student-card/create" element={
                  <ProtectedRoute>
                    <StudentCardCreate />
                  </ProtectedRoute>
                } />
                <Route path="/student-card/preview" element={<StudentCardPreview />} />
                <Route path="/student-card/public/:cardId" element={<StudentCardPreview />} />
                
                {/* Profile */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                {/* Admin Panel */}
                <Route path="/admin-panel" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1F2937',
                  color: '#F3F4F6',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#F3F4F6',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#F3F4F6',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;