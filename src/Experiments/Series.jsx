import { useState } from "react";

export default function Series() {
  const [r1, setR1] = useState(2);
  const [r2, setR2] = useState(3);
  const [voltage, setVoltage] = useState(5);
  const [type, setType] = useState("series");
  const [prediction, setPrediction] = useState("");
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState("hypothesis"); // hypothesis, running, results
  const [feedback, setFeedback] = useState(null);

  const calculateExpected = () => {
    let equivalentResistance;
    if (type === "series") {
      equivalentResistance = r1 + r2;
    } else {
      equivalentResistance = (r1 * r2) / (r1 + r2);
    }
    return equivalentResistance.toFixed(2);
  };

  const runExperiment = () => {
    if (!prediction.trim()) {
      setFeedback({ type: "error", message: "⚠️ Make a prediction first!" });
      return;
    }

    setStage("running");
    setIsRunning(true);
    setFeedback(null);

    let equivalentResistance;
    if (type === "series") {
      equivalentResistance = r1 + r2;
    } else {
      equivalentResistance = (r1 * r2) / (r1 + r2);
    }

    const current = voltage / equivalentResistance;

    setTimeout(() => {
      const predictedValue = parseFloat(prediction);
      const actual = parseFloat(equivalentResistance.toFixed(2));
      const percentError = Math.abs(predictedValue - actual) / actual * 100;

      let feedbackMsg = "";
      let feedbackType = "";

      if (percentError < 5) {
        feedbackMsg = "🎯 Excellent prediction! You understand the formula.";
        feedbackType = "success";
      } else if (percentError < 15) {
        feedbackMsg = "✓ Close! Small calculation or rounding error.";
        feedbackType = "close";
      } else if (percentError < 30) {
        feedbackMsg = "⚠️ Off by a fair bit. Review your formula.";
        feedbackType = "warning";
      } else {
        feedbackMsg = "❌ Let's revisit the circuit rules for this configuration.";
        feedbackType = "error";
      }

      setResult({
        prediction: predictedValue,
        equivalentResistance: actual,
        current: current.toFixed(3),
        percentError: percentError.toFixed(1),
      });
      setFeedback({ type: feedbackType, message: feedbackMsg });
      setStage("results");
      setIsRunning(false);
    }, 1500);
  };

  const reset = () => {
    setPrediction("");
    setResult(null);
    setFeedback(null);
    setStage("hypothesis");
  };

  const getHint = () => {
    if (type === "series") {
      setFeedback({
        type: "hint",
        message: "💡 Hint: In series, resistances add together. R_total = R₁ + R₂",
      });
    } else {
      setFeedback({
        type: "hint",
        message: "💡 Hint: In parallel, use 1/R_total = 1/R₁ + 1/R₂, then flip it.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-2xl"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl w-full max-w-6xl rounded-2xl shadow-2xl border border-gray-200/50 p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            🧪 Virtual Physics Lab
          </h1>
          <p className="text-gray-600 font-medium">Equivalent Resistance Experiment</p>
          <p className="text-sm text-gray-500 mt-2">Think like a scientist: Predict → Test → Compare</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Controls & Prediction */}
          <div className="space-y-6">
            {/* Connection Type Selector */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-dashed border-blue-200">
              <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                🔌 Circuit Connection
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                    type === "series"
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-200"
                      : "bg-white border-2 border-gray-200 hover:border-red-300 hover:bg-red-50"
                  }`}
                  onClick={() => { setType("series"); reset(); }}
                >
                  📏 Series
                </button>
                <button
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                    type === "parallel"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200"
                      : "bg-white border-2 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                  onClick={() => { setType("parallel"); reset(); }}
                >
                  ↕️ Parallel
                </button>
              </div>
            </div>

            {/* Input Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                <label className="block font-semibold text-sm text-gray-700 mb-2">
                  ⚡ R₁ Resistance (Ω)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={r1}
                  onChange={(e) => { setR1(Number(e.target.value)); reset(); }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-mono text-lg"
                />
              </div>
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                <label className="block font-semibold text-sm text-gray-700 mb-2">
                  🧲 R₂ Resistance (Ω)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={r2}
                  onChange={(e) => { setR2(Number(e.target.value)); reset(); }}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-mono text-lg"
                />
              </div>
              <div className="md:col-span-2 bg-gradient-to-b from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-200">
                <label className="block font-semibold text-sm text-gray-700 mb-2">
                  🔋 Battery Voltage (V)
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  step="0.1"
                  value={voltage}
                  onChange={(e) => { setVoltage(Number(e.target.value)); reset(); }}
                  className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-mono text-lg bg-gradient-to-r from-yellow-50 to-orange-50"
                />
              </div>
            </div>

            {/* Prediction Stage */}
            {stage === "hypothesis" && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                  🎯 Your Prediction
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Before testing, predict the equivalent resistance using the {type === "series" ? "series formula (R₁ + R₂)" : "parallel formula (1/R_eq = 1/R₁ + 1/R₂)"}
                </p>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter your predicted Req (Ω)"
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  className="w-full p-4 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 font-mono text-lg mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={getHint}
                    className="flex-1 px-4 py-2 bg-white border-2 border-purple-300 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition"
                  >
                    Need a Hint?
                  </button>
                  <button
                    onClick={runExperiment}
                    disabled={isRunning}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {isRunning ? "Testing..." : "🔬 Test Prediction"}
                  </button>
                </div>
              </div>
            )}

            {/* Results & Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg border-2 ${
                feedback.type === "success" ? "bg-green-50 border-green-300 text-green-800" :
                feedback.type === "close" ? "bg-blue-50 border-blue-300 text-blue-800" :
                feedback.type === "hint" ? "bg-purple-50 border-purple-300 text-purple-800" :
                "bg-red-50 border-red-300 text-red-800"
              }`}>
                <p className="font-semibold">{feedback.message}</p>
              </div>
            )}

            {/* Results Summary */}
            {result && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border-2 border-emerald-300">
                <h3 className="font-bold text-lg text-emerald-800 mb-4">📊 Results Analysis</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600 text-xs uppercase">Your Prediction</div>
                    <div className="text-2xl font-mono font-bold text-purple-600">{result.prediction} Ω</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600 text-xs uppercase">Actual Result</div>
                    <div className="text-2xl font-mono font-bold text-blue-600">{result.equivalentResistance} Ω</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600 text-xs uppercase">Error</div>
                    <div className="text-2xl font-mono font-bold text-red-600">{result.percentError}%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-gray-600 text-xs uppercase">Current Flow</div>
                    <div className="text-2xl font-mono font-bold text-orange-600">{result.current} A</div>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Right: Circuit Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border-4 border-gray-700 shadow-2xl relative overflow-hidden">
              {/* Battery */}
              <div className="flex items-end justify-center mb-6">
                <div className="bg-gradient-to-r from-red-400 to-orange-500 p-3 rounded-lg shadow-lg border-4 border-yellow-300 w-20 h-16 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-black"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-black"></div>
                  <div className="text-xs font-bold text-white text-center mt-1">+{voltage}V</div>
                </div>
              </div>

              {/* Wires and Resistors */}
              <div className="space-y-4">
                <div className="flex justify-center h-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>

                <div className="flex justify-center gap-6">
                  <div className="w-20 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg border-2 border-black">
                    <div className="text-xs font-mono text-white text-center pt-2">R₁={r1}Ω</div>
                  </div>
                  {type === "series" ? (
                    <div className="w-12 h-1 bg-gray-600 my-4"></div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="w-1 h-12 bg-gray-600"></div>
                      <div className="w-1 h-12 bg-gray-600"></div>
                    </div>
                  )}
                  <div className="w-20 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg border-2 border-black">
                    <div className="text-xs font-mono text-white text-center pt-2">R₂={r2}Ω</div>
                  </div>
                </div>

                <div className="flex justify-center h-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"></div>
              </div>

              <div className="absolute top-2 right-4 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
                {type.toUpperCase()}
              </div>
            </div>

            {/* Circuit Explanation */}
            <div className="mt-6 bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">📖 How It Works</h3>
              {type === "series" ? (
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Formula:</strong> R_eq = R₁ + R₂</p>
                  <p><strong>Why?</strong> Current flows through both resistors one after another.</p>
                  <p><strong>Pattern:</strong> Adding resistances increases total resistance.</p>
                  <p className="text-xs text-blue-600 mt-3">ℹ️ Try R₁=2, R₂=3: Prediction should be 5 Ω</p>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Formula:</strong> 1/R_eq = 1/R₁ + 1/R₂</p>
                  <p><strong>Why?</strong> Current splits between two parallel paths.</p>
                  <p><strong>Pattern:</strong> Parallel resistances are ALWAYS less than the smallest resistor.</p>
                  <p className="text-xs text-blue-600 mt-3">ℹ️ Try R₁=2, R₂=3: Prediction should be ~1.2 Ω</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-200/50">
          <h3 className="font-bold text-lg mb-4 text-gray-800">📋 The Scientific Method</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="font-bold text-blue-700 mb-1">1. Observe</div>
              <div className="text-gray-700">Pick your circuit type & values</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <div className="font-bold text-purple-700 mb-1">2. Hypothesize</div>
              <div className="text-gray-700">Calculate & predict the result</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
              <div className="font-bold text-pink-700 mb-1">3. Test</div>
              <div className="text-gray-700">Run the experiment</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
              <div className="font-bold text-emerald-700 mb-1">4. Compare</div>
              <div className="text-gray-700">Did your prediction match?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}