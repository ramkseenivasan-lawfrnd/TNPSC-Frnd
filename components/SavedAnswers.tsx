
import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, Calendar, FileText, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { SavedItem } from '../types.ts';
import { UI_STRINGS } from '../constants.ts';

interface SavedAnswersProps {
  language: 'EN' | 'TN';
}

const SavedAnswers: React.FC<SavedAnswersProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('tnpsc_frnd_saved_items');
    if (data) {
      setSavedItems(JSON.parse(data));
    }
  }, []);

  const deleteItem = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('tnpsc_frnd_saved_items', JSON.stringify(updated));
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (savedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
        <Bookmark size={64} className="opacity-20" />
        <div className="text-center">
          <h3 className={`font-bold transition-all ${language === 'TN' ? 'text-base' : 'text-lg'}`}>
            {language === 'TN' ? 'சேமிக்கப்பட்டவை ஏதுமில்லை' : 'No Saved Answers Yet'}
          </h3>
          <p className={`transition-all ${language === 'TN' ? 'text-xs' : 'text-sm'}`}>
            {language === 'TN' ? 'பிற தொகுதிகளில் நீங்கள் சேமிக்கும் முடிவுகள் இங்கே தோன்றும்.' : 'Analysis results you save from other modules will appear here.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between px-2 sm:px-0">
        <h2 className={`font-bold text-[#003366] font-scholarly transition-all ${
          language === 'TN' ? 'text-xl' : 'text-2xl'
        }`}>{language === 'TN' ? 'அறிவு வங்கி' : 'Knowledge Bank'}</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          {savedItems.length} {language === 'TN' ? 'உருப்படிகள்' : 'Items'}
        </span>
      </div>

      <div className="space-y-4 px-2 sm:px-0">
        {savedItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`p-2 rounded-lg shrink-0 ${
                  item.type === 'current-affairs' ? 'bg-blue-100 text-blue-600' : 
                  item.type === 'pyq' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  {item.type === 'current-affairs' ? <FileText size={20} /> : 
                   item.type === 'pyq' ? <MessageSquare size={20} /> : <MessageSquare size={20} />}
                </div>
                <div className="truncate">
                  <h4 className={`font-bold text-slate-800 truncate transition-all ${
                    language === 'TN' ? 'text-sm' : 'text-base'
                  }`}>{item.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <Calendar size={10} /> {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-[9px] md:text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-500 font-bold uppercase tracking-wider">
                      {item.type === 'current-affairs' ? s.currentAffairs : item.type === 'pyq' ? s.pyqAnalyzer : s.aiPreceptor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title={language === 'TN' ? 'நீக்கு' : 'Delete'}
                >
                  <Trash2 size={18} />
                </button>
                {expandedId === item.id ? <ChevronUp className="text-slate-400" size={18} /> : <ChevronDown className="text-slate-400" size={18} />}
              </div>
            </div>

            {expandedId === item.id && (
              <div className="p-5 md:p-8 border-t border-slate-100 bg-slate-50 animate-in slide-in-from-top-2 duration-300">
                <div className="prose prose-slate max-w-none prose-sm">
                  {item.content.split('\n').map((line, i) => {
                    const isQuestionHeader = line === 'QUESTION:' || line === 'வினா:';
                    const isAnswerHeader = line === 'ANSWER:' || line === 'விடை:';
                    
                    if (isQuestionHeader) return <div key={i} className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2 mb-2">{language === 'TN' ? 'வினா' : 'Question'}</div>;
                    if (isAnswerHeader) return <div key={i} className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-8 mb-2 border-t border-slate-200 pt-6">{language === 'TN' ? 'AI விளக்கம்' : 'AI Preceptor Answer'}</div>;
                    
                    return (
                      <p key={i} className={`text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap transition-all ${
                        language === 'TN' ? 'text-[13px]' : 'text-sm md:text-base'
                      }`}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAnswers;
