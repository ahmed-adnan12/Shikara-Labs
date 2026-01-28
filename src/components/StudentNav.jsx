import React, { useState } from 'react';
import { LogOut, User, Bell, Settings } from 'lucide-react';

export default function StudentNav({ studentName = "Ahmed", onLogout, onProfileClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const initial = studentName.split(' ')[0].charAt(0).toUpperCase();

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md px-4 sm:px-8 md:px-12 lg:px-[70px] py-4 sm:py-5"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
          fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif"
        }}
      >
        {/* Content wrapper */}
        <div>
          <div className="flex items-center justify-between w-full gap-8">
            {/* Logo Section - Left */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 group cursor-pointer transition-all duration-300">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-400 rounded opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 group-hover:blur-lg"></div>
                <div className="relative w-full h-full bg-black rounded flex items-center justify-center border border-cyan-500/30 group-hover:border-pink-500/60 transition-colors duration-300">
                  <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-green-400 group-hover:from-pink-400 group-hover:to-pink-400 bg-clip-text text-transparent transition-all duration-300">S</span>
                </div>
              </div>
              
              <span 
                className="text-xl sm:text-2xl font-black transition-all duration-400 group-hover:scale-110 group-hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.4))',
                  letterSpacing: '1px'
                }}
              >
                SHIKARA LAB
              </span>
            </div>

            {/* Center Spacer */}
            <div className="flex-1"></div>

            {/* Right Section - Profile & Actions */}
            <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
              {/* Notification Bell */}
              <button
                className="relative p-2 sm:p-2.5 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                }}
              >
                <Bell size={20} className="text-cyan-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>

              {/* User Profile Section */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(0, 212, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    if (!showUserMenu) {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                    }
                  }}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold" style={{
                    background: 'linear-gradient(135deg, #00d4ff, #00ff88)'
                  }}>
                    <span className="text-black">{initial}</span>
                  </div>
                  <span className="hidden sm:inline text-sm font-bold text-gray-200">{studentName}</span>
                  <svg
                    className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      background: 'rgba(0, 0, 0, 0.95)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Profile Section */}
                    <div className="px-4 py-3 border-b border-cyan-500/20">
                      <p className="text-sm font-bold text-white">{studentName}</p>
                      <p className="text-xs text-gray-400 mt-1">Class 10 • JKBOSE</p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        onProfileClick?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-cyan-400 flex items-center gap-3 transition-colors duration-200"
                    >
                      <User size={16} />
                      View Profile
                    </button>

                    <button
                      className="w-full px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-cyan-400 flex items-center gap-3 transition-colors duration-200"
                    >
                      <Settings size={16} />
                      Settings
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        onLogout?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-3 transition-colors duration-200 border-t border-cyan-500/20 mt-2 pt-3"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={onLogout}
                className="sm:hidden p-2 sm:p-2.5 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Close menu when clicking outside */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}

      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: slideInFromTop 0.2s ease-out;
        }
      `}</style>
    </>
  );
}