// import React, { useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Lock, Eye, EyeOff, X, User } from 'lucide-react';
// import * as THREE from 'three';

// export default function Hero() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [signupData, setSignupData] = useState({
//     fullName: '',
//     studentId: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loginError, setLoginError] = useState('');
//   const [signupError, setSignupError] = useState('');
//   const [signupSuccess, setSignupSuccess] = useState('');
//   const [trigger, setTrigger] = useState(0);
//   const canvasRef = useRef(null);
//   const sceneRef = useRef(null);
//   const rendererRef = useRef(null);

//   useEffect(() => {
//     setTrigger(prev => prev + 1);
//   }, []);

//   // Advanced Three.js 3D Background
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     // Scene setup
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;
    
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 8;

//     const renderer = new THREE.WebGLRenderer({ 
//       canvas, 
//       alpha: true, 
//       antialias: true,
//       precision: 'highp',
//       powerPreference: 'high-performance'
//     });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x000000, 1);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFShadowShadowMap;
//     rendererRef.current = renderer;

//     // Create animated particles/stars
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particleCount = 2000;
//     const posArray = new Float32Array(particleCount * 3);
//     const colorArray = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount * 3; i += 3) {
//       posArray[i] = (Math.random() - 0.5) * 100;
//       posArray[i + 1] = (Math.random() - 0.5) * 100;
//       posArray[i + 2] = (Math.random() - 0.5) * 100;

//       const hue = Math.random();
//       const color = new THREE.Color().setHSL(hue * 0.5 + 0.4, 0.8, 0.6);
//       colorArray[i] = color.r;
//       colorArray[i + 1] = color.g;
//       colorArray[i + 2] = color.b;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.15,
//       vertexColors: true,
//       sizeAttenuation: true,
//       transparent: true,
//       opacity: 0.8
//     });

//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);

//     // Create torus knots for dynamic 3D elements
//     const torusKnots = [];
//     const colors = [0x00d4ff, 0x00ff88, 0x5865f2, 0xff006e, 0x8338ec];

//     for (let i = 0; i < 3; i++) {
//       const geometry = new THREE.TorusKnotGeometry(1.5, 0.6, 100, 16);
//       const material = new THREE.MeshPhongMaterial({
//         color: colors[i],
//         emissive: colors[i],
//         emissiveIntensity: 0.5,
//         wireframe: false,
//         shininess: 100,
//         transparent: true,
//         opacity: 0.7
//       });

//       const torusKnot = new THREE.Mesh(geometry, material);
//       torusKnot.position.set(
//         (i - 1) * 8,
//         Math.sin(i) * 5,
//         Math.cos(i) * -8
//       );
//       torusKnot.scale.set(0.8, 0.8, 0.8);
//       torusKnot.rotation.order = 'YXZ';
      
//       scene.add(torusKnot);
//       torusKnots.push({
//         mesh: torusKnot,
//         speed: 0.003 + i * 0.002,
//         rotateX: 0.001 + Math.random() * 0.002,
//         rotateY: 0.002 + Math.random() * 0.002,
//         rotateZ: 0.001 + Math.random() * 0.001
//       });
//     }

//     // Create rotating octahedrons
//     const octahedrons = [];
//     for (let i = 0; i < 4; i++) {
//       const geometry = new THREE.OctahedronGeometry(2);
//       const material = new THREE.MeshPhongMaterial({
//         color: colors[(i + 2) % colors.length],
//         emissive: colors[(i + 2) % colors.length],
//         emissiveIntensity: 0.3,
//         wireframe: false,
//         transparent: true,
//         opacity: 0.5
//       });

//       const octahedron = new THREE.Mesh(geometry, material);
//       const angle = (i / 4) * Math.PI * 2;
//       octahedron.position.set(
//         Math.cos(angle) * 12,
//         Math.sin(angle) * 12,
//         Math.cos(angle * 2) * -10
//       );
//       octahedron.scale.set(0.6, 0.6, 0.6);
      
//       scene.add(octahedron);
//       octahedrons.push({
//         mesh: octahedron,
//         angle: angle,
//         rotateSpeed: 0.001 + Math.random() * 0.002
//       });
//     }

//     // Advanced lighting setup
//     const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 100);
//     pointLight1.position.set(15, 15, 20);
//     pointLight1.castShadow = true;
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0x00ff88, 1.5, 100);
//     pointLight2.position.set(-15, -15, 15);
//     pointLight2.castShadow = true;
//     scene.add(pointLight2);

//     const pointLight3 = new THREE.PointLight(0x5865f2, 1.2, 100);
//     pointLight3.position.set(0, 20, -20);
//     pointLight3.castShadow = true;
//     scene.add(pointLight3);

//     const pointLight4 = new THREE.PointLight(0xff006e, 1, 80);
//     pointLight4.position.set(-20, 0, 10);
//     scene.add(pointLight4);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//     scene.add(ambientLight);

//     // Animation variables
//     let animationId;
//     const clock = new THREE.Clock();

//     const animate = () => {
//       animationId = requestAnimationFrame(animate);
//       const delta = Math.min(clock.getDelta(), 0.016); // Cap at 60fps

//       // Animate particles
//       particles.rotation.x += 0.00005;
//       particles.rotation.y += 0.0001;

//       // Animate torusKnots
//       torusKnots.forEach((tk) => {
//         tk.mesh.rotation.x += tk.rotateX;
//         tk.mesh.rotation.y += tk.rotateY;
//         tk.mesh.rotation.z += tk.rotateZ;
//       });

//       // Animate octahedrons in circular motion
//       octahedrons.forEach((oct, i) => {
//         oct.angle += 0.001;
//         oct.mesh.position.x = Math.cos(oct.angle) * 12;
//         oct.mesh.position.y = Math.sin(oct.angle) * 12 + Math.sin(clock.getElapsedTime() * 0.5) * 3;
//         oct.mesh.position.z = Math.cos(oct.angle * 2) * -10;
//         oct.mesh.rotation.x += oct.rotateSpeed;
//         oct.mesh.rotation.y += oct.rotateSpeed * 1.2;
//       });

//       // Animate lights
//       pointLight1.position.x = 15 + Math.sin(clock.getElapsedTime() * 0.3) * 5;
//       pointLight1.position.y = 15 + Math.cos(clock.getElapsedTime() * 0.4) * 5;

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       const newHeight = window.innerHeight;
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(newWidth, newHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationId);
//       renderer.dispose();
//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//     };
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoginError('');
//     if (!email || !password) {
//       setLoginError('Please fill in all fields');
//       return;
//     }
//     if (email === 'adnan' && password === 'adnan123') {
//       alert('Login successful! Welcome Adnan');
//     } else {
//       setLoginError('Invalid username or password');
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     setSignupError('');
//     setSignupSuccess('');
//     if (!signupData.fullName || !signupData.studentId || !signupData.email || !signupData.password || !signupData.confirmPassword) {
//       setSignupError('All fields are required');
//       return;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(signupData.email)) {
//       setSignupError('Please enter a valid email address');
//       return;
//     }
//     if (signupData.password !== signupData.confirmPassword) {
//       setSignupError('Passwords do not match');
//       return;
//     }
//     if (signupData.password.length < 6) {
//       setSignupError('Password must be at least 6 characters');
//       return;
//     }
//     setSignupSuccess('Account created successfully!');
//     setTimeout(() => {
//       setShowSignupModal(false);
//       setShowLoginModal(true);
//     }, 1500);
//   };

//   const toggleModal = (show, type) => {
//     if (type === 'login') setShowLoginModal(show);
//     else setShowSignupModal(show);
//   };

//   const words = ['Revise better', 'Understand faster', 'Learn smarter'];

//   const slideInFromLeft = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { opacity: 1, x: 0 }
//   };

//   return (
//     <section id="home" className="relative w-full min-h-screen overflow-hidden bg-black select-none" style={{ userSelect: 'none' }}>
//       <div className="absolute inset-0">
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 w-full h-full"
//           style={{ display: 'block' }}
//         />
        
//         {/* Overlay gradient for depth */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
//       </div>

//       <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-14 select-none" style={{ userSelect: 'none' }}>
//         <div className="text-center max-w-5xl mx-auto">
//           <motion.div
//             key={`badge-${trigger}`}
//             initial="hidden"
//             animate="visible"
//             variants={slideInFromLeft}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//             className="mb-2 flex justify-center pointer-events-none"
//           >
//             <div
//               className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold"
//               style={{
//                 background: 'rgba(0, 212, 255, 0.15)',
//                 border: '1px solid rgba(0, 212, 255, 0.4)',
//                 color: '#00d4ff',
//                 boxShadow: '0 0 20px rgba(0,212,255,0.25) inset',
//               }}
//             >
//               First Semester Project • For School Students
//             </div>
//           </motion.div>

//           <motion.h1
//             key={`title-${trigger}`}
//             initial="hidden"
//             animate="visible"
//             variants={slideInFromLeft}
//             transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
//             className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 leading-tight tracking-tight pointer-events-none"
//             style={{
//               letterSpacing: '-1px',
//               background:
//                 'linear-gradient(90deg, #00d4ff 0%, #6ee7ff 20%, #7cffc6 50%, #00d4ff 80%, #6ee7ff 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//               userSelect: 'none'
//             }}
//           >
//             SHIKARA LAB
//           </motion.h1>

//           <motion.h2
//             key={`subtitle-${trigger}`}
//             initial="hidden"
//             animate="visible"
//             variants={slideInFromLeft}
//             transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
//             className="text-2xl sm:text-3xl font-extrabold mb-6 pointer-events-none"
//             style={{
//               background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//               lineHeight: '1.3',
//               letterSpacing: '0.3px',
//               userSelect: 'none'
//             }}
//           >
//             Post-Lab Learning Support System
//           </motion.h2>

//           <motion.p
//             key={`desc-${trigger}`}
//             initial="hidden"
//             animate="visible"
//             variants={slideInFromLeft}
//             transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
//             className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-8 mx-auto max-w-2xl pointer-events-none"
//             style={{ color: '#dbeafe', userSelect: 'none' }}
//           >
//             SHIKARA LAB helps school students understand science experiments through
//             virtual labs, interactive demonstrations, and simple explanations.
//           </motion.p>

//           <div className="h-10 sm:h-12 mb-8 flex items-center justify-center pointer-events-none">
//             <motion.div
//               key={`words-${trigger}`}
//               initial="hidden"
//               animate="visible"
//               variants={slideInFromLeft}
//               transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
//               className="text-lg sm:text-2xl font-black"
//               style={{
//                 background:
//                   'linear-gradient(90deg, #ffffff 0%, #00d4ff 50%, #00ff88 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//                 letterSpacing: '0.5px',
//                 userSelect: 'none'
//               }}
//             >
//               <AnimatedWords words={words} />
//             </motion.div>
//           </div>

//           <motion.button
//             key={`button-${trigger}`}
//             onClick={() => toggleModal(true, 'login')}
//             initial="hidden"
//             animate="visible"
//             variants={slideInFromLeft}
//             transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
//             className="px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-sm sm:text-base text-black transition-all duration-300 inline-flex items-center gap-2 cursor-pointer uppercase"
//             style={{
//               background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
//               boxShadow: '0 12px 35px rgba(0, 212, 255, 0.4)',
//               letterSpacing: '0.5px',
//               border: '2px solid rgba(255, 255, 255, 0.15)',
//               userSelect: 'none'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
//               e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
//               e.currentTarget.style.boxShadow = '0 16px 45px rgba(0, 255, 136, 0.5)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)';
//               e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 212, 255, 0.4)';
//             }}
//           >
//             Start Learning
//           </motion.button>
//         </div>
//       </div>

//       {showLoginModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center select-none"
//           style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)', userSelect: 'none' }}
//           onClick={() => toggleModal(false, 'login')}
//         >
//           <div
//             className="relative w-full max-w-md mx-4 p-8 rounded-3xl max-h-[90vh] overflow-y-auto"
//             style={{
//               background: 'rgba(10, 12, 18, 0.9)',
//               border: '1.5px solid rgba(0, 212, 255, 0.3)',
//               backdropFilter: 'blur(30px)',
//               boxShadow: '0 30px 100px rgba(0, 212, 255, 0.25)'
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => toggleModal(false, 'login')}
//               className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
//             >
//               <X size={24} />
//             </button>

//             <h3
//               className="text-2xl sm:text-3xl font-black mb-2"
//               style={{
//                 background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text'
//               }}
//             >
//               Start Your Learning
//             </h3>
//             <p className="text-gray-400 text-sm font-normal mb-8">Sign in to your student account</p>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Username</label>
//                 <div className="relative">
//                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00d4ff' }} />
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value.trim())}
//                     placeholder="Enter your username"
//                     className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
//                     style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="w-full pl-12 pr-12 py-3.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
//                     style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {loginError && (
//                 <div className="text-red-300 text-sm mt-3 p-3 rounded-md" style={{ background: 'rgba(255, 107, 107, 0.12)', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
//                   {loginError}
//                 </div>
//               )}

//               <button
//                 onClick={handleLogin}
//                 className="w-full py-4 rounded-lg font-black text-base text-white transition-all duration-500 cursor-pointer uppercase"
//                 style={{
//                   background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
//                   boxShadow: '0 10px 40px rgba(88, 101, 242, 0.85)',
//                   letterSpacing: '0.5px'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = 'linear-gradient(135deg, #7289da, #5865f2)';
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   e.currentTarget.style.boxShadow = '0 15px 60px rgba(88, 101, 242, 1)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)';
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 10px 40px rgba(88, 101, 242, 0.85)';
//                 }}
//               >
//                 Login
//               </button>
//             </div>

//             <div className="relative my-6">
//               <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
//               <div className="absolute inset-0 flex justify-center text-xs">
//                 <span className="px-3" style={{ background: 'rgba(10, 12, 18, 0.9)', color: '#b9bbbe' }}>OR</span>
//               </div>
//             </div>

//             <div className="text-center text-sm">
//               <span className="text-gray-400">Don't have an account? </span>
//               <button
//                 onClick={() => {
//                   setShowLoginModal(false);
//                   setShowSignupModal(true);
//                 }}
//                 className="font-semibold transition-colors hover:text-cyan-300 cursor-pointer"
//                 style={{ color: '#00d4ff', background: 'none', border: 'none' }}
//               >
//                 Sign up here
//               </button>
//             </div>

//             <div className="p-4 rounded-lg text-sm mt-6" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
//               <p style={{ color: '#00d4ff', fontWeight: 600, marginBottom: '0.5rem' }}>Demo Credentials:</p>
//               <p style={{ color: '#00ff88', marginBottom: '0.25rem' }}>Username: adnan</p>
//               <p style={{ color: '#00ff88' }}>Password: adnan123</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSignupModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center select-none"
//           style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)', userSelect: 'none' }}
//           onClick={() => toggleModal(false, 'signup')}
//         >
//           <div
//             className="relative w-full max-w-md mx-4 p-8 rounded-3xl max-h-[90vh] overflow-y-auto"
//             style={{
//               background: 'rgba(10, 12, 18, 0.9)',
//               border: '1.5px solid rgba(0, 212, 255, 0.3)',
//               backdropFilter: 'blur(30px)',
//               boxShadow: '0 30px 100px rgba(0, 212, 255, 0.25)'
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => toggleModal(false, 'signup')}
//               className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
//             >
//               <X size={24} />
//             </button>

//             <h3
//               className="text-2xl sm:text-3xl font-black mb-2"
//               style={{
//                 background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text'
//               }}
//             >
//               Create Your Account
//             </h3>
//             <p className="text-gray-400 text-sm font-normal mb-8">Join SHIKARA LAB for better learning</p>

//             {signupSuccess && (
//               <div className="text-emerald-300 text-sm mb-4 p-3 rounded-md" style={{ background: 'rgba(81, 207, 102, 0.12)', border: '1px solid rgba(81, 207, 102, 0.35)' }}>
//                 {signupSuccess}
//               </div>
//             )}

//             <div className="space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
//                 <div className="relative">
//                   <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00d4ff' }} />
//                   <input
//                     type="text"
//                     value={signupData.fullName}
//                     onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
//                     placeholder="Enter your full name"
//                     className="w-full pl-12 pr-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
//                     style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Student ID</label>
//                 <input
//                   type="text"
//                   value={signupData.studentId}
//                   onChange={(e) => setSignupData({ ...signupData, studentId: e.target.value })}
//                   placeholder="Enter your student ID"
//                   className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
//                   style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   value={signupData.email}
//                   onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
//                   style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={signupData.password}
//                     onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                     placeholder="Enter your password"
//                     className="w-full pl-12 pr-12 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
//                     style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
//                 <div className="relative">
//                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={signupData.confirmPassword}
//                     onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
//                     placeholder="Confirm your password"
//                     className="w-full pl-12 pr-12 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
//                     style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
//                   >
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {signupError && (
//                 <div className="text-red-300 text-sm mt-1 p-3 rounded-md" style={{ background: 'rgba(255, 107, 107, 0.12)', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
//                   {signupError}
//                 </div>
//               )}

//               <button
//                 onClick={handleSignup}
//                 className="w-full py-4 rounded-lg font-black text-base text-black transition-all duration-500 cursor-pointer uppercase"
//                 style={{
//                   background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
//                   boxShadow: '0 10px 40px rgba(0, 212, 255, 0.8)',
//                   letterSpacing: '0.5px'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   e.currentTarget.style.boxShadow = '0 15px 60px rgba(0, 255, 136, 1)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)';
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.8)';
//                 }}
//               >
//                 Create Account
//               </button>
//             </div>

//             <div className="relative my-6">
//               <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
//               <div className="absolute inset-0 flex justify-center text-xs">
//                 <span className="px-3" style={{ background: 'rgba(10, 12, 18, 0.9)', color: '#b9bbbe' }}>OR</span>
//               </div>
//             </div>

//             <div className="text-center text-sm">
//               <span className="text-gray-400">Already have an account? </span>
//               <button
//                 onClick={() => {
//                   setShowSignupModal(false);
//                   setShowLoginModal(true);
//                 }}
//                 className="font-semibold transition-colors hover:text-cyan-300 cursor-pointer"
//                 style={{ color: '#00d4ff', background: 'none', border: 'none' }}
//               >
//                 Login here
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function AnimatedWords({ words }) {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
//     return () => clearInterval(id);
//   }, [words.length]);

//   return (
//     <motion.span
//       key={index}
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -8 }}
//       transition={{ duration: 0.4 }}
//     >
//       {words[index]}
//     </motion.span>
//   );
// }
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline' ;
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, X, User } from 'lucide-react';

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2');
    return !!gl;
  } catch {
    return false;
  }
}

export default function Hero() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [canUseWebGL, setCanUseWebGL] = useState(false);

  useEffect(() => {
    setCanUseWebGL(isWebGLAvailable());
  }, []);

  // Ambient glow orbs
  useEffect(() => {
    const root = document.getElementById('glow-orbs');
    if (!root) return;
    root.innerHTML = '';
    for (let i = 0; i < 35; i++) {  // Increased from 12 to 35 {
      const orb = document.createElement('div');
      const size = 140 + Math.random() * 250;
      orb.style.position = 'absolute';
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      orb.style.borderRadius = '50%';
      orb.style.filter = 'blur(25px)';
      orb.style.opacity = String(0.08 + Math.random() * 0.1);
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      const colors = [
        'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.9), transparent 60%)',
        'radial-gradient(circle at 70% 70%, rgba(0,255,136,0.9), transparent 60%)',
        'radial-gradient(circle at 50% 50%, rgba(88,101,242,0.9), transparent 60%)'
      ];
      orb.style.background = colors[Math.floor(Math.random() * colors.length)];
      root.appendChild(orb);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }
    if (email === 'adnan' && password === 'adnan123') {
      alert('Login successful! Welcome Adnan');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    if (!signupData.fullName || !signupData.studentId || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setSignupError('All fields are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setSignupError('Please enter a valid email address');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }
    setSignupSuccess('Account created successfully!');
    setTimeout(() => {
      setShowSignupModal(false);
      setShowLoginModal(true);
    }, 1500);
  };

  const toggleModal = (show, type) => {
    if (type === 'login') setShowLoginModal(show);
    else setShowSignupModal(show);
  };

  const words = ['Revise better', 'Understand faster', 'Learn smarter'];

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Spline immersive backdrop (if supported) */}
        {canUseWebGL ? (
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/UiMDkOJtlS5O5Vaz/scene.splinecode" />
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(1200px 800px at 10% 10%, rgba(0,212,255,0.15), transparent 60%), radial-gradient(1000px 700px at 90% 20%, rgba(0,255,136,0.12), transparent 60%), radial-gradient(900px 900px at 50% 100%, rgba(88,101,242,0.18), transparent 60%), linear-gradient(180deg, #05060a 0%, #070a12 100%)',
            }}
          />
        )}

        {/* Background circles: center glow + rotating halo + dual offset glows */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0.22 }}
          animate={{ scale: 1.02, opacity: 0.28 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.35), rgba(0,255,136,0.18) 40%, rgba(88,101,242,0.18) 70%, transparent 75%)'
          }}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(0,212,255,0.6), rgba(0,255,136,0.4), rgba(88,101,242,0.5), rgba(0,212,255,0.6))',
            maskImage:
              'radial-gradient(circle at 50% 50%, transparent 44%, black 46%, black 54%, transparent 56%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, transparent 44%, black 46%, black 54%, transparent 56%)',
            filter: 'blur(8px)'
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 -left-16 w-[900px] h-[900px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent 60%)' }}
          />
          <div
            className="absolute top-40 -right-10 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.28), transparent 60%)' }}
          />
        </div>

        {/* Contrast overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div id="glow-orbs" className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-14">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex justify-center"
          >
            <div
              className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold"
              style={{
                background: 'rgba(0, 212, 255, 0.15)',
                border: '1px solid rgba(0, 212, 255, 0.4)',
                color: '#00d4ff',
                boxShadow: '0 0 20px rgba(0,212,255,0.25) inset',
              }}
            >
              First Semester Project • For School Students
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 leading-tight tracking-tight"
            style={{
              letterSpacing: '-1px',
              background:
                'linear-gradient(90deg, #00d4ff 0%, #6ee7ff 20%, #7cffc6 50%, #00d4ff 80%, #6ee7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(0,212,255,0.25)',
            }}
          >
            SHIKARA LAB
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-2xl sm:text-3xl font-extrabold mb-6"
            style={{
              background: 'linear-gradient(90deg, #00ff88 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.3',
              letterSpacing: '0.3px',
            }}
          >
            Post-Lab Learning Support System
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-8 mx-auto max-w-2xl"
            style={{ color: '#dbeafe', textShadow: '0 0 8px rgba(0,212,255,0.15)' }}
          >
            SHIKARA LAB helps school students understand science experiments through
            virtual labs, interactive demonstrations, and simple explanations.
          </motion.p>

          <div className="h-10 sm:h-12 mb-8 flex items-center justify-center">
            <motion.div
              key={email + password}
              className="text-lg sm:text-2xl font-black"
              style={{
                background:
                  'linear-gradient(90deg, #ffffff 0%, #00d4ff 50%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.5px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedWords words={words} />
            </motion.div>
          </div>

          <motion.button
            onClick={() => toggleModal(true, 'login')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-sm sm:text-base text-black transition-all duration-300 inline-flex items-center gap-2 cursor-pointer uppercase"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
              boxShadow: '0 12px 35px rgba(0, 212, 255, 0.4)',
              letterSpacing: '0.5px',
              border: '2px solid rgba(255, 255, 255, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 16px 45px rgba(0, 255, 136, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 212, 255, 0.4)';
            }}
          >
            Start Learning
          </motion.button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => toggleModal(false, 'login')}
        >
          <div
            className="relative w-full max-w-md mx-4 p-8 rounded-3xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(10, 12, 18, 0.9)',
              border: '1.5px solid rgba(0, 212, 255, 0.3)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 30px 100px rgba(0, 212, 255, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => toggleModal(false, 'login')}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            <h3
              className="text-2xl sm:text-3xl font-black mb-2"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Start Your Learning
            </h3>
            <p className="text-gray-400 text-sm font-normal mb-8">Sign in to your student account</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Username</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00d4ff' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Enter your username"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-300 text-sm mt-3 p-3 rounded-md" style={{ background: 'rgba(255, 107, 107, 0.12)', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
                  {loginError}
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-lg font-black text-base text-white transition-all duration-500 cursor-pointer uppercase"
                style={{
                  background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
                  boxShadow: '0 10px 40px rgba(88, 101, 242, 0.85)',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #7289da, #5865f2)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 60px rgba(88, 101, 242, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(88, 101, 242, 0.85)';
                }}
              >
                Login
              </button>
            </div>

            <div className="relative my-6">
              <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div className="absolute inset-0 flex justify-center text-xs">
                <span className="px-3" style={{ background: 'rgba(10, 12, 18, 0.9)', color: '#b9bbbe' }}>OR</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-400">Don't have an account? </span>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                className="font-semibold transition-colors hover:text-cyan-300 cursor-pointer"
                style={{ color: '#00d4ff', background: 'none', border: 'none' }}
              >
                Sign up here
              </button>
            </div>

            <div className="p-4 rounded-lg text-sm mt-6" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
              <p style={{ color: '#00d4ff', fontWeight: 600, marginBottom: '0.5rem' }}>Demo Credentials:</p>
              <p style={{ color: '#00ff88', marginBottom: '0.25rem' }}>Username: adnan</p>
              <p style={{ color: '#00ff88' }}>Password: adnan123</p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => toggleModal(false, 'signup')}
        >
          <div
            className="relative w-full max-w-md mx-4 p-8 rounded-3xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(10, 12, 18, 0.9)',
              border: '1.5px solid rgba(0, 212, 255, 0.3)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 30px 100px rgba(0, 212, 255, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => toggleModal(false, 'signup')}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            <h3
              className="text-2xl sm:text-3xl font-black mb-2"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Create Your Account
            </h3>
            <p className="text-gray-400 text-sm font-normal mb-8">Join SHIKARA LAB for better learning</p>

            {signupSuccess && (
              <div className="text-emerald-300 text-sm mb-4 p-3 rounded-md" style={{ background: 'rgba(81, 207, 102, 0.12)', border: '1px solid rgba(81, 207, 102, 0.35)' }}>
                {signupSuccess}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00d4ff' }} />
                  <input
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Student ID</label>
                <input
                  type="text"
                  value={signupData.studentId}
                  onChange={(e) => setSignupData({ ...signupData, studentId: e.target.value })}
                  placeholder="Enter your student ID"
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#00ff88' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {signupError && (
                <div className="text-red-300 text-sm mt-1 p-3 rounded-md" style={{ background: 'rgba(255, 107, 107, 0.12)', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
                  {signupError}
                </div>
              )}

              <button
                onClick={handleSignup}
                className="w-full py-4 rounded-lg font-black text-base text-black transition-all duration-500 cursor-pointer uppercase"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                  boxShadow: '0 10px 40px rgba(0, 212, 255, 0.8)',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 60px rgba(0, 255, 136, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.8)';
                }}
              >
                Create Account
              </button>
            </div>

            <div className="relative my-6">
              <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
              <div className="absolute inset-0 flex justify-center text-xs">
                <span className="px-3" style={{ background: 'rgba(10, 12, 18, 0.9)', color: '#b9bbbe' }}>OR</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-400">Already have an account? </span>
              <button
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
                className="font-semibold transition-colors hover:text-cyan-300 cursor-pointer"
                style={{ color: '#00d4ff', background: 'none', border: 'none' }}
              >
                Login here
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function AnimatedWords({ words }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      {words[index]}
    </motion.span>
  );
}