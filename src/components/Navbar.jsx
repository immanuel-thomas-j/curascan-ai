import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Key, ExternalLink, ArrowLeft, Activity } from 'lucide-react';
import SpecularButton from './SpecularButton';
import ClickSpark from './ClickSpark';

export default function Navbar({ apiKey, setApiKey, showModal, setShowModal }) {
  const navigate = useNavigate();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const isModalOpen = showKeyModal || showModal;

  const openModal = () => {
    setTempKey(apiKey);
    setShowKeyModal(true);
    if (setShowModal) setShowModal(true);
  };

  const closeModal = () => {
    setShowKeyModal(false);
    if (setShowModal) setShowModal(false);
  };

  const handleSaveKey = () => {
    setApiKey(tempKey);
    closeModal();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm px-6">
        <div className="max-w-screen-2xl mx-auto h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">CuraScan</span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider leading-none mt-1">FORENSICS</span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ClickSpark sparkColor='#2563eb' sparkSize={8} sparkRadius={12} sparkCount={6} duration={350}>
              <SpecularButton
                radius={999}
                tintOpacity={0}
                lineColor="#3b82f6"
                baseColor="#f1f5f9"
                textColor="#334155"
                onClick={() => navigate('/')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow !border-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Console</span>
              </SpecularButton>
            </ClickSpark>

            {/* API Key Button */}
            <ClickSpark sparkColor={apiKey ? '#10b981' : '#fff'} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <SpecularButton
                radius={999}
                tintOpacity={0}
                lineColor={apiKey ? '#34d399' : '#ffffff'}
                baseColor={apiKey ? '#059669' : '#0f172a'}
                onClick={openModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-md hover:-translate-y-0.5 !border-none"
              >
                <Key className="w-4 h-4" />
                <span>{apiKey ? 'Key Active' : 'Set API Key'}</span>
              </SpecularButton>
            </ClickSpark>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white/95 backdrop-blur-2xl w-full max-w-md p-8 rounded-[2rem] border border-white/50 shadow-2xl shadow-blue-900/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl shadow-sm border border-blue-100">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">API Configuration</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Google Gemini 2.5 Access</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Enter your Google Gemini API key to enable live multimodal forensics. Keys are stored locally in your browser session.
            </p>

            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-6 transition-all"
            />

            <div className="flex items-center justify-between gap-4">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKey}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
