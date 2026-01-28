import React, { useState, useEffect } from 'react';
import { 
  Zap, Beaker, Microscope, ChevronRight, TrendingUp, 
  Calendar, BookOpen, Target, Sparkles, ArrowRight, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const [currentSubject, setCurrentSubject] = useState('physics');
  const [showLabModal, setShowLabModal] = useState(false);
  const [animateLoad, setAnimateLoad] = useState(false);

  useEffect(() => {
    setAnimateLoad(true);
  }, []);

  const studentData = {
    fullName: "Ahmed",
    email: "ahmed@student.com",
    studentId: "STU2024001",
    class: "10",
    school: "Government High School",
    board: "JKBOSE"
  };

  const firstName = studentData.fullName.split(' ')[0];

  const recentActivity = [
    { subject: 'Physics', experiment: 'Newton\'s Laws of Motion', status: 'completed', date: 'Today', score: '95%' },
    { subject: 'Chemistry', experiment: 'Acid-Base Titration', status: 'in-progress', date: 'Yesterday', score: '80%' },
    { subject: 'Biology', experiment: 'Photosynthesis Lab', status: 'pending', date: '2 days ago', score: '-' }
  ];

  const subjects = [
    { 
      id: 'physics', 
      name: 'Physics', 
      icon: Zap,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      accentColor: 'rgb(59, 130, 246)',
     
      progress: 75
    },
    { 
      id: 'chemistry', 
      name: 'Chemistry', 
      icon: Beaker,
      color: 'from-purple-500 to-pink-400',
      bgColor: 'rgba(168, 85, 247, 0.1)',
      borderColor: 'rgba(168, 85, 247, 0.3)',
      accentColor: 'rgb(168, 85, 247)',
     
      progress: 60
    },
    { 
      id: 'biology', 
      name: 'Biology', 
      icon: Microscope,
      color: 'from-emerald-500 to-green-400',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      accentColor: 'rgb(16, 185, 129)',
      
      progress: 85
    }
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

  const currentSubjectData = subjects.find(s => s.id === currentSubject);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-[70px] py-8 pt-20 sm: ">
        
        {/* Hero Section */}
        <div className={`mb-12 transition-all duration-1000 ${animateLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-12">
            {/* Main Welcome Card */}
            <div className="relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 rounded-3xl"></div>
              <div className="relative p-8 md:p-10 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm font-medium text-cyan-400 mb-2">Welcome back</p>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                      {firstName} 
                    </h1>
                    <p className="text-lg text-gray-400">Class {studentData.class} • {studentData.board}</p>
                  </div>
                  <div className="hidden md:block w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20"></div>
                </div>
                <p className="text-gray-300 max-w-4xl leading-relaxed">
                  Continue mastering JKBOSE curriculum through interactive virtual experiments. You're on track to excel in your board exams!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${animateLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Lab Sessions</h2>
            <p className="text-gray-400">Choose your subject and start experimenting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject, idx) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={subject.id}
                  onClick={() => {
                    setCurrentSubject(subject.id);
                    setShowLabModal(true);
                  }}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 ${
                    animateLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  {/* Background */}
                  <div className="absolute inset-0" style={{ background: subject.bgColor }}></div>
                  <div className="absolute inset-0 border rounded-2xl" style={{ borderColor: subject.borderColor }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className={`text-2xl font-black mb-1 bg-gradient-to-r ${subject.color} bg-clip-text text-transparent`}>
                            {subject.name}
                          </h3>
                          <p className="text-sm text-gray-400">{subject.labs} Labs Available</p>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${subject.color} bg-clip-padding text-white/20`}>
                          <IconComponent size={24} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-400">PROGRESS</span>
                          <span className="text-xs font-bold" style={{ color: subject.accentColor }}>
                            {subject.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-700`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-bold group-hover:translate-x-1 transition-transform duration-300" style={{ color: subject.accentColor }}>
                        <span>Explore Labs</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Stats Footer */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${animateLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'Total Hours', value: '48h', icon: Clock },
            { label: 'Avg. Score', value: '85%', icon: TrendingUp },
            { label: 'Completed', value: '24', icon: CheckCircle },
            { label: 'In Progress', value: '12', icon: Sparkles }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 p-4">
                <Icon size={20} className="text-cyan-400 mb-2 opacity-50" />
                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lab Modal */}
      {showLabModal && currentSubjectData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setShowLabModal(false)}
        >
          <div
            className="max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 rounded-3xl relative border border-cyan-500/30"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLabModal(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-gray-400 hover:text-cyan-400"
            >
              ×
            </button>

            <div className="mb-6">
              <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${currentSubjectData.color} bg-clip-padding text-white/80 mb-4`}>
                {currentSubject.toUpperCase()} LAB
              </div>
              <h2 className={`text-3xl font-black mb-2 bg-gradient-to-r ${currentSubjectData.color} bg-clip-text text-transparent`}>
                Class {studentData.class} - {currentSubjectData.name}
              </h2>
              <p className="text-gray-400 text-sm">
                {descriptions[currentSubject]}
              </p>
            </div>

            <div className="mb-8 p-6 rounded-2xl border border-gray-800 bg-gray-900/30">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={18} style={{ color: currentSubjectData.accentColor }} />
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${currentSubjectData.accentColor}20`, color: currentSubjectData.accentColor }}
                    >
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => alert('Starting Lab...')}
              className={`w-full py-3 rounded-xl font-bold text-black transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${currentSubjectData.color}`}
            >
              Start Lab Experiment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}