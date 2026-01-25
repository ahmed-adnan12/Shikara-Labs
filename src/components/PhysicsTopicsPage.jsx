import React, { useState } from 'react';
import { 
  FlaskConical, ArrowLeft, Play, BookOpen
} from 'lucide-react';

export default function PhysicsTopicsPage() {
  const studentData = {
    fullName: "Ahmed",
    class: "10"
  };

  const experiments = [
    {
      id: 1,
      title: "Reflection of Light",
      icon: "💡"
    },
    {
      id: 2,
      title: "Refraction of Light",
      icon: "🌈"
    },
    {
      id: 3,
      title: "Spherical Mirrors",
      icon: "🪞"
    },
    {
      id: 4,
      title: "Lenses and Image Formation",
      icon: "🔍"
    },
    {
      id: 5,
      title: "Electric Current and Circuit",
      icon: "⚡"
    },
    {
      id: 6,
      title: "Ohm's Law",
      icon: "🔌"
    },
    {
      id: 7,
      title: "Series and Parallel Circuits",
      icon: "🔋"
    },
    {
      id: 8,
      title: "Magnetic Effects of Electric Current",
      icon: "🧲"
    },
    {
      id: 9,
      title: "Electromagnetic Induction (Faraday's Law)",
      icon: "⚙️"
    },
    {
      id: 10,
      title: "Electric Motor",
      icon: "🔄"
    },
    {
      id: 11,
      title: "Electric Generator",
      icon: "⚡"
    },
    {
      id: 12,
      title: "Newton's Laws of Motion",
      icon: "🎯"
    },
    {
      id: 13,
      title: "Free Fall and Gravity",
      icon: "🌍"
    },
    {
      id: 14,
      title: "Projectile Motion",
      icon: "🎾"
    },
    {
      id: 15,
      title: "Simple Pendulum",
      icon: "⏱️"
    },
    {
      id: 16,
      title: "Hooke's Law and Springs",
      icon: "🔗"
    },
    {
      id: 17,
      title: "Work and Energy",
      icon: "💪"
    },
    {
      id: 18,
      title: "Conservation of Energy",
      icon: "♻️"
    },
    {
      id: 19,
      title: "Sound Waves and Propagation",
      icon: "🔊"
    },
    {
      id: 20,
      title: "Resonance and Frequency",
      icon: "🎵"
    }
  ];

  const handleBackToDashboard = () => {
    alert('Returning to dashboard...');
  };

  const handleExperimentClick = (experiment) => {
    alert(`Opening experiment: ${experiment.title}... (Will be implemented later)`);
  };

  const initial = studentData.fullName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 md:px-12 lg:px-[70px] py-4 sm:py-5" style={{
        background: 'rgba(0, 0, 0, 0.95)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToDashboard}
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <ArrowLeft size={20} className="text-cyan-400" />
            </button>
            <FlaskConical size={32} className="text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              PHYSICS EXPERIMENTS
            </h1>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold" style={{
            background: 'linear-gradient(135deg, #00d4ff, #00ff88)'
          }}>
            <span className="text-black">{initial}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-[70px] py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 sm:p-10 rounded-2xl relative overflow-hidden" style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent)'
          }}></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
              Physics Virtual Lab ⚡
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-3">
              Class {studentData.class} - Select an experiment to start
            </p>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold" style={{
              background: 'rgba(0, 212, 255, 0.2)',
              color: '#00d4ff'
            }}>
              {experiments.length} Experiments Available
            </span>
          </div>
        </div>

        {/* Experiments List */}
        <div className="grid gap-4 sm:gap-5">
          {experiments.map((experiment) => (
            <div
              key={experiment.id}
              onClick={() => handleExperimentClick(experiment)}
              className="p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(0, 212, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent)'
              }}></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-4xl sm:text-5xl">{experiment.icon}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {experiment.title}
                  </h3>
                </div>
                
                <div className="ml-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #00d4ff, #00ff88)'
                }}>
                  <Play size={24} className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}