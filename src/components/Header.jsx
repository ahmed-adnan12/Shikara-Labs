import { useState } from 'react';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-[70px]" style={{ fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif" }}>
      <div className="flex justify-between items-center w-full gap-16">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-4 group cursor-pointer transition-all duration-300"
          onClick={() => {
            setIsClicked(true);
            scrollToSection('home');
            setTimeout(() => setIsClicked(false), 4000);
          }}
        >
          <div className={`relative w-12 h-12 transition-all duration-300 group-hover:scale-125 ${isClicked ? 'animate-logo-click' : ''}`}>
            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-400 rounded opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 group-hover:blur-lg ${isClicked ? 'animate-logo-glow' : ''}`}></div>
            <div className={`relative w-full h-full bg-black rounded flex items-center justify-center border border-cyan-500/30 group-hover:border-pink-500/60 transition-colors duration-300 ${isClicked ? 'animate-logo-border' : ''}`}>
              <span className={`text-2xl font-black bg-gradient-to-r from-cyan-400 to-green-400 group-hover:from-pink-400 group-hover:to-pink-400 bg-clip-text text-transparent transition-all duration-300 ${isClicked ? 'animate-s-letter' : ''}`}>S</span>
            </div>
          </div>
          
          <span 
            className={`text-4xl font-black transition-all duration-400 group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-lg ${isClicked ? 'animate-shine-click' : ''}`}
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
                className="nav-link-item"
              >
                Home
              </button>
            </li>

            <li
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav-link-item flex items-center gap-3">
                Virtual Labs
                <span className={`text-lg transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} style={{color: '#00ff88', marginLeft: '6px'}}>
                  ▼
                </span>
              </button>
              
              {/* Dropdown Menu */}
              <ul
                className={`absolute top-full left-0 min-w-56 mt-3 rounded-xl py-3 px-2 transition-all duration-300 ${
                  dropdownOpen
                    ? 'opacity-100 visible translate-y-0 scale-100'
                    : 'opacity-0 invisible -translate-y-3 scale-95'
                }`}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                  boxShadow: '0 15px 40px rgba(0, 212, 255, 0.12)',
                }}
              >
                <li><button className="dropdown-item">Physics Lab</button></li>
                <li><button className="dropdown-item">Chemistry Lab</button></li>
                <li><button className="dropdown-item">Biology Lab</button></li>
              </ul>
            </li>

            <li>
              <button 
                onClick={() => scrollToSection('need')} 
                className="nav-link-item"
              >
                Need
              </button>
            </li>

            <li>
              <button 
                onClick={() => scrollToSection('objectives')} 
                className="nav-link-item"
              >
                Objectives
              </button>
            </li>

            <li>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="nav-link-item"
              >
                Benefits
              </button>
            </li>

            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="nav-link-item"
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

        .dropdown-item {
          display: block;
          padding: 12px 16px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          margin-bottom: 4px;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(0, 212, 255, 0.15);
          color: #00ff88;
          padding-left: 20px;
          transform: translateX(4px);
        }

        @keyframes animate-pulse-click {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.2); }
        }

        @keyframes animate-glow-click {
          0%, 100% { filter: blur(2px); opacity: 0.75; }
          50% { filter: blur(8px); opacity: 1; }
        }

        @keyframes animate-spin-click {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes animate-bounce-click {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.5); }
        }

        @keyframes animate-shine-click {
          0%, 100% { 
            filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.4));
            transform: scale(1);
          }
          25% { 
            filter: drop-shadow(0 0 30px rgba(255, 20, 147, 0.8));
            transform: scale(1.15);
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(0, 255, 136, 0.8));
            transform: scale(1.05);
          }
          75% { 
            filter: drop-shadow(0 0 35px rgba(255, 105, 180, 0.8));
            transform: scale(1.1);
          }
        }

        .animate-pulse-click {
          animation: animate-pulse-click 0.6s ease-in-out 4;
        }

        .animate-glow-click {
          animation: animate-glow-click 0.6s ease-in-out 4;
        }

        .animate-spin-click {
          animation: animate-spin-click 0.8s ease-in-out 2;
        }

        .animate-bounce-click {
          animation: animate-bounce-click 0.5s ease-in-out 3;
        }

        .animate-shine-click {
          animation: animate-shine-click 3.5s ease-in-out 1;
        }

        @keyframes hypnotic-glow {
          0% {
            filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)) drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
            transform: scale(1) skewY(0deg);
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
          }
          15% {
            filter: drop-shadow(0 0 25px rgba(255, 20, 147, 0.8)) drop-shadow(0 0 40px rgba(255, 20, 147, 0.5));
            transform: scale(1.08) skewY(-1deg);
            text-shadow: 0 0 20px rgba(255, 20, 147, 1), 0 0 40px rgba(255, 20, 147, 0.6);
          }
          30% {
            filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.8)) drop-shadow(0 0 50px rgba(0, 255, 136, 0.5));
            transform: scale(1.05) skewY(1deg);
            text-shadow: 0 0 25px rgba(0, 255, 136, 1), 0 0 50px rgba(0, 255, 136, 0.6);
          }
          45% {
            filter: drop-shadow(0 0 35px rgba(100, 200, 255, 0.9)) drop-shadow(0 0 60px rgba(100, 200, 255, 0.5));
            transform: scale(1.1) skewY(-1.5deg);
            text-shadow: 0 0 30px rgba(100, 200, 255, 1), 0 0 60px rgba(100, 200, 255, 0.6);
          }
          60% {
            filter: drop-shadow(0 0 40px rgba(255, 105, 180, 0.9)) drop-shadow(0 0 70px rgba(255, 105, 180, 0.5));
            transform: scale(1.07) skewY(1.5deg);
            text-shadow: 0 0 35px rgba(255, 105, 180, 1), 0 0 70px rgba(255, 105, 180, 0.6);
          }
          75% {
            filter: drop-shadow(0 0 45px rgba(0, 255, 200, 0.9)) drop-shadow(0 0 80px rgba(0, 255, 200, 0.5));
            transform: scale(1.12) skewY(-2deg);
            text-shadow: 0 0 40px rgba(0, 255, 200, 1), 0 0 80px rgba(0, 255, 200, 0.6);
          }
          90% {
            filter: drop-shadow(0 0 50px rgba(255, 0, 127, 1)) drop-shadow(0 0 90px rgba(255, 0, 127, 0.6));
            transform: scale(1.15) skewY(2deg);
            text-shadow: 0 0 50px rgba(255, 0, 127, 1), 0 0 90px rgba(255, 0, 127, 0.7);
          }
          100% {
            filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)) drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
            transform: scale(1) skewY(0deg);
            text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
          }
        }

        .animate-shine-click {
          animation: hypnotic-glow 4s cubic-bezier(0.36, 0, 0.66, 1) 1;
        }

        @keyframes logo-spin-glow {
          0% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.4));
          }
          15% {
            transform: scale(1.2) rotate(45deg);
            filter: drop-shadow(0 0 20px rgba(255, 20, 147, 0.8)) drop-shadow(0 0 40px rgba(255, 20, 147, 0.5));
          }
          30% {
            transform: scale(1.3) rotate(90deg);
            filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.9)) drop-shadow(0 0 50px rgba(0, 255, 136, 0.6));
          }
          45% {
            transform: scale(1.25) rotate(180deg);
            filter: drop-shadow(0 0 35px rgba(100, 200, 255, 0.9)) drop-shadow(0 0 60px rgba(100, 200, 255, 0.6));
          }
          60% {
            transform: scale(1.35) rotate(270deg);
            filter: drop-shadow(0 0 40px rgba(255, 105, 180, 0.9)) drop-shadow(0 0 70px rgba(255, 105, 180, 0.6));
          }
          75% {
            transform: scale(1.3) rotate(315deg);
            filter: drop-shadow(0 0 45px rgba(0, 255, 200, 0.9)) drop-shadow(0 0 80px rgba(0, 255, 200, 0.6));
          }
          90% {
            transform: scale(1.25) rotate(360deg);
            filter: drop-shadow(0 0 50px rgba(255, 0, 127, 1)) drop-shadow(0 0 90px rgba(255, 0, 127, 0.7));
          }
          100% {
            transform: scale(1) rotate(360deg);
            filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.4));
          }
        }

        @keyframes letter-pulse-glow {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.8));
          }
          20% {
            transform: scale(1.4);
            filter: drop-shadow(0 0 25px rgba(255, 20, 147, 1)) drop-shadow(0 0 50px rgba(255, 20, 147, 0.8));
          }
          40% {
            transform: scale(1.2);
            filter: drop-shadow(0 0 30px rgba(0, 255, 136, 1)) drop-shadow(0 0 60px rgba(0, 255, 136, 0.8));
          }
          60% {
            transform: scale(1.5);
            filter: drop-shadow(0 0 35px rgba(100, 200, 255, 1)) drop-shadow(0 0 70px rgba(100, 200, 255, 0.8));
          }
          80% {
            transform: scale(1.3);
            filter: drop-shadow(0 0 40px rgba(255, 105, 180, 1)) drop-shadow(0 0 80px rgba(255, 105, 180, 0.8));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.8));
          }
        }

        @keyframes border-glow-pulse {
          0% {
            border-color: rgba(0, 212, 255, 0.5);
            box-shadow: 0 0 5px rgba(0, 212, 255, 0.3) inset;
          }
          25% {
            border-color: rgba(255, 20, 147, 1);
            box-shadow: 0 0 20px rgba(255, 20, 147, 0.6) inset, 0 0 30px rgba(255, 20, 147, 0.4);
          }
          50% {
            border-color: rgba(0, 255, 136, 1);
            box-shadow: 0 0 25px rgba(0, 255, 136, 0.6) inset, 0 0 40px rgba(0, 255, 136, 0.4);
          }
          75% {
            border-color: rgba(100, 200, 255, 1);
            box-shadow: 0 0 30px rgba(100, 200, 255, 0.6) inset, 0 0 50px rgba(100, 200, 255, 0.4);
          }
          100% {
            border-color: rgba(0, 212, 255, 0.5);
            box-shadow: 0 0 5px rgba(0, 212, 255, 0.3) inset;
          }
        }

        @keyframes glow-background {
          0% {
            filter: blur(2px) brightness(1);
          }
          50% {
            filter: blur(15px) brightness(1.3);
          }
          100% {
            filter: blur(2px) brightness(1);
          }
        }

        .animate-logo-click {
          animation: logo-spin-glow 4s cubic-bezier(0.36, 0, 0.66, 1) 1;
        }

        .animate-logo-glow {
          animation: glow-background 4s cubic-bezier(0.36, 0, 0.66, 1) 1;
        }

        .animate-logo-border {
          animation: border-glow-pulse 4s cubic-bezier(0.36, 0, 0.66, 1) 1;
        }

        .animate-s-letter {
          animation: letter-pulse-glow 4s cubic-bezier(0.36, 0, 0.66, 1) 1;
        }
      `}</style>
    </nav>
  );
}