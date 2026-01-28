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
      q: "What is the formula for equivalent resistance in series?",
      options: [
        "Rs = 1/R1 + 1/R2 + 1/R3...",
        "Rs = R1 + R2 + R3...",
        "Rs = (R1 × R2)/(R1 + R2)",
        "Rs = R1 × R2 × R3..."
      ],
      correct: 1,
      explain: "In a series circuit, the equivalent resistance is the sum of all individual resistances: Rs = R1 + R2 + R3... The total resistance increases as more resistors are added in series."
    },
    {
      q: "What is the formula for equivalent resistance in parallel?",
      options: [
        "Rp = R1 + R2 + R3...",
        "Rp = 1/R1 + 1/R2 + 1/R3...",
        "Rp = R1 × R2 × R3...",
        "Rp = √(R1 + R2)"
      ],
      correct: 1,
      explain: "In a parallel circuit, the reciprocal of equivalent resistance equals the sum of reciprocals: 1/Rp = 1/R1 + 1/R2 + 1/R3... The equivalent resistance is always less than the smallest individual resistance."
    },
    {
      q: "What happens to equivalent resistance when resistors are added in series?",
      options: [
        "It decreases",
        "It increases",
        "It stays the same",
        "It becomes zero"
      ],
      correct: 1,
      explain: "When resistors are added in series, the equivalent resistance increases because all resistances are added together. Each additional resistor adds more opposition to current flow."
    },
    {
      q: "What happens to equivalent resistance when resistors are added in parallel?",
      options: [
        "It increases",
        "It decreases",
        "It stays the same",
        "It doubles"
      ],
      correct: 1,
      explain: "When resistors are added in parallel, the equivalent resistance decreases. More parallel paths for current allow charges to flow more easily, reducing overall resistance."
    },
    {
      q: "Two equal resistors of 10Ω are connected in series. What is the equivalent resistance?",
      options: [
        "5Ω",
        "10Ω",
        "20Ω",
        "100Ω"
      ],
      correct: 2,
      explain: "In series: Rs = R1 + R2 = 10Ω + 10Ω = 20Ω. Series connection simply adds the resistances together."
    },
    {
      q: "Two equal resistors of 10Ω are connected in parallel. What is the equivalent resistance?",
      options: [
        "20Ω",
        "10Ω",
        "5Ω",
        "0Ω"
      ],
      correct: 2,
      explain: "In parallel: 1/Rp = 1/10 + 1/10 = 2/10, so Rp = 5Ω. For equal resistors in parallel: Rp = R/n, where n is the number of resistors."
    },
    {
      q: "Which configuration produces higher equivalent resistance?",
      options: [
        "Parallel connection",
        "Series connection",
        "Both have equal resistance",
        "It depends on the resistor values"
      ],
      correct: 1,
      explain: "Series connection always produces higher equivalent resistance than parallel. Series adds resistances while parallel divides them, making the parallel resistance always smaller."
    },
    {
      q: "For three resistors (R1=2Ω, R2=3Ω, R3=6Ω) in parallel, what is the equivalent resistance?",
      options: [
        "11Ω",
        "1Ω",
        "6Ω",
        "18Ω"
      ],
      correct: 1,
      explain: "1/Rp = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1, so Rp = 1Ω. The parallel resistance is always less than the smallest resistor (2Ω)."
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
              {score === questions.length && "Perfect score! You're a circuits expert!"}
              {score >= questions.length * 0.8 && score < questions.length && "Excellent! You have strong understanding of equivalent resistance."}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good job! Review the concepts you missed to strengthen your knowledge."}
              {score < questions.length * 0.6 && "Keep studying! Series and parallel circuits require practice. Review the materials to improve."}
            </p>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-cyan-300 mb-4">Review Your Answers</h4>
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
              <span className="text-sm font-semibold text-cyan-400">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300"
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
                      ? 'bg-cyan-900/50 border-cyan-500 text-cyan-100'
                      : 'bg-gray-800/20 border-gray-600 hover:border-cyan-400 text-gray-300 hover:bg-cyan-900/20'
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
                        ? 'border-cyan-500 bg-cyan-500'
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
              <div className="p-4 bg-cyan-900/30 border border-cyan-500/30 rounded-lg mb-6">
                <p className="text-sm text-cyan-200">
                  <span className="font-semibold">Explanation:</span> {questions[currentQuestion].explain}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full">
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
          className="w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default function EquivalentResistanceExperimentDetails() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-teal-950 via-cyan-900 to-blue-950 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
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
          border: 1px solid rgba(34, 211, 238, 0.2);
          background: linear-gradient(135deg, rgba(6, 78, 59, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%);
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
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.5) 0%, transparent 100%);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.8);
          border: 2px solid rgba(34, 211, 238, 1);
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
          border-left: 3px solid rgba(34, 211, 238, 0.8);
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
          background: linear-gradient(135deg, #22d3ee 0%, #14b8a6 100%);
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
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <span className="text-cyan-300 font-semibold tracking-widest">EXPERIMENT</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Equivalent Resistance<br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Series & Parallel Circuits
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Master how resistances combine in series and parallel circuits. Learn to calculate equivalent resistance and understand the fundamental differences between these two circuit configurations.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group">
              Launch Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Clock, label: 'Concept Era', value: '1820s' },
              { icon: BookOpen, label: 'Category', value: 'Circuit Analysis' },
              { icon: TrendingUp, label: 'Difficulty', value: 'Intermediate' }
            ].map((stat, i) => (
              <div key={i} className="glow-border rounded-xl p-6 group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon size={24} className="text-cyan-400" />
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
              <h2>What is Equivalent Resistance?</h2>
              <p className="mb-6">
                Equivalent resistance is the single resistance value that can replace a combination of resistors in a circuit, producing the same electrical effect. Different ways of connecting resistors result in different equivalent resistance values.
              </p>
              <p>
                Understanding how to calculate equivalent resistance is essential for circuit analysis, design, and troubleshooting. The two primary configurations—series and parallel—have distinct properties and applications in real-world electronics and electrical systems.
              </p>
            </section>

            {/* Series vs Parallel Comparison */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Series vs. Parallel Circuits</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Series */}
                <div className="p-6 rounded-lg border border-cyan-500/30 bg-cyan-900/10">
                  <h4 className="text-xl font-bold mb-4 text-cyan-300">🔗 Series Circuit</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Configuration:</p>
                      <p className="text-gray-400">Resistors connected end-to-end in a single path</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Formula:</p>
                      <p className="font-mono text-cyan-300 text-lg">Rs = R₁ + R₂ + R₃...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Equivalent Resistance:</p>
                      <p className="text-gray-400">Always increases with each resistor added</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Current:</p>
                      <p className="text-gray-400">Same through all resistors</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Voltage:</p>
                      <p className="text-gray-400">Divided across resistors proportionally</p>
                    </div>
                  </div>
                </div>

                {/* Parallel */}
                <div className="p-6 rounded-lg border border-teal-500/30 bg-teal-900/10">
                  <h4 className="text-xl font-bold mb-4 text-teal-300">⚡ Parallel Circuit</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Configuration:</p>
                      <p className="text-gray-400">Resistors connected across same two points</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Formula:</p>
                      <p className="font-mono text-teal-300 text-lg">1/Rp = 1/R₁ + 1/R₂ + 1/R₃...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Equivalent Resistance:</p>
                      <p className="text-gray-400">Always decreases with each resistor added</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Current:</p>
                      <p className="text-gray-400">Divided across resistors</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Voltage:</p>
                      <p className="text-gray-400">Same across all resistors</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Equations */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Mathematical Formulas</h2>
              <div className="mt-8 space-y-8">
                {/* Series Formula */}
                <div>
                  <h3 className="text-cyan-300 mb-4">Series Combination</h3>
                  <div className="equation-box mb-4">
                    Rs = R₁ + R₂ + R₃ + ... + Rₙ
                  </div>
                  <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/20">
                    <p className="text-gray-300">
                      <span className="font-semibold text-cyan-300">Example:</span> If R₁ = 2Ω, R₂ = 3Ω, R₃ = 5Ω, then Rs = 2 + 3 + 5 = 10Ω
                    </p>
                  </div>
                </div>

                {/* Parallel Formula */}
                <div>
                  <h3 className="text-teal-300 mb-4">Parallel Combination</h3>
                  <div className="equation-box mb-4">
                    1/Rp = 1/R₁ + 1/R₂ + 1/R₃ + ... + 1/Rₙ
                  </div>
                  <div className="p-4 bg-gradient-to-r from-teal-900/30 to-blue-900/30 rounded-lg border border-teal-500/20">
                    <p className="text-gray-300">
                      <span className="font-semibold text-teal-300">Example:</span> If R₁ = 2Ω, R₂ = 3Ω, R₃ = 6Ω, then 1/Rp = 1/2 + 1/3 + 1/6 = 1, so Rp = 1Ω
                    </p>
                  </div>
                </div>

                {/* Special Case: Equal Resistors */}
                <div>
                  <h3 className="text-blue-300 mb-4">Special Case: Equal Resistors</h3>
                  <div className="space-y-4">
                    <div className="equation-box">
                      Series: Rs = n × R
                    </div>
                    <div className="equation-box">
                      Parallel: Rp = R / n
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/20">
                      <p className="text-gray-300">
                        <span className="font-semibold text-blue-300">Example:</span> For n identical resistors of value R: Series = n times larger, Parallel = n times smaller
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Historical Timeline */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Historical Development</h2>
              <div className="mt-8 space-y-8">
                {[
                  {
                    year: '1800s',
                    title: 'Foundation of Circuit Theory',
                    desc: 'Ohm and Kirchhoff develop the fundamental principles that govern how resistances combine in circuits.'
                  },
                  {
                    year: '1847',
                    title: 'Kirchhoff\'s Laws',
                    desc: 'Gustav Kirchhoff publishes his laws including junction rule and loop rule, essential for analyzing complex circuits.'
                  },
                  {
                    year: '1900s',
                    title: 'Practical Applications',
                    desc: 'Understanding equivalent resistance becomes crucial for designing electrical networks and distribution systems.'
                  },
                  {
                    year: 'Today',
                    title: 'Modern Electronics',
                    desc: 'Calculating equivalent resistance is fundamental to electronics, from simple circuits to complex PCBs and integrated circuits.'
                  }
                ].map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="group">
                      <p className="text-cyan-400 font-bold text-lg">{event.year}</p>
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
                    id: 'series-config',
                    title: '🔗 Series Configuration',
                    summary: 'Single path for current flow through all resistors.',
                    details: 'In a series configuration, resistors are connected end-to-end, creating only one path for current. The same current flows through all resistors. Voltage divides among resistors proportionally to their resistance values. If one resistor fails (open circuit), the entire circuit breaks.'
                  },
                  {
                    id: 'parallel-config',
                    title: '⚡ Parallel Configuration',
                    summary: 'Multiple paths for current flow available.',
                    details: 'In a parallel configuration, resistors are connected across the same two points, creating multiple paths for current. The same voltage appears across all resistors. Current divides among resistors inversely proportional to their resistance. If one resistor fails, others continue to function.'
                  },
                  {
                    id: 'combined-circuits',
                    title: '🔀 Combined (Series-Parallel)',
                    summary: 'Mixture of series and parallel connections.',
                    details: 'Real circuits often combine series and parallel sections. First identify series and parallel groups, calculate their equivalent resistances separately, then combine them appropriately. This requires systematic analysis of circuit topology.'
                  }
                ].map((concept) => (
                  <div key={concept.id}>
                    <button
                      onClick={() => toggleSection(concept.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-900/30 to-teal-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">{concept.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{concept.summary}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-cyan-400 expand-icon ${expandedSection === concept.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === concept.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-cyan-500/10">
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
                    title: '🏠 Home Electrical Wiring',
                    desc: 'Outlets and switches are typically connected in parallel so each device operates independently and gets full voltage.'
                  },
                  {
                    title: '💡 Lighting Circuits',
                    desc: 'Christmas lights originally in series (one failure breaks all) vs. modern parallel strings (independent operation).'
                  },
                  {
                    title: '🔋 Battery Systems',
                    desc: 'Multiple batteries can be connected in series (higher voltage) or parallel (longer duration) depending on requirements.'
                  },
                  {
                    title: '📱 Electronics Design',
                    desc: 'PCB designers calculate equivalent resistance to ensure proper current distribution and heat management.'
                  },
                  {
                    title: '🚗 Vehicle Electrical Systems',
                    desc: 'Accessories are parallel-connected so operating headlights doesn\'t affect windshield wipers.'
                  },
                  {
                    title: '⚙️ Industrial Control Circuits',
                    desc: 'Complex relay and switching circuits use combinations to achieve desired operational characteristics.'
                  }
                ].map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-cyan-900/20 to-teal-900/20 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                    <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                    <p className="text-gray-400">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Video Explanation</h2>
              <p className="text-gray-300 mb-6">Watch these videos to understand series and parallel resistance configurations:</p>
              <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/v5SVp_6QFJE"
                  title="Series and Parallel Circuits"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4">Video: "Series and Parallel Circuits Explained" - A comprehensive guide to understanding equivalent resistance in both configurations.</p>
            </section>

            {/* Simulation Guide */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border-cyan-500/30">
              <div className="flex items-start gap-4">
                <Microscope size={32} className="text-cyan-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="!mb-4">Simulation Walkthrough</h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-semibold text-cyan-300 mb-1">1. Series Circuit Mode</p>
                      <p>Add resistors one by one in series. Watch how the equivalent resistance increases with each addition. Calculate using Rs = R₁ + R₂ + R₃...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-300 mb-1">2. Parallel Circuit Mode</p>
                      <p>Add resistors one by one in parallel. Observe how equivalent resistance decreases. Calculate using 1/Rp = 1/R₁ + 1/R₂ + 1/R₃...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-300 mb-1">3. Voltage & Current Analysis</p>
                      <p>In series: observe voltage division (same current). In parallel: observe current division (same voltage). See how resistor values affect the distribution.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-300 mb-1">4. Mixed Circuit Challenge</p>
                      <p>Combine series and parallel sections. First calculate series groups, then combine them in parallel. Practice systematic circuit analysis techniques.</p>
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
                    q: 'Why is equivalent resistance different in series vs. parallel?',
                    a: 'In series, all resistances oppose the same current path, so they add. In parallel, multiple paths exist, so opposition is reduced. Series increases total resistance while parallel decreases it because current has alternative routes.'
                  },
                  {
                    id: 'faq-2',
                    q: 'When should I use series vs. parallel in circuits?',
                    a: 'Use series when you want to increase total resistance or divide voltage across multiple components. Use parallel when you want to decrease resistance, share current, or allow independent operation of components. Home circuits use parallel for independence; some sensors use series for voltage division.'
                  },
                  {
                    id: 'faq-3',
                    q: 'Can I calculate equivalent resistance without doing complex calculations?',
                    a: 'Yes! For two equal resistors in parallel: Rp = R/2. For n equal resistors: Series = n×R, Parallel = R/n. For two different resistors in parallel: Rp = (R₁×R₂)/(R₁+R₂). These shortcuts simplify common scenarios.'
                  },
                  {
                    id: 'faq-4',
                    q: 'What happens when one resistor fails in series vs. parallel?',
                    a: 'In series: entire circuit breaks (open circuit). In parallel: other paths continue working, only that branch fails. This is why home circuits use parallel—if one outlet fails, others still work.'
                  },
                  {
                    id: 'faq-5',
                    q: 'How do I analyze circuits with both series and parallel sections?',
                    a: 'Break the circuit into sections: identify series groups and calculate their equivalent, identify parallel groups and calculate their equivalent, then combine these equivalent resistances. Work systematically from inside out, starting with the smallest subsections.'
                  },
                  {
                    id: 'faq-6',
                    q: 'Why is the parallel resistance always less than the smallest resistor?',
                    a: 'Because additional parallel paths always provide easier routes for current flow, reducing total opposition. Mathematically, adding positive reciprocals always gives a larger sum, making 1/Rp larger, therefore Rp smaller.'
                  },
                  {
                    id: 'faq-7',
                    q: 'What is the practical advantage of knowing equivalent resistance?',
                    a: 'It allows you to: replace complex networks with simple equivalents, calculate power consumption, ensure proper device operation, prevent overheating, design safety systems like circuit breakers, and optimize circuit efficiency.'
                  },
                  {
                    id: 'faq-8',
                    q: 'Can I mix resistors of different values in series and parallel?',
                    a: 'Yes! The formulas work for any values. Rs = R₁ + R₂ + R₃... and 1/Rp = 1/R₁ + 1/R₂ + 1/R₃... work regardless of whether resistors are equal or different. However, voltage and current distribution varies with resistance ratios.'
                  }
                ].map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-900/30 to-teal-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group text-left"
                    >
                      <p className="font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">{item.q}</p>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-cyan-400 expand-icon ${expandedSection === item.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === item.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-cyan-500/10">
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
                    desc: 'Complete notes on series and parallel circuits with worked examples, circuit diagrams, and calculation methods.',
                    color: 'from-emerald-900/30 to-teal-900/30',
                    borderColor: 'border-emerald-500/20'
                  },
                  {
                    icon: '📝',
                    title: 'PYQ Papers',
                    desc: 'Previous years\' examination questions focusing on equivalent resistance calculations with detailed solutions.',
                    color: 'from-cyan-900/30 to-blue-900/30',
                    borderColor: 'border-cyan-500/20'
                  },
                  {
                    icon: '💾',
                    title: 'Study Materials',
                    desc: 'Circuit diagrams, formula sheets, troubleshooting guides, and quick reference tables for instant lookup.',
                    color: 'from-violet-900/30 to-purple-900/30',
                    borderColor: 'border-violet-500/20'
                  },
                  {
                    icon: '✏️',
                    title: 'Sample Papers',
                    desc: 'Practice tests with numerical problems, circuit analysis questions, and comprehensive practical scenarios.',
                    color: 'from-orange-900/30 to-red-900/30',
                    borderColor: 'border-orange-500/20'
                  }
                ].map((resource, i) => (
                  <div key={i} className={`bg-gradient-to-br ${resource.color} rounded-xl border ${resource.borderColor} p-6 hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}>
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{resource.title}</h3>
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
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-cyan-900/30 via-teal-900/30 to-blue-900/30">
              <button
                onClick={() => setQuizExpanded(!quizExpanded)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="!mb-0">Test Your Knowledge</h2>
                <ChevronDown 
                  size={28} 
                  className={`flex-shrink-0 text-cyan-400 transition-transform duration-300 ${quizExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              
              {quizExpanded && (
                <div className="mt-8 pt-8 border-t border-cyan-500/20">
                  <p className="text-gray-300 mb-8">Challenge yourself with this interactive quiz on equivalent resistance. Select your answers and get instant feedback!</p>
                  <QuizComponent />
                </div>
              )}
            </section>

          </div>

          {/* Footer CTA */}
          <div className="glow-border rounded-2xl p-8 sm:p-10 text-center">
            <h3>Ready to Explore?</h3>
            <p className="text-gray-300 my-6 max-w-2xl mx-auto">
              Launch the interactive simulation and experiment with series and parallel circuits. Calculate equivalent resistances and observe how voltage and current behave in real-time.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group">
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