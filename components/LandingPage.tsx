import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Zap, ShieldCheck, Mail, MapPin, Building2, Phone } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';

interface LandingPageProps {
  language: 'EN' | 'TN';
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onStart }) => {
  const s = UI_STRINGS[language].landing;

  const features = [
    { 
      icon: Sparkles, 
      title: language === 'TN' ? 'AI பயிற்றுவிப்பாளர்' : 'AI Preceptor', 
      desc: language === 'TN' ? '24/7 தனிப்பட்ட ஆசிரியர்' : 'Your personal 24/7 syllabus mentor.' 
    },
    { 
      icon: BookOpen, 
      title: language === 'TN' ? 'PYQ பகுப்பாய்வு' : 'PYQ Analyzer', 
      desc: language === 'TN' ? 'வினாத்தாள்களின் உடனடி தீர்வுகள்' : 'Solve old papers with deep AI insights.' 
    },
    { 
      icon: Zap, 
      title: language === 'TN' ? 'தேர்வு கணிப்பு' : 'Exam Predictor', 
      desc: language === 'TN' ? 'வரவிருக்கும் தேர்வுக்கான 100 வினாக்கள்' : 'Predict the 100 most probable questions.' 
    }
  ];

  const contactInfo = {
    entity: "SSLEGALAID CENTER",
    address: "2/408, RAJA RAJA CHOLAR NAGAR, OLD BATLAGUNDU, Dindigul, Tamil Nadu 624202",
    email: "sslegalaidcenter@gmail.com",
    phone: "7603928858"
  };

  return (
    <div className="fixed inset-0 z-[300] bg-white overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <section className="relative bg-[#003366] text-white pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles size={16} className="text-[#FFD700]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">AI Preparation Suite</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-scholarly mb-6 tracking-tight leading-tight">
            {s.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 font-medium opacity-90 max-w-2xl mx-auto leading-relaxed">
            {s.heroSub}
          </p>
          <button 
            onClick={onStart}
            className="group bg-[#FFD700] text-[#003366] px-12 py-6 rounded-[2.5rem] text-xl font-black shadow-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-4 mx-auto active:scale-95"
          >
            {s.cta} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#003366] mb-4 uppercase tracking-tight">{s.featureHeading}</h2>
            <div className="w-20 h-1.5 bg-[#FFD700] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group hover:border-[#003366]/20 transition-all">
                <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-[#003366] mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Legal Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-[#003366] mb-4 uppercase tracking-tight">{s.trustHeading}</h2>
              <p className="text-slate-500 font-bold">{s.trustSub}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Building2 className="text-[#003366]" size={20} />
                <span className="text-sm font-bold text-slate-700">{contactInfo.entity}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="text-[#003366]" size={20} />
                <span className="text-sm font-bold text-slate-700">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Mail className="text-[#003366]" size={20} />
                <span className="text-sm font-bold text-slate-700">{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Phone className="text-[#003366]" size={20} />
                <span className="text-sm font-bold text-slate-700">{contactInfo.phone}</span>
              </div>
            </div>

            <div className="p-6 bg-blue-50/50 rounded-3xl border border-dashed border-blue-200">
              <div className="flex items-center gap-3 mb-2 text-[#003366]">
                <ShieldCheck size={20} />
                <h4 className="font-black text-xs uppercase tracking-widest">Privacy Guarantee</h4>
              </div>
              <p className="text-sm font-bold text-slate-600">{s.privacyNote}</p>
            </div>
          </div>

          <div className="bg-[#003366] p-12 rounded-[3.5rem] text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white/5 blur-3xl rounded-full translate-x-1/2" />
             <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">{language === 'TN' ? 'வெற்றியை நோக்கி!' : 'Ready for Success?'}</h3>
                <p className="text-blue-100 font-medium mb-10 opacity-80 leading-relaxed">
                  {language === 'TN' 
                    ? 'இன்றே உங்கள் பயிற்சியைத் தொடங்குங்கள். எங்களின் AI உங்களுக்கு ஒரு சிறந்த வழிகாட்டியாக இருக்கும்.' 
                    : 'Join thousands of aspirants using AI to simplify their preparation. Your officer journey starts now.'}
                </p>
                <button 
                  onClick={onStart}
                  className="w-full bg-[#FFD700] text-[#003366] px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                >
                  {s.cta}
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
          &copy; 2025 TNPSC FRND • SSLEGALAID CENTER • BATLAGUNDU
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;