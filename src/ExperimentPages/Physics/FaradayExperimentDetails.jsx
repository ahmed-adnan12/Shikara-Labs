import React, { useState } from 'react';
import { ArrowRight, Clock, BookOpen, Zap, Microscope, TrendingUp, ChevronDown, X } from 'lucide-react';

function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      q: "What does Faraday's Law state?",
      options: [
        "A changing magnetic flux induces an electromotive force",
        "A stationary magnet creates electric current",
        "Current always flows from positive to negative",
        "Magnetic fields attract all metals"
      ],
      correct: 0,
      explain: "Faraday's Law specifically states that a changing magnetic flux through a circuit induces an EMF in that circuit. A stationary magnet produces no EMF."
    },
    {
      q: "In the equation ε = -dΦ/dt, what does dΦ/dt represent?",
      options: [
        "The magnetic field strength",
        "The rate of change of magnetic flux",
        "The induced current in the circuit",
        "The resistance of the coil"
      ],
      correct: 1,
      explain: "dΦ/dt is the rate of change of magnetic flux with respect to time. This is the key variable that determines the magnitude of induced EMF."
    },
    {
      q: "Why does the bulb in our simulation turn off when the magnet stops moving?",
      options: [
        "The magnet lost its magnetic properties",
        "The coil burned out",
        "The magnetic flux no longer changes, so dΦ/dt = 0",
        "The circuit is too strong for the bulb"
      ],
      correct: 2,
      explain: "When the magnet stops, the magnetic flux becomes constant. Since Faraday's Law depends on the rate of change (dΦ/dt), a constant flux produces zero EMF and no induced current."
    },
    {
      q: "What does the negative sign in ε = -dΦ/dt represent?",
      options: [
        "A negative voltage only",
        "Lenz's Law - the induced current opposes the change in flux",
        "The flux is decreasing",
        "The magnet is moving backward"
      ],
      correct: 1,
      explain: "The negative sign represents Lenz's Law, which states that the induced current creates a magnetic field opposing the change in flux. This is a fundamental principle of energy conservation."
    },
    {
      q: "How would you increase the induced current in the simulation?",
      options: [
        "Move the magnet more slowly",
        "Move the magnet faster or create more flux change",
        "Use a weaker magnet",
        "Move the coil instead of the magnet"
      ],
      correct: 1,
      explain: "Since EMF = -dΦ/dt, a faster change in flux (faster magnet movement) produces larger EMF and larger induced current, making the bulb brighter."
    },
    {
      q: "Which of these is NOT a real-world application of Faraday's Law?",
      options: [
        "Wireless charging systems",
        "Electric power generators",
        "Cooling refrigerators without magnets",
        "Transformers in power systems"
      ],
      correct: 2,
      explain: "Refrigerators cool using the refrigeration cycle (compression/expansion), not electromagnetic induction. All other options are direct applications of Faraday's Law."
    },
    {
      q: "What is magnetic flux (Φ)?",
      options: [
        "The speed of a magnetic field",
        "The total magnetic field passing through a surface",
        "The force exerted by a magnet",
        "The direction of magnetic field lines"
      ],
      correct: 1,
      explain: "Magnetic flux is the total amount of magnetic field passing through a defined surface area, measured in Weber (Wb). It's a fundamental concept in electromagnetic induction."
    },
    {
      q: "In a generator, how is Faraday's Law applied?",
      options: [
        "A stationary magnet powers the generator",
        "A rotating magnet changes the flux through coils, inducing alternating current",
        "The generator uses only one coil",
        "Generators don't actually use Faraday's Law"
      ],
      correct: 1,
      explain: "Generators work by rotating magnets near coils. This continuous rotation causes the magnetic flux through the coils to constantly change, continuously inducing EMF and producing alternating current."
    }
  ];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setAnswered(true);
    
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, {
      question: currentQuestion,
      selected: index,
      correct: questions[currentQuestion].correct,
      isCorrect: isCorrect
    }]);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setUserAnswers([]);
  };

  return (
    <div className="space-y-6">
      {showScore ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h3>
            <div className="text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-gray-300 mb-6">
              {score === questions.length && "Perfect score! You're a Faraday expert!"}
              {score >= questions.length * 0.8 && score < questions.length && "Excellent! You have a strong understanding of Faraday's Law."}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good job! Review the concepts you missed to strengthen your knowledge."}
              {score < questions.length * 0.6 && "Keep studying! Faraday's Law has many nuances. Review the simulations and materials to improve."}
            </p>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300 mb-4">Review Your Answers</h4>
            {userAnswers.map((answer, idx) => (
              <div key={idx} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                <div className="flex items-start gap-3">
                  <div className={`text-2xl font-bold w-8 flex-shrink-0 ${answer.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {answer.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-100 mb-2">{questions[answer.question].q}</p>
                    <p className="text-sm text-gray-300 mb-2">
                      Your answer: <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>{questions[answer.question].options[answer.selected]}</span>
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sm text-green-400 mb-2">
                        Correct answer: {questions[answer.question].options[answer.correct]}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 italic">{questions[answer.question].explain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Question {currentQuestion + 1}/{questions.length}</span>
              <span className="text-sm font-semibold text-purple-400">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-100">{questions[currentQuestion].q}</h3>
            
            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !answered && handleAnswerClick(index)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    answered
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-900/40 border-green-500 text-green-100'
                        : index === selectedAnswer && index !== questions[currentQuestion].correct
                        ? 'bg-red-900/40 border-red-500 text-red-100'
                        : 'bg-gray-800/20 border-gray-600 text-gray-400 opacity-50'
                      : selectedAnswer === index
                      ? 'bg-purple-900/50 border-purple-500 text-purple-100'
                      : 'bg-gray-800/20 border-gray-600 hover:border-purple-400 text-gray-300 hover:bg-purple-900/20'
                  } ${!answered && 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answered
                        ? index === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-500'
                          : index === selectedAnswer && index !== questions[currentQuestion].correct
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-600'
                        : selectedAnswer === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-600'
                    }`}>
                      {answered && index === questions[currentQuestion].correct && '✓'}
                      {answered && index === selectedAnswer && index !== questions[currentQuestion].correct && '✗'}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {answered && (
              <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg mb-6">
                <p className="text-sm text-blue-200">
                  <span className="font-semibold">Explanation:</span> {questions[currentQuestion].explain}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ResourcePopup({ resource, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{resource.icon}</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-100">{resource.title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">{resource.desc}</p>
        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <p className="text-yellow-200 text-sm font-semibold">⏰ Coming Soon</p>
          <p className="text-yellow-100 text-sm mt-1">This resource will be available shortly. Check back soon!</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default function FaradayDetails() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

        .glow-border {
          border: 1px solid rgba(168, 85, 247, 0.2);
          background: linear-gradient(135deg, rgba(88, 28, 135, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
          backdrop-filter: blur(10px);
        }

        .timeline-item {
          position: relative;
          padding-left: 40px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.5) 0%, transparent 100%);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.8);
          border: 2px solid rgba(168, 85, 247, 1);
        }

        .expand-icon {
          transition: transform 0.3s ease;
        }

        .expand-icon.rotated {
          transform: rotate(180deg);
        }

        .content-reveal {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .content-reveal.open {
          max-height: 500px;
        }

        .equation-box {
          font-family: 'Courier New', monospace;
          background: rgba(0, 0, 0, 0.3);
          border-left: 3px solid rgba(168, 85, 247, 0.8);
          padding: 1.5rem;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }

        h2 {
          font-family: 'Georgia', serif;
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #a855f7 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-family: 'Georgia', serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #e0e7ff;
        }

        p, li {
          font-family: 'Segoe UI', system-ui, sans-serif;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          font-size: 1.05rem;
        }
      `}</style>

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-[70px] py-16 sm:py-24">
          
          {/* Header Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <span className="text-purple-300 font-semibold tracking-widest">EXPERIMENT</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Faraday's Law of<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Electromagnetic Induction
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Discover how changing magnetic fields create electric currents. This fundamental principle powers generators, transformers, and wireless charging—reshaping our modern world.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group">
              Launch Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Clock, label: 'Discovered', value: '1831' },
              { icon: BookOpen, label: 'Category', value: 'Electromagnetism' },
              { icon: TrendingUp, label: 'Difficulty', value: 'Intermediate' }
            ].map((stat, i) => (
              <div key={i} className="glow-border rounded-xl p-6 group hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon size={24} className="text-purple-400" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8 mb-20">
            
            {/* Overview Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>What is Faraday's Law?</h2>
              <p className="mb-6">
                Faraday's Law of Electromagnetic Induction states that a changing magnetic flux through a circuit induces an electromotive force (EMF) in that circuit. In simpler terms: when a magnetic field changes, it creates electricity.
              </p>
              <p>
                This revolutionary discovery unified electricity and magnetism, laying the groundwork for modern electrical engineering. Without Faraday's Law, we wouldn't have electric generators, transformers, or the vast majority of electrical devices that power our civilization.
              </p>
            </section>

            {/* The Equation */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>The Mathematical Formula</h2>
              <div className="mt-8 space-y-6">
                <div className="equation-box">
                  ε = -dΦ/dt
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300 font-semibold mb-2">Where:</p>
                    <ul className="space-y-3 text-gray-300">
                      <li><span className="font-mono text-purple-400">ε</span> (epsilon) = Induced EMF (volts)</li>
                      <li><span className="font-mono text-purple-400">dΦ/dt</span> = Rate of change of magnetic flux (Weber/second)</li>
                      <li><span className="font-mono text-purple-400">−</span> = Negative sign indicates Lenz's Law (opposition to change)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-blue-300">Key Insight:</span> The magnitude of induced current depends on <strong>how fast</strong> the magnetic flux changes, not on its absolute value. A stationary magnet creates no current!
                  </p>
                </div>
              </div>
            </section>

            {/* Historical Timeline */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Historical Timeline</h2>
              <div className="mt-8 space-y-8">
                {[
                  {
                    year: '1831',
                    title: 'Faraday\'s Discovery',
                    desc: 'Michael Faraday discovers electromagnetic induction through his ingenious experiments with coils and magnets.'
                  },
                  {
                    year: '1865',
                    title: 'Maxwell\'s Equations',
                    desc: 'James Clerk Maxwell mathematically formulates Faraday\'s discoveries, unifying electricity, magnetism, and light.'
                  },
                  {
                    year: '1876',
                    title: 'First AC Generator',
                    desc: 'Nikola Tesla and others develop practical AC generators based on Faraday\'s Law, revolutionizing power distribution.'
                  },
                  {
                    year: 'Today',
                    title: 'Modern Applications',
                    desc: 'Every power grid, wireless charger, and electric motor operates on the principles Faraday discovered.'
                  }
                ].map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="group">
                      <p className="text-purple-400 font-bold text-lg">{event.year}</p>
                      <h4 className="text-xl font-semibold mt-2 mb-2">{event.title}</h4>
                      <p className="text-gray-400">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Concepts */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Key Concepts</h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    id: 'magnetic-flux',
                    title: '🧲 Magnetic Flux (Φ)',
                    summary: 'The total magnetic field passing through a surface.',
                    details: 'Measured in Weber (Wb). Think of it as counting the number of magnetic field lines passing through an area. More field lines = higher flux. The coil in our simulation experiences changing flux as the magnet moves.'
                  },
                  {
                    id: 'lenz-law',
                    title: '⚡ Lenz\'s Law',
                    summary: 'The induced current opposes the change in flux.',
                    details: 'When magnetic flux increases, the induced current creates a magnetic field opposing this increase. This is why the negative sign appears in Faraday\'s equation. This self-opposing nature prevents perpetual motion machines.'
                  },
                  {
                    id: 'emf',
                    title: '⏧ Electromotive Force (EMF)',
                    summary: 'The "push" that drives electrons through the circuit.',
                    details: 'EMF is measured in volts. A larger rate of flux change creates a larger EMF, which drives a larger current through the circuit, making the bulb brighter in our simulation.'
                  }
                ].map((concept) => (
                  <div key={concept.id}>
                    <button
                      onClick={() => toggleSection(concept.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group"
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-100 group-hover:text-purple-300 transition-colors">{concept.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{concept.summary}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-purple-400 expand-icon ${expandedSection === concept.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === concept.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-purple-500/10">
                        <p className="text-gray-300">{concept.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Real-World Applications */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Real-World Applications</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: '🏭 Power Generators',
                    desc: 'Spinning magnets near coils generate the electricity powering homes and cities.'
                  },
                  {
                    title: '🔌 Transformers',
                    desc: 'Changing currents in one coil induce currents in another, stepping voltage up or down.'
                  },
                  {
                    title: '📱 Wireless Charging',
                    desc: 'Oscillating magnetic fields from a charger pad induce current in your device\'s coil.'
                  },
                  {
                    title: '🎧 Headphones & Speakers',
                    desc: 'Electromagnets create changing magnetic fields that move speaker cones.'
                  },
                  {
                    title: '🚗 Electric Motors',
                    desc: 'Alternating currents create rotating magnetic fields that spin motors.'
                  },
                  {
                    title: '📡 Induction Cooktops',
                    desc: 'Electromagnetic induction heats cookware directly without burning surfaces.'
                  }
                ].map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                    <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                    <p className="text-gray-400">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Video Explanation</h2>
              <p className="text-gray-300 mb-6">Watch this comprehensive video to deepen your understanding of electromagnetic induction:</p>
              <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dChF1iiza1U"
                  title="Faraday's Law of Electromagnetic Induction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4">Video: "Electromagnetic Induction" - A clear visual explanation of how changing magnetic fields create electric currents.</p>
            </section>

            {/* Simulation Guide */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
              <div className="flex items-start gap-4">
                <Microscope size={32} className="text-indigo-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="!mb-4">Simulation Walkthrough</h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-semibold text-indigo-300 mb-1">1. Observe Initial State</p>
                      <p>The magnet starts away from the coil. Notice the bulb is OFF—no changing flux means no induced current.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-300 mb-1">2. Move the Magnet</p>
                      <p>Drag the magnet toward the coil. The bulb brightness increases with your magnet's speed. Faster movement = greater flux change = brighter bulb.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-300 mb-1">3. Stop and Observe</p>
                      <p>Hold the magnet still inside or near the coil. The bulb turns OFF immediately—Faraday's Law depends on change, not position.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-300 mb-1">4. Experiment Freely</p>
                      <p>Try different speeds and directions. Watch the real-time values: induced current, flux rate, and distance. Discover the physics through experimentation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Frequently Asked Questions</h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    id: 'faq-1',
                    q: 'Why does the bulb turn off when the magnet stops moving?',
                    a: 'Faraday\'s Law depends on the rate of change of magnetic flux (dΦ/dt), not the flux itself. When the magnet stops, the flux no longer changes, so dΦ/dt = 0, resulting in zero induced EMF. The bulb relies on this EMF to light up, so it immediately turns off. This is the key insight: it\'s the change that matters!'
                  },
                  {
                    id: 'faq-2',
                    q: 'What does the negative sign in the equation mean?',
                    a: 'The negative sign represents Lenz\'s Law, which states that the induced current opposes the change in magnetic flux. If flux through a coil increases, the induced current creates a magnetic field opposing this increase. This opposition prevents runaway systems and conserves energy.'
                  },
                  {
                    id: 'faq-3',
                    q: 'How is this used in real generators?',
                    a: 'In power generators, magnets spin rapidly inside coils of wire. As they spin, the magnetic flux through the coils constantly changes (increases and decreases), inducing a continuously changing EMF. This creates alternating current (AC), which powers most of our homes and devices.'
                  },
                  {
                    id: 'faq-4',
                    q: 'Why does faster magnet movement make the bulb brighter?',
                    a: 'A faster-moving magnet causes the magnetic flux to change more rapidly. Since induced EMF is proportional to dΦ/dt (the rate of change), faster movement produces a larger EMF, which drives a larger current through the circuit, making the bulb brighter.'
                  },
                  {
                    id: 'faq-5',
                    q: 'Can you have induction without a coil?',
                    a: 'Induction can occur in any closed conducting loop, not just a coil. A single wire loop works, as does a conducting ring or any closed path. Coils are used because multiple turns multiply the effect: each turn contributes to the total induced EMF, making coils much more efficient.'
                  },
                  {
                    id: 'faq-6',
                    q: 'How does wireless charging use Faraday\'s Law?',
                    a: 'Wireless chargers use an oscillating (alternating) current in a coil pad to create a changing magnetic field. Your phone\'s internal charging coil experiences this changing flux, inducing a current that powers up your battery. It\'s Faraday\'s Law in action, contactless!'
                  },
                  {
                    id: 'faq-7',
                    q: 'What\'s the difference between magnetic flux and induced current?',
                    a: 'Magnetic flux (Φ) is the total magnetic field passing through a surface, measured in Weber. Induced current is the flow of electrons created by the changing flux. Flux is the cause; current is the effect. The simulation shows: flux changes → EMF is induced → current flows → bulb lights.'
                  },
                  {
                    id: 'faq-8',
                    q: 'Does the direction of magnet movement matter?',
                    a: 'Yes! Moving the magnet toward the coil increases flux (one direction of EMF), while moving it away decreases flux (opposite direction of EMF). This causes the induced current to reverse direction. In AC generators, this reversal happens many times per second, creating alternating current.'
                  }
                ].map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group text-left"
                    >
                      <p className="font-semibold text-gray-100 group-hover:text-blue-300 transition-colors">{item.q}</p>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-blue-400 expand-icon ${expandedSection === item.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === item.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-blue-500/10">
                        <p className="text-gray-300 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Resources */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Study Resources</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📖',
                    title: 'Study Notes',
                    desc: 'Comprehensive handwritten notes covering all concepts of Faraday\'s Law with detailed explanations, diagrams, and worked examples.',
                    color: 'from-emerald-900/30 to-teal-900/30',
                    borderColor: 'border-emerald-500/20'
                  },
                  {
                    icon: '📝',
                    title: 'PYQ Papers',
                    desc: 'Previous year question papers from various competitive exams and board examinations with solutions and answer keys.',
                    color: 'from-cyan-900/30 to-blue-900/30',
                    borderColor: 'border-cyan-500/20'
                  },
                  {
                    icon: '💾',
                    title: 'Study Materials',
                    desc: 'High-quality PDFs, infographics, concept maps, and summary sheets for quick revision and memorization.',
                    color: 'from-violet-900/30 to-purple-900/30',
                    borderColor: 'border-violet-500/20'
                  },
                  {
                    icon: '✏️',
                    title: 'Sample Papers',
                    desc: 'Full-length practice tests with answer explanations to help you prepare for exams and assess your understanding.',
                    color: 'from-orange-900/30 to-red-900/30',
                    borderColor: 'border-orange-500/20'
                  }
                ].map((resource, i) => (
                  <div key={i} className={`bg-gradient-to-br ${resource.color} rounded-xl border ${resource.borderColor} p-6 hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}>
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{resource.desc}</p>
                    <button 
                      onClick={() => setSelectedResource(resource)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 group/btn"
                    >
                      Access Resource
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quiz Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-blue-900/30">
              <button
                onClick={() => setQuizExpanded(!quizExpanded)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="!mb-0">Test Your Knowledge</h2>
                <ChevronDown 
                  size={28} 
                  className={`flex-shrink-0 text-purple-400 transition-transform duration-300 ${quizExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              
              {quizExpanded && (
                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <p className="text-gray-300 mb-8">Challenge yourself with this interactive quiz on Faraday's Law. Select your answers and get instant feedback!</p>
                  <QuizComponent />
                </div>
              )}
            </section>

          </div>

          {/* Footer CTA */}
          <div className="glow-border rounded-2xl p-8 sm:p-10 text-center">
            <h3>Ready to Explore?</h3>
            <p className="text-gray-300 my-6 max-w-2xl mx-auto">
              Launch the interactive simulation and discover Faraday's Law through hands-on experimentation. Drag, observe, and understand the fundamental principle that powers our world.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group">
              Open Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

      </div>

      {selectedResource && (
        <ResourcePopup 
          resource={selectedResource} 
          onClose={() => setSelectedResource(null)} 
        />
      )}
    </div>
  );
}