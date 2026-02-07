import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('');
  
  try {
    const response = await fetch('https://formspree.io/f/xojnqdyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  } catch (error) {
    setSubmitStatus('error');
    setTimeout(() => setSubmitStatus(''), 5000);
  } finally {
    setIsSubmitting(false);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@shikara.lab",
      link: "mailto:support@shikara.lab"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 8899008194",
      link: "tel:+918899008194"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Srinagar, Jammu and Kashmir",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-12 lg:px-[70px] overflow-hidden" style={{
      background: '#000000',
    }}>
      <div className="relative z-10 w-full">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4" style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))',
              }}>
               Share Your Feedback
               </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mt-3 sm:mt-4 font-semibold">
               Have questions? We'd love to hear from you
              </p>
            </div>
            
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  className="group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden block"
                  style={{
                    background: 'rgba(0, 212, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div 
                      className="p-3 sm:p-4 rounded-lg sm:rounded-xl flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))',
                        border: '1px solid rgba(0, 212, 255, 0.2)'
                      }}
                    >
                      <Icon size={24} className="sm:w-7 sm:h-7" style={{color: '#00d4ff'}} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-base sm:text-lg font-black mb-1" style={{
                        background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {info.title}
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm font-medium truncate">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div
              className="p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 className="text-xl sm:text-2xl font-black mb-5 sm:mb-6" style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              Send Your Feedback
              </h3>

      
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold mb-2" style={{
                    background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="ahmed adnan"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold mb-2" style={{
                    background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="ahmed@example.com"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold mb-2" style={{
                    background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="+91 1234 567 890"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-bold mb-2" style={{
                    background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-3 sm:left-4 top-3 sm:top-4 text-cyan-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 focus:outline-none resize-none"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Share your experience, suggestions, or ideas..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-start pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-base sm:text-lg transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                      color: '#000000',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Feedback
                          <Send size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div 
                    className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl mt-3 sm:mt-4"
                    style={{
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                    }}
                  >
                    <p className="text-green-400 font-bold text-sm sm:text-base">
                      ✓ Thank you for your feedback! We appreciate your input.
                    </p>
                  </div>
                )}

             </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder,
        textarea::placeholder {
          color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </section>
  );
}