import React from 'react';
import { Download, X, Sparkles } from 'lucide-react';

interface InstallPromptProps {
  language: 'EN' | 'TN';
  onInstall: () => void;
  canInstall: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ language, onInstall, canInstall }) => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  // If the browser hasn't fired beforeinstallprompt or user dismissed, don't show
  if (!canInstall || isDismissed) return null;

  // Dicebear icon matching the manifest
  const appIconUrl = 'https://api.dicebear.com/9.x/initials/png?seed=TNPSC+Frnd&backgroundColor=003366&fontColor=FFD700&fontSize=40&size=192';

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-md animate-in slide-in-from-top-10">
      <div className="bg-[#003366] text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#FFD700] rounded-2xl flex items-center justify-center p-0.5 shrink-0 overflow-hidden shadow-lg">
            <img 
              src={appIconUrl} 
              alt="TNPSC Frnd Icon" 
              className="w-full h-full object-cover rounded-[1.1rem]" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles size={12} className="text-[#FFD700]" />
              <h4 className="text-sm font-black uppercase tracking-tight">
                {language === 'TN' ? 'TNPSC Frnd ஆப்' : 'TNPSC Frnd App'}
              </h4>
            </div>
            <p className="text-[10px] text-blue-100 font-bold opacity-80 leading-tight">
              {language === 'TN' ? 'வேகமான அனுபவத்திற்கு முகப்புத் திரையில் சேர்க்கவும்.' : 'Add to home screen for an instant exam prep experience.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onInstall}
            className="bg-[#FFD700] text-[#003366] px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            <Download size={18} /> {language === 'TN' ? 'நிறுவு' : 'Install'}
          </button>
          <button 
            onClick={() => setIsDismissed(true)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white/40"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;