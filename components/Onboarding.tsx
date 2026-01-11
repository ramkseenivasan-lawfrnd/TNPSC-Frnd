import React, { useState } from 'react';
import { Sparkles, ArrowRight, User, BookOpen, Zap, Info, Building2, CheckCircle, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';
import ContactUs from './ContactUs.tsx';

interface OnboardingProps {
  language: 'EN' | 'TN';
  onComplete: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ language, onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [viewingLegal, setViewingLegal] = useState(false);
  const s = UI_STRINGS[language].onboarding;

  const features = [
    { icon: Sparkles, title: language === 'TN' ? 'AI பயிற்றுவிப்பாளர்' : 'AI Preceptor', desc: language === 'TN' ? '24/7 தனிப்பட்ட ஆசிரியர்' : 'Your personal 24/7 exam mentor.' },
    { icon: BookOpen, title: language === 'TN' ? 'PYQ பகுப்பாய்வு' : 'PYQ Analyzer', desc: language === 'TN' ? 'வினாத்தாள்களின் உடனடி தீர்வுகள்' : 'Solve old papers with deep AI insights.' },
    { icon: Zap, title: language === 'TN' ? 'தேர்வு கணிப்பு' : 'Exam Predictor', desc: language === 'TN' ? 'வரவிருக்கும் தேர்வுக்கான 100 வினாக்கள்' : 'Predict the 100 most probable questions.' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (isAgreed) {
        onComplete(name || (language === 'TN' ? 'நண்பா' : 'Aspirant'));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#003366] overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500 flex flex-col min-h-[600px] max-h-[90vh]">
        {/* Progress Bar (Hidden when viewing legal) */}
        {!viewingLegal && (
          <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-4 pt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#003366]' : 'bg-slate-100'}`} />
            ))}
          </div>
        )}

        <div className="p-8 md:p-12 pt-16 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {viewingLegal ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <button 
                onClick={() => setViewingLegal(false)}
                className="flex items-center gap-2 text-[#003366] font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform mb-4"
              >
                <ArrowLeft size={16} /> {language === 'TN' ? 'திரும்பச் செல்' : 'Back to Setup'}
              </button>
              <ContactUs language={language} isEmbedded={true} />
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 flex-1">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-50 text-[#003366] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <User size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-[#003366] mb-2">{s.welcome}</h2>
                    <p className="text-slate-500 font-medium">{s.namePrompt}</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={s.namePlaceholder}
                      className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl font-bold text-[#003366] outline-none focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/5 transition-all text-center"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 flex-1">
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-[#003366] mb-2">{s.featureTitle}</h2>
                    <p className="text-slate-500 text-sm">{language === 'TN' ? 'தேர்வில் வெற்றி பெற உதவும் கருவிகள்' : 'Tools to master your TNPSC preparation'}</p>
                  </div>

                  <div className="space-y-4">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-center gap-5 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-[#003366]/20 transition-all">
                        <div className="p-3 bg-white text-[#003366] rounded-2xl shadow-sm group-hover:bg-[#003366] group-hover:text-white transition-all">
                          <f.icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-[#003366] text-sm uppercase tracking-wide">{f.title}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 flex-1">
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-[#003366] mb-2">{s.aboutTitle}</h2>
                    <p className="text-slate-500 text-sm">{language === 'TN' ? 'சட்டப்பூர்வ தகவல்கள்' : 'Legal & Trust Information'}</p>
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-dashed border-blue-200 space-y-4">
                    <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                      <Building2 className="text-[#003366]" size={20} />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Entity</p>
                        <p className="text-sm font-black text-[#003366]">SSLEGALAID CENTER</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-bold text-slate-600">
                          {language === 'TN' ? 'உங்கள் தரவுகள் பாதுகாப்பாக உங்கள் சாதனத்திலேயே சேமிக்கப்படும்.' : 'Your prep data is stored safely on your device.'}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-bold text-slate-600">
                          {language === 'TN' ? 'தமிழக அரசுத் தேர்வுகளுக்கான பிரத்யேக AI உதவி.' : 'Dedicated AI assistance for TN state government exams.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Consent Checkbox */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 group">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="w-5 h-5 mt-0.5 accent-[#003366] cursor-pointer"
                      />
                      <span className={`text-[11px] font-bold leading-relaxed transition-colors ${isAgreed ? 'text-[#003366]' : 'text-slate-500'}`}>
                        {s.agreeConsent}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8">
                <button 
                  onClick={() => setViewingLegal(true)}
                  className="flex items-center gap-2 text-[10px] font-black text-[#003366] uppercase tracking-widest hover:underline group"
                >
                  <ShieldCheck size={14} className="group-hover:animate-pulse" />
                  {s.contactLink}
                </button>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {step > 1 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="px-8 py-4 text-[#003366] font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all"
                    >
                      Back
                    </button>
                  )}
                  
                  <button 
                    onClick={handleNext}
                    disabled={(step === 1 && !name.trim()) || (step === 3 && !isAgreed)}
                    className="flex-1 sm:flex-none bg-[#003366] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#004080] shadow-xl active:scale-95 transition-all disabled:opacity-50"
                  >
                    {step === 3 ? s.finish : s.next} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Onboarding Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <Mail size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">sslegalaidcenter@gmail.com</span>
          </div>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Tamil Nadu, India
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;