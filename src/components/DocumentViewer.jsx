import React, { useState } from 'react';
import { FileText, ZoomIn, ZoomOut, CheckCircle, Scan } from 'lucide-react';

export default function DocumentViewer({ data, isAnalyzing }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showFullOcr, setShowFullOcr] = useState(false);

  if (!data) return null;

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] flex flex-col h-full relative overflow-hidden shadow-xl shadow-slate-200/50">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Source Document</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
            className="p-2 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors shadow-sm border border-slate-100"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-600 px-3 bg-slate-50 py-1.5 rounded-full border border-slate-100 shadow-sm">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
            className="p-2 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors shadow-sm border border-slate-100"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Canvas Container */}
      <div className="relative flex-1 min-h-[280px] max-h-[420px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center shadow-inner">
        
        {/* Animated Laser Scanning Bar during analysis */}
        {isAnalyzing && <div className="absolute top-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] animate-[scan_2s_ease-in-out_infinite] z-20"></div>}

        {data.imageUrl ? (
          <div className="w-full h-full overflow-auto flex items-center justify-center p-2">
            <img
              src={data.imageUrl}
              alt="Medical Document"
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="text-center p-6 text-slate-500">
            <Scan className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-50" />
            <p className="text-sm font-semibold">Document OCR text loaded</p>
          </div>
        )}
      </div>

      {/* OCR Text Extraction Drawer */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Optical Extraction Result</span>
          </span>
          <button
            onClick={() => setShowFullOcr(!showFullOcr)}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-blue-50/50 hover:bg-blue-50 px-3 py-1 rounded-full"
          >
            {showFullOcr ? 'Collapse OCR' : 'Expand OCR'}
          </button>
        </div>

        <div className={`bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 leading-relaxed overflow-y-auto transition-all shadow-inner ${
          showFullOcr ? 'max-h-48' : 'max-h-24'
        }`}>
          {data.ocrSnippet || "> Extracting text from medical document image..."}
        </div>
      </div>

    </div>
  );
}
