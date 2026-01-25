import React, { useState } from 'react';
import { 
  FlaskConical, ArrowLeft, Play, ChevronDown, ChevronUp, 
  Youtube, BookOpen, Target, Lightbulb, AlertCircle
} from 'lucide-react';

export default function FaradayLawPage() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const studentData = {
    fullName: "Ahmed",
    class: "10"
  };

  const experimentData = {
    title: "Electromagnetic Induction (Faraday's Law)",
    icon: "⚙️",
    duration: "25 min",
    difficulty: "Intermediate",
    description: "Discover how changing magnetic fields can generate electric current. Learn about Faraday's groundbreaking discovery that revolutionized our understanding of electricity and magnetism, and how it powers generators and transformers today.",
    
    objectives: [
      "Understand the principle of electromagnetic induction",
      "Learn Faraday's Law and Lenz's Law",
      "Observe how changing magnetic flux induces current",
      "Explore the relationship between magnetic field, coil turns, and induced EMF",
      "Apply Faraday's Law to real-world applications like generators"
    ],

    theory: {
      introduction: "Electromagnetic Induction is the phenomenon of generating electric current in a conductor by changing the magnetic field around it. This groundbreaking discovery by Michael Faraday in 1831 forms the basis of electric generators, transformers, and many modern electrical devices.",
      
      faradaysLaw: "Faraday's Law states that the induced electromotive force (EMF) in a closed circuit is equal to the negative rate of change of magnetic flux through the circuit. Mathematically: ε = -N(dΦ/dt), where ε is induced EMF, N is number of turns in the coil, and Φ is magnetic flux.",
      
      lenzLaw: "Lenz's Law states that the direction of induced current is such that it opposes the change in magnetic flux that produced it. This is why there's a negative sign in Faraday's equation - nature opposes change!",
      
      keyFactors: [
        "Strength of the magnetic field - Stronger magnets produce greater induced current",
        "Number of coil turns - More turns multiply the induced EMF",
        "Speed of motion - Faster movement creates greater rate of flux change",
        "Area of the coil - Larger area intercepts more magnetic field lines"
      ]
    },

    procedure: [
      "Set up a coil of wire connected to a galvanometer (current detector)",
      "Take a bar magnet and move it towards the coil",
      "Observe the deflection in the galvanometer - current is induced!",
      "Move the magnet away from the coil",
      "Notice the galvanometer deflects in opposite direction",
      "Keep the magnet stationary near the coil",
      "Observe that no current flows when there's no relative motion",
      "Experiment with different speeds and observe the effect on induced current"
    ],

    observations: [
      "When magnet moves toward coil: Galvanometer shows deflection (current flows)",
      "When magnet moves away: Galvanometer deflects in opposite direction",
      "When magnet is stationary: No deflection (no current)",
      "Faster movement: Greater deflection (more current induced)",
      "More coil turns: Greater induced EMF",
      "Stronger magnet: Greater induced current"
    ],

    applications: [
      {
        name: "Electric Generators",
        description: "Convert mechanical energy to electrical energy using rotating coils in magnetic fields"
      },
      {
        name: "Transformers",
        description: "Step up or step down AC voltages using mutual induction between coils"
      },
      {
        name: "Induction Cooktops",
        description: "Heat cookware directly using induced currents from changing magnetic fields"
      },
      {
        name: "Metal Detectors",
        description: "Detect metallic objects by measuring changes in induced currents"
      },
      {
        name: "Wireless Charging",
        description: "Charge devices without cables using electromagnetic induction"
      },
      {
        name: "Electric Guitar Pickups",
        description: "Convert string vibrations into electrical signals"
      }
    ],

    videoId: "fxYxUeNzAEo",

    faqs: [
      {
        question: "What is electromagnetic induction?",
        answer: "Electromagnetic induction is the process of generating electric current in a conductor by changing the magnetic field around it. When magnetic flux through a coil changes, it induces an electromotive force (EMF) that drives current through the circuit."
      },
      {
        question: "What is Faraday's Law?",
        answer: "Faraday's Law states that the induced EMF in a circuit is directly proportional to the rate of change of magnetic flux through it. The formula is ε = -N(dΦ/dt), where ε is EMF, N is number of turns, and dΦ/dt is rate of flux change."
      },
      {
        question: "What is Lenz's Law and why is it important?",
        answer: "Lenz's Law states that the direction of induced current opposes the change that caused it. This ensures conservation of energy - you can't get energy for free. The induced current creates a magnetic field that opposes the original flux change."
      },
      {
        question: "Why does moving the magnet faster increase induced current?",
        answer: "Moving the magnet faster increases the rate of change of magnetic flux (dΦ/dt). According to Faraday's Law, EMF is proportional to this rate of change, so faster movement means higher EMF and therefore more induced current."
      },
      {
        question: "What's the difference between a generator and a motor?",
        answer: "A generator converts mechanical energy to electrical energy using electromagnetic induction - you rotate a coil in a magnetic field to generate current. A motor does the opposite - it uses electric current in a magnetic field to produce mechanical rotation."
      },
      {
        question: "Why is there no current when the magnet is stationary?",
        answer: "Current is only induced when magnetic flux is changing. When the magnet is stationary near the coil, the flux is constant (not changing), so dΦ/dt = 0, which means no EMF is induced and no current flows."
      },
      {
        question: "How does the number of coil turns affect induced EMF?",
        answer: "The induced EMF is directly proportional to the number of turns (N) in the coil. If you double the number of turns, you double the induced EMF. This is why generators and transformers use many turns of wire."
      },
      {
        question: "Can we induce current in a coil without a magnet?",
        answer: "Yes! You can use another coil carrying alternating current (AC). The changing current in the first coil creates a changing magnetic field, which induces current in the second coil. This is called mutual induction and is how transformers work."
      }
    ],

    safetyTips: [
      "Handle magnets carefully - strong magnets can pinch skin",
      "Keep magnets away from electronic devices and credit cards",
      "Ensure all wire connections are secure before starting",
      "Don't use damaged or frayed wires",
      "Work in a clear area free from metallic objects"
    ]
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleBackToList = () => {
    alert('Returning to experiments list...');
  };

  const handleStartExperiment = () => {
    alert('Starting Faraday\'s Law experiment simulation... (Will be implemented later)');
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
              onClick={handleBackToList}
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <ArrowLeft size={20} className="text-cyan-400" />
            </button>
            <FlaskConical size={32} className="text-cyan-400" />
            <h1 className="text-lg sm:text-xl font-black truncate" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {experimentData.title}
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
      <div className="px-4 sm:px-8 md:px-12 lg:px-[70px] py-8 pb-32">
        {/* Experiment Overview */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl relative overflow-hidden" style={{
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent)'
          }}></div>
          <div className="relative z-10">
            <div className="text-5xl sm:text-6xl mb-4">{experimentData.icon}</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">{experimentData.title}</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-4">{experimentData.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-bold" style={{
                background: 'rgba(0, 212, 255, 0.2)',
                color: '#00d4ff'
              }}>
                ⏱️ {experimentData.duration}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-bold" style={{
                background: 'rgba(255, 136, 0, 0.2)',
                color: '#ff8800'
              }}>
                📊 {experimentData.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <Target size={28} className="text-cyan-400" />
            <h3 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Learning Objectives
            </h3>
          </div>
          <ul className="space-y-3">
            {experimentData.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-cyan-400 font-bold mt-1">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Theory Section */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={28} className="text-cyan-400" />
            <h3 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Theory
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Introduction</h4>
              <p className="text-gray-300 text-sm sm:text-base">{experimentData.theory.introduction}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-2">Faraday's Law</h4>
              <p className="text-gray-300 text-sm sm:text-base">{experimentData.theory.faradaysLaw}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-2">Lenz's Law</h4>
              <p className="text-gray-300 text-sm sm:text-base">{experimentData.theory.lenzLaw}</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3">Key Factors Affecting Induced EMF</h4>
              <ul className="space-y-2">
                {experimentData.theory.keyFactors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="flex items-center gap-2 mb-4">
            <Youtube size={24} className="text-red-500" />
            <h3 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Tutorial Video
            </h3>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden" style={{
            border: '2px solid rgba(0, 212, 255, 0.3)'
          }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${experimentData.videoId}`}
              title={experimentData.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Procedure */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb size={28} className="text-cyan-400" />
            <h3 className="text-xl sm:text-2xl font-black" style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Experimental Procedure
            </h3>
          </div>
          <ol className="space-y-3">
            {experimentData.procedure.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-cyan-400 font-bold mt-1">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Observations */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h3 className="text-xl sm:text-2xl font-black mb-4" style={{
            background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Expected Observations
          </h3>
          <ul className="space-y-3">
            {experimentData.observations.map((observation, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-cyan-400 font-bold mt-1">→</span>
                <span>{observation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Applications */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h3 className="text-xl sm:text-2xl font-black mb-6" style={{
            background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Real-World Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experimentData.applications.map((app, index) => (
              <div key={index} className="p-4 rounded-xl" style={{
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.2)'
              }}>
                <h4 className="text-lg font-bold text-white mb-2">{app.name}</h4>
                <p className="text-gray-400 text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(255, 136, 0, 0.05)',
          border: '1px solid rgba(255, 136, 0, 0.3)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={28} className="text-orange-400" />
            <h3 className="text-xl sm:text-2xl font-black text-orange-400">
              Safety Tips
            </h3>
          </div>
          <ul className="space-y-2">
            {experimentData.safetyTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                <span className="text-orange-400 font-bold mt-1">⚠</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h3 className="text-xl sm:text-2xl font-black mb-6" style={{
            background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {experimentData.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300"
                  style={{
                    background: expandedFAQ === index ? 'rgba(0, 212, 255, 0.1)' : 'transparent'
                  }}
                >
                  <span className="font-bold text-white text-sm sm:text-base pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp size={20} className="text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-cyan-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4 text-gray-300 text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Start Experiment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6" style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-[70px]">
          <button
            onClick={handleStartExperiment}
            className="w-full py-4 sm:py-5 rounded-xl text-base sm:text-lg font-black transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
              color: '#000000',
              boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 212, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.4)';
            }}
          >
            <Play size={24} />
            <span>Start Experiment</span>
          </button>
        </div>
      </div>
    </div>
  );
}