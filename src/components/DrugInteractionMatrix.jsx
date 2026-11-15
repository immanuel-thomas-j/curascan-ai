import React from 'react';
import { AlertOctagon, ShieldAlert, AlertTriangle, ArrowRightLeft, Info, CheckCircle } from 'lucide-react';

export default function DrugInteractionMatrix({ interactions }) {
  if (!interactions || interactions.length === 0) {
    return (
      <div className="p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Hazardous Drug Interactions Detected</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto font-medium">
          No high-risk adverse pharmacological interactions or contraindications were flagged.
        </p>
      </div>
    );
  }

  const severityStyle = (severity) => {
    const s = (severity || '').toLowerCase();
    if (s.includes('critical') || s.includes('danger')) {
      return {
        badge: 'bg-rose-50 text-rose-700 border-rose-100',
        border: 'border border-rose-100 bg-white hover:border-rose-200 hover:shadow-md',
        icon: AlertOctagon
      };
    } else if (s.includes('severe') || s.includes('high')) {
      return {
        badge: 'bg-orange-50 text-orange-700 border-orange-100',
        border: 'border border-orange-100 bg-white hover:border-orange-200 hover:shadow-md',
        icon: ShieldAlert
      };
    } else if (s.includes('moderate')) {
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-100',
        border: 'border border-amber-100 bg-white hover:border-amber-200 hover:shadow-md',
        icon: AlertTriangle
      };
    }
    return {
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
      border: 'border border-blue-100 bg-white hover:border-blue-200 hover:shadow-md',
      icon: Info
    };
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm shrink-0">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Drug Interaction Matrix
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Audited conflicts between co-administered medications
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-full shadow-sm shrink-0">
          {interactions.length} Conflict{interactions.length !== 1 ? 's' : ''} Flagged
        </span>
      </div>

      {/* Interactions List */}
      <div className="space-y-4">
        {interactions.map((item, idx) => {
          const style = severityStyle(item.severity);
          const Icon = style.icon;

          return (
            <div key={idx} className={`p-6 rounded-2xl transition-all shadow-sm ${style.border}`}>
              {/* Drug pair + severity */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-4 py-2 bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm">
                    {item.pair[0]}
                  </span>
                  <ArrowRightLeft className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="px-4 py-2 bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-sm">
                    {item.pair[1]}
                  </span>
                </div>

                <div className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 border rounded-full shrink-0 ${style.badge}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.severity}</span>
                </div>
              </div>

              {/* Mechanism */}
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                <span className="font-bold text-slate-900">Mechanism: </span>
                {item.mechanism}
              </p>

              {/* Recommendation */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3 shadow-inner">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  <span className="font-bold text-slate-900">Clinical Recommendation: </span>
                  {item.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
