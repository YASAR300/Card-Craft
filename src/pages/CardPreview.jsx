import React, { useEffect, useState } from 'react';
import { 
  Phone, Mail, MapPin, Globe, Share2, Download, 
  Star, MessageCircle, Navigation, Heart, ShoppingCart,
  Calendar, Building, CreditCard, QrCode, ExternalLink,
  Instagram, Linkedin, Twitter, Facebook, Youtube,
  Send, User, Clock, MapIcon, Play, Eye, ArrowLeft,
  Award, Users, Briefcase, GraduationCap, Palette,
  Video, Image as ImageIcon, X, Check, Sparkles, ChevronDown, Copy, CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import PDFDownloadButton from '../components/ui/PDFDownloadButton';
import axios from 'axios';

const CardPreview = () => {
  const [cardData, setCardData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 5,
    message: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stats, setStats] = useState({ views: 0, downloads: 0, shares: 0 });

  // Helper to get cardId from localStorage.previewCard (if present)
  function getCardId() {
    try {
      const preview = JSON.parse(localStorage.getItem('previewCard'));
      if (preview && preview._id) return preview._id;
      return null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    // Get card data from localStorage (set by CardCreate component)
    const previewData = localStorage.getItem('previewCard');
    if (previewData) {
      const data = JSON.parse(previewData);
      setCardData(data);
      generateQRCode();
    }
    // Increment view count and fetch stats
    const cardId = getCardId();
    if (cardId) {
      axios.post(`http://localhost:5000/api/card/${cardId}/view`).catch(()=>{});
      axios.get(`http://localhost:5000/api/card/${cardId}/stats`).then(res => setStats(res.data)).catch(()=>{});
    }
  }, []);

  const generateQRCode = async () => {
    try {
      // Dynamic import for QRCode
      const QRCode = await import('qrcode');
      const cardUrl = window.location.href;
      const qrUrl = await QRCode.default.toDataURL(cardUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  if (!cardData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Preview Data</h2>
          <p className="text-gray-300">Please create a card first to preview it.</p>
        </div>
      </div>
    );
  }

  // Download handler (increment download count)
  const handleDownload = () => {
    const cardId = getCardId();
    if (cardId) {
      axios.post(`http://localhost:5000/api/card/${cardId}/download`).then(()=>{
        setStats(s => ({ ...s, downloads: s.downloads + 1 }));
      }).catch(()=>{});
    }
    // Trigger actual download logic if any
  };

  const handleShare = () => {
    setIsSharing(true);
    const shareUrl = window.location.href;
    const shareText = `Check out ${cardData.personalInfo?.name}'s digital business card`;
    const cardId = getCardId();
    if (cardId) {
      axios.post(`http://localhost:5000/api/card/${cardId}/share`).then(()=>{
        setStats(s => ({ ...s, shares: s.shares + 1 }));
      }).catch(()=>{});
    }
    if (navigator.share) {
      navigator.share({
        title: `${cardData.personalInfo?.name}'s Digital Card`,
        text: shareText,
        url: shareUrl
      }).finally(() => setIsSharing(false));
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedText('Link copied!');
      setTimeout(() => {
        setCopiedText('');
        setIsSharing(false);
      }, 2000);
    }
  };

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(`${type} copied!`);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleCall = () => {
    if (cardData.personalInfo?.phone) {
      window.open(`tel:${cardData.personalInfo.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (cardData.socialLinks?.whatsapp) {
      window.open(`https://wa.me/${cardData.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`);
    }
  };

  const handleEmail = () => {
    if (cardData.personalInfo?.email) {
      window.open(`mailto:${cardData.personalInfo.email}`);
    }
  };

  const handleWebsite = () => {
    if (cardData.personalInfo?.website) {
      window.open(cardData.personalInfo.website, '_blank');
    }
  };

  const handleSocialLink = (platform, url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would submit the feedback to your backend
    console.log('Feedback submitted:', feedbackForm);
    alert('Thank you for your feedback!');
    setFeedbackForm({
      name: '',
      email: '',
      phone: '',
      rating: 5,
      message: ''
    });
  };

  // --- Live Stats UI ---
  // Show at the top of the card
  const StatsBar = () => (
    <div className="flex justify-center gap-8 mb-8 mt-4">
      <div className="flex items-center gap-2 text-blue-400 bg-blue-900/30 px-4 py-2 rounded-full">
        <Eye className="h-5 w-5" />
        <span className="font-bold">{stats.views}</span>
        <span className="text-xs ml-1">Views</span>
      </div>
      <div className="flex items-center gap-2 text-green-400 bg-green-900/30 px-4 py-2 rounded-full">
        <Download className="h-5 w-5" />
        <span className="font-bold">{stats.downloads}</span>
        <span className="text-xs ml-1">Downloads</span>
      </div>
      <div className="flex items-center gap-2 text-pink-400 bg-pink-900/30 px-4 py-2 rounded-full">
        <Share2 className="h-5 w-5" />
        <span className="font-bold">{stats.shares}</span>
        <span className="text-xs ml-1">Shares</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden" id="card-preview-content">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-400 to-yellow-300 rounded-full blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-400 to-emerald-300 rounded-full blur-3xl opacity-15 transform translate-x-1/4 translate-y-1/4 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-l from-green-500 to-teal-400 rounded-full blur-2xl opacity-10 transform translate-x-1/2 animate-pulse delay-500"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>

      {/* Top navigation */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-3">
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-0.5 bg-white transform rotate-45 absolute transition-all duration-300 group-hover:bg-orange-400"></div>
              <div className="w-6 h-0.5 bg-white transform -rotate-45 absolute transition-all duration-300 group-hover:bg-orange-400"></div>
              <div className="w-4 h-4 border-l-2 border-b-2 border-white transform rotate-45 absolute translate-x-1 translate-y-0.5 transition-all duration-300 group-hover:border-orange-400"></div>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
          <span className="text-white font-bold text-sm">B</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center px-6 pb-6">
        <StatsBar />
        {/* Logo section (Company Logo) */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-gray-100">
          <div className="flex flex-col items-center">
            {/* Company Logo */}
            {cardData.personalInfo?.companyLogo && (
              <img
                src={cardData.personalInfo.companyLogo}
                alt="Company Logo"
                className="w-20 h-20 object-cover rounded-xl mb-2 border border-gray-200"
              />
            )}
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              {cardData.personalInfo?.company?.substring(0, 3).toUpperCase() || 'BST'}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
              {cardData.personalInfo?.company || 'BOUTIQUE TIMES GRILL'}
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          {cardData.personalInfo?.profileImage && (
            <img
              src={cardData.personalInfo.profileImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-orange-400 shadow-lg"
            />
          )}
        </div>

        {/* Company info */}
        <div className="text-center mb-10">
          <h1 className="text-white text-2xl font-bold mb-3 tracking-wide drop-shadow-lg">
            {cardData.personalInfo?.company || 'FIVEPCMIRACLE PRIVATE LIMITED'}
          </h1>
          <h2 className="text-transparent bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-xl font-semibold mb-2">
            {cardData.personalInfo?.name || 'MOHAMMED ABDUL RAFEY ANSARI'}
          </h2>
          <p className="text-gray-300 text-base font-medium">
            {cardData.personalInfo?.designation || 'CEO & MANAGING DIRECTOR'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4 mb-10">
          <button 
            onClick={handleWhatsApp}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 shadow-md"
          >
            <MessageCircle size={18} className="animate-pulse" />
            <span className="text-sm font-semibold">WhatsApp</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 shadow-md">
            <Navigation size={18} className="animate-pulse" />
            <span className="text-sm font-semibold">Direction</span>
          </button>
          <button 
            onClick={handleEmail}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 shadow-md"
          >
            <Mail size={18} className="animate-pulse" />
            <span className="text-sm font-semibold">Mail</span>
          </button>
        </div>

        {/* Website button */}
        <button 
          onClick={handleWebsite}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full flex items-center space-x-3 mb-10 transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 shadow-lg"
        >
          <Globe size={20} className="animate-spin" style={{animationDuration: '3s'}} />
          <span className="text-base font-semibold">Visit Website</span>
        </button>

        {/* Contact information */}
        <div className="w-full max-w-sm space-y-5 mb-10">
          {/* Phone numbers */}
          {cardData.personalInfo?.phone && (
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.personalInfo.phone, 'Phone')}>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Phone size={18} className="text-white group-hover:animate-pulse" />
              </div>
              <span className="text-white text-lg font-medium group-hover:text-orange-300 transition-colors duration-300">{cardData.personalInfo.phone}</span>
              <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          {cardData.personalInfo?.alternatePhone && (
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.personalInfo.alternatePhone, 'Phone')}>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Phone size={18} className="text-white group-hover:animate-pulse" />
              </div>
              <span className="text-white text-lg font-medium group-hover:text-orange-300 transition-colors duration-300">{cardData.personalInfo.alternatePhone}</span>
              <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Email */}
          {cardData.personalInfo?.email && (
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.personalInfo.email, 'Email')}>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Mail size={18} className="text-white group-hover:animate-pulse" />
              </div>
              <span className="text-white text-base font-medium group-hover:text-orange-300 transition-colors duration-300 break-all">{cardData.personalInfo.email}</span>
              <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Address */}
          {cardData.personalInfo?.address && (
            <div className="flex items-start space-x-4 group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.personalInfo.address, 'Address')}>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mt-1 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <MapPin size={18} className="text-white group-hover:animate-pulse" />
              </div>
              <div className="text-white text-base leading-relaxed group-hover:text-orange-300 transition-colors duration-300 flex-1">
                {cardData.personalInfo.address}
              </div>
              <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
            </div>
          )}
        </div>

        {/* Phone input */}
        <div className="w-full max-w-sm mb-6">
          <input
            type="tel"
            placeholder="+91"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-4 rounded-xl border-2 border-transparent outline-none placeholder-gray-500 focus:border-orange-400 focus:bg-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium"
          />
        </div>

        {/* Share button */}
        <button 
          onClick={handleShare}
          disabled={isSharing}
          className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:from-gray-500 disabled:to-gray-400 text-white px-10 py-4 rounded-xl flex items-center space-x-3 mb-6 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          <Share2 size={20} className={isSharing ? 'animate-spin' : ''} />
          <span className="text-lg font-semibold">{isSharing ? 'Sharing...' : 'Share Card'}</span>
        </button>

        {/* Copy notification */}
        {copiedText && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2 animate-bounce">
            <CheckCircle size={16} />
            <span className="font-semibold">{copiedText}</span>
          </div>
        )}

        {/* Language selector */}
        <div className="relative mb-10 group">
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 outline-none appearance-none cursor-pointer pr-10 pl-4 py-3 rounded-xl hover:border-orange-400 focus:border-orange-400 transition-all duration-300 text-lg font-medium"
          >
            <option value="English" className="bg-gray-800">English</option>
            <option value="Hindi" className="bg-gray-800">Hindi</option>
            <option value="Telugu" className="bg-gray-800">Telugu</option>
          </select>
          <ChevronDown size={20} className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none group-hover:text-orange-400 transition-colors duration-300" />
        </div>

        {/* Bottom action buttons */}
        <div className="flex space-x-4 w-full max-w-sm mb-10">
          <button onClick={handleDownload} className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
            <Download size={18} className="animate-bounce" />
            <span className="text-sm font-semibold">Save Contact</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <Share2 size={18} className="animate-pulse" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>

        {/* Share My Digital Card Section */}
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h3 className="text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold mb-2">Share My Digital Card</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto"></div>
          </div>

          {/* Sharing options */}
          <div className="space-y-4 mb-8">
            <button 
              onClick={handleWhatsApp}
              className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-green-400/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">WhatsApp</span>
            </button>
            
            <button className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-blue-400/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">SMS</span>
            </button>
            
            <button 
              onClick={() => handleSocialLink('facebook', cardData.socialLinks?.facebook)}
              className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-blue-600/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <Facebook size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">Facebook</span>
            </button>
            
            <button 
              onClick={() => handleSocialLink('twitter', cardData.socialLinks?.twitter)}
              className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-blue-400/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Twitter size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">Twitter</span>
            </button>
            
            <button 
              onClick={() => handleSocialLink('instagram', cardData.socialLinks?.instagram)}
              className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-pink-500/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Instagram size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">Instagram</span>
            </button>
            
            <button 
              onClick={() => handleSocialLink('linkedin', cardData.socialLinks?.linkedin)}
              className="w-full flex items-center space-x-4 text-white hover:bg-white/10 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/10 hover:border-blue-500/50"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Linkedin size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold">LinkedIn</span>
            </button>
          </div>

          {/* Social media icons at bottom */}
          <div className="flex justify-center space-x-6 mb-10">
            <div 
              onClick={() => handleSocialLink('facebook', cardData.socialLinks?.facebook)}
              className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Facebook size={24} className="text-white" />
            </div>
            <div 
              onClick={() => handleSocialLink('twitter', cardData.socialLinks?.twitter)}
              className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Twitter size={24} className="text-white" />
            </div>
            <div 
              onClick={() => handleSocialLink('instagram', cardData.socialLinks?.instagram)}
              className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Instagram size={24} className="text-white" />
            </div>
            <div 
              onClick={() => handleSocialLink('linkedin', cardData.socialLinks?.linkedin)}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Linkedin size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="w-full max-w-sm mb-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
            <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-xl font-bold mb-6">
              Scan QR Code to go to Visiting Card
            </h3>
            <div className="flex justify-center mb-6">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-40 h-40 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                />
              ) : (
                <div className="w-40 h-40 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-white text-xs font-mono leading-none">
                    ████ ██ ████<br/>
                    █  █ ██ █  █<br/>
                    █ ██ ██ ██ █<br/>
                    ████ ██ ████<br/>
                    ██ █ ██ █ ██<br/>
                    █ ██ ██ ██ █<br/>
                    ████ ██ ████
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium">Tap to scan with your camera</p>
          </div>
        </div>

        {/* Platform & Franchise Logos */}
        {(cardData.branding?.platformLogo || cardData.branding?.franchiseLogo) && (
          <div className="flex justify-center space-x-6 mb-8">
            {cardData.branding?.platformLogo && (
              <img
                src={cardData.branding.platformLogo}
                alt="Platform Logo"
                className="w-16 h-16 object-contain rounded-xl border border-gray-200"
              />
            )}
            {cardData.branding?.franchiseLogo && (
              <img
                src={cardData.branding.franchiseLogo}
                alt="Franchise Logo"
                className="w-16 h-16 object-contain rounded-xl border border-gray-200"
              />
            )}
          </div>
        )}

        {/* Location Image */}
        {cardData.branding?.locationImage && (
          <div className="flex justify-center mb-8">
            <img
              src={cardData.branding.locationImage}
              alt="Location"
              className="w-32 h-32 object-cover rounded-xl border border-gray-200"
            />
          </div>
        )}

        {/* Business Info Section */}
        {(cardData.businessInfo?.aboutUs || cardData.businessInfo?.established || cardData.businessInfo?.googleReview) && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-6 text-center">Business Info</h3>
              {cardData.businessInfo?.aboutUs && (
                <div className="mb-4">
                  <h4 className="text-gray-800 font-bold mb-2 text-lg">About Us:</h4>
                  <p className="text-gray-600 text-base font-medium">{cardData.businessInfo.aboutUs}</p>
                </div>
              )}
                {cardData.businessInfo?.established && (
                <div className="mb-4">
                  <h4 className="text-gray-800 font-bold mb-2 text-lg">Established:</h4>
                    <p className="text-gray-600 text-base font-medium">{cardData.businessInfo.established}</p>
                  </div>
                )}
              {cardData.businessInfo?.googleReview && (
                <div className="mb-4">
                  <h4 className="text-gray-800 font-bold mb-2 text-lg">Google Review:</h4>
                  <p className="text-gray-600 text-base font-medium">{cardData.businessInfo.googleReview}</p>
              </div>
              )}
            </div>
          </div>
        )}

        {/* Services Section */}
        {cardData.services && cardData.services.length > 0 && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-8 text-center">Our Services</h3>
              <div className="grid grid-cols-2 gap-6">
                {cardData.services.map((service, index) => (
                  <div key={index} className="border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div className="w-full h-20 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg mb-3 flex items-center justify-center shadow-inner">
                      <span className="text-orange-600 text-sm font-semibold">{service.title || service}</span>
                    </div>
                    <h4 className="text-gray-800 font-bold text-sm mb-2 leading-tight">
                      {service.description || service.title || service}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        {cardData.products && cardData.products.length > 0 && (
        <div className="w-full max-w-sm mb-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-8 text-center">Our Products</h3>
              <div className="grid grid-cols-2 gap-6">
                {cardData.products.map((product, index) => (
                  <div key={index} className="border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div className="w-full h-20 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg mb-3 flex items-center justify-center shadow-inner">
                      <span className="text-orange-600 text-sm font-semibold">{product.name || product}</span>
            </div>
                    <h4 className="text-gray-800 font-bold text-sm mb-2 leading-tight">
                      {product.description || product.name || product}
                    </h4>
              </div>
                ))}
              </div>
              </div>
              </div>
        )}

        {/* Review Links Section */}
        {cardData.reviewLinks && cardData.reviewLinks.length > 0 && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-8 text-center">Review Links</h3>
              <div className="space-y-3">
                {cardData.reviewLinks.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                    {link}
                  </a>
                ))}
          </div>
        </div>
          </div>
        )}

        {/* Gallery Section (Multiple Images) */}
        {cardData.media?.gallery && cardData.media.gallery.length > 0 && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-6 text-center">Image Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cardData.media.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl border border-gray-200 cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Info Section */}
        {(cardData.paymentInfo?.paytm || cardData.paymentInfo?.googlePay || cardData.paymentInfo?.phonePe) && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-6 text-center">Payment Info</h3>
              
              <div className="space-y-4 mb-8">
                {cardData.paymentInfo?.paytm && (
                  <div className="group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.paymentInfo.paytm, 'Paytm')}>
                    <p className="text-gray-600 text-base font-medium">Paytm</p>
                    <p className="text-gray-800 font-bold text-lg group-hover:text-orange-500 transition-colors duration-300">{cardData.paymentInfo.paytm}</p>
                  </div>
                )}
                
                {cardData.paymentInfo?.googlePay && (
                  <div className="group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.paymentInfo.googlePay, 'Google Pay')}>
                    <p className="text-gray-600 text-base font-medium">Google Pay</p>
                    <p className="text-gray-800 font-bold text-lg group-hover:text-orange-500 transition-colors duration-300">{cardData.paymentInfo.googlePay}</p>
                  </div>
                )}
                
                {cardData.paymentInfo?.phonePe && (
                  <div className="group cursor-pointer" onClick={() => handleCopyToClipboard(cardData.paymentInfo.phonePe, 'PhonePe')}>
                    <p className="text-gray-600 text-base font-medium">PhonePe</p>
                    <p className="text-gray-800 font-bold text-lg group-hover:text-orange-500 transition-colors duration-300">{cardData.paymentInfo.phonePe}</p>
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                  <span className="text-blue-600 font-bold text-lg">
                    {cardData.personalInfo?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'MA'}
                  </span>
                </div>
                <p className="text-gray-800 font-bold text-lg">{cardData.personalInfo?.name || 'Mohd Abdul Rafey Ansari'}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="text-blue-600 font-bold text-xl">paytm</span>
                  <span className="text-red-500 text-xl animate-pulse">❤️</span>
                  <span className="text-orange-500 font-bold text-xl">UPI</span>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Payment QR Code"
                    className="w-48 h-48 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-white text-xs font-mono leading-none">
                      ████ ██ ████<br/>
                      █  █ ██ █  █<br/>
                      █ ██ ██ ██ █<br/>
                      ████ ██ ████<br/>
                      ██ █ ██ █ ██<br/>
                      █ ██ ██ ██ █<br/>
                      ████ ██ ████<br/>
                      █  █ ██ █  █<br/>
                      ████ ██ ████
                    </div>
                  </div>
                )}
              </div>

              <p className="text-center text-gray-600 text-base font-medium">📱 {cardData.paymentInfo?.paytm || '8977771110'}@ptyes</p>
            </div>
          </div>
        )}

        {/* UPI Payment Section */}
        {cardData.paymentInfo?.bankDetails?.accountName && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                  <span className="text-gray-700 font-bold text-base">
                    {cardData.personalInfo?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'MA'}
                  </span>
                </div>
                <span className="text-gray-800 font-bold text-lg">{cardData.paymentInfo.bankDetails.accountName}</span>
              </div>
              
              <div className="flex justify-center mb-6">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="UPI QR Code"
                    className="w-48 h-48 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center relative shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-white text-xs font-mono leading-none">
                      ████ ██ ████<br/>
                      █  █ ██ █  █<br/>
                      █ ██ ██ ██ █<br/>
                      ████ ██ ████<br/>
                      ██ █ ██ █ ██<br/>
                      █ ██ ██ ██ █<br/>
                      ████ ██ ████<br/>
                      █  █ ██ █  █<br/>
                      ████ ██ ████
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">G</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-center text-gray-600 text-base mb-3 font-medium">UPI ID: {cardData.paymentInfo?.upiId || 'rafeyqhr.default@okicici'}</p>
              <p className="text-center text-gray-600 text-base mb-8 font-medium">Scan to pay with any UPI app</p>

              <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-sm font-bold">₹</span>
                  </div>
                  <span className="text-purple-400 font-bold text-xl">PhonePe</span>
                </div>
                <p className="text-purple-400 text-base mb-4 font-semibold">ACCEPTED HERE</p>
                <p className="text-white text-sm mb-4 font-medium">Scan & Pay Using PhonePe App</p>
                
                <div className="flex justify-center">
                  <div className="w-28 h-28 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-black text-xs font-mono leading-none">
                      ████ ██<br/>
                      █  █ ██<br/>
                      █ ██ ██<br/>
                      ████ ██
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        <div className="w-full max-w-sm mb-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
            <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-6 text-center">Feedback</h3>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="mb-6">
                <p className="text-gray-600 text-base mb-4 font-medium">Select Star Rating</p>
                <div className="flex justify-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => {
                        setRating(star);
                        setFeedbackForm(prev => ({ ...prev, rating: star }));
                      }}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className={`text-3xl transition-all duration-300 transform hover:scale-125 ${
                        star <= (hoveredStar || rating) ? 'text-yellow-400 drop-shadow-lg' : 'text-gray-300'
                      } hover:text-yellow-400`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your name"
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email id"
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your contact"
                  value={feedbackForm.phone}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
                />
                <textarea
                  placeholder="Your feedback"
                  rows={4}
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 resize-none transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold mb-6 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
              >
                Submit Feedback
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mb-6 font-medium">
              Note for privacy and security reasons we do not store your contact details.
            </p>

            <div>
              <h4 className="text-orange-500 font-bold mb-4 text-lg">Latest feedback</h4>
              <div className="border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-lg animate-pulse">⭐</span>
                  ))}
                </div>
                <p className="text-base text-gray-600 mb-2 font-medium">5/5 Rating</p>
                <p className="text-blue-600 text-base font-bold mb-2">By Shanthi</p>
                <p className="text-gray-500 text-sm font-medium">Date: 12/Jan/2025 02:26PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Address Section */}
        {cardData.personalInfo?.address && (
          <div className="w-full max-w-sm mb-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-6 text-center">Location Address</h3>
              
              <p className="text-blue-600 text-base mb-6 font-medium">
                Showing results {cardData.personalInfo.address}
              </p>

              <div className="relative mb-6">
                <div className="w-full h-56 bg-green-100 rounded-xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Map placeholder with location marker */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-300 to-emerald-300">
                    <div className="absolute top-4 left-4 text-sm text-gray-700 font-medium">
                      <div className="mb-1">🏥 Nearby Locations</div>
                      <div className="mb-1">AREA 1</div>
                      <div className="mb-1">AREA 2</div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 text-sm text-gray-700 font-medium">
                      <div className="mb-1">NEARBY</div>
                      <div className="mb-1">PLACES</div>
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <MapPin size={20} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 text-xs text-gray-600 font-medium">
                      <div>Google</div>
                      <div>Map data ©2025</div>
                    </div>
                    
                    <div className="absolute top-2 right-2">
                      <button className="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                        <span className="text-gray-600 text-xl font-bold">+</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 text-blue-600 text-base hover:underline font-semibold hover:text-blue-700 transition-colors duration-300">
                  View larger map
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Us Section */}
        <div className="w-full max-w-sm mb-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
            <h3 className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-2xl font-bold mb-8 text-center">Contact Us</h3>
            
            <div className="space-y-5 mb-8">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
              />
              <input
                type="tel"
                placeholder="Enter Your Mobile No"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
              />
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
              />
              <textarea
                placeholder="Enter your Message or Query"
                rows={5}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-orange-500 resize-none transition-all duration-300 text-base font-medium hover:border-orange-300 focus:shadow-lg"
              ></textarea>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold mb-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg">
              Send!
            </button>

            <div className="bg-gradient-to-r from-black to-gray-900 text-center py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <p className="text-white text-base font-semibold">
                🔴 Create your own Digital Visiting Card
              </p>
            </div>
          </div>
        </div>

        {/* PDF Download Section - Hidden in normal view, only for functionality */}
        <div className="hidden no-pdf">
          <PDFDownloadButton
            card={cardData}
            elementId="card-preview-content"
            variant="dropdown"
            className="w-full"
          />
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-lg">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-16 right-0 bg-gray-800/90 text-white rounded-full p-4 hover:bg-gray-700 transition-all duration-300 z-10 no-pdf transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPreview;