import { useState } from "react";
import { RotateCcw, Info } from "lucide-react";

export default function SoapCleansingActionLab() {
  const [activeTab, setActiveTab] = useState("experiment");
  
  // Experiment states
  const [selectedTube, setSelectedTube] = useState(null);
  const [soapAddedToSoft, setSoapAddedToSoft] = useState(false);
  const [soapAddedToHard, setSoapAddedToHard] = useState(false);
  const [shakingSoft, setShakingSoft] = useState(false);
  const [shakingHard, setShakingHard] = useState(false);
  const [showResultSoft, setShowResultSoft] = useState(false);
  const [showResultHard, setShowResultHard] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverTube, setDragOverTube] = useState(null);
  const [observations, setObservations] = useState([]);

  // Add observation
  const addObservation = (text) => {
    setObservations(prev => [...prev, { id: Date.now(), text }]);
  };

  // Handle soap drop
  const handleSoapDrop = (tubeType) => {
    if (draggedItem === "soap") {
      if (tubeType === "soft" && !soapAddedToSoft) {
        setSoapAddedToSoft(true);
        addObservation("✅ Added soap solution to Soft Water test tube");
      } else if (tubeType === "hard" && !soapAddedToHard) {
        setSoapAddedToHard(true);
        addObservation("✅ Added soap solution to Hard Water test tube");
      }
      setDraggedItem(null);
      setDragOverTube(null);
    }
  };

  // Shake test tube
  const shakeTestTube = (tubeType) => {
    if (tubeType === "soft" && soapAddedToSoft && !shakingSoft) {
      addObservation("🔄 Shaking Soft Water test tube...");
      setShakingSoft(true);
      
      setTimeout(() => {
        setShowResultSoft(true);
        addObservation("✓ Observation: Thick white lather formed easily");
        addObservation("✓ Observation: No scum formation");
      }, 2000);
    } else if (tubeType === "hard" && soapAddedToHard && !shakingHard) {
      addObservation("🔄 Shaking Hard Water test tube...");
      setShakingHard(true);
      
      setTimeout(() => {
        setShowResultHard(true);
        addObservation("✓ Observation: Very little lather formed");
        addObservation("✓ Observation: White scum particles formed");
      }, 2000);
    }
  };

  // Reset experiment
  const resetLab = () => {
    setSoapAddedToSoft(false);
    setSoapAddedToHard(false);
    setShakingSoft(false);
    setShakingHard(false);
    setShowResultSoft(false);
    setShowResultHard(false);
    setSelectedTube(null);
    setDraggedItem(null);
    setObservations([]);
    addObservation("🔄 Lab reset. Ready for new experiment!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🧼 Cleansing Action of Soap Virtual Lab
          </h1>
          <p className="text-slate-600 text-lg">
            Class 10 Chemistry - Observe how soap behaves in soft and hard water
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("experiment")}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === "experiment"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-600"
            }`}
          >
            🧪 Perform Experiment
          </button>
          <button
            onClick={() => setActiveTab("theory")}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === "theory"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-600"
            }`}
          >
            📚 Learn More
          </button>
        </div>

        {/* Experiment Tab */}
        {activeTab === "experiment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lab Workspace */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-12 min-h-96">
                {/* Lab Table Background */}
                <div className="mb-8 text-center">
                  <p className="text-slate-600 font-semibold mb-4">📋 Laboratory Table</p>
                </div>

                {/* Test Tubes */}
                <div className="flex justify-around items-end mb-12 min-h-80">
                  {/* Soft Water Tube */}
                  <div className="text-center">
                    <div
                      onClick={() => setSelectedTube("soft")}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverTube("soft");
                      }}
                      onDragLeave={() => setDragOverTube(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleSoapDrop("soft");
                      }}
                      className={`w-24 h-64 border-4 border-gray-400 rounded-b-3xl rounded-t-sm bg-gradient-to-b from-blue-100 to-blue-50 relative shadow-xl cursor-pointer transition transform ${
                        selectedTube === "soft" ? "scale-110 shadow-2xl" : ""
                      } ${dragOverTube === "soft" ? "border-green-500 shadow-green-300" : ""}`}
                      style={{
                        background: soapAddedToSoft
                          ? "linear-gradient(to bottom, rgba(200,220,255,0.6), rgba(100,150,200,0.4))"
                          : "linear-gradient(to bottom, #e8f4ff, #e0f0ff)"
                      }}
                    >
                      {/* Soft Water Label */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <p className="font-bold text-slate-800 text-sm">Soft Water</p>
                        <p className="text-xs text-slate-600">(Distilled)</p>
                      </div>

                      {/* Lather in Soft Water */}
                      {shakingSoft && (
                        <div className="absolute inset-0 animate-pulse">
                          <div className="absolute top-12 left-2 right-2 space-y-1">
                            <div className="h-6 bg-white rounded-full opacity-80 w-3/4 mx-auto"></div>
                            <div className="h-5 bg-white rounded-full opacity-70 w-4/5 mx-auto"></div>
                            <div className="h-4 bg-white rounded-full opacity-60 w-3/5 mx-auto"></div>
                          </div>
                          {showResultSoft && (
                            <div className="absolute top-8 left-0 right-0 text-center">
                              <div className="inline-block bg-white/80 rounded-lg px-3 py-1 text-xs font-bold text-blue-600 animate-bounce">
                                LATHER ✓
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Water level indicator */}
                      {soapAddedToSoft && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-2">
                      {!soapAddedToSoft && (
                        <p className="text-xs text-slate-600 font-semibold">Drag soap here ↓</p>
                      )}
                      {soapAddedToSoft && !showResultSoft && (
                        <button
                          onClick={() => shakeTestTube("soft")}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                        >
                          🔄 Shake Tube
                        </button>
                      )}
                      {showResultSoft && (
                        <div className="text-green-600 font-bold text-sm">✅ Done</div>
                      )}
                    </div>
                  </div>

                  {/* Hard Water Tube */}
                  <div className="text-center">
                    <div
                      onClick={() => setSelectedTube("hard")}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverTube("hard");
                      }}
                      onDragLeave={() => setDragOverTube(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleSoapDrop("hard");
                      }}
                      className={`w-24 h-64 border-4 border-gray-400 rounded-b-3xl rounded-t-sm bg-gradient-to-b from-amber-100 to-amber-50 relative shadow-xl cursor-pointer transition transform ${
                        selectedTube === "hard" ? "scale-110 shadow-2xl" : ""
                      } ${dragOverTube === "hard" ? "border-green-500 shadow-green-300" : ""}`}
                      style={{
                        background: soapAddedToHard
                          ? "linear-gradient(to bottom, rgba(220,190,150,0.6), rgba(180,150,100,0.4))"
                          : "linear-gradient(to bottom, #fef3e2, #fce8d0)"
                      }}
                    >
                      {/* Hard Water Label */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <p className="font-bold text-slate-800 text-sm">Hard Water</p>
                        <p className="text-xs text-slate-600">(Ca²⁺, Mg²⁺ salts)</p>
                      </div>

                      {/* Scum in Hard Water */}
                      {shakingHard && (
                        <div className="absolute inset-0 animate-pulse">
                          <div className="absolute top-20 left-1 right-1">
                            <div className="h-3 bg-gray-300 rounded-full opacity-70 w-4/5 mx-auto mb-2"></div>
                            <div className="h-2 bg-gray-300 rounded-full opacity-60 w-3/4 mx-auto"></div>
                          </div>
                          {showResultHard && (
                            <div className="absolute top-12 left-0 right-0 text-center">
                              <div className="inline-block bg-gray-400/80 rounded-lg px-3 py-1 text-xs font-bold text-gray-700 animate-bounce">
                                SCUM ✓
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Minimal lather */}
                      {shakingHard && (
                        <div className="absolute top-8 left-2 right-2">
                          <div className="h-2 bg-white/40 rounded-full opacity-40 w-2/5 mx-auto"></div>
                        </div>
                      )}

                      {/* Water level indicator */}
                      {soapAddedToHard && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"></div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-2">
                      {!soapAddedToHard && (
                        <p className="text-xs text-slate-600 font-semibold">Drag soap here ↓</p>
                      )}
                      {soapAddedToHard && !showResultHard && (
                        <button
                          onClick={() => shakeTestTube("hard")}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 shadow-lg"
                        >
                          🔄 Shake Tube
                        </button>
                      )}
                      {showResultHard && (
                        <div className="text-green-600 font-bold text-sm">✅ Done</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Soap Bottle */}
                <div className="flex justify-center mt-8">
                  <div
                    draggable="true"
                    onDragStart={() => setDraggedItem("soap")}
                    onDragEnd={() => setDraggedItem(null)}
                    className={`cursor-move select-none transition transform ${draggedItem === "soap" ? "opacity-50 scale-95" : "hover:scale-110"}`}
                  >
                    <div className="w-16 h-24 bg-gradient-to-b from-blue-500 to-blue-700 rounded-t-2xl rounded-b-lg shadow-lg relative">
                      {/* Bottle label */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-white rounded text-center text-xs font-bold text-blue-700 border-2 border-blue-700">
                        SOAP
                      </div>
                      {/* Liquid inside */}
                      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-b-lg opacity-80"></div>
                    </div>
                    <p className="text-center mt-2 font-bold text-slate-700 text-sm">🧼 Soap Solution</p>
                    <p className="text-center text-xs text-slate-600">Drag to test tube</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Observations Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-blue-600" />
                  Observations & Results
                </h2>

                {/* Results Cards */}
                <div className="space-y-4 mb-6">
                  {/* Soft Water Result */}
                  {showResultSoft && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-4">
                      <p className="font-bold text-blue-700 mb-2">Soft Water:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>Thick white lather formed easily</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>No scum formation</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Hard Water Result */}
                  {showResultHard && (
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-500 rounded-lg p-4">
                      <p className="font-bold text-amber-700 mb-2">Hard Water:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>Very little lather formed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✗</span>
                          <span>White scum particles formed</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Conclusion */}
                {showResultSoft && showResultHard && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-lg p-4">
                    <p className="font-bold text-green-700 mb-2">📌 Conclusion:</p>
                    <p className="text-sm text-green-800">
                      Soap shows better cleansing action in soft water than in hard water because it doesn't react with minerals.
                    </p>
                  </div>
                )}

                {/* Observations Log */}
                <div className="mt-6 bg-slate-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="font-bold text-slate-700 mb-3 text-sm">📝 Lab Log:</p>
                  {observations.length === 0 ? (
                    <p className="text-xs text-slate-500">Start experiment...</p>
                  ) : (
                    <div className="space-y-2">
                      {observations.map(obs => (
                        <p key={obs.id} className="text-xs text-slate-700 border-l-2 border-blue-500 pl-2">
                          {obs.text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetLab}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset Lab
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === "theory" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">💧 Why Different Results?</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-blue-700 mb-2">Soft Water</h3>
                  <p className="text-slate-700 text-sm">Contains no minerals (Ca²⁺, Mg²⁺ ions)</p>
                  <p className="text-sm text-slate-600 mt-2">Soap reacts only with water and forms good lather.</p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-amber-700 mb-2">Hard Water</h3>
                  <p className="text-slate-700 text-sm">Contains Ca²⁺ and Mg²⁺ salts</p>
                  <p className="text-sm text-slate-600 mt-2">Soap reacts with these minerals, forming insoluble scum instead of lather.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">🔬 Chemical Reaction</h2>
              
              <div className="bg-slate-100 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
                <p className="text-blue-700 font-bold mb-2">In Hard Water:</p>
                <p className="text-slate-800">Soap²⁻ + Ca²⁺ → Scum (insoluble)</p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <p>
                  <strong>What is Scum?</strong><br/>
                  An insoluble soap compound that doesn't clean clothes
                </p>
                <p>
                  <strong>Why Soft Water is Better?</strong><br/>
                  No minerals = more lather = better cleaning action
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}