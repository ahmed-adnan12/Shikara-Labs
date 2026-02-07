import { useState } from "react";
import { Flame, Droplet, Beaker, Trash2, Plus, RotateCcw, Eye, Microscope } from "lucide-react";

export default function ChemicalReactionsInteractiveLab() {
  const [selectedMode, setSelectedMode] = useState("combination");
  const [beakers, setBeakers] = useState([
    { id: 1, x: 100, y: 300, chemical: null, volume: 0, temperature: 20, color: "#FFFFFF", label: "Empty" },
    { id: 2, x: 250, y: 300, chemical: null, volume: 0, temperature: 20, color: "#FFFFFF", label: "Empty" }
  ]);

  const [selectedBeaker, setSelectedBeaker] = useState(null);
  const [draggedChemical, setDraggedChemical] = useState(null);
  const [dragOverBeaker, setDragOverBeaker] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [observations, setObservations] = useState([]);
  const [heatApplied, setHeatApplied] = useState({});
  const [isReacting, setIsReacting] = useState(false);
  const [reactionPhase, setReactionPhase] = useState(0);

  // Chemical Data
  const chemicals = {
    // Combination
    magnesium: {
      name: "Magnesium (Mg)",
      category: "combination",
      color: "#C0C0C0",
      state: "solid",
      icon: "🧪"
    },
    oxygen: {
      name: "Oxygen (O₂)",
      category: "combination",
      color: "#87CEEB",
      state: "gas",
      icon: "💨"
    },
    // Displacement
    zinc: {
      name: "Zinc (Zn)",
      category: "displacement",
      color: "#A8A9AD",
      state: "solid",
      icon: "🧪"
    },
    copperSulfate: {
      name: "Copper Sulfate (CuSO₄)",
      category: "displacement",
      color: "#4169E1",
      state: "solution",
      icon: "💧"
    },
    // Double Displacement
    sodiumSulfate: {
      name: "Sodium Sulfate (Na₂SO₄)",
      category: "doubleDisplacement",
      color: "#FFFACD",
      state: "solution",
      icon: "💧"
    },
    bariumChloride: {
      name: "Barium Chloride (BaCl₂)",
      category: "doubleDisplacement",
      color: "#E0FFFF",
      state: "solution",
      icon: "💧"
    }
  };

  // Reaction Database
  const reactionDatabase = {
    combination: {
      title: "Combination Reaction: 2Mg + O₂ → 2MgO",
      type: "Synthesis",
      reactants: ["magnesium", "oxygen"],
      productColor: "#FFFAF0",
      productName: "Magnesium Oxide (MgO)",
      observations: [
        "🔥 Bright white light emitted",
        "🌡️ Temperature rises significantly (3100°C)",
        "⚪ White ash of magnesium oxide forms",
        "💨 Oxygen is consumed from air",
        "🔊 Crackling sound may occur"
      ],
      chemicalInfo: "Magnesium burns in oxygen with intense brightness. The reaction is highly exothermic.",
      heatRequired: true
    },
    displacement: {
      title: "Displacement Reaction: Zn + CuSO₄ → ZnSO₄ + Cu",
      type: "Single Displacement",
      reactants: ["zinc", "copperSulfate"],
      productColor: "#CD7F32",
      productName: "Zinc Sulfate (ZnSO₄) + Copper (Cu)",
      observations: [
        "🔴 Solution color changes from blue to colorless",
        "🟤 Reddish-brown copper deposits on zinc strip",
        "⬇️ Precipitate settles at the bottom",
        "🌡️ Temperature slightly increases",
        "✨ Shiny copper layer visible on zinc surface"
      ],
      chemicalInfo: "Zinc is more reactive than copper, so it displaces copper from its salt solution.",
      heatRequired: false
    },
    doubleDisplacement: {
      title: "Double Displacement: Na₂SO₄ + BaCl₂ → BaSO₄↓ + NaCl",
      type: "Double Displacement",
      reactants: ["sodiumSulfate", "bariumChloride"],
      productColor: "#F5F5F5",
      productName: "Barium Sulfate (BaSO₄) + Sodium Chloride (NaCl)",
      observations: [
        "⚪ Thick white precipitate forms immediately",
        "🌪️ Precipitate clouds the solution",
        "⬇️ White solid settles to the bottom",
        "🧪 Original solution becomes clear above precipitate",
        "🔬 Precipitate is insoluble in water"
      ],
      chemicalInfo: "Barium sulfate forms as an insoluble precipitate when barium and sulfate ions combine.",
      heatRequired: false
    }
  };

  const currentReactionData = reactionDatabase[selectedMode];
  const availableChemicals = Object.entries(chemicals).filter(
    ([key, chem]) => chem.category === selectedMode
  );

  // Add observation
  const addObservation = (text) => {
    setObservations(prev => [...prev, { id: Date.now() + Math.random(), text }]);
  };

  // Add chemical to beaker
  const addChemicalToBeaker = (beakerId, chemicalKey) => {
    const chemical = chemicals[chemicalKey];
    setBeakers(beakers.map(b => 
      b.id === beakerId 
        ? { 
            ...b, 
            chemical: chemicalKey, 
            volume: 50,
            color: chemical.color,
            label: chemical.name
          }
        : b
    ));
    
    addObservation(`✅ Added ${chemical.name} to Beaker ${beakerId}`);
  };

  // Apply heat
  const applyHeat = (beakerId) => {
    setHeatApplied({ ...heatApplied, [beakerId]: true });
    setBeakers(beakers.map(b =>
      b.id === beakerId
        ? { ...b, temperature: 150 }
        : b
    ));
    addObservation(`🔥 Applied heat to Beaker ${beakerId} - Temperature: 150°C`);
  };

  // Clear beaker
  const clearBeaker = (beakerId) => {
    setBeakers(beakers.map(b =>
      b.id === beakerId
        ? { ...b, chemical: null, volume: 0, temperature: 20, color: "#FFFFFF", label: "Empty" }
        : b
    ));
    setHeatApplied({ ...heatApplied, [beakerId]: false });
    addObservation(`🗑️ Cleared Beaker ${beakerId}`);
  };

  // Delete beaker
  const deleteBeaker = (beakerId) => {
    setBeakers(beakers.filter(b => b.id !== beakerId));
  };

  // Perform reaction
  const performReaction = () => {
    if (isReacting) return;

    const beaker1 = beakers[0];
    const beaker2 = beakers[1];

    // Validation
    if (!beaker1 || !beaker1.chemical) {
      alert("❌ Add a chemical to Beaker 1!");
      return;
    }

    if (!beaker2 || !beaker2.chemical) {
      alert("❌ Add a chemical to Beaker 2!");
      return;
    }

    // Check if correct reactants
    const hasReactant1 = currentReactionData.reactants.includes(beaker1.chemical);
    const hasReactant2 = currentReactionData.reactants.includes(beaker2.chemical);

    if (!hasReactant1 || !hasReactant2) {
      const names = currentReactionData.reactants.map(r => chemicals[r].name).join(" + ");
      alert(`❌ Wrong chemicals! Use: ${names}`);
      return;
    }

    // Check heat requirement
    if (currentReactionData.heatRequired && !heatApplied[beaker1.id]) {
      alert("⚠️ This reaction needs HEAT! Click the flame button on Beaker 1 first!");
      return;
    }

    // Start reaction animation
    setIsReacting(true);
    addObservation("🧪 REACTION STARTED! Mixing chemicals...");

    setTimeout(() => {
      setReactionPhase(1);
      addObservation(currentReactionData.observations[0]);
    }, 800);

    setTimeout(() => {
      setReactionPhase(2);
      addObservation(currentReactionData.observations[1]);
    }, 1600);

    setTimeout(() => {
      setReactionPhase(3);
      addObservation(currentReactionData.observations[2]);
    }, 2400);

    setTimeout(() => {
      // Update beaker 1 with product
      setBeakers(prevBeakers =>
        prevBeakers.map(b =>
          b.id === beaker1.id
            ? {
                ...b,
                chemical: "product",
                color: currentReactionData.productColor,
                label: currentReactionData.productName,
                volume: 60
              }
            : b.id === beaker2.id
            ? { ...b, chemical: null, volume: 0, color: "#FFFFFF", label: "Empty" }
            : b
        )
      );

      setReaction(currentReactionData);
      addObservation(currentReactionData.observations[3]);
      addObservation(currentReactionData.observations[4]);
      addObservation("✅ REACTION COMPLETE! Products formed.");
      
      setIsReacting(false);
      setReactionPhase(0);
    }, 3200);
  };

  // Reset lab
  const resetLab = () => {
    setBeakers([
      { id: 1, x: 100, y: 300, chemical: null, volume: 0, temperature: 20, color: "#FFFFFF", label: "Empty" },
      { id: 2, x: 250, y: 300, chemical: null, volume: 0, temperature: 20, color: "#FFFFFF", label: "Empty" }
    ]);
    setObservations([]);
    setReaction(null);
    setHeatApplied({});
    setSelectedBeaker(null);
    setIsReacting(false);
    setReactionPhase(0);
    addObservation("🔄 Lab reset. Ready for new experiment!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Microscope className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Interactive Chemical Reactions Lab</h1>
          </div>
          <p className="text-cyan-200">Perform chemistry experiments by mixing chemicals and observing reactions</p>
        </div>

        {/* Reaction Mode Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {["combination", "displacement", "doubleDisplacement"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setSelectedMode(mode);
                resetLab();
              }}
              className={`p-4 rounded-lg font-bold text-sm transition transform ${
                selectedMode === mode
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-105 shadow-lg shadow-cyan-500/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {mode === "combination" && "🔥 Combination"}
              {mode === "displacement" && "🔄 Displacement"}
              {mode === "doubleDisplacement" && "⚗️ Double Displacement"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Chemical Selection */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border-2 border-cyan-500/30 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Droplet className="w-6 h-6 text-cyan-400" />
                Chemicals
              </h2>

              <div className="space-y-3 mb-6">
                {availableChemicals.map(([key, chem]) => (
                  <div
                    key={key}
                    draggable="true"
                    onDragStart={() => setDraggedChemical(key)}
                    onDragEnd={() => setDraggedChemical(null)}
                    onClick={() => selectedBeaker && addChemicalToBeaker(selectedBeaker, key)}
                    className="p-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg cursor-move hover:shadow-lg hover:shadow-cyan-500/40 transition transform hover:scale-105 border border-slate-600 select-none"
                  >
                    <p className="font-semibold text-white text-sm">{chem.icon} {chem.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{chem.state}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-900/50 border-l-4 border-cyan-400 p-4 rounded text-sm text-slate-200">
                <p className="font-semibold text-cyan-300 mb-2">📖 How to Use:</p>
                <ul className="space-y-1 text-xs">
                  <li>✓ Click beaker → click chemical</li>
                  <li>✓ OR drag chemical → drop in beaker</li>
                  <li>✓ Apply heat if needed 🔥</li>
                  <li>✓ Click "React" button</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center Panel - Lab Workspace */}
          <div className="lg:col-span-3">
            {/* Reaction Info */}
            <div className="bg-blue-900/40 border-2 border-cyan-500/30 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-bold text-cyan-300 mb-2">{currentReactionData.title}</h2>
              <p className="text-sm text-slate-300 mb-2">
                <strong>Type:</strong> {currentReactionData.type}
              </p>
              <p className="text-sm text-slate-300">
                <strong>Info:</strong> {currentReactionData.chemicalInfo}
              </p>
              {currentReactionData.heatRequired && (
                <p className="text-sm text-orange-400 mt-2 font-bold">🔥 Heat Required!</p>
              )}
            </div>

            {/* Lab Workspace */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-500/30 rounded-lg p-8 mb-6 min-h-96 relative overflow-hidden">
              {/* Beakers */}
              <div className="flex gap-12 mb-12 flex-wrap">
                {beakers.map((beaker) => (
                  <div key={beaker.id} className="text-center">
                    {/* Beaker Container */}
                    <div
                      onClick={() => setSelectedBeaker(beaker.id)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverBeaker(beaker.id);
                      }}
                      onDragLeave={() => setDragOverBeaker(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedChemical) {
                          addChemicalToBeaker(beaker.id, draggedChemical);
                          setDraggedChemical(null);
                          setDragOverBeaker(null);
                        }
                      }}
                      className="cursor-pointer relative inline-block"
                    >
                      {/* Beaker */}
                      <div
                        className="w-28 h-48 border-4 border-white rounded-b-3xl rounded-t-lg shadow-2xl relative overflow-hidden transition-all"
                        style={{
                          background: beaker.chemical 
                            ? `linear-gradient(to bottom, #f0f0f0 0%, ${beaker.color} ${beaker.volume}%, #f0f0f0 ${beaker.volume}%)`
                            : "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                          boxShadow: 
                            selectedBeaker === beaker.id 
                              ? "0 0 30px rgba(34, 197, 234, 1)" 
                              : dragOverBeaker === beaker.id 
                              ? "0 0 25px rgba(34, 197, 234, 0.7), inset 0 0 15px rgba(34, 197, 234, 0.3)"
                              : "0 8px 24px rgba(0, 0, 0, 0.5)"
                        }}
                      >
                        {/* Liquid */}
                        {beaker.volume > 0 && (
                          <div
                            className="absolute bottom-0 w-full transition-all duration-300"
                            style={{
                              height: `${beaker.volume}%`,
                              backgroundColor: beaker.color,
                              opacity: 0.85
                            }}
                          >
                            {/* Shine */}
                            <div className="absolute top-2 left-2 w-3 h-10 bg-white/30 rounded-full blur-sm"></div>
                          </div>
                        )}

                        {/* Heat indicator */}
                        {heatApplied[beaker.id] && (
                          <div className="absolute inset-0">
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-500/50 to-transparent animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <div className="mt-4 text-center">
                        <p className="text-sm font-bold text-slate-300">{beaker.label}</p>
                        <p className="text-xs text-slate-500">Beaker {beaker.id} | {beaker.temperature}°C</p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-3 justify-center">
                        <button
                          onClick={() => applyHeat(beaker.id)}
                          disabled={heatApplied[beaker.id]}
                          className="p-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-500 text-white rounded transition"
                          title="Apply Heat"
                        >
                          <Flame className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => clearBeaker(beaker.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                          title="Clear"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {beakers.length > 1 && (
                          <button
                            onClick={() => deleteBeaker(beaker.id)}
                            className="p-2 bg-red-800 hover:bg-red-900 text-white rounded transition"
                            title="Delete Beaker"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Beaker Button */}
              {beakers.length < 3 && (
                <button
                  onClick={() => {
                    const newBeaker = {
                      id: Math.max(...beakers.map(b => b.id), 0) + 1,
                      chemical: null,
                      volume: 0,
                      temperature: 20,
                      color: "#FFFFFF",
                      label: "Empty"
                    };
                    setBeakers([...beakers, newBeaker]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Beaker
                </button>
              )}

              {/* Reaction Animation */}
              {isReacting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-300 font-bold text-lg">Reaction in Progress...</p>
                    <p className="text-slate-400 text-sm mt-2">Phase {reactionPhase}/3</p>
                  </div>
                </div>
              )}
            </div>

            {/* Perform Reaction Button */}
            <button
              onClick={performReaction}
              disabled={isReacting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
            >
              <Beaker className="w-6 h-6" />
              Perform Reaction
            </button>
          </div>
        </div>

        {/* Bottom Panel - Results & Observations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Observations */}
          <div className="bg-slate-800 border-2 border-cyan-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-cyan-400" />
              Observations Log
            </h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {observations.length === 0 ? (
                <p className="text-slate-400 text-sm">Perform an experiment to see observations...</p>
              ) : (
                observations.map(obs => (
                  <div
                    key={obs.id}
                    className="bg-slate-700 p-3 rounded text-sm text-slate-100 border-l-4 border-cyan-400"
                  >
                    {obs.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reaction Result */}
          {reaction && (
            <div className="bg-slate-800 border-2 border-green-500/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4">✅ Reaction Complete!</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 font-semibold mb-2">Products Formed:</p>
                  <p className="text-lg text-white font-bold">{reaction.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-semibold mb-2">Product Color:</p>
                  <div
                    className="w-full h-16 rounded border-2 border-slate-600 shadow-lg"
                    style={{ backgroundColor: reaction.productColor }}
                  ></div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-semibold mb-2">Key Observations:</p>
                  <ul className="space-y-1">
                    {reaction.observations.slice(0, 3).map((obs, idx) => (
                      <li key={idx} className="text-sm text-slate-300">{obs}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetLab}
          className="mt-8 mx-auto flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Lab
        </button>
      </div>
    </div>
  );
}