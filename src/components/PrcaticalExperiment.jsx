// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, BookOpen, TrendingUp, Zap, ChevronDown, ChevronUp, Play, 
//   Download, FileText, Video, Menu, X, ChevronRight, CheckCircle,
//   Award, Lightbulb, Target, Beaker, BarChart3, HelpCircle, MessageSquare,
//   ArrowRight, Star, Calendar, Sparkles, Brain, Rocket, BookMarked
// } from 'lucide-react';
// import practicalsData from './practicals-data.json';
// import { Link, useParams } from 'react-router-dom';

// // Icon mapping component
// const IconComponent = ({ iconName, className }) => {
//   const icons = { Clock, BookOpen, TrendingUp, Zap };
//   const Icon = icons[iconName] || Clock;
//   return <Icon className={className} />;
// };

// // Collapsible Section Component with enhanced design
// const CollapsibleSection = ({ title, children, defaultOpen = false, icon: Icon }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   return (
//     <div className="mb-4 border border-gray-700/30 rounded-2xl overflow-hidden bg-gray-800/20 backdrop-blur-sm hover:border-blue-500/30 transition-all shadow-sm">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-6 py-5 bg-gradient-to-r from-gray-800/40 to-gray-900/40 flex justify-between items-center hover:from-gray-700/40 hover:to-gray-800/40 transition-all group"
//       >
//         <div className="flex items-center gap-3">
//           {Icon && <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />}
//           <h3 className="text-base font-semibold text-white text-left group-hover:text-blue-100 transition-colors">{title}</h3>
//         </div>
//         <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
//           <ChevronDown className="text-gray-400 w-5 h-5" />
//         </div>
//       </button>
//       <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//         <div className="px-6 py-5 bg-gray-900/30">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Sidebar Navigation
// const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, practical }) => {
//   const menuItems = [
//     { id: 'overview', label: 'Overview', icon: Target, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10' },
//     { id: 'theory', label: 'Theory', icon: Lightbulb, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10' },
//     { id: 'procedure', label: 'Procedure', icon: Beaker, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
//     { id: 'observations', label: 'Observations', icon: BarChart3, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10' },
//     { id: 'quiz', label: 'Quiz', icon: Award, color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-500/10' },
//     { id: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-500/10' },
//   ];

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="lg:hidden fixed top-6 left-6 z-50 bg-gray-900 p-3 rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-xl hover:bg-gray-800 transition-all"
//       >
//         {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-gradient-to-b from-gray-900 via-gray-900 to-black border-r border-gray-800/50 overflow-y-auto z-40 transition-transform duration-300 shadow-2xl ${
//           isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         }`}
//       >
//         <div className="p-6 space-y-6">
//           {/* Logo & Title */}
//           <div className="border-b border-gray-800 pb-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <Beaker className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold text-white">Physics Lab</h1>
//                 <p className="text-xs text-gray-400">Interactive Practicals</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//               <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                 {practical.subject} • Class {practical.class}
//               </span>
//             </div>
//           </div>

//           {/* Experiment Title Card */}
//           <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-5 shadow-lg">
//             <h2 className="text-lg font-bold text-white leading-tight mb-2">
//               {practical.title}
//             </h2>
//             <p className="text-sm text-gray-400 leading-relaxed">{practical.subtitle}</p>
//           </div>

//           {/* Start Experiment Button */}
//           {/* <button
//             onClick={() => {
//               setActiveTab('procedure');
//               setIsMobileMenuOpen(false);
//               window.scrollTo({ top: 0, behavior: 'smooth' });
//             }}
//             className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:via-green-400 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
//           >
//             <Play className="w-5 h-5" fill="currentColor" />
//             Start Experiment
//             <Sparkles className="w-4 h-4" />
//           </button> */}
//           <Link to={practical.allexp}>Start Experiment</Link>

//           {/* Navigation Menu */}
//           <div className="space-y-2">
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Navigation</p>
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeTab === item.id;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveTab(item.id);
//                     setIsMobileMenuOpen(false);
//                     window.scrollTo({ top: 0, behavior: 'smooth' });
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                     isActive
//                       ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-600/30 scale-[1.02]`
//                       : `text-gray-400 hover:text-white hover:${item.bgColor} hover:scale-[1.01]`
//                   }`}
//                 >
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : item.bgColor}`}>
//                     <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
//                   </div>
//                   <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
//                   {isActive && <ChevronRight className="w-4 h-4" />}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Quick Actions */}
//           <div className="border-t border-gray-800 pt-6 space-y-2">
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">Quick Actions</p>
//             {[
//               { icon: Download, label: 'Download PDF', color: 'text-blue-400' },
//               { icon: FileText, label: 'View Notes', color: 'text-purple-400' },
//               { icon: Video, label: 'Watch Tutorial', color: 'text-pink-400' },
//               { icon: BookMarked, label: 'Save Progress', color: 'text-green-400' },
//             ].map((action, index) => (
//               <button key={index} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all hover:scale-[1.01]">
//                 <action.icon className={`w-5 h-5 ${action.color}`} />
//                 <span className="text-sm font-medium">{action.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Progress Card */}
//           <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-5 shadow-lg">
//             <div className="flex items-center gap-2 mb-3">
//               <Rocket className="w-5 h-5 text-purple-400" />
//               <p className="text-sm font-bold text-white">Learning Progress</p>
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-xs">
//                 <span className="text-gray-400">Completion</span>
//                 <span className="text-purple-400 font-bold">33%</span>
//               </div>
//               <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                 <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 w-1/3 animate-pulse"></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Keep going! You're doing great 🎯</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// // Enhanced Page Header
// const PageHeader = ({ title, description, icon: Icon, gradient }) => {
//   return (
//     <div className="mb-10">
//       <div className="flex items-start gap-4 mb-4">
//         {Icon && (
//           <div className={`w-14 h-14 bg-gradient-to-br ${gradient || 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
//             <Icon className="w-7 h-7 text-white" />
//           </div>
//         )}
//         <div className="flex-1">
//           <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">{title}</h1>
//           {description && <p className="text-gray-400 text-lg leading-relaxed">{description}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Stats Card with gradient
// const StatsCard = ({ stat, index }) => {
//   const gradients = [
//     'from-blue-500 to-cyan-500',
//     'from-purple-500 to-pink-500',
//     'from-orange-500 to-red-500',
//     'from-green-500 to-emerald-500'
//   ];
  
//   return (
//     <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
//       <div className="flex items-center gap-3 mb-4">
//         <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % 4]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
//           <IconComponent iconName={stat.icon} className="w-6 h-6 text-white" />
//         </div>
//         <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
//       </div>
//       <p className="text-3xl font-bold text-white">{stat.value}</p>
//     </div>
//   );
// };

// // Enhanced Study Resource Card
// const StudyResourceCard = ({ resource, index }) => {
//   const icons = [BookOpen, FileText, Download, Award];
//   const Icon = icons[index % icons.length];
  
//   return (
//     <div className={`group relative bg-gradient-to-br ${resource.color} border ${resource.borderColor} rounded-2xl p-6 hover:scale-[1.02] transition-all cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden`}>
//       {/* Hover Effect Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
//       <div className="relative flex items-start gap-4">
//         <div className="text-5xl group-hover:scale-110 transition-transform">{resource.icon}</div>
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">{resource.title}</h3>
//           <p className="text-gray-400 text-sm leading-relaxed mb-4">{resource.desc}</p>
//           <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
//             <span>Access Resource</span>
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Feature Card Component
// const FeatureCard = ({ icon: Icon, title, items, gradient, borderColor }) => {
//   return (
//     <div className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}>
//       <div className="flex items-center gap-3 mb-6">
//         <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <h3 className="text-2xl font-bold text-white">{title}</h3>
//       </div>
//       <ul className="space-y-4">
//         {items.map((item, index) => (
//           <li key={index} className="flex items-start gap-3 text-gray-200">
//             <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//               <CheckCircle className="w-4 h-4 text-white" />
//             </div>
//             <span className="leading-relaxed">{item}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Overview Tab
// const OverviewTab = ({ practical }) => {
//   return (
//     <div className="space-y-10">
//       <PageHeader 
//         title="Experiment Overview" 
//         description={practical.description}
//         icon={Target}
//         gradient="from-blue-500 to-cyan-500"
//       />

//       {/* Stats Grid */}
//       <section>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {practical.stats.map((stat, index) => (
//             <StatsCard key={index} stat={stat} index={index} />
//           ))}
//         </div>
//       </section>

//       {/* Aim Section */}
//       <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 shadow-lg">
//         <div className="flex items-start gap-5">
//           <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
//             <Target className="w-7 h-7 text-white" />
//           </div>
//           <div className="flex-1">
//             <h2 className="text-2xl font-bold mb-4 text-blue-300">Aim of Experiment</h2>
//             <p className="text-gray-200 text-lg leading-relaxed">{practical.aim}</p>
//           </div>
//         </div>
//       </section>

//       {/* Study Resources */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <BookOpen className="w-8 h-8 text-blue-400" />
//           <h2 className="text-3xl font-bold text-white">Study Resources</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {practical.studyResources.map((resource, index) => (
//             <StudyResourceCard key={index} resource={resource} index={index} />
//           ))}
//         </div>
//       </section>

//       {/* Quick Summary */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Brain className="w-8 h-8 text-purple-400" />
//           <h2 className="text-3xl font-bold text-white">Quick Summary</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FeatureCard
//             icon={Lightbulb}
//             title="Key Concepts"
//             items={practical.keyConcepts.slice(0, 4).map(c => c.title.replace(/[🔬⚡📊🧲⏧]/g, '').trim())}
//             gradient="from-blue-900/20 to-purple-900/20"
//             borderColor="border-blue-500/30"
//           />
//           <FeatureCard
//             icon={Zap}
//             title="Applications"
//             items={practical.applications.slice(0, 4).map(a => a.title.replace(/[🏭🔌📱🎧🚗🍳]/g, '').trim())}
//             gradient="from-green-900/20 to-emerald-900/20"
//             borderColor="border-green-500/30"
//           />
//         </div>
//       </section>

//       {/* Video Tutorial */}
//       {practical.video && (
//         <section>
//           <div className="flex items-center gap-3 mb-6">
//             <Video className="w-8 h-8 text-pink-400" />
//             <h2 className="text-3xl font-bold text-white">Video Tutorial</h2>
//           </div>
//           <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-blue-500/30 transition-all">
//             <video className='w-full h-full' src={practical.video.url} width="800" height="450" controls />
//           </div>
//         </section>
//       )}

//       {/* Simulation Guide */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Beaker className="w-8 h-8 text-green-400" />
//           <h2 className="text-3xl font-bold text-white">Interactive Simulation Guide</h2>
//         </div>
//         <div className="space-y-4">
//           {practical.simulationGuide.map((step, index) => (
//             <div key={index} className="group flex gap-5 items-start bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
//                 <span className="text-white font-bold">{index + 1}</span>
//               </div>
//               <p className="text-gray-300 leading-relaxed pt-2 flex-1">{step}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// // Theory Tab (continued in next part due to length)
// const TheoryTab = ({ practical }) => {
//   return (
//     <div className="space-y-10">
//       <PageHeader 
//         title="Theory & Concepts" 
//         description="Understand the fundamental principles behind this experiment"
//         icon={Lightbulb}
//         gradient="from-purple-500 to-pink-500"
//       />

//       {/* Theory Text */}
//       <section className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-8 shadow-lg">
//         <p className="text-gray-300 leading-relaxed text-lg">{practical.theory}</p>
//       </section>

//       {/* The Equation */}
//       <section className="relative bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border border-purple-500/30 rounded-2xl p-12 shadow-2xl overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
//         <div className="relative">
//           <h2 className="text-3xl font-bold mb-8 text-purple-300 text-center">The Fundamental Equation</h2>
//           <div className="text-center mb-10">
//             <p className="text-8xl font-bold text-white mb-4 tracking-tight">{practical.equation}</p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
//             {practical.equationDetails.map((detail, index) => (
//               <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 hover:bg-gray-800/60 transition-all">
//                 <p className="text-gray-200 text-center font-medium">{detail}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Key Concepts */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Brain className="w-8 h-8 text-blue-400" />
//           <h2 className="text-3xl font-bold text-white">Key Concepts Explained</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {practical.keyConcepts.map((concept, index) => (
//             <div key={concept.id} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-7 hover:border-blue-500/50 hover:scale-[1.02] transition-all shadow-lg">
//               <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
//                   <span className="text-2xl">{index + 1}</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-white pt-2 flex-1">{concept.title}</h3>
//               </div>
//               <p className="text-blue-400 font-semibold mb-3 text-sm">{concept.summary}</p>
//               <p className="text-gray-400 leading-relaxed">{concept.details}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Applications */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Zap className="w-8 h-8 text-yellow-400" />
//           <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {practical.applications.map((app, index) => (
//             <div key={index} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-6 hover:border-yellow-500/50 hover:scale-105 transition-all shadow-lg">
//               <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-all">
//                 <Zap className="w-6 h-6 text-yellow-400" />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">{app.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Timeline */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Calendar className="w-8 h-8 text-purple-400" />
//           <h2 className="text-3xl font-bold text-white">Historical Timeline</h2>
//         </div>
//         <div className="relative space-y-6">
//           {/* Gradient Timeline Line */}
//           <div className="absolute left-[58px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          
//           {practical.timeline.map((event, index) => (
//             <div key={index} className="flex gap-6 items-start relative">
//               <div className="w-28 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold px-5 py-4 rounded-2xl text-center flex-shrink-0 shadow-xl z-10 border-4 border-gray-900">
//                 <div className="text-xl font-black">{event.year}</div>
//               </div>
//               <div className="flex-1 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-7 hover:border-purple-500/30 transition-all shadow-lg hover:shadow-xl">
//                 <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{event.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// // Procedure Tab
// const ProcedureTab = ({ practical }) => {
//   return (
//     <div className="space-y-10">
//       <PageHeader 
//         title="Procedure & Setup" 
//         description="Follow these steps carefully to conduct the experiment successfully"
//         icon={Beaker}
//         gradient="from-green-500 to-emerald-500"
//       />

//       {/* Materials Required */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <CheckCircle className="w-8 h-8 text-green-400" />
//           <h2 className="text-3xl font-bold text-white">Materials Required</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {practical.materials.map((material, index) => (
//             <div key={index} className="group flex items-center gap-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-xl p-5 hover:border-green-500/30 transition-all hover:scale-[1.02]">
//               <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-all">
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//               </div>
//               <span className="text-gray-300 font-medium">{material}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Circuit Diagram */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Target className="w-8 h-8 text-blue-400" />
//           <h2 className="text-3xl font-bold text-white">Circuit Diagram / Setup</h2>
//         </div>
//         <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-8 shadow-lg">
//           <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">{practical.circuitDiagram}</p>
//         </div>
//       </section>

//       {/* Procedure Steps */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <Star className="w-8 h-8 text-yellow-400" />
//           <h2 className="text-3xl font-bold text-white">Step-by-Step Procedure</h2>
//         </div>
//         <div className="space-y-5">
//           {practical.procedure.map((step, index) => (
//             <div key={index} className="group flex gap-6 items-start bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl p-7 hover:border-blue-500/30 hover:bg-gray-800/50 transition-all shadow-lg">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform border-4 border-gray-900">
//                 <span className="text-xl">{index + 1}</span>
//               </div>
//               <p className="text-gray-300 pt-3 leading-relaxed flex-1 text-lg">{step}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Precautions */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-8 h-8 text-yellow-400">⚠️</div>
//           <h2 className="text-3xl font-bold text-white">Safety Precautions</h2>
//         </div>
//         <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-8 shadow-lg">
//           <div className="space-y-4">
//             {practical.precautions.map((precaution, index) => (
//               <div key={index} className="flex items-start gap-4 bg-gray-900/40 border border-yellow-500/20 p-5 rounded-xl hover:bg-gray-900/60 transition-all">
//                 <span className="text-yellow-400 text-2xl flex-shrink-0">⚠</span>
//                 <span className="text-gray-300 leading-relaxed pt-1">{precaution}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Observations Tab
// const ObservationsTab = ({ practical }) => {
//   return (
//     <div className="space-y-10">
//       <PageHeader 
//         title="Observations & Results" 
//         description="Record your measurements and analyze the experimental data"
//         icon={BarChart3}
//         gradient="from-orange-500 to-red-500"
//       />

//       {/* Observation Table */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <BarChart3 className="w-8 h-8 text-orange-400" />
//           <h2 className="text-3xl font-bold text-white">Observation Table</h2>
//         </div>
//         <div className="overflow-x-auto bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-2xl shadow-lg">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-orange-900/50 to-red-900/50">
//               <tr>
//                 {Object.keys(practical.observations.table[0]).map((header) => (
//                   <th key={header} className="border-b border-gray-700 px-6 py-5 text-left text-orange-300 font-bold uppercase text-sm tracking-wider">
//                     {header.replace(/([A-Z])/g, ' $1').trim()}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {practical.observations.table.map((row, index) => (
//                 <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-900/40' : 'bg-gray-800/40'} hover:bg-gray-700/40 transition-colors`}>
//                   {Object.values(row).map((value, i) => (
//                     <td key={i} className="border-b border-gray-800 px-6 py-5 text-gray-300 font-medium">
//                       {value}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Graph Description */}
//       {practical.observations.graphDescription && (
//         <section>
//           <div className="flex items-center gap-3 mb-6">
//             <TrendingUp className="w-8 h-8 text-blue-400" />
//             <h2 className="text-3xl font-bold text-white">Graph Analysis</h2>
//           </div>
//           <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 shadow-lg">
//             <p className="text-gray-300 text-lg leading-relaxed">{practical.observations.graphDescription}</p>
//           </div>
//         </section>
//       )}

//       {/* Result */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <CheckCircle className="w-8 h-8 text-green-400" />
//           <h2 className="text-3xl font-bold text-white">Final Result</h2>
//         </div>
//         <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/40 rounded-2xl p-10 shadow-2xl">
//           <div className="flex items-center gap-4 mb-4">
//             <CheckCircle className="w-12 h-12 text-green-400" />
//             <p className="text-gray-200 text-2xl font-bold leading-relaxed flex-1">{practical.result}</p>
//           </div>
//         </div>
//       </section>

//       {/* Sources of Error */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-8 h-8 text-red-400">🔍</div>
//           <h2 className="text-3xl font-bold text-white">Sources of Error</h2>
//         </div>
//         <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8 shadow-lg">
//           <div className="space-y-4">
//             {practical.sourcesOfError.map((error, index) => (
//               <div key={index} className="flex items-start gap-4 bg-gray-900/40 border border-red-500/20 p-5 rounded-xl hover:bg-gray-900/60 transition-all">
//                 <span className="text-red-400 text-xl flex-shrink-0">•</span>
//                 <span className="text-gray-300 leading-relaxed">{error}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Quiz Tab
// const QuizTab = ({ practical }) => {
//   const [quizAnswers, setQuizAnswers] = useState({});
//   const [showQuizResults, setShowQuizResults] = useState(false);

//   const handleQuizAnswer = (questionIndex, optionIndex) => {
//     setQuizAnswers({
//       ...quizAnswers,
//       [questionIndex]: optionIndex
//     });
//   };

//   const calculateQuizScore = () => {
//     let correct = 0;
//     practical.quiz.questions.forEach((q, index) => {
//       if (quizAnswers[index] === q.correct) {
//         correct++;
//       }
//     });
//     return correct;
//   };

//   const scorePercentage = (calculateQuizScore() / practical.quiz.questions.length) * 100;

//   return (
//     <div className="space-y-10">
//       <PageHeader 
//         title={practical.quiz.title} 
//         description="Test your knowledge and track your learning progress"
//         icon={Award}
//         gradient="from-yellow-500 to-amber-500"
//       />

//       <div className="space-y-6">
//         {practical.quiz.questions.map((question, qIndex) => (
//           <div key={qIndex} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-2xl p-8 hover:border-blue-500/30 transition-all shadow-lg">
//             <div className="flex items-start gap-4 mb-6">
//               <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
//                 {qIndex + 1}
//               </div>
//               <h3 className="text-xl font-semibold text-white pt-3 flex-1">{question.q}</h3>
//             </div>
//             <div className="space-y-3">
//               {question.options.map((option, oIndex) => (
//                 <button
//                   key={oIndex}
//                   onClick={() => handleQuizAnswer(qIndex, oIndex)}
//                   className={`w-full text-left p-6 rounded-xl border-2 transition-all font-medium ${
//                     quizAnswers[qIndex] === oIndex
//                       ? showQuizResults
//                         ? oIndex === question.correct
//                           ? 'bg-green-900/40 border-green-500 text-white shadow-xl shadow-green-500/20 scale-[1.02]'
//                           : 'bg-red-900/40 border-red-500 text-white shadow-xl shadow-red-500/20'
//                         : 'bg-blue-900/40 border-blue-500 text-white shadow-xl shadow-blue-500/20 scale-[1.02]'
//                       : 'bg-gray-900/40 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/40 hover:scale-[1.01]'
//                   }`}
//                 >
//                   <span className="font-bold mr-3 text-lg">{String.fromCharCode(65 + oIndex)}.</span>
//                   {option}
//                 </button>
//               ))}
//             </div>
//             {showQuizResults && (
//               <div className="mt-6 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl">
//                 <div className="flex items-start gap-4">
//                   <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Lightbulb className="w-6 h-6 text-blue-400" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-blue-400 font-bold mb-3 text-lg">Explanation:</p>
//                     <p className="text-gray-300 leading-relaxed text-lg">{question.explain}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="text-center">
//         <button
//           onClick={() => setShowQuizResults(!showQuizResults)}
//           className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 text-lg"
//         >
//           {showQuizResults ? '🔄 Hide Results' : '✓ Submit Quiz'}
//         </button>
        
//         {showQuizResults && (
//           <div className="mt-10 p-10 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/40 rounded-2xl max-w-3xl mx-auto shadow-2xl">
//             <div className="flex items-center justify-center gap-6 mb-6">
//               <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Award className="w-10 h-10 text-white" />
//               </div>
//               <div className="text-left">
//                 <p className="text-6xl font-black text-white mb-2">
//                   {calculateQuizScore()}/{practical.quiz.questions.length}
//                 </p>
//                 <p className="text-gray-400 text-xl">Score: {scorePercentage.toFixed(0)}%</p>
//               </div>
//             </div>
//             <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
//               <div 
//                 className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 transition-all duration-1000"
//                 style={{ width: `${scorePercentage}%` }}
//               ></div>
//             </div>
//             <p className="text-gray-200 text-xl font-medium">
//               {scorePercentage === 100
//                 ? '🎉 Perfect Score! You\'ve mastered this practical!'
//                 : scorePercentage >= 70
//                 ? '👍 Great job! Review the explanations to fill knowledge gaps.'
//                 : '📚 Keep learning! Review the theory section and try again.'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // FAQs Tab
// const FAQsTab = ({ practical }) => {
//   return (
//     <div className="space-y-8">
//       <PageHeader 
//         title="Frequently Asked Questions" 
//         description="Common questions and detailed answers about this experiment"
//         icon={HelpCircle}
//         gradient="from-pink-500 to-rose-500"
//       />
      
//       <div className="space-y-4">
//         {practical.faqs.map((faq) => (
//           <CollapsibleSection key={faq.id} title={faq.q} icon={HelpCircle}>
//             <p className="text-gray-300 leading-relaxed text-lg">{faq.a}</p>
//           </CollapsibleSection>
//         ))}
//       </div>
      
//       {/* Viva Questions */}
//       <div className="mt-16">
//         <div className="flex items-center gap-3 mb-6">
//           <MessageSquare className="w-8 h-8 text-purple-400" />
//           <h2 className="text-3xl font-bold text-white">Viva Questions & Answers</h2>
//         </div>
//         <div className="space-y-4">
//           {practical.vivaQuestions.map((viva, index) => (
//             <CollapsibleSection key={index} title={viva.q} icon={MessageSquare}>
//               <p className="text-gray-300 leading-relaxed text-lg">{viva.a}</p>
//             </CollapsibleSection>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Component
// const PracticalExperiment = () => {
//   const {id} = useParams()
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const practical = practicalsData.find(p => p.title === id);

//   if (!practical) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-8">
//         <div className="text-center">
//           <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <X className="w-10 h-10 text-red-500" />
//           </div>
//           <h1 className="text-4xl font-bold text-red-400 mb-4">Practical Not Found</h1>
//           <p className="text-gray-400 text-lg">The requested experiment does not exist in our database.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
//       <div className="flex">
//         <Sidebar 
//           activeTab={activeTab} 
//           setActiveTab={setActiveTab} 
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//           practical={practical}
//         />

//         <main className="flex-1 min-h-screen">
//           <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-12 lg:py-20">
//             {activeTab === 'overview' && <OverviewTab practical={practical} />}
//             {activeTab === 'theory' && <TheoryTab practical={practical} />}
//             {activeTab === 'procedure' && <ProcedureTab practical={practical} />}
//             {activeTab === 'observations' && <ObservationsTab practical={practical} />}
//             {activeTab === 'quiz' && <QuizTab practical={practical} />}
//             {activeTab === 'faqs' && <FAQsTab practical={practical} />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PracticalExperiment;
import React, { useState, useEffect } from 'react';
import { 
  Clock, BookOpen, TrendingUp, Zap, ChevronDown, ChevronUp, Play, 
  Download, FileText, Video, Menu, X, ChevronRight, CheckCircle,
  Award, Lightbulb, Target, Beaker, BarChart3, HelpCircle, MessageSquare,
  ArrowRight, Star, Calendar, Sparkles, Brain, Rocket, BookMarked
} from 'lucide-react';
import practicalsData from './practicals-data.json';
import { Link, useParams } from 'react-router-dom';

// Icon mapping component
const IconComponent = ({ iconName, className }) => {
  const icons = { Clock, BookOpen, TrendingUp, Zap };
  const Icon = icons[iconName] || Clock;
  return <Icon className={className} />;
};

// Collapsible Section Component with enhanced design
const CollapsibleSection = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-cyan-500/20 rounded-xl overflow-hidden bg-gray-900/40 backdrop-blur-sm hover:border-cyan-500/40 transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 flex justify-between items-center hover:from-cyan-600/20 hover:to-blue-600/20 transition-all group"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />}
          <h3 className="text-base font-semibold text-white text-left group-hover:text-cyan-100 transition-colors">{title}</h3>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="text-gray-400 w-5 h-5" />
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-5 bg-gray-900/20">
          {children}
        </div>
      </div>
    </div>
  );
};

// Centered Tab Navigation (horizontally centered)
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'theory', label: 'Theory', icon: Lightbulb },
    { id: 'procedure', label: 'Procedure', icon: Beaker },
    { id: 'observations', label: 'Observations', icon: BarChart3 },
    { id: 'quiz', label: 'Quiz', icon: Award },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 md:h-16">
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-wrap">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all flex items-center gap-1 lg:gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden text-xs">{item.label.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex-1"></div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg text-cyan-400 hover:bg-gray-800/50 transition-all"
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden border-t border-cyan-500/20 py-3 px-2 grid grid-cols-2 gap-2 pb-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setShowMenu(false);
                  }}
                  className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

// Enhanced Page Header
const PageHeader = ({ title, description, icon: Icon, gradient }) => {
  return (
    <div className="mb-10">
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className={`w-14 h-14 bg-gradient-to-br ${gradient || 'from-cyan-500 to-blue-500'} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">{title}</h1>
          {description && <p className="text-gray-400 text-lg leading-relaxed">{description}</p>}
        </div>
      </div>
    </div>
  );
};

// Stats Card with new shape
const StatsCard = ({ stat, index }) => {
  const gradients = [
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
  ];
  
  return (
    <div className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % 4]} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <IconComponent iconName={stat.icon} className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{stat.value}</p>
    </div>
  );
};

// Enhanced Study Resource Card
const StudyResourceCard = ({ resource, index }) => {
  const icons = [BookOpen, FileText, Download, Award];
  const Icon = icons[index % icons.length];
  
  return (
    <div className={`group relative bg-gradient-to-br ${resource.color} border ${resource.borderColor} rounded-xl p-6 hover:scale-[1.02] transition-all cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative flex items-start gap-4">
        <div className="text-4xl group-hover:scale-110 transition-transform">{resource.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">{resource.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{resource.desc}</p>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Access Resource</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, items, gradient, borderColor }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-200">
            <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ practical }) => {
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Experiment Overview" 
        description={practical.description}
        icon={Target}
        gradient="from-cyan-500 to-blue-500"
      />

      {/* Stats Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {practical.stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </section>

      {/* Aim Section */}
      <section className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8 shadow-lg">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Aim of Experiment</h2>
            <p className="text-gray-200 text-lg leading-relaxed">{practical.aim}</p>
          </div>
        </div>
      </section>

      {/* Study Resources */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Study Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {practical.studyResources.map((resource, index) => (
            <StudyResourceCard key={index} resource={resource} index={index} />
          ))}
        </div>
      </section>

      {/* Quick Summary */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Quick Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Lightbulb}
            title="Key Concepts"
            items={practical.keyConcepts.slice(0, 4).map(c => c.title.replace(/[🔬⚡📊🧲⏧]/g, '').trim())}
            gradient="from-cyan-900/20 to-blue-900/20"
            borderColor="border-cyan-500/30"
          />
          <FeatureCard
            icon={Zap}
            title="Applications"
            items={practical.applications.slice(0, 4).map(a => a.title.replace(/[🏭🔌📱🎧🚗🍳]/g, '').trim())}
            gradient="from-green-900/20 to-emerald-900/20"
            borderColor="border-green-500/30"
          />
        </div>
      </section>

      {/* Video Tutorial */}
      {practical.video && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Video Tutorial</h2>
          </div>
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <video className='w-full h-full' src={practical.video.url} width="800" height="450" controls />
          </div>
        </section>
      )}

      {/* Simulation Guide */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Interactive Simulation Guide</h2>
        </div>
        <div className="space-y-4">
          {practical.simulationGuide.map((step, index) => (
            <div key={index} className="group flex gap-5 items-start bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 hover:bg-gray-800/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 border-4 border-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-300 leading-relaxed pt-2 flex-1">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Theory Tab
const TheoryTab = ({ practical }) => {
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Theory & Concepts" 
        description="Understand the fundamental principles behind this experiment"
        icon={Lightbulb}
        gradient="from-purple-500 to-pink-500"
      />

      {/* Theory Text */}
      <section className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-8 shadow-lg">
        <p className="text-gray-300 leading-relaxed text-lg">{practical.theory}</p>
      </section>

      {/* The Equation */}
      <section className="relative bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border border-purple-500/30 rounded-xl p-12 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8 text-purple-300 text-center">The Fundamental Equation</h2>
          <div className="text-center mb-10 overflow-x-auto">
            <p className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">{practical.equation}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {practical.equationDetails.map((detail, index) => (
              <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-purple-500/20 rounded-lg p-5 hover:bg-gray-800/60 transition-all">
                <p className="text-gray-200 text-center font-medium text-sm md:text-base">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Concepts */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Key Concepts Explained</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practical.keyConcepts.map((concept, index) => (
            <div key={concept.id} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-7 hover:border-cyan-500/40 hover:scale-[1.02] transition-all shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white pt-2 flex-1">{concept.title}</h3>
              </div>
              <p className="text-cyan-400 font-semibold mb-3 text-sm">{concept.summary}</p>
              <p className="text-gray-400 leading-relaxed">{concept.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {practical.applications.map((app, index) => (
            <div key={index} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 hover:scale-105 transition-all shadow-lg">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-all">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">{app.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Historical Timeline</h2>
        </div>
        <div className="relative space-y-6">
          <div className="absolute left-[29px] sm:left-[58px] top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
          
          {practical.timeline.map((event, index) => (
            <div key={index} className="flex gap-4 sm:gap-6 items-start relative">
              <div className="w-14 sm:w-28 bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold px-3 sm:px-5 py-2 sm:py-4 rounded-lg text-center flex-shrink-0 shadow-xl z-10 border-4 border-gray-900">
                <div className="text-lg sm:text-xl font-black">{event.year}</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-5 sm:p-7 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Procedure Tab
const ProcedureTab = ({ practical }) => {
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Procedure & Setup" 
        description="Follow these steps carefully to conduct the experiment successfully"
        icon={Beaker}
        gradient="from-green-500 to-emerald-500"
      />

      {/* Materials Required */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-bold text-white">Materials Required</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {practical.materials.map((material, index) => (
            <div key={index} className="group flex items-center gap-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-green-500/20 rounded-lg p-5 hover:border-green-500/40 transition-all hover:scale-[1.02]">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-all">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-300 font-medium">{material}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Circuit Diagram */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Circuit Diagram / Setup</h2>
        </div>
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-8 shadow-lg overflow-x-auto">
          <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">{practical.circuitDiagram}</p>
        </div>
      </section>

      {/* Procedure Steps */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Step-by-Step Procedure</h2>
        </div>
        <div className="space-y-5">
          {practical.procedure.map((step, index) => (
            <div key={index} className="group flex gap-6 items-start bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-cyan-500/20 rounded-xl p-7 hover:border-cyan-500/40 hover:bg-gray-800/50 transition-all shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-lg flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform border-4 border-gray-900">
                <span className="text-xl">{index + 1}</span>
              </div>
              <p className="text-gray-300 pt-3 leading-relaxed flex-1 text-lg">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Precautions */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 text-yellow-400">⚠️</div>
          <h2 className="text-3xl font-bold text-white">Safety Precautions</h2>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-8 shadow-lg">
          <div className="space-y-4">
            {practical.precautions.map((precaution, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-900/40 border border-yellow-500/20 p-5 rounded-lg hover:bg-gray-900/60 transition-all">
                <span className="text-yellow-400 text-2xl flex-shrink-0">⚠</span>
                <span className="text-gray-300 leading-relaxed pt-1">{precaution}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Observations Tab
const ObservationsTab = ({ practical }) => {
  return (
    <div className="space-y-10">
      <PageHeader 
        title="Observations & Results" 
        description="Record your measurements and analyze the experimental data"
        icon={BarChart3}
        gradient="from-orange-500 to-red-500"
      />

      {/* Observation Table */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-orange-400" />
          <h2 className="text-3xl font-bold text-white">Observation Table</h2>
        </div>
        <div className="overflow-x-auto bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-orange-500/20 rounded-xl shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-900/50 to-red-900/50">
              <tr>
                {Object.keys(practical.observations.table[0]).map((header) => (
                  <th key={header} className="border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-5 text-left text-orange-300 font-bold uppercase text-xs sm:text-sm tracking-wider whitespace-nowrap">
                    {header.replace(/([A-Z])/g, ' $1').trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {practical.observations.table.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-900/40' : 'bg-gray-800/40'} hover:bg-gray-700/40 transition-colors`}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border-b border-gray-800 px-4 sm:px-6 py-4 sm:py-5 text-gray-300 font-medium text-sm whitespace-nowrap">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Graph Description */}
      {practical.observations.graphDescription && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Graph Analysis</h2>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8 shadow-lg">
            <p className="text-gray-300 text-lg leading-relaxed">{practical.observations.graphDescription}</p>
          </div>
        </section>
      )}

      {/* Result */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-bold text-white">Final Result</h2>
        </div>
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/40 rounded-xl p-10 shadow-2xl">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-400 flex-shrink-0" />
            <p className="text-gray-200 text-2xl font-bold leading-relaxed flex-1">{practical.result}</p>
          </div>
        </div>
      </section>

      {/* Sources of Error */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 text-red-400">🔍</div>
          <h2 className="text-3xl font-bold text-white">Sources of Error</h2>
        </div>
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-8 shadow-lg">
          <div className="space-y-4">
            {practical.sourcesOfError.map((error, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-900/40 border border-red-500/20 p-5 rounded-lg hover:bg-gray-900/60 transition-all">
                <span className="text-red-400 text-xl flex-shrink-0">•</span>
                <span className="text-gray-300 leading-relaxed">{error}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Quiz Tab
const QuizTab = ({ practical }) => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: optionIndex
    });
  };

  const calculateQuizScore = () => {
    let correct = 0;
    practical.quiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const scorePercentage = (calculateQuizScore() / practical.quiz.questions.length) * 100;

  return (
    <div className="space-y-10">
      <PageHeader 
        title={practical.quiz.title} 
        description="Test your knowledge and track your learning progress"
        icon={Award}
        gradient="from-yellow-500 to-amber-500"
      />

      <div className="space-y-6">
        {practical.quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/20 rounded-xl p-6 sm:p-8 hover:border-cyan-500/40 transition-all shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg text-sm sm:text-base">
                {qIndex + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white pt-2 sm:pt-3 flex-1">{question.q}</h3>
            </div>
            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  onClick={() => handleQuizAnswer(qIndex, oIndex)}
                  className={`w-full text-left p-4 sm:p-6 rounded-lg border-2 transition-all font-medium text-sm sm:text-base ${
                    quizAnswers[qIndex] === oIndex
                      ? showQuizResults
                        ? oIndex === question.correct
                          ? 'bg-green-900/40 border-green-500 text-white shadow-xl shadow-green-500/20 scale-[1.02]'
                          : 'bg-red-900/40 border-red-500 text-white shadow-xl shadow-red-500/20'
                        : 'bg-cyan-900/40 border-cyan-500 text-white shadow-xl shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-gray-900/40 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/40 hover:scale-[1.01]'
                  }`}
                >
                  <span className="font-bold mr-3 text-base sm:text-lg">{String.fromCharCode(65 + oIndex)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {showQuizResults && (
              <div className="mt-6 p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-cyan-400 font-bold mb-3 text-lg">Explanation:</p>
                    <p className="text-gray-300 leading-relaxed text-lg">{question.explain}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowQuizResults(!showQuizResults)}
          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-lg transition-all shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 text-base sm:text-lg"
        >
          {showQuizResults ? '🔄 Hide Results' : '✓ Submit Quiz'}
        </button>
        
        {showQuizResults && (
          <div className="mt-10 p-8 sm:p-10 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/40 rounded-xl max-w-3xl mx-auto shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center shadow-xl flex-shrink-0">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-4xl sm:text-6xl font-black text-white mb-2">
                  {calculateQuizScore()}/{practical.quiz.questions.length}
                </p>
                <p className="text-gray-400 text-lg sm:text-xl">Score: {scorePercentage.toFixed(0)}%</p>
              </div>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
            <p className="text-gray-200 text-lg sm:text-xl font-medium text-center">
              {scorePercentage === 100
                ? '🎉 Perfect Score! You\'ve mastered this practical!'
                : scorePercentage >= 70
                ? '👍 Great job! Review the explanations to fill knowledge gaps.'
                : '📚 Keep learning! Review the theory section and try again.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// FAQs Tab
const FAQsTab = ({ practical }) => {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Frequently Asked Questions" 
        description="Common questions and detailed answers about this experiment"
        icon={HelpCircle}
        gradient="from-pink-500 to-rose-500"
      />
      
      <div className="space-y-4">
        {practical.faqs.map((faq) => (
          <CollapsibleSection key={faq.id} title={faq.q} icon={HelpCircle}>
            <p className="text-gray-300 leading-relaxed text-lg">{faq.a}</p>
          </CollapsibleSection>
        ))}
      </div>
      
      {/* Viva Questions */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Viva Questions & Answers</h2>
        </div>
        <div className="space-y-4">
          {practical.vivaQuestions.map((viva, index) => (
            <CollapsibleSection key={index} title={viva.q} icon={MessageSquare}>
              <p className="text-gray-300 leading-relaxed text-lg">{viva.a}</p>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  );
};

// Start Experiment Modal
const StartExperimentModal = ({ practical, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl relative border border-cyan-500/30"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-gray-400 hover:text-cyan-400"
        >
          ×
        </button>

        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-4">
            LAB EXPERIMENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {practical.title}
          </h2>
          <p className="text-gray-400 text-sm">
            {practical.description}
          </p>
        </div>

        <div className="mb-8 p-6 rounded-2xl border border-gray-800 bg-gray-900/30">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            What You'll Learn
          </h3>
          <ul className="space-y-3">
            {practical.keyConcepts?.slice(0, 6).map((concept, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-xs sm:text-sm">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-cyan-500/20"
                  style={{ color: '#00d4ff' }}
                >
                  ✓
                </div>
                <span>{concept.title?.replace(/[🔬⚡📊🧲⏧]/g, '').trim() || concept.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link to={`/allexp/${practical.title}`} onClick={onClose} className="block">
          <button
            className="w-full py-3 rounded-xl font-bold text-black transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 text-sm sm:text-base"
          >
            Start Lab Experiment →
          </button>
        </Link>
      </div>
    </div>
  );
};

// Main Component
const PracticalExperiment = () => {
  const {id} = useParams()
  const [activeTab, setActiveTab] = useState('overview');
  const [showStartModal, setShowStartModal] = useState(false);

  const practical = practicalsData.find(p => p.title === id);

  if (!practical) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">Practical Not Found</h1>
          <p className="text-gray-400 text-lg">The requested experiment does not exist in our database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      <main className="w-full pt-40 md:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
          {activeTab === 'overview' && <OverviewTab practical={practical} />}
          {activeTab === 'theory' && <TheoryTab practical={practical} />}
          {activeTab === 'procedure' && <ProcedureTab practical={practical} />}
          {activeTab === 'observations' && <ObservationsTab practical={practical} />}
          {activeTab === 'quiz' && <QuizTab practical={practical} />}
          {activeTab === 'faqs' && <FAQsTab practical={practical} />}
        </div>

        {/* Floating Start Experiment Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowStartModal(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-500 hover:via-green-400 hover:to-emerald-400 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 hover:scale-[1.05] active:scale-[0.98] text-sm sm:text-base"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
            <span className="hidden sm:inline">Start Experiment</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>
      </main>

      {/* Start Experiment Modal */}
      <StartExperimentModal 
        practical={practical} 
        isOpen={showStartModal} 
        onClose={() => setShowStartModal(false)} 
      />
    </div>
  );
};

export default PracticalExperiment;
