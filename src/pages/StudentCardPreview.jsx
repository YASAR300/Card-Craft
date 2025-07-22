import React, { useEffect, useState } from 'react';
import { 
  Phone, Mail, MapPin, Globe, Share2, Download, 
  Star, MessageCircle, Navigation, Heart, Calendar,
  Building, User, Clock, MapIcon, Play, Eye, ArrowLeft,
  Award, Users, Briefcase, GraduationCap, Palette,
  Video, Image as ImageIcon, X, Check, Sparkles,
  School, Bus, BookOpen, Trophy, Languages, Smile
} from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const StudentCardPreview = () => {
  const [cardData, setCardData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Get student card data from localStorage (set by StudentCardCreate component)
    const previewData = localStorage.getItem('previewStudentCard');
    if (previewData) {
      const data = JSON.parse(previewData);
      setCardData(data);
      generateQRCode();
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
            <School className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Preview Data</h2>
          <p className="text-gray-300">Please create a student card first to preview it.</p>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${cardData.studentName}'s student card`;
    
    if (navigator.share) {
      navigator.share({
        title: `${cardData.studentName}'s Student Card`,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleCall = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`);
    }
  };

  const handleEmail = (email) => {
    if (email) {
      window.open(`mailto:${email}`);
    }
  };

  const handleSocialLink = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md mx-auto bg-gray-800/95 backdrop-blur-sm min-h-screen shadow-2xl" id="student-card-preview-content">
        {/* Enhanced Profile Section */}
        <div className="relative overflow-hidden">
          <div 
            className="h-56 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative"
            style={{
              background: `linear-gradient(135deg, ${cardData.design?.primaryColor || '#3B82F6'}, ${cardData.design?.secondaryColor || '#1E40AF'})`
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>
          
          {/* Profile Picture */}
          <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
            <div className="w-36 h-36 rounded-full border-4 border-gray-700 bg-gray-700 overflow-hidden shadow-2xl ring-4 ring-white/10">
              {cardData.profileImageUrl ? (
                <img
                  src={cardData.profileImageUrl}
                  alt={cardData.studentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                  <User className="h-20 w-20 text-gray-300" />
                </div>
              )}
            </div>
          </div>

          {/* School Logo */}
          {cardData.schoolLogoUrl && (
            <div className="absolute top-6 right-6">
              <img
                src={cardData.schoolLogoUrl}
                alt="School Logo"
                className="w-14 h-14 rounded-xl object-cover bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
              />
            </div>
          )}

          {/* Student Badge */}
          <div className="absolute top-6 left-6">
            <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-xs font-medium">Student</span>
            </div>
          </div>
        </div>

        {/* Enhanced Basic Info */}
        <div className="pt-24 px-6 pb-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
            {cardData.studentName || 'Student Name'}
          </h2>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            {cardData.class && (
              <p className="text-lg text-blue-400 font-semibold">
                Class {cardData.class}
              </p>
            )}
            {cardData.section && (
              <p className="text-lg text-purple-400 font-semibold">
                Section {cardData.section}
              </p>
            )}
          </div>
          
          <p className="text-lg text-gray-300 font-medium mb-6 flex items-center justify-center">
            <School className="h-4 w-4 mr-2" />
            {cardData.schoolName || 'School Name'}
          </p>
          
          {/* Bio */}
          {cardData.bio && (
            <div className="bg-gray-700/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-600/30">
              <p className="text-gray-300 text-sm leading-relaxed">
                {cardData.bio}
              </p>
            </div>
          )}

          {/* Motto */}
          {cardData.motto && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-blue-500/20">
              <p className="text-blue-300 text-sm italic leading-relaxed">
                "{cardData.motto}"
              </p>
            </div>
          )}

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {cardData.age && (
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <Calendar className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Age</p>
                <p className="text-lg font-bold text-white">{cardData.age}</p>
              </div>
            )}
            
            {cardData.rollNumber && (
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <BookOpen className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Roll No.</p>
                <p className="text-lg font-bold text-white">{cardData.rollNumber}</p>
              </div>
            )}
            
            {cardData.bloodGroup && (
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Blood Group</p>
                <p className="text-lg font-bold text-white">{cardData.bloodGroup}</p>
              </div>
            )}
            
            {cardData.session && (
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Session</p>
                <p className="text-lg font-bold text-white">{cardData.session}</p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          {(cardData.studentPhone || cardData.studentEmail || cardData.address) && (
            <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-gray-600/50 shadow-xl">
              <h3 className="font-bold text-white mb-5 flex items-center text-lg">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                Contact Information
              </h3>
              <div className="space-y-4">
                {cardData.studentPhone && cardData.privacySettings?.showPhone !== false && (
                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-600/30 transition-all duration-200 group cursor-pointer" onClick={() => handleCall(cardData.studentPhone)}>
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{cardData.studentPhone}</span>
                  </div>
                )}
                
                {cardData.studentEmail && cardData.privacySettings?.showEmail !== false && (
                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-600/30 transition-all duration-200 group cursor-pointer" onClick={() => handleEmail(cardData.studentEmail)}>
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-gray-300 font-medium break-all">{cardData.studentEmail}</span>
                  </div>
                )}
                
                {cardData.address && cardData.privacySettings?.showAddress === true && (
                  <div className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-600/30 transition-all duration-200 group">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors mt-0.5">
                      <MapPin className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{cardData.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Academic Information */}
          {(cardData.subjects?.length > 0 || cardData.achievements?.length > 0 || cardData.favoriteSubject || cardData.careerGoal) && (
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-blue-500/20 shadow-xl">
              <h3 className="font-bold text-blue-300 mb-5 flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-3" />
                Academic Information
              </h3>
              
              {cardData.favoriteSubject && (
                <div className="mb-4">
                  <p className="text-xs text-blue-400 font-medium mb-1">Favorite Subject</p>
                  <p className="text-white font-semibold">{cardData.favoriteSubject}</p>
                </div>
              )}
              
              {cardData.careerGoal && (
                <div className="mb-4">
                  <p className="text-xs text-blue-400 font-medium mb-1">Career Goal</p>
                  <p className="text-white font-semibold">{cardData.careerGoal}</p>
                </div>
              )}
              
              {cardData.subjects?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-blue-400 font-medium mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.subjects.map((subject, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {cardData.achievements?.length > 0 && (
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-2">Achievements</p>
                  <div className="space-y-2">
                    {cardData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-white text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Parents Information */}
          {cardData.parents?.length > 0 && cardData.privacySettings?.showParentInfo !== false && (
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-green-500/20 shadow-xl">
              <h3 className="font-bold text-green-300 mb-5 flex items-center text-lg">
                <Users className="h-5 w-5 mr-3" />
                Parents Information
              </h3>
              <div className="space-y-4">
                {cardData.parents.map((parent, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{parent.name}</h4>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        {parent.relation}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {parent.phone && cardData.privacySettings?.showPhone !== false && (
                        <p className="text-gray-300 text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-2" />
                          {parent.phone}
                        </p>
                      )}
                      {parent.email && cardData.privacySettings?.showEmail !== false && (
                        <p className="text-gray-300 text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-2" />
                          {parent.email}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Information */}
          {(cardData.bloodGroup || cardData.allergies?.length > 0 || cardData.medicalConditions?.length > 0 || cardData.emergencyMedicine) && (
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-red-500/20 shadow-xl">
              <h3 className="font-bold text-red-300 mb-5 flex items-center text-lg">
                <Heart className="h-5 w-5 mr-3" />
                Health Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {cardData.bloodGroup && (
                  <div>
                    <p className="text-xs text-red-400 font-medium mb-1">Blood Group</p>
                    <p className="text-white font-semibold">{cardData.bloodGroup}</p>
                  </div>
                )}
                {cardData.emergencyMedicine && (
                  <div>
                    <p className="text-xs text-red-400 font-medium mb-1">Emergency Medicine</p>
                    <p className="text-white font-semibold">{cardData.emergencyMedicine}</p>
                  </div>
                )}
              </div>
              
              {cardData.allergies?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-red-400 font-medium mb-2">Allergies</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.allergies.map((allergy, index) => (
                      <span key={index} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {cardData.medicalConditions?.length > 0 && (
                <div>
                  <p className="text-xs text-red-400 font-medium mb-2">Medical Conditions</p>
                  <div className="space-y-1">
                    {cardData.medicalConditions.map((condition, index) => (
                      <p key={index} className="text-white text-sm">• {condition}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Transport Information */}
          {(cardData.busRoute || cardData.busNumber || cardData.pickupPoint || cardData.dropPoint) && (
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-yellow-500/20 shadow-xl">
              <h3 className="font-bold text-yellow-300 mb-5 flex items-center text-lg">
                <Bus className="h-5 w-5 mr-3" />
                Transport Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {cardData.busRoute && (
                  <div>
                    <p className="text-xs text-yellow-400 font-medium mb-1">Bus Route</p>
                    <p className="text-white font-semibold">{cardData.busRoute}</p>
                  </div>
                )}
                {cardData.busNumber && (
                  <div>
                    <p className="text-xs text-yellow-400 font-medium mb-1">Bus Number</p>
                    <p className="text-white font-semibold">{cardData.busNumber}</p>
                  </div>
                )}
                {cardData.pickupPoint && (
                  <div>
                    <p className="text-xs text-yellow-400 font-medium mb-1">Pickup Point</p>
                    <p className="text-white font-semibold">{cardData.pickupPoint}</p>
                  </div>
                )}
                {cardData.dropPoint && (
                  <div>
                    <p className="text-xs text-yellow-400 font-medium mb-1">Drop Point</p>
                    <p className="text-white font-semibold">{cardData.dropPoint}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Personal Information */}
          {(cardData.hobbies?.length > 0 || cardData.interests?.length > 0 || cardData.skills?.length > 0 || cardData.languages?.length > 0) && (
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-purple-500/20 shadow-xl">
              <h3 className="font-bold text-purple-300 mb-5 flex items-center text-lg">
                <Smile className="h-5 w-5 mr-3" />
                Personal Information
              </h3>
              
              {cardData.hobbies?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-purple-400 font-medium mb-2">Hobbies</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.hobbies.map((hobby, index) => (
                      <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {cardData.interests?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-purple-400 font-medium mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.interests.map((interest, index) => (
                      <span key={index} className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {cardData.skills?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-purple-400 font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {cardData.languages?.length > 0 && (
                <div>
                  <p className="text-xs text-purple-400 font-medium mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {cardData.languages.map((language, index) => (
                      <span key={index} className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-medium">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          {cardData.galleryImages && cardData.galleryImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <ImageIcon className="h-6 w-6 mr-3 text-purple-400" />
                Gallery ({cardData.galleryImages.length} photos)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {cardData.galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-28 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105 border border-gray-600 shadow-lg"
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {cardData.certificateImages && cardData.certificateImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-yellow-400" />
                Certificates & Awards ({cardData.certificateImages.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cardData.certificateImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Certificate ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105 border border-gray-600 shadow-lg"
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contacts */}
          {cardData.emergencyContacts?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Phone className="h-6 w-6 mr-3 text-red-400" />
                Emergency Contacts
              </h3>
              <div className="space-y-4">
                {cardData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{contact.name}</h4>
                        <p className="text-red-300 text-sm">{contact.relation}</p>
                      </div>
                      <button
                        onClick={() => handleCall(contact.phone)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">{contact.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(cardData.instagram || cardData.facebook || cardData.youtube || cardData.linkedin) && (
            <div className="mb-8">
              <h3 className="font-bold text-white mb-6 text-left flex items-center text-lg">
                <Share2 className="h-5 w-5 mr-3 text-blue-400" />
                Social Media
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {cardData.instagram && (
                  <button
                    onClick={() => handleSocialLink(cardData.instagram)}
                    className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-105 border border-pink-500/20 hover:border-pink-400/40 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-5 w-5 text-pink-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 flex-1 text-left">Instagram</span>
                  </button>
                )}
                
                {cardData.facebook && (
                  <button
                    onClick={() => handleSocialLink(cardData.facebook)}
                    className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300 hover:scale-105 border border-blue-500/20 hover:border-blue-400/40 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 flex-1 text-left">Facebook</span>
                  </button>
                )}
                
                {cardData.youtube && (
                  <button
                    onClick={() => handleSocialLink(cardData.youtube)}
                    className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300 hover:scale-105 border border-red-500/20 hover:border-red-400/40 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 flex-1 text-left">YouTube</span>
                  </button>
                )}
                
                {cardData.linkedin && (
                  <button
                    onClick={() => handleSocialLink(cardData.linkedin)}
                    className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl hover:from-blue-600/20 hover:to-blue-700/20 transition-all duration-300 hover:scale-105 border border-blue-600/20 hover:border-blue-500/40 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 flex-1 text-left">LinkedIn</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Share Section */}
        <div className="text-center py-8 border-t border-gray-600/50 mx-6">
          <h4 className="font-bold text-white mb-6 text-lg">Share This Student Card</h4>
          {qrCodeUrl && (
            <div className="inline-block p-6 bg-white rounded-2xl mb-6 shadow-xl">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-28 h-28 mx-auto"
              />
            </div>
          )}
          <p className="text-sm text-gray-300 mb-8">Scan QR Code to view this student card</p>
          
          <div className="flex space-x-4 justify-center">
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-gray-600 hover:border-blue-400 hover:text-blue-300 py-3"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Card
            </Button>
            <Button
              onClick={() => window.open(`https://wa.me/?text=Check out my student card: ${window.location.href}`, '_blank')}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 flex-1 py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center py-8 bg-gray-700/30 text-xs text-gray-400 border-t border-gray-600/50">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
            <p className="font-semibold">Powered by CardCraft</p>
          </div>
          <p>Digital Student Card Platform</p>
          <p className="mt-2">© 2024 All rights reserved</p>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-gray-800/80 text-white rounded-full p-3 hover:bg-gray-700 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCardPreview;