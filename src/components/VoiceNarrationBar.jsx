import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Globe, ChevronDown, Loader2 } from 'lucide-react';
import { speechService } from '../services/speechService';
import { translateText } from '../services/geminiService';

const LANGUAGES = [
  { code: 'en-US', label: 'English' },
  { code: 'hi-IN', label: 'Hindi' },
  { code: 'ta-IN', label: 'Tamil' },
  { code: 'es-ES', label: 'Spanish' },
  { code: 'fr-FR', label: 'French' }
];

export default function VoiceNarrationBar({ text, patientName, apiKey }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Reset when base text changes
    setTranslations({ 'en-US': text });
    setLanguage('en-US');
    setIsPlaying(false);
    return () => {
      speechService.stop();
    };
  }, [text]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!text) return null;

  const playAudio = (textToPlay, langCode) => {
    const success = speechService.speak(textToPlay, langCode, () => {
      setIsPlaying(false);
    });
    if (success) setIsPlaying(true);
  };

  const handleTogglePlay = async () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    if (translations[language]) {
      playAudio(translations[language], language);
    } else {
      setIsTranslating(true);
      try {
        const translated = await translateText(text, LANGUAGES.find(l => l.code === language).label, apiKey);
        setTranslations(prev => ({ ...prev, [language]: translated }));
        playAudio(translated, language);
      } catch (err) {
        console.error("Translation failed", err);
        // Fallback to english if it fails
        playAudio(text, 'en-US');
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const handleLanguageSelect = async (langCode) => {
    setLanguage(langCode);
    setIsDropdownOpen(false);
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    }
  };

  const selectedLangLabel = LANGUAGES.find(l => l.code === language)?.label || 'English';

  return (
    <div className="p-6 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-40 transition-all hover:shadow-md">
      
      {/* Play Button + Label */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={handleTogglePlay}
          disabled={isTranslating}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shrink-0 shadow-md hover:shadow-lg ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20 disabled:opacity-50'
          }`}
          title={isPlaying ? 'Stop Audio' : 'Play Audio Guidance'}
        >
          {isTranslating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-1" />
          )}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-5 h-5 text-blue-500 shrink-0" />
            <h4 className="text-sm font-bold text-slate-900">
              Multilingual Audio
            </h4>
          </div>
          <p className="text-xs font-medium text-slate-500 truncate">
            {isTranslating ? "Translating to " + selectedLangLabel + "..." : isPlaying ? "Narrating instructions..." : "Play for spoken guidance"}
          </p>
        </div>
      </div>

      {/* Custom Language Dropdown */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition-all shadow-sm hover:shadow-md"
        >
          <Globe className="w-4 h-4 text-blue-500" />
          <span>{selectedLangLabel}</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-20 py-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
                  language === lang.code ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
