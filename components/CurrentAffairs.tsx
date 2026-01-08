
import React, { useState } from 'react';
import { Newspaper, Search, Loader2, Link2, ExternalLink, Bookmark, Check } from 'lucide-react';
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

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setIsSaved(false);
    try {
      const prompt = `Analyze the following news or topic for TNPSC preparation: "${input}". 
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#003366] font-scholarly">{s.currentAffairs}</h2>
        <p className="text-slate-500 mt-2">{language === 'TN' ? 'செய்தி அல்லது அரசு திட்டங்கள் குறித்து கேளுங்கள்.' : 'Paste news text or ask for updates on government policies.'}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'TN' ? "எ.கா: 'தமிழகத்தில் புதுமைப் பெண் திட்டம் எவ்வாறு செயல்படுத்தப்படுகிறது?'" : "e.g., 'What is the recent update on the PM-KUSUM scheme and its implementation in Tamil Nadu?'"}
          className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none resize-none transition-all text-slate-700"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !input.trim()}
            className="bg-[#003366] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#004080] transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            {s.analyzeBtn}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-4">
          <Loader2 className="animate-spin text-[#003366]" size={40} />
          <p className="font-medium animate-pulse">{language === 'TN' ? 'தகவல்களைச் சேகரிக்கிறது...' : 'Gathering latest facts from reliable sources...'}</p>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in duration-500">
          <div className="bg-[#003366] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FFD700]">
              <Newspaper size={20} />
              <h3 className="font-bold uppercase tracking-wider text-sm">{language === 'TN' ? 'பகுப்பாய்வு அறிக்கை' : 'Analysis Report'}</h3>
            </div>
            <button 
              onClick={saveResult}
              disabled={isSaved}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isSaved ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isSaved ? <><Check size={14} /> {language === 'TN' ? 'சேமிக்கப்பட்டது' : 'Saved'}</> : <><Bookmark size={14} /> {s.saveBtn}</>}
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="prose prose-slate max-w-none prose-headings:text-[#003366] prose-strong:text-[#003366]">
              {analysis.split('\n').map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {para}
                </p>
              ))}
            </div>

            {sources.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2 mb-4">
                  <Link2 size={16} /> {language === 'TN' ? 'ஆதாரங்கள்' : 'Verified Sources'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source, i) => (source.web && source.web.uri) && (
                    <a 
                      key={i} 
                      href={source.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 hover:bg-[#FFD700]/20 hover:text-[#003366] transition-all"
                    >
                      {source.web.title || (language === 'TN' ? 'ஆதாரம்' : 'Source')} <ExternalLink size={12} />
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
