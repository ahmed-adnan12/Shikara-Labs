import React, { useState, useEffect } from 'react';
import { Droplets, Wind, RotateCcw, ChevronDown, BookOpen, CheckCircle } from 'lucide-react';

const RespirationLabLimewater = () => {
  // Experiment State
  const [seedsActive, setSeedsActive] = useState(false);
  const [flaskSealed, setFlaskSealed] = useState(false);
  const [limewaterInserted, setLimewaterInserted] = useState(false);
  
  // Measurements
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [co2Level, setCo2Level] = useState(0);
  
  // Limewater State
  const [limewaterStatus, setLimewaterStatus] = useState('clear');
  const [calciumCarbonate, setCalciumCarbonate] = useState(0);
  
  // Results
  const [experimentComplete, setExperimentComplete] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  
  // UI
  const [expandedStep, setExpandedStep] = useState(0);
  const [particles, setParticles] = useState([]);

  // ===== MAIN RESPIRATION PROCESS =====
  useEffect(() => {
    let interval;

    if (seedsActive && flaskSealed && limewaterInserted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Seeds produce CO2
        setCo2Level(prev => Math.min(prev + 0.8, 100));

        // Limewater turns milky when CO2 reacts
        // Ca(OH)2 + CO2 → CaCO3 (white precipitate) + H2O
        if (co2Level > 20 && limewaterStatus === 'clear') {
          setLimewaterStatus('slightly_milky');
        }
        
        if (co2Level > 40 && limewaterStatus === 'slightly_milky') {
          setLimewaterStatus('milky');
        }
        
        if (co2Level > 60 && limewaterStatus === 'milky') {
          setLimewaterStatus('white_precipitate');
          setExperimentComplete(true);
        }

        // Calcium carbonate formation
        setCalciumCarbonate(prev => prev + 0.15);

        // White precipitate particles
        if (Math.random() > 0.7 && limewaterStatus !== 'clear') {
          const newParticles = Array.from({ length: 2 }).map(() => ({
            id: Math.random(),
            x: 40 + Math.random() * 20,
            y: Math.random() * 100,
            type: 'precipitate'
          }));
          setParticles(prev => [...prev, ...newParticles].slice(-20));
        }
      }, 800);
    }

    return () => clearInterval(interval);
  }, [seedsActive, flaskSealed, limewaterInserted, co2Level, limewaterStatus]);

  const startExperiment = () => {
    setSeedsActive(true);
    setFlaskSealed(false);
    setLimewaterInserted(false);
    setTimeElapsed(0);
    setCo2Level(0);
    setLimewaterStatus('clear');
    setCalciumCarbonate(0);
    setExperimentComplete(false);
    setShowConclusion(false);
  };

  const sealFlask = () => {
    if (seedsActive) setFlaskSealed(true);
  };

  const insertLimewater = () => {
    if (flaskSealed) setLimewaterInserted(true);
  };

  const showResults = () => {
    setShowConclusion(true);
  };

  const reset = () => {
    setSeedsActive(false);
    setFlaskSealed(false);
    setLimewaterInserted(false);
    setTimeElapsed(0);
    setCo2Level(0);
    setLimewaterStatus('clear');
    setCalciumCarbonate(0);
    setExperimentComplete(false);
    setShowConclusion(false);
    setParticles([]);
    setExpandedStep(0);
  };

  const getLimewaterColor = () => {
    switch(limewaterStatus) {
      case 'clear': return 'from-cyan-200 to-blue-300';
      case 'slightly_milky': return 'from-cyan-300 to-slate-400';
      case 'milky': return 'from-slate-300 to-slate-400';
      case 'white_precipitate': return 'from-slate-400 to-slate-500';
      default: return 'from-cyan-200 to-blue-300';
    }
  };

  const getLimewaterLabel = () => {
    switch(limewaterStatus) {
      case 'clear': return 'CLEAR';
      case 'slightly_milky': return 'SLIGHTLY MILKY';
      case 'milky': return 'MILKY WHITE';
      case 'white_precipitate': return 'WHITE PRECIPITATE';
      default: return 'CLEAR';
    }
  };

  // Step Component
  const StepCard = ({ number, title, icon, isActive, children }) => (
    <div className={`rounded-2xl transition-all border-2 overflow-hidden ${
      isActive
        ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/80 border-cyan-500/50 shadow-xl'
        : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 shadow-lg'
    }`}>
      <button
        onClick={() => setExpandedStep(expandedStep === number ? 0 : number)}
        className={`w-full flex items-center gap-4 p-6 hover:opacity-80 transition-all ${
          isActive ? 'bg-white/10' : 'hover:bg-slate-700/20'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
          isActive ? 'bg-cyan-500/30 shadow-lg text-cyan-300' : 'bg-slate-700/50 text-slate-400'
        }`}>
          {icon}
        </div>
        <div className="text-left flex-1">
          <div className={`text-xs font-bold uppercase tracking-wider ${
            isActive ? 'text-cyan-300' : 'text-slate-400'
          }`}>
            Step {number}
          </div>
          <h3 className={`text-xl font-bold ${
            isActive ? 'text-white' : 'text-slate-200'
          }`}>
            {title}
          </h3>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 ${
          expandedStep === number ? 'rotate-180' : ''
        } ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${
        expandedStep === number ? 'max-h-[600px]' : 'max-h-0'
      }`}>
        <div className={`p-6 border-t ${isActive ? 'border-cyan-500/20' : 'border-slate-700/50'}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <Wind className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-bold text-sm tracking-wider">RESPIRATION EXPERIMENT</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">RESPIRATION</h1>
          <p className="text-xl text-slate-300 mb-3">📘 Class 10 Biology - Life Processes</p>
          <p className="text-lg text-slate-400 mb-8">Detection of CO₂ Release Using Limewater Test</p>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur">
            <p className="text-slate-200 leading-relaxed mb-3">
              <strong>Respiration</strong> is a metabolic process where glucose is broken down in the presence of oxygen to release energy. Living organisms respire to obtain energy for various life processes.
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Objective:</strong> To demonstrate that carbon dioxide is released during respiration in germinating seeds using the limewater test.
            </p>
          </div>
        </div>

        {/* ===== MAIN EXPERIMENT ===== */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* LEFT: SETUP STEPS */}
          <div className="space-y-6">
            
            {/* Step 1 */}
            <StepCard
              number={1}
              title="Setup: Germinating Seeds"
              icon="🌱"
              isActive={seedsActive}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Take 25-30 germinating seeds that have been soaked for 24 hours. Place them in a conical flask. Germinating seeds show high respiration rates.
              </p>
              <button
                onClick={startExperiment}
                disabled={seedsActive}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  seedsActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                }`}
              >
                {seedsActive ? '✓ Seeds in Flask' : 'Start with Seeds'}
              </button>
            </StepCard>

            {/* Step 2 */}
            <StepCard
              number={2}
              title="Setup: Seal Flask"
              icon="🔒"
              isActive={flaskSealed}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Seal the flask with a cork or rubber stopper. Use Vaseline on the threads to ensure an airtight seal. This traps CO₂ inside.
              </p>
              <button
                onClick={sealFlask}
                disabled={!seedsActive || flaskSealed}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  flaskSealed
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : seedsActive
                    ? 'bg-slate-600 hover:bg-slate-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {flaskSealed ? '✓ Flask Sealed' : 'Seal Flask'}
              </button>
            </StepCard>

            {/* Step 3 */}
            <StepCard
              number={3}
              title="Testing: Insert Limewater"
              icon="⚗️"
              isActive={limewaterInserted}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Insert a test tube containing freshly prepared limewater through the cork. Use a delivery tube for contact with the gas inside the flask.
              </p>
              <button
                onClick={insertLimewater}
                disabled={!flaskSealed || limewaterInserted}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  limewaterInserted
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                    : flaskSealed
                    ? 'bg-slate-600 hover:bg-slate-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {limewaterInserted ? '✓ Limewater Inserted' : 'Insert Limewater'}
              </button>
            </StepCard>

            {/* Step 4 */}
            {experimentComplete && (
              <StepCard
                number={4}
                title="Observe Results"
                icon="📊"
                isActive={experimentComplete}
              >
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  Observe the change in limewater color. The white precipitate indicates the presence of carbon dioxide.
                </p>
                <button
                  onClick={showResults}
                  className="w-full py-3 px-4 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                >
                  View Conclusion
                </button>
              </StepCard>
            )}
          </div>

          {/* CENTER: APPARATUS VISUALIZATION */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-8 text-center">Apparatus & Observation</h3>
            
            <div className="relative h-full bg-gradient-to-b from-slate-900/50 to-cyan-950/50 rounded-xl overflow-hidden border-2 border-slate-700 p-8 flex flex-col items-center justify-between min-h-96">
              
              {/* Conical Flask with Seeds */}
              <div className="text-center">
                <div className={`relative w-28 h-40 mx-auto bg-gradient-to-b from-slate-200/20 to-slate-300/30 rounded-b-3xl border-4 border-slate-400/50 shadow-lg transition-all ${
                  flaskSealed ? 'ring-4 ring-blue-400/40' : ''
                }`}>
                  
                  {/* Seeds inside */}
                  {seedsActive && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-0.5">
                      {Array(6).fill().map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-amber-500 rounded-full shadow-lg animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Cork */}
                  {flaskSealed && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-amber-700 rounded-b-lg shadow-lg border border-amber-800"></div>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">Conical Flask</p>
              </div>

              {/* Delivery Tube */}
              {flaskSealed && (
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="w-24 h-1.5 bg-slate-500 rounded-full shadow-lg"></div>
                  <span className="text-slate-400 text-xs font-bold">CO₂</span>
                </div>
              )}

              {/* Limewater Test Tube */}
              {limewaterInserted && (
                <div className="text-center">
                  <div className={`relative w-20 h-32 mx-auto bg-gradient-to-b ${getLimewaterColor()} rounded-2xl border-4 border-white/30 shadow-2xl overflow-hidden transition-all duration-500`}>
                    
                    {/* Precipitate particles */}
                    {particles.filter(p => p.type === 'precipitate').slice(0, 8).map(p => (
                      <div
                        key={p.id}
                        className="absolute w-1 h-1 rounded-full bg-white/80 shadow-sm"
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                          animation: 'float 1.5s ease-out forwards'
                        }}
                      />
                    ))}

                    {/* Status indicator */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                      limewaterStatus === 'white_precipitate' 
                        ? 'ring-4 ring-white/40 shadow-inner' 
                        : ''
                    }`}/>
                  </div>
                  
                  <div className={`text-center mt-4 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    limewaterStatus === 'clear' ? 'bg-cyan-500/20 text-cyan-400' :
                    limewaterStatus === 'slightly_milky' ? 'bg-slate-400/20 text-slate-300' :
                    limewaterStatus === 'milky' ? 'bg-slate-400/30 text-slate-200' :
                    'bg-white/20 text-white font-bold'
                  }`}>
                    {getLimewaterLabel()}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Limewater Test Tube</p>
                </div>
              )}

              <style>{`
                @keyframes float {
                  0% { transform: translateY(0) scale(1); opacity: 1; }
                  100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
                }
              `}</style>

              {/* Status text */}
              <div className="text-center mt-4">
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  limewaterInserted ? 'text-cyan-400' : 'text-slate-500'
                }`}>
                  {!seedsActive ? 'Add seeds' : !flaskSealed ? 'Seal flask' : !limewaterInserted ? 'Insert limewater' : 'Observing...'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE MEASUREMENTS */}
          <div className="space-y-6">
            
            {/* Time & CO2 */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-200 mb-6">Live Measurements</h4>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1 uppercase">Time Elapsed</div>
                  <div className="text-3xl font-black text-cyan-400">{timeElapsed}s</div>
                </div>
                <div className={`bg-slate-900/50 rounded-lg p-4 border transition-all ${
                  co2Level > 20 ? 'border-cyan-500/50 ring-2 ring-cyan-400/30' : 'border-slate-700'
                }`}>
                  <div className={`text-xs mb-1 uppercase ${
                    co2Level > 20 ? 'text-cyan-400 font-bold' : 'text-slate-400'
                  }`}>
                    CO₂ Detected
                  </div>
                  <div className={`text-3xl font-black ${
                    co2Level > 20 ? 'text-cyan-400' : 'text-slate-500'
                  }`}>
                    {co2Level.toFixed(0)}%
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${Math.min(co2Level, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Limewater Reaction */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-200 mb-6">Chemical Reaction</h4>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
                <div className="text-xs text-slate-400 mb-2 uppercase font-bold">Equation</div>
                <div className="font-mono text-sm text-slate-300 leading-relaxed text-center">
                  <div>Ca(OH)₂ + CO₂ →</div>
                  <div className="text-white font-bold mt-1">CaCO₃↓ + H₂O</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed">
                <p className="mb-2"><strong>What happens:</strong></p>
                <ul className="space-y-1 ml-2">
                  <li>• Limewater = Ca(OH)₂ solution</li>
                  <li>• CO₂ from seeds reacts with limewater</li>
                  <li>• Forms CaCO₃ (white precipitate)</li>
                </ul>
              </div>

              {limewaterStatus !== 'clear' && (
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mt-4 text-sm text-cyan-200">
                  ✓ <strong>CO₂ DETECTED</strong> - Limewater changed color!
                </div>
              )}
            </div>

            {/* CaCO3 Formation */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-200 mb-4">Precipitate Formation</h4>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1 uppercase">CaCO₃ (Calcium Carbonate)</div>
                <div className="text-3xl font-black text-white">{calciumCarbonate.toFixed(1)}%</div>
                <div className="h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${Math.min(calciumCarbonate, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RESULTS & CONCLUSION ===== */}
        {showConclusion && (
          <div className="space-y-8 mb-12">
            
            {/* Result Box */}
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-start gap-6">
                <CheckCircle className="w-12 h-12 text-cyan-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-3xl font-black text-white mb-4">RESULT</h3>
                  <div className="text-lg text-slate-200 leading-relaxed space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/30">
                      <p className="font-bold text-cyan-300 mb-2">Observation:</p>
                      <p>Limewater turned <span className="font-bold text-white">{getLimewaterLabel().toLowerCase()}</span> due to the formation of <span className="font-bold text-white">calcium carbonate (CaCO₃)</span>.</p>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/30">
                      <p className="font-bold text-blue-300 mb-2">Chemical Evidence:</p>
                      <p>The white precipitate (CaCO₃) confirms that <span className="font-bold text-white">CO₂ was present</span> in the flask.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion Box */}
            <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-12 h-12 text-green-400" /> CONCLUSION
              </h3>
              
              <div className="space-y-4 text-lg text-slate-200 leading-relaxed">
                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-green-400">
                  <p className="font-bold text-green-300 mb-2">🔹 Main Conclusion:</p>
                  <p className="text-white text-xl">
                    <strong>Carbon dioxide is released during respiration in germinating seeds.</strong>
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-blue-400">
                  <p className="font-bold text-blue-300 mb-2">🔹 Scientific Explanation:</p>
                  <ul className="space-y-2 ml-2">
                    <li>• Germinating seeds are living organisms</li>
                    <li>• They respire to obtain energy for growth</li>
                    <li>• During aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy</li>
                    <li>• The CO₂ produced is released into the flask atmosphere</li>
                    <li>• Limewater detects CO₂ by forming white precipitate</li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-purple-400">
                  <p className="font-bold text-purple-300 mb-2">🔹 Why This Matters:</p>
                  <ul className="space-y-2 ml-2">
                    <li>• Respiration is essential for all living organisms</li>
                    <li>• It releases energy (ATP) for cellular functions</li>
                    <li>• CO₂ is a waste product that must be removed</li>
                    <li>• This practical confirms theoretical knowledge with real evidence</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Summary Table */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Experiment Summary</h3>
              
              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700">
                      <th className="p-4 text-left text-cyan-400 font-bold">Observation</th>
                      <th className="p-4 text-center text-cyan-400 font-bold">Time</th>
                      <th className="p-4 text-left text-cyan-400 font-bold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="hover:bg-slate-900/30">
                      <td className="p-4 text-slate-200">Initial: Clear limewater</td>
                      <td className="p-4 text-center text-slate-400">0-10 sec</td>
                      <td className="p-4 text-slate-200">No CO₂ in flask yet</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="p-4 text-slate-200">Slightly milky appearance</td>
                      <td className="p-4 text-center text-slate-400">10-30 sec</td>
                      <td className="p-4 text-slate-200">CO₂ starting to accumulate</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="p-4 text-slate-200">Milky white color</td>
                      <td className="p-4 text-center text-slate-400">30-50 sec</td>
                      <td className="p-4 text-slate-200">Significant CO₂ present</td>
                    </tr>
                    <tr className="bg-green-900/30 hover:bg-green-900/50">
                      <td className="p-4 text-slate-200 font-bold">White precipitate</td>
                      <td className="p-4 text-center text-green-400 font-bold">50+ sec</td>
                      <td className="p-4 text-green-300 font-bold">✓ RESPIRATION CONFIRMED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Learning Points */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Key Learning Points</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">📚 Respiration Definition</p>
                    <p className="text-sm text-slate-300">Process where organisms break down glucose with oxygen to release energy</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">🔬 Aerobic Respiration</p>
                    <p className="text-sm text-slate-300">Requires oxygen; produces CO₂, water, and large amount of energy</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">💡 Limewater Test</p>
                    <p className="text-sm text-slate-300">Detects CO₂ by forming white precipitate of calcium carbonate</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">🌱 Living Proof</p>
                    <p className="text-sm text-slate-300">Germinating seeds prove that life processes require respiration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== RESET BUTTON ===== */}
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-lg"
          >
            <RotateCcw className="w-5 h-5" /> Reset Experiment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespirationLabLimewater;