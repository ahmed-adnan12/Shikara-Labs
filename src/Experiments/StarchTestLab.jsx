import React, { useState, useEffect } from 'react';
import { Droplets, Zap, Wind, RotateCcw, ChevronDown, BookOpen, CheckCircle } from 'lucide-react';

const StarchTestLabProfessional = () => {
  // Experiment States
  const [experimentalLeafStep, setExperimentalLeafStep] = useState(0); // 0=green, 1=white (after ethanol), 2=blue-black (after iodine)
  const [controlLeafStep, setControlLeafStep] = useState(0); // No light = brown
  const [deStarted, setDeStarted] = useState(false);
  
  // Timing
  const [timeBoiling, setTimeBoiling] = useState(0);
  const [timeIodine, setTimeIodine] = useState(0);
  
  // Results
  const [experimentComplete, setExperimentComplete] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);
  
  // UI
  const [expandedStep, setExpandedStep] = useState(0);

  // ===== EXPERIMENTAL LEAF DECOLORIZATION =====
  useEffect(() => {
    let interval;
    
    if (deStarted && experimentalLeafStep === 0) {
      interval = setInterval(() => {
        setTimeBoiling(prev => prev + 1);
        
        // After 5-10 seconds of boiling, leaf decolorizes (ethanol removes chlorophyll)
        if (timeBoiling >= 8) {
          setExperimentalLeafStep(1);
          setTimeBoiling(0);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [deStarted, experimentalLeafStep, timeBoiling]);

  // ===== EXPERIMENTAL LEAF IODINE TEST =====
  useEffect(() => {
    let interval;
    
    if (experimentalLeafStep === 1 && timeIodine > 0) {
      interval = setInterval(() => {
        setTimeIodine(prev => prev + 1);
        
        // After iodine contact, turns blue-black (starch present)
        if (timeIodine >= 3) {
          setExperimentalLeafStep(2);
          setTimeIodine(0);
          setExperimentComplete(true);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [experimentalLeafStep, timeIodine]);

  const startDecolorization = () => {
    setDeStarted(true);
  };

  const addIodineExperimental = () => {
    if (experimentalLeafStep === 1) {
      setTimeIodine(1);
    }
  };

  const testControlLeaf = () => {
    setControlLeafStep(1); // No light = stays brown
  };

  const showResults = () => {
    setShowConclusion(true);
  };

  const reset = () => {
    setExperimentalLeafStep(0);
    setControlLeafStep(0);
    setDeStarted(false);
    setTimeBoiling(0);
    setTimeIodine(0);
    setExperimentComplete(false);
    setShowConclusion(false);
    setExpandedStep(0);
  };

  // Step Card Component
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
        expandedStep === number ? 'max-h-[800px]' : 'max-h-0'
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
            <Droplets className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-bold text-sm tracking-wider">STARCH TEST EXPERIMENT</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">STARCH TEST</h1>
          <p className="text-xl text-slate-300 mb-3">📘 Class 10 Biology - Life Processes</p>
          <p className="text-lg text-slate-400 mb-8">Iodine Test - Detection of Starch in Leaves (Proof of Photosynthesis)</p>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur">
            <p className="text-slate-200 leading-relaxed mb-3">
              <strong>Objective:</strong> To detect the presence of starch in green leaves that have undergone photosynthesis, and to prove that starch is the storage form of glucose produced during photosynthesis.
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Principle:</strong> Iodine solution (I₂-KI) reacts with amylose in starch to form a blue-black complex (starch-iodine complex). This color change is diagnostic for starch detection.
            </p>
          </div>
        </div>

        {/* ===== MAIN EXPERIMENT ===== */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* LEFT: PROCEDURE STEPS */}
          <div className="space-y-6">
            
            {/* Step 1 */}
            <StepCard
              number={1}
              title="Boil Leaf in Water"
              icon="💧"
              isActive={deStarted}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Place the experimental leaf in boiling water for 30 seconds. This kills the cells, disrupts membranes, and allows ethanol to penetrate and remove chlorophyll.
              </p>
              <button
                onClick={startDecolorization}
                disabled={deStarted}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  deStarted
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                }`}
              >
                {deStarted ? `✓ Boiling (${timeBoiling}s)` : 'Start Boiling in Water'}
              </button>
            </StepCard>

            {/* Step 2 */}
            <StepCard
              number={2}
              title="Decolorize with Ethanol"
              icon="🧪"
              isActive={experimentalLeafStep >= 1}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Place the boiled leaf in boiling ethanol (5-10 minutes) in a water bath. Ethanol dissolves and removes chlorophyll, turning the leaf white. This allows iodine color to show clearly.
              </p>
              <div className={`py-3 px-4 rounded-lg font-bold text-center text-white ${
                experimentalLeafStep >= 1 ? 'bg-emerald-500/30 border border-emerald-500/50' : 'bg-slate-700'
              }`}>
                {experimentalLeafStep >= 1 ? '✓ Leaf Decolorized (WHITE)' : 'Waiting...'}
              </div>
            </StepCard>

            {/* Step 3 */}
            <StepCard
              number={3}
              title="Add Iodine Solution"
              icon="⚗️"
              isActive={experimentalLeafStep >= 1}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Rinse leaf with cold water, spread on white tile, and add iodine solution. Wait 2-3 minutes for color development.
              </p>
              <button
                onClick={addIodineExperimental}
                disabled={experimentalLeafStep !== 1}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  experimentalLeafStep >= 2
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                    : experimentalLeafStep === 1
                    ? 'bg-slate-600 hover:bg-slate-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {experimentalLeafStep >= 2 ? `✓ Iodine Added (${timeIodine}s)` : 'Add Iodine Solution'}
              </button>
            </StepCard>

            {/* Step 4 - Control */}
            <StepCard
              number={4}
              title="Test Control Leaf"
              icon="🍂"
              isActive={controlLeafStep > 0}
            >
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Test a leaf that was kept in darkness (no photosynthesis). After decolorization and iodine treatment, it remains brown (no starch).
              </p>
              <button
                onClick={testControlLeaf}
                disabled={controlLeafStep > 0}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                  controlLeafStep > 0
                    ? 'bg-slate-500/20 text-slate-300 border border-slate-500/50'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                }`}
              >
                {controlLeafStep > 0 ? '✓ Control Tested' : 'Test Control Leaf'}
              </button>
            </StepCard>
          </div>

          {/* CENTER: LEAF VISUALIZATION */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-8 text-center">Leaf Color Changes</h3>
            
            <div className="space-y-12">
              {/* Experimental Leaf */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-slate-200 mb-4">Experimental Leaf (Light Exposed)</h4>
                
                <div className={`relative w-48 h-32 mx-auto rounded-2xl border-4 border-white/30 shadow-2xl overflow-hidden transition-all duration-1000 flex items-center justify-center font-bold text-2xl text-white/80 ${
                  experimentalLeafStep === 0 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                  experimentalLeafStep === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-300' :
                  'bg-gradient-to-br from-blue-600 to-indigo-700'
                }`}>
                  {experimentalLeafStep === 0 ? '🍃' : 
                   experimentalLeafStep === 1 ? 'WHITE' : 
                   '★'}
                </div>
                
                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
                  <div className={`text-lg font-bold ${
                    experimentalLeafStep === 0 ? 'text-green-400' :
                    experimentalLeafStep === 1 ? 'text-slate-300' :
                    'text-blue-400'
                  }`}>
                    {experimentalLeafStep === 0 ? 'GREEN (Chlorophyll)' :
                     experimentalLeafStep === 1 ? 'WHITE (After Ethanol)' :
                     'BLUE-BLACK (Starch Present)'}
                  </div>
                </div>
              </div>

              {/* Control Leaf */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-slate-200 mb-4">Control Leaf (No Light)</h4>
                
                <div className={`relative w-48 h-32 mx-auto rounded-2xl border-4 border-white/30 shadow-2xl overflow-hidden transition-all duration-1000 flex items-center justify-center font-bold text-2xl ${
                  controlLeafStep === 0 ? 'bg-gradient-to-br from-slate-500 to-slate-600 text-white/60' :
                  'bg-gradient-to-br from-orange-600 to-orange-700 text-white'
                }`}>
                  {controlLeafStep === 0 ? '❌' : '–'}
                </div>
                
                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
                  <div className="text-lg font-bold text-orange-400">
                    {controlLeafStep === 0 ? 'WAITING...' : 'BROWN (No Starch)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MEASUREMENTS & CHEMISTRY */}
          <div className="space-y-6">
            
            {/* Chemical Equation */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-200 mb-6">Chemical Reaction</h4>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
                <div className="text-xs text-slate-400 mb-2 uppercase font-bold">Iodine-Starch Reaction</div>
                <div className="font-mono text-sm text-slate-300 leading-relaxed text-center space-y-2">
                  <div>Starch (Amylose) + I₂ →</div>
                  <div className="text-white font-bold">Starch-Iodine Complex</div>
                  <div className="text-blue-400 font-bold text-lg">(Blue-Black)</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                <p><strong>Mechanism:</strong></p>
                <ul className="space-y-1 ml-2">
                  <li>• Iodine molecules slip into helix of amylose</li>
                  <li>• Forms blue-black starch-iodine complex</li>
                  <li>• Color intensity indicates starch presence</li>
                </ul>
              </div>
            </div>

            {/* Photosynthesis Equation */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-slate-200 mb-6">Photosynthesis Process</h4>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs text-slate-400 mb-2 uppercase font-bold">Glucose Formation</div>
                <div className="font-mono text-xs text-slate-300 leading-relaxed text-center space-y-1">
                  <div>6CO₂ + 6H₂O + <span className="text-yellow-400 font-bold">Light</span></div>
                  <div>↓</div>
                  <div><span className="text-cyan-400 font-bold">C₆H₁₂O₆</span> + 6O₂</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 mt-4 space-y-2">
                <p><strong>Storage:</strong></p>
                <ul className="space-y-1 ml-2">
                  <li>• Glucose → Starch (via glycosidic bonds)</li>
                  <li>• Stored in chloroplasts as granules</li>
                  <li>• Insoluble = safe storage</li>
                </ul>
              </div>
            </div>

            {/* Time Trackers */}
            {deStarted && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-200 mb-4">Timing</h4>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-400">Boiling Time</div>
                    <div className="text-2xl font-black text-blue-400">{timeBoiling}s / 8s</div>
                  </div>
                  {experimentalLeafStep >= 2 && (
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <div className="text-xs text-slate-400">Iodine Contact</div>
                      <div className="text-2xl font-black text-purple-400">{timeIodine}s / 3s</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== RESULTS & CONCLUSION ===== */}
        {experimentComplete && (
          <div className="space-y-8 mb-12">
            
            {/* Result Summary */}
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-start gap-6">
                <CheckCircle className="w-12 h-12 text-cyan-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-3xl font-black text-white mb-6">RESULTS</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/30">
                      <p className="font-bold text-cyan-300 mb-2">Experimental Leaf:</p>
                      <p className="text-white text-lg mb-2">Turned <span className="font-bold text-blue-400">BLUE-BLACK</span></p>
                      <p className="text-sm text-slate-400">✓ Starch present (photosynthesis occurred)</p>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-orange-500/30">
                      <p className="font-bold text-orange-300 mb-2">Control Leaf:</p>
                      <p className="text-white text-lg mb-2">Remained <span className="font-bold text-orange-400">BROWN</span></p>
                      <p className="text-sm text-slate-400">✗ No starch (no photosynthesis)</p>
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
                    <strong>Glucose produced during photosynthesis is stored as starch in leaves.</strong>
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-blue-400">
                  <p className="font-bold text-blue-300 mb-2">🔹 Experimental Evidence:</p>
                  <ul className="space-y-2 ml-2 text-slate-300">
                    <li>• Blue-black color with iodine proves starch is present in leaves exposed to light</li>
                    <li>• Brown color in dark-kept leaves proves no starch formed without light</li>
                    <li>• Demonstrates photosynthesis requires light for starch formation</li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-purple-400">
                  <p className="font-bold text-purple-300 mb-2">🔹 Why Starch & Not Glucose:</p>
                  <ul className="space-y-2 ml-2 text-slate-300">
                    <li>• Glucose is soluble → easily transported away</li>
                    <li>• Starch is insoluble → storage form</li>
                    <li>• Plants convert excess glucose to starch for energy reserves</li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border-l-4 border-cyan-400">
                  <p className="font-bold text-cyan-300 mb-2">🔹 Scientific Principle:</p>
                  <p className="text-slate-300">
                    Iodine specifically reacts with amylose (helical component of starch) to form characteristic blue-black complex, providing reliable detection method.
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Experimental vs Control Comparison</h3>
              
              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700">
                      <th className="p-4 text-left text-cyan-400 font-bold">Condition</th>
                      <th className="p-4 text-center text-cyan-400 font-bold">Light Exposure</th>
                      <th className="p-4 text-center text-cyan-400 font-bold">Photosynthesis</th>
                      <th className="p-4 text-center text-cyan-400 font-bold">Starch Formed</th>
                      <th className="p-4 text-left text-cyan-400 font-bold">Iodine Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="hover:bg-slate-900/30 bg-green-900/20">
                      <td className="p-4 text-slate-200 font-bold">Experimental Leaf</td>
                      <td className="p-4 text-center">✓ Full Light</td>
                      <td className="p-4 text-center text-green-400 font-bold">✓ YES</td>
                      <td className="p-4 text-center text-green-400 font-bold">✓ YES</td>
                      <td className="p-4 text-left">
                        <span className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg">BLUE-BLACK</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="p-4 text-slate-200 font-bold">Control Leaf</td>
                      <td className="p-4 text-center">✗ Darkness</td>
                      <td className="p-4 text-center text-orange-400 font-bold">✗ NO</td>
                      <td className="p-4 text-center text-orange-400 font-bold">✗ NO</td>
                      <td className="p-4 text-left">
                        <span className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg">BROWN</span>
                      </td>
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
                    <p className="font-bold text-slate-200 mb-2">📚 Starch Structure</p>
                    <p className="text-sm text-slate-300">Polymer of glucose units (C₆H₁₂O₆)ₙ, composed of amylose & amylopectin</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">🔬 Iodine Test</p>
                    <p className="text-sm text-slate-300">Qualitative test - shows presence/absence but not quantity of starch</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">💡 Decolorization Purpose</p>
                    <p className="text-sm text-slate-300">Chlorophyll masks iodine color change; ethanol removal makes results clear</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="font-bold text-slate-200 mb-2">🌿 Plant Storage</p>
                    <p className="text-sm text-slate-300">Plants store starch in leaves, roots, stems, and seeds for future energy use</p>
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

export default StarchTestLabProfessional;