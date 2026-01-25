import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BenefitsSection() {
  const [activeCard, setActiveCard] = useState(null);

  const benefits = [
    {
      title: "Better Understanding",
      description: "Clear 3D visuals."
    },
    {
      title: "Repeated Practice",
      description: "No limits."
    },
    {
      title: "Safe Learning",
      description: "No accidents."
    },
    {
      title: "Confidence",
      description: "Exam readiness."
    },
    {
      title: "Online Support",
      description: "Structured learning."
    },
    {
      title: "Offline Future",
      description: "Remote access."
    }
  ];

  useEffect(() => {
    const createGlowOrbs = () => {
      const orbContainer = document.getElementById('benefits-glow-orbs');
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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="benefits" className="relative w-full min-h-screen py-20 overflow-hidden bg-black select-none">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        
        {/* Glow orbs */}
        <div id="benefits-glow-orbs" className="absolute inset-0" />
        
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
          initial="hidden"
          whileInView="visible"
          variants={headerVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 px-6 sm:px-10 lg:px-16"
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
            Benefits of Using the SHIKARA LAB
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mt-6 max-w-3xl mx-auto font-medium leading-relaxed">
            Improves understanding, practice, and accessibility.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-6 sm:px-10 lg:px-16 w-full"
        >
          {benefits.map((benefit, index) => {
            const isActive = activeCard === index;
            const colors = ['#00d4ff', '#00ff88', '#7289da', '#ffa500', '#00d4ff', '#00ff88'];
            const color = colors[index % colors.length];

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
                  className="relative p-8 sm:p-7 rounded-2xl h-full select-none"
                  style={{
                    background: isActive
                      ? 'rgba(0, 212, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: isActive
                      ? '1.5px solid rgba(0, 212, 255, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isActive
                      ? '0 20px 60px rgba(0, 212, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Gradient accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
                      opacity: isActive ? 1 : 0
                    }}
                  />

                  {/* Icon Container */}
                  <div className="relative z-20 mb-6">
                    <div
                      className="p-3.5 rounded-xl"
                      style={{
                        background: isActive
                          ? 'rgba(0, 212, 255, 0.15)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: `1.5px solid ${color}30`,
                        boxShadow: isActive
                          ? `0 0 20px ${color}40, inset 0 0 10px ${color}20`
                          : `0 0 10px ${color}20`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <span
                        className="text-3xl font-black block"
                        style={{
                          color: color,
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isActive ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-20">
                    <h3
                      className="text-lg sm:text-xl font-black mb-2"
                      style={{
                        color: color,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium mb-5 transition-colors duration-400">
                      {benefit.description}
                    </p>

                    {/* Benefit tag */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: `${color}15`,
                        color: color,
                        border: `0.5px solid ${color}40`,
                        opacity: isActive ? 1 : 0.6,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: color,
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isActive ? 'scale(1.2)' : 'scale(1)'
                        }}
                      />
                      Learn more
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
                      opacity: isActive ? 1 : 0
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}