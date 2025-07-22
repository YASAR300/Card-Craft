import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Star, Crown, Zap } from 'lucide-react';
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', count: 20 },
    { id: 'business', name: 'Business', count: 6 },
    { id: 'creative', name: 'Creative', count: 5 },
    { id: 'minimal', name: 'Minimal', count: 3 },
    { id: 'modern', name: 'Modern', count: 4 },
    { id: 'luxury', name: 'Luxury', count: 2 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Futuristic Neon',
      category: 'modern',
      plan: 'premium',
      rating: 4.9,
      downloads: 2341,
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=300&h=400&fit=crop',
      description: 'Digital visiting card UI with dark theme, neon blue and pink glowing borders, holographic elements, futuristic fonts, and glassmorphism panels.',
      features: ['Dark Theme', 'Neon Glowing Borders', 'Holographic Elements', 'Glassmorphism', 'Futuristic Fonts']
    },
    {
      id: 2,
      name: 'Minimal White Elegant',
      category: 'minimal',
      plan: 'free',
      rating: 4.8,
      downloads: 3456,
      preview: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=300&h=400&fit=crop',
      description: 'Minimal, clean white theme digital visiting card UI with elegant serif typography, subtle shadows, soft gray accents, and spacious layout.',
      features: ['Clean White Theme', 'Elegant Typography', 'Subtle Shadows', 'Spacious Layout', 'Soft Gray Accents']
    },
    {
      id: 3,
      name: 'Corporate Blue',
      category: 'business',
      plan: 'free',
      rating: 4.7,
      downloads: 4567,
      preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=300&h=400&fit=crop',
      description: 'Professional business visiting card UI with navy blue and light gray colors, clean lines, formal sans-serif fonts, and corporate icons.',
      features: ['Navy Blue Theme', 'Corporate Icons', 'Clean Lines', 'Professional Layout', 'Formal Typography']
    },
    {
      id: 4,
      name: 'Luxury Gold Black',
      category: 'luxury',
      plan: 'premium',
      rating: 4.9,
      downloads: 1876,
      preview: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?w=300&h=400&fit=crop',
      description: 'Luxury visiting card UI with rich black background, golden borders and typography, and subtle marble textures, emphasizing premium feel.',
      features: ['Rich Black Background', 'Golden Typography', 'Marble Textures', 'Premium Feel', 'Luxury Design']
    },
    {
      id: 5,
      name: 'Green Eco Nature',
      category: 'creative',
      plan: 'free',
      rating: 4.6,
      downloads: 2987,
      preview: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?w=300&h=400&fit=crop',
      description: 'Eco-friendly digital visiting card UI with earthy greens, organic shapes, leaf icons, and light beige background for a nature brand.',
      features: ['Earthy Green Colors', 'Organic Shapes', 'Leaf Icons', 'Nature Theme', 'Eco-Friendly Design']
    },
    {
      id: 6,
      name: 'Artistic Watercolor',
      category: 'creative',
      plan: 'premium',
      rating: 4.8,
      downloads: 1654,
      preview: 'https://images.pexels.com/photos/3184342/pexels-photo-3184342.jpeg?w=300&h=400&fit=crop',
      description: 'Creative visiting card UI with watercolor splashes, hand-drawn icons, playful fonts, and colorful backgrounds.',
      features: ['Watercolor Splashes', 'Hand-drawn Icons', 'Playful Fonts', 'Colorful Background', 'Artistic Design']
    },
    {
      id: 7,
      name: 'Gradient Purple Modern',
      category: 'modern',
      plan: 'premium',
      rating: 4.7,
      downloads: 2234,
      preview: 'https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?w=300&h=400&fit=crop',
      description: 'Modern visiting card UI with deep purple to pink gradients, smooth curved shapes, and vibrant call-to-action buttons.',
      features: ['Purple Pink Gradients', 'Curved Shapes', 'Vibrant CTAs', 'Modern Design', 'Smooth Transitions']
    },
    {
      id: 8,
      name: 'Tech Startup',
      category: 'business',
      plan: 'premium',
      rating: 4.8,
      downloads: 3421,
      preview: 'https://images.pexels.com/photos/3184344/pexels-photo-3184344.jpeg?w=300&h=400&fit=crop',
      description: 'Startup visiting card UI with bright teal and gray, sharp edges, tech icons, and micro-interaction hover effects for a software company.',
      features: ['Bright Teal Colors', 'Tech Icons', 'Sharp Edges', 'Hover Effects', 'Startup Vibe']
    },
    {
      id: 9,
      name: 'Video Portfolio',
      category: 'creative',
      plan: 'premium',
      rating: 4.9,
      downloads: 1432,
      preview: 'https://images.pexels.com/photos/3184345/pexels-photo-3184345.jpeg?w=300&h=400&fit=crop',
      description: 'Digital visiting card UI with dark theme, embedded video tiles, clean sans-serif fonts, and subtle cyan highlights for a videographer.',
      features: ['Video Tiles', 'Dark Theme', 'Cyan Highlights', 'Clean Fonts', 'Portfolio Layout']
    },
    {
      id: 10,
      name: 'Elite Diamond',
      category: 'luxury',
      plan: 'premium',
      rating: 4.9,
      downloads: 987,
      preview: 'https://images.pexels.com/photos/3184346/pexels-photo-3184346.jpeg?w=300&h=400&fit=crop',
      description: 'Exclusive elite membership visiting card UI with diamond textures, glossy black surfaces, silver typography, and premium seal icons.',
      features: ['Diamond Textures', 'Glossy Black', 'Silver Typography', 'Premium Seals', 'Elite Design']
    },
    {
      id: 11,
      name: 'Feminine Rose',
      category: 'creative',
      plan: 'free',
      rating: 4.7,
      downloads: 2765,
      preview: 'https://images.pexels.com/photos/3184347/pexels-photo-3184347.jpeg?w=300&h=400&fit=crop',
      description: 'Feminine digital visiting card UI with soft pink and rose gold accents, delicate floral illustrations, and stylish script fonts.',
      features: ['Soft Pink Colors', 'Rose Gold Accents', 'Floral Illustrations', 'Script Fonts', 'Feminine Design']
    },
    {
      id: 12,
      name: 'Gradient Retro',
      category: 'modern',
      plan: 'premium',
      rating: 4.8,
      downloads: 1876,
      preview: 'https://images.pexels.com/photos/3184348/pexels-photo-3184348.jpeg?w=300&h=400&fit=crop',
      description: 'Retro-futuristic visiting card UI with bold gradients, neon lights, pixel fonts, and slight glitch effects.',
      features: ['Bold Gradients', 'Neon Lights', 'Pixel Fonts', 'Glitch Effects', 'Retro-Futuristic']
    },
    {
      id: 13,
      name: 'Business Coach',
      category: 'business',
      plan: 'free',
      rating: 4.6,
      downloads: 3234,
      preview: 'https://images.pexels.com/photos/3184349/pexels-photo-3184349.jpeg?w=300&h=400&fit=crop',
      description: 'Professional visiting card UI with warm earthy tones, testimonial sections, friendly typography, and subtle motivational icons.',
      features: ['Warm Earthy Tones', 'Testimonial Sections', 'Friendly Typography', 'Motivational Icons', 'Coach Theme']
    },
    {
      id: 14,
      name: 'Student ID',
      category: 'creative',
      plan: 'free',
      downloads: 4321,
      rating: 4.5,
      preview: 'https://images.pexels.com/photos/3184350/pexels-photo-3184350.jpeg?w=300&h=400&fit=crop',
      description: 'Student ID card UI with playful colors, school icons, section for parents contact info, and fun fonts.',
      features: ['Playful Colors', 'School Icons', 'Parent Contact', 'Fun Fonts', 'Student Theme']
    },
    {
      id: 15,
      name: 'Architecture Firm',
      category: 'business',
      plan: 'premium',
      rating: 4.8,
      downloads: 1654,
      preview: 'https://images.pexels.com/photos/3184351/pexels-photo-3184351.jpeg?w=300&h=400&fit=crop',
      description: 'Sleek visiting card UI with monochrome palette, structural line graphics, minimal text, and high-resolution building images.',
      features: ['Monochrome Palette', 'Structural Graphics', 'Minimal Text', 'Building Images', 'Architecture Theme']
    },
    {
      id: 16,
      name: 'E-commerce Seller',
      category: 'business',
      plan: 'premium',
      rating: 4.7,
      downloads: 2543,
      preview: 'https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg?w=300&h=400&fit=crop',
      description: 'Digital visiting card UI with product tiles, Add to Cart icons, mini reviews, and light clean background for an online seller.',
      features: ['Product Tiles', 'Cart Icons', 'Mini Reviews', 'Clean Background', 'E-commerce Theme']
    },
    {
      id: 17,
      name: 'Ultra Dark Cyberpunk',
      category: 'modern',
      plan: 'premium',
      rating: 4.9,
      downloads: 1987,
      preview: 'https://images.pexels.com/photos/3184353/pexels-photo-3184353.jpeg?w=300&h=400&fit=crop',
      description: 'Cyberpunk visiting card UI with black and magenta, glitch animations, neon circuit patterns, and techno fonts.',
      features: ['Black Magenta Theme', 'Glitch Animations', 'Circuit Patterns', 'Techno Fonts', 'Cyberpunk Style']
    },
    {
      id: 18,
      name: 'Events & Weddings',
      category: 'business',
      plan: 'free',
      rating: 4.8,
      downloads: 3765,
      preview: 'https://images.pexels.com/photos/3184354/pexels-photo-3184354.jpeg?w=300&h=400&fit=crop',
      description: 'Elegant visiting card UI with cream and gold colors, floral borders, and soft calligraphy fonts, perfect for event planners.',
      features: ['Cream Gold Colors', 'Floral Borders', 'Calligraphy Fonts', 'Elegant Design', 'Event Theme']
    },
    {
      id: 19,
      name: 'Legal Consultant',
      category: 'minimal',
      plan: 'premium',
      rating: 4.7,
      downloads: 1432,
      preview: 'https://images.pexels.com/photos/3184355/pexels-photo-3184355.jpeg?w=300&h=400&fit=crop',
      description: 'Dignified visiting card UI with dark navy and burgundy, classical serif typography, and icons like scales and legal scrolls.',
      features: ['Navy Burgundy Colors', 'Classical Typography', 'Legal Icons', 'Dignified Design', 'Professional Theme']
    },
    {
      id: 20,
      name: 'Creative Agency',
      category: 'minimal',
      plan: 'premium',
      rating: 4.8,
      downloads: 2876,
      preview: 'https://images.pexels.com/photos/3184356/pexels-photo-3184356.jpeg?w=300&h=400&fit=crop',
      description: 'Playful yet modern visiting card UI with multi-color geometric shapes, sans-serif fonts, and animated icon hover effects.',
      features: ['Geometric Shapes', 'Multi-color Design', 'Sans-serif Fonts', 'Animated Icons', 'Creative Layout']
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesPlan = selectedPlan === 'all' || template.plan === selectedPlan;
    
    return matchesSearch && matchesCategory && matchesPlan;
  });

  const getPlanIcon = (plan) => {
    switch (plan) {
      case 'free':
        return <Star className="h-4 w-4 text-gray-500" />;
      case 'premium':
        return <Crown className="h-4 w-4 text-blue-600" />;
      default:
        return <Zap className="h-4 w-4 text-purple-600" />;
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'free':
        return <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full">Free</span>;
      case 'premium':
        return <span className="px-2 py-1 bg-blue-600 text-blue-100 text-xs font-medium rounded-full">Premium</span>;
      default:
        return <span className="px-2 py-1 bg-purple-600 text-purple-100 text-xs font-medium rounded-full">Enterprise</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Professional
              <span className="text-blue-400"> Templates</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose from our collection of 20 unique professionally designed templates. 
              Each template is fully customizable and optimized for all devices.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5 text-gray-400" />}
                className="text-center"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white border border-blue-500'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Filter */}
              <div>
                <h4 className="font-medium text-white mb-3">Plan</h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'All Plans' },
                    { id: 'free', name: 'Free' },
                    { id: 'premium', name: 'Premium' }
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedPlan === plan.id
                          ? 'bg-blue-600 text-white border border-blue-500'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {filteredTemplates.length} Templates Found
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select className="border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Template Preview */}
                  <div className="relative overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                    
                    {/* Plan Badge */}
                    <div className="absolute top-3 right-3">
                      {getPlanBadge(template.plan)}
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {template.name}
                      </h3>
                      <div className="flex items-center">
                        {getPlanIcon(template.plan)}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            +{template.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{template.rating}</span>
                      </div>
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => window.location.href = `/card/create?template=${template.id}`}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No templates found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search criteria or browse all templates
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedPlan('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Can't Find the Perfect Template?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our design team can create a custom template just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50"
              >
                Request Custom Design
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Templates;