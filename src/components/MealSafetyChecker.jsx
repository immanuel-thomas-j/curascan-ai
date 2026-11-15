import React, { useState, useRef } from 'react';
import { Camera, Upload, ShieldAlert, CheckCircle, AlertTriangle, Sparkles, Loader2, X } from 'lucide-react';
import { analyzeMealSafety } from '../services/geminiService';

export default function MealSafetyChecker({ auditData, apiKey, onOpenKeyModal }) {
  const [mealImage, setMealImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setMealImage({
          base64: reader.result,
          mimeType: file.type || 'image/jpeg'
        });
        setResult(null);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeMeal = async () => {
    if (!mealImage) return;
    if (!apiKey) {
      setErrorMsg('> SYSTEM ERROR: API KEY REQUIRED FOR MEAL SAFETY CHECK.');
      if(onOpenKeyModal) onOpenKeyModal();
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');
    try {
      const analysisResult = await analyzeMealSafety({
        mealImageBase64: mealImage.base64,
        mimeType: mealImage.mimeType,
        auditContext: auditData,
        apiKey
      });
      setResult(analysisResult);
    } catch (err) {
      setErrorMsg(`> ERROR: ${err.message || 'FAILED TO ANALYZE MEAL.'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearMeal = () => {
    setMealImage(null);
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow space-y-6">
      <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
        <div className="w-12 h-12 bg-orange-50 flex items-center justify-center text-orange-600 rounded-2xl border border-orange-100 shadow-sm shrink-0">
          <Camera className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Dietary & Meal Safety Checker</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Cross-reference food against current meds & labs</p>
        </div>
      </div>

      {!mealImage ? (
          <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 bg-slate-50/50 p-10 flex flex-col items-center justify-center cursor-pointer transition-all rounded-2xl text-center group shadow-inner"
        >
          <Upload className="w-8 h-8 text-orange-400 mb-4 group-hover:-translate-y-1 transition-transform" />
          <p className="text-sm font-bold text-slate-700 mb-1.5">Upload Meal Photo</p>
          <p className="text-xs font-medium text-slate-500 max-w-[250px]">Snap a pic of your food to check for drug-food interactions.</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="relative border border-slate-200 bg-slate-50 h-48 rounded-2xl overflow-hidden shadow-sm">
            <img src={mealImage.base64} alt="Meal" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            <button 
              onClick={clearMeal}
              className="absolute top-3 right-3 p-2 bg-slate-900/50 hover:bg-rose-500 text-white backdrop-blur-md transition-colors rounded-full shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {!result && (
            <button
              onClick={handleAnalyzeMeal}
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:-translate-y-0.5"
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isAnalyzing ? 'Analyzing Nutritional Profile...' : 'Check Meal Safety'}
            </button>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-xl text-center shadow-sm">
          <p className="text-xs font-bold">
            {errorMsg.replace('> ERROR: ', '').replace('> SYSTEM ERROR: ', '')}
          </p>
        </div>
      )}

      {result && (
        <div className={`p-6 rounded-2xl shadow-sm border ${
          result.safetyStatus === 'Danger' ? 'bg-rose-50 border-rose-100' :
          result.safetyStatus === 'Warning' ? 'bg-amber-50 border-amber-100' :
          'bg-emerald-50 border-emerald-100'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`mt-0.5 shrink-0 ${
              result.safetyStatus === 'Danger' ? 'text-rose-500' :
              result.safetyStatus === 'Warning' ? 'text-amber-500' :
              'text-emerald-500'
            }`}>
              {result.safetyStatus === 'Danger' ? <ShieldAlert className="w-6 h-6" /> :
               result.safetyStatus === 'Warning' ? <AlertTriangle className="w-6 h-6" /> :
               <CheckCircle className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-sm font-bold mb-2 flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs ${
                  result.safetyStatus === 'Danger' ? 'bg-rose-100 text-rose-700' :
                  result.safetyStatus === 'Warning' ? 'bg-amber-100 text-amber-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>{result.safetyStatus}</span>
                <span className="text-slate-600 flex items-center gap-2">
                  🍽️ {result.foodIdentified}
                </span>
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {result.analysis}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
