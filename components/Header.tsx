
import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';

interface HeaderProps {
  viewId: string;
  language: 'EN' | 'TN';
  setLanguage: (lang: 'EN' | 'TN') => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewId, language, setLanguage, toggleSidebar }) => {
  const getLocalizedTitle = () => {
    const s = UI_STRINGS[language];
    switch (viewId) {
      case 'dashboard': return s.dashboard;
      case 'current-affairs': return s.currentAffairs;
      case 'chat': return s.aiPreceptor;
      case 'pyq': return s.pyqAnalyzer;
      case 'predictor': return s.predictor;
      case 'saved-answers': return s.savedAnswers;
      default: return '';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-slate-100 rounded-xl md:hidden active:scale-90 transition-transform"
        >
          <Menu size={22} className="text-[#003366]" />
        </button>
        <h2 className={`font-black text-[#003366] tracking-tight font-scholarly truncate max-w-[150px] sm:max-w-none transition-all ${
          language === 'TN' ? 'text-sm md:text-lg' : 'text-base md:text-xl'
        }`}>
          {getLocalizedTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200/50">
          <button 
            onClick={() => setLanguage('TN')}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-xs font-black transition-all ${language === 'TN' ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500 hover:text-[#003366]'}`}
          >
            தமிழ்
          </button>
          <button 
            onClick={() => setLanguage('EN')}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-xs font-black transition-all ${language === 'EN' ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500 hover:text-[#003366]'}`}
          >
            ENG
          </button>
        </div>
        
        <button className="p-2.5 hover:bg-slate-100 rounded-xl relative text-slate-600 transition-colors group">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:animate-bounce"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
