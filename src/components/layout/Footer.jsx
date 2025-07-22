import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Mail, Phone, MapPin, Twitter, Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Features', href: '/features' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Integrations', href: '/integrations' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
    { name: 'Documentation', href: '/docs' }
  ];

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' }
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'GitHub', href: '#', icon: Github }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <CreditCard className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-2xl font-semibold text-white tracking-tight">CardCraft</span>
              </Link>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                The future of networking. Create stunning digital business cards that leave a lasting impression and build meaningful connections.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-700/50"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">Product</h3>
                <ul className="space-y-3">
                  {productLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">Support</h3>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-6">Legal</h3>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-gray-300">support@cardcraft.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-sm font-medium text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm font-medium text-gray-300">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="text-sm text-gray-500">
                © 2024 CardCraft. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <span>Made with ❤️ in San Francisco</span>
                <span>•</span>
                <span>Trusted by 50,000+ professionals</span>
              </div>
            </div>
            
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span>Back to top</span>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200">
                <ArrowUp className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;