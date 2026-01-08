
import React, { useState } from 'react';
import { TrendingUp, Lock, Sparkles, ChevronRight, BarChart3, Star, Zap } from 'lucide-react';
import { UI_STRINGS } from '../constants.ts';

interface ExamPredictorProps {
  language: 'EN' | 'TN';
}

const ExamPredictor: React.FC<ExamPredictorProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  const [isGated, setIsGated] = useState(true);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#003366] font-scholarly flex items-center justify-center gap-2">
          <TrendingUp className="text-[#FFD700]" />
          {s.predictor}
        </h2>
        <p className="text-slate-500 mt-2">{language === 'TN' ? 'அடுத்த தேர்வுக்கான அதிக வாய்ப்புள்ள தலைப்புகளின் கணிப்புகள்.' : 'AI-driven probability scores for upcoming exam topics.'}</p>
      </div>

      {isGated ? (
        <div className="relative">
          {/* Blurred Background Mockup */}
          <div className="opacity-20 blur-sm pointer-events-none space-y-8">
             <div className="grid grid-cols-3 gap-6">
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
             </div>
             <div className="h-64 bg-slate-200 rounded-2xl"></div>
          </div>

          {/* Premium Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-200 max-w-xl text-center space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#FFD700]">
                <Lock size={40} />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-[#003366] rounded-full text-xs font-bold uppercase tracking-widest">
                  <Star size={12} fill="currentColor" /> {language === 'TN' ? 'பிரீமியம் தொகுதி' : 'Premium Module'}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{language === 'TN' ? 'தேர்வு கணிப்புகளைக் காணவும்' : 'Unlock Predictive Insights'}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'TN' 
                    ? 'கடந்த 5 ஆண்டுகால TNPSC வினாத்தாள்களை ஆய்வு செய்து, 2024-25 தேர்வுக்கான அதிக முக்கியத்துவம் வாய்ந்த பகுதிகளை எங்களின் AI கணிக்கிறது.'
                    : 'Our advanced engine analyzes the last 5 years of TNPSC Group 1, 2, and 4 papers to predict high-yield areas for the 2024-25 session.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-amber-500 mt-1" />
                  <span className="text-xs font-semibold">{language === 'TN' ? '92% வரலாற்றுத் துல்லியம்' : '92% Historical Trend Accuracy'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-amber-500 mt-1" />
                  <span className="text-xs font-semibold">{language === 'TN' ? 'பாடவாரியான முக்கியப் பகுதிகள்' : 'Specific Focus Area Lists'}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsGated(false)} // Simulation for demo
                className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {language === 'TN' ? 'இலவச சோதனை தொடங்கு' : 'Start Free Trial'} <ChevronRight size={20} />
              </button>
              <p className="text-xs text-slate-400">{language === 'TN' ? 'உங்கள் ஆஸ்பிரண்ட் பிரைம் கணக்குடன் உடனடியாக அணுகவும்.' : 'Unlock instantly with your Aspirant Prime account.'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-xl font-bold text-[#003366] font-scholarly">{language === 'TN' ? '2024 தேர்வு கணிப்பு ஆய்வு' : '2024 Predictor Analysis'}</h4>
                 <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold border border-green-200">
                   {language === 'TN' ? 'மேம்படுத்தப்பட்டது: ஜூன் 2024' : 'UPDATED: JUNE 2024'}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { title: language === 'TN' ? 'இந்திய அரசியல்' : 'Indian Polity', score: '94%', trend: language === 'TN' ? 'அதிகரிப்பு' : 'Increasing' },
                  { title: language === 'TN' ? 'அலகு 9 (தமிழக நிர்வாகம்)' : 'Unit 9 (TN Admin)', score: '88%', trend: language === 'TN' ? 'உயர் முன்னுரிமை' : 'High Priority' },
                  { title: language === 'TN' ? 'அறிவியல் & தொழில்நுட்பம்' : 'Science & Tech', score: '76%', trend: language === 'TN' ? 'மிதமான' : 'Moderate' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-2">{item.title}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-[#003366]">{item.score}</span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{item.trend}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-4">
                      <div className="bg-[#FFD700] h-full rounded-full" style={{ width: item.score }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h5 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <BarChart3 size={20} className="text-[#003366]" />
                  {language === 'TN' ? 'கணிக்கப்பட்ட முக்கிய தலைப்புகள்' : 'Predicted High-Yield Topics'}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    language === 'TN' ? "தமிழக உள்ளாட்சித் தேர்தல் சட்டங்கள்" : "TN Local Body Elections Legislation",
                    language === 'TN' ? "மாநில-மத்திய நிதி உறவுகள் (GST)" : "State-Federal Fiscal relations (GST)",
                    language === 'TN' ? "திராவிட இயக்க பாரம்பரியத் தளங்கள்" : "Dravidian Movement Heritage Sites",
                    language === 'TN' ? "தமிழக காலநிலை மாற்றத் திட்டங்கள்" : "Climate Action Plans of Tamil Nadu",
                    language === 'TN' ? "சமூக நீதி & இடஒதுக்கீடு கொள்கைகள்" : "Social Justice & Reservation Policies"
                  ].map((topic, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-blue-100 text-[#003366] flex items-center justify-center text-xs font-bold">{i+1}</span>
                        <span className="text-sm font-semibold text-slate-700">{topic}</span>
                      </div>
                      <Sparkles size={16} className="text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
           </div>
           
           <div className="bg-[#003366] p-8 rounded-2xl text-white flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">{language === 'TN' ? 'ஆழ்ந்த போக்கு பகுப்பாய்வு' : 'Deep-Dive Trend Analysis'}</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {language === 'TN' 
                    ? 'எங்கள் ஆய்வின்படி "அலகு 8" தொடர்பான வினாக்கள் கடந்த மூன்று தேர்வுகளில் 15% அதிகரித்துள்ளன. உங்கள் நேரத்தில் 30% தமிழக பண்பாட்டிற்கு ஒதுக்க பரிந்துரைக்கிறோம்.'
                    : 'Our analysis shows a 15% increase in "Unit 8" related heritage questions over the last three cycles. We recommend spending 30% of your revision time on Tamil Culture and Literature.'}
                </p>
              </div>
              <button className="bg-white text-[#003366] px-8 py-3 rounded-xl font-bold hover:bg-[#FFD700] transition-all shrink-0">
                {language === 'TN' ? 'அறிக்கையைப் பதிவிறக்கு' : 'Download PDF Report'}
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExamPredictor;
