
import React, { useState, useEffect } from 'react';
import { Menu, Bell, Wifi, WifiOff } from 'lucide-react';
import { UI_STRINGS, DEFAULT_NOTIFICATIONS } from '../constants.ts';
import { AdminNotification, AppView } from '../types.ts';

interface HeaderProps {
  viewId: string;
  language: 'EN' | 'TN';
  setLanguage: (lang: 'EN' | 'TN') => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewId, language, setLanguage, toggleSidebar }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial count
    const updateCount = () => {
      const saved = localStorage.getItem('tnpsc_admin_notifications');
      if (saved) {
        const parsed: AdminNotification[] = JSON.parse(saved);
        setNotifCount(parsed.filter(n => n.isActive).length);
      } else {
        setNotifCount(DEFAULT_NOTIFICATIONS.filter(n => n.isActive).length);
      }
    };

    updateCount();

    // Listen for local changes to notifications
    const interval = setInterval(updateCount, 2000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const getLocalizedTitle = () => {
    const s = UI_STRINGS[language];
    switch (viewId) {
      case 'dashboard': return s.dashboard;
      case 'current-affairs': return s.currentAffairs;
      case 'chat': return s.aiPreceptor;
      case 'pyq': return s.pyqAnalyzer;
      case 'predictor': return s.predictor;
      case 'saved-answers': return s.savedAnswers;
      case 'exams': return s.exams;
      case 'syllabus': return s.syllabus;
      case 'admin-login': return language === 'TN' ? 'அதிகாரி உள்நுழைவு' : 'Officer Login';
      case 'admin-dashboard': return language === 'TN' ? 'நிர்வாகத் தளம்' : 'Officer Dashboard';
      default: return '';
    }
  };

  const handleNotifClick = () => {
    // If not on dashboard, switch to it
    if (viewId !== 'dashboard') {
      // In a real world app we'd use a context or global dispatcher
      // Here we assume the parent 'App' listens to some event or we trigger a scroll flag
      window.dispatchEvent(new CustomEvent('switch-view', { detail: 'dashboard' }));
    }
    // Set a flag to trigger scroll in Dashboard component
    localStorage.setItem('tnpsc_scroll_to_notifs', 'true');
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
        <div className="flex flex-col">
          <h2 className={`font-black text-[#003366] tracking-tight font-scholarly truncate max-w-[150px] sm:max-w-none transition-all ${
            language === 'TN' ? 'text-sm md:text-lg' : 'text-base md:text-xl'
          }`}>
            {getLocalizedTitle()}
          </h2>
          {!isOnline && (
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1 animate-pulse">
              <WifiOff size={10} /> {language === 'TN' ? 'ஆஃப்லைன்' : 'Offline'}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-2 mr-4 text-slate-400">
           {isOnline ? <Wifi size={14} className="text-green-500" /> : <WifiOff size={14} className="text-red-500" />}
           <span className="text-[10px] font-black uppercase tracking-widest">
             {isOnline ? (language === 'TN' ? 'இணைக்கப்பட்டுள்ளது' : 'Connected') : (language === 'TN' ? 'ஆஃப்லைன்' : 'Offline')}
           </span>
        </div>

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
        
        <button 
          onClick={handleNotifClick}
          className="p-2.5 hover:bg-slate-100 rounded-xl relative text-slate-600 transition-colors group"
        >
          <Bell size={22} className="group-hover:animate-swing" />
          {notifCount > 0 && (
            <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full border-2 border-white group-hover:scale-110 text-[9px] font-bold flex items-center justify-center px-1 transition-transform">
              {notifCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
