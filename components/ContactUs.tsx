import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building2, Info, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface ContactUsProps {
  language: 'EN' | 'TN';
  isEmbedded?: boolean;
}

type TabType = 'contact' | 'about' | 'terms' | 'privacy';

const ContactUs: React.FC<ContactUsProps> = ({ language, isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState<TabType>('contact');

  const content = {
    contact: {
      entity: "SSLEGALAID CENTER",
      registered: "VENTHAR KUDIL, OLD BATLAGUNDU 624202 Yeluvanampatti BO TAMIL NADU 624202",
      operational: "2/408, SS legalAid Center, RAJA RAJA CHOLAR NAGAR, OLD BATLAGUNDU Dindigul TAMIL NADU 624202",
      phone: "7603928858",
      email: "sslegalaidcenter@gmail.com"
    },
    about: {
      title: language === 'TN' ? 'எங்களைப் பற்றி' : 'About TNPSC Frnd',
      desc: language === 'TN' 
        ? 'TNPSC Frnd என்பது தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையத் தேர்வுகளுக்குத் தயாராகும் மாணவர்களுக்கான நவீன AI வழிகாட்டியாகும். கூகுள் ஜெமினி தொழில்நுட்பத்தின் மூலம் துல்லியமான வினாத்தாள் பகுப்பாய்வு மற்றும் பாடத்திட்ட விளக்கங்களை நாங்கள் வழங்குகிறோம்.' 
        : 'TNPSC Frnd is a cutting-edge AI-powered preparation platform for Tamil Nadu Public Service Commission (TNPSC) exams. Built on Google Gemini technology, we provide aspirants with deep-reasoning question analysis, personalized tutoring, and strategic study roadmaps.'
    },
    privacy: {
      title: language === 'TN' ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy',
      points: language === 'TN' ? [
        'உங்கள் அரட்டை வரலாறு மற்றும் படிப்புத் திட்டங்கள் உங்கள் சாதனத்திலேயே (Local Storage) சேமிக்கப்படுகின்றன.',
        'நாங்கள் எந்தத் தனிப்பட்ட தரவையும் எங்கள் சர்வர்களில் சேமிப்பதில்லை.',
        'அரட்டை உரையாடல்கள் கூகுள் ஜெமினி API மூலம் பாதுகாப்பாகப் பகிரப்படுகின்றன.'
      ] : [
        'Chat history and study plans are stored locally on your device for privacy.',
        'We do not store your personal data or identifiable information on our servers.',
        'Conversations are processed through Google Gemini API adhering to their safety standards.'
      ]
    },
    terms: {
      title: language === 'TN' ? 'நிபந்தனைகள்' : 'Terms & Conditions',
      points: language === 'TN' ? [
        'AI வழங்கும் தகவல்கள் கல்வி நோக்கத்திற்காக மட்டுமே.',
        'முக்கியத் தகவல்களை அதிகாரப்பூர்வ டிஎன்பிஎஸ்சி இணையதளத்தில் சரிபார்க்கவும்.',
        'இந்த ஆப்பை தவறான வழிகளில் பயன்படுத்தக் கூடாது.'
      ] : [
        'AI-generated responses are for educational reference and tutoring purposes.',
        'Users should verify critical information with official TNPSC gazettes.',
        'Unauthorized automated scraping or misuse of the platform is strictly prohibited.'
      ]
    }
  };

  return (
    <div className={`${isEmbedded ? 'space-y-4' : 'max-w-4xl mx-auto space-y-8 pb-20'} animate-in fade-in duration-500`}>
      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
        {[
          { id: 'contact', label: language === 'TN' ? 'தொடர்புக்கு' : 'Contact', icon: Mail },
          { id: 'about', label: language === 'TN' ? 'ஆப் பற்றி' : 'About', icon: Info },
          { id: 'terms', label: language === 'TN' ? 'நிபந்தனைகள்' : 'Terms', icon: FileText },
          { id: 'privacy', label: language === 'TN' ? 'தனியுரிமை' : 'Privacy', icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all shrink-0 uppercase tracking-widest ${
              activeTab === tab.id ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-[#003366]'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className={`bg-white rounded-[2.5rem] ${isEmbedded ? 'border-none' : 'shadow-xl border border-slate-200'} overflow-hidden`}>
        {activeTab === 'contact' && (
          <div className={`${isEmbedded ? 'p-4' : 'p-8 md:p-12'} space-y-10 animate-in slide-in-from-bottom-4`}>
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="p-4 bg-blue-50 text-[#003366] rounded-2xl shadow-inner">
                <Building2 size={32} />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Legal Entity</h3>
                <p className="text-xl font-black text-[#003366]">{content.contact.entity}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-50 text-[#003366] rounded-lg shrink-0 h-fit"><MapPin size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registered Address</h4>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">{content.contact.registered}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-50 text-[#003366] rounded-lg shrink-0 h-fit"><MapPin size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Operational Address</h4>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">{content.contact.operational}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-50 text-blue-600 rounded-lg shrink-0 h-fit"><Phone size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Telephone No</h4>
                    <p className="text-lg font-black text-[#003366]">{content.contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-2 bg-slate-50 text-indigo-600 rounded-lg shrink-0 h-fit"><Mail size={20} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">E-Mail ID</h4>
                    <p className="text-sm font-black text-[#003366] hover:underline cursor-pointer">{content.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className={`${isEmbedded ? 'p-4' : 'p-8 md:p-12'} space-y-6 animate-in slide-in-from-bottom-4`}>
            <h3 className="text-2xl font-black text-[#003366]">{content.about.title}</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{content.about.desc}</p>
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-dashed border-blue-200">
              <p className="text-sm font-bold text-blue-800 leading-relaxed">
                {language === 'TN' 
                  ? 'எங்கள் நோக்கம்: தமிழக அரசுப் பணிகளுக்கான தயாரிப்பை அனைவரும் எளிதில் அணுகுவதை உறுதி செய்தல்.' 
                  : 'Our Mission: To democratize access to high-quality TNPSC coaching through advanced AI, ensuring every aspirant has a personal mentor.'}
              </p>
            </div>
          </div>
        )}

        {(activeTab === 'privacy' || activeTab === 'terms') && (
          <div className={`${isEmbedded ? 'p-4' : 'p-8 md:p-12'} space-y-8 animate-in slide-in-from-bottom-4`}>
            <h3 className="text-2xl font-black text-[#003366]">{activeTab === 'privacy' ? content.privacy.title : content.terms.title}</h3>
            <div className="space-y-4">
              {(activeTab === 'privacy' ? content.privacy.points : content.terms.points).map((point, i) => (
                <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#003366]/20 transition-all">
                  <ChevronRight size={18} className="text-[#003366] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;