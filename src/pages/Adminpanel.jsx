// AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  User, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  Building, 
  MapPin,
  FileText,
  Calendar,
  Shield,
  Activity,
  TrendingUp,
  CreditCard
} from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error('Not logged in');
        const token = await currentUser.getIdToken();

        const [userRes, subsRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/admin/subscriptions', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userRes.ok || !subsRes.ok) throw new Error('Fetch failed');

        const userData = await userRes.json();
        const subsData = await subsRes.json();

        setUsers(userData);
        setSubscriptions(subsData);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch admin data');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleViewProfile = async (firebaseUid) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`http://localhost:5000/api/admin/user-profile/${firebaseUid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load profile');
      setSelectedProfile(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteUser = async (firebaseUid) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`http://localhost:5000/api/admin/delete-user/${firebaseUid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      toast.success('User deleted successfully');
      setUsers(users.filter((u) => u.firebaseUid !== firebaseUid));
      setSelectedProfile(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`http://localhost:5000/api/admin/approve-subscription/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Approval failed');
      toast.success('Subscription approved');
      setSubscriptions(subscriptions.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`http://localhost:5000/api/admin/reject-subscription/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Rejection failed');
      toast.success('Subscription rejected');
      setSubscriptions(subscriptions.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <span className="text-white text-lg">Loading admin data...</span>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Users', value: users.length, icon: <Users className="h-6 w-6" />, color: 'text-blue-400' },
    { label: 'Pending Subscriptions', value: subscriptions.length, icon: <Clock className="h-6 w-6" />, color: 'text-yellow-400' },
    { label: 'Active Today', value: '24', icon: <Activity className="h-6 w-6" />, color: 'text-green-400' },
    { label: 'Revenue', value: '$12.5k', icon: <TrendingUp className="h-6 w-6" />, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300">Manage users and subscriptions</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'users'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Users Management</span>
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'subscriptions'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Subscriptions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Users List */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-purple-400" />
                  All Users ({users.length})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.firebaseUid}
                      className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{user.email}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
                              }`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProfile(user.firebaseUid)}
                            className="flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteUser(user.firebaseUid)}
                            className="flex items-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-purple-400" />
                  User Profile
                </h2>
                {selectedProfile ? (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{selectedProfile.displayName || 'N/A'}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <Mail className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white">{selectedProfile.email || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <Phone className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-gray-400 text-sm">Phone</p>
                          <p className="text-white">{selectedProfile.phone || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <Building className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-gray-400 text-sm">Company</p>
                          <p className="text-white">{selectedProfile.company || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-gray-400 text-sm">Address</p>
                          <p className="text-white">{selectedProfile.address || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-400 mt-1" />
                        <div>
                          <p className="text-gray-400 text-sm">Bio</p>
                          <p className="text-white">{selectedProfile.bio || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select a user to view their profile</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CreditCard className="h-6 w-6 mr-3 text-purple-400" />
              Pending Subscriptions ({subscriptions.length})
            </h2>
            
            {subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No pending subscriptions</p>
                <p className="text-gray-500 text-sm">All subscription requests have been processed</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subscriptions.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                          <p className="text-gray-400 text-sm">{sub.email}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Plan</p>
                        <p className="text-white font-medium">{sub.plan}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-white font-medium">{sub.duration}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Submitted</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <p className="text-white text-sm">{new Date(sub.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-400 text-sm mb-2">Payment Proof</p>
                      <img 
                        src={sub.paymentProofUrl} 
                        alt="Payment Screenshot" 
                        className="w-full h-32 object-cover rounded-lg border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                        onClick={() => window.open(sub.paymentProofUrl, '_blank')}
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleApprove(sub._id)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleReject(sub._id)}
                        className="flex-1 flex items-center justify-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;