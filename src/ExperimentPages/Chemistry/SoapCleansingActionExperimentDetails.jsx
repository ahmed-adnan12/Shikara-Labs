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
      q: "What does pH measure?",
      options: [
        "The concentration of hydrogen ions (H⁺) in a solution",
        "The concentration of hydroxide ions (OH⁻)",
        "The temperature of a liquid",
        "The density of a solution"
      ],
      correct: 0,
      explain: "pH measures the concentration of hydrogen ions (H⁺) in a solution. It indicates how acidic or basic a solution is on a scale from 0 to 14."
    },
    {
      q: "What is the pH scale range?",
      options: [
        "0 to 7",
        "0 to 10",
        "0 to 14",
        "1 to 14"
      ],
      correct: 2,
      explain: "The pH scale ranges from 0 to 14, where 0-7 is acidic, 7 is neutral, and 7-14 is basic (alkaline). A pH of 7 represents pure water at 25°C."
    },
    {
      q: "Which pH value represents a neutral solution?",
      options: [
        "pH 0",
        "pH 7",
        "pH 10",
        "pH 14"
      ],
      correct: 1,
      explain: "A pH of 7 represents a neutral solution, where the concentration of H⁺ ions equals the concentration of OH⁻ ions. Pure water has a pH of approximately 7."
    },
    {
      q: "What color does universal indicator turn in acidic solutions?",
      options: [
        "Blue or purple",
        "Green",
        "Red or pink",
        "Yellow"
      ],
      correct: 2,
      explain: "Universal indicator turns red or pink in acidic solutions (pH 0-6). The more acidic the solution, the more intense the red color."
    },
    {
      q: "What is the mathematical formula for pH?",
      options: [
        "pH = [H⁺]",
        "pH = -log₁₀[H⁺]",
        "pH = log₁₀[H⁺]",
        "pH = 14 - [H⁺]"
      ],
      correct: 1,
      explain: "pH = -log₁₀[H⁺], where [H⁺] is the concentration of hydrogen ions in moles per liter. This logarithmic scale compresses large ranges into a 0-14 scale."
    },
    {
      q: "Which substance is most acidic?",
      options: [
        "Lemon juice (pH ≈ 2)",
        "Vinegar (pH ≈ 3)",
        "Black coffee (pH ≈ 5)",
        "Rainwater (pH ≈ 6)"
      ],
      correct: 0,
      explain: "Lemon juice with pH ≈ 2 is the most acidic. Lower pH values indicate higher acidity. Lemon juice is much more acidic than vinegar."
    },
    {
      q: "What color does pH paper turn in basic/alkaline solutions?",
      options: [
        "Red",
        "Yellow",
        "Blue or purple",
        "Green"
      ],
      correct: 2,
      explain: "pH paper turns blue or purple in basic/alkaline solutions (pH 8-14). The more basic the solution, the more intense the blue/purple color."
    },
    {
      q: "Which is an example of a basic solution?",
      options: [
        "Stomach acid (pH ≈ 2)",
        "Tomato juice (pH ≈ 4)",
        "Baking soda solution (pH ≈ 8.3)",
        "Vinegar (pH ≈ 3)"
      ],
      correct: 2,
      explain: "Baking soda solution with pH ≈ 8.3 is basic. Basic/alkaline solutions have pH greater than 7, with higher values being more strongly basic."
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
              {score === questions.length && "Perfect score! You're a pH determination expert!"}
              {score >= questions.length * 0.8 && score < questions.length && "Excellent! You have strong understanding of pH and indicators."}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good job! Review the pH scale and color changes to strengthen your knowledge."}
              {score < questions.length * 0.6 && "Keep studying! pH determination requires practice. Review the materials to improve."}
            </p>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-emerald-300 mb-4">Review Your Answers</h4>
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
              <span className="text-sm font-semibold text-emerald-400">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300"
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
                      ? 'bg-emerald-900/50 border-emerald-500 text-emerald-100'
                      : 'bg-gray-800/20 border-gray-600 hover:border-emerald-400 text-gray-300 hover:bg-emerald-900/20'
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
                        ? 'border-emerald-500 bg-emerald-500'
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
              <div className="p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg mb-6">
                <p className="text-sm text-emerald-200">
                  <span className="font-semibold">Explanation:</span> {questions[currentQuestion].explain}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full">
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
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default function PHDeterminationExperimentDetails() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
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
          border: 1px solid rgba(52, 211, 153, 0.2);
          background: linear-gradient(135deg, rgba(5, 46, 22, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%);
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
          background: linear-gradient(180deg, rgba(52, 211, 153, 0.5) 0%, transparent 100%);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.8);
          border: 2px solid rgba(52, 211, 153, 1);
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
          border-left: 3px solid rgba(52, 211, 153, 0.8);
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
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
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
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <span className="text-emerald-300 font-semibold tracking-widest">EXPERIMENT</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Cleansing Action of Soap<br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Soft Water vs Hard Water
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Understand how soap works at the molecular level and discover why hard water reduces its cleaning efficiency. Learn the science behind soap scum and water softening techniques.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group">
              Launch Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Clock, label: 'pH Scale Era', value: '1909' },
              { icon: BookOpen, label: 'Category', value: 'Analytical Chemistry' },
              { icon: TrendingUp, label: 'Difficulty', value: 'Beginner' }
            ].map((stat, i) => (
              <div key={i} className="glow-border rounded-xl p-6 group hover:border-emerald-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon size={24} className="text-emerald-400" />
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
              <h2>What is pH?</h2>
              <p className="mb-6">
                pH is a measure of how acidic or basic a solution is, based on the concentration of hydrogen ions (H⁺). The term "pH" stands for "power of hydrogen." The pH scale ranges from 0 to 14, with 7 being neutral.
              </p>
              <p className="mb-6">
                pH determination is essential in chemistry, biology, environmental science, and many industrial processes. Using simple tools like pH paper and universal indicator, we can quickly determine whether a solution is acidic, neutral, or basic—a fundamental skill for any scientist.
              </p>
              <p>
                This experiment teaches you to observe color changes and use them to identify the pH of unknown solutions, developing both observational skills and understanding of acid-base chemistry.
              </p>
            </section>

            {/* pH Scale & Indicators */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>The pH Scale & Color Indicators</h2>
              <div className="mt-8 space-y-6">
                
                {/* pH Scale Visual */}
                <div className="p-6 rounded-lg border border-emerald-500/30 bg-emerald-900/10">
                  <h3 className="text-emerald-300 mb-4">pH Scale (0-14)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-200 mb-2">Acidic (pH 0-7)</p>
                      <div className="flex gap-1">
                        {['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC', '#FFE4E1', '#F0F8FF'].map((color, i) => (
                          <div key={i} className="flex-1 h-8 rounded text-xs font-bold text-black flex items-center justify-center" style={{backgroundColor: color}}>
                            {i}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">0 = Most Acidic</p>
                    </div>

                    <div className="border-t border-emerald-500/20 pt-3">
                      <p className="text-sm font-semibold text-gray-200 mb-2">Neutral (pH 7)</p>
                      <div className="h-8 rounded text-sm font-bold text-black flex items-center justify-center" style={{backgroundColor: '#00DD00'}}>
                        pH 7 - GREEN
                      </div>
                    </div>

                    <div className="border-t border-emerald-500/20 pt-3">
                      <p className="text-sm font-semibold text-gray-200 mb-2">Basic/Alkaline (pH 7-14)</p>
                      <div className="flex gap-1">
                        {['#F0F8FF', '#FFE4E1', '#CCCCFF', '#9999FF', '#6666FF', '#3333FF', '#0000FF'].map((color, i) => (
                          <div key={i} className="flex-1 h-8 rounded text-xs font-bold text-white flex items-center justify-center" style={{backgroundColor: color}}>
                            {i + 8}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">14 = Most Basic</p>
                    </div>
                  </div>
                </div>

                {/* pH Formula */}
                <div>
                  <h3 className="text-emerald-300 mb-4">Mathematical Definition</h3>
                  <div className="equation-box mb-4">
                    pH = -log₁₀[H⁺]
                  </div>
                  <div className="p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-500/20">
                    <p className="text-gray-300">
                      <span className="font-semibold text-emerald-300">Where:</span> [H⁺] is the concentration of hydrogen ions in moles per liter (mol/L). A decrease of 1 pH unit means the hydrogen ion concentration is 10 times higher.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* pH Paper vs Universal Indicator */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>pH Paper vs. Universal Indicator</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* pH Paper */}
                <div className="p-6 rounded-lg border border-emerald-500/30 bg-emerald-900/10">
                  <h4 className="text-xl font-bold mb-4 text-emerald-300">📄 pH Paper</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Composition:</p>
                      <p className="text-gray-400">Paper soaked with chemical indicators</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Method:</p>
                      <p className="text-gray-400">Dip paper into solution, compare color to scale</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Range:</p>
                      <p className="text-gray-400">Usually 0-14 or specific ranges (0-6, 5-10)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Accuracy:</p>
                      <p className="text-gray-400">±1 pH unit</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Advantages:</p>
                      <p className="text-gray-400">Quick, inexpensive, portable, no batteries</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Disadvantages:</p>
                      <p className="text-gray-400">Less accurate, color comparison is subjective</p>
                    </div>
                  </div>
                </div>

                {/* Universal Indicator */}
                <div className="p-6 rounded-lg border border-teal-500/30 bg-teal-900/10">
                  <h4 className="text-xl font-bold mb-4 text-teal-300">🧪 Universal Indicator</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Composition:</p>
                      <p className="text-gray-400">Liquid solution with multiple indicators</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Method:</p>
                      <p className="text-gray-400">Add drops to solution, observe color change</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Range:</p>
                      <p className="text-gray-400">Full 0-14 range with good coverage</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Accuracy:</p>
                      <p className="text-gray-400">±0.5 pH unit (better than pH paper)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Advantages:</p>
                      <p className="text-gray-400">More accurate, better color differentiation</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Disadvantages:</p>
                      <p className="text-gray-400">Requires careful color comparison, needs testing tubes</p>
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
                    year: '1880s',
                    title: 'Concept of Acidity',
                    desc: 'Scientists recognize that acidity is related to hydrogen ion concentration in solutions.'
                  },
                  {
                    year: '1909',
                    title: 'pH Scale Introduced',
                    desc: 'Søren Peder Lauritz Sørensen introduces the pH scale at the Carlsberg laboratory to measure acidity.'
                  },
                  {
                    year: '1920s',
                    title: 'Indicator Papers Developed',
                    desc: 'Simple pH indicator papers are developed for quick and easy pH testing in labs and industry.'
                  },
                  {
                    year: '1930s-1950s',
                    title: 'Universal Indicators',
                    desc: 'Universal indicator solutions are created, providing wider pH range and better color differentiation.'
                  },
                  {
                    year: 'Today',
                    title: 'Modern pH Testing',
                    desc: 'While electronic pH meters dominate, pH paper and universal indicators remain essential tools for field testing and education.'
                  }
                ].map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="group">
                      <p className="text-emerald-400 font-bold text-lg">{event.year}</p>
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
                    id: 'acids',
                    title: '🔴 Acidic Solutions (pH 0-7)',
                    summary: 'Solutions with excess hydrogen ions.',
                    details: 'Acidic solutions have more H⁺ ions than OH⁻ ions. Strong acids like HCl and H₂SO₄ have pH close to 0, while weak acids like acetic acid have pH around 2-6. All acidic solutions turn pH paper red or pink.'
                  },
                  {
                    id: 'bases',
                    title: '🔵 Basic/Alkaline Solutions (pH 7-14)',
                    summary: 'Solutions with excess hydroxide ions.',
                    details: 'Basic solutions have more OH⁻ ions than H⁺ ions. Strong bases like NaOH have pH close to 14, while weak bases like ammonia have pH around 8-11. All basic solutions turn pH paper blue or purple.'
                  },
                  {
                    id: 'neutral',
                    title: '🟢 Neutral Solutions (pH = 7)',
                    summary: 'Solutions with equal H⁺ and OH⁻ ions.',
                    details: 'Neutral solutions have equal concentrations of hydrogen and hydroxide ions. Pure water at 25°C has pH ≈ 7. These solutions turn pH paper green. Many salt solutions are neutral at room temperature.'
                  }
                ].map((concept) => (
                  <div key={concept.id}>
                    <button
                      onClick={() => toggleSection(concept.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 group"
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-100 group-hover:text-emerald-300 transition-colors">{concept.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{concept.summary}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-emerald-400 expand-icon ${expandedSection === concept.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === concept.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-emerald-500/10">
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
                    title: '💧 Water Quality Testing',
                    desc: 'Determining pH of drinking water, swimming pools, and wastewater to ensure safety and proper treatment.'
                  },
                  {
                    title: '🌾 Agriculture',
                    desc: 'Measuring soil pH to optimize nutrient availability and determine what fertilizers or amendments are needed.'
                  },
                  {
                    title: '🍎 Food & Beverage Industry',
                    desc: 'Monitoring pH of foods, drinks, and fermentation processes to ensure quality, taste, and preservation.'
                  },
                  {
                    title: '🏥 Medical Diagnostics',
                    desc: 'Testing blood pH, urine pH, and other body fluids to diagnose health conditions and monitor treatment.'
                  },
                  {
                    title: '🔬 Laboratory Research',
                    desc: 'Quick initial pH screening in labs before more precise measurements with pH meters or other instruments.'
                  },
                  {
                    title: '🏭 Industrial Processes',
                    desc: 'Monitoring pH in chemical manufacturing, paper production, and pharmaceutical processes for quality control.'
                  }
                ].map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-lg border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300">
                    <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                    <p className="text-gray-400">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Video Explanation</h2>
              <p className="text-gray-300 mb-6">Watch this video to understand pH, acids, and bases in action:</p>
              <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/EhC8ZCRY7AE"
                  title="pH Determination and Indicators"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4">Video: "pH Determination with Indicators" - A practical demonstration of using pH paper and universal indicator to test various solutions.</p>
            </section>

            {/* Simulation Guide */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-500/30">
              <div className="flex items-start gap-4">
                <Microscope size={32} className="text-emerald-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="!mb-4">Simulation Walkthrough</h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-semibold text-emerald-300 mb-1">1. Select Your Tool</p>
                      <p>Choose between pH paper or universal indicator solution. Each has different accuracy and coverage ranges.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-300 mb-1">2. Test Solutions</p>
                      <p>Perform pH tests on various unknown solutions. Observe the color changes carefully and match them to the color scale.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-300 mb-1">3. Compare Results</p>
                      <p>Determine the approximate pH value by comparing the color to your reference scale. Record your observations.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-300 mb-1">4. Analyze Data</p>
                      <p>Classify solutions as acidic, neutral, or basic. Predict properties and behaviors based on pH values. Compare results from pH paper vs. universal indicator.</p>
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
                    q: 'Why does pH paper change color?',
                    a: 'pH paper contains chemical indicators that are weak acids or bases. They have different colors in acidic and basic solutions due to changes in their molecular structure when they gain or lose protons (H⁺ ions).'
                  },
                  {
                    id: 'faq-2',
                    q: 'What is the difference between pH 6 and pH 3?',
                    a: 'pH 3 is 1000 times more acidic than pH 6. Since pH is a logarithmic scale, each pH unit change represents a 10-fold change in hydrogen ion concentration. Therefore, pH 3 to pH 6 is a 3-unit difference = 10³ = 1000 times difference.'
                  },
                  {
                    id: 'faq-3',
                    q: 'Can I reuse pH paper?',
                    a: 'No, pH paper can only be used once. Once it contacts the solution and changes color, it cannot be returned to its original color. Always use fresh paper for each test.'
                  },
                  {
                    id: 'faq-4',
                    q: 'How accurate is universal indicator compared to a pH meter?',
                    a: 'Universal indicator has ±0.5 pH accuracy, while electronic pH meters can achieve ±0.01 pH accuracy. For field testing and educational purposes, universal indicator is sufficient. For precise measurements, use pH meters.'
                  },
                  {
                    id: 'faq-5',
                    q: 'Why is water pH important?',
                    a: 'Water pH affects chemical processes, organism survival, and water safety. Most aquatic organisms require pH between 6.5-7.5. Extreme pH can corrode pipes, affect taste, and indicate contamination.'
                  },
                  {
                    id: 'faq-6',
                    q: 'How do I store pH paper and universal indicator?',
                    a: 'Store pH paper in a cool, dry place in sealed containers to prevent moisture and light damage. Universal indicator should be stored in amber or dark bottles away from light. Both should be kept out of direct sunlight.'
                  },
                  {
                    id: 'faq-7',
                    q: 'What causes soil to be acidic or basic?',
                    a: 'Soil pH is determined by mineral composition, organic matter, rainfall, and decomposition of organic materials. Acidic soils have high aluminum ions, while basic soils have calcium and magnesium. pH affects nutrient availability for plants.'
                  },
                  {
                    id: 'faq-8',
                    q: 'Can I make my own pH indicator at home?',
                    a: 'Yes! Red cabbage juice is a natural pH indicator that changes color from pink (acidic) to green (neutral) to blue (basic). This is a popular DIY experiment for understanding pH principles.'
                  }
                ].map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 group text-left"
                    >
                      <p className="font-semibold text-gray-100 group-hover:text-emerald-300 transition-colors">{item.q}</p>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-emerald-400 expand-icon ${expandedSection === item.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === item.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-emerald-500/10">
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
                    desc: 'Complete notes on pH, acids, bases, and indicators with color charts, calculations, and practical examples.',
                    color: 'from-emerald-900/30 to-teal-900/30',
                    borderColor: 'border-emerald-500/20'
                  },
                  {
                    icon: '📝',
                    title: 'PYQ Papers',
                    desc: 'Previous years\' examination questions on pH determination with detailed solutions and explanations.',
                    color: 'from-cyan-900/30 to-blue-900/30',
                    borderColor: 'border-cyan-500/20'
                  },
                  {
                    icon: '💾',
                    title: 'Study Materials',
                    desc: 'Color charts, reference guides, safety procedures, and troubleshooting tips for pH testing experiments.',
                    color: 'from-violet-900/30 to-purple-900/30',
                    borderColor: 'border-violet-500/20'
                  },
                  {
                    icon: '✏️',
                    title: 'Sample Papers',
                    desc: 'Practice tests with unknown solutions to identify, lab reports to complete, and experimental scenarios.',
                    color: 'from-orange-900/30 to-red-900/30',
                    borderColor: 'border-orange-500/20'
                  }
                ].map((resource, i) => (
                  <div key={i} className={`bg-gradient-to-br ${resource.color} rounded-xl border ${resource.borderColor} p-6 hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}>
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-300 transition-colors">{resource.title}</h3>
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
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-emerald-900/30 via-green-900/30 to-teal-900/30">
              <button
                onClick={() => setQuizExpanded(!quizExpanded)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="!mb-0">Test Your Knowledge</h2>
                <ChevronDown 
                  size={28} 
                  className={`flex-shrink-0 text-emerald-400 transition-transform duration-300 ${quizExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              
              {quizExpanded && (
                <div className="mt-8 pt-8 border-t border-emerald-500/20">
                  <p className="text-gray-300 mb-8">Challenge yourself with this interactive quiz on pH determination. Select your answers and get instant feedback!</p>
                  <QuizComponent />
                </div>
              )}
            </section>

          </div>

          {/* Footer CTA */}
          <div className="glow-border rounded-2xl p-8 sm:p-10 text-center">
            <h3>Ready to Explore?</h3>
            <p className="text-gray-300 my-6 max-w-2xl mx-auto">
              Launch the interactive simulation and test the pH of various solutions using pH paper and universal indicator. Observe real-time color changes and learn to identify acidic, neutral, and basic solutions.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group">
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