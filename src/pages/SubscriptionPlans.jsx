// ✅ components/SubscriptionPlans.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import QRCodeImage from '../assets/console1.png';
import { 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Diamond, 
  Gem,
  Check,
  Upload,
  CreditCard,
  Calendar,
  User,
  Mail,
  FileImage,
  Sparkles,
  Award,
  Infinity
} from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const plans = [
  { 
    name: 'Gallium', 
    price: { '1yr': 199, '5yr': 499, lifetime: 799 },
    icon: <Zap className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500',
    features: ['Basic Features', '24/7 Support', 'Cloud Storage', 'Mobile App']
  },
  { 
    name: 'Gold', 
    price: { '1yr': 299, '5yr': 699, lifetime: 999 },
    icon: <Star className="h-8 w-8" />,
    color: 'from-yellow-500 to-orange-500',
    features: ['All Gallium Features', 'Priority Support', 'Advanced Analytics', 'API Access']
  },
  { 
    name: 'Palladium', 
    price: { '1yr': 399, '5yr': 899, lifetime: 1299 },
    icon: <Shield className="h-8 w-8" />,
    color: 'from-gray-400 to-gray-600',
    features: ['All Gold Features', 'Custom Integrations', 'White Label', 'Dedicated Manager']
  },
  { 
    name: 'Platinum', 
    price: { '1yr': 499, '5yr': 1099, lifetime: 1499 },
    icon: <Crown className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-500',
    features: ['All Palladium Features', 'Enterprise Security', 'Custom Development', 'SLA Guarantee']
  },
  { 
    name: 'Rhodium', 
    price: { '1yr': 599, '5yr': 1299, lifetime: 1799 },
    icon: <Diamond className="h-8 w-8" />,
    color: 'from-red-500 to-pink-500',
    features: ['All Platinum Features', 'Unlimited Everything', 'Personal Consultant', 'Beta Access']
  },
  { 
    name: 'VIP', 
    price: { '1yr': 999, '5yr': 1999, lifetime: 2999 },
    icon: <Gem className="h-8 w-8" />,
    color: 'from-gradient-to-r from-purple-600 via-pink-600 to-red-600',
    features: ['Ultimate Package', 'VIP Support', 'Custom Solutions', 'Exclusive Events'],
    popular: true
  },
];

const SubscriptionPlans = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [paymentProof, setPaymentProof] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Payment, 3: Upload Proof

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setSelectedDuration('');
    setStep(1);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setStep(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setPaymentProof(file);
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlan || !selectedDuration || !paymentProof) {
      toast.error('Please complete all steps before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('plan', selectedPlan.name);
      formData.append('duration', selectedDuration);
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('paymentProof', paymentProof);

      await axios.post('http://localhost:5000/api/subscription/request', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Subscription request submitted successfully! We\'ll review it shortly.');
      
      // Reset form
      setSelectedPlan(null);
      setSelectedDuration('');
      setPaymentProof(null);
      setStep(1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit subscription request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDurationLabel = (duration) => {
    switch(duration) {
      case '1yr': return '1 Year';
      case '5yr': return '5 Years';
      case 'lifetime': return 'Lifetime';
      default: return duration;
    }
  };

  const getDiscountPercentage = (plan, duration) => {
    const yearlyPrice = plan.price['1yr'];
    const selectedPrice = plan.price[duration];
    
    if (duration === '5yr') {
      const fiveYearRegular = yearlyPrice * 5;
      return Math.round(((fiveYearRegular - selectedPrice) / fiveYearRegular) * 100);
    } else if (duration === 'lifetime') {
      const tenYearRegular = yearlyPrice * 10;
      return Math.round(((tenYearRegular - selectedPrice) / tenYearRegular) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181928] via-[#1a1a2e] to-[#23243a] text-white relative overflow-x-hidden">
      {/* Glassy animated header */}
      <header className="w-full py-12 px-4 flex flex-col items-center justify-center relative z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-700/30 via-pink-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
            </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-xl mb-6 animate-fade-in">
            <Crown className="h-10 w-10 text-white drop-shadow-lg animate-bounce" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-xl animate-fade-in-up">Upgrade Your Experience</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl text-center animate-fade-in-up delay-100">Unlock premium features and join our elite community. Choose a plan that fits your ambition.</p>
        </div>
      </header>

      {/* Progress Steps Modern */}
      <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up delay-200">
        <div className="flex items-center justify-between px-8 py-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg">
          {[1,2,3].map((n, i) => (
            <div key={n} className="flex-1 flex flex-col items-center relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-300 ${step >= n ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-pink-400 text-white shadow-xl scale-110' : 'bg-[#23243a] border-gray-700 text-gray-500'}`}>{n}</div>
              <span className={`mt-2 text-sm font-semibold ${step >= n ? 'text-pink-400' : 'text-gray-500'}`}>{['Select Plan','Payment','Upload Proof'][i]}</span>
              {i < 2 && <div className={`absolute top-6 right-0 w-full h-1 ${step > n ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'} rounded-full z-0`} style={{left:'50%',width:'100%',height:'4px',marginLeft:'24px',marginRight:'-24px'}}></div>}
            </div>
          ))}
        </div>
        </div>

      {/* Plans Grid Modern */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mb-20 animate-fade-in-up delay-300">
        {plans.map((plan, idx) => (
            <div
              key={plan.name}
            className={`relative group bg-gradient-to-br ${plan.color} p-1 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer ${selectedPlan?.name === plan.name ? 'ring-4 ring-pink-400/60' : ''}`}
              onClick={() => handlePlanSelect(plan)}
            style={{minHeight:'420px'}}
            >
            <div className="flex flex-col h-full bg-[#181928]/90 rounded-3xl p-8 backdrop-blur-xl">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 rounded-full shadow-lg animate-pulse">
                    <span className="text-white text-base font-bold flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 animate-spin-slow" />
                      Most Popular
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white/10 p-5 rounded-full mb-4 shadow-lg animate-fade-in">
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide animate-fade-in-up delay-100">{plan.name}</h3>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 animate-fade-in-up delay-150">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200 text-base">{feature}</span>
                    </div>
                  ))}
                </div>
                {selectedPlan?.name === plan.name && (
                  <div className="space-y-2 animate-fade-in-up delay-200">
                    {Object.entries(plan.price).map(([duration, price]) => {
                      const discount = getDiscountPercentage(plan, duration);
                      return (
                        <button
                          key={duration}
                          onClick={e => {e.stopPropagation(); handleDurationSelect(duration);}}
                          className={`w-full p-3 rounded-xl border-2 font-bold text-lg transition-all ${selectedDuration === duration ? 'border-pink-400 bg-pink-500/20 text-pink-200' : 'border-white/20 hover:border-pink-400 bg-white/5 text-white'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div>{getDurationLabel(duration)}</div>
                              {discount > 0 && <div className="text-green-400 text-xs font-semibold">Save {discount}%</div>}
                            </div>
                            <div className="text-right">
                              <div>₹{price}</div>
                              {duration !== '1yr' && (
                                <div className="text-gray-400 text-xs line-through">₹{duration === '5yr' ? plan.price['1yr'] * 5 : plan.price['1yr'] * 10}</div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
                  </div>
                ))}
              </div>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto mb-20 animate-fade-in-up delay-350">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">What Our Users Say</h2>
          <p className="text-lg text-gray-300">Real feedback from our premium members</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Aarav Sharma',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              text: 'The upgrade was totally worth it! The UI is beautiful and the features are next-level.',
              plan: 'Platinum',
            },
            {
              name: 'Priya Mehta',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              text: 'Support is super fast and the analytics help me grow my business. Highly recommended!',
              plan: 'Gold',
            },
            {
              name: 'Rahul Verma',
              avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
              text: 'I love the dark theme and the glassy look. My clients are impressed with my digital card.',
              plan: 'VIP',
            },
            {
              name: 'Sana Khan',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              text: 'The lifetime plan is a steal! Everything just works and looks amazing.',
              plan: 'Gallium',
            },
          ].map((t, i) => (
            <div key={i} className="bg-gradient-to-br from-[#23243a] via-[#1a1a2e] to-[#181928] rounded-3xl p-8 shadow-xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full border-4 border-pink-400 shadow-lg mb-4 z-10" />
              <h4 className="text-xl font-bold text-white mb-1 z-10">{t.name}</h4>
              <span className="text-pink-400 font-semibold mb-3 z-10">{t.plan} Plan</span>
              <p className="text-gray-300 text-base z-10">“{t.text}”</p>
              <Sparkles className="absolute bottom-4 right-4 h-6 w-6 text-pink-400/40 animate-spin-slow z-0" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mb-20 animate-fade-in-up delay-400">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300">Everything you need to know before upgrading</p>
        </div>
        <div className="space-y-6">
          {[{
            q: 'Can I upgrade my plan later?',
            a: 'Absolutely! You can upgrade at any time and only pay the difference.'
          }, {
            q: 'Is my payment secure?',
            a: 'Yes, all payments are processed securely and your data is encrypted.'
          }, {
            q: 'How fast is support for premium users?',
            a: 'Premium users get priority support, usually within 1 hour.'
          }, {
            q: 'What if I want a refund?',
            a: 'We offer a 7-day no-questions-asked refund policy for all new upgrades.'
          }].map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Payment Section Modern */}
        {step >= 2 && selectedPlan && selectedDuration && (
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in-up delay-400">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Order Summary */}
            <div className="bg-[#23243a]/80 rounded-3xl p-10 shadow-2xl border border-white/10 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="h-7 w-7 mr-3 text-pink-400 animate-bounce" />
                Order Summary
              </h2>
              <div className="space-y-5">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-400">Plan</span>
                      <span className="text-white font-semibold">{selectedPlan.name}</span>
                    </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-400">Duration</span>
                      <span className="text-white font-semibold">{getDurationLabel(selectedDuration)}</span>
                    </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-400">User</span>
                      <span className="text-white font-semibold">{user?.name || user?.email}</span>
                    </div>
                <hr className="border-white/10 my-4" />
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-pink-400">₹{selectedPlan.price[selectedDuration]}</span>
                    </div>
                    {getDiscountPercentage(selectedPlan, selectedDuration) > 0 && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 flex items-center space-x-2 animate-pulse">
                          <Award className="h-5 w-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            You save {getDiscountPercentage(selectedPlan, selectedDuration)}% with this plan!
                          </span>
                      </div>
                    )}
                  </div>
                </div>
            {/* QR Code Modern */}
            <div className="bg-[#23243a]/80 rounded-3xl p-10 shadow-2xl border border-white/10 flex flex-col items-center justify-center backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="h-7 w-7 mr-3 text-purple-400 animate-spin-slow" />
                Scan to Pay
              </h2>
              <div className="bg-gradient-to-br from-purple-700/30 via-pink-500/20 to-blue-500/10 p-6 rounded-2xl shadow-xl flex flex-col items-center">
                    <img 
                      src={QRCodeImage} 
                      alt="QR Code for Payment" 
                  className="w-56 h-56 mx-auto rounded-2xl border-4 border-pink-400/30 shadow-2xl animate-fade-in"
                />
                <p className="text-gray-300 text-base mt-4 text-center">Scan this QR code with your payment app to complete the transaction.</p>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* Upload Proof Section Modern */}
        {step >= 2 && (
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in-up delay-500">
          <div className="bg-[#23243a]/80 rounded-3xl p-10 shadow-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <FileImage className="h-7 w-7 mr-3 text-pink-400 animate-bounce" />
                Upload Payment Proof
              </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                <div className="border-2 border-dashed border-pink-400/30 rounded-2xl p-10 text-center hover:border-pink-400/60 transition-all bg-[#181928]/60">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="payment-proof"
                    />
                  <label htmlFor="payment-proof" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-14 w-14 text-pink-400 mx-auto mb-4 animate-bounce" />
                    <p className="text-white font-semibold mb-2 text-lg">Upload Payment Screenshot</p>
                    <p className="text-gray-400 text-base mb-2">Click to browse or drag and drop your payment screenshot here</p>
                    <p className="text-gray-500 text-xs mt-2">Supported: JPG, PNG, GIF (Max 5MB)</p>
                    </label>
                  </div>
                </div>
                {paymentProof && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                  <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(paymentProof)}
                        alt="Payment proof preview"
                      className="w-full h-56 object-cover rounded-xl border-2 border-pink-400/30 shadow-lg"
                      />
                    <div className="mt-3 flex items-center justify-between w-full">
                        <span className="text-gray-300 text-sm">{paymentProof.name}</span>
                      <span className="text-gray-400 text-xs">{(paymentProof.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Submit Button Modern */}
        {step >= 3 && selectedPlan && selectedDuration && paymentProof && (
        <div className="text-center mb-20 animate-fade-in-up delay-600">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
            className="px-16 py-5 text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-2xl shadow-xl transform hover:scale-105 disabled:opacity-60 disabled:scale-100 transition-all duration-300"
            >
              {submitting ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Submitting Request...</span>
                </div>
              ) : (
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 animate-pulse" />
                  <span>Submit Subscription Request</span>
                </div>
              )}
            </Button>
          <p className="text-gray-400 text-base mt-6">Your request will be reviewed within 24 hours. You'll receive a confirmation email once approved.</p>
          </div>
        )}

      {/* Animated background particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-bounce" />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-ping" />
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-30 animate-bounce" />
      </div>

      {/* Animations (TailwindCSS custom classes) */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s both; }
        .animate-fade-in-up { animation: fadeInUp 1s both; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

// FAQItem component
function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-[#23243a]/80 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-lg font-semibold text-white">{q}</span>
        <span className={`ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down text-pink-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </button>
      <div
        className={`px-6 pb-5 text-gray-300 text-base transition-all duration-300 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        {a}
      </div>
    </div>
  );
}

export default SubscriptionPlans;