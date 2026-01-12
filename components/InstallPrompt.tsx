import React from 'react';
import { Download, X } from 'lucide-react';

interface InstallPromptProps {
  language: 'EN' | 'TN';
  onInstall: () => void;
  canInstall: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ language, onInstall, canInstall }) => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (!canInstall || isDismissed) return null;

  // Use the standard icon from the CDN
  const appIconUrl = 'https://www.gstatic.com/images/branding/product/1x/education_192dp.png';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in slide-in-from-bottom-10">
      <div className="bg-[#003366] text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center text-[#003366] shrink-0 overflow-hidden">
            <img 
              src={appIconUrl} 
              alt="App Icon" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">
              {language === 'TN' ? 'ஆப்பை நிறுவுக' : 'Install App'}
            </h4>
            <p className="text-[10px] text-blue-200 font-bold opacity-80">
              {language === 'TN' ? 'வேகமான அனுபவத்திற்கு இதை முகப்புத் திரையில் சேர்க்கவும்.' : 'Add to home screen for a faster experience.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onInstall}
            className="bg-[#FFD700] text-[#003366] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg"
          >
            <Download size={16} /> {language === 'TN' ? 'நிறுவு' : 'Install'}
          </button>
          <button 
            onClick={() => setIsDismissed(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;