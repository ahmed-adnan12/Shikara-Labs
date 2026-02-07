import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Need', id: 'need' },
    { label: 'Objectives', id: 'objectives' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/15'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Animated top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex-shrink-0 flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 via-cyan-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                  <span className="text-black font-black text-lg tracking-tight">
                    S
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-green-400 rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-cyan-300 via-cyan-400 to-green-400 bg-clip-text text-transparent tracking-tight leading-tight">
                  SHIKARA LAB
                </span>
                <span className="text-[10px] font-medium text-cyan-500/60 tracking-[0.3em] uppercase -mt-0.5">
                  Innovation Studio
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <ul className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-2 py-1.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      onMouseEnter={() => setHoveredLink(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                        activeSection === link.id
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {/* Active / Hover background pill */}
                      {activeSection === link.id && (
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-400/20 rounded-xl border border-cyan-500/20 animate-fade-in" />
                      )}
                      {hoveredLink === link.id &&
                        activeSection !== link.id && (
                          <span className="absolute inset-0 bg-white/[0.05] rounded-xl transition-opacity duration-200" />
                        )}

                      <span className="relative z-10 flex items-center gap-1.5">
                        {link.label}
                        {activeSection === link.id && (
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50 animate-pulse" />
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="group relative px-7 py-2.5 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.98] cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gray-950/95 backdrop-blur-2xl z-50 md:hidden border-l border-cyan-500/10 shadow-2xl shadow-black/50 transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/[0.06]">
          <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-green-400 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile nav links */}
        <div className="px-4 py-6 space-y-1">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl font-semibold text-base transition-all duration-300 cursor-pointer group ${
                activeSection === link.id
                  ? 'bg-gradient-to-r from-cyan-500/15 to-green-400/10 text-white border border-cyan-500/20'
                  : 'text-gray-400 hover:bg-white/[0.04] hover:text-white border border-transparent'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms',
              }}
            >
              <span className="flex items-center gap-3">
                {activeSection === link.id && (
                  <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50" />
                )}
                {link.label}
              </span>
              <ChevronRight
                className={`w-4 h-4 transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-cyan-400 opacity-100'
                    : 'opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/[0.06]">
          <button className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer">
            <Sparkles className="w-4 h-4" />
            Get Started
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-center text-xs text-gray-600 mt-3">
            No credit card required
          </p>
        </div>
      </div>
    </>
  );
}