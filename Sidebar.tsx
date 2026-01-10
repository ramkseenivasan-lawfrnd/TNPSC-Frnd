import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  MessageSquare, 
  FileQuestion, 
  TrendingUp,
  Bookmark,
  X,
  GraduationCap,
  BookOpenText,
  ShieldCheck,
  CalendarDays,
  Share2,
  Check
} from 'lucide-react';
import { AppView } from './types.ts';
import { UI_STRINGS } from './constants.ts';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggle: () => void;
  language: 'EN' | 'TN';
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggle, language }) => {
  const s = UI_STRINGS[language];
  const [isCopied, setIsCopied] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: s.dashboard },
    { id: 'study-plan', icon: CalendarDays, label: s.studyPlan },
    { id: 'exams', icon: GraduationCap, label: s.exams },
    { id: 'syllabus', icon: BookOpenText, label: s.syllabus },
    { id: 'current-affairs', icon: Newspaper, label: s.currentAffairs },
    { id: 'chat', icon: MessageSquare, label: s.aiPreceptor },
    { id: 'pyq', icon: FileQuestion, label: s.pyqAnalyzer },
    { id: 'predictor', icon: TrendingUp, label: s.predictor },
    { id: 'saved-answers', icon: Bookmark, label: s.savedAnswers },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'TNPSC Frnd',
      text: s.shareText,
      url: 'https://tnpscfrnd.vercel.app/',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link', err);
      }
    }
  };

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
            <h1 className="text-xl font-black tracking-tight text-white">TNPSC Frnd</h1>
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

          {/* New Share App Menu Item */}
          <button
            onClick={handleShare}
            className={`
              w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all active:scale-[0.98] mt-4
              ${isCopied 
                ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                : 'bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700] hover:text-[#003366] font-bold'}
            `}
          >
            {isCopied ? <Check size={20} /> : <Share2 size={20} />}
            <span className={`tracking-wide transition-all ${
              language === 'TN' ? 'text-[13px]' : 'text-[15px]'
            }`}>
              {isCopied ? (language === 'TN' ? 'நகலெடுக்கப்பட்டது' : 'Link Copied') : s.shareApp}
            </span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0 space-y-3">
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

          <button 
            onClick={() => setView('admin-login')}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest ${
              currentView === 'admin-login' || currentView === 'admin-dashboard' 
                ? 'bg-white/20 text-white' 
                : 'text-white/40 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck size={14} /> Officer Login
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;