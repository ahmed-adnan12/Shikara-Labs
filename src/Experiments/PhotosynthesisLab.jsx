import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Wind, Leaf, RotateCcw, ChevronDown } from 'lucide-react';

const PhotosynthesisVirtualLab = () => {
  // Step 1: Light Absorption
  const [lightOn, setLightOn] = useState(false);
  const [lightAbsorbed, setLightAbsorbed] = useState(0);
  
  // Step 2: Light Reaction
  const [waterOn, setWaterOn] = useState(false);
  const [oxygenReleased, setOxygenReleased] = useState(0);
  const [energyProduced, setEnergyProduced] = useState(0);
  
  // Step 3: Dark Reaction
  const [co2On, setCo2On] = useState(false);
  const [glucoseFormed, setGlucoseFormed] = useState(0);
  
  // Step 4: Food Storage
  const [starchStored, setStarchStored] = useState(0);
  
  // UI State
  const [expandedStep, setExpandedStep] = useState(0);
  const [particles, setParticles] = useState([]);
  const [activeReaction, setActiveReaction] = useState(null);

  // ========== STEP 1: Light Absorption ==========
  useEffect(() => {
    let interval;
    if (lightOn) {
      setActiveReaction('step1');
      interval = setInterval(() => {
        setLightAbsorbed(prev => prev + 1);
      }, 600);
    } else {
      if (activeReaction === 'step1') setActiveReaction(null);
      setLightAbsorbed(0);
    }
    return () => clearInterval(interval);
  }, [lightOn]);

  // ========== STEP 2: Light Reaction ==========
  useEffect(() => {
    let interval;
    if (lightOn && waterOn) {
      setActiveReaction('step2');
      interval = setInterval(() => {
        // Water splits → Oxygen released
        setOxygenReleased(prev => prev + 1);
        setEnergyProduced(prev => Math.min(prev + 2.5, 100));

        // O2 bubble particles
        const newParticles = Array.from({ length: 2 }).map(() => ({
          id: Math.random(),
          x: 20 + Math.random() * 60,
          y: 250,
          type: 'O2'
        }));
        setParticles(prev => [...prev, ...newParticles].slice(-20));
      }, 700);
    } else {
      if (activeReaction === 'step2') setActiveReaction(null);
    }
    return () => clearInterval(interval);
  }, [lightOn, waterOn]);

  // ========== STEP 3: Dark Reaction ==========
  useEffect(() => {
    let interval;
    if (energyProduced > 30 && co2On) {
      setActiveReaction('step3');
      interval = setInterval(() => {
        // CO2 used to form glucose
        setGlucoseFormed(prev => prev + 0.6);
        setEnergyProduced(prev => Math.max(prev - 1.2, 0));

        // Glucose particles
        const newParticles = Array.from({ length: 1 }).map(() => ({
          id: Math.random(),
          x: 70 + Math.random() * 30,
          y: 250,
          type: 'glucose'
        }));
        setParticles(prev => [...prev, ...newParticles].slice(-20));
      }, 900);
    } else {
      if (activeReaction === 'step3') setActiveReaction(null);
    }
    return () => clearInterval(interval);
  }, [energyProduced, co2On]);

  // ========== STEP 4: Food Storage ==========
  useEffect(() => {
    if (glucoseFormed > 0) {
      setStarchStored(prev => prev + glucoseFormed * 0.08);
    }
  }, [glucoseFormed]);

  const reset = () => {
    setLightOn(false);
    setWaterOn(false);
    setCo2On(false);
    setLightAbsorbed(0);
    setOxygenReleased(0);
    setEnergyProduced(0);
    setGlucoseFormed(0);
    setStarchStored(0);
    setParticles([]);
    setActiveReaction(null);
    setExpandedStep(0);
  };

  // Step Component with Accordion
  const StepSection = ({ number, title, icon, color, children, isActive }) => (
    <div className={`rounded-2xl transition-all border-2 overflow-hidden ${
      isActive
        ? `bg-gradient-to-br ${color} border-white/30 shadow-2xl`
        : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 shadow-lg'
    }`}>
      {/* Header */}
      <button
        onClick={() => setExpandedStep(expandedStep === number ? 0 : number)}
        className={`w-full flex items-center gap-4 p-6 hover:opacity-80 transition-all ${
          isActive ? 'bg-white/10' : 'hover:bg-slate-700/20'
        }`}
      >
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
          isActive ? 'bg-white/20 shadow-lg' : 'bg-slate-700/50'
        }`}>
          {icon}
        </div>
        <div className="text-left flex-1">
          <div className={`text-xs font-bold uppercase tracking-wider ${
            isActive ? 'text-white/70' : 'text-slate-400'
          }`}>
            Step {number}
          </div>
          <h3 className={`text-2xl font-black ${
            isActive ? 'text-white' : 'text-slate-200'
          }`}>
            {title}
          </h3>
        </div>
        <ChevronDown className={`w-6 h-6 transition-transform flex-shrink-0 ${
          expandedStep === number ? 'rotate-180' : ''
        } ${isActive ? 'text-white' : 'text-slate-500'}`} />
      </button>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 ${
        expandedStep === number ? 'max-h-[1000px]' : 'max-h-0'
      }`}>
        <div className={`p-8 border-t ${isActive ? 'border-white/10' : 'border-slate-700/50'}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/50 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-bold text-sm tracking-wider">VIRTUAL LAB</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">PHOTOSYNTHESIS</h1>
          <p className="text-xl text-slate-300 mb-4">📘 Class 10 Biology - Life Processes</p>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-8 backdrop-blur">
            <p className="text-lg text-slate-200 leading-relaxed">
              Photosynthesis is the process by which green plants prepare their own food using carbon dioxide, water, and sunlight in the presence of chlorophyll. During this process, glucose is formed and oxygen is released.
            </p>
          </div>
        </div>

        {/* ===== STEP 1: LIGHT ABSORPTION ===== */}
        <StepSection
          number={1}
          title="Light Absorption"
          icon="☀️"
          color="from-yellow-900/40 to-orange-900/40"
          isActive={lightAbsorbed > 0}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Control */}
            <div>
              <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5" /> What Happens
              </h4>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Chlorophyll present in the chloroplast absorbs sunlight. Light energy is converted into chemical energy.
              </p>
              
              <button
                onClick={() => setLightOn(!lightOn)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  lightOn
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 shadow-yellow-400/50'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                {lightOn ? '☀️ LIGHT ON' : '🌙 LIGHT OFF'}
              </button>
            </div>

            {/* Display */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">☀️</div>
                <div className="text-sm text-slate-400 mb-2">Light Energy Absorbed</div>
                <div className="text-4xl font-black text-yellow-400">{lightAbsorbed}</div>
                <div className="h-3 bg-slate-700 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" 
                    style={{ width: `${Math.min(lightAbsorbed / 2, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </StepSection>

        {/* ===== STEP 2: LIGHT REACTION ===== */}
        <StepSection
          number={2}
          title="Light Reaction"
          icon="💧"
          color="from-blue-900/40 to-cyan-900/40"
          isActive={oxygenReleased > 0}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Control */}
            <div>
              <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> What Happens
              </h4>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Water molecules split into hydrogen and oxygen. Oxygen is released as a by-product. Energy is stored for the dark reaction.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Light Status:</label>
                  <div className={`py-3 px-4 rounded-lg font-bold text-center text-white ${
                    lightOn ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-slate-700 border border-slate-600'
                  }`}>
                    {lightOn ? '✓ Light Available' : '✗ No Light'}
                  </div>
                </div>
                
                <button
                  onClick={() => setWaterOn(!waterOn)}
                  disabled={!lightOn}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    lightOn
                      ? waterOn
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-blue-400/50'
                        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {waterOn ? '💧 WATER ON' : '💧 WATER OFF'}
                </button>
              </div>
            </div>

            {/* Displays */}
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl mb-2">💨</div>
                  <div className="text-sm text-slate-400 mb-2">Oxygen Released</div>
                  <div className="text-3xl font-black text-cyan-400">{oxygenReleased}</div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="text-sm text-slate-400 mb-2">Energy Produced</div>
                  <div className="text-3xl font-black text-amber-400">{Math.floor(energyProduced)}</div>
                  <div className="h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${energyProduced}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equation */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mt-6 text-center font-mono text-sm text-slate-300">
            2H₂O + <span className="text-yellow-400 font-bold">Light</span> → O₂ + Energy
          </div>
        </StepSection>

        {/* ===== STEP 3: DARK REACTION ===== */}
        <StepSection
          number={3}
          title="Dark Reaction"
          icon="🌱"
          color="from-green-900/40 to-emerald-900/40"
          isActive={glucoseFormed > 0}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Control */}
            <div>
              <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5" /> What Happens
              </h4>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                CO₂ is used to form glucose. Does not require light directly. Uses energy produced in light reaction.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Energy Available:</label>
                  <div className={`py-3 px-4 rounded-lg font-bold text-center text-white ${
                    energyProduced > 30 ? 'bg-green-500/20 border border-green-500/50' : 'bg-slate-700 border border-slate-600'
                  }`}>
                    {energyProduced > 30 ? `✓ ${Math.floor(energyProduced)}%` : `✗ Need ${Math.ceil(30 - energyProduced)}%`}
                  </div>
                </div>
                
                <button
                  onClick={() => setCo2On(!co2On)}
                  disabled={energyProduced <= 30}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    energyProduced > 30
                      ? co2On
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-400/50'
                        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {co2On ? '💨 CO₂ ON' : '💨 CO₂ OFF'}
                </button>
              </div>
            </div>

            {/* Display */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/50 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">🍬</div>
                <div className="text-sm text-slate-300 mb-2">Glucose Formed</div>
                <div className="text-4xl font-black text-green-400">{glucoseFormed.toFixed(1)}</div>
                <div className="h-3 bg-slate-700 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" 
                    style={{ width: `${Math.min(glucoseFormed * 10, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Equation */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mt-6 text-center font-mono text-sm text-slate-300">
            CO₂ + Energy → <span className="text-green-400 font-bold">C₆H₁₂O₆ (Glucose)</span>
          </div>
        </StepSection>

        {/* ===== STEP 4: FOOD STORAGE ===== */}
        <StepSection
          number={4}
          title="Food Formation & Storage"
          icon="💾"
          color="from-purple-900/40 to-pink-900/40"
          isActive={glucoseFormed > 0}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Information */}
            <div>
              <h4 className="text-lg font-bold text-slate-200 mb-4">What Happens</h4>
              <p className="text-slate-300 text-sm leading-relaxed space-y-4">
                <div>• Glucose is stored as starch</div>
                <div>• Used by the plant for growth</div>
                <div>• Used for respiration and energy</div>
                <div>• Used for repair of damaged parts</div>
              </p>
            </div>

            {/* Displays */}
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <div className="text-center">
                  <div className="text-4xl mb-2">🍬</div>
                  <div className="text-sm text-slate-400 mb-2">Glucose Produced</div>
                  <div className="text-3xl font-black text-green-400">{glucoseFormed.toFixed(1)}</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/50">
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <div className="text-sm text-slate-300 mb-2">Starch Stored</div>
                  <div className="text-3xl font-black text-purple-400">{starchStored.toFixed(1)}</div>
                  <div className="h-3 bg-slate-700 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400" 
                      style={{ width: `${Math.min(starchStored * 2, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StepSection>

        {/* ===== COMPLETE EQUATION ===== */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 mt-12 text-center shadow-lg">
          <h3 className="text-2xl font-black text-white mb-6">Complete Photosynthesis Equation</h3>
          <div className="bg-slate-900/50 rounded-xl p-6 font-mono text-sm text-slate-200 space-y-3 border border-slate-700">
            <div className="text-base">
              <span className="text-blue-400">6CO₂</span> + <span className="text-cyan-400">6H₂O</span> + <span className="text-yellow-400 font-bold">Light Energy</span>
            </div>
            <div className="text-slate-500">↓</div>
            <div className="text-base">
              <span className="text-green-400 font-bold">C₆H₁₂O₆</span> + <span className="text-cyan-400">6O₂</span>
            </div>
          </div>
        </div>

        {/* ===== LIVE VISUALIZATION ===== */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-12 mt-12 shadow-lg">
          <h3 className="text-2xl font-black text-white mb-8 text-center">Live Reaction Visualization</h3>
          
          <div className="relative h-80 bg-gradient-to-b from-slate-900/50 to-green-950/50 rounded-xl overflow-hidden border-2 border-slate-700 flex items-center justify-center">
            
            {/* Center text */}
            <div className="text-center z-10">
              <div className="text-6xl mb-3">🌿</div>
              <div className="text-2xl font-black text-white mb-2">
                {!lightOn && !waterOn && !co2On && "Ready to Start"}
                {lightAbsorbed > 0 && oxygenReleased === 0 && "Step 1: Absorbing Light"}
                {oxygenReleased > 0 && glucoseFormed === 0 && "Step 2: Water Splitting"}
                {glucoseFormed > 0 && "Step 3 & 4: Glucose Formation & Storage"}
              </div>
              <div className="text-slate-400 text-sm">Turn on controls to start photosynthesis</div>
            </div>

            {/* Particles - Light rays */}
            {lightOn && Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`light-${i}`}
                className="absolute w-1 bg-yellow-300 opacity-40"
                style={{
                  left: `${25 + i * 25}%`,
                  top: '-20px',
                  height: '200px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              />
            ))}

            {/* Particles - O2 bubbles */}
            {particles.filter(p => p.type === 'O2').slice(0, 8).map(p => (
              <div
                key={p.id}
                className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-lg"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}px`,
                  animation: 'floatUp 2s ease-out forwards'
                }}
              />
            ))}

            {/* Particles - Glucose */}
            {particles.filter(p => p.type === 'glucose').slice(0, 4).map(p => (
              <div
                key={p.id}
                className="absolute w-4 h-4 rounded-full bg-green-400 shadow-lg"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}px`,
                  animation: 'floatUp 2s ease-out forwards'
                }}
              />
            ))}

            <style>{`
              @keyframes floatUp {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.7; }
              }
            `}</style>

            {/* Glow effect */}
            {activeReaction && (
              <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse" style={{
                boxShadow: 'inset 0 0 60px rgba(34, 197, 94, 0.15)'
              }} />
            )}
          </div>
        </div>

        {/* ===== RESET BUTTON ===== */}
        <div className="flex justify-center mt-12">
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

export default PhotosynthesisVirtualLab;