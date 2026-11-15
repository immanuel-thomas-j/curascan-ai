import React from 'react';
import { FileJson, Printer, HeartPulse } from 'lucide-react';

export default function HealthPassportExport({ data }) {
  if (!data) return null;

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CuraScan_Health_Passport_${(data.patientName || 'Patient').replace(/\s+/g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Emergency Health Passport
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Export verified diagnostic audit for healthcare providers
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all shrink-0"
          >
            <FileJson className="w-4 h-4 text-blue-500" />
            <span>JSON Data</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Lifestyle Advice */}
      {data.lifestyleAdvice && data.lifestyleAdvice.length > 0 && (
        <div className="p-6 bg-slate-50/80 border border-slate-100 rounded-2xl space-y-4 shadow-inner">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Patient Lifestyle & Dietary Action Plan
          </h4>
          <ul className="space-y-3">
            {data.lifestyleAdvice.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5 text-lg leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
