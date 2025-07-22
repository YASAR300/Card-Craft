import React, { useState, useEffect } from 'react';
import { 
  User, School, Users, Heart, Bus, Camera, 
  Plus, Edit2, Trash2, Copy, Save, X, Check,
  Phone, Mail, MapPin, Calendar, Award, Book,
  Palette, Eye, EyeOff, Upload, Image as ImageIcon
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import toast from 'react-hot-toast';

const StudentCardCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [existingCard, setExistingCard] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    studentName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    studentPhone: '',
    studentEmail: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bio: '',
    motto: '',

    // School Info
    schoolName: '',
    schoolAddress: '',
    schoolPhone: '',
    schoolEmail: '',
    schoolWebsite: '',
    principalName: '',

    // Academic Info
    class: '',
    section: '',
    rollNumber: '',
    admissionNumber: '',
    session: '',
    subjects: [],
    achievements: [],
    favoriteSubject: '',
    careerGoal: '',

    // Parents Info
    parents: [],

    // Emergency Contacts
    emergencyContacts: [],

    // Health Info
    bloodGroup: '',
    allergies: [],
    medicalConditions: [],
    emergencyMedicine: '',

    // Transport Info
    busRoute: '',
    busNumber: '',
    pickupPoint: '',
    dropPoint: '',

    // Personal Info
    hobbies: [],
    interests: [],
    skills: [],
    languages: [],

    // Social Links
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',

    // Design
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#8B5CF6',
    theme: 'modern',

    // Privacy Settings
    showPhone: true,
    showEmail: true,
    showAddress: false,
    showParentInfo: true,
  });

  // File states
  const [files, setFiles] = useState({
    profileImage: null,
    schoolLogo: null,
    idCardImage: null,
    galleryImages: [],
    certificateImages: [],
  });

  // Load existing card data
  useEffect(() => {
    loadExistingCard();
  }, []);

  const loadExistingCard = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('http://localhost:5000/api/student-card/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const cardData = await response.json();
        setExistingCard(cardData);
        
        // Map backend data to form
        setFormData({
          studentName: cardData.studentName || '',
          dateOfBirth: cardData.dateOfBirth ? cardData.dateOfBirth.split('T')[0] : '',
          age: cardData.age || '',
          gender: cardData.gender || '',
          studentPhone: cardData.studentPhone || '',
          studentEmail: cardData.studentEmail || '',
          address: cardData.address || '',
          city: cardData.city || '',
          state: cardData.state || '',
          pincode: cardData.pincode || '',
          bio: cardData.bio || '',
          motto: cardData.motto || '',

          schoolName: cardData.schoolName || '',
          schoolAddress: cardData.schoolAddress || '',
          schoolPhone: cardData.schoolPhone || '',
          schoolEmail: cardData.schoolEmail || '',
          schoolWebsite: cardData.schoolWebsite || '',
          principalName: cardData.principalName || '',

          class: cardData.academicInfo?.class || '',
          section: cardData.academicInfo?.section || '',
          rollNumber: cardData.academicInfo?.rollNumber || '',
          admissionNumber: cardData.academicInfo?.admissionNumber || '',
          session: cardData.academicInfo?.session || '',
          subjects: cardData.academicInfo?.subjects || [],
          achievements: cardData.academicInfo?.achievements || [],
          favoriteSubject: cardData.favoriteSubject || '',
          careerGoal: cardData.careerGoal || '',

          parents: cardData.parents || [],
          emergencyContacts: cardData.emergencyContacts || [],

          bloodGroup: cardData.healthInfo?.bloodGroup || '',
          allergies: cardData.healthInfo?.allergies || [],
          medicalConditions: cardData.healthInfo?.medicalConditions || [],
          emergencyMedicine: cardData.healthInfo?.emergencyMedicine || '',

          busRoute: cardData.transportInfo?.busRoute || '',
          busNumber: cardData.transportInfo?.busNumber || '',
          pickupPoint: cardData.transportInfo?.pickupPoint || '',
          dropPoint: cardData.transportInfo?.dropPoint || '',

          hobbies: cardData.hobbies || [],
          interests: cardData.interests || [],
          skills: cardData.skills || [],
          languages: cardData.languages || [],

          instagram: cardData.socialLinks?.instagram || '',
          facebook: cardData.socialLinks?.facebook || '',
          youtube: cardData.socialLinks?.youtube || '',
          linkedin: cardData.socialLinks?.linkedin || '',

          primaryColor: cardData.design?.primaryColor || '#3B82F6',
          secondaryColor: cardData.design?.secondaryColor || '#1E40AF',
          accentColor: cardData.design?.accentColor || '#8B5CF6',
          theme: cardData.design?.theme || 'modern',

          showPhone: cardData.privacySettings?.showPhone !== false,
          showEmail: cardData.privacySettings?.showEmail !== false,
          showAddress: cardData.privacySettings?.showAddress === true,
          showParentInfo: cardData.privacySettings?.showParentInfo !== false,
        });

        // Set existing files
        setFiles({
          profileImage: cardData.profileImageUrl ? { url: cardData.profileImageUrl, existing: true } : null,
          schoolLogo: cardData.schoolLogoUrl ? { url: cardData.schoolLogoUrl, existing: true } : null,
          idCardImage: cardData.idCardImageUrl ? { url: cardData.idCardImageUrl, existing: true } : null,
          galleryImages: cardData.galleryImages?.map(url => ({ url, existing: true })) || [],
          certificateImages: cardData.certificateImages?.map(url => ({ url, existing: true })) || [],
        });

        toast.success('Student card data loaded successfully!');
      } else if (response.status !== 404) {
        throw new Error('Failed to load student card');
      }
    } catch (error) {
      console.error('Error loading student card:', error);
      toast.error('Failed to load existing data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field, value) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleParentAdd = () => {
    setFormData(prev => ({
      ...prev,
      parents: [...prev.parents, {
        name: '',
        phone: '',
        email: '',
        relation: 'Father'
      }]
    }));
  };

  const handleParentUpdate = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      parents: prev.parents.map((parent, i) => 
        i === index ? { ...parent, [field]: value } : parent
      )
    }));
  };

  const handleParentRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      parents: prev.parents.filter((_, i) => i !== index)
    }));
  };

  const handleEmergencyContactAdd = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, {
        name: '',
        phone: '',
        relation: ''
      }]
    }));
  };

  const handleEmergencyContactUpdate = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const handleEmergencyContactRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (field, file) => {
    if (field === 'galleryImages' || field === 'certificateImages') {
      setFiles(prev => ({
        ...prev,
        [field]: [...prev[field], { file, existing: false }]
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [field]: { file, existing: false }
      }));
    }
  };

  const handleFileRemove = (field, index = null) => {
    if (index !== null) {
      setFiles(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.schoolName) {
      toast.error('Student name and school name are required!');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add files
      Object.keys(files).forEach(field => {
        if (field === 'galleryImages' || field === 'certificateImages') {
          files[field].forEach(fileObj => {
            if (fileObj.file) {
              formDataToSend.append(field, fileObj.file);
            }
          });
        } else if (files[field]?.file) {
          formDataToSend.append(field, files[field].file);
        }
      });

      const response = await fetch('http://localhost:5000/api/student-card/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(existingCard ? 'Student card updated successfully!' : 'Student card created successfully!');
        setExistingCard(result.studentCard);
      } else {
        throw new Error('Failed to save student card');
      }
    } catch (error) {
      console.error('Error saving student card:', error);
      toast.error('Failed to save student card');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'school', label: 'School Info', icon: School },
    { id: 'academic', label: 'Academic', icon: Book },
    { id: 'parents', label: 'Parents', icon: Users },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'personal', label: 'Personal', icon: Award },
    { id: 'media', label: 'Media', icon: Camera },
    { id: 'design', label: 'Design', icon: Palette },
  ];

  if (isLoading && !existingCard) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading student card data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <School className="h-8 w-8 mr-3" />
              {existingCard ? 'Update Student Card' : 'Create Student Card'}
            </h1>
            <p className="text-blue-100 mt-2">
              Create a comprehensive digital identity card for students
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-700/50'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Student Name"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                  
                  <Input
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Phone Number"
                    value={formData.studentPhone}
                    onChange={(e) => handleInputChange('studentPhone', e.target.value)}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    value={formData.studentEmail}
                    onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                  />
                </div>

                <Textarea
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                  
                  <Input
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                  />
                </div>

                <Textarea
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />

                <Input
                  label="Personal Motto"
                  value={formData.motto}
                  onChange={(e) => handleInputChange('motto', e.target.value)}
                  placeholder="Your life motto or favorite quote"
                />

                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Profile Picture</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                    {files.profileImage ? (
                      <div className="relative">
                        <img
                          src={files.profileImage.existing ? files.profileImage.url : URL.createObjectURL(files.profileImage.file)}
                          alt="Profile"
                          className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove('profileImage')}
                          className="absolute top-0 right-1/2 transform translate-x-16 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files[0] && handleFileChange('profileImage', e.target.files[0])}
                          className="hidden"
                          id="profileImage"
                        />
                        <label
                          htmlFor="profileImage"
                          className="cursor-pointer text-blue-400 hover:text-blue-300"
                        >
                          Click to upload profile picture
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* School Info Tab */}
            {activeTab === 'school' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">School Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="School Name"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Principal Name"
                    value={formData.principalName}
                    onChange={(e) => handleInputChange('principalName', e.target.value)}
                  />
                  
                  <Input
                    label="School Phone"
                    value={formData.schoolPhone}
                    onChange={(e) => handleInputChange('schoolPhone', e.target.value)}
                  />
                  
                  <Input
                    label="School Email"
                    type="email"
                    value={formData.schoolEmail}
                    onChange={(e) => handleInputChange('schoolEmail', e.target.value)}
                  />
                  
                  <Input
                    label="School Website"
                    value={formData.schoolWebsite}
                    onChange={(e) => handleInputChange('schoolWebsite', e.target.value)}
                  />
                </div>

                <Textarea
                  label="School Address"
                  value={formData.schoolAddress}
                  onChange={(e) => handleInputChange('schoolAddress', e.target.value)}
                  rows={3}
                />

                {/* School Logo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">School Logo</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                    {files.schoolLogo ? (
                      <div className="relative">
                        <img
                          src={files.schoolLogo.existing ? files.schoolLogo.url : URL.createObjectURL(files.schoolLogo.file)}
                          alt="School Logo"
                          className="w-24 h-24 mx-auto object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove('schoolLogo')}
                          className="absolute top-0 right-1/2 transform translate-x-12 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files[0] && handleFileChange('schoolLogo', e.target.files[0])}
                          className="hidden"
                          id="schoolLogo"
                        />
                        <label
                          htmlFor="schoolLogo"
                          className="cursor-pointer text-blue-400 hover:text-blue-300"
                        >
                          Click to upload school logo
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Academic Info Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Academic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Class"
                    value={formData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                  />
                  
                  <Input
                    label="Section"
                    value={formData.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                  />
                  
                  <Input
                    label="Roll Number"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  />
                  
                  <Input
                    label="Admission Number"
                    value={formData.admissionNumber}
                    onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
                  />
                  
                  <Input
                    label="Academic Session"
                    value={formData.session}
                    onChange={(e) => handleInputChange('session', e.target.value)}
                    placeholder="e.g., 2024-25"
                  />
                  
                  <Input
                    label="Favorite Subject"
                    value={formData.favoriteSubject}
                    onChange={(e) => handleInputChange('favoriteSubject', e.target.value)}
                  />
                </div>

                <Input
                  label="Career Goal"
                  value={formData.careerGoal}
                  onChange={(e) => handleInputChange('careerGoal', e.target.value)}
                  placeholder="What do you want to become?"
                />

                {/* Subjects Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Subjects</label>
                  <div className="space-y-2">
                    {formData.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={subject}
                          onChange={(e) => {
                            const newSubjects = [...formData.subjects];
                            newSubjects[index] = e.target.value;
                            handleInputChange('subjects', newSubjects);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('subjects', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add subject"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('subjects', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('subjects', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Achievements Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Achievements</label>
                  <div className="space-y-2">
                    {formData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...formData.achievements];
                            newAchievements[index] = e.target.value;
                            handleInputChange('achievements', newAchievements);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('achievements', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add achievement"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('achievements', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('achievements', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Parents Info Tab */}
            {activeTab === 'parents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Parents Information</h2>
                  <Button
                    type="button"
                    onClick={handleParentAdd}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Parent
                  </Button>
                </div>

                {formData.parents.map((parent, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Parent {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => handleParentRemove(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        value={parent.name}
                        onChange={(e) => handleParentUpdate(index, 'name', e.target.value)}
                      />
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Relation</label>
                        <select
                          value={parent.relation}
                          onChange={(e) => handleParentUpdate(index, 'relation', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>
                      
                      <Input
                        label="Phone"
                        value={parent.phone}
                        onChange={(e) => handleParentUpdate(index, 'phone', e.target.value)}
                      />
                      
                      <Input
                        label="Email"
                        type="email"
                        value={parent.email}
                        onChange={(e) => handleParentUpdate(index, 'email', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                {/* Emergency Contacts */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Emergency Contacts</h3>
                    <Button
                      type="button"
                      onClick={handleEmergencyContactAdd}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </div>

                  {formData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-semibold text-white">Emergency Contact {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => handleEmergencyContactRemove(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          label="Name"
                          value={contact.name}
                          onChange={(e) => handleEmergencyContactUpdate(index, 'name', e.target.value)}
                        />
                        
                        <Input
                          label="Phone"
                          value={contact.phone}
                          onChange={(e) => handleEmergencyContactUpdate(index, 'phone', e.target.value)}
                        />
                        
                        <Input
                          label="Relation"
                          value={contact.relation}
                          onChange={(e) => handleEmergencyContactUpdate(index, 'relation', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Info Tab */}
            {activeTab === 'health' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Health Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Blood Group</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Emergency Medicine"
                    value={formData.emergencyMedicine}
                    onChange={(e) => handleInputChange('emergencyMedicine', e.target.value)}
                    placeholder="Any emergency medication needed"
                  />
                </div>

                {/* Allergies Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Allergies</label>
                  <div className="space-y-2">
                    {formData.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={allergy}
                          onChange={(e) => {
                            const newAllergies = [...formData.allergies];
                            newAllergies[index] = e.target.value;
                            handleInputChange('allergies', newAllergies);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('allergies', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add allergy"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('allergies', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('allergies', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Medical Conditions Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Medical Conditions</label>
                  <div className="space-y-2">
                    {formData.medicalConditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={condition}
                          onChange={(e) => {
                            const newConditions = [...formData.medicalConditions];
                            newConditions[index] = e.target.value;
                            handleInputChange('medicalConditions', newConditions);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('medicalConditions', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add medical condition"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('medicalConditions', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('medicalConditions', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transport Info Tab */}
            {activeTab === 'transport' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Transport Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Bus Route"
                    value={formData.busRoute}
                    onChange={(e) => handleInputChange('busRoute', e.target.value)}
                  />
                  
                  <Input
                    label="Bus Number"
                    value={formData.busNumber}
                    onChange={(e) => handleInputChange('busNumber', e.target.value)}
                  />
                  
                  <Input
                    label="Pickup Point"
                    value={formData.pickupPoint}
                    onChange={(e) => handleInputChange('pickupPoint', e.target.value)}
                  />
                  
                  <Input
                    label="Drop Point"
                    value={formData.dropPoint}
                    onChange={(e) => handleInputChange('dropPoint', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
                
                {/* Hobbies Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Hobbies</label>
                  <div className="space-y-2">
                    {formData.hobbies.map((hobby, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={hobby}
                          onChange={(e) => {
                            const newHobbies = [...formData.hobbies];
                            newHobbies[index] = e.target.value;
                            handleInputChange('hobbies', newHobbies);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('hobbies', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add hobby"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('hobbies', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('hobbies', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interests Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Interests</label>
                  <div className="space-y-2">
                    {formData.interests.map((interest, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={interest}
                          onChange={(e) => {
                            const newInterests = [...formData.interests];
                            newInterests[index] = e.target.value;
                            handleInputChange('interests', newInterests);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('interests', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add interest"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('interests', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('interests', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skills Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Skills</label>
                  <div className="space-y-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...formData.skills];
                            newSkills[index] = e.target.value;
                            handleInputChange('skills', newSkills);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('skills', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add skill"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('skills', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('skills', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Languages Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Languages</label>
                  <div className="space-y-2">
                    {formData.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={language}
                          onChange={(e) => {
                            const newLanguages = [...formData.languages];
                            newLanguages[index] = e.target.value;
                            handleInputChange('languages', newLanguages);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('languages', index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add language"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleArrayAdd('languages', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.parentElement.querySelector('input');
                          handleArrayAdd('languages', input.value);
                          input.value = '';
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Instagram"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="Instagram profile URL"
                  />
                  
                  <Input
                    label="Facebook"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="Facebook profile URL"
                  />
                  
                  <Input
                    label="YouTube"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    placeholder="YouTube channel URL"
                  />
                  
                  <Input
                    label="LinkedIn"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Media & Documents</h2>
                
                {/* ID Card Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Student ID Card</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                    {files.idCardImage ? (
                      <div className="relative">
                        <img
                          src={files.idCardImage.existing ? files.idCardImage.url : URL.createObjectURL(files.idCardImage.file)}
                          alt="ID Card"
                          className="w-48 h-32 mx-auto object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove('idCardImage')}
                          className="absolute top-0 right-1/2 transform translate-x-24 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files[0] && handleFileChange('idCardImage', e.target.files[0])}
                          className="hidden"
                          id="idCardImage"
                        />
                        <label
                          htmlFor="idCardImage"
                          className="cursor-pointer text-blue-400 hover:text-blue-300"
                        >
                          Click to upload ID card image
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Gallery Images</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {files.galleryImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.existing ? image.url : URL.createObjectURL(image.file)}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove('galleryImages', index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        Array.from(e.target.files).forEach(file => {
                          handleFileChange('galleryImages', file);
                        });
                      }}
                      className="hidden"
                      id="galleryImages"
                    />
                    <label
                      htmlFor="galleryImages"
                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                    >
                      Click to add gallery images
                    </label>
                  </div>
                </div>

                {/* Certificate Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Certificates & Awards</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {files.certificateImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.existing ? image.url : URL.createObjectURL(image.file)}
                          alt={`Certificate ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove('certificateImages', index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        Array.from(e.target.files).forEach(file => {
                          handleFileChange('certificateImages', file);
                        });
                      }}
                      className="hidden"
                      id="certificateImages"
                    />
                    <label
                      htmlFor="certificateImages"
                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                    >
                      Click to add certificates
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Design & Privacy</h2>
                
                {/* Color Scheme */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-full h-12 rounded-xl border border-gray-600 bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Secondary Color</label>
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-full h-12 rounded-xl border border-gray-600 bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Accent Color</label>
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-full h-12 rounded-xl border border-gray-600 bg-gray-700"
                    />
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Theme</label>
                  <select
                    value={formData.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="colorful">Colorful</option>
                  </select>
                </div>

                {/* Privacy Settings */}
                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Phone Number</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange('showPhone', !formData.showPhone)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.showPhone ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.showPhone ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Email</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange('showEmail', !formData.showEmail)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.showEmail ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.showEmail ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Address</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange('showAddress', !formData.showAddress)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.showAddress ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.showAddress ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Parent Information</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange('showParentInfo', !formData.showParentInfo)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.showParentInfo ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.showParentInfo ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-700">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {existingCard ? 'Update Student Card' : 'Create Student Card'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCardCreate;