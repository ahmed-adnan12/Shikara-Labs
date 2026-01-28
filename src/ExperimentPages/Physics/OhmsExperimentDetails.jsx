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
      q: "What does Ohm's Law state?",
      options: [
        "Voltage equals current times resistance (V = IR)",
        "Current is inversely proportional to voltage",
        "Resistance is always constant regardless of voltage",
        "Power equals voltage squared divided by current"
      ],
      correct: 0,
      explain: "Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R). This fundamental relationship is written as V = IR and is the foundation of electrical circuit analysis."
    },
    {
      q: "In the equation V = IR, what does the 'I' represent?",
      options: [
        "Impedance measured in ohms",
        "Current measured in amperes",
        "Intensity of light",
        "Initial voltage"
      ],
      correct: 1,
      explain: "In Ohm's Law, 'I' represents current measured in amperes (A). It shows how much electric charge flows through a circuit per unit time."
    },
    {
      q: "If voltage increases while resistance stays constant, what happens to current?",
      options: [
        "Current decreases",
        "Current stays the same",
        "Current increases",
        "Current becomes zero"
      ],
      correct: 2,
      explain: "According to V = IR, if voltage increases and resistance remains constant, current must increase proportionally. They have a direct linear relationship."
    },
    {
      q: "What is the SI unit of resistance?",
      options: [
        "Ampere",
        "Volt",
        "Ohm (Ω)",
        "Watt"
      ],
      correct: 2,
      explain: "The SI unit of electrical resistance is the Ohm, represented by the symbol Ω (omega). It's named after Georg Simon Ohm who discovered Ohm's Law."
    },
    {
      q: "Which device is an example of a resistor?",
      options: [
        "An ideal wire with no resistance",
        "A light bulb filament",
        "A battery",
        "A switch"
      ],
      correct: 1,
      explain: "A light bulb filament is a resistor that converts electrical energy into heat and light. The resistance of the filament opposes current flow and generates the glow."
    },
    {
      q: "If resistance increases while voltage stays constant, what happens to current?",
      options: [
        "Current increases proportionally",
        "Current decreases proportionally",
        "Current remains unchanged",
        "Current becomes infinite"
      ],
      correct: 1,
      explain: "From V = IR, if resistance increases while voltage stays constant, current must decrease. Current and resistance have an inverse relationship."
    },
    {
      q: "What is the relationship between power, voltage, and current?",
      options: [
        "P = V + I",
        "P = V × I",
        "P = V ÷ I",
        "P = I²R is unrelated to voltage"
      ],
      correct: 1,
      explain: "Power (P) equals voltage (V) multiplied by current (I), expressed as P = V × I. This shows how much energy is transferred per unit time in a circuit."
    },
    {
      q: "In a circuit, doubling the resistance while keeping voltage constant will have what effect?",
      options: [
        "Current doubles",
        "Current remains the same",
        "Current is halved",
        "Voltage doubles"
      ],
      correct: 2,
      explain: "Using V = IR, if R doubles while V stays constant, I must be halved. This inverse relationship demonstrates why resistance opposes current flow."
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
              {score === questions.length && "Perfect score! You're an Ohm's Law expert!"}
              {score >= questions.length * 0.8 && score < questions.length && "Excellent! You have a strong understanding of Ohm's Law."}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good job! Review the concepts you missed to strengthen your knowledge."}
              {score < questions.length * 0.6 && "Keep studying! Ohm's Law has important nuances. Review the materials to improve."}
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

export default function OhmsExperimentDetails() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-amber-950 via-orange-900 to-red-950 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
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
          border: 1px solid rgba(251, 146, 60, 0.2);
          background: linear-gradient(135deg, rgba(180, 83, 9, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%);
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
          background: linear-gradient(180deg, rgba(251, 146, 60, 0.5) 0%, transparent 100%);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(251, 146, 60, 0.8);
          border: 2px solid rgba(251, 146, 60, 1);
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
          border-left: 3px solid rgba(251, 146, 60, 0.8);
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
          background: linear-gradient(135deg, #fb9241 0%, #f59e0b 100%);
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
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <span className="text-orange-300 font-semibold tracking-widest">EXPERIMENT</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Ohm's Law<br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                The Foundation of Electronics
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Discover the fundamental relationship between voltage, current, and resistance. This essential principle powers everything from household circuits to complex electronic devices.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 group">
              Launch Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Clock, label: 'Discovered', value: '1827' },
              { icon: BookOpen, label: 'Category', value: 'Electrical Science' },
              { icon: TrendingUp, label: 'Difficulty', value: 'Beginner' }
            ].map((stat, i) => (
              <div key={i} className="glow-border rounded-xl p-6 group hover:border-orange-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon size={24} className="text-orange-400" />
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
              <h2>What is Ohm's Law?</h2>
              <p className="mb-6">
                Ohm's Law states that the voltage (V) across a conductor is directly proportional to the current (I) flowing through it, with the constant of proportionality being the resistance (R). Expressed mathematically: V = IR.
              </p>
              <p>
                Discovered by Georg Simon Ohm in 1827, this law is the most fundamental principle in electrical circuits and electronics. It explains how voltage, current, and resistance relate to each other, forming the basis for understanding and designing electrical systems worldwide.
              </p>
            </section>

            {/* The Equation */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>The Mathematical Formula</h2>
              <div className="mt-8 space-y-6">
                <div className="equation-box">
                  V = IR
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-orange-300 font-semibold mb-2">Where:</p>
                    <ul className="space-y-3 text-gray-300">
                      <li><span className="font-mono text-orange-400">V</span> = Voltage measured in Volts (V)</li>
                      <li><span className="font-mono text-orange-400">I</span> = Current measured in Amperes (A)</li>
                      <li><span className="font-mono text-orange-400">R</span> = Resistance measured in Ohms (Ω)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/20">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-yellow-300">Key Insight:</span> This linear relationship means that current increases proportionally with voltage and decreases proportionally with resistance. Understanding this relationship is essential for circuit design and troubleshooting.
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
                    year: '1827',
                    title: 'Ohm\'s Discovery',
                    desc: 'Georg Simon Ohm publishes his law describing the relationship between voltage, current, and resistance in electrical circuits.'
                  },
                  {
                    year: '1860',
                    title: 'Scientific Recognition',
                    desc: 'The unit of electrical resistance is named the "Ohm" (Ω) in honor of Georg Simon Ohm\'s contributions to electrical science.'
                  },
                  {
                    year: '1900s',
                    title: 'Practical Applications',
                    desc: 'Ohm\'s Law becomes fundamental to electrical engineering, enabling the design of safe and efficient electrical systems.'
                  },
                  {
                    year: 'Today',
                    title: 'Modern Electronics',
                    desc: 'Every electronic device from smartphones to power grids relies on Ohm\'s Law for proper operation and safety.'
                  }
                ].map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="group">
                      <p className="text-orange-400 font-bold text-lg">{event.year}</p>
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
                    id: 'voltage',
                    title: '⚡ Voltage (V)',
                    summary: 'The electrical potential difference that drives current.',
                    details: 'Measured in Volts (V). Voltage is the "push" that makes electrons move through a circuit. Higher voltage means stronger electrical potential energy available to do work.'
                  },
                  {
                    id: 'current',
                    title: '🔌 Current (I)',
                    summary: 'The flow of electric charge through a conductor.',
                    details: 'Measured in Amperes (A). Current represents the amount of charge flowing past a point per unit time. More current means more electrons moving through the circuit.'
                  },
                  {
                    id: 'resistance',
                    title: '🛑 Resistance (R)',
                    summary: 'The opposition to the flow of electric current.',
                    details: 'Measured in Ohms (Ω). Resistance is what limits current flow. Materials with high resistance restrict current, while low resistance allows easy current flow.'
                  }
                ].map((concept) => (
                  <div key={concept.id}>
                    <button
                      onClick={() => toggleSection(concept.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-900/30 to-amber-900/30 rounded-lg border border-orange-500/20 hover:border-orange-400/50 transition-all duration-300 group"
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-100 group-hover:text-orange-300 transition-colors">{concept.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{concept.summary}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-orange-400 expand-icon ${expandedSection === concept.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === concept.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-orange-500/10">
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
                    title: '💡 Light Bulbs',
                    desc: 'The filament\'s resistance converts electrical energy into light and heat as current flows through it.'
                  },
                  {
                    title: '🔋 Battery Circuits',
                    desc: 'Batteries provide voltage that drives current through resistors and devices in a circuit.'
                  },
                  {
                    title: '🏠 Home Wiring',
                    desc: 'Electrical systems use voltage (120V/240V), current ratings, and circuit breakers based on Ohm\'s Law principles.'
                  },
                  {
                    title: '📱 Smartphone Chargers',
                    desc: 'Chargers regulate voltage and current to safely and efficiently charge device batteries.'
                  },
                  {
                    title: '⚙️ Industrial Motors',
                    desc: 'Motors require specific voltage and current relationships controlled by resistance and inductance.'
                  },
                  {
                    title: '🚗 Vehicle Electrical Systems',
                    desc: 'Car electronics rely on Ohm\'s Law to manage 12V or 24V systems with various loads and resistances.'
                  }
                ].map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-lg border border-orange-500/20 hover:border-orange-400/50 transition-all duration-300">
                    <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                    <p className="text-gray-400">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Video Explanation</h2>
              <p className="text-gray-300 mb-6">Watch this comprehensive video to deepen your understanding of Ohm's Law and its applications:</p>
              <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/DyeAqq2A_Mw"
                  title="Ohm's Law Explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4">Video: "Ohm's Law Explained" - A clear explanation of how voltage, current, and resistance work together in electrical circuits.</p>
            </section>

            {/* Simulation Guide */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
              <div className="flex items-start gap-4">
                <Microscope size={32} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="!mb-4">Simulation Walkthrough</h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-semibold text-yellow-300 mb-1">1. Adjust Voltage</p>
                      <p>Use the voltage slider to change the electrical potential. Watch how increasing voltage increases current flow.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-300 mb-1">2. Change Resistance</p>
                      <p>Modify the resistance value using the resistance control. See how higher resistance decreases current for the same voltage.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-300 mb-1">3. Observe Relationships</p>
                      <p>Watch the real-time meter readings for voltage, current, and resistance. Notice the inverse relationship between current and resistance.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-300 mb-1">4. Calculate Power</p>
                      <p>Use the values to calculate power dissipation (P = V × I). Understand how voltage and current determine energy consumption.</p>
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
                    q: 'Why is Ohm\'s Law important in electronics?',
                    a: 'Ohm\'s Law (V = IR) is fundamental because it defines the relationship between the three most important electrical quantities. It allows engineers to calculate unknown values, predict circuit behavior, and ensure safe operation of electrical systems.'
                  },
                  {
                    id: 'faq-2',
                    q: 'What happens if I apply too much voltage to a resistor?',
                    a: 'Applying excessive voltage causes high current to flow through the resistor. The resistor converts electrical energy to heat (P = I²R), which can damage the component and potentially cause fire if the temperature exceeds its rated limit.'
                  },
                  {
                    id: 'faq-3',
                    q: 'How does resistance affect a circuit?',
                    a: 'Resistance limits current flow. For a fixed voltage, higher resistance means lower current. Resistors are used to control current, protect components, and divide voltage in circuits.'
                  },
                  {
                    id: 'faq-4',
                    q: 'Can Ohm\'s Law be used for AC circuits?',
                    a: 'Yes, Ohm\'s Law applies to AC circuits too, but in AC circuits we use impedance (Z) instead of simple resistance, because inductance and capacitance also affect current flow. The relationship becomes V = IZ.'
                  },
                  {
                    id: 'faq-5',
                    q: 'What is the difference between voltage and current?',
                    a: 'Voltage is the electrical potential difference (the "push"), measured in Volts. Current is the flow of electric charge (the actual flow of electrons), measured in Amperes. Voltage causes current to flow.'
                  },
                  {
                    id: 'faq-6',
                    q: 'How do circuit breakers use Ohm\'s Law?',
                    a: 'Circuit breakers monitor current flow. When current exceeds safe limits (determined by Ohm\'s Law for the circuit), they trip to disconnect power. This prevents overheating and fire hazards.'
                  },
                  {
                    id: 'faq-7',
                    q: 'What is power dissipation and how does it relate to Ohm\'s Law?',
                    a: 'Power (P = V × I) is the rate of energy consumption. Using Ohm\'s Law, we can express power as P = I²R or P = V²/R. Higher power means more energy converted to heat in resistors.'
                  },
                  {
                    id: 'faq-8',
                    q: 'Why do some materials have low resistance and others high resistance?',
                    a: 'Conductors (like copper) have low resistance because electrons move freely through them. Insulators (like rubber) have high resistance because their electrons are tightly bound. This molecular structure determines electrical properties.'
                  }
                ].map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 group text-left"
                    >
                      <p className="font-semibold text-gray-100 group-hover:text-yellow-300 transition-colors">{item.q}</p>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-yellow-400 expand-icon ${expandedSection === item.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === item.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-yellow-500/10">
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
                    desc: 'Comprehensive notes on Ohm\'s Law with examples, derivations, and practical applications in circuit analysis.',
                    color: 'from-emerald-900/30 to-teal-900/30',
                    borderColor: 'border-emerald-500/20'
                  },
                  {
                    icon: '📝',
                    title: 'PYQ Papers',
                    desc: 'Previous year examination questions from board exams and competitive tests with detailed solutions.',
                    color: 'from-cyan-900/30 to-blue-900/30',
                    borderColor: 'border-cyan-500/20'
                  },
                  {
                    icon: '💾',
                    title: 'Study Materials',
                    desc: 'Circuit diagrams, formula sheets, worked examples, and concept maps for quick revision.',
                    color: 'from-violet-900/30 to-purple-900/30',
                    borderColor: 'border-violet-500/20'
                  },
                  {
                    icon: '✏️',
                    title: 'Sample Papers',
                    desc: 'Full-length practice tests with numerical problems and conceptual questions for thorough preparation.',
                    color: 'from-orange-900/30 to-red-900/30',
                    borderColor: 'border-orange-500/20'
                  }
                ].map((resource, i) => (
                  <div key={i} className={`bg-gradient-to-br ${resource.color} rounded-xl border ${resource.borderColor} p-6 hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}>
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-300 transition-colors">{resource.title}</h3>
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
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-orange-900/30 via-amber-900/30 to-yellow-900/30">
              <button
                onClick={() => setQuizExpanded(!quizExpanded)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="!mb-0">Test Your Knowledge</h2>
                <ChevronDown 
                  size={28} 
                  className={`flex-shrink-0 text-orange-400 transition-transform duration-300 ${quizExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              
              {quizExpanded && (
                <div className="mt-8 pt-8 border-t border-orange-500/20">
                  <p className="text-gray-300 mb-8">Challenge yourself with this interactive quiz on Ohm's Law. Select your answers and get instant feedback!</p>
                  <QuizComponent />
                </div>
              )}
            </section>

          </div>

          {/* Footer CTA */}
          <div className="glow-border rounded-2xl p-8 sm:p-10 text-center">
            <h3>Ready to Explore?</h3>
            <p className="text-gray-300 my-6 max-w-2xl mx-auto">
              Launch the interactive simulation and discover Ohm's Law through hands-on experimentation. Adjust voltage and resistance to see real-time effects on current.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 group">
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