
import React from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  MessageSquare, 
  FileQuestion, 
  TrendingUp,
  Bookmark,
  X,
  GraduationCap,
  BookOpenText
} from 'lucide-react';
import { AppView } from '../types.ts';
import { UI_STRINGS } from '../constants.ts';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggle: () => void;
  language: 'EN' | 'TN';
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggle, language }) => {
  const s = UI_STRINGS[language];
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: s.dashboard },
    { id: 'exams', icon: GraduationCap, label: s.exams },
    { id: 'syllabus', icon: BookOpenText, label: s.syllabus },
    { id: 'current-affairs', icon: Newspaper, label: s.currentAffairs },
    { id: 'chat', icon: MessageSquare, label: s.aiPreceptor },
    { id: 'pyq', icon: FileQuestion, label: s.pyqAnalyzer },
    { id: 'predictor', icon: TrendingUp, label: s.predictor },
    { id: 'saved-answers', icon: Bookmark, label: s.savedAnswers },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={toggle}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-72 bg-[#003366] text-white flex flex-col transition-all duration-300 ease-in-out transform shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:w-64
      `}>
        <div className="p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFD700] rounded-lg flex items-center justify-center text-[#003366] font-extrabold shadow-inner">
              T
            </div>
            <h1 className="text-xl font-bold tracking-tight">TNPSC_Frnd</h1>
          </div>
          <button onClick={toggle} className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as AppView)}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all active:scale-[0.98]
                  ${isActive 
                    ? 'bg-[#FFD700] text-[#003366] font-bold shadow-lg shadow-black/20' 
                    : 'hover:bg-white/10 text-slate-300 hover:text-white'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-[#003366]' : 'text-slate-400'} />
                <span className={`tracking-wide transition-all ${
                  language === 'TN' ? 'text-[13px]' : 'text-[15px]'
                }`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Sync Status</p>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold tracking-wide">Live Updates</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
