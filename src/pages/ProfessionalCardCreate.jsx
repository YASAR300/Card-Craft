import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Briefcase, Share2, Video, CreditCard, Building, Palette,
  Phone, Mail, Globe, MapPin, Camera, Upload, X, Plus, Eye, Download,
  Save, ArrowLeft, ArrowRight, Check, Star, Heart, MessageCircle,
  Instagram, Linkedin, Twitter, Facebook, Youtube, ExternalLink,
  ShoppingCart, Package, Play, Image, QrCode, Zap, Clock, Settings,
  Edit3, Sparkles, Layers, Users, Award, Target, Lightbulb,
  Trash2, Edit, Copy, MoreVertical, RefreshCw, AlertCircle, Calendar,
  FileText, Code, Presentation, Trophy, UserCheck, Link
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import PDFDownloadButton from '../components/ui/PDFDownloadButton';
import CardPreview from './CardPreview';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProfessionalCardCreate = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cardExists, setCardExists] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    designation: '',
    company: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    
    // Professional URLs
    appointmentUrl: '',
    partnerContact: '',
    more2earnUrl: '',
    customerSupportContact: '',
    portfolioUrl: '',
    linkedinUrl: '',
    calendlyUrl: '',
    
    // Business Content
    services: [],
    products: [],
    projects: [],
    customLinks: [],
    
    // Business Information
    businessInfo: {
      established: '',
      teamSize: '',
      experience: '',
      location: '',
      industry: '',
      specialization: '',
      companyType: '',
      revenue: '',
      clients: ''
    },
    
    // Social Links
    socialLinks: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
      youtube: '',
      github: '',
      behance: '',
      dribbble: '',
      website: ''
    },
    
    // Credentials
    certifications: [],
    awards: [],
    teamMembers: [],
    
    // Design
    design: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#8B5CF6',
      theme: 'professional'
    }
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

      const response = await axios.get('http://localhost:5000/api/professional-card/me', {
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
          company: cardData.company || '',
          bio: cardData.bio || '',
          email: cardData.email || '',
          phone: cardData.phone || '',
          website: cardData.website || '',
          appointmentUrl: cardData.appointmentUrl || '',
          partnerContact: cardData.partnerContact || '',
          more2earnUrl: cardData.more2earnUrl || '',
          customerSupportContact: cardData.customerSupportContact || '',
          portfolioUrl: cardData.portfolioUrl || '',
          linkedinUrl: cardData.linkedinUrl || '',
          calendlyUrl: cardData.calendlyUrl || '',
          services: cardData.services || [],
          products: cardData.products || [],
          projects: cardData.projects || [],
          customLinks: cardData.customLinks || [],
          businessInfo: {
            established: cardData.businessInfo?.established || '',
            teamSize: cardData.businessInfo?.teamSize || '',
            experience: cardData.businessInfo?.experience || '',
            location: cardData.businessInfo?.location || '',
            industry: cardData.businessInfo?.industry || '',
            specialization: cardData.businessInfo?.specialization || '',
            companyType: cardData.businessInfo?.companyType || '',
            revenue: cardData.businessInfo?.revenue || '',
            clients: cardData.businessInfo?.clients || ''
          },
          socialLinks: {
            linkedin: cardData.socialLinks?.linkedin || '',
            twitter: cardData.socialLinks?.twitter || '',
            instagram: cardData.socialLinks?.instagram || '',
            facebook: cardData.socialLinks?.facebook || '',
            youtube: cardData.socialLinks?.youtube || '',
            github: cardData.socialLinks?.github || '',
            behance: cardData.socialLinks?.behance || '',
            dribbble: cardData.socialLinks?.dribbble || '',
            website: cardData.socialLinks?.website || ''
          },
          certifications: cardData.certifications || [],
          awards: cardData.awards || [],
          teamMembers: cardData.teamMembers || [],
          design: {
            primaryColor: cardData.design?.primaryColor || '#3B82F6',
            secondaryColor: cardData.design?.secondaryColor || '#1E40AF',
            accentColor: cardData.design?.accentColor || '#8B5CF6',
            theme: cardData.design?.theme || 'professional'
          }
        });

        const existingFiles = {};
        if (cardData.profileImageUrl) {
          existingFiles.profileImage = { url: cardData.profileImageUrl, existing: true };
        }
        if (cardData.companyLogoUrl) {
          existingFiles.companyLogo = { url: cardData.companyLogoUrl, existing: true };
        }
        if (cardData.introVideoUrl) {
          existingFiles.introVideo = { url: cardData.introVideoUrl, existing: true };
        }
        if (cardData.qrImages && cardData.qrImages.length > 0) {
          existingFiles.qrImages = cardData.qrImages.map(url => ({ url, existing: true }));
        }
        if (cardData.portfolioImages && cardData.portfolioImages.length > 0) {
          existingFiles.portfolioImages = cardData.portfolioImages.map(url => ({ url, existing: true }));
        }
        if (cardData.certificateImages && cardData.certificateImages.length > 0) {
          existingFiles.certificateImages = cardData.certificateImages.map(url => ({ url, existing: true }));
        }
        
        setFiles(existingFiles);
        toast.success('Professional card data loaded successfully!');
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error loading professional card:', error);
        toast.error('Failed to load existing professional card data');
      }
      setCardExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User, color: 'bg-blue-500' },
    { id: 'professional', label: 'Professional', icon: Briefcase, color: 'bg-purple-500' },
    { id: 'services', label: 'Services', icon: Settings, color: 'bg-green-500' },
    { id: 'products', label: 'Products', icon: Package, color: 'bg-orange-500' },
    { id: 'projects', label: 'Projects', icon: Code, color: 'bg-red-500' },
    { id: 'social', label: 'Social', icon: Share2, color: 'bg-pink-500' },
    { id: 'media', label: 'Media', icon: Video, color: 'bg-indigo-500' },
    { id: 'credentials', label: 'Credentials', icon: Award, color: 'bg-yellow-500' },
    { id: 'team', label: 'Team', icon: Users, color: 'bg-teal-500' },
    { id: 'design', label: 'Design', icon: Palette, color: 'bg-violet-500' }
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
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? e.target.checked : value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? e.target.checked : value
      });
    }
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
      if (fieldName.includes('.')) {
        const [parent, child] = fieldName.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: newValue
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [fieldName]: newValue
        }));
      }
      toast.success(`${fieldName} updated successfully`);
    }
    setEditingField(null);
    setTempValues({});
  };

  const deleteField = (fieldName) => {
    if (window.confirm(`Are you sure you want to delete ${fieldName}?`)) {
      if (fieldName.includes('.')) {
        const [parent, child] = fieldName.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: ''
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [fieldName]: ''
        }));
      }
      toast.success(`${fieldName} deleted successfully`);
    }
  };

  const duplicateField = (fieldName) => {
    const currentValue = fieldName.includes('.') 
      ? formData[fieldName.split('.')[0]][fieldName.split('.')[1]]
      : formData[fieldName];
    if (currentValue) {
      navigator.clipboard.writeText(currentValue);
      toast.success(`${fieldName} copied to clipboard`);
    }
  };

  // Array field operations
  const addToArray = (fieldName, value) => {
    if (value && (typeof value === 'string' ? value.trim() : value)) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...prev[fieldName], typeof value === 'string' ? value.trim() : value]
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
      [fieldName]: [...prev[fieldName], { ...item }]
    }));
    toast.success(`${fieldName} item duplicated`);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'qrImages' || name === 'portfolioImages' || name === 'certificateImages' || 
        name === 'productImages' || name === 'projectImages' || name === 'serviceImages' ||
        name === 'teamImages' || name === 'demoVideos' || name === 'testimonialVideos') {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        file
      }));
      setFiles(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), ...newFiles]
      }));
      toast.success(`${files.length} file(s) uploaded successfully`);
    } else {
      setFiles(prev => ({ ...prev, [name]: files[0] }));
      toast.success(`${files[0].name} uploaded successfully`);
    }
  };

  const handleFileUpload = (name, file) => {
    if (name === 'qrImages' || name === 'portfolioImages' || name === 'certificateImages' ||
        name === 'productImages' || name === 'projectImages' || name === 'serviceImages' ||
        name === 'teamImages' || name === 'demoVideos' || name === 'testimonialVideos') {
      setFiles(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), { name: file.name, file }]
      }));
    } else {
      setFiles(prev => ({ ...prev, [name]: file }));
    }
    toast.success(`${file.name} uploaded successfully`);
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

  const deleteFileFromArray = (arrayName, index) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
      toast.success('File deleted successfully');
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
      const value = getFieldValue(field);
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== false && value !== null && value !== undefined;
    });
    return Math.round((filledFields.length / tabFields.length) * 100);
  };

  const getFieldValue = (fieldName) => {
    if (fieldName.includes('.')) {
      const [parent, child] = fieldName.split('.');
      return formData[parent]?.[child];
    }
    return formData[fieldName];
  };

  const getTabFields = (tabId) => {
    const fieldGroups = {
      'basic': ['fullName', 'designation', 'company', 'email', 'phone'],
      'professional': ['appointmentUrl', 'portfolioUrl', 'linkedinUrl', 'businessInfo.industry', 'businessInfo.experience'],
      'services': ['services'],
      'products': ['products'],
      'projects': ['projects'],
      'social': ['socialLinks.linkedin', 'socialLinks.twitter', 'socialLinks.instagram', 'socialLinks.facebook'],
      'media': ['introVideoUrl'],
      'credentials': ['certifications', 'awards'],
      'team': ['teamMembers'],
      'design': ['design.primaryColor', 'design.theme']
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

    const loadingToast = toast.loading(cardExists ? 'Updating your professional card...' : 'Creating your professional card...');
    
    const data = new FormData();
    
    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    // Add files
    Object.entries(files).forEach(([key, file]) => {
      if (Array.isArray(file)) {
        file.forEach((f) => {
          if (f.file && !f.existing) {
            data.append(key, f.file);
          }
        });
      } else if (file && !file.existing) {
        data.append(key, file);
      }
    });

    try {
      const res = await axios.post('http://localhost:5000/api/professional-card/add', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(cardExists ? 'Professional card updated successfully' : 'Professional card created successfully', { id: loadingToast });
      setCardExists(true);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to save professional card', { id: loadingToast });
    }
  };

  const handlePreview = () => {
    localStorage.setItem('previewProfessionalCard', JSON.stringify({
      personalInfo: {
        name: formData.fullName,
        designation: formData.designation,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        bio: formData.bio,
        profileImage: files.profileImage ? (files.profileImage.existing ? files.profileImage.url : URL.createObjectURL(files.profileImage)) : '',
        companyLogo: files.companyLogo ? (files.companyLogo.existing ? files.companyLogo.url : URL.createObjectURL(files.companyLogo)) : '',
        website: formData.website || ''
      },
      professionalInfo: {
        appointmentUrl: formData.appointmentUrl,
        portfolioUrl: formData.portfolioUrl,
        linkedinUrl: formData.linkedinUrl,
        calendlyUrl: formData.calendlyUrl
      },
      socialLinks: formData.socialLinks,
      services: formData.services,
      products: formData.products,
      projects: formData.projects,
      businessInfo: formData.businessInfo,
      certifications: formData.certifications,
      awards: formData.awards,
      teamMembers: formData.teamMembers,
      design: formData.design,
      media: {
        introVideo: formData.introVideoUrl,
        portfolioImages: files.portfolioImages?.map(img => img.file ? URL.createObjectURL(img.file) : img.url).filter(Boolean) || [],
        qrImages: files.qrImages?.map(img => img.file ? URL.createObjectURL(img.file) : img.url).filter(Boolean) || []
      }
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
    const value = getFieldValue(fieldName);
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
                value={value || ''}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                rows={4}
              />
            ) : (
              <Input
                name={fieldName}
                type={type}
                value={value || ''}
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

  // Enhanced Array Field Component for complex objects
  const EditableObjectArrayField = ({ 
    fieldName, 
    label, 
    placeholder, 
    icon: Icon = Plus,
    fields = [],
    defaultItem = {}
  }) => {
    const [newItem, setNewItem] = useState(defaultItem);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState({});
    const items = formData[fieldName] || [];

    const handleAdd = () => {
      if (Object.values(newItem).some(value => value && value.toString().trim())) {
        if (addToArray(fieldName, newItem)) {
          setNewItem(defaultItem);
        }
      }
    };

    const startEditingItem = (index, value) => {
      setEditingIndex(index);
      setEditValue(value);
    };

    const saveEditingItem = () => {
      updateArrayItem(fieldName, editingIndex, editValue);
      setEditingIndex(null);
      setEditValue({});
    };

    const cancelEditingItem = () => {
      setEditingIndex(null);
      setEditValue({});
    };

    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-200 flex items-center">
          <Icon className="h-4 w-4 mr-2 text-blue-400" />
          {label} ({items.length} items)
        </label>
        
        {/* Add new item */}
        <div className="space-y-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field) => (
              <Input
                key={field.name}
                placeholder={field.placeholder}
                value={newItem[field.name] || ''}
                onChange={(e) => setNewItem(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="text-sm"
              />
            ))}
          </div>
          <Button 
            type="button" 
            onClick={handleAdd} 
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {label.slice(0, -1)}
          </Button>
        </div>

        {/* Display items */}
        {items.length > 0 && (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="p-4 bg-gray-700/50 rounded-xl border border-gray-600/50 hover:bg-gray-600/50 transition-all duration-200 group">
                {editingIndex === index ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {fields.map((field) => (
                        <Input
                          key={field.name}
                          placeholder={field.placeholder}
                          value={editValue[field.name] || ''}
                          onChange={(e) => setEditValue(prev => ({ ...prev, [field.name]: e.target.value }))}
                          className="text-sm"
                        />
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={saveEditingItem}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={cancelEditingItem}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-200">
                        {fields.map((field) => (
                          <div key={field.name}>
                            <span className="text-gray-400">{field.label}: </span>
                            <span>{item[field.name] || 'N/A'}</span>
                          </div>
                        ))}
                      </div>
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
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Enhanced File Upload Component
  const FileUploadArea = ({ name, label, accept = "image/*", multiple = false }) => {
    const isDragActive = dragActive === name;
    const hasFile = files[name] || (multiple && files[name]?.length > 0);
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
                title="Add More"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => deleteFile(name)}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                title="Delete All"
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
              {multiple && Array.isArray(fileInfo) && fileInfo.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {fileInfo.slice(0, 6).map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={file.file ? URL.createObjectURL(file.file) : file.url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => deleteFileFromArray(name, index)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {fileInfo.length > 6 && (
                    <div className="w-full h-16 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 text-sm">
                      +{fileInfo.length - 6} more
                    </div>
                  )}
                </div>
              )}
              
              {!multiple && fileInfo?.existing && fileInfo?.url && (
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
                  {multiple && Array.isArray(fileInfo) 
                    ? `${fileInfo.length} file(s) uploaded`
                    : fileInfo?.existing ? 'Current file loaded' : 'File uploaded successfully'
                  }
                </p>
                <p className="text-green-400/70 text-sm mt-1">
                  {multiple && Array.isArray(fileInfo)
                    ? 'Ready for use'
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
                <Plus className="h-4 w-4 mr-2" />
                {multiple ? 'Add More Files' : 'Replace File'}
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
                    card={JSON.parse(localStorage.getItem('previewProfessionalCard') || '{}')}
                    name="professional-card" 
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
            <Briefcase className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Professional Card</h2>
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
                placeholder="e.g., Senior Software Engineer"
                icon={Briefcase}
                required
              />
            </div>

            <EditableField
              fieldName="company"
              label="Company Name"
              placeholder="Your company name"
              icon={Building}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="phone"
                label="Phone Number"
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

            <EditableField
              fieldName="website"
              label="Website"
              type="url"
              placeholder="https://yourwebsite.com"
              icon={Globe}
            />

            <EditableField
              fieldName="bio"
              label="Professional Bio"
              placeholder="Tell people about your professional background..."
              icon={User}
              multiline
            />
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-3" />
                Professional URLs
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  fieldName="appointmentUrl"
                  label="Appointment URL"
                  placeholder="https://calendly.com/yourname"
                  icon={Calendar}
                />
                <EditableField
                  fieldName="portfolioUrl"
                  label="Portfolio URL"
                  placeholder="https://yourportfolio.com"
                  icon={Briefcase}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="linkedinUrl"
                  label="LinkedIn Profile"
                  placeholder="https://linkedin.com/in/yourname"
                  icon={Linkedin}
                />
                <EditableField
                  fieldName="calendlyUrl"
                  label="Calendly URL"
                  placeholder="https://calendly.com/yourname"
                  icon={Calendar}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="partnerContact"
                  label="Partner Contact"
                  placeholder="Partner contact information"
                  icon={Users}
                />
                <EditableField
                  fieldName="customerSupportContact"
                  label="Customer Support"
                  placeholder="Support contact information"
                  icon={MessageCircle}
                />
              </div>

              <EditableField
                fieldName="more2earnUrl"
                label="More2Earn URL"
                placeholder="https://more2earn.com/yourprofile"
                icon={Target}
              />
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-300 mb-6 flex items-center">
                <Building className="h-6 w-6 mr-3" />
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  fieldName="businessInfo.industry"
                  label="Industry"
                  placeholder="e.g., Technology, Healthcare"
                  icon={Building}
                />
                <EditableField
                  fieldName="businessInfo.experience"
                  label="Years of Experience"
                  placeholder="e.g., 5+ years"
                  icon={Clock}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="businessInfo.teamSize"
                  label="Team Size"
                  placeholder="e.g., 10-50 employees"
                  icon={Users}
                />
                <EditableField
                  fieldName="businessInfo.location"
                  label="Location"
                  placeholder="City, Country"
                  icon={MapPin}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <EditableField
                  fieldName="businessInfo.specialization"
                  label="Specialization"
                  placeholder="Your area of expertise"
                  icon={Target}
                />
                <EditableField
                  fieldName="businessInfo.established"
                  label="Established Year"
                  placeholder="2020"
                  icon={Calendar}
                />
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <EditableObjectArrayField
              fieldName="services"
              label="Services"
              icon={Settings}
              fields={[
                { name: 'title', label: 'Service Title', placeholder: 'Service name' },
                { name: 'description', label: 'Description', placeholder: 'Service description' },
                { name: 'price', label: 'Price', placeholder: 'Starting from $100' },
                { name: 'duration', label: 'Duration', placeholder: '1-2 weeks' },
                { name: 'category', label: 'Category', placeholder: 'Consulting' },
                { name: 'enquiryLink', label: 'Enquiry Link', placeholder: 'Contact URL' }
              ]}
              defaultItem={{
                title: '',
                description: '',
                price: '',
                duration: '',
                category: '',
                enquiryLink: ''
              }}
            />
            <FileUploadArea name="serviceImages" label="Service Images" accept="image/*" multiple={true} />
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <EditableObjectArrayField
              fieldName="products"
              label="Products"
              icon={Package}
              fields={[
                { name: 'name', label: 'Product Name', placeholder: 'Product name' },
                { name: 'description', label: 'Description', placeholder: 'Product description' },
                { name: 'price', label: 'Price', placeholder: '$99.99' },
                { name: 'originalPrice', label: 'Original Price', placeholder: '$149.99' },
                { name: 'category', label: 'Category', placeholder: 'Software' },
                { name: 'buyLink', label: 'Buy Link', placeholder: 'Purchase URL' }
              ]}
              defaultItem={{
                name: '',
                description: '',
                price: '',
                originalPrice: '',
                category: '',
                buyLink: ''
              }}
            />
            <FileUploadArea name="productImages" label="Product Images" accept="image/*" multiple={true} />
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <EditableObjectArrayField
              fieldName="projects"
              label="Projects"
              icon={Code}
              fields={[
                { name: 'title', label: 'Project Title', placeholder: 'Project name' },
                { name: 'description', label: 'Description', placeholder: 'Project description' },
                { name: 'projectUrl', label: 'Project URL', placeholder: 'Live demo URL' },
                { name: 'githubUrl', label: 'GitHub URL', placeholder: 'Repository URL' },
                { name: 'category', label: 'Category', placeholder: 'Web Development' },
                { name: 'clientName', label: 'Client Name', placeholder: 'Client or company' }
              ]}
              defaultItem={{
                title: '',
                description: '',
                projectUrl: '',
                githubUrl: '',
                category: '',
                clientName: ''
              }}
            />
            <FileUploadArea name="projectImages" label="Project Images" accept="image/*" multiple={true} />
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="socialLinks.linkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/username"
                icon={Linkedin}
              />
              <EditableField
                fieldName="socialLinks.twitter"
                label="Twitter"
                placeholder="https://twitter.com/username"
                icon={Twitter}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="socialLinks.instagram"
                label="Instagram"
                placeholder="https://instagram.com/username"
                icon={Instagram}
              />
              <EditableField
                fieldName="socialLinks.facebook"
                label="Facebook"
                placeholder="https://facebook.com/username"
                icon={Facebook}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="socialLinks.youtube"
                label="YouTube"
                placeholder="https://youtube.com/channel/..."
                icon={Youtube}
              />
              <EditableField
                fieldName="socialLinks.github"
                label="GitHub"
                placeholder="https://github.com/username"
                icon={Code}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditableField
                fieldName="socialLinks.behance"
                label="Behance"
                placeholder="https://behance.net/username"
                icon={Palette}
              />
              <EditableField
                fieldName="socialLinks.dribbble"
                label="Dribbble"
                placeholder="https://dribbble.com/username"
                icon={Target}
              />
            </div>

            <EditableObjectArrayField
              fieldName="customLinks"
              label="Custom Links"
              icon={Link}
              fields={[
                { name: 'label', label: 'Link Label', placeholder: 'My Blog' },
                { name: 'url', label: 'URL', placeholder: 'https://myblog.com' },
                { name: 'icon', label: 'Icon', placeholder: 'globe' },
                { name: 'category', label: 'Category', placeholder: 'Personal' }
              ]}
              defaultItem={{
                label: '',
                url: '',
                icon: '',
                category: ''
              }}
            />
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

            <FileUploadArea name="introVideo" label="Upload Introduction Video" accept="video/*" />
            
            <FileUploadArea name="qrImages" label="QR Code Images" accept="image/*" multiple={true} />
            
            <FileUploadArea name="portfolioImages" label="Portfolio Images" accept="image/*" multiple={true} />
            
            <FileUploadArea name="demoVideos" label="Demo Videos" accept="video/*" multiple={true} />
            
            <FileUploadArea name="testimonialVideos" label="Testimonial Videos" accept="video/*" multiple={true} />
          </div>
        );

      case 'credentials':
        return (
          <div className="space-y-6">
            <EditableObjectArrayField
              fieldName="certifications"
              label="Certifications"
              icon={Award}
              fields={[
                { name: 'name', label: 'Certification Name', placeholder: 'AWS Certified Solutions Architect' },
                { name: 'issuer', label: 'Issuing Organization', placeholder: 'Amazon Web Services' },
                { name: 'credentialId', label: 'Credential ID', placeholder: 'ABC123456' },
                { name: 'date', label: 'Issue Date', placeholder: '2023-01-15' }
              ]}
              defaultItem={{
                name: '',
                issuer: '',
                credentialId: '',
                date: ''
              }}
            />

            <EditableObjectArrayField
              fieldName="awards"
              label="Awards & Recognition"
              icon={Trophy}
              fields={[
                { name: 'title', label: 'Award Title', placeholder: 'Employee of the Year' },
                { name: 'issuer', label: 'Issuing Organization', placeholder: 'Company Name' },
                { name: 'date', label: 'Award Date', placeholder: '2023-12-01' },
                { name: 'description', label: 'Description', placeholder: 'Brief description of the award' }
              ]}
              defaultItem={{
                title: '',
                issuer: '',
                date: '',
                description: ''
              }}
            />

            <FileUploadArea name="certificateImages" label="Certificate Images" accept="image/*" multiple={true} />
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <EditableObjectArrayField
              fieldName="teamMembers"
              label="Team Members"
              icon={Users}
              fields={[
                { name: 'name', label: 'Name', placeholder: 'John Doe' },
                { name: 'designation', label: 'Designation', placeholder: 'Senior Developer' },
                { name: 'email', label: 'Email', placeholder: 'john@company.com' },
                { name: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/johndoe' }
              ]}
              defaultItem={{
                name: '',
                designation: '',
                email: '',
                linkedin: ''
              }}
            />

            <FileUploadArea name="teamImages" label="Team Images" accept="image/*" multiple={true} />
          </div>
        );

      case 'design':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-violet-300 mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-3" />
                Design Settings
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200">Primary Color</label>
                  <input
                    type="color"
                    name="design.primaryColor"
                    value={formData.design.primaryColor}
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-gray-600 bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200">Secondary Color</label>
                  <input
                    type="color"
                    name="design.secondaryColor"
                    value={formData.design.secondaryColor}
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-gray-600 bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200">Accent Color</label>
                  <input
                    type="color"
                    name="design.accentColor"
                    value={formData.design.accentColor}
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-gray-600 bg-gray-800"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-200 mb-3">Theme</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {['professional', 'creative', 'minimal', 'corporate'].map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        design: { ...prev.design, theme }
                      }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.design.theme === theme
                          ? 'border-blue-400 bg-blue-500/10 text-blue-300'
                          : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500"></div>
                        <span className="text-sm font-medium capitalize">{theme}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

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
                  {cardExists ? 'Edit Professional Card' : 'Create Professional Card'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {cardExists ? 'Update your professional digital business card' : 'Build your comprehensive professional digital business card'}
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
                        Complete this section to build your professional card
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

export default ProfessionalCardCreate;