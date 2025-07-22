const User = {
  id: '',
  email: '',
  displayName: '',
  photoURL: '',
  role: 'user',
  createdAt: new Date(),
  subscription: 'free',
  cardType: 'gallium',
  physicalCard: {
    type: 'pvc',
    nfcEnabled: false,
    ordered: false,
    delivered: false,
  },
};

const Product = {
  id: '',
  name: '',
  price: '',
  originalPrice: '',
  image: '',
  description: '',
  category: '',
  inStock: false,
};

const Service = {
  id: '',
  title: '',
  description: '',
  image: '',
  link: '',
  category: '',
  price: '',
};

const PaymentInfo = {
  paytm: '',
  googlePay: '',
  phonePe: '',
  upi: '',
  bankDetails: {
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  },
};

const BusinessInfo = {
  establishedDate: '',
  aboutUs: '',
  googleReviewLink: '',
  officeAddress: '',
  homeAddress: '',
  reviews: [],
  ourNetwork: '',
  clientsAndAffiliates: '',
  more2Earn: '',
  sourceJobCreation: '',
  offerZone: '',
  eliteBusinessOwners: '',
};

const StudentInfo = {
  studentName: '',
  studentMobile: '',
  bloodGroup: '',
  parentsMobile: [],
  age: '',
  schoolName: '',
  schoolIdNumber: '',
  schoolAddress: '',
  studentEmail: '',
  parentsEmail: '',
};

const ProfessionalInfo = {
  qrCodeImages: [],
  customUrls: [],
  projects: [],
  appointmentUrl: '',
  partnerForm: false,
};

const EliteFeatures = {
  vipPass: false,
  vipPassColor: '',
  sourceJobCreation: '',
  clientsAndAffiliates: '',
  ourNetwork: '',
  eliteBusinessOwners: '',
  offerZone: '',
};

const BusinessCard = {
  id: '',
  userId: '',
  username: '',
  cardType: 'gallium',
  platformBranding: {
    enabled: false,
    logo: '',
    name: '',
  },
  franchiseInfo: {
    logo: '',
    name: '',
  },
  personalInfo: {
    name: '',
    designation: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    bio: '',
    profileImage: '',
    companyLogo: '',
    multiplePhones: [],
    locationImage: '',
    locationUrl: '',
  },
  socialLinks: {
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    youtube: '',
    whatsapp: '',
    website: '',
    location: '',
    reviews: '',
  },
  media: {
    introVideo: '',
    gallery: [],
    videoTiles: [],
  },
  design: {
    theme: '',
    primaryColor: '',
    secondaryColor: '',
    layout: '',
    colorBand: '',
  },
  products: [],
  services: [],
  paymentInfo: PaymentInfo,
  businessInfo: BusinessInfo,
  studentInfo: StudentInfo,
  professionalInfo: ProfessionalInfo,
  eliteFeatures: EliteFeatures,
  feedbackEnabled: false,
  contactFormEnabled: false,
  partnerFormEnabled: false,
  analytics: {
    views: 0,
    clicks: 0,
    shares: 0,
    downloads: 0,
  },
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const Payment = {
  id: '',
  userId: '',
  plan: 'gallium',
  duration: '7-days',
  amount: 0,
  currency: '',
  status: 'pending',
  paymentMethod: '',
  transactionId: '',
  physicalCard: {
    type: 'pvc',
    nfcEnabled: false,
    shippingAddress: '',
  },
  createdAt: new Date(),
};

const Analytics = {
  cardId: '',
  userId: '',
  event: 'view',
  timestamp: new Date(),
  metadata: {
    source: '',
    userAgent: '',
    ipAddress: '',
    element: '',
  },
};

const ContactForm = {
  id: '',
  cardId: '',
  name: '',
  email: '',
  phone: '',
  message: '',
  type: 'general',
  status: 'new',
  createdAt: new Date(),
};

const Feedback = {
  id: '',
  cardId: '',
  name: '',
  email: '',
  phone: '',
  rating: 0,
  message: '',
  approved: false,
  createdAt: new Date(),
};

const Template = {
  id: '',
  name: '',
  category: 'business',
  cardType: 'gallium',
  preview: '',
  config: BusinessCard,
  features: [],
  premium: false,
};