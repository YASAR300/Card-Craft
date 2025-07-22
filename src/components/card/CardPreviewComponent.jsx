import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Globe, Share2, Download, 
  Star, MessageCircle, Navigation, Heart, ShoppingCart,
  Calendar, Building, CreditCard, QrCode, ExternalLink,
  Instagram, Linkedin, Twitter, Facebook, Youtube,
  Send, User, Clock, MapIcon
} from 'lucide-react';
import Button from '../ui/Button';
import PDFDownloadButton from '../ui/PDFDownloadButton';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

const CardPreviewComponent = ({ cardData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 5,
    message: ''
  });

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const cardUrl = window.location.href;
      const qrUrl = await QRCode.toDataURL(cardUrl, {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cardData.personalInfo?.name}'s Digital Card`,
        text: `Check out ${cardData.personalInfo?.name}'s digital business card`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
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
    console.log('Feedback submitted:', feedbackForm);
    toast.success('Thank you for your feedback!');
    setFeedbackForm({
      name: '',
      email: '',
      phone: '',
      rating: 5,
      message: ''
    });
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="h-5 w-5" />;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'facebook': return <Facebook className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl" id="card-preview-content">
      <div className="relative">
        <div 
          className="h-40 bg-gradient-to-br from-blue-500 to-purple-600"
          style={{
            background: `linear-gradient(135deg, ${cardData.design?.primaryColor || '#3B82F6'}, ${cardData.design?.secondaryColor || '#1E40AF'})`
          }}
        />
        
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
            {cardData.personalInfo?.profileImage ? (
              <img
                src={cardData.personalInfo.profileImage}
                alt={cardData.personalInfo.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 px-6 pb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {cardData.personalInfo?.name || 'Your Name'}
        </h2>
        <p className="text-lg text-blue-600 font-medium mb-2">
          {cardData.personalInfo?.designation || 'Your Designation'}
        </p>
        <p className="text-md text-gray-700 font-medium mb-6">
          {cardData.personalInfo?.company || 'Your Company'}
        </p>
        
        {cardData.personalInfo?.bio && (
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {cardData.personalInfo.bio}
          </p>
        )}

        <div className="grid grid-cols-4 gap-3 mb-8">
          <button
            onClick={handleCall}
            className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Phone className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-xs text-green-700 font-medium">Call</span>
          </button>
          
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-xs text-green-700 font-medium">WhatsApp</span>
          </button>
          
          <button
            onClick={handleEmail}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Mail className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-xs text-blue-700 font-medium">Email</span>
          </button>
          
          <button
            onClick={handleWebsite}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <Globe className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-xs text-purple-700 font-medium">Website</span>
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2">
            {cardData.personalInfo?.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{cardData.personalInfo.phone}</span>
              </div>
            )}
            {cardData.personalInfo?.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{cardData.personalInfo.email}</span>
              </div>
            )}
            {cardData.personalInfo?.website && (
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{cardData.personalInfo.website}</span>
              </div>
            )}
            {cardData.personalInfo?.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{cardData.personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {cardData.socialLinks && Object.values(cardData.socialLinks).some(link => link) && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-left">Follow Me</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(cardData.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <button
                    key={platform}
                    onClick={() => handleSocialLink(platform, url)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {getSocialIcon(platform)}
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {platform}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-500" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {cardData.services && cardData.services.length > 0 && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Services</h3>
          <div className="space-y-4">
            {cardData.services.map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-4">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                    {service.description && (
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    )}
                    {service.link && (
                      <button
                        onClick={() => window.open(service.link, '_blank')}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Enquiry Now
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cardData.products && cardData.products.length > 0 && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Products</h3>
          <div className="grid grid-cols-2 gap-4">
            {cardData.products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 font-bold text-sm">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">₹{product.originalPrice}</span>
                  )}
                </div>
                <Button size="sm" className="w-full text-xs">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {cardData.media?.gallery && cardData.media.gallery.length > 0 && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {cardData.media.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open(image, '_blank')}
              />
            ))}
          </div>
        </div>
      )}

      {cardData.media?.introVideo && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Introduction Video</h3>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <button
              onClick={() => window.open(cardData.media?.introVideo, '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      )}

      {(cardData.paymentInfo?.paytm || cardData.paymentInfo?.googlePay || cardData.paymentInfo?.phonePe || cardData.paymentInfo?.bankDetails?.accountNumber) && (
        <div className="px-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h3>
          
          <div className="space-y-3 mb-6">
            {cardData.paymentInfo?.paytm && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Paytm</span>
                <span className="text-blue-700">{cardData.paymentInfo.paytm}</span>
              </div>
            )}
            {cardData.paymentInfo?.googlePay && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-900">Google Pay</span>
                <span className="text-green-700">{cardData.paymentInfo.googlePay}</span>
              </div>
            )}
            {cardData.paymentInfo?.phonePe && (
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-purple-900">PhonePe</span>
                <span className="text-purple-700">{cardData.paymentInfo.phonePe}</span>
              </div>
            )}
          </div>

          {cardData.paymentInfo?.bankDetails?.accountNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Bank Account Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{cardData.paymentInfo.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account:</span>
                  <span className="font-medium">{cardData.paymentInfo.bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IFSC:</span>
                  <span className="font-medium">{cardData.paymentInfo.bankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">{cardData.paymentInfo.bankDetails.bankName}</span>
                </div>
              </div>
            </div>
          )}

          {qrCodeUrl && (
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">Payment QR Code</h4>
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                className="w-32 h-32 mx-auto rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
      )}

      <div className="px-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback</h3>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                  className={`h-8 w-8 ${star <= feedbackForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="h-full w-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Your name"
            value={feedbackForm.name}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="email"
            placeholder="Your email"
            value={feedbackForm.email}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="tel"
            placeholder="Your contact number"
            value={feedbackForm.phone}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <textarea
            placeholder="Your feedback"
            rows={3}
            value={feedbackForm.message}
            onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-3">
          Note: For privacy and security reasons we do not show your contact details publicly.
        </p>
      </div>

      <div className="px-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
        
        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-4">
          <div className="text-center">
            <MapIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {cardData.personalInfo?.address || 'Location will be shown here'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            placeholder="Enter your query or message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      <div className="text-center py-8 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Share This Card</h4>
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-24 h-24 mx-auto rounded-lg border border-gray-200 mb-3"
          />
        )}
        <p className="text-sm text-gray-600 mb-4">Scan QR Code to view this card</p>
        
        <Button
          onClick={() => window.open(`https://wa.me/?text=Check out my digital business card: ${window.location.href}`, '_blank')}
          className="bg-green-500 hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Share on WhatsApp
        </Button>
      </div>

      <div className="text-center py-6 bg-gray-50 text-xs text-gray-500">
        <p>Powered by CardCraft - Digital Business Card Platform</p>
      </div>
    </div>
  );
};

export default CardPreviewComponent;