import { useState } from 'react';
import { Menu, X, LogOut, Settings, User, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdaptiveNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is on dashboard (including subject pages like /physics, /chemistry, /biology)
  const isDashboard = 
    location.pathname.includes('dashboard') || 
    location.pathname.includes('subject') ||
    location.pathname.includes('physics') ||
    location.pathname.includes('chemistry') ||
    location.pathname.includes('biology') ||
    location.pathname.includes('allexp');

  // Landing page navigation links
  const landingNavLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Need', id: 'need' },
    { label: 'Objectives', id: 'objectives' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Contact', id: 'contact' }
  ];

  // Dashboard navigation links
  const dashboardNavLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Labs', path: '/dashboard/labs' },
    { label: 'Progress', path: '/dashboard/progress' },
    { label: 'Resources', path: '/dashboard/resources' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = (link) => {
    if (link.label === 'Dashboard') {
      window.location.href = link.path;
    } else {
      setShowComingSoon(true);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  // Coming Soon Modal
  const ComingSoonModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-slate-900 rounded-2xl max-w-md w-full border border-slate-700 p-8 text-center">
        <h2 className="text-3xl font-black text-white mb-3">Coming Soon</h2>
        <p className="text-gray-400 text-lg mb-6">This feature is coming soon!</p>
        <button
          onClick={() => setShowComingSoon(false)}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-bold rounded-lg hover:shadow-lg transition-shadow"
        >
          OK
        </button>
      </div>
    </div>
  );

  // ============ LANDING PAGE NAVBAR ============
  if (!isDashboard) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-cyan-500/20">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="hidden sm:inline text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                SHIKARA LAB
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-6 lg:gap-8">
                {landingNavLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm lg:text-base font-semibold transition-colors duration-200 pb-2 border-b-2 text-gray-300 border-transparent hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Get Started Button */}
            <button className="hidden md:block px-6 lg:px-8 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-bold text-sm lg:text-base rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-200">
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-cyan-500/20">
              <ul className="space-y-2 pt-4">
                {landingNavLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 mx-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-200"
                style={{ width: 'calc(100% - 2rem)' }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // ============ DASHBOARD NAVBAR ============
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-md z-50 border-b border-slate-700">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="hidden sm:inline text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                SHIKARA LAB
              </span>
            </div>

            {/* Desktop Dashboard Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Back Button */}
              {isDashboard && location.pathname !== '/dashboard' && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-2"
                  title="Go Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-semibold">Back</span>
                </button>
              )}
              
              <ul className="flex gap-6 lg:gap-8">
                {dashboardNavLinks.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleDashboardClick(link)}
                      className="text-sm lg:text-base font-semibold transition-colors duration-200 pb-2 border-b-2 text-gray-400 border-transparent hover:text-white hover:border-cyan-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop User Menu & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setShowComingSoon(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-400 font-semibold hover:bg-red-500/20 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Dashboard Menu */}
          {isMobileMenuOpen && isDashboard && (
            <div className="md:hidden pb-4 border-t border-slate-700">
              {/* Back Button */}
              {location.pathname !== '/dashboard' && (
                <button
                  onClick={() => {
                    navigate(-1);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-cyan-400 hover:bg-slate-700 flex items-center gap-2 mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              
              <ul className="space-y-2 pt-4">
                {dashboardNavLinks.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleDashboardClick(link)}
                      className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-gray-400 hover:bg-slate-700 hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Settings & Logout */}
              <div className="pt-4 border-t border-slate-700 mt-4">
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-gray-400 hover:bg-slate-700 hover:text-white flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-gray-400 hover:bg-slate-700 hover:text-white flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 text-red-400 hover:bg-red-500/20 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Coming Soon Modal */}
      {showComingSoon && <ComingSoonModal />}
    </>
  );
}
