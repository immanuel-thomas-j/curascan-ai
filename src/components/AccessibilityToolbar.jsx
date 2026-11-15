import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Eye, ZapOff, Monitor, X, Minus, Plus, RotateCcw } from 'lucide-react';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('accessibility_settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 'base', // sm, base, lg, xl
      highContrast: false,
      dyslexiaFont: false,
      reduceMotion: false
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    
    // Apply settings to document.documentElement
    const root = document.documentElement;
    
    // Clear old classes first
    root.classList.remove('font-size-sm', 'font-size-lg', 'font-size-xl', 'high-contrast', 'dyslexia-font', 'reduce-motion');
    
    if (settings.fontSize !== 'base') {
      root.classList.add(`font-size-${settings.fontSize}`);
    }
    if (settings.highContrast) root.classList.add('high-contrast');
    if (settings.dyslexiaFont) root.classList.add('dyslexia-font');
    if (settings.reduceMotion) root.classList.add('reduce-motion');
    
  }, [settings]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFontSize = (action) => {
    const sizes = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(settings.fontSize);
    
    if (action === 'increase' && currentIndex < sizes.length - 1) {
      updateSetting('fontSize', sizes[currentIndex + 1]);
    } else if (action === 'decrease' && currentIndex > 0) {
      updateSetting('fontSize', sizes[currentIndex - 1]);
    } else if (action === 'reset') {
      updateSetting('fontSize', 'base');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-72 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-xl rounded-3xl overflow-hidden" role="dialog" aria-label="Accessibility Settings">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Accessibility size={16} className="text-blue-600" />
              </div>
              Accessibility Tools
            </h2>
            <button 
              onClick={toggleOpen}
              className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
              aria-label="Close accessibility toolbar"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Font Size */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Type size={16} className="text-blue-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Text Size</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleFontSize('decrease')}
                  disabled={settings.fontSize === 'sm'}
                  className="flex-1 py-2 flex justify-center items-center bg-slate-50 hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-200 rounded-xl shadow-sm text-slate-700 hover:border-slate-300"
                  aria-label="Decrease text size"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => handleFontSize('reset')}
                  className="flex-1 py-2 flex justify-center items-center text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-xl shadow-sm hover:border-slate-300"
                  aria-label="Reset text size"
                >
                  <RotateCcw size={14} className="mr-1" />
                  RST
                </button>
                <button 
                  onClick={() => handleFontSize('increase')}
                  disabled={settings.fontSize === 'xl'}
                  className="flex-1 py-2 flex justify-center items-center bg-slate-50 hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-200 rounded-xl shadow-sm text-slate-700 hover:border-slate-300"
                  aria-label="Increase text size"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-slate-700">
                  <Eye size={16} className="text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">High Contrast</span>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors shadow-inner ${settings.highContrast ? 'bg-blue-500' : 'bg-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={settings.highContrast}
                    onChange={(e) => updateSetting('highContrast', e.target.checked)}
                    aria-label="Toggle high contrast"
                  />
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${settings.highContrast ? 'translate-x-[22px]' : 'translate-x-1'}`} />
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-slate-700">
                  <Type size={16} className="text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Dyslexia Font</span>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors shadow-inner ${settings.dyslexiaFont ? 'bg-blue-500' : 'bg-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={settings.dyslexiaFont}
                    onChange={(e) => updateSetting('dyslexiaFont', e.target.checked)}
                    aria-label="Toggle dyslexia-friendly font"
                  />
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${settings.dyslexiaFont ? 'translate-x-[22px]' : 'translate-x-1'}`} />
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-slate-700">
                  <ZapOff size={16} className="text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Reduce Motion</span>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors shadow-inner ${settings.reduceMotion ? 'bg-blue-500' : 'bg-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={settings.reduceMotion}
                    onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                    aria-label="Toggle reduced motion"
                  />
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${settings.reduceMotion ? 'translate-x-[22px]' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>

            {/* Screen Reader Badge */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-emerald-700 bg-emerald-50/50 p-4 rounded-xl shadow-inner">
              <Monitor size={16} className="text-emerald-500 shrink-0" />
              <span className="text-xs font-bold">Screen Reader Mode Ready</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="h-14 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center transition-all focus:outline-none"
        aria-expanded={isOpen}
        aria-label="Toggle accessibility tools"
      >
        <Accessibility size={24} />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
