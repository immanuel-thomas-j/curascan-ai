import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Cpu, Code, ShieldAlert, Utensils, ArrowDown, Sparkles, CheckCircle, Globe, Zap, FileText, Image, FileImage, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import DotGrid from './DotGrid';
import SpecularButton from './SpecularButton';
import ClickSpark from './ClickSpark';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/30 text-slate-900 font-sans selection:bg-blue-200 overflow-hidden relative"
    >
      
      {/* Dot Grid Background */}
      <div 
        className="absolute top-0 inset-x-0 h-[850px] z-0 opacity-60 pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' 
        }}
      >
        <DotGrid
          dotSize={4}
          gap={28}
          baseColor="#cbd5e1"
          activeColor="#3b82f6"
          proximity={150}
          shockRadius={200}
          shockStrength={3}
        />
      </div>

      {/* Background ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* 1. GLASS HEADER */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">CuraScan</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-[12px] font-medium text-emerald-700 rounded-full border border-emerald-100/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              API Status: Online
            </span>
            <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <SpecularButton
                radius={999}
                tintOpacity={0}
                lineColor="#ffffff"
                baseColor="#0f172a"
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 !border-none"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </SpecularButton>
            </ClickSpark>
          </div>
        </div>
      </motion.header>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/80 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-full border border-blue-100 shadow-sm">
              <Zap className="w-4 h-4" />
              <span>Build with Gemini Hackathon Submission</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Intelligent <br/> Clinical Forensics.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg">
              Prevent deadly contraindications before they happen. CuraScan orchestrates Google Gemini 2.5 to cross-reference prescriptions, lab reports, and meals in real-time.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <ClickSpark sparkColor='#fff' sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
                <SpecularButton
                  radius={999}
                  tintOpacity={0}
                  lineColor="#ffffff"
                  baseColor="#2563eb"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-1 !border-none"
                >
                  <span>Start Analyzing</span>
                  <ArrowRight className="w-5 h-5" />
                </SpecularButton>
              </ClickSpark>
            </motion.div>
          </motion.div>

          {/* Hero Visual: Premium Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-emerald-50 rounded-[3rem] transform rotate-3 scale-105 opacity-50 blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5">
              
              <div className="flex flex-col relative">
                {/* Static Pipeline Line */}
                <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-slate-200 via-blue-200 to-emerald-200 opacity-60 z-0"></div>
                
                {/* Animated Data Packet */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-24 rounded-full bg-gradient-to-b from-transparent via-blue-500 to-emerald-400 z-0"
                  style={{ boxShadow: '0 0 15px 4px rgba(59, 130, 246, 0.4)' }}
                  animate={{ top: ["5%", "95%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                {/* 1. Inputs Node */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xl border border-slate-100 p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-5 flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                    <Layers className="w-4 h-4" /> Data Ingestion
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                      <Image className="w-4 h-4 text-blue-500" />
                      prescription_1.jpg
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-200 transition-all">
                      <FileText className="w-4 h-4 text-rose-500" />
                      renal_panel.pdf
                    </div>
                  </div>
                </div>
                
                {/* 2. Processing Node */}
                <div className="relative z-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[2px] rounded-[2rem] shadow-2xl shadow-blue-500/30 mb-5 transform hover:scale-[1.02] transition-all duration-300">
                  <div className="bg-slate-900 rounded-[1.9rem] p-5 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"></div>
                    
                    <div className="flex items-center justify-center gap-2 text-white font-bold mb-2 relative z-10">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <span className="text-base tracking-tight">Google Gemini 2.5 Flash</span>
                    </div>
                    <div className="relative z-10 flex justify-center">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-[9px] font-bold tracking-widest uppercase border border-blue-500/20 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Multimodal Reasoning Engine
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Output Node */}
                <div className="relative z-10 bg-[#0f111a] border border-slate-700/50 p-5 rounded-[2rem] shadow-2xl shadow-slate-900/60 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide">
                      <Code className="w-4 h-4" />
                      <span>Structured JSON Payload</span>
                    </div>
                    <div className="flex gap-1.5 opacity-80">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                    </div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-[11.5px] font-mono bg-black/60 p-5 rounded-xl overflow-x-auto border border-white/5 leading-relaxed shadow-inner"
                  >
                    <div className="text-slate-400">
                      <span className="text-slate-500">{'{'}</span><br/>
                      <span className="text-blue-300 ml-4">"safetyLevel"</span>: <span className="text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">"CRITICAL"</span>,<br/>
                      <span className="text-blue-300 ml-4">"alerts"</span>: <span className="text-slate-500">[{'{'}</span><br/>
                      <span className="text-blue-300 ml-8">"severity"</span>: <span className="text-amber-400 font-semibold">"High"</span>,<br/>
                      <span className="text-blue-300 ml-8">"issue"</span>: <span className="text-amber-400 font-semibold">"Metformin strictly contraindicates</span><br/>
                      <span className="text-amber-400 font-semibold ml-8">with underlying eGFR of 35"</span><br/>
                      <span className="text-slate-500 ml-4">{'}'}]</span><br/>
                      <span className="text-slate-500">{'}'}</span>
                    </div>
                  </motion.div>
                </div>
                
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. THE HACKATHON STORY */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            
            {[
              { num: "01", heading: "Silent contraindications kill.", desc: "Patients cannot manually correlate isolated lab results against complex new prescriptions, leading to fatal adverse drug events (ADEs)." },
              { num: "02", heading: "Live multi-document correlation.", desc: "We built a deterministic pipeline that feeds disparate medical documents into a unified reasoning engine to audit interactions instantly." },
              { num: "03", heading: "Multimodal context window.", desc: "Gemini 2.5 Flash acts as the core CPU. Its massive context window digests PDFs and images simultaneously, returning strict JSON payloads." },
              { num: "04", heading: "A pocket clinical pharmacologist.", desc: "A zero-friction dashboard that empowers patients to verify their safety, check dietary conflicts, and ask follow-up questions in their native language." }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white/60 backdrop-blur-lg border border-white/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all hover:-translate-y-1">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mb-6">
                  {item.num}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{item.heading}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>

      {/* 4. PRODUCT DEMONSTRATION */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6">Core Capabilities</h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">We didn't just add a chat box. We wired Gemini deeply into the product architecture to solve specialized clinical problems.</p>
        </motion.div>

        {/* Feature 1 */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="w-14 h-14 bg-rose-100 text-rose-600 flex items-center justify-center rounded-2xl shadow-sm">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Cross-Document Contraindication Engine</h3>
            <p className="text-slate-600 leading-relaxed text-lg">Upload a prescription image and a blood test PDF simultaneously. The system uses Gemini's multimodal window to cross-reference both, ensuring prescribed drugs are safe against historical metrics.</p>
            <ul className="space-y-4 text-sm text-slate-700 font-medium pt-2">
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-emerald-600"/></div> Reads handwritten JPGs</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-emerald-600"/></div> Parses tabular PDF data</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-emerald-600"/></div> Enforces strict JSON schemas</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
              <div className="bg-white border border-rose-100 shadow-lg shadow-rose-100/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-rose-600 font-bold text-sm mb-5">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                  <span>Cross-Document Alert Detected</span>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100/60 p-5 rounded-xl flex gap-4">
                  <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-rose-900 mb-1">Critical Danger</p>
                    <p className="text-sm text-rose-700 leading-relaxed">Prescription dictates <span className="font-bold">Metformin 500mg</span>. However, uploaded Renal Panel PDF indicates <span className="font-bold">eGFR is 35</span>. Metformin is strictly contraindicated in severe renal impairment.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
              <div className="bg-white border border-slate-100 shadow-lg rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                <div className="sm:w-2/5 bg-slate-50 flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-slate-100">
                  <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <Utensils className="w-8 h-8 text-orange-400" />
                    <span className="text-xs font-medium text-slate-500">grapefruit.jpg</span>
                  </div>
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                  <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full w-fit mb-4">
                    Dietary Warning
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">Food Identified: Grapefruit</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Dangerous interaction detected. Your profile shows an active prescription for <span className="font-bold text-slate-900">Atorvastatin</span>. Grapefruit inhibits the CYP3A4 enzyme, increasing statin toxicity.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 order-1 lg:order-2 space-y-6"
          >
            <div className="w-14 h-14 bg-orange-100 text-orange-600 flex items-center justify-center rounded-2xl shadow-sm">
              <Utensils className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Multimodal Meal Safety Checker</h3>
            <p className="text-slate-600 leading-relaxed text-lg">Before taking a bite, patients can snap a photo of their meal. We pass the image directly into Gemini Vision alongside their medical audit to instantly identify hidden drug-food interactions.</p>
          </motion.div>
        </div>

        {/* Feature 3 */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="w-14 h-14 bg-violet-100 text-violet-600 flex items-center justify-center rounded-2xl shadow-sm">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Live Translation & Audio Narration</h3>
            <p className="text-slate-600 leading-relaxed text-lg">Medical jargon is useless if patients can't understand it. Our interface translates clinical advice into regional languages on-the-fly, hooking directly into the Web Speech API for native audio.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50">
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Live Narration</p>
                    <p className="text-xs text-slate-500 mt-0.5">Translating to Hindi...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs font-semibold text-slate-700 border border-slate-100">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>HINDI (hi-IN)</span>
                </div>
              </div>
              
              <div className="mt-6 bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-emerald-400 font-mono text-[11px] leading-relaxed opacity-90">
                  &gt; Call Gemini API (gemini-2.5-flash)<br/>
                  &gt; Payload: {`{ text: "Take meds", target: "Hindi" }`}<br/>
                  &gt; Received: "दवा लें"<br/>
                  &gt; Executing window.speechSynthesis...
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>CuraScan Forensics</span>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            <p>Built for the Build with Gemini Hackathon.</p>
            <p className="mt-1 opacity-80">Designed with React, Vite, Framer Motion and Google Gemini API.</p>
          </div>
        </div>
      </footer>

    </motion.div>
  );
}
