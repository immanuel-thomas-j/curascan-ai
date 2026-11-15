import React from 'react';
import { Shield, Phone, IndianRupee, Leaf, Languages, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

const IndianHealthPanel = ({ data = {} }) => {
  const { medications = [], ayushInteractions = [], hindiSummary = '' } = data;

  return (
    <div className="space-y-6">
      {/* ABHA Compatibility */}
      <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">ABHA Health ID Compatibility</h3>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-3 rounded-2xl border border-emerald-100 shadow-inner">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold text-xs tracking-wide">ABHA (Ayushman Bharat) Compatible</span>
        </div>
        <p className="mt-3 text-xs font-medium text-slate-500">
          Audit report format is compatible with India's ABDM health records.
        </p>
      </div>

      {/* Jan Aushadhi */}
      {medications.some(m => m.genericAlternative) && (
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">Pradhan Mantri Bhartiya<br/>Jan Aushadhi Pariyojana</h3>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-5">
            Generic alternatives with PMBJP cost savings.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {medications.map((med, idx) => (
              med.genericAlternative ? (
                <div key={idx} className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">Original Rx</span>
                    <span className="text-sm font-bold text-slate-800">{med.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-emerald-600 block uppercase tracking-wider mb-1">Generic (PMBJP)</span>
                    <div className="flex items-center justify-end text-sm font-bold text-emerald-700">
                      <span>{med.genericAlternative}</span>
                      {med.estimatedCostINR && <span className="ml-2 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-800 text-xs shadow-sm">₹{med.estimatedCostINR}</span>}
                    </div>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* AYUSH Interactions */}
      <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">AYUSH Interaction Audit</h3>
        </div>
        
        {ayushInteractions && ayushInteractions.length > 0 ? (
          <div className="space-y-4">
            {ayushInteractions.map((interaction, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">{interaction.herb} + {interaction.drug}</h4>
                  <p className="text-xs font-medium text-amber-800 mt-1.5 leading-relaxed">{interaction.warning}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-100 shadow-inner">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-semibold">No AYUSH herb-drug conflicts detected</span>
          </div>
        )}
      </div>

      {/* Hindi Summary */}
      {hindiSummary && (
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">सारांश (Hindi Summary)</h3>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-inner">
            <p className="text-sm text-blue-900 font-medium leading-relaxed font-sans">{hindiSummary}</p>
          </div>
        </div>
      )}

      {/* Emergency Helplines */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl shadow-slate-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/30 shadow-sm shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Emergency Routing (IN)</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Ambulance</div>
              <div className="text-sm font-bold text-slate-200">108</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Health Helpline</div>
              <div className="text-sm font-bold text-slate-200">104</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Poison Control</div>
              <div className="text-sm font-bold text-slate-200">1800-116-117</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Senior Citizen</div>
              <div className="text-sm font-bold text-slate-200">14567</div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-700 transition-colors col-span-2">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">ABDM Helpline</div>
              <div className="text-sm font-bold text-slate-200">1800-599-0019</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IndianHealthPanel;
