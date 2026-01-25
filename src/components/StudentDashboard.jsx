import React, { useState } from 'react';
import { 
  FlaskConical, LogOut, User, Bell, Search, 
  ChevronRight, Award, Clock, Target, FileText
} from 'lucide-react';

export default function StudentDashboard() {
  const [currentSubject, setCurrentSubject] = useState('physics');
  const [showLabModal, setShowLabModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const studentData = {
    fullName: "Ahmed",
    email: "ahmed@student.com",
    studentId: "STU2024001",
    class: "10",
    school: "Government High School",
    board: "JKBOSE"
  };

  const stats = [
    { label: 'Labs Completed', value: '24' },
    { label: 'Experiments Ongoing', value: '12' },
    { label: 'Average Score', value: '85%' },
    { label: 'Total Lab Time', value: '48h' }
  ];

  const subjects = [
    { id: 'physics', name: 'Physics', icon: '⚡' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' }
  ];

  const descriptions = {
    physics: `Master physics concepts through comprehensive virtual laboratories for Class ${studentData.class}. Prepare for JKBOSE board exams with real-world applications and interactive experiments.`,
    chemistry: `Conduct chemistry experiments virtually for Class ${studentData.class}. Master concepts in acids, bases, metals, organic chemistry, and prepare for board examinations.`,
    biology: `Examine biological concepts including life processes, genetics, and evolution for Class ${studentData.class}. Prepare thoroughly for JKBOSE biology examinations.`
  };

  const learningPoints = [
    "Master JKBOSE syllabus topics for your class",
    "Perform board exam level experiments",
    "Develop critical thinking skills",
    "Access experiments anytime, anywhere",
    "Practice with interactive simulations",
    "Prepare comprehensively for examinations"
  ];

  const handleLabClick = () => {
    setShowLabModal(true);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  const firstName = studentData.fullName.split(' ')[0];
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 md:px-12 lg:px-[70px] py-4 sm:py-5" style={{
        background: 'rgba(0, 0, 0, 0.95)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlaskConical size={32} className="text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              SHIKARA LAB
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold" style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)'
            }}>
              <span className="text-black">{initial}</span>
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              className="hidden sm:block px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
              }}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300"
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
              <LogOut size={16} className="sm:hidden" />
              <span className="hidden sm:inline">Logout</span>
            </button>
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
              Welcome back, {firstName}! 👋
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-3">
              Class {studentData.class}
            </p>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold" style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
              color: '#000000'
            }}>
              Board: {studentData.board}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <p className="text-xs sm:text-sm text-gray-400 mb-2">{stat.label}</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black" style={{
                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Subject Tabs */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 p-4 sm:p-5 rounded-2xl" style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setCurrentSubject(subject.id)}
              className="p-3 sm:p-4 rounded-xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base font-bold"
              style={{
                background: currentSubject === subject.id 
                  ? 'linear-gradient(135deg, #00d4ff, #00ff88)' 
                  : 'rgba(0, 0, 0, 0.3)',
                border: currentSubject === subject.id 
                  ? '2px solid transparent'
                  : '2px solid rgba(0, 212, 255, 0.2)',
                color: currentSubject === subject.id ? '#000000' : '#9ca3af'
              }}
              onMouseEnter={(e) => {
                if (currentSubject !== subject.id) {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  e.currentTarget.style.color = '#00d4ff';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSubject !== subject.id) {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.color = '#9ca3af';
                }
              }}
            >
              <span className="text-xl sm:text-2xl">{subject.icon}</span>
              <span>{subject.name}</span>
            </button>
          ))}
        </div>

        {/* Lab Access Section */}
        <div className="p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h3 className="text-xl sm:text-2xl font-black mb-6" style={{
            background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {subjects.find(s => s.id === currentSubject).name} Virtual Lab
          </h3>

          <div
            onClick={handleLabClick}
            className="p-8 sm:p-10 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(0, 212, 255, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent)'
            }}></div>
            <div className="relative z-10">
              <div className="text-5xl sm:text-6xl mb-6">
                {subjects.find(s => s.id === currentSubject).icon}
              </div>
              <h4 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                Class {studentData.class} - {subjects.find(s => s.id === currentSubject).name}
              </h4>
              <p className="text-base sm:text-lg text-gray-300 mb-6">
                {descriptions[currentSubject]}
              </p>
              <div className="flex items-center gap-3 text-cyan-400 text-lg font-bold">
                <span>Start Experiments</span>
                <ChevronRight size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Modal */}
      {showLabModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)' }}
          onClick={() => setShowLabModal(false)}
        >
          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-2xl relative"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLabModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ×
            </button>

            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold mb-6" style={{
              background: currentSubject === 'physics' 
                ? 'rgba(30, 64, 175, 0.2)' 
                : currentSubject === 'chemistry'
                ? 'rgba(159, 18, 57, 0.2)'
                : 'rgba(21, 128, 61, 0.2)',
              color: currentSubject === 'physics' 
                ? '#60a5fa' 
                : currentSubject === 'chemistry'
                ? '#f472b6'
                : '#4ade80'
            }}>
              {currentSubject.toUpperCase()} LAB
            </span>

            <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Class {studentData.class} - {subjects.find(s => s.id === currentSubject).name}
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              {descriptions[currentSubject]}
            </p>

            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">What you'll learn:</h3>
              <ul className="space-y-3">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => alert('Starting Lab...')}
              className="w-full py-4 rounded-xl text-base sm:text-lg font-black transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Lab Experiments
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)' }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="max-w-xl w-full p-6 sm:p-10 rounded-2xl relative"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#9ca3af'
              }}
            >
              ×
            </button>

            <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Student Profile
            </h2>

            <div className="space-y-4">
              {[
                { label: 'Full Name', value: studentData.fullName },
                { label: 'Email', value: studentData.email },
                { label: 'Student ID', value: studentData.studentId },
                { label: 'Current Class', value: `Class ${studentData.class}` },
                { label: 'School/University', value: studentData.school }
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-bold text-gray-400 mb-2">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    disabled
                    className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}