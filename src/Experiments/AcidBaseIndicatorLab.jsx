import { useState } from "react";
import { Droplet, FlaskConical, Beaker, RotateCcw, Info } from "lucide-react";

export default function AcidBaseLabPro() {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [testTubes, setTestTubes] = useState([]);
  const [activeTab, setActiveTab] = useState("lab");
  const [showInfo, setShowInfo] = useState(false);
  const [history, setHistory] = useState([]);

  const solutions = [
    { id: "hcl", name: "Hydrochloric Acid", type: "acid", ph: 1, color: "#FFFACD" },
    { id: "acetic", name: "Acetic Acid", type: "acid", ph: 3, color: "#FFFACD" },
    { id: "naoh", name: "Sodium Hydroxide", type: "base", ph: 13, color: "#E0F0FF" },
    { id: "nh3", name: "Ammonia Solution", type: "base", ph: 11, color: "#E0F0FF" },
    { id: "nacl", name: "Sodium Chloride", type: "salt", ph: 7, color: "#F5F5F5" },
    { id: "na2co3", name: "Sodium Carbonate", type: "salt", ph: 11.2, color: "#F5F5F5" },
    { id: "water", name: "Distilled Water", type: "neutral", ph: 7, color: "#FFFFFF" },
  ];

  const indicators = [
    {
      id: "litmus",
      name: "Litmus Paper",
      description: "Range: pH 4.5-8.3 | Red in acid, Blue in base",
      reactions: {
        acid: { color: "#DC2626", text: "Red" },
        base: { color: "#2563EB", text: "Blue" },
        neutral: { color: "#9CA3AF", text: "Purple" },
        salt: { color: "#9CA3AF", text: "Purple" },
      },
    },
    {
      id: "phenol",
      name: "Phenolphthalein",
      description: "Range: pH 8.2-10 | Colorless in acid, Pink in base",
      reactions: {
        acid: { color: "#F5F5F5", text: "Colorless" },
        base: { color: "#EC4899", text: "Pink" },
        neutral: { color: "#F5F5F5", text: "Colorless" },
        salt: { color: "#F5F5F5", text: "Colorless" },
      },
    },
    {
      id: "methyl",
      name: "Methyl Orange",
      description: "Range: pH 3.1-4.4 | Red in acid, Yellow in base",
      reactions: {
        acid: { color: "#EF4444", text: "Red" },
        base: { color: "#FBBF24", text: "Yellow" },
        neutral: { color: "#FCA5A5", text: "Orange" },
        salt: { color: "#FCA5A5", text: "Orange" },
      },
    },
    {
      id: "congo",
      name: "Congo Red",
      description: "Range: pH 3.0-5.0 | Blue in acid, Red in base",
      reactions: {
        acid: { color: "#1E40AF", text: "Blue" },
        base: { color: "#DC2626", text: "Red" },
        neutral: { color: "#7C2D12", text: "Brown" },
        salt: { color: "#7C2D12", text: "Brown" },
      },
    },
    {
      id: "universal",
      name: "Universal Indicator",
      description: "Range: pH 0-14 | Full spectrum from red to violet",
      reactions: {
        acid: { color: "#EF4444", text: "Red (pH 1-4)" },
        base: { color: "#8B5CF6", text: "Violet (pH 11-14)" },
        neutral: { color: "#10B981", text: "Green (pH 7)" },
        salt: { color: "#F59E0B", text: "Yellow-Orange" },
      },
    },
  ];

  const performTest = () => {
    if (!selectedSolution || !selectedIndicator) {
      alert("Please select both a solution and an indicator");
      return;
    }

    const solution = solutions.find((s) => s.id === selectedSolution);
    const indicator = indicators.find((i) => i.id === selectedIndicator);
    const reaction = indicator.reactions[solution.type];

    const testResult = {
      id: Date.now(),
      solution: solution.name,
      indicator: indicator.name,
      reaction: reaction,
      phValue: solution.ph,
      type: solution.type,
      timestamp: new Date().toLocaleTimeString(),
    };

    setTestTubes([...testTubes, testResult]);
    setHistory([testResult, ...history]);
  };

  const clearLab = () => {
    setTestTubes([]);
    setSelectedSolution(null);
    setSelectedIndicator(null);
  };

  const getPhScale = (ph) => {
    if (ph < 7) return "ACIDIC";
    if (ph > 7) return "BASIC";
    return "NEUTRAL";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                <FlaskConical className="w-10 h-10 text-indigo-600" />
                Virtual Acid-Base Lab
              </h1>
              <p className="text-gray-600 mt-1">
                Professional chemistry lab simulator for pH testing and indicator reactions
              </p>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
              title="Lab Information"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("lab")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "lab"
                ? "bg-white text-indigo-600 shadow-lg"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            Lab Experiment
          </button>
          <button
            onClick={() => setActiveTab("theory")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "theory"
                ? "bg-white text-indigo-600 shadow-lg"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            Theory & Concepts
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "data"
                ? "bg-white text-indigo-600 shadow-lg"
                : "bg-white/60 text-gray-600 hover:bg-white"
            }`}
          >
            Results ({history.length})
          </button>
        </div>

        {/* Lab Experiment Tab */}
        {activeTab === "lab" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Controls</h2>

                {/* Solution Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    1. Select Solution
                  </label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {solutions.map((sol) => (
                      <button
                        key={sol.id}
                        onClick={() => setSelectedSolution(sol.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          selectedSolution === sol.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded border-2 border-gray-300"
                            style={{ backgroundColor: sol.color }}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-800">{sol.name}</p>
                            <p className="text-xs text-gray-600">pH: {sol.ph}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Indicator Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    2. Select Indicator
                  </label>
                  <div className="space-y-2">
                    {indicators.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndicator(ind.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          selectedIndicator === ind.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-400"
                        }`}
                      >
                        <p className="font-medium text-gray-800">{ind.name}</p>
                        <p className="text-xs text-gray-600">{ind.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Test Button */}
                <button
                  onClick={performTest}
                  disabled={!selectedSolution || !selectedIndicator}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105"
                >
                  <Droplet className="w-5 h-5 inline mr-2" />
                  Add Drop & Test
                </button>

                <button
                  onClick={clearLab}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Clear Lab
                </button>
              </div>
            </div>

            {/* Test Tubes Display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Test Tube Results</h2>
                {testTubes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    <Beaker className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg">Select a solution and indicator, then click "Add Drop & Test"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {testTubes.map((test) => (
                      <div
                        key={test.id}
                        className="flex flex-col items-center"
                      >
                        {/* Test Tube */}
                        <div className="relative">
                          <div className="w-16 h-32 bg-white border-4 border-gray-400 rounded-b-3xl rounded-t-sm shadow-lg relative overflow-hidden">
                            <div
                              className="w-full h-2/3 transition-all duration-500"
                              style={{ backgroundColor: test.reaction.color }}
                            ></div>
                          </div>
                          {/* Liquid shine effect */}
                          <div
                            className="absolute top-4 left-2 w-2 h-6 bg-white/30 rounded-full blur-sm"
                          ></div>
                        </div>
                        <p className="mt-3 font-bold text-gray-800 text-center text-sm">
                          {test.reaction.text}
                        </p>
                        <p className="text-xs text-gray-600 text-center mt-1">
                          {test.indicator.replace(" Paper", "").replace(" Solution", "")}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 font-semibold">
                          pH: {test.phValue}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === "theory" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">pH Scale</h2>
              <div className="space-y-2 mb-6">
                <div className="h-12 bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 to-blue-600 rounded-lg"></div>
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>0 (Acidic)</span>
                  <span>7 (Neutral)</span>
                  <span>14 (Basic)</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-red-600">Acids (pH &lt; 7)</h3>
                  <p className="text-sm text-gray-700">Sour taste, turn litmus red, conduct electricity due to H⁺ ions</p>
                </div>
                <div>
                  <h3 className="font-bold text-blue-600">Bases (pH &gt; 7)</h3>
                  <p className="text-sm text-gray-700">Bitter taste, slippery feel, turn litmus blue, produce OH⁻ ions</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">Salts (pH = 7 or ≠ 7)</h3>
                  <p className="text-sm text-gray-700">Formed from acid-base neutralization. Can be acidic or basic depending on hydrolysis</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Indicator Properties</h2>
              <div className="space-y-4">
                {indicators.map((ind) => (
                  <div key={ind.id} className="border-l-4 border-indigo-600 pl-4">
                    <h3 className="font-bold text-gray-800">{ind.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{ind.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Learning Objectives:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Understand acid-base properties</li>
                  <li>• Learn indicator reactions</li>
                  <li>• Interpret color changes</li>
                  <li>• Apply pH scale concepts</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Data Tab */}
        {activeTab === "data" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiment History</h2>
            {history.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No experiments performed yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-indigo-600">
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Solution</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Indicator</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">pH</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Type</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Color</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-800">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((test) => (
                      <tr key={test.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{test.solution}</td>
                        <td className="py-3 px-4">{test.indicator}</td>
                        <td className="py-3 px-4 font-semibold">{test.phValue}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              test.type === "acid"
                                ? "bg-red-100 text-red-800"
                                : test.type === "base"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {test.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: test.reaction.color }}
                            ></div>
                            {test.reaction.text}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{test.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Lab</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                This virtual lab simulates real acid-base chemistry experiments using indicators that change color based on pH levels.
              </p>
              <p>
                <strong>Real-world Applications:</strong> Testing soil pH, water quality, pool maintenance, medical diagnostics
              </p>
              <p>
                <strong>Safety Note:</strong> In a real lab, always wear proper PPE and follow safety protocols when handling acids and bases.
              </p>
              <p className="text-xs text-gray-600 mt-4">
                Based on standard chemistry lab procedures and indicator ranges
              </p>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}