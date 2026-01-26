import { useState, useEffect } from 'react';

export default function Header() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'need', 'objectives', 'benefits', 'contact'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  const handleLogoClick = () => {
    setShowWelcome(true);
    setLogoClicked(true);
    setTimeout(() => {
      scrollToSection('home');
      setShowWelcome(false);
      setLogoClicked(false);
    }, 4000);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-6 px-[70px]" style={{ fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif" }}>
        <div className="flex justify-between items-center w-full gap-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-4 group cursor-pointer transition-all duration-300"
            onClick={handleLogoClick}
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-400 rounded opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 group-hover:blur-lg"></div>
              <div className="relative w-full h-full bg-black rounded flex items-center justify-center border border-cyan-500/30 group-hover:border-pink-500/60 transition-colors duration-300">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-green-400 group-hover:from-pink-400 group-hover:to-pink-400 bg-clip-text text-transparent transition-all duration-300">S</span>
              </div>
            </div>
            
            <span 
              className="text-4xl font-black transition-all duration-400 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-lg"
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

          {/* Nav Links & Button */}
          <div className="flex items-center gap-8 justify-center flex-1">
            {/* Nav Links Container */}
            <ul className="flex gap-8 list-none">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className={`nav-link-item ${activeSection === 'home' ? 'active' : ''}`}
                >
                  Home
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('need')} 
                  className={`nav-link-item ${activeSection === 'need' ? 'active' : ''}`}
                >
                  Need
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('objectives')} 
                  className={`nav-link-item ${activeSection === 'objectives' ? 'active' : ''}`}
                >
                  Objectives
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('benefits')} 
                  className={`nav-link-item ${activeSection === 'benefits' ? 'active' : ''}`}
                >
                  Benefits
                </button>
              </li>

              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`nav-link-item ${activeSection === 'contact' ? 'active' : ''}`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Get Started Button */}
          <button
            className="px-10 py-3 font-black text-sm rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
              boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
              color: '#000',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 255, 136, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
            }}
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-white/20 transition-all duration-500 -left-full group-hover:left-full"></span>
          </button>
        </div>
      </nav>

      {/* Welcome Popup */}
      {showWelcome && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-black pointer-events-auto" style={{
            background: `linear-gradient(135deg, rgba(0, 20, 40, 0.95) 0%, rgba(20, 0, 40, 0.98) 50%, rgba(0, 40, 20, 0.95) 100%),
                        radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.25) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 20, 147, 0.25) 0%, transparent 50%),
                        radial-gradient(circle at 40% 20%, rgba(0, 255, 136, 0.2) 0%, transparent 50%)`
          }}>
            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-float-1"></div>
            <div className="absolute top-40 right-20 w-56 h-56 bg-pink-500/15 rounded-full blur-3xl animate-float-2"></div>
            <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-green-400/15 rounded-full blur-3xl animate-float-3"></div>
            <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-blue-500/15 rounded-full blur-3xl animate-float-4"></div>
            
            {/* Animated Grid Lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}></div>

            {/* Radial Pulse */}
            <div className="absolute inset-0 animate-pulse-radial" style={{
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)'
            }}></div>
          </div>

          {/* Content */}
          <div className="relative text-center">
            <h1 
              className="text-6xl md:text-7xl font-black tracking-wider animate-welcome-text"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #ff1493 50%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.6))',
                letterSpacing: '3px'
              }}
            >
              WELCOME TO
            </h1>
            <h2 
              className="text-7xl md:text-8xl font-black tracking-wider animate-welcome-text-delay"
              style={{
                background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #ff1493 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(0, 255, 136, 0.8))',
                letterSpacing: '3px',
                marginTop: '10px'
              }}
            >
              SHIKARA LAB
            </h2>
          </div>
        </div>
      )}

      <style>{`
        .nav-link-item {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          display: block;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background: linear-gradient(90deg, #ff1493, #ff69b4);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-link-item:hover {
          color: #ff1493;
          background: rgba(255, 20, 147, 0.08);
          transform: translateY(-2px);
        }

        .nav-link-item:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-link-item.active {
          color: #ff1493;
          font-size: 20px;
          font-weight: 900;
          transform: scale(1.1);
        }

        .nav-link-item.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        @keyframes welcome-slow-motion {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
            filter: blur(10px);
          }
          30% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
            filter: blur(0px);
          }
          60% {
            opacity: 1;
            transform: scale(1) translateY(0px);
            filter: blur(0px);
          }
          70% {
            opacity: 1;
            transform: scale(1) translateY(0px);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.2) translateY(-30px);
            filter: blur(15px);
          }
        }

        @keyframes welcome-slow-motion-delay {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(40px);
            filter: blur(15px);
          }
          40% {
            opacity: 0;
            transform: scale(0.3) translateY(40px);
            filter: blur(15px);
          }
          70% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
            filter: blur(0px);
          }
          85% {
            opacity: 1;
            transform: scale(1) translateY(0px);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.3) translateY(-40px);
            filter: blur(20px);
          }
        }

        .animate-welcome-text {
          animation: welcome-slow-motion 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-welcome-text-delay {
          animation: welcome-slow-motion-delay 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -30px);
            opacity: 0.5;
          }
          50% {
            transform: translate(-20px, 20px);
            opacity: 0.3;
          }
          75% {
            transform: translate(40px, 10px);
            opacity: 0.4;
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          33% {
            transform: translate(-40px, 30px);
            opacity: 0.4;
          }
          66% {
            transform: translate(20px, -25px);
            opacity: 0.3;
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }
          40% {
            transform: translate(35px, -20px);
            opacity: 0.45;
          }
          80% {
            transform: translate(-30px, 25px);
            opacity: 0.2;
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(-25px, -35px);
            opacity: 0.4;
          }
        }

        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes pulse-radial {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 12s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }

        .animate-pulse-radial {
          animation: pulse-radial 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}