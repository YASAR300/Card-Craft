import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Share2, Download, BarChart3, Edit, Trash2, User, Building, Phone, Mail, Globe, MapPin, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import PDFDownloadButton from '../components/ui/PDFDownloadButton.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [userCard, setUserCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardStats, setCardStats] = useState({ views: 0, downloads: 0, shares: 0 });

  // Load user's card data
  useEffect(() => {
    loadUserCard();
  }, []);

  // Fetch stats when userCard is loaded
  useEffect(() => {
    if (userCard && userCard._id) {
      axios.get(`http://localhost:5000/api/card/${userCard._id}/stats`).then(res => {
        setCardStats(res.data);
      }).catch(() => {});
    }
  }, [userCard]);

  const loadUserCard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let token = localStorage.getItem('token');
      if (!token) {
        const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkZXZlbG9wbWVudC11c2VyIiwiaWF0IjoxNjAwMDAwMDAwfQ.dummy';
        localStorage.setItem('token', dummyToken);
        token = dummyToken;
      }

      const response = await axios.get('http://localhost:5000/api/card/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data) {
        setUserCard(response.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setUserCard(null); // No card found
      } else {
        console.error('Error loading card:', error);
        setError('Failed to load card data');
        toast.error('Failed to load your card data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async () => {
    if (!userCard) return;
    
    if (window.confirm('Are you sure you want to delete your card? This action cannot be undone.')) {
      try {
        let token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/card/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setUserCard(null);
        toast.success('Card deleted successfully');
      } catch (error) {
        console.error('Error deleting card:', error);
        toast.error('Failed to delete card');
      }
    }
  };

  const formatCardDataForPDF = (card) => {
    if (!card) return {};
    
    return {
      personalInfo: {
        name: card.fullName || '',
        designation: card.designation || '',
        company: card.companyName || '',
        phone: card.primaryPhone || '',
        email: card.email || '',
        address: card.address || '',
        website: card.website || '',
        bio: card.bio || '',
        profileImage: card.profileImageUrl || '',
        companyLogo: card.companyLogoUrl || ''
      },
      socialLinks: {
        linkedin: card.socialLinks?.linkedin || '',
        twitter: card.socialLinks?.twitter || '',
        instagram: card.socialLinks?.instagram || '',
        facebook: card.socialLinks?.facebook || '',
        youtube: card.socialLinks?.youtube || '',
        whatsapp: card.socialLinks?.whatsapp || card.primaryPhone || ''
      },
      services: card.services?.map(service => ({
        id: Math.random(),
        title: typeof service === 'string' ? service : service.title,
        description: typeof service === 'object' ? service.description : `Professional ${service} services`,
        image: typeof service === 'object' ? service.imageUrl : '',
        link: typeof service === 'object' ? service.enquiryLink : '#'
      })) || [],
      products: card.products || [],
      media: {
        introVideo: card.introVideoUrl || '',
        videoTiles: card.videoTiles || [],
        gallery: card.galleryImages || []
      },
      paymentInfo: {
        paytm: card.paymentInfo?.paytm || '',
        googlePay: card.paymentInfo?.googlePay || '',
        phonePe: card.paymentInfo?.phonePe || '',
        upi: card.paymentInfo?.upi || '',
        bankDetails: {
          accountName: card.paymentInfo?.bankDetails?.accountName || '',
          accountNumber: card.paymentInfo?.bankDetails?.accountNumber || '',
          ifscCode: card.paymentInfo?.bankDetails?.ifscCode || '',
          bankName: card.paymentInfo?.bankDetails?.bankName || ''
        }
      },
      studentInfo: {
        name: card.studentName || '',
        mobile: card.studentMobile || '',
        bloodGroup: card.bloodGroup || '',
        age: card.age || '',
        school: card.schoolName || '',
        email: card.studentEmail || '',
        parentsEmail: card.parentsEmail || '',
        parentPhones: card.parentsMobile || [],
        schoolAddress: card.schoolAddress || '',
        homeAddress: card.homeAddress || ''
      },
      businessInfo: {
        established: card.establishedDate || '',
        aboutUs: card.aboutUs || '',
        googleReview: card.googleReviewLink || '',
        reviewLinks: card.reviewLinks || []
      },
      branding: {
        platformName: card.platformBranding?.name || '',
        franchiseName: card.franchiseBranding?.name || '',
        platformLogo: card.platformBranding?.logoUrl || '',
        franchiseLogo: card.franchiseBranding?.logoUrl || ''
      },
      design: {
        primaryColor: card.design?.primaryColor || '#3B82F6',
        secondaryColor: card.design?.secondaryColor || '#1E40AF',
        accentColor: card.design?.accentColor || '#8B5CF6'
      }
    };
  };

  const stats = [
    { label: 'Total Views', value: cardStats.views, icon: Eye, color: 'text-blue-400' },
    { label: 'Total Shares', value: cardStats.shares, icon: Share2, color: 'text-green-400' },
    { label: 'Downloads', value: cardStats.downloads, icon: Download, color: 'text-purple-400' },
  ];

  const CardInfoSection = ({ title, icon: Icon, children, isEmpty = false }) => (
    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50">
      <div className="flex items-center mb-4">
        <Icon className="h-5 w-5 text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {isEmpty ? (
        <p className="text-gray-400 italic">No information provided</p>
      ) : (
        children
      )}
    </div>
  );

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-center space-x-3 py-2">
      {Icon && <Icon className="h-4 w-4 text-gray-400" />}
      <div>
        <span className="text-gray-400 text-sm">{label}:</span>
        <span className="text-white ml-2">{value || 'Not provided'}</span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Dashboard</h2>
          <p className="text-gray-300">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-gray-300 mt-2">
            Manage your digital business card and track its performance
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/card/create">
              <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-900/30 rounded-lg mb-4">
                  {userCard ? <Edit className="h-6 w-6 text-blue-400" /> : <Plus className="h-6 w-6 text-blue-400" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {userCard ? 'Edit Your Card' : 'Create New Card'}
                </h3>
                <p className="text-gray-300">
                  {userCard ? 'Update your professional digital business card' : 'Design your professional digital business card'}
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={loadUserCard}
              className="w-full bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-900/30 rounded-lg mb-4">
                <RefreshCw className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Refresh Data</h3>
              <p className="text-gray-300">Reload your latest card information</p>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/analytics">
              <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-900/30 rounded-lg mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">View Analytics</h3>
                <p className="text-gray-300">Track your card performance and engagement</p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Cards Table */}
        <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Your Cards</h2>
              <Link to="/card/create">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" />
                  New Card
                </Button>
              </Link>
            </div>
          </div>
          
          {error && (
            <div className="p-6 bg-red-900/20 border-b border-red-500/50">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Card
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {userCard ? (
                  <tr className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {userCard.profileImageUrl && (
                          <img
                            src={userCard.profileImageUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover mr-4 border border-gray-600"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">
                            {userCard.fullName || 'Unnamed Card'}
                          </div>
                          <div className="text-sm text-gray-400">
                            {userCard.designation && userCard.companyName 
                              ? `${userCard.designation} at ${userCard.companyName}`
                              : userCard.designation || userCard.companyName || 'No designation'
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {cardStats.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {cardStats.shares}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {cardStats.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {userCard.createdAt 
                        ? new Date(userCard.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Unknown'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to="/card/create">
                          <Button variant="ghost" size="sm" title="Edit Card">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            // Add preview functionality here
                            toast.success('Preview functionality coming soon!');
                          }}
                          title="Preview Card"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            // Add share functionality here
                            navigator.clipboard.writeText(window.location.origin + '/card/' + userCard._id);
                            toast.success('Card link copied to clipboard!');
                          }}
                          title="Share Card"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <PDFDownloadButton
                          card={formatCardDataForPDF(userCard)}
                          variant="button"
                          className="p-2 hover:bg-gray-600 rounded"
                          title="Download PDF"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleDeleteCard}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          title="Delete Card"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">No Cards Found</h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                          You haven't created any digital business cards yet. Create your first card to get started.
                        </p>
                        <Link to="/card/create">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Your First Card
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;