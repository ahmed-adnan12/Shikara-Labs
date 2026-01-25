// import { useState } from "react"; import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// export default function OhmsLawVirtualLab() { const [voltage, setVoltage] = useState(5); const [resistance, setResistance] = useState(5); const [data, setData] = useState([]);

// const current = (voltage / resistance).toFixed(2);

// const addReading = () => { const newData = [...data, { V: voltage, I: parseFloat(current) }]; setData(newData); };

// return ( <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center"> <h1 className="text-3xl font-bold mb-4">Ohm's Law Virtual Lab</h1>

// <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl">
//     <p className="mb-4 text-gray-700">
//       Adjust the voltage and resistance to observe the change in current and verify Ohm’s Law.
//     </p>

//     {/* Controls */}
//     <div className="space-y-4">
//       <div>
//         <label className="block font-semibold">Voltage (V): {voltage}V</label>
//         <input
//           type="range"
//           min="1"
//           max="20"
//           value={voltage}
//           onChange={(e) => setVoltage(Number(e.target.value))}
//           className="w-full"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Resistance (Ω): {resistance}Ω</label>
//         <input
//           type="range"
//           min="1"
//           max="20"
//           value={resistance}
//           onChange={(e) => setResistance(Number(e.target.value))}
//           className="w-full"
//         />
//       </div>
//     </div>

//     {/* Readings */}
//     <div className="mt-4 grid grid-cols-3 gap-4 text-center">
//       <div className="p-3 bg-blue-100 rounded-xl">
//         <p className="font-semibold">Voltage (V)</p>
//         <p>{voltage}</p>
//       </div>
//       <div className="p-3 bg-green-100 rounded-xl">
//         <p className="font-semibold">Current (I)</p>
//         <p>{current} A</p>
//       </div>
//       <div className="p-3 bg-purple-100 rounded-xl">
//         <p className="font-semibold">Resistance (R)</p>
//         <p>{resistance} Ω</p>
//       </div>
//     </div>

//     <button
//       onClick={addReading}
//       className="mt-6 w-full bg-black text-white py-2 rounded-xl hover:opacity-80"
//     >
//       Add Reading
//     </button>
//   </div>

//   {/* Table */}
//   <div className="bg-white rounded-2xl shadow-md p-6 mt-6 w-full max-w-xl">
//     <h2 className="text-xl font-bold mb-4">Observation Table</h2>
//     <table className="w-full border">
//       <thead className="bg-gray-200">
//         <tr>
//           <th className="border p-2">S.No</th>
//           <th className="border p-2">Voltage (V)</th>
//           <th className="border p-2">Current (I)</th>
//           <th className="border p-2">R = V/I (Ω)</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((d, i) => (
//           <tr key={i} className="text-center">
//             <td className="border p-2">{i + 1}</td>
//             <td className="border p-2">{d.V}</td>
//             <td className="border p-2">{d.I}</td>
//             <td className="border p-2">{(d.V / d.I).toFixed(2)}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   {/* Graph */}
//   <div className="bg-white rounded-2xl shadow-md p-6 mt-6 w-full max-w-xl">
//     <h2 className="text-xl font-bold mb-4">V-I Graph</h2>
//     <LineChart width={400} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="I" label={{ value: 'Current (I)', position: 'insideBottom', offset: -5 }} />
//       <YAxis label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }} />
//       <Tooltip />
//       <Line type="monotone" dataKey="V" strokeWidth={2} />
//     </LineChart>
//   </div>
// </div>

// ); }
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Trash2 } from "lucide-react";

export default function OhmsLawVirtualLab() {
  const [voltage, setVoltage] = useState(5);
  const [selectedResistor, setSelectedResistor] = useState(null);
  const [circuitResistor, setCircuitResistor] = useState(null);
  const [data, setData] = useState([]);
  const [draggedResistor, setDraggedResistor] = useState(null);

  const resistorOptions = [1, 2, 5, 10, 15, 20];

  const current = circuitResistor ? (voltage / circuitResistor).toFixed(2) : 0;
  const power = circuitResistor ? (voltage * current).toFixed(2) : 0;

  const handleDragStart = (resistorValue) => {
    setDraggedResistor(resistorValue);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedResistor) {
      setCircuitResistor(draggedResistor);
      setDraggedResistor(null);
    }
  };

  const addReading = () => {
    if (circuitResistor) {
      const newReading = {
        V: voltage,
        I: parseFloat(current),
        R: circuitResistor,
        P: parseFloat(power),
      };
      setData([...data, newReading]);
    }
  };

  const removeResistor = () => {
    setCircuitResistor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          ⚡ Ohm's Law Interactive Lab
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Drag resistors onto the circuit board to change resistance and observe the current
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Resistor Selection & Circuit */}
          <div className="space-y-6">
            {/* Voltage Control */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Power Supply</h2>
              <div>
                <label className="block font-semibold text-gray-700 mb-3">
                  Voltage (V): <span className="text-blue-600 text-2xl">{voltage}V</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1V</span>
                  <span>20V</span>
                </div>
              </div>
            </div>

            {/* Resistor Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Available Resistors</h2>
              <p className="text-sm text-gray-600 mb-3">Drag a resistor to the circuit below</p>
              <div className="grid grid-cols-3 gap-2">
                {resistorOptions.map((resistor) => (
                  <div
                    key={resistor}
                    draggable
                    onDragStart={() => handleDragStart(resistor)}
                    className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:shadow-lg hover:scale-105 transition-all cursor-grab active:cursor-grabbing p-4 rounded-xl text-center font-bold text-white shadow-md hover:shadow-orange-400/50"
                  >
                    <div className="text-lg">{resistor}Ω</div>
                    <div className="text-xs opacity-90">drag me</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Circuit Board */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl shadow-xl p-8 border-4 border-dashed border-cyan-400 min-h-[250px] flex flex-col items-center justify-center"
            >
              {circuitResistor ? (
                <div className="text-center">
                  <div className="text-6xl mb-3">〰️</div>
                  <div className="text-white font-bold text-2xl mb-2">
                    {circuitResistor}Ω Resistor
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Connected in circuit</p>
                  <button
                    onClick={removeResistor}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-50">📦</div>
                  <p className="text-gray-300 text-lg font-semibold">Drag a resistor here</p>
                  <p className="text-gray-400 text-sm">to add it to the circuit</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Readings */}
          <div className="space-y-6">
            {/* Live Readings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-6 text-gray-800">Live Readings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-300">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Voltage</p>
                  <p className="text-3xl font-bold text-blue-600">{voltage}V</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-300">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Current</p>
                  <p className="text-3xl font-bold text-green-600">{current}A</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-300">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Resistance</p>
                  <p className="text-3xl font-bold text-purple-600">{circuitResistor || 0}Ω</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-300">
                  <p className="text-gray-600 text-sm font-semibold mb-1">Power</p>
                  <p className="text-3xl font-bold text-red-600">{power}W</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-xl">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Ohm's Law:</span> I = V/R = {voltage}V / {circuitResistor || 0}Ω = {current}A
                </p>
              </div>
            </div>

            {/* Add Reading Button */}
            <button
              onClick={addReading}
              disabled={!circuitResistor}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                circuitResistor
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg hover:shadow-cyan-400/50 text-white cursor-pointer"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              ✓ Save Reading
            </button>
          </div>
        </div>

        {/* Table & Graph */}
        {data.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Observations Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2 text-left">No.</th>
                      <th className="border p-2 text-left">V (Volt)</th>
                      <th className="border p-2 text-left">R (Ω)</th>
                      <th className="border p-2 text-left">I (Amp)</th>
                      <th className="border p-2 text-left">P (Watt)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="border p-2">{i + 1}</td>
                        <td className="border p-2">{d.V}</td>
                        <td className="border p-2">{d.R}</td>
                        <td className="border p-2">{d.I}</td>
                        <td className="border p-2">{d.P}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Graph */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">V-I Characteristics</h2>
              <LineChart width={300} height={300} data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="I" label={{ value: "Current (A)", position: "insideBottomRight", offset: -5 }} />
                <YAxis label={{ value: "Voltage (V)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="V" stroke="#3b82f6" strokeWidth={2} name="Voltage" />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}