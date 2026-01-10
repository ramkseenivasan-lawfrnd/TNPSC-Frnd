
import React from 'react';
import { WifiOff, BookMarked, RefreshCcw, ArrowLeft } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';
import { AppView } from '../types.ts';

interface OfflineOverlayProps {
  language: 'EN' | 'TN';
  setView: (view: AppView) => void;
  onRetry: () => void;
}

const OfflineOverlay: React.FC<OfflineOverlayProps> = ({ language, setView, onRetry }) => {
  const s = UI_STRINGS[language].offline;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500 mb-8 shadow-xl shadow-red-100">
        <WifiOff size={48} />
      </div>
      
      <h2 className="text-2xl font-black text-[#003366] font-scholarly mb-4">
        {s.title}
      </h2>
      
      <p className="text-slate-500 max-w-sm mb-10 leading-relaxed font-medium">
        {s.desc}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => setView('saved-answers')}
          className="flex-1 flex items-center justify-center gap-2 bg-[#003366] text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#004080] transition-all active:scale-95"
        >
          <BookMarked size={20} />
          {s.backToSaved}
        </button>
        
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
        >
          <RefreshCcw size={20} />
          {s.retry}
        </button>
      </div>

      <button
        onClick={() => setView('dashboard')}
        className="mt-8 flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest hover:text-[#003366] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
    </div>
  );
};

export default OfflineOverlay;
