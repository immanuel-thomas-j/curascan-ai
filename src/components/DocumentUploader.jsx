import React, { useState, useRef } from 'react';
import { Upload, Camera, FileText, Sparkles, Key, AlertCircle, X } from 'lucide-react';

export default function DocumentUploader({ onAnalyze, isAnalyzing, apiKey, onOpenKeyModal }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of { file, base64, mimeType, name }
  const [contextNote, setContextNote] = useState('');
  const [useCamera, setUseCamera] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (files) => {
    setErrorMsg('');
    if (selectedFiles.length + files.length > 3) {
      setErrorMsg('You can upload a maximum of 3 documents at once.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiles(prev => [...prev, {
          file,
          base64: reader.result,
          mimeType: file.type || 'image/jpeg',
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCameraSnapshot = () => {
    if (!videoRef.current) return;
    if (selectedFiles.length >= 3) {
      setErrorMsg('Maximum 3 documents allowed.');
      setUseCamera(false);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    setSelectedFiles(prev => [...prev, {
      file: null,
      base64: dataUrl,
      mimeType: 'image/jpeg',
      name: `Snapshot ${prev.length + 1}`
    }]);
    
    setUseCamera(false);
    setErrorMsg('');
  };

  const startCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera access denied:", err);
      setUseCamera(false);
    }
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setErrorMsg('Please select or capture at least one medical document.');
      return;
    }
    if (!apiKey) {
      setErrorMsg('Google Gemini API Key is required for live document auditing.');
      onOpenKeyModal();
      return;
    }

    setErrorMsg('');
    onAnalyze({
      imageFiles: selectedFiles,
      textPrompt: contextNote
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Main Upload / Camera Area */}
      <div className="p-8 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Document Input <span className="text-xs text-slate-400 font-medium ml-1">MAX: 3</span>
          </h2>
          <button
            type="button"
            onClick={startCamera}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors shadow-sm"
          >
            <Camera className="w-4 h-4 text-blue-500" />
            <span>Enable Camera</span>
          </button>
        </div>

        {/* Live Camera Feed */}
        {useCamera ? (
          <div className="relative bg-slate-950 aspect-video flex flex-col items-center justify-center rounded-2xl overflow-hidden mb-6 shadow-inner">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-6 flex gap-4">
              <button
                onClick={handleCameraSnapshot}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Capture Photo
              </button>
              <button
                onClick={() => setUseCamera(false)}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Abort
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`
              relative border-2 border-dashed p-12 text-center transition-all cursor-pointer mb-6 rounded-3xl
              ${dragActive ? 'border-blue-400 bg-blue-50/50 scale-[1.02]' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 bg-slate-50/50'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              multiple
            />
            <div className="w-14 h-14 bg-white text-blue-600 flex items-center justify-center mx-auto mb-4 rounded-2xl shadow-sm border border-slate-100">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900">Select or Drop files here</p>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Supported: JPG, PNG, WEBP, PDF
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-medium flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payload Queue ({selectedFiles.length}/3)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFiles.map((f, i) => (
                <div key={i} className="relative bg-white border border-slate-100 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
                  {f.mimeType.startsWith('image/') ? (
                    <img src={f.base64} alt={f.name} className="w-12 h-12 object-cover rounded-xl border border-slate-100 shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl border border-rose-100 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{f.name}</p>
                    <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">{f.mimeType}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white text-slate-400 hover:text-rose-600 rounded-full flex items-center justify-center border border-slate-200 shadow-md hover:border-rose-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Context Note & Submit */}
        <div className="space-y-5 pt-6 border-t border-slate-100">
          <div className="relative">
            <label className="text-xs font-semibold text-slate-500 mb-2 block">Context Note (Optional)</label>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white resize-none rounded-2xl transition-all placeholder-slate-400"
              rows="2"
              placeholder="E.g., 'Patient is allergic to penicillin, 55 years old.'"
              value={contextNote}
              onChange={(e) => setContextNote(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isAnalyzing || selectedFiles.length === 0}
            className={`
              w-full py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-full transition-all shadow-md
              ${isAnalyzing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg hover:-translate-y-0.5'}
            `}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin"></div>
                <span>Executing Gemini Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Initiate Forensic Audit</span>
              </>
            )}
          </button>
          
          {!apiKey && (
            <p className="text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 mt-3">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              API Key required to execute
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
