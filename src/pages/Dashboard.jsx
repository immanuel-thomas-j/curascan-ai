import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';
import DocumentUploader from '../components/DocumentUploader';
import DocumentViewer from '../components/DocumentViewer';
import DiagnosticOverview from '../components/DiagnosticOverview';
import DrugInteractionMatrix from '../components/DrugInteractionMatrix';
import LabMetricsGauges from '../components/LabMetricsGauges';
import MedicationSchedule from '../components/MedicationSchedule';
import VoiceNarrationBar from '../components/VoiceNarrationBar';
import HealthPassportExport from '../components/HealthPassportExport';
import GeminiChat from '../components/GeminiChat';
import IndianHealthPanel from '../components/IndianHealthPanel';
import MealSafetyChecker from '../components/MealSafetyChecker';

import { analyzeMedicalDocument } from '../services/geminiService';
import { Activity, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ apiKey, setApiKey }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  const handleAnalyze = async ({ imageFiles, textPrompt }) => {
    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      const result = await analyzeMedicalDocument({
        imageFiles,
        textPrompt,
        apiKey
      });
      setAuditData(result);
      triggerConfetti();
    } catch (err) {
      console.error("Live Analysis Error:", err);
      if (err.message === "API_KEY_REQUIRED") {
        setErrorMessage("Please enter a valid Google Gemini API Key to run live clinical audits.");
        setShowKeyModal(true);
      } else {
        setErrorMessage(`Gemini API Error: ${err.message || 'Failed to process document image'}`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563EB', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans"
    >
      
      {/* Navbar */}
      <Navbar
        apiKey={apiKey}
        setApiKey={setApiKey}
        showModal={showKeyModal}
        setShowModal={setShowKeyModal}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8 overflow-hidden">
        
        {/* Workspace Banner */}
        <div className="p-6 sm:p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-3">
              <Activity className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Diagnostic Console Initialized</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Clinical Forensics Auditor
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Upload prescription images or diagnostic PDFs for live Gemini API processing.
            </p>
          </div>

          <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full shrink-0 flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Gemini Core: Active</span>
          </div>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-medium flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span className="truncate">{errorMessage}</span>
            </div>
            <button
              onClick={() => setShowKeyModal(true)}
              className="px-3 py-1.5 bg-white text-rose-600 rounded-lg text-xs font-bold border border-rose-200 shadow-sm hover:bg-rose-50 shrink-0 transition-colors"
            >
              Configure Key
            </button>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left: Upload + Source View */}
          <div className="lg:col-span-5 space-y-5">
            <DocumentUploader
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              apiKey={apiKey}
              onOpenKeyModal={() => setShowKeyModal(true)}
            />

            {auditData && (
              <DocumentViewer
                data={auditData}
                isAnalyzing={isAnalyzing}
              />
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 space-y-5 min-w-0">
            
            {auditData ? (
              <>
                {/* Cross-Document Alerts */}
                {auditData.crossDocumentAlerts && auditData.crossDocumentAlerts.length > 0 && (
                  <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 rounded-3xl p-6 space-y-4 shadow-lg shadow-rose-100/50">
                    <div className="flex items-center space-x-2 text-rose-800 font-bold">
                      <AlertCircle className="w-5 h-5" />
                      <h3 className="text-sm">Cross-Document Contraindication</h3>
                    </div>
                    {auditData.crossDocumentAlerts.map((alert, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-rose-100 flex items-start gap-3 shadow-sm">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-rose-900 mb-1">{alert.severity} Alert</p>
                          <p className="text-sm text-rose-700 leading-relaxed">{alert.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <VoiceNarrationBar
                  text={auditData.voiceNarration}
                  patientName={auditData.patientName}
                  apiKey={apiKey}
                />

                <DiagnosticOverview data={auditData} />

                <DrugInteractionMatrix interactions={auditData.drugInteractions} />

                <LabMetricsGauges metrics={auditData.labMetrics} />

                <MedicationSchedule
                  medications={auditData.medications}
                  patientName={auditData.patientName}
                />

                {/* 🥗 Meal Safety Checker */}
                <MealSafetyChecker auditData={auditData} apiKey={apiKey} onOpenKeyModal={() => setShowKeyModal(true)} />

                {/* 🇮🇳 Indian Healthcare Integration */}
                <IndianHealthPanel data={auditData} />

                {/* 💬 Gemini Follow-up Chat */}
                <GeminiChat auditData={auditData} apiKey={apiKey} />

                <HealthPassportExport data={auditData} />
              </>
            ) : (
              <div className="p-12 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-3xl text-center space-y-4 shadow-xl shadow-slate-200/40 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Ready for Live Document Audit
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Upload a photo of a doctor's prescription or a diagnostic lab PDF using the left panel. CuraScan will process it live with Google Gemini API.
                </p>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 px-6 text-center text-xs text-slate-500 bg-white/80 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">CuraScan Health</span>
            <span className="text-slate-400">— Prescription & Diagnostic Safety Auditor</span>
          </div>
          <p className="font-medium">
            Build with Gemini Hackathon • Google Gemini API
          </p>
        </div>
      </footer>

    </motion.div>
  );
}
