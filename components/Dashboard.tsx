import React, { useState, useEffect, useRef } from 'react';
import { AppView, AdminNotification, StudyTask } from '../types.ts';
import { ArrowRight, BookOpen, GraduationCap, Target, Clock, Languages, ExternalLink, Bell, X, Info, Sparkles, Cpu, Calculator, Activity, CalendarCheck } from 'lucide-react';
import { UI_STRINGS, DEFAULT_NOTIFICATIONS } from '../constants.ts';

interface DashboardProps {
  setView: (view: AppView) => void;
  language: 'EN' | 'TN';
  setLanguage: (lang: 'EN' | 'TN') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, language, setLanguage }) => {
  const s = UI_STRINGS[language];
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [userName, setUserName] = useState('');
  const notifSectionRef = useRef<HTMLDivElement>(null);

  // Usage Stats State
  const [chatWords, setChatWords] = useState(0);
  const [pyqWords, setPyqWords] = useState(0);
  const [caWords, setCaWords] = useState(0);
  const [studyPlanProgress, setStudyPlanProgress] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const loadLocalStats = () => {
    const getWords = (key: string) => parseInt(localStorage.getItem(key) || '0', 10);
    setChatWords(getWords('tnpsc_words_chat'));
    setPyqWords(getWords('tnpsc_words_pyq'));
    setCaWords(getWords('tnpsc_words_ca'));
    setUserName(localStorage.getItem('tnpsc_user_name') || '');

    const savedPlan = localStorage.getItem('tnpsc_study_plan');
    if (savedPlan) {
      const tasks: StudyTask[] = JSON.parse(savedPlan);
      setTotalTasks(tasks.length);
      if (tasks.length > 0) {
        const completed = tasks.filter(t => t.isCompleted).length;
        setStudyPlanProgress(Math.round((completed / tasks.length) * 100));
      } else {
        setStudyPlanProgress(0);
      }
    } else {
      setTotalTasks(0);
      setStudyPlanProgress(0);
    }
  };

  useEffect(() => {
    loadLocalStats();
    window.addEventListener('storage', loadLocalStats);

    const checkScroll = () => {
      const trigger = localStorage.getItem('tnpsc_scroll_to_notifs');
      if (trigger === 'true' && notifSectionRef.current) {
        notifSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        localStorage.removeItem('tnpsc_scroll_to_notifs');
      }
    };
    
    const interval = setInterval(checkScroll, 500);

    const saved = localStorage.getItem('tnpsc_admin_notifications');
    let activeNotifs: AdminNotification[] = [];
    if (saved) {
      activeNotifs = JSON.parse(saved).filter((n: AdminNotification) => n.isActive);
    } else {
      activeNotifs = DEFAULT_NOTIFICATIONS.filter(n => n.isActive);
    }
    setNotifications(activeNotifs);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadLocalStats);
    };
  }, []);

  const totalWords = chatWords + pyqWords + caWords;
  const estimatedTokens = totalWords * 1.33;
  const officialCostUSD = (estimatedTokens / 1000000) * 0.15; 
  const officialCostINR = officialCostUSD * 83.5; 

  const usageStats = [
    { 
      label: language === 'TN' ? 'AI பயிற்றுவிப்பாளர் பயன்பாடு' : 'AI Preceptor Usage', 
      value: chatWords.toLocaleString(), 
      sub: language === 'TN' ? 'மொத்த வார்த்தைகள்' : 'Total Words',
      icon: <Sparkles className="text-indigo-500" size={20} />
    },
    { 
      label: language === 'TN' ? 'PYQ தரவு பகுப்பாய்வு' : 'PYQ Data Analyzed', 
      value: pyqWords.toLocaleString(), 
      sub: language === 'TN' ? 'மொத்த வார்த்தைகள்' : 'Total Words',
      icon: <Cpu className="text-amber-500" size={20} />
    },
    { 
      label: language === 'TN' ? 'நடப்பு நிகழ்வுகள் தாக்கம்' : 'Current Affairs Impact', 
      value: caWords.toLocaleString(), 
      sub: language === 'TN' ? 'மொத்த வார்த்தைகள்' : 'Total Words',
      icon: <Activity className="text-blue-500" size={20} />
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Welcome & Study Progress Section */}
      <section className="bg-[#003366] text-white p-6 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-4">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Aspirant Hub</span>
            </div>
            <h1 className={`font-extrabold font-scholarly mb-3 leading-tight tracking-tight ${
              language === 'TN' ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'
            }`}>{s.welcome}{userName ? `, ${userName}!` : '!'}</h1>
            <p className="text-blue-100 mb-8 leading-relaxed opacity-90 max-w-md">
              {s.journey}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setView('chat')}
                className="bg-[#FFD700] text-[#003366] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg active:scale-95"
              >
                {s.startLearning} <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setView('study-plan')}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95"
              >
                <CalendarCheck size={20} /> {s.studyPlan}
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-100">{language === 'TN' ? 'படிப்பு முன்னேற்றம்' : 'Study Plan Progress'}</h4>
              <span className="text-2xl font-black text-[#FFD700]">{studyPlanProgress}%</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-6">
              <div className="bg-[#FFD700] h-full transition-all duration-1000" style={{ width: `${studyPlanProgress}%` }} />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-blue-200">
              <span>{totalTasks} {language === 'TN' ? 'மொத்த பணிகள்' : 'Total Tasks'}</span>
              <button onClick={() => setView('study-plan')} className="hover:text-white underline">{language === 'TN' ? 'திட்டத்தைப் பார்' : 'View Plan'}</button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>

      {/* Usage Counters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {usageStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-hover hover:border-[#003366]/30 group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-[#003366]/5 transition-colors">
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-black text-[#003366] mt-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
            <p className={`font-bold mt-2 bg-blue-50 inline-block px-2 py-1 rounded-md text-blue-600 ${
              language === 'TN' ? 'text-[10px]' : 'text-xs'
            }`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* API Cost Metric Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-[2rem] shadow-xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Calculator size={120} /></div>
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Cpu size={32} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-100 mb-1">{language === 'TN' ? 'உங்கள் பயன்பாட்டுச் செலவு' : 'Your Usage Cost'}</h4>
            <p className="text-3xl font-black tracking-tight">₹{officialCostINR.toFixed(4)} <span className="text-sm font-normal opacity-70">INR Usage</span></p>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{language === 'TN' ? 'அதிகாரப்பூர்வ டோக்கன் மதிப்பீடு' : 'Official Token Estimate'}</p>
          <p className="text-lg font-black">{estimatedTokens.toLocaleString()} <span className="text-xs font-bold uppercase">Tokens</span></p>
        </div>
      </div>

      <section ref={notifSectionRef} className="bg-slate-100/50 p-6 md:p-8 rounded-[3rem] border border-dashed border-slate-300 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{s.notifications}</h4>
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-200"></span>
        </div>
        <div className="space-y-4">
          {notifications.length > 0 ? notifications.map((notif) => (
            <div key={notif.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm gap-4 transition-all hover:border-[#003366]/20 group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors duration-500 shadow-inner">
                  <Bell className="animate-swing" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-bold text-slate-900 ${language === 'TN' ? 'text-sm' : 'text-[15px]'}`}>{notif.title}</p>
                    <span className="text-[8px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-widest">OFFICIAL</span>
                  </div>
                  <p className={`text-slate-500 leading-relaxed ${language === 'TN' ? 'text-xs' : 'text-sm'}`}>{notif.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={12} /> {notif.date}</span>
                <a href={notif.applyLink} target="_blank" rel="noopener noreferrer" className="bg-[#003366] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#004080] transition-all shadow-lg active:scale-95">
                  {language === 'TN' ? 'விண்ணப்பிக்க' : 'Apply Now'} <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="p-6 bg-slate-50 rounded-full mb-4 border border-slate-100"><Info className="text-slate-300" size={40} /></div>
              <p className="text-slate-400 font-bold max-w-xs leading-relaxed">{language === 'TN' ? 'தற்போது புதிய அறிவிப்புகள் ஏதுமில்லை.' : 'No active notifications at the moment.'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;