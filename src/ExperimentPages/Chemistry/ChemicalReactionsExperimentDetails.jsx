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
      q: "What is a combination reaction?",
      options: [
        "Two elements combine to form a compound (A + B → AB)",
        "A compound breaks down into simpler substances",
        "One element replaces another in a compound",
        "Two compounds exchange ions or elements"
      ],
      correct: 0,
      explain: "A combination reaction involves two elements or compounds combining to form a single compound. The general form is A + B → AB. Example: 2H₂ + O₂ → 2H₂O"
    },
    {
      q: "Which is an example of a displacement reaction?",
      options: [
        "2Mg + O₂ → 2MgO",
        "Fe + CuSO₄ → FeSO₄ + Cu",
        "AgNO₃ + NaCl → AgCl + NaNO₃",
        "H₂O → H₂ + O₂"
      ],
      correct: 1,
      explain: "Fe + CuSO₄ → FeSO₄ + Cu is a displacement reaction where iron displaces copper from the copper sulfate solution. Iron is more reactive than copper."
    },
    {
      q: "In a displacement reaction, which element typically displaces another?",
      options: [
        "The less reactive element",
        "The more reactive element",
        "Any element can displace another",
        "The lighter element"
      ],
      correct: 1,
      explain: "In a displacement reaction, a more reactive element displaces a less reactive element from a compound. Reactivity order follows trends in the periodic table."
    },
    {
      q: "What is a double displacement reaction?",
      options: [
        "Two elements combine to form one compound",
        "One element replaces another in a compound",
        "Two compounds exchange ions or elements (AB + CD → AD + CB)",
        "A compound decomposes into simpler substances"
      ],
      correct: 2,
      explain: "A double displacement reaction involves two compounds exchanging ions. General form: AB + CD → AD + CB. Example: AgNO₃ + NaCl → AgCl + NaNO₃"
    },
    {
      q: "Which reaction type occurs when 2Fe₂O₃ + 3C → 4Fe + 3CO₂?",
      options: [
        "Combination reaction",
        "Displacement reaction",
        "Double displacement reaction",
        "Decomposition reaction"
      ],
      correct: 1,
      explain: "This is a displacement reaction where carbon (C) displaces iron (Fe) from iron oxide (Fe₂O₃). Carbon is more reactive than iron under these conditions."
    },
    {
      q: "What is the general equation for a combination reaction?",
      options: [
        "AB → A + B",
        "A + B → AB",
        "AB + CD → AD + CB",
        "A + BC → AC + B"
      ],
      correct: 1,
      explain: "The general equation for a combination reaction is A + B → AB, where two substances combine to form one compound. Example: H₂ + Cl₂ → 2HCl"
    },
    {
      q: "In the reaction AgNO₃ + NaCl → AgCl↓ + NaNO₃, what type is it?",
      options: [
        "Combination reaction",
        "Displacement reaction",
        "Double displacement reaction",
        "Decomposition reaction"
      ],
      correct: 2,
      explain: "This is a double displacement reaction. Silver ions and sodium ions exchange partners. AgNO₃ and NaCl exchange to form AgCl (precipitate) and NaNO₃."
    },
    {
      q: "Which of these is a single displacement reaction?",
      options: [
        "2Na + Cl₂ → 2NaCl",
        "Zn + Cu²⁺ → Zn²⁺ + Cu",
        "HCl + NaOH → NaCl + H₂O",
        "CaCO₃ → CaO + CO₂"
      ],
      correct: 1,
      explain: "Zn + Cu²⁺ → Zn²⁺ + Cu is a single displacement reaction where zinc displaces copper. Zinc is more reactive than copper."
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
              {score === questions.length && "Perfect score! You're a chemical reactions expert!"}
              {score >= questions.length * 0.8 && score < questions.length && "Excellent! You have strong understanding of reaction types."}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good job! Review the reaction types to strengthen your knowledge."}
              {score < questions.length * 0.6 && "Keep studying! Chemical reactions need practice. Review the materials to improve."}
            </p>
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              Retake Quiz
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-300 mb-4">Review Your Answers</h4>
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
              <span className="text-sm font-semibold text-blue-400">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
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
                      ? 'bg-blue-900/50 border-blue-500 text-blue-100'
                      : 'bg-gray-800/20 border-gray-600 hover:border-blue-400 text-gray-300 hover:bg-blue-900/20'
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
                        ? 'border-blue-500 bg-blue-500'
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
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full">
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
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default function ChemicalReactionsExperimentDetails() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
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
          border: 1px solid rgba(96, 165, 250, 0.2);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%);
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
          background: linear-gradient(180deg, rgba(96, 165, 250, 0.5) 0%, transparent 100%);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(96, 165, 250, 0.8);
          border: 2px solid rgba(96, 165, 250, 1);
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
          max-height: 600px;
        }

        .equation-box {
          font-family: 'Courier New', monospace;
          background: rgba(0, 0, 0, 0.3);
          border-left: 3px solid rgba(96, 165, 250, 0.8);
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
          background: linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%);
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
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Zap size={28} />
              </div>
              <span className="text-blue-300 font-semibold tracking-widest">EXPERIMENT</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Types of Chemical Reactions<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Combination, Displacement & Double Displacement
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Master the three major types of chemical reactions. Learn to identify, predict, and balance equations for combination, displacement, and double displacement reactions through practical experimentation.
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group">
              Launch Simulation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Clock, label: 'Modern Chemistry', value: '1700s' },
              { icon: BookOpen, label: 'Category', value: 'Organic & Inorganic' },
              { icon: TrendingUp, label: 'Difficulty', value: 'Beginner-Intermediate' }
            ].map((stat, i) => (
              <div key={i} className="glow-border rounded-xl p-6 group hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon size={24} className="text-blue-400" />
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
              <h2>What are Chemical Reactions?</h2>
              <p className="mb-6">
                A chemical reaction is a process that rearranges atoms and molecules to form new substances. During chemical reactions, bonds break in reactants and new bonds form in products. Chemical reactions are the foundation of chemistry, explaining everything from combustion to metabolism.
              </p>
              <p className="mb-6">
                The three main types of chemical reactions—combination, displacement, and double displacement—account for most common chemical transformations. Understanding these reaction types helps predict products and balance equations.
              </p>
              <p>
                This experiment teaches you to identify reaction types, predict products, balance equations, and understand the driving forces behind each reaction mechanism.
              </p>
            </section>

            {/* Three Reaction Types Overview */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>The Three Types of Chemical Reactions</h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Combination */}
                <div className="p-6 rounded-lg border border-blue-500/30 bg-blue-900/10">
                  <h4 className="text-xl font-bold mb-4 text-blue-300">➕ Combination Reaction</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">General Form:</p>
                      <p className="font-mono text-blue-300">A + B → AB</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Description:</p>
                      <p className="text-gray-400">Two elements or compounds join to form a single new compound</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Example:</p>
                      <p className="font-mono text-blue-300 text-xs">2H₂ + O₂ → 2H₂O</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Reactants:</p>
                      <p className="text-gray-400">2 (elements or compounds)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Products:</p>
                      <p className="text-gray-400">1 (compound)</p>
                    </div>
                  </div>
                </div>

                {/* Displacement */}
                <div className="p-6 rounded-lg border border-indigo-500/30 bg-indigo-900/10">
                  <h4 className="text-xl font-bold mb-4 text-indigo-300">↔️ Displacement Reaction</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">General Form:</p>
                      <p className="font-mono text-indigo-300">A + BC → AC + B</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Description:</p>
                      <p className="text-gray-400">A more reactive element replaces a less reactive element in a compound</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Example:</p>
                      <p className="font-mono text-indigo-300 text-xs">Fe + CuSO₄ → FeSO₄ + Cu</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Requirement:</p>
                      <p className="text-gray-400">Depends on reactivity series</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Common Type:</p>
                      <p className="text-gray-400">Single displacement</p>
                    </div>
                  </div>
                </div>

                {/* Double Displacement */}
                <div className="p-6 rounded-lg border border-cyan-500/30 bg-cyan-900/10">
                  <h4 className="text-xl font-bold mb-4 text-cyan-300">🔄 Double Displacement</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">General Form:</p>
                      <p className="font-mono text-cyan-300">AB + CD → AD + CB</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Description:</p>
                      <p className="text-gray-400">Two compounds exchange ions or elements to form new compounds</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Example:</p>
                      <p className="font-mono text-cyan-300 text-xs">AgNO₃ + NaCl → AgCl↓ + NaNO₃</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Driving Forces:</p>
                      <p className="text-gray-400">Precipitate, gas, or water formation</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 mb-1">Products:</p>
                      <p className="text-gray-400">2 (different compounds)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Equations Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Detailed Reaction Types with Examples</h2>
              <div className="mt-8 space-y-8">
                
                {/* Combination Reactions */}
                <div>
                  <h3 className="text-blue-300 mb-4">Combination Reactions (A + B → AB)</h3>
                  <div className="space-y-4">
                    <div className="equation-box mb-4">
                      2H₂(g) + O₂(g) → 2H₂O(l)
                    </div>
                    <div className="equation-box mb-4">
                      2Na(s) + Cl₂(g) → 2NaCl(s)
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/20">
                      <p className="text-gray-300">
                        <span className="font-semibold text-blue-300">Characteristics:</span> Simple to identify, combines two reactants into one product, often releases energy (exothermic), includes synthesis reactions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Displacement Reactions */}
                <div>
                  <h3 className="text-indigo-300 mb-4">Displacement Reactions (A + BC → AC + B)</h3>
                  <div className="space-y-4">
                    <div className="equation-box mb-4">
                      Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)
                    </div>
                    <div className="equation-box mb-4">
                      2Fe₂O₃ + 3C → 4Fe + 3CO₂
                    </div>
                    <div className="p-4 bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-lg border border-indigo-500/20">
                      <p className="text-gray-300">
                        <span className="font-semibold text-indigo-300">Characteristics:</span> Requires reactivity series knowledge, one element replaces another, often involves metals, visible color changes or precipitate formation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Double Displacement Reactions */}
                <div>
                  <h3 className="text-cyan-300 mb-4">Double Displacement Reactions (AB + CD → AD + CB)</h3>
                  <div className="space-y-4">
                    <div className="equation-box mb-4">
                      AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)
                    </div>
                    <div className="equation-box mb-4">
                      HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)
                    </div>
                    <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/20">
                      <p className="text-gray-300">
                        <span className="font-semibold text-cyan-300">Characteristics:</span> Ions exchange partners, requires driving force (precipitate, gas, or water), common in aqueous solutions, includes acid-base and precipitation reactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reactivity Series */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Reactivity Series & Displacement Predictions</h2>
              <div className="mt-8 space-y-6">
                <p className="text-gray-300 mb-4">The reactivity series helps predict whether a displacement reaction will occur. A more reactive element can displace a less reactive element from its compound:</p>
                
                <div className="p-6 rounded-lg border border-blue-500/30 bg-blue-900/10">
                  <h4 className="text-lg font-bold mb-4 text-blue-300">Simplified Reactivity Series (Most → Least Reactive)</h4>
                  <div className="space-y-2 font-mono text-sm">
                    {/* <p className="text-blue-300">K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au</p> */}
                    <p className="text-gray-400 mt-4">Example: Since Fe is more reactive than Cu:</p>
                    <p className="text-cyan-300 mt-2">Fe + CuSO₄ → FeSO₄ + Cu ✓ (Reaction occurs)</p>
                    <p className="text-gray-400 mt-4">But since Cu is less reactive than Fe:</p>
                    <p className="text-red-300 mt-2">Cu + FeSO₄ → CuSO₄ + Fe ✗ (Reaction does NOT occur)</p>
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
                    year: '1600s-1700s',
                    title: 'Chemical Revolution Begins',
                    desc: 'Scientists develop the concept of chemical reactions and elements. Phlogiston theory is replaced by modern understanding.'
                  },
                  {
                    year: '1789',
                    title: 'Law of Conservation of Mass',
                    desc: 'Antoine Lavoisier demonstrates that matter is neither created nor destroyed in chemical reactions, establishing stoichiometry.'
                  },
                  {
                    year: '1800s',
                    title: 'Reaction Classification',
                    desc: 'Chemists begin systematically classifying reactions into types including combination, decomposition, and displacement reactions.'
                  },
                  {
                    year: '1900s',
                    title: 'Reaction Mechanisms',
                    desc: 'Scientists develop detailed understanding of how and why reactions occur, including activation energy and catalysts.'
                  },
                  {
                    year: 'Today',
                    title: 'Advanced Applications',
                    desc: 'Chemical reaction understanding is fundamental to medicine, materials science, environmental cleanup, and industrial chemistry.'
                  }
                ].map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="group">
                      <p className="text-blue-400 font-bold text-lg">{event.year}</p>
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
                    id: 'stoichiometry',
                    title: '🔢 Stoichiometry',
                    summary: 'Calculating molar ratios and balancing chemical equations.',
                    details: 'Stoichiometry uses the coefficients in balanced equations to determine reactant and product quantities. The law of conservation of mass requires that atoms are neither created nor destroyed, so equations must be balanced.'
                  },
                  {
                    id: 'driving-forces',
                    title: '⚡ Driving Forces',
                    summary: 'Factors that make reactions occur.',
                    details: 'Reactions proceed when driven by formation of precipitates (insoluble solids), gases that escape, water formation, or heat release. In double displacement, if no driving force exists, the reaction may not proceed noticeably.'
                  },
                  {
                    id: 'ionic-equations',
                    title: '🧪 Ionic vs Molecular Equations',
                    summary: 'Different ways to represent reactions.',
                    details: 'Molecular equations show all compounds. Ionic equations show dissolved salts as individual ions. Net ionic equations show only species that actually participate in the reaction. This distinction is important for understanding reaction mechanisms.'
                  }
                ].map((concept) => (
                  <div key={concept.id}>
                    <button
                      onClick={() => toggleSection(concept.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group"
                    >
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-100 group-hover:text-blue-300 transition-colors">{concept.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{concept.summary}</p>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`flex-shrink-0 text-blue-400 expand-icon ${expandedSection === concept.id ? 'rotated' : ''}`}
                      />
                    </button>
                    <div className={`content-reveal ${expandedSection === concept.id ? 'open' : ''}`}>
                      <div className="p-4 mt-2 bg-black/20 rounded-lg border border-blue-500/10">
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
                    title: '🔥 Combustion in Engines',
                    desc: 'Combination reactions of fuel and oxygen power vehicles, generating heat and mechanical energy.'
                  },
                  {
                    title: '🏭 Metal Extraction',
                    desc: 'Displacement reactions extract metals like iron and copper from their ores in industrial furnaces.'
                  },
                  {
                    title: '💊 Medication & Chemistry',
                    desc: 'Double displacement reactions are used to create new pharmaceutical compounds and chemical synthesis.'
                  },
                  {
                    title: '🧼 Acid-Base Reactions',
                    desc: 'Double displacement reactions between acids and bases produce salts and water, used in cleaning and neutralization.'
                  },
                  {
                    title: '🎨 Photography & Imaging',
                    desc: 'Precipitation reactions in double displacement form silver halides used in traditional photography films.'
                  },
                  {
                    title: '⚗️ Water Treatment',
                    desc: 'Chemical reactions remove impurities from water through precipitation and displacement processes.'
                  }
                ].map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-lg border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300">
                    <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                    <p className="text-gray-400">{app.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="glow-border rounded-2xl p-8 sm:p-10">
              <h2>Video Explanation</h2>
              <p className="text-gray-300 mb-6">Watch these videos to see chemical reactions in action:</p>
              <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/sTvTc6SZkao"
                  title="Types of Chemical Reactions"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-400 mt-4">Video: "Classification of Chemical Reactions" - Visual demonstrations of combination, displacement, and double displacement reactions.</p>
            </section>

            {/* Simulation Guide */}
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/30">
              <div className="flex items-start gap-4">
                <Microscope size={32} className="text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="!mb-4">Simulation Walkthrough</h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <p className="font-semibold text-blue-300 mb-1">1. Identify Reaction Type</p>
                      <p>Examine the reactants and determine whether the reaction is combination (A+B→AB), displacement (A+BC→AC+B), or double displacement (AB+CD→AD+CB).</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300 mb-1">2. Predict Products</p>
                      <p>Use reactivity series (for displacement) or ion pairing rules (for double displacement) to predict what products will form.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300 mb-1">3. Balance the Equation</p>
                      <p>Ensure equal numbers of atoms on both sides. Start with metals, then nonmetals, then hydrogen, and oxygen last.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300 mb-1">4. Observe & Analyze</p>
                      <p>Watch the reaction proceed, note color changes, precipitate formation, or gas evolution. Verify your predictions match observations.</p>
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
                    q: 'How do I know which element will displace another?',
                    a: 'Use the reactivity series (activity series) of elements. A more reactive element can displace a less reactive element from its compound. The reactivity order generally follows: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag.'
                  },
                  {
                    id: 'faq-2',
                    q: 'What drives a double displacement reaction?',
                    a: 'Double displacement reactions are driven by formation of: (1) A precipitate (insoluble solid), (2) A gas that escapes, or (3) Water in acid-base reactions. If none of these occur, the reaction may not proceed.'
                  },
                  {
                    id: 'faq-3',
                    q: 'What\'s the difference between molecular and ionic equations?',
                    a: 'Molecular equations show all compounds as written. Ionic equations show dissolved ionic compounds as separate ions. Net ionic equations show only ions that actually participate in the reaction, omitting spectator ions.'
                  },
                  {
                    id: 'faq-4',
                    q: 'How do I balance chemical equations?',
                    a: 'Use the algebraic method: assign coefficients to balance atoms. Generally balance in order: metals, nonmetals, hydrogen, then oxygen. Never change subscripts—only coefficients. Verify by counting each element on both sides.'
                  },
                  {
                    id: 'faq-5',
                    q: 'Can combination reactions be reversed?',
                    a: 'Yes! The reverse of a combination reaction (A+B→AB) is a decomposition reaction (AB→A+B). These are opposite processes. Decomposition typically requires heat or electricity to break the compound apart.'
                  },
                  {
                    id: 'faq-6',
                    q: 'Are all displacement reactions exothermic?',
                    a: 'Not necessarily. Many displacement reactions are exothermic (release heat), especially those involving reactive metals. However, some displacement reactions are endothermic (absorb heat). Temperature changes depend on the specific reaction.'
                  },
                  {
                    id: 'faq-7',
                    q: 'How do I predict products of a double displacement?',
                    a: 'Exchange the ions: if AB + CD reacts, products are AD + CB. Then check solubility: if one product is insoluble, it precipitates out. Use solubility rules to determine which compound precipitates.'
                  },
                  {
                    id: 'faq-8',
                    q: 'What\'s the difference between single and double displacement?',
                    a: 'Single displacement: one element replaces another (A+BC→AC+B). Double displacement: two compounds exchange ions (AB+CD→AD+CB). They\'re fundamentally different processes with different mechanisms.'
                  }
                ].map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group text-left"
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
                    desc: 'Complete notes on reaction types, equations, mechanisms, reactivity series, and balancing techniques.',
                    color: 'from-emerald-900/30 to-teal-900/30',
                    borderColor: 'border-emerald-500/20'
                  },
                  {
                    icon: '📝',
                    title: 'PYQ Papers',
                    desc: 'Previous years\' exam questions on identifying, balancing, and predicting chemical reactions.',
                    color: 'from-cyan-900/30 to-blue-900/30',
                    borderColor: 'border-cyan-500/20'
                  },
                  {
                    icon: '💾',
                    title: 'Study Materials',
                    desc: 'Reactivity series charts, solubility rules, balancing guides, and quick reference tables.',
                    color: 'from-violet-900/30 to-purple-900/30',
                    borderColor: 'border-violet-500/20'
                  },
                  {
                    icon: '✏️',
                    title: 'Sample Papers',
                    desc: 'Practice problems with reaction identification, product prediction, and equation balancing exercises.',
                    color: 'from-orange-900/30 to-red-900/30',
                    borderColor: 'border-orange-500/20'
                  }
                ].map((resource, i) => (
                  <div key={i} className={`bg-gradient-to-br ${resource.color} rounded-xl border ${resource.borderColor} p-6 hover:border-opacity-100 transition-all duration-300 group cursor-pointer`}>
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-300 transition-colors">{resource.title}</h3>
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
            <section className="glow-border rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-slate-900/30">
              <button
                onClick={() => setQuizExpanded(!quizExpanded)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="!mb-0">Test Your Knowledge</h2>
                <ChevronDown 
                  size={28} 
                  className={`flex-shrink-0 text-blue-400 transition-transform duration-300 ${quizExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              
              {quizExpanded && (
                <div className="mt-8 pt-8 border-t border-blue-500/20">
                  <p className="text-gray-300 mb-8">Challenge yourself with this interactive quiz on chemical reaction types. Select your answers and get instant feedback!</p>
                  <QuizComponent />
                </div>
              )}
            </section>

          </div>

          {/* Footer CTA */}
          <div className="glow-border rounded-2xl p-8 sm:p-10 text-center">
            <h3>Ready to Explore?</h3>
            <p className="text-gray-300 my-6 max-w-2xl mx-auto">
              Launch the interactive simulation and observe chemical reactions in real-time. Balance equations, predict products, and verify your understanding through hands-on experimentation.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group">
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