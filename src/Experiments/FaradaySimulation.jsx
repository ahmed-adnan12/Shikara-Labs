import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';

export default function FaradaySimulation() {
  const canvasRef = useRef(null);
  const [bulbStatus, setBulbStatus] = useState('OFF');
  const [distance, setDistance] = useState('--');
  const [current, setCurrent] = useState('0.0');
  const [fluxRate, setFluxRate] = useState('0.0');
  const [isBulbOn, setIsBulbOn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const coil = { x: 300, y: 225, radius: 80, turns: 4 };
    const bulb = { x: 650, y: 225, radius: 35, isOn: false, brightness: 0, targetBrightness: 0 };
    const magnet = { 
      x: 100, 
      y: 225, 
      width: 70, 
      height: 50, 
      isDragging: false,
      prevX: 100,
      prevY: 225,
      velocityX: 0,
      velocityY: 0
    };

    let previousFlux = 0;
    let animationFrameId = null;
    let fluxChangeSmoothed = 0;

    function calculateFlux() {
      const magnetCenterX = magnet.x + magnet.width / 2;
      const magnetCenterY = magnet.y;
      const coilCenterX = coil.x;
      const coilCenterY = coil.y;

      const distance = Math.sqrt(
        Math.pow(magnetCenterX - coilCenterX, 2) +
        Math.pow(magnetCenterY - coilCenterY, 2)
      );

      const flux = 10000 / (distance * distance + 1);
      return flux;
    }

    function drawCoil() {
      const centerX = coil.x;
      const centerY = coil.y;
      
      for (let i = 0; i < coil.turns; i++) {
        const offset = (i - coil.turns / 2) * 8;
        
        ctx.strokeStyle = '#CD7F32';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + offset, coil.radius, coil.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.strokeStyle = '#B87333';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + offset, coil.radius * 0.97, coil.radius * 0.29, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
      }

      if (bulb.isOn && bulb.brightness > 0.1) {
        drawCurrentArrows(centerX, centerY);
      }
    }

    function drawCurrentArrows(centerX, centerY) {
      const time = Date.now() / 200;
      const numArrows = 6;
      
      ctx.fillStyle = `rgba(255, 215, 0, ${bulb.brightness})`;
      
      for (let i = 0; i < numArrows; i++) {
        const angle = (i / numArrows) * Math.PI * 2 + time;
        const arrowX = centerX + Math.cos(angle) * coil.radius;
        const arrowY = centerY + Math.sin(angle) * coil.radius * 0.3;
        
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(angle + Math.PI / 2);
        
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(-5, 0);
        ctx.lineTo(5, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    function drawWires() {
      ctx.strokeStyle = '#2C3E50';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      ctx.moveTo(coil.x + coil.radius, coil.y - 15);
      ctx.lineTo(coil.x + coil.radius + 40, coil.y - 15);
      ctx.lineTo(coil.x + coil.radius + 40, bulb.y - bulb.radius - 15);
      ctx.lineTo(bulb.x, bulb.y - bulb.radius - 15);
      ctx.lineTo(bulb.x, bulb.y - bulb.radius - 5);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(bulb.x, bulb.y + bulb.radius + 15);
      ctx.lineTo(bulb.x, bulb.y + bulb.radius + 25);
      ctx.lineTo(coil.x + coil.radius + 40, bulb.y + bulb.radius + 25);
      ctx.lineTo(coil.x + coil.radius + 40, coil.y + 15);
      ctx.lineTo(coil.x + coil.radius, coil.y + 15);
      ctx.stroke();

      ctx.fillStyle = '#CD7F32';
      ctx.beginPath();
      ctx.arc(coil.x + coil.radius, coil.y - 15, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(coil.x + coil.radius, coil.y + 15, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawBulb() {
      const x = bulb.x;
      const y = bulb.y;
      const r = bulb.radius;
      
      ctx.fillStyle = '#8B8B8B';
      ctx.fillRect(x - 6, y - r - 8, 12, 8);
      ctx.fillRect(x - 6, y + r, 12, 8);
      
      const gradient = ctx.createLinearGradient(x - r * 0.5, y + r * 0.5, x + r * 0.5, y + r * 0.5);
      gradient.addColorStop(0, '#A9A9A9');
      gradient.addColorStop(0.5, '#C0C0C0');
      gradient.addColorStop(1, '#808080');
      ctx.fillStyle = gradient;
      
      ctx.fillRect(x - r * 0.45, y + r * 0.5, r * 0.9, r * 0.6);
      
      ctx.strokeStyle = '#696969';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.45, y + r * 0.55 + i * 6);
        ctx.lineTo(x + r * 0.45, y + r * 0.55 + i * 6);
        ctx.stroke();
      }
      
      ctx.fillStyle = '#505050';
      ctx.beginPath();
      ctx.arc(x, y + r * 1.15, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      
      if (bulb.isOn && bulb.brightness > 0.1) {
        ctx.shadowBlur = 40 * bulb.brightness;
        ctx.shadowColor = `rgba(255, 220, 100, ${bulb.brightness * 0.8})`;
        
        const glowGradient = ctx.createRadialGradient(x, y - 5, 0, x, y - 5, r * 1.8);
        glowGradient.addColorStop(0, `rgba(255, 255, 200, ${bulb.brightness * 0.3})`);
        glowGradient.addColorStop(0.5, `rgba(255, 220, 100, ${bulb.brightness * 0.15})`);
        glowGradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y - 5, r * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      
      if (bulb.isOn) {
        const glowGradient = ctx.createRadialGradient(x, y - 5, 0, x, y, r);
        glowGradient.addColorStop(0, `rgba(255, 255, 240, ${0.95 * bulb.brightness})`);
        glowGradient.addColorStop(0.3, `rgba(255, 245, 200, ${0.85 * bulb.brightness})`);
        glowGradient.addColorStop(0.6, `rgba(255, 220, 120, ${0.7 * bulb.brightness})`);
        glowGradient.addColorStop(1, `rgba(255, 200, 80, ${0.5 * bulb.brightness})`);
        ctx.fillStyle = glowGradient;
      } else {
        const offGradient = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        offGradient.addColorStop(0, 'rgba(240, 240, 245, 0.4)');
        offGradient.addColorStop(0.7, 'rgba(200, 200, 210, 0.3)');
        offGradient.addColorStop(1, 'rgba(180, 180, 190, 0.25)');
        ctx.fillStyle = offGradient;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = bulb.isOn ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 100, 120, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      if (!bulb.isOn) {
        const highlightGradient = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x - r * 0.4, y - r * 0.4, r * 0.6);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(x - r * 0.4, y - r * 0.4, r * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.strokeStyle = bulb.isOn ? `rgba(255, 200, 100, ${0.9 + bulb.brightness * 0.1})` : 'rgba(80, 80, 90, 0.7)';
      ctx.lineWidth = bulb.isOn ? 3 : 2;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(x - r * 0.15, y + r * 0.4);
      ctx.lineTo(x - r * 0.15, y - r * 0.5);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + r * 0.15, y + r * 0.4);
      ctx.lineTo(x + r * 0.15, y - r * 0.5);
      ctx.stroke();
      
      ctx.lineWidth = bulb.isOn ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(x - r * 0.15, y - r * 0.5);
      
      const numZigs = 6;
      for (let i = 0; i <= numZigs; i++) {
        const zigX = x - r * 0.15 + (i % 2) * r * 0.3;
        const zigY = y - r * 0.5 + (i * r * 0.15);
        ctx.lineTo(zigX, zigY);
      }
      ctx.stroke();
      
      if (bulb.isOn && bulb.brightness > 0.2) {
        ctx.shadowBlur = 15 * bulb.brightness;
        ctx.shadowColor = 'rgba(255, 230, 150, 0.9)';
        ctx.strokeStyle = `rgba(255, 240, 200, ${bulb.brightness})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x - r * 0.15, y - r * 0.5);
        for (let i = 0; i <= numZigs; i++) {
          const zigX = x - r * 0.15 + (i % 2) * r * 0.3;
          const zigY = y - r * 0.5 + (i * r * 0.15);
          ctx.lineTo(zigX, zigY);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    function drawMagnet() {
      const x = magnet.x;
      const y = magnet.y - magnet.height / 2;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x + 3, y + 3, magnet.width, magnet.height);
      
      const gradient1 = ctx.createLinearGradient(x, y, x, y + magnet.height);
      gradient1.addColorStop(0, '#ff6b6b');
      gradient1.addColorStop(1, '#c92a2a');
      ctx.fillStyle = gradient1;
      ctx.fillRect(x, y, magnet.width / 2, magnet.height);
      
      const gradient2 = ctx.createLinearGradient(x + magnet.width / 2, y, x + magnet.width / 2, y + magnet.height);
      gradient2.addColorStop(0, '#4dabf7');
      gradient2.addColorStop(1, '#1971c2');
      ctx.fillStyle = gradient2;
      ctx.fillRect(x + magnet.width / 2, y, magnet.width / 2, magnet.height);
      
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, magnet.width, magnet.height);
      ctx.beginPath();
      ctx.moveTo(x + magnet.width / 2, y);
      ctx.lineTo(x + magnet.width / 2, y + magnet.height);
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', x + magnet.width / 4, y + magnet.height / 2);
      ctx.fillText('S', x + 3 * magnet.width / 4, y + magnet.height / 2);
      
      drawFieldLines();
    }

    function drawFieldLines() {
      ctx.strokeStyle = 'rgba(100, 100, 255, 0.3)';
      ctx.lineWidth = 1;
      
      const mx = magnet.x + magnet.width / 2;
      const my = magnet.y;
      
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 15;
        
        ctx.beginPath();
        ctx.moveTo(magnet.x + magnet.width, my + offset);
        ctx.quadraticCurveTo(
          mx + magnet.width * 1.5, my + offset + 30,
          magnet.x, my + offset
        );
        ctx.stroke();
      }
    }

    function updateSimulation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const magnetCenterX = magnet.x + magnet.width / 2;
      const magnetCenterY = magnet.y;
      const coilCenterX = coil.x;
      const coilCenterY = coil.y;

      const dist = Math.sqrt(
        Math.pow(magnetCenterX - coilCenterX, 2) +
        Math.pow(magnetCenterY - coilCenterY, 2)
      );

      const currentFlux = calculateFlux();
      const fluxChange = Math.abs(currentFlux - previousFlux);
      
      const smoothingFactor = 0.3;
      fluxChangeSmoothed = fluxChangeSmoothed * (1 - smoothingFactor) + fluxChange * smoothingFactor;
      
      const inducedCurrent = fluxChangeSmoothed * 2;
      
      const threshold = 0.3;
      if (inducedCurrent > threshold) {
        bulb.targetBrightness = Math.min(1, inducedCurrent / 15);
      } else {
        bulb.targetBrightness = 0;
      }

      const brightnessSpeed = 0.15;
      if (bulb.brightness < bulb.targetBrightness) {
        bulb.brightness += (bulb.targetBrightness - bulb.brightness) * brightnessSpeed;
      } else {
        bulb.brightness += (bulb.targetBrightness - bulb.brightness) * (brightnessSpeed * 0.7);
      }

      bulb.isOn = bulb.brightness > 0.05;
      previousFlux = currentFlux;

      drawWires();
      drawCoil();
      drawBulb();
      drawMagnet();
      
      const distanceCm = Math.max(0, (dist - coil.radius) / 10).toFixed(1);
      setDistance(distanceCm);
      
      const curr = (inducedCurrent / 4).toFixed(2);
      setCurrent(curr);
      
      const flux = fluxChangeSmoothed.toFixed(2);
      setFluxRate(flux);
      
      if (bulb.isOn) {
        setBulbStatus('ON');
        setIsBulbOn(true);
      } else {
        setBulbStatus('OFF');
        setIsBulbOn(false);
      }

      animationFrameId = requestAnimationFrame(updateSimulation);
    }

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (mouseX > magnet.x && mouseX < magnet.x + magnet.width &&
          mouseY > magnet.y - magnet.height / 2 && mouseY < magnet.y + magnet.height / 2) {
        magnet.isDragging = true;
        magnet.prevX = magnet.x;
        magnet.prevY = magnet.y;
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e) => {
      if (magnet.isDragging) {
        const rect = canvas.getBoundingClientRect();
        magnet.prevX = magnet.x;
        magnet.prevY = magnet.y;
        magnet.x = e.clientX - rect.left - magnet.width / 2;
        magnet.y = e.clientY - rect.top;
      }
    };

    const handleMouseUp = () => {
      magnet.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    updateSimulation();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  const handleBack = () => {
    alert('Going back to experiment details...');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 to-purple-900 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
          >
            <ArrowLeft size={24} className="text-purple-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-1">
              ⚡ Faraday's Law of Electromagnetic Induction
            </h1>
            <p className="text-gray-600">Interactive Physics Simulation</p>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="border-4 border-purple-600 rounded-xl bg-gradient-to-b from-gray-50 to-gray-200 cursor-grab w-full max-w-full h-auto"
        />

        {/* Info Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-white border-2 border-gray-200 rounded-xl text-center">
            <h3 className="text-purple-600 text-sm font-bold mb-2">💡 Bulb Status</h3>
            <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isBulbOn ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>{bulbStatus}</span>
            </p>
          </div>
          <div className="p-4 bg-white border-2 border-gray-200 rounded-xl text-center">
            <h3 className="text-purple-600 text-sm font-bold mb-2">📏 Distance</h3>
            <p className="text-gray-600 text-sm">{distance} cm</p>
          </div>
          <div className="p-4 bg-white border-2 border-gray-200 rounded-xl text-center">
            <h3 className="text-purple-600 text-sm font-bold mb-2">⚡ Induced Current</h3>
            <p className="text-gray-600 text-sm">{current} A</p>
          </div>
          <div className="p-4 bg-white border-2 border-gray-200 rounded-xl text-center">
            <h3 className="text-purple-600 text-sm font-bold mb-2">🔄 Flux Change Rate</h3>
            <p className="text-gray-600 text-sm">{fluxRate} Wb/s</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-purple-600 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-purple-600">Instructions:</span> Drag the magnet to move it near or through the coil. The bulb will <strong>only</strong> light up when the magnet is <strong>moving</strong> (changing magnetic flux). If you stop moving the magnet, the bulb turns off - even if the magnet is inside the coil!
          </p>
        </div>

        {/* Physics Note */}
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <span className="font-bold">⚗️ Physics Principle:</span> According to Faraday's Law (ε = -dΦ/dt), current is induced only when the magnetic flux <strong>changes</strong>. A stationary magnet produces no current, regardless of position!
          </p>
        </div>
      </div>
    </div>
  );
}