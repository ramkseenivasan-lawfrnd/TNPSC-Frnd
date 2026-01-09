
import React, { useState } from 'react';
import { Newspaper, Search, Loader2, Link2, ExternalLink, Bookmark, Check, Zap, Flame } from 'lucide-react';
import { generateExamContent } from '../services/gemini.ts';
import { GroundingChunk, SavedItem } from '../types.ts';
import { UI_STRINGS } from '../constants.ts';

interface CurrentAffairsProps {
  language: 'EN' | 'TN';
}

const CurrentAffairs: React.FC<CurrentAffairsProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const trendingTopics = language === 'TN' 
    ? [
        "கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்",
        "புதுமைப் பெண் திட்டம் - தாக்கம்",
        "கீழடி அகழ்வாராய்ச்சி சமீபத்திய கண்டுபிடிப்புகள்",
        "முதலமைச்சரின் காலை உணவுத் திட்டம்",
        "தமிழ்நாடு பசுமை இயக்கம் (Green TN Mission)",
        "இல்லம் தேடி கல்வி திட்டம்"
      ]
    : [
        "Kalaignar Magalir Urimai Thogai Scheme",
        "Impact of Pudhumai Penn Scheme",
        "Latest Keeladi Excavation findings",
        "CM Breakfast Scheme implementation",
        "Green Tamil Nadu Mission goals",
        "Illam Thedi Kalvi success report"
      ];

  const handleAnalyze = async (forcedInput?: string) => {
    const finalInput = forcedInput || input;
    if (!finalInput.trim()) return;
    
    setIsLoading(true);
    setIsSaved(false);
    setAnalysis(null);
    setSources([]);

    try {
      const prompt = `Analyze the following news or topic for TNPSC preparation: "${finalInput}". 
      Respond in the same language as the input.
      Categorize it into: Govt Policies, Economy, Politics, Law, or Science & Tech. 
      Specifically highlight the "Tamil Nadu impact". Use Google Search for the latest facts.`;
      
      const result = await generateExamContent(prompt);
      setAnalysis(result.text);
      setSources(result.grounding as GroundingChunk[]);
    } catch (error) {
      console.error(error);
      setAnalysis(language === 'TN' ? "பகுப்பாய்வு செய்வதில் பிழை. மீண்டும் முயற்சிக்கவும்." : "Error fetching analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveResult = () => {
    if (!analysis) return;
    const items: SavedItem[] = JSON.parse(localStorage.getItem('tnpsc_frnd_saved_items') || '[]');
    const newItem: SavedItem = {
      id: Date.now().toString(),
      type: 'current-affairs',
      title: input.length > 50 ? input.substring(0, 50) + '...' : input,
      content: analysis,
      timestamp: Date.now()
    };
    items.unshift(newItem);
    localStorage.setItem('tnpsc_frnd_saved_items', JSON.stringify(items));
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-black text-[#003366] font-scholarly">{s.currentAffairs}</h2>
        <p className="text-slate-500 mt-2 font-medium">{language === 'TN' ? 'செய்தி அல்லது அரசு திட்டங்கள் குறித்து கேளுங்கள்.' : 'Paste news text or ask for updates on government policies.'}</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'TN' ? "எ.கா: 'தமிழகத்தில் புதுமைப் பெண் திட்டம் எவ்வாறு செயல்படுத்தப்படுகிறது?'" : "e.g., 'What is the recent update on the PM-KUSUM scheme and its implementation in Tamil Nadu?'"}
            className={`w-full h-40 p-6 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/20 outline-none resize-none transition-all text-slate-700 shadow-inner bg-slate-50/30 ${language === 'TN' ? 'text-sm' : 'text-base'}`}
          />
          <div className="absolute top-4 right-4 text-slate-300">
            <Newspaper size={24} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 ml-1">
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {language === 'TN' ? 'சமீபத்திய முக்கியத் தலைப்புகள்' : 'Trending TN Topics'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(topic);
                  handleAnalyze(topic);
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50 hover:text-[#003366] transition-all flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <Zap size={12} className="text-amber-500" />
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-8">
          <button
            onClick={() => handleAnalyze()}
            disabled={isLoading || !input.trim()}
            className="w-full md:w-auto bg-[#003366] text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#004080] hover:shadow-2xl hover:shadow-[#003366]/20 transition-all disabled:opacity-50 active:scale-95 shadow-lg"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            <span className="text-lg">{s.analyzeBtn}</span>
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-6">
          <div className="relative">
            <Loader2 className="animate-spin text-[#003366]" size={56} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-ping" />
            </div>
          </div>
          <div className="text-center">
             <p className="font-black text-[#003366] uppercase tracking-[0.2em] text-xs mb-2">
               {language === 'TN' ? 'ஆய்வு செய்கிறது' : 'AI PROCESSING'}
             </p>
             <p className="text-sm font-medium animate-pulse text-slate-400 max-w-[250px]">
               {language === 'TN' ? 'நம்பகமான ஆதாரங்களிலிருந்து தகவல்களைச் சேகரிக்கிறது...' : 'Gathering latest facts from reliable government sources...'}
             </p>
          </div>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-[#003366] px-8 py-6 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3 text-[#FFD700]">
              <div className="p-2 bg-white/10 rounded-xl">
                <Newspaper size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-widest text-xs opacity-70 text-blue-200">{language === 'TN' ? 'தேர்வு அறிக்கை' : 'EXAM REPORT'}</h3>
                <h3 className="font-bold text-white text-lg">{language === 'TN' ? 'பகுப்பாய்வு முடிவுகள்' : 'Analysis Results'}</h3>
              </div>
            </div>
            <button 
              onClick={saveResult}
              disabled={isSaved}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg uppercase tracking-widest ${
                isSaved ? 'bg-green-500 text-white' : 'bg-[#FFD700] text-[#003366] hover:bg-yellow-400'
              }`}
            >
              {isSaved ? <><Check size={16} /> {language === 'TN' ? 'சேமிக்கப்பட்டது' : 'Saved'}</> : <><Bookmark size={16} /> {s.saveBtn}</>}
            </button>
          </div>
          <div className="p-8 md:p-12 space-y-8">
            <div className="prose prose-slate max-w-none text-slate-700">
              {analysis.split('\n').map((para, i) => {
                const isHeading = para === para.toUpperCase() && para.trim().length > 3;
                return (
                  <div key={i} className={`leading-relaxed whitespace-pre-wrap mb-4 ${
                    isHeading ? 'text-[#003366] font-black text-lg mt-8 mb-4 border-l-4 border-[#FFD700] pl-4' : 'text-slate-600'
                  } ${language === 'TN' ? 'text-[15px]' : 'text-base'}`}>
                    {para}
                  </div>
                );
              })}
            </div>

            {sources.length > 0 && (
              <div className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-6">
                   <Link2 size={18} className="text-[#003366]" />
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                     {language === 'TN' ? 'சரிபார்க்கப்பட்ட ஆதாரங்கள்' : 'Verified Study Sources'}
                   </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sources.map((source, i) => (source.web && source.web.uri) && (
                    <a 
                      key={i} 
                      href={source.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-[#003366] hover:border-[#003366] transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-white truncate">
                          {source.web.title || (language === 'TN' ? 'அரசு ஆதாரம்' : 'Govt Source')}
                        </p>
                        <p className="text-[10px] text-slate-400 group-hover:text-blue-200 truncate mt-0.5">
                          {new URL(source.web.uri).hostname}
                        </p>
                      </div>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-white shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentAffairs;
