import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Users, Globe, Zap, Star, ArrowRight, Crown, Shield } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const Home = () => {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-400" />,
      title: 'Physical + Digital Cards',
      description: 'Get both NFC-enabled physical cards and digital versions that work seamlessly together.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: 'Share Anywhere',
      description: 'Share your card instantly via NFC tap, QR code, link, or social media. No app required.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: 'Real-time Updates',
      description: 'Update your information anytime and everyone with your card sees the changes instantly.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: 'Advanced Features',
      description: 'Products, services, payments, analytics, and professional networking tools included.'
    }
  ];

  const cardTypes = [
    {
      name: 'Gallium',
      description: '7 days free trial',
      color: 'from-gray-500 to-gray-600',
      icon: <Star className="h-6 w-6" />,
      features: ['Basic Features', 'Digital Card Only']
    },
    {
      name: 'Gold',
      description: 'Most Popular',
      color: 'from-yellow-500 to-yellow-600',
      icon: <Crown className="h-6 w-6" />,
      features: ['Physical PVC Card', 'NFC Enabled', 'Premium Features']
    },
    {
      name: 'Platinum',
      description: 'For Professionals',
      color: 'from-emerald-500 to-emerald-600',
      icon: <Crown className="h-6 w-6" />,
      features: ['Metal Card', 'Advanced Tools', 'Priority Support']
    },
    {
      name: 'VIP Pass',
      description: 'Ultimate Experience',
      color: 'from-yellow-400 to-yellow-600',
      icon: <Zap className="h-6 w-6" />,
      features: ['Luxury Card', 'Elite Network', 'Concierge Support']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'The NFC card is amazing! Just tap and share - my clients love the professional touch.'
    },
    {
      name: 'Michael Chen',
      role: 'Sales Manager',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'Having both physical and digital cards has revolutionized my networking. The analytics are incredible!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Entrepreneur',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
      content: 'The product showcase feature helped me increase sales by 40%. Best investment for my business!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Premium Digital Cards
                <span className="text-blue-400"> with NFC Technology</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get both physical NFC-enabled cards and digital versions. Share instantly with a tap, 
                showcase products, collect payments, and track analytics - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-4 text-lg">
                  <Link to="/register" className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Link to="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-gray-700">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">John Doe</h3>
                  <p className="text-blue-400 font-medium">Senior Developer</p>
                  <p className="text-gray-300">TechCorp Inc.</p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 mt-4">
                    <p className="text-xs text-gray-400">Tap NFC card to view</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Card Types Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Choose Your Card Type
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From free trials to VIP experiences - find the perfect plan for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardTypes.map((cardType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-colors border border-gray-600"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${cardType.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {cardType.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {cardType.name}
                </h3>
                <p className="text-blue-400 text-sm mb-4">
                  {cardType.description}
                </p>
                <ul className="space-y-2">
                  {cardType.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose CardCraft?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create, share, and manage professional digital business cards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of professionals who trust CardCraft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Networking?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized their networking with CardCraft
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg border-white"
              >
                <Link to="/register">
                  Start Your Free Trial
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                <Link to="/pricing">
                  View All Plans
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;