import React, { useState, useEffect, useRef } from 'react';
import { 
  User, GraduationCap, Share2, Video, CreditCard, Building, Palette,
  Phone, Mail, Globe, MapPin, Camera, Upload, X, Plus, Eye, Download,
  Save, ArrowLeft, ArrowRight, Check, Star, Heart, MessageCircle,
  Instagram, Linkedin, Twitter, Facebook, Youtube, ExternalLink,
  ShoppingCart, Package, Play, Image, QrCode, Zap, Clock, Settings,
  Edit3, Sparkles, Layers, Briefcase, Users, Award, Target, Lightbulb,
  Trash2, Edit, Copy, MoreVertical, RefreshCw, AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import PDFDownloadButton from '../components/ui/PDFDownloadButton';
import CardPreview from './CardPreview';
import ProfessionalCardCreate from './ProfessionalCardCreate';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const CardCreate = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cardExists, setCardExists] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    companyName: '',
    primaryPhone: '',
    email: '',
    website: '',
    address: '',
    bio: '',
    studentName: '',
    studentMobile: '',
    bloodGroup: '',
    age: '',
    schoolName: '',
    studentEmail: '',
    parentsEmail: '',
    parentPhones: [],
    schoolAddress: '',
    homeAddress: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    youtube: '',
    whatsapp: '',
    introVideoUrl: '',
    videoTiles: [],
    galleryImages: [],
    paytm: '',
    gpay: '',
    phonepe: '',
    upi: '',
    accHolder: '',
    accNo: '',
    ifsc: '',
    bankName: '',
    established: '',
    aboutUs: '',
    googleReview: '',
    services: [],
    products: [],
    additionalPhones: [],
    reviewLinks: [],
    platformName: '',
    franchiseName: ''
  });

  const [files, setFiles] = useState({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [dragActive, setDragActive] = useState(null);
  const tabsRef = useRef(null);

  // Load existing card data on component mount
  useEffect(() => {
    loadExistingCard();
  }, []);

  const loadExistingCard = async () => {
    try {
      setIsLoading(true);
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
        const cardData = response.data;
        setCardExists(true);
        
        setFormData({
          fullName: cardData.fullName || '',
          designation: cardData.designation || '',
          companyName: cardData.companyName || '',
          primaryPhone: cardData.primaryPhone || '',
          email: cardData.email || '',
          website: cardData.website || '',
          address: cardData.address || '',
          bio: cardData.bio || '',
          studentName: cardData.studentName || '',
          studentMobile: cardData.studentMobile || '',
          bloodGroup: cardData.bloodGroup || '',
          age: cardData.age || '',
          schoolName: cardData.schoolName || '',
          studentEmail: cardData.studentEmail || '',
          parentsEmail: cardData.parentsEmail || '',
          parentPhones: cardData.parentsMobile || [],
          schoolAddress: cardData.schoolAddress || '',
          homeAddress: cardData.homeAddress || '',
          linkedin: cardData.socialLinks?.linkedin || '',
          twitter: cardData.socialLinks?.twitter || '',
          instagram: cardData.socialLinks?.instagram || '',
          facebook: cardData.socialLinks?.facebook || '',
          youtube: cardData.socialLinks?.youtube || '',
          whatsapp: cardData.socialLinks?.whatsapp || '',
          introVideoUrl: cardData.introVideoUrl || '',
          videoTiles: cardData.videoTiles || [],
          galleryImages: cardData.galleryImages?.map(url => ({ name: 'existing', url })) || [],
          paytm: cardData.paymentInfo?.paytm || '',
          gpay: cardData.paymentInfo?.googlePay || '',
          phonepe: cardData.paymentInfo?.phonePe || '',
          upi: cardData.paymentInfo?.upi || '',
          accHolder: cardData.paymentInfo?.bankDetails?.accountName || '',
          accNo: cardData.paymentInfo?.bankDetails?.accountNumber || '',
          ifsc: cardData.paymentInfo?.bankDetails?.ifscCode || '',
          bankName: cardData.paymentInfo?.bankDetails?.bankName || '',
          established: cardData.establishedDate || '',
          aboutUs: cardData.aboutUs || '',
          googleReview: cardData.googleReviewLink || '',
          services: cardData.services?.map(service => service.title || service) || [],
          products: cardData.products || [],
          additionalPhones: cardData.additionalPhones || [],
          reviewLinks: cardData.reviewLinks || [],
          platformName: cardData.platformBranding?.name || '',
          franchiseName: cardData.franchiseBranding?.name || ''
        });

        const existingFiles = {};
        if (cardData.profileImageUrl) {
          existingFiles.profileImageUrl = { url: cardData.profileImageUrl, existing: true };
        }
        if (cardData.companyLogoUrl) {
          existingFiles.companyLogoUrl = { url: cardData.companyLogoUrl, existing: true };
        }
        if (cardData.platformBranding?.logoUrl) {
          existingFiles.platformLogo = { url: cardData.platformBranding.logoUrl, existing: true };
        }
        if (cardData.franchiseBranding?.logoUrl) {
          existingFiles.franchiseLogo = { url: cardData.franchiseBranding.logoUrl, existing: true };
        }
        if (cardData.locationImageUrl) {
          existingFiles.locationImage = { url: cardData.locationImageUrl, existing: true };
        }
        
        setFiles(existingFiles);
        toast.success('Card data loaded successfully!');
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error loading card:', error);
        toast.error('Failed to load existing card data');
      }
      setCardExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User, color: 'bg-blue-500' },
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'social', label: 'Social', icon: Share2, color: 'bg-green-500' },
    { id: 'media', label: 'Media', icon: Video, color: 'bg-red-500' },
    { id: 'payment', label: 'Payment', icon: CreditCard, color: 'bg-yellow-500' },
    { id: 'business', label: 'Business', icon: Building, color: 'bg-indigo-500' },
    { id: 'branding', label: 'Branding', icon: Palette, color: 'bg-pink-500' },
    ...(user && user.subscription && user.subscription.plan ? [
      { id: 'professional', label: 'Professional Card', icon: Briefcase, color: 'bg-teal-500' }
    ] : [])
  ];

  // Auto-save functionality
  useEffect(() => {
    if (!isLoading && cardExists) {
      const timer = setTimeout(() => {
        setIsAutoSaving(true);
        setTimeout(() => setIsAutoSaving(false), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value
    });
  };

  // Individual field operations
  const startEditing = (fieldName, currentValue = '') => {
    setEditingField(fieldName);
    setTempValues({ [fieldName]: currentValue });
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValues({});
  };

  const saveField = (fieldName) => {
    const newValue = tempValues[fieldName];
    if (newValue !== undefined) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: newValue
      }));
      toast.success(`${fieldName} updated successfully`);
    }
    setEditingField(null);
    setTempValues({});
  };

  const deleteField = (fieldName) => {
    if (window.confirm(`Are you sure you want to delete ${fieldName}?`)) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: ''
      }));
      toast.success(`${fieldName} deleted successfully`);
    }
  };

  const duplicateField = (fieldName) => {
    const currentValue = formData[fieldName];
    if (currentValue) {
      navigator.clipboard.writeText(currentValue);
      toast.success(`${fieldName} copied to clipboard`);
    }
  };

  // Array field operations
  const addToArray = (fieldName, value) => {
    if (value && value.trim()) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...prev[fieldName], value.trim()]
      }));
      toast.success(`Added to ${fieldName}`);
      return true;
    }
    return false;
  };

  const updateArrayItem = (fieldName, index, newValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => i === index ? newValue : item)
    }));
    toast.success(`${fieldName} item updated`);
  };

  const deleteFromArray = (fieldName, index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((_, i) => i !== index)
      }));
      toast.success(`${fieldName} item deleted`);
    }
  };

  const duplicateArrayItem = (fieldName, index) => {
    const item = formData[fieldName][index];
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], item]
    }));
    toast.success(`${fieldName} item duplicated`);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'galleryImages') {
      const newImages = Array.from(files).map(file => ({
        name: file.name,
        file
      }));
      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages]
      }));
      toast.success(`${files.length} image(s) uploaded successfully`);
    } else {
      const fieldMapping = {
        'profileImage': 'profileImage',
        'companyLogo': 'companyLogo',
        'platformLogo': 'platformLogo',
        'franchiseLogo': 'franchiseLogo',
        'locationImage': 'locationImage'
      };
      
      const backendFieldName = fieldMapping[name] || name;
      setFiles(prev => ({ ...prev, [backendFieldName]: files[0] }));
      toast.success(`${files[0].name} uploaded successfully`);
    }
  };

  const handleFileUpload = (name, file) => {
    if (name === 'galleryImages') {
      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, { name: file.name, file }]
      }));
      toast.success(`${file.name} uploaded successfully`);
    } else {
      setFiles(prev => ({ ...prev, [name]: file }));
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const deleteFile = (fileName) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fileName];
        return newFiles;
      });
      toast.success(`${fileName} deleted successfully`);
    }
  };

  const deleteGalleryImage = (index) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setFormData(prev => ({
        ...prev,
        galleryImages: prev.galleryImages.filter((_, i) => i !== index)
      }));
      toast.success('Gallery image deleted');
    }
  };

  const handleDrag = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(name);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  };

  const handleDrop = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(name, e.dataTransfer.files[0]);
    }
  };

  const getTabProgress = (tabId) => {
    const tabFields = getTabFields(tabId);
    const filledFields = tabFields.filter(field => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== false;
    });
    return Math.round((filledFields.length / tabFields.length) * 100);
  };

  const getTabFields = (tabId) => {
    const fieldGroups = {
      'basic': ['fullName', 'designation', 'companyName', 'primaryPhone', 'email'],
      'student': ['studentName', 'studentMobile', 'bloodGroup', 'age', 'schoolName'],
      'social': ['linkedin', 'twitter', 'instagram', 'facebook', 'youtube'],
      'media': ['introVideoUrl', 'videoTiles', 'galleryImages'],
      'payment': ['paytm', 'gpay', 'phonepe', 'upi', 'accHolder'],
      'business': ['established', 'aboutUs', 'googleReview', 'services'],
      'branding': ['platformName', 'franchiseName']
    };
    return fieldGroups[tabId] || [];
  };

  const getCurrentTabIndex = () => {
    return tabs.findIndex(tab => tab.id === activeTab);
  };

  const goToNextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let token = localStorage.getItem('token');
    if (!token) {
      const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkZXZlbG9wbWVudC11c2VyIiwiaWF0IjoxNjAwMDAwMDAwfQ.dummy';
      localStorage.setItem('token', dummyToken);
      token = dummyToken;
    }

    const loadingToast = toast.loading(cardExists ? 'Updating your card...' : 'Creating your card...');
    
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'services' || key === 'videoTiles' || key === 'products' || key === 'additionalPhones' || key === 'parentPhones' || key === 'reviewLinks') {
        data.append(key, JSON.stringify(value));
      } else if (key === 'galleryImages') {
        value.forEach((img, index) => {
          if (img.file) {
            data.append('galleryImageFiles', img.file);
          }
        });
      } else {
        data.append(key, value);
      }
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file && !file.existing) {
        if (key === 'profileImageUrl') {
          data.append('profileImageUrl', file);
        } else if (key === 'companyLogoUrl') {
          data.append('companyLogoUrl', file);
        } else {
          data.append(key, file);
        }
      }
    });

    try {
      const res = await axios.post('http://localhost:5000/api/card/add', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(cardExists ? 'Card updated successfully' : 'Card created successfully', { id: loadingToast });
      setCardExists(true);
      // After save, fetch the card to get the _id
      const cardRes = await axios.get('http://localhost:5000/api/card/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (cardRes.data && cardRes.data._id) {
        // Update previewCard in localStorage with _id
        const preview = localStorage.getItem('previewCard');
        let previewObj = {};
        try { previewObj = preview ? JSON.parse(preview) : {}; } catch {}
        previewObj._id = cardRes.data._id;
        localStorage.setItem('previewCard', JSON.stringify(previewObj));
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to save card', { id: loadingToast });
    }
  };

  const handlePreview = () => {
    // Try to get _id from backend if not present
    let previewId = undefined;
    try {
      const userCard = JSON.parse(localStorage.getItem('previewCard'));
      if (userCard && userCard._id) previewId = userCard._id;
    } catch {}
    localStorage.setItem('previewCard', JSON.stringify({
      personalInfo: {
        name: formData.fullName,
        designation: formData.designation,
        company: formData.companyName,
        phone: formData.primaryPhone,
        email: formData.email,
        bio: formData.bio,
        profileImage: files.profileImageUrl ? (files.profileImageUrl.existing ? files.profileImageUrl.url : URL.createObjectURL(files.profileImageUrl)) : '',
        companyLogo: files.companyLogoUrl ? (files.companyLogoUrl.existing ? files.companyLogoUrl.url : URL.createObjectURL(files.companyLogoUrl)) : '',
        address: formData.address || '',
        website: formData.website || ''
      },
      socialLinks: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        instagram: formData.instagram,
        facebook: formData.facebook,
        youtube: formData.youtube,
        whatsapp: formData.whatsapp || formData.primaryPhone
      },
      services: formData.services.map(service => ({
        id: Math.random(),
        title: service,
        description: `Professional ${service} services`,
        image: '',
        link: '#'
      })),
      products: formData.products,
      media: {
        introVideo: formData.introVideoUrl,
        videoTiles: formData.videoTiles,
        gallery: formData.galleryImages.map(img => img.file ? URL.createObjectURL(img.file) : img.url).filter(Boolean)
      },
      paymentInfo: {
        paytm: formData.paytm,
        googlePay: formData.gpay,
        phonePe: formData.phonepe,
        upi: formData.upi,
        bankDetails: {
          accountName: formData.accHolder,
          accountNumber: formData.accNo,
          ifscCode: formData.ifsc,
          bankName: formData.bankName
        }
      },
      studentInfo: {
        name: formData.studentName,
        mobile: formData.studentMobile,
        bloodGroup: formData.bloodGroup,
        age: formData.age,
        school: formData.schoolName
      },
      businessInfo: {
        established: formData.established,
        aboutUs: formData.aboutUs,
        googleReview: formData.googleReview
      },
      branding: {
        platformName: formData.platformName,
        franchiseName: formData.franchiseName
      },
      design: {
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF'
      },
      ...(previewId ? { _id: previewId } : {})
    }));
    setShowPreview(true);
  };

  // Enhanced Field Component with CRUD operations
  const EditableField = ({ 
    fieldName, 
    label, 
    type = 'text', 
    placeholder, 
    icon: Icon = User,
    required = false,
    multiline = false
  }) => {
    const isEditing = editingField === fieldName;
    const value = formData[fieldName];
    const hasValue = value && value.toString().trim() !== '';

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-2 text-blue-400" />
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </div>
          
          {hasValue && !isEditing && (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => startEditing(fieldName, value)}
                className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all"
                title="Edit"
              >
                <Edit className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => duplicateField(fieldName)}
                className="p-1 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded transition-all"
                title="Copy"
              >
                <Copy className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => deleteField(fieldName)}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                title="Delete"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          )}
        </label>

        {isEditing ? (
          <div className="space-y-3">
            {multiline ? (
              <Textarea
                value={tempValues[fieldName] || ''}
                onChange={(e) => setTempValues(prev => ({ ...prev, [fieldName]: e.target.value }))}
                placeholder={placeholder}
                rows={4}
              />
            ) : (
              <Input
                type={type}
                value={tempValues[fieldName] || ''}
                onChange={(e) => setTempValues(prev => ({ ...prev, [fieldName]: e.target.value }))}
                placeholder={placeholder}
              />
            )}
            <div className="flex space-x-2">
              <Button
                type="button"
                size="sm"
                onClick={() => saveField(fieldName)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={cancelEditing}
              >
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            {multiline ? (
              <Textarea
                name={fieldName}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                rows={4}
              />
            ) : (
              <Input
                name={fieldName}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
              />
            )}
            
            {!hasValue && (
              <button
                type="button"
                onClick={() => startEditing(fieldName, '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Quick Add"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Enhanced Array Field Component
  const EditableArrayField = ({ 
    fieldName, 
    label, 
    placeholder, 
    icon: Icon = Plus,
    itemType = 'text'
  }) => {
    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const items = formData[fieldName] || [];

    const handleAdd = () => {
      if (addToArray(fieldName, newItem)) {
        setNewItem('');
      }
    };

    const startEditingItem = (index, value) => {
      setEditingIndex(index);
      setEditValue(value);
    };

    const saveEditingItem = () => {
      updateArrayItem(fieldName, editingIndex, editValue);
      setEditingIndex(null);
      setEditValue('');
    };

    const cancelEditingItem = () => {
      setEditingIndex(null);
      setEditValue('');
    };

    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-200 flex items-center">
          <Icon className="h-4 w-4 mr-2 text-blue-400" />
          {label} ({items.length} items)
        </label>
        
        {/* Add new item */}
        <div className="flex space-x-3">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button 
            type="button" 
            onClick={handleAdd} 
            size="sm"
            className="px-4 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Display items */}
        {items.length > 0 && (
          <div className="space-y-3">
            <div className="grid gap-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl border border-gray-600/50 hover:bg-gray-600/50 transition-all duration-200 group">
                  {editingIndex === index ? (
                    <div className="flex-1 flex items-center space-x-3">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && saveEditingItem()}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={saveEditingItem}
                        className="bg-green-600 hover:bg-green-700 px-3"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={cancelEditingItem}
                        className="px-3"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-200 flex-1">{item}</span>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button
                          type="button"
                          onClick={() => startEditingItem(index, item)}
                          className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all"
                          title="Edit"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateArrayItem(fieldName, index)}
                          className="p-1 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded transition-all"
                          title="Duplicate"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFromArray(fieldName, index)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Enhanced File Upload Component
  const FileUploadArea = ({ name, label, accept = "image/*", multiple = false }) => {
    const isDragActive = dragActive === name;
    const hasFile = files[name] || (name === 'galleryImages' && formData.galleryImages.length > 0);
    const fileInfo = files[name];

    return (
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Upload className="h-4 w-4 mr-2 text-blue-400" />
            {label}
          </div>
          {hasFile && (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => document.getElementById(name).click()}
                className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-all"
                title="Replace"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => deleteFile(name)}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                title="Delete"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          )}
        </label>
        
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 group ${
            isDragActive 
              ? 'border-blue-400 bg-blue-500/10 scale-[1.02] shadow-lg shadow-blue-500/20' 
              : hasFile
                ? 'border-green-400 bg-green-500/10 shadow-lg shadow-green-500/20'
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50 hover:scale-[1.01]'
          }`}
          onDragEnter={(e) => handleDrag(e, name)}
          onDragLeave={(e) => handleDrag(e, name)}
          onDragOver={(e) => handleDrag(e, name)}
          onDrop={(e) => handleDrop(e, name)}
        >
          <input
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
            id={name}
          />
          
          {hasFile ? (
            <div className="space-y-4">
              {fileInfo?.existing && fileInfo?.url && (
                <div className="mb-4">
                  <img
                    src={fileInfo.url}
                    alt="Current file"
                    className="w-20 h-20 object-cover rounded-xl mx-auto border border-gray-600"
                  />
                </div>
              )}
              <div className="relative">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-green-300 font-semibold text-lg">
                  {name === 'galleryImages' 
                    ? `${formData.galleryImages.length} image(s) uploaded`
                    : fileInfo?.existing ? 'Current file loaded' : 'File uploaded successfully'
                  }
                </p>
                <p className="text-green-400/70 text-sm mt-1">
                  {name === 'galleryImages' 
                    ? 'Ready for gallery'
                    : fileInfo?.name || fileInfo?.url || 'File ready'
                  }
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(name).click()}
                className="border-green-400/50 text-green-300 hover:bg-green-500/10"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {fileInfo?.existing ? 'Replace File' : 'Change File'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                  isDragActive ? 'bg-blue-500/20 scale-110' : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                }`}>
                  <Upload className={`h-8 w-8 transition-all duration-300 ${
                    isDragActive ? 'text-blue-400 scale-110' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                </div>
                {isDragActive && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse" />
                )}
              </div>
              <div>
                <p className="text-gray-200 font-medium text-lg mb-2">
                  {isDragActive ? 'Drop files here!' : 'Drag & drop files here'}
                </p>
                <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById(name).click()}
                  className="border-gray-500 hover:border-blue-400 hover:text-blue-300 transition-all duration-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {accept.includes('image') ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV, AVI up to 50MB'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowPreview(false)}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Edit
              </Button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span>Live Preview</span>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-gray-600 hover:border-blue-400">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <PDFDownloadButton
                    card={JSON.parse(localStorage.getItem('previewCard') || '{}')}
                    name="franchiseLogo" 
                    variant="dropdown"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardPreview />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Card</h2>
          <p className="text-gray-300">Please wait while we fetch your data...</p>
          <div className="mt-4">
            <div className="w-48 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FileUploadArea name="profileImage" label="Profile Image" />
              <FileUploadArea name="companyLogo" label="Company Logo" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
                required
              />
              <EditableField
                fieldName="designation"
                label="Designation"
                placeholder="e.g., Software Engineer"
                icon={Briefcase}
                required
              />
            </div>

            <EditableField
              fieldName="companyName"
              label="Company Name"
              placeholder="Your company name"
              icon={Building}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="primaryPhone"
                label="Primary Phone"
                type="tel"
                placeholder="+91 9876543210"
                icon={Phone}
                required
              />
              <EditableField
                fieldName="email"
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="website"
                label="Website"
                type="url"
                placeholder="https://yourwebsite.com"
                icon={Globe}
              />
              <EditableField
                fieldName="address"
                label="Address"
                placeholder="Your business address"
                icon={MapPin}
              />
            </div>

            <EditableField
              fieldName="bio"
              label="Bio/About"
              placeholder="Tell people about yourself..."
              icon={User}
              multiline
            />

            <EditableArrayField
              fieldName="additionalPhones"
              label="Additional Phone Numbers"
              placeholder="Enter additional phone number"
              icon={Phone}
            />
          </div>
        );

      case 'student':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 mr-3" />
                Student Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  fieldName="studentName"
                  label="Student Name"
                  placeholder="Student's full name"
                  icon={User}
                />
                <EditableField
                  fieldName="studentMobile"
                  label="Student Mobile"
                  type="tel"
                  placeholder="+91 9876543210"
                  icon={Phone}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <EditableField
                  fieldName="bloodGroup"
                  label="Blood Group"
                  placeholder="A+, B+, O+, etc."
                  icon={Heart}
                />
                <EditableField
                  fieldName="age"
                  label="Age"
                  type="number"
                  placeholder="18"
                  icon={User}
                />
                <EditableField
                  fieldName="schoolName"
                  label="School Name"
                  placeholder="School/College name"
                  icon={GraduationCap}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="studentEmail"
                  label="Student Email"
                  type="email"
                  placeholder="student@email.com"
                  icon={Mail}
                />
                <EditableField
                  fieldName="parentsEmail"
                  label="Parents Email"
                  type="email"
                  placeholder="parent@email.com"
                  icon={Mail}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="schoolAddress"
                  label="School Address"
                  placeholder="School/College address"
                  icon={MapPin}
                />
                <EditableField
                  fieldName="homeAddress"
                  label="Home Address"
                  placeholder="Home address"
                  icon={MapPin}
                />
              </div>

              <div className="mt-6">
                <EditableArrayField
                  fieldName="parentPhones"
                  label="Parent Phone Numbers"
                  placeholder="Enter parent phone number"
                  icon={Phone}
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="linkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                icon={Linkedin}
              />
              <EditableField
                fieldName="twitter"
                label="Twitter"
                placeholder="https://twitter.com/username"
                icon={Twitter}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="instagram"
                label="Instagram"
                placeholder="https://instagram.com/username"
                icon={Instagram}
              />
              <EditableField
                fieldName="facebook"
                label="Facebook"
                placeholder="https://facebook.com/username"
                icon={Facebook}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="youtube"
                label="YouTube"
                placeholder="https://youtube.com/channel/..."
                icon={Youtube}
              />
              <EditableField
                fieldName="whatsapp"
                label="WhatsApp"
                type="tel"
                placeholder="+91 9876543210"
                icon={MessageCircle}
              />
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-8">
            <EditableField
              fieldName="introVideoUrl"
              label="Introduction Video URL"
              placeholder="https://youtube.com/watch?v=..."
              icon={Play}
            />

            <EditableArrayField
              fieldName="videoTiles"
              label="Video Tiles"
              placeholder="Enter video URL"
              icon={Play}
            />

            <FileUploadArea 
              name="galleryImages" 
              label="Gallery Images" 
              accept="image/*" 
              multiple={true} 
            />

            {formData.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <Image className="h-5 w-5 mr-2 text-purple-400" />
                    Gallery Preview ({formData.galleryImages.length} images)
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all gallery images?')) {
                        setFormData(prev => ({ ...prev, galleryImages: [] }));
                        toast.success('Gallery cleared');
                      }
                    }}
                    className="text-red-400 border-red-400/50 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.galleryImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.file ? URL.createObjectURL(img.file) : img.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl border border-gray-600 group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => deleteGalleryImage(index)}
                          className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-yellow-300 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 mr-3" />
                Digital Payment Methods
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  fieldName="paytm"
                  label="Paytm"
                  type="tel"
                  placeholder="+91 9876543210"
                  icon={CreditCard}
                />
                <EditableField
                  fieldName="gpay"
                  label="Google Pay"
                  type="tel"
                  placeholder="+91 9876543210"
                  icon={CreditCard}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="phonepe"
                  label="PhonePe"
                  type="tel"
                  placeholder="+91 9876543210"
                  icon={CreditCard}
                />
                <EditableField
                  fieldName="upi"
                  label="UPI ID"
                  placeholder="username@paytm"
                  icon={CreditCard}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-300 mb-6 flex items-center">
                <Building className="h-6 w-6 mr-3" />
                Bank Account Details
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  fieldName="accHolder"
                  label="Account Holder Name"
                  placeholder="Full name as per bank account"
                  icon={User}
                />
                <EditableField
                  fieldName="accNo"
                  label="Account Number"
                  placeholder="1234567890"
                  icon={CreditCard}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="ifsc"
                  label="IFSC Code"
                  placeholder="SBIN0001234"
                  icon={Building}
                />
                <EditableField
                  fieldName="bankName"
                  label="Bank Name"
                  placeholder="State Bank of India"
                  icon={Building}
                />
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="established"
                label="Established Year"
                type="number"
                placeholder="2020"
                icon={Clock}
              />
              <EditableField
                fieldName="googleReview"
                label="Google Review Rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.5"
                icon={Star}
              />
            </div>

            <EditableField
              fieldName="aboutUs"
              label="About Us"
              placeholder="Tell people about your business..."
              icon={Building}
              multiline
            />

            <EditableArrayField
              fieldName="services"
              label="Services Offered"
              placeholder="Enter service name"
              icon={Briefcase}
            />

            <EditableArrayField
              fieldName="products"
              label="Products"
              placeholder="Enter product name"
              icon={Package}
            />

            <EditableArrayField
              fieldName="reviewLinks"
              label="Review Links"
              placeholder="Enter review platform URL"
              icon={Star}
            />
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FileUploadArea name="platformLogo" label="Platform Logo" />
              <FileUploadArea name="franchiseLogo" label="Franchise Logo" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="platformName"
                label="Platform Name"
                placeholder="Your platform/brand name"
                icon={Palette}
              />
              <EditableField
                fieldName="franchiseName"
                label="Franchise Name"
                placeholder="Franchise or parent company name"
                icon={Building}
              />
            </div>

            <FileUploadArea name="locationImage" label="Location Image" />
          </div>
        );

      case 'professional':
        if (user && user.subscription && user.subscription.plan) {
          return <ProfessionalCardCreate />;
        } else {
          return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h2 className="text-xl font-bold text-white mb-2">Professional Card Locked</h2>
              <p className="text-gray-400">You need an active subscription to access the Professional Card features.</p>
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Modern Header */}
      <div className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {cardExists ? 'Edit Digital Card' : 'Create Digital Card'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {cardExists ? 'Update your professional digital business card' : 'Build your professional digital business card'}
                </p>
              </div>
              {isAutoSaving && (
                <div className="flex items-center text-green-400 text-sm bg-green-500/10 px-3 py-2 rounded-full border border-green-500/20">
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Auto-saving...
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handlePreview} 
                variant="outline"
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Card
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                <Save className="h-4 w-4 mr-2" />
                {cardExists ? 'Update Card' : 'Save Card'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Modern Vertical Tabs */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sticky top-28">
              <nav className="space-y-3" ref={tabsRef}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const progress = getTabProgress(tab.id);
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-5 text-left rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105 border border-blue-400/50'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-102 border border-transparent hover:border-gray-600/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20 shadow-lg' 
                            : `${tab.color} group-hover:scale-110`
                        }`}>
                          <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-base">{tab.label}</div>
                          <div className={`text-xs mt-1 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                            {progress}% complete
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`w-16 h-2 rounded-full ${isActive ? 'bg-white/30' : 'bg-gray-600'}`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isActive ? 'bg-white' : 'bg-blue-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        {progress === 100 && (
                          <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Enhanced Navigation Buttons */}
              <div className="flex space-x-3 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousTab}
                  disabled={getCurrentTabIndex() === 0}
                  className="flex-1 border-gray-600 hover:border-gray-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToNextTab}
                  disabled={getCurrentTabIndex() === tabs.length - 1}
                  className="flex-1 border-gray-600 hover:border-gray-500"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
                <div className="mb-10">
                  <div className="flex items-center space-x-4 mb-4">
                    {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || User, {
                      className: "h-8 w-8 text-blue-400"
                    })}
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-gray-400 mt-1">
                        Complete this section to build your card
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${getTabProgress(activeTab)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  {renderTabContent()}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCreate;