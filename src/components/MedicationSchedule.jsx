import React, { useState } from 'react';
import { Pill, Sun, Sunrise, Sunset, Moon, Download, Calendar, CheckSquare, Square, Clock, AlertTriangle } from 'lucide-react';
import { downloadCalendarFile } from '../services/calendarService';

export default function MedicationSchedule({ medications, patientName }) {
  const [checkedMeds, setCheckedMeds] = useState({});

  if (!medications || medications.length === 0) return null;

  const toggleCheck = (idx) => {
    setCheckedMeds(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleDownloadCalendar = () => {
    downloadCalendarFile(medications, patientName);
  };

  const getTimingIcon = (med) => {
    const timingLower = (med.timing || med.frequency || '').toLowerCase();
    if (timingLower.includes('morning') || timingLower.includes('breakfast')) return { Icon: Sunrise, color: 'text-amber-600' };
    if (timingLower.includes('night') || timingLower.includes('bedtime') || timingLower.includes('hs')) return { Icon: Moon, color: 'text-indigo-600' };
    if (timingLower.includes('evening') || timingLower.includes('dinner')) return { Icon: Sunset, color: 'text-orange-600' };
    return { Icon: Sun, color: 'text-amber-600' };
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
            <Pill className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Medication Schedule
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Chronological daily dosages with food relation guidelines
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadCalendar}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Sync to Calendar</span>
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Medication Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {medications.map((med, idx) => {
          const isChecked = checkedMeds[idx];
          const { Icon: TimingIcon, color: iconColor } = getTimingIcon(med);

          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-6 border transition-all cursor-pointer flex flex-col rounded-2xl shadow-sm hover:shadow-md ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-100'
              }`}
            >
              {/* Card Content Area */}
              <div className="flex-1 space-y-4">

                {/* Row 1: Checkbox + Name + Frequency Badge */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCheck(idx); }}
                    className="shrink-0 mt-0.5 transition-transform hover:scale-110"
                  >
                    {isChecked
                      ? <CheckSquare className="w-6 h-6 text-emerald-500" />
                      : <Square className="w-6 h-6 text-slate-300" />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-base font-bold leading-tight transition-colors ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {med.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-600 rounded-full shadow-sm shrink-0">
                    <TimingIcon className={`w-4 h-4 ${iconColor}`} />
                    <span>{med.frequency}</span>
                  </div>
                </div>

                {/* Row 2: Dosage chip */}
                <div className="pl-10">
                  <span className="inline-block px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 border border-blue-100 rounded-full max-w-full truncate shadow-sm" title={med.dosage}>
                    {med.dosage}
                  </span>
                </div>

                {/* Row 3: Timing & Duration */}
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 pl-10">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate" title={med.timing}>{med.timing || 'As prescribed'}</span>
                  <span className="text-slate-300 text-[10px]">•</span>
                  <span className="text-slate-500 shrink-0">{med.duration || '—'}</span>
                </div>

                {/* Row 4: Indication */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed pl-10 pt-4 border-t border-slate-100 mt-4">
                  <span className="font-bold text-slate-800">Indication:</span>{' '}
                  {med.purpose}
                </p>
              </div>

              {/* Precaution Alert (always at bottom) */}
              {med.precautions && (
                <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3 shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                    {med.precautions}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
