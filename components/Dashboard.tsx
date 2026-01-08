
import React from 'react';
import { AppView } from '../types.ts';
import { ArrowRight, BookOpen, GraduationCap, Target, Clock, Languages } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';

interface DashboardProps {
  setView: (view: AppView) => void;
  language: 'EN' | 'TN';
  setLanguage: (lang: 'EN' | 'TN') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, language, setLanguage }) => {
  const s = UI_STRINGS[language];

  const stats = [
    { label: s.stats.examDays, value: '45', sub: language === 'TN' ? 'குரூப் II முதன்மைத் தேர்வு' : 'Group II Prelims' },
    { label: s.stats.prepLevel, value: '68%', sub: language === 'TN' ? 'இலக்கு 85%' : 'Target 85%' },
    { label: s.stats.pyqsSolved, value: '1,240', sub: language === 'TN' ? 'கடந்த 30 நாட்கள்' : 'Last 30 days' },
  ];

  const tools = [
    { 
      id: 'current-affairs', 
      title: s.currentAffairs, 
      desc: language === 'TN' ? 'தமிழகம் சார்ந்த நடப்பு நிகழ்வுகளை பகுப்பாய்வு செய்யவும்.' : 'Analyze daily news with TN-specific impact reports.',
      color: 'bg-blue-500'
    },
    { 
      id: 'chat', 
      title: s.aiPreceptor, 
      desc: language === 'TN' ? 'பாடத்திட்டம் குறித்த சந்தேகங்களுக்கு உடனடி விளக்கம்.' : 'Instant doubt clearing using standard TNPSC syllabus.',
      color: 'bg-indigo-500'
    },
    { 
      id: 'pyq', 
      title: s.pyqAnalyzer, 
      desc: language === 'TN' ? 'முந்தைய ஆண்டு வினாக்களின் விரிவான பகுப்பாய்வு.' : 'Detailed breakdown of previous year questions.',
      color: 'bg-amber-500'
    },
    { 
      id: 'predictor', 
      title: s.predictor, 
      desc: language === 'TN' ? 'தேர்வு முறைகளின் அடிப்படையில் எதிர்கால கணிப்புகள்.' : 'Future-focused insights based on exam patterns.',
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Welcome Section */}
      <section className="bg-[#003366] text-white p-6 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className={`font-extrabold font-scholarly mb-3 leading-tight tracking-tight transition-all ${
            language === 'TN' ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'
          }`}>{s.welcome}</h1>
          <p className={`text-blue-100 mb-8 leading-relaxed opacity-90 transition-all ${
            language === 'TN' ? 'text-sm md:text-lg' : 'text-base md:text-xl'
          }`}>
            {s.journey}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button 
              onClick={() => setView('chat')}
              className="bg-[#FFD700] text-[#003366] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg active:scale-95"
            >
              <span className={language === 'TN' ? 'text-sm' : ''}>{s.startLearning}</span> <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setLanguage(language === 'TN' ? 'EN' : 'TN')}
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95"
            >
              <Languages size={20} /> <span className={language === 'TN' ? 'text-sm' : ''}>{s.languageSwitch}</span>
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute -bottom-10 right-0 opacity-5 hidden sm:block">
          <GraduationCap size={280} />
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-hover hover:border-[#003366]/30 group">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-[#003366] mt-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
            <p className={`font-bold mt-2 bg-blue-50 inline-block px-2 py-1 rounded-md text-blue-600 ${
              language === 'TN' ? 'text-[10px]' : 'text-xs'
            }`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Learning Modules */}
      <section>
        <h3 className={`font-extrabold text-[#003366] mb-6 flex items-center gap-3 transition-all ${
          language === 'TN' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
        }`}>
          <BookOpen className="text-[#FFD700]" size={28} />
          {s.prepTools}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setView(tool.id as AppView)}
              className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#003366]/20 transition-all text-left flex flex-col h-full active:scale-[0.98]"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:rotate-6 transition-transform`}>
                <Target size={28} />
              </div>
              <h4 className={`font-bold text-slate-900 mb-3 group-hover:text-[#003366] transition-all ${
                language === 'TN' ? 'text-lg' : 'text-xl'
              }`}>{tool.title}</h4>
              <p className={`leading-relaxed mb-6 flex-grow opacity-80 transition-all ${
                language === 'TN' ? 'text-xs' : 'text-sm'
              }`}>{tool.desc}</p>
              <div className="text-[10px] font-extrabold text-[#003366] flex items-center gap-2 group-hover:translate-x-1 transition-all uppercase tracking-widest bg-slate-50 self-start px-3 py-1.5 rounded-lg">
                {language === 'TN' ? 'அணுகவும்' : 'ACCESS'} <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-slate-100/50 p-6 md:p-8 rounded-3xl border border-dashed border-slate-300">
        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-6 tracking-[0.2em]">{s.notifications}</h4>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <p className={`font-bold text-slate-900 ${
                  language === 'TN' ? 'text-sm' : 'text-[15px]'
                }`}>{language === 'TN' ? 'குரூப் I முதன்மைத் தேர்வு 2024' : 'Group I Mains 2024'}</p>
                <p className={`text-slate-500 mt-1 ${
                  language === 'TN' ? 'text-xs' : 'text-sm'
                }`}>{language === 'TN' ? 'நுழைவுச் சீட்டு ஜூலை 20 அன்று வெளியீடு' : 'Hall Ticket Release on July 20'}</p>
              </div>
            </div>
            <span className="text-[10px] font-black px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100 self-start sm:self-center">ACTIVE</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
