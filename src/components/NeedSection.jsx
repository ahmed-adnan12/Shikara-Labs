import React, { useEffect, useState } from 'react';
import { Zap, Beaker, BookOpen, Shield, TrendingUp, Lightbulb, Users, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NeedSection() {
  const [activeCard, setActiveCard] = useState(null);

  const needs = [
    {
      icon: Zap,
      title: "24/7 Accessibility",
      description: "Access virtual labs anytime, anywhere from any device without time constraints.",
      color: "#00d4ff",
      benefit: "Learn at your own pace"
    },
    {
      icon: Beaker,
      title: "Cost Effective",
      description: "No expensive equipment or chemical wastage. Maximize learning without resource limitations.",
      color: "#00ff88",
      benefit: "Save institutional costs"
    },
    {
      icon: Shield,
      title: "Safe Learning",
      description: "No risk or safety concerns. Practice dangerous experiments in a completely controlled environment.",
      color: "#7289da",
      benefit: "Risk-free experimentation"
    },
    {
      icon: BookOpen,
      title: "Revision Support",
      description: "Revisit and revise experiments anytime after class to reinforce concepts and understanding.",
      color: "#ffa500",
      benefit: "Strengthen concepts"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor student performance, learning outcomes, and mastery levels with detailed analytics.",
      color: "#00d4ff",
      benefit: "Data-driven insights"
    },
    {
      icon: Lightbulb,
      title: "Interactive Learning",
      description: "Engage with dynamic simulations, adjust parameters, and conduct experiments virtually.",
      color: "#00ff88",
      benefit: "Hands-on engagement"
    },
    {
      icon: Users,
      title: "Flexible Practice",
      description: "Real labs have limited practice time during sessions. Virtual labs enable unlimited repetition.",
      color: "#7289da",
      benefit: "Unlimited attempts"
    },
    {
      icon: Lock,
      title: "Material Conservation",
      description: "Equipment and chemicals are limited resources. Virtual labs eliminate material constraints.",
      color: "#ffa500",
      benefit: "Sustainable learning"
    }
  ];

  useEffect(() => {
    const createGlowOrbs = () => {
      const orbContainer = document.getElementById('need-glow-orbs');
      if (!orbContainer) return;
      
      orbContainer.innerHTML = '';
      for (let i = 0; i < 25; i++) {
        const orb = document.createElement('div');
        const size = 100 + Math.random() * 200;
        orb.style.position = 'absolute';
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.borderRadius = '50%';
        orb.style.filter = 'blur(40px)';
        orb.style.opacity = String(0.04 + Math.random() * 0.08);
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animation = `float-orb ${15 + Math.random() * 20}s infinite ease-in-out`;
        orb.style.animationDelay = `${Math.random() * 5}s`;
        
        const colors = [
          'radial-gradient(circle, rgba(0,212,255,0.8), transparent 70%)',
          'radial-gradient(circle, rgba(0,255,136,0.6), transparent 70%)',
          'radial-gradient(circle, rgba(114,137,218,0.6), transparent 70%)',
          'radial-gradient(circle, rgba(255,165,0,0.5), transparent 70%)'
        ];
        orb.style.background = colors[Math.floor(Math.random() * colors.length)];
        orbContainer.appendChild(orb);
      }
    };

    createGlowOrbs();
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-orb {
        0%, 100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(30px, -30px);
        }
        50% {
          transform: translate(-20px, 20px);
        }
        75% {
          transform: translate(20px, 30px);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -40, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="need" className="relative w-full min-h-screen py-20 overflow-hidden bg-black select-none">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        
        {/* Glow orbs */}
        <div id="need-glow-orbs" className="absolute inset-0" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            style={{
              background: 'linear-gradient(90deg, #00d4ff 0%, #6ee7ff 25%, #7cffc6 50%, #00ff88 75%, #6ee7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px'
            }}
          >
            Comprehensive Learning Beyond the Lab
          </h2>

         
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-6 sm:px-10 lg:px-16"
        >
          {needs.map((need, index) => {
            const Icon = need.icon;
            const isActive = activeCard === index;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative h-full cursor-pointer"
                style={{ overflow: 'hidden' }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  className="relative p-8 sm:p-7 rounded-2xl h-full transition-all duration-700 overflow-hidden select-none"
                  style={{
                    background: isActive
                      ? 'rgba(0, 212, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: isActive
                      ? `1.5px solid rgba(0, 212, 255, 0.4)`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isActive
                      ? '0 20px 60px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transform: isActive ? 'translateY(-8px)' : 'translateY(0)'
                  }}
                >
                  {/* Gradient accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${need.color}80, transparent)`,
                      opacity: isActive ? 1 : 0
                    }}
                  />

                  {/* Icon Container */}
                  <div className="relative z-20 mb-6 flex items-center justify-between">
                    <div
                      className="p-3.5 rounded-xl transition-all duration-700"
                      style={{
                        background: isActive
                          ? `rgba(0, 212, 255, 0.15)`
                          : `rgba(255, 255, 255, 0.05)`,
                        border: `1.5px solid ${need.color}30`,
                        boxShadow: isActive
                          ? `0 0 20px ${need.color}40, inset 0 0 10px ${need.color}20`
                          : `0 0 10px ${need.color}20`
                      }}
                    >
                      <Icon
                        size={28}
                        style={{ color: need.color }}
                        className="transition-transform duration-700"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Index badge */}
                    <div
                      className="text-xs font-black rounded-full w-8 h-8 flex items-center justify-center transition-all duration-700"
                      style={{
                        background: `${need.color}20`,
                        color: need.color,
                        border: `1px solid ${need.color}40`
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-20">
                    <h3
                      className="text-lg sm:text-xl font-black mb-2 transition-colors duration-700"
                      style={{
                        color: need.color
                      }}
                    >
                      {need.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed font-medium mb-5 transition-colors duration-700">
                      {need.description}
                    </p>

                    {/* Benefit tag */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-700"
                      style={{
                        background: `${need.color}15`,
                        color: need.color,
                        border: `0.5px solid ${need.color}40`,
                        opacity: isActive ? 1 : 0.6
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: need.color }} />
                      {need.benefit}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${need.color}80, transparent)`,
                      opacity: isActive ? 1 : 0
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-20 text-center px-6 sm:px-10 lg:px-16"
        >
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          </div>
        </motion.div>
      </div>
    </section>
  );
}