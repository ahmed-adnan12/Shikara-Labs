// import { useState } from "react";

// export default function PHVirtualLab() { const solutions = { Lemon: { pH: 2, color: "#ff4d4d", nature: "Acidic" }, Vinegar: { pH: 3, color: "#ff6666", nature: "Acidic" }, Milk: { pH: 6, color: "#b3ffb3", nature: "Slightly Acidic" }, Water: { pH: 7, color: "#66ff66", nature: "Neutral" }, BakingSoda: { pH: 9, color: "#66b3ff", nature: "Basic" }, Soap: { pH: 10, color: "#3399ff", nature: "Basic" }, WashingSoda: { pH: 11, color: "#1a75ff", nature: "Strongly Basic" } };

// const [selectedSolution, setSelectedSolution] = useState(null); const [paperColor, setPaperColor] = useState("#f5f5f5"); const [result, setResult] = useState(null); const [observations, setObservations] = useState([]);

// const dipPaper = () => { if (!selectedSolution) return; const sol = solutions[selectedSolution]; setPaperColor(sol.color); setResult(sol);

// setObservations([
//   ...observations,
//   {
//     name: selectedSolution,
//     pH: sol.pH,
//     nature: sol.nature
//   }
// ]);

// };

// const resetExperiment = () => { setSelectedSolution(null); setPaperColor("#f5f5f5"); setResult(null); };

// return ( <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center"> <h1 className="text-3xl font-bold mb-4">Determination of pH using pH Paper (Virtual Lab)</h1>



//   {/* Simulation Section */}
//   <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl mb-6">
//     <h2 className="text-xl font-bold mb-4">Simulation</h2>

//     {/* Solution Selector */}
//     <div className="mb-4">
//       <label className="font-semibold">Select Solution:</label>
//       <select
//         className="ml-3 p-2 border rounded"
//         onChange={(e) => setSelectedSolution(e.target.value)}
//         defaultValue=""
//       >
//         <option value="" disabled>
//           -- Choose --
//         </option>
//         {Object.keys(solutions).map((sol) => (
//           <option key={sol} value={sol}>
//             {sol}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* pH Paper */}
//     <div className="flex items-center gap-6">
//       <div
//         className="w-32 h-12 border-2 border-gray-400 rounded"
//         style={{ backgroundColor: paperColor }}
//       ></div>
//       <p className="text-gray-700">pH Paper Strip</p>
//     </div>

//     {/* Buttons */}
//     <div className="mt-4 flex gap-4">
//       <button
//         onClick={dipPaper}
//         className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-80"
//       >
//         Dip pH Paper
//       </button>
//       <button
//         onClick={resetExperiment}
//         className="bg-gray-300 px-4 py-2 rounded-xl"
//       >
//         Reset
//       </button>
//     </div>

//     {/* Result */}
//     {result && (
//       <div className="mt-6 p-4 bg-green-50 border rounded-xl">
//         <p><strong>pH Value:</strong> {result.pH}</p>
//         <p><strong>Nature of Solution:</strong> {result.nature}</p>
//         <p>
//           <strong>Conclusion:</strong> The given solution is {result.nature.toLowerCase()} in nature.
//         </p>
//       </div>
//     )}
//   </div>

//   {/* Observation Table */}
//   <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl">
//     <h2 className="text-xl font-bold mb-4">Observation Table</h2>
//     <table className="w-full border">
//       <thead className="bg-gray-200">
//         <tr>
//           <th className="border p-2">S.No</th>
//           <th className="border p-2">Solution</th>
//           <th className="border p-2">pH</th>
//           <th className="border p-2">Nature</th>
//         </tr>
//       </thead>
//       <tbody>
//         {observations.map((obs, index) => (
//           <tr key={index} className="text-center">
//             <td className="border p-2">{index + 1}</td>
//             <td className="border p-2">{obs.name}</td>
//             <td className="border p-2">{obs.pH}</td>
//             <td className="border p-2">{obs.nature}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

// ); }
import { useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";

export default function PHVirtualLab() {
  const solutions = {
    Lemon: { pH: 2, color: "#ff4d4d", nature: "Acidic", emoji: "🍋" },
    Vinegar: { pH: 3, color: "#ff6666", nature: "Acidic", emoji: "🍶" },
    Milk: { pH: 6, color: "#b3ffb3", nature: "Slightly Acidic", emoji: "🥛" },
    Water: { pH: 7, color: "#66ff66", nature: "Neutral", emoji: "💧" },
    BakingSoda: {
      pH: 9,
      color: "#66b3ff",
      nature: "Basic",
      emoji: "🧂"
    },
    Soap: { pH: 10, color: "#3399ff", nature: "Basic", emoji: "🧼" },
    WashingSoda: { pH: 11, color: "#1a75ff", nature: "Strongly Basic", emoji: "🧽" }
  };

  const paperTypes = [
    { name: "Red Paper", baseColor: "#ffcccc" },
    { name: "Yellow Paper", baseColor: "#ffffcc" },
    { name: "Blue Paper", baseColor: "#ccccff" }
  ];

  const [selectedSolution, setSelectedSolution] = useState(null);
  const [paperColor, setPaperColor] = useState("#ffcccc");
  const [selectedPaperType, setSelectedPaperType] = useState("Red Paper");
  const [result, setResult] = useState(null);
  const [observations, setObservations] = useState([]);
  const [draggedSolution, setDraggedSolution] = useState(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);

  const handleDragStart = (solutionName) => {
    setDraggedSolution(solutionName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setIsDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropZoneActive(false);

    if (draggedSolution) {
      setSelectedSolution(draggedSolution);
      dipPaper(draggedSolution);
    }
  };

  const dipPaper = (solutionName) => {
    const sol = solutions[solutionName];
    const paperBase = paperTypes.find(
      (p) => p.name === selectedPaperType
    ).baseColor;

    // Blend the solution color with the paper color
    const blendedColor = blendColors(paperBase, sol.color);

    setPaperColor(blendedColor);
    setResult({ ...sol, solution: solutionName });

    setObservations([
      ...observations,
      {
        name: solutionName,
        pH: sol.pH,
        nature: sol.nature,
        paperType: selectedPaperType
      }
    ]);

    setDraggedSolution(null);
  };

  const blendColors = (color1, color2) => {
    const hex = (x) => {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    };

    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round((r1 + r2) / 2);
    const g = Math.round((g1 + g2) / 2);
    const b = Math.round((b1 + b2) / 2);

    return "#" + hex(r) + hex(g) + hex(b);
  };

  const resetExperiment = () => {
    setSelectedSolution(null);
    setPaperColor(paperTypes.find((p) => p.name === selectedPaperType).baseColor);
    setResult(null);
    setDraggedSolution(null);
  };

  const clearAllObservations = () => {
    setObservations([]);
    resetExperiment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          🧪 pH Paper Virtual Lab
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Drag solutions onto pH paper to determine their acidity or basicity
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Solutions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">
                Available Solutions
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Drag any solution to the pH paper below
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(solutions).map(([name, data]) => (
                  <div
                    key={name}
                    draggable
                    onDragStart={() => handleDragStart(name)}
                    className="bg-gradient-to-br from-slate-100 to-slate-200 hover:shadow-lg hover:scale-105 transition-all cursor-grab active:cursor-grabbing p-4 rounded-xl text-center border-2 border-slate-300 hover:border-blue-400"
                  >
                    <div className="text-3xl mb-2">{data.emoji}</div>
                    <div className="font-semibold text-sm text-gray-700">
                      {name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">pH: {data.pH}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Panel - pH Paper */}
          <div className="lg:col-span-2">
            {/* Paper Type Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">
                Choose pH Paper Type
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {paperTypes.map((paper) => (
                  <button
                    key={paper.name}
                    onClick={() => {
                      setSelectedPaperType(paper.name);
                      resetExperiment();
                    }}
                    className={`p-4 rounded-xl border-3 transition-all ${
                      selectedPaperType === paper.name
                        ? "border-blue-500 shadow-lg shadow-blue-400/50 scale-105"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: paper.baseColor }}
                  >
                    <div className="font-semibold text-gray-800">
                      {paper.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all ${
                isDropZoneActive
                  ? "border-4 border-blue-400 shadow-lg shadow-blue-400/50 scale-105"
                  : "border-4 border-dashed border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="mb-6">
                  <p className="text-center text-gray-600 mb-4 font-semibold">
                    pH Paper Strip
                  </p>
                  <div
                    className="w-32 h-16 border-4 border-gray-400 rounded-lg shadow-lg transition-colors duration-300"
                    style={{ backgroundColor: paperColor }}
                  ></div>
                </div>

                {result ? (
                  <div className="text-center mt-6 w-full">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Solution Tested:</strong>
                      </p>
                      <p className="text-3xl mb-3">{result.emoji}</p>
                      <p className="text-2xl font-bold text-blue-600 mb-3">
                        {result.solution}
                      </p>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600">pH Value</p>
                          <p className="text-xl font-bold text-blue-600">
                            {result.pH}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600">Nature</p>
                          <p className="text-sm font-bold text-purple-600">
                            {result.nature}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600">Paper Used</p>
                          <p className="text-sm font-bold text-gray-700">
                            {selectedPaperType}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500 text-left">
                        <p className="text-xs text-gray-600 mb-1">
                          <strong>Conclusion:</strong>
                        </p>
                        <p className="text-sm text-gray-700">
                          The {result.solution} is <strong>{result.nature.toLowerCase()}</strong> in
                          nature with a pH of <strong>{result.pH}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-5xl mb-4">📄</p>
                    <p className="text-lg font-semibold text-gray-700">
                      Drag a solution here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      to test its pH value
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={resetExperiment}
                className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-lg hover:shadow-orange-400/50 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} /> Reset Paper
              </button>
              <button
                onClick={clearAllObservations}
                className="flex-1 bg-gradient-to-r from-red-400 to-red-500 hover:shadow-lg hover:shadow-red-400/50 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={20} /> Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Observation Table */}
        {observations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              📊 Observation Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <tr>
                    <th className="border p-3 text-left font-bold text-gray-800">
                      S.No
                    </th>
                    <th className="border p-3 text-left font-bold text-gray-800">
                      Solution
                    </th>
                    <th className="border p-3 text-left font-bold text-gray-800">
                      pH Value
                    </th>
                    <th className="border p-3 text-left font-bold text-gray-800">
                      Nature
                    </th>
                    <th className="border p-3 text-left font-bold text-gray-800">
                      Paper Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((obs, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="border p-3 font-semibold text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border p-3 text-gray-700">
                        {obs.name} {solutions[obs.name].emoji}
                      </td>
                      <td className="border p-3 font-bold text-blue-600">
                        {obs.pH}
                      </td>
                      <td className="border p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold text-xs ${
                            obs.pH < 7
                              ? "bg-red-500"
                              : obs.pH === 7
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {obs.nature}
                        </span>
                      </td>
                      <td className="border p-3 text-gray-700">
                        {obs.paperType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* pH Scale Reference */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">pH Scale Reference</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((ph) => (
              <div
                key={ph}
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white border-2 border-gray-300"
                style={{
                  backgroundColor: `hsl(${(14 - ph) * 12}, 100%, 50%)`
                }}
              >
                {ph}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <p className="font-bold text-red-600">Acidic (pH 0-7)</p>
              <p className="text-xs text-gray-600">Paper turns red</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="font-bold text-green-600">Neutral (pH 7)</p>
              <p className="text-xs text-gray-600">Paper stays original</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="font-bold text-blue-600">Basic (pH 7-14)</p>
              <p className="text-xs text-gray-600">Paper turns blue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}