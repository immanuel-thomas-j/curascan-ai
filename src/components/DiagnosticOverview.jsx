import React from 'react';
import { ShieldCheck, ShieldAlert, AlertOctagon, Activity, User, Calendar, Stethoscope, Pill, Hash } from 'lucide-react';

export default function DiagnosticOverview({ data }) {
  if (!data) return null;

  const score = data.overallSafetyScore || 80;
  const level = data.safetyLevel || 'caution';

  const levelMap = {
    normal: {
      label: 'Optimal Safety Profile',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      icon: ShieldCheck,
      colorClass: 'text-emerald-500',
      ringColor: '#10B981' // emerald-500
    },
    caution: {
      label: 'Moderate Caution',
      bg: 'bg-amber-50 border-amber-100 text-amber-700',
      icon: ShieldAlert,
      colorClass: 'text-amber-500',
      ringColor: '#F59E0B' // amber-500
    },
    warning: {
      label: 'Elevated Risk',
      bg: 'bg-orange-50 border-orange-100 text-orange-700',
      icon: ShieldAlert,
      colorClass: 'text-orange-500',
      ringColor: '#F97316' // orange-500
    },
    critical: {
      label: 'Critical Danger',
      bg: 'bg-rose-50 border-rose-100 text-rose-700',
      icon: AlertOctagon,
      colorClass: 'text-rose-500',
      ringColor: '#EF4444' // rose-500
    }
  };

  const currentLevel = levelMap[level] || levelMap.caution;
  const LevelIcon = currentLevel.icon;

  const SIZE = 120;
  const STROKE = 8;
  const CENTER = SIZE / 2;
  const RADIUS = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * RADIUS;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 space-y-8">
      
      {/* Document Title Header */}
      <div className="space-y-5 pb-5 border-b border-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {data.title || 'Medical Diagnostic Audit'}
          </h2>
          <span className="px-4 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-full shadow-sm shrink-0">
            {data.docTypeLabel || data.type || 'Prescription'}
          </span>
        </div>
        {data.subtitle && (
          <p className="text-sm text-slate-500 font-semibold tracking-wide">
            {data.subtitle}
          </p>
        )}

        {/* Metadata Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {data.patientName && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full text-xs font-semibold text-slate-700">
              <User className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{data.patientName}</span>
            </div>
          )}
          {data.doctorName && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full text-xs font-semibold text-slate-700">
              <Stethoscope className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{data.doctorName}</span>
            </div>
          )}
          {data.date && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 shadow-sm rounded-full text-xs font-semibold text-slate-700">
              <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{data.date}</span>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 shadow-inner rounded-full text-xs font-medium text-slate-500">
            <Hash className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate max-w-[120px]">{data.id}</span>
          </div>
        </div>
      </div>

      {/* Safety Score + Executive Synthesis (Side-by-Side) */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Safety Score Gauge */}
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl md:w-64 shrink-0 shadow-sm relative overflow-hidden">
          
          <span className="text-xs font-bold text-slate-500 mb-6 z-10">
            System Safety Score
          </span>

          <div className="relative z-10" style={{ width: SIZE, height: SIZE }}>
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="transform -rotate-90">
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke="#f1f5f9" // slate-100
                strokeWidth={STROKE}
                fill="transparent"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke={currentLevel.ringColor}
                strokeWidth={STROKE}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black leading-none tracking-tighter ${currentLevel.colorClass}`}>
                {score}
              </span>
            </div>
          </div>

          <div className={`w-full text-center px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl mt-8 shadow-sm ${currentLevel.bg}`}>
            <LevelIcon className="w-4 h-4 shrink-0" />
            <span>{currentLevel.label}</span>
          </div>
        </div>

        {/* Right: Synthesis + Stats */}
        <div className="flex-1 flex flex-col justify-between gap-5 min-w-0">
          <div className="flex-1 flex flex-col">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <span>Executive Clinical Synthesis</span>
            </h4>
            <div className="flex-1 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 text-sm text-slate-700 font-medium leading-relaxed shadow-inner">
              {data.summary || "Medical audit synthesis in progress..."}
            </div>
          </div>

          {/* 3 Quick Stat Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 flex items-center justify-center text-blue-600 rounded-xl shrink-0">
                <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-full flex flex-col items-center">
                <p className="text-lg sm:text-xl font-black text-slate-900 leading-none tracking-tight">
                  {data.medications ? data.medications.length : 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 w-full truncate">
                  Rx Drugs
                </p>
              </div>
            </div>

            <div className="p-2 sm:p-3 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-50 flex items-center justify-center text-amber-600 rounded-xl shrink-0">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-full flex flex-col items-center">
                <p className="text-lg sm:text-xl font-black text-slate-900 leading-none tracking-tight">
                  {data.drugInteractions ? data.drugInteractions.length : 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 w-full truncate" title="Conflicts">
                  Conflicts
                </p>
              </div>
            </div>

            <div className="p-2 sm:p-3 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-50 flex items-center justify-center text-rose-600 rounded-xl shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-full flex flex-col items-center">
                <p className="text-lg sm:text-xl font-black text-slate-900 leading-none tracking-tight">
                  {data.labMetrics ? data.labMetrics.filter(m => m.status !== 'normal').length : 0}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 w-full truncate" title="Lab Alerts">
                  Lab Alerts
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
