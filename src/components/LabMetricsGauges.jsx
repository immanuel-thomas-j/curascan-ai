import React from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function LabMetricsGauges({ metrics }) {
  if (!metrics || metrics.length === 0) return null;

  const statusStyle = (status) => {
    switch (status) {
      case 'critical':
        return {
          badge: 'bg-rose-50 text-rose-700 border-rose-100',
          barColor: 'bg-rose-500',
          icon: AlertTriangle,
          textColor: 'text-rose-500'
        };
      case 'high':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-100',
          barColor: 'bg-amber-500',
          icon: TrendingUp,
          textColor: 'text-amber-500'
        };
      case 'low':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-100',
          barColor: 'bg-blue-500',
          icon: TrendingDown,
          textColor: 'text-blue-500'
        };
      default:
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          barColor: 'bg-emerald-500',
          icon: CheckCircle,
          textColor: 'text-emerald-500'
        };
    }
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Diagnostic Lab Metrics
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Values benchmarked against healthy intervals
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-4 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-full shadow-sm shrink-0">
          {metrics.length} Tests Analyzed
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, idx) => {
          const style = statusStyle(metric.status);
          const Icon = style.icon;

          let fillPercent = 50;
          if (metric.status === 'critical') fillPercent = 90;
          else if (metric.status === 'high') fillPercent = 75;
          else if (metric.status === 'low') fillPercent = 25;

          return (
            <div
              key={idx}
              className="p-6 bg-white border border-slate-100 rounded-2xl space-y-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Metric Title & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {metric.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Ref: {metric.referenceRange}
                  </p>
                </div>
                <div className={`px-3 py-1.5 text-xs flex items-center gap-2 border font-bold rounded-full shrink-0 ${style.badge}`}>
                  <Icon className="w-4 h-4" />
                  <span>{metric.statusText || metric.status}</span>
                </div>
              </div>

              {/* Observed Value Display */}
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-black tracking-tighter ${style.textColor}`}>
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {metric.unit}
                </span>
              </div>

              {/* Visual Horizontal Dial Bar */}
              <div className="space-y-2.5">
                <div className="w-full h-2.5 bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${style.barColor}`}
                    style={{ width: `${fillPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>LOW</span>
                  <span>OPTIMAL</span>
                  <span>HIGH</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 font-medium leading-relaxed pt-4 border-t border-slate-100">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
