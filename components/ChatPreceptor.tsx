
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertCircle, Copy, Bookmark, Check, Trash2 } from 'lucide-react';
import { streamExamChat } from '../services/gemini.ts';
import { Message, SavedItem } from '../types.ts';
import { UI_STRINGS } from '../constants.ts';

interface ChatPreceptorProps {
  language: 'EN' | 'TN';
}

const ChatPreceptor: React.FC<ChatPreceptorProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: language === 'TN' 
        ? 'வணக்கம்! நான் உங்கள் AI பயிற்றுவிப்பாளர். வரலாறு முதல் அலகு 9 வரை TNPSC பாடத்திட்டத்தின் எந்தவொரு தலைப்பைப் பற்றியும் நான் விளக்குவேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' 
        : 'Vanakkam! I am your AI Preceptor. I can explain complex TNPSC syllabus topics from History to Unit 9. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ 
        role: 'model', 
        text: language === 'TN' 
          ? 'வணக்கம்! நான் உங்கள் AI பயிற்றுவிப்பாளர். வரலாறு முதல் அலகு 9 வரை TNPSC பாடத்திட்டத்தின் எந்தவொரு தலைப்பைப் பற்றியும் நான் விளக்குவேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' 
          : 'Vanakkam! I am your AI Preceptor. I can explain complex TNPSC syllabus topics from History to Unit 9. How can I help you today?' 
      }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      const streamResponse = await streamExamChat(history);
      let fullText = '';
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of streamResponse) {
        const text = chunk.text || '';
        fullText += text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      const errorMsg = language === 'TN' 
        ? "மன்னிக்கவும், தகவல் சேகரிப்பதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சி செய்யவும்."
        : "I encountered an error. This might be due to API limits or network issues. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const saveToKnowledgeBank = (text: string, index: number) => {
    const promptMessage = messages[index - 1];
    const questionText = promptMessage?.role === 'user' ? promptMessage.text : (language === 'TN' ? 'பொதுவான கேள்வி' : 'General Inquiry');
    const title = questionText.length > 50 ? questionText.substring(0, 50) + '...' : questionText;

    const items: SavedItem[] = JSON.parse(localStorage.getItem('tnpsc_frnd_saved_items') || '[]');
    const combinedContent = language === 'TN' 
      ? `வினா:\n${questionText}\n\nவிடை:\n${text}`
      : `QUESTION:\n${questionText}\n\nANSWER:\n${text}`;

    const newItem: SavedItem = {
      id: Date.now().toString(),
      type: 'chat',
      title: title,
      content: combinedContent,
      timestamp: Date.now()
    };
    
    items.unshift(newItem);
    localStorage.setItem('tnpsc_frnd_saved_items', JSON.stringify(items));
    setSavedIndices(prev => new Set(prev).add(index));
  };

  const clearChat = () => {
    const confirmMsg = language === 'TN' ? 'நிச்சயமாக இந்த உரையாடலை அழிக்க வேண்டுமா?' : 'Are you sure you want to clear the current chat history?';
    if (window.confirm(confirmMsg)) {
      setMessages([
        { 
          role: 'model', 
          text: language === 'TN' 
            ? 'வணக்கம்! நான் உங்கள் AI பயிற்றுவிப்பாளர். வரலாறு முதல் அலகு 9 வரை TNPSC பாடத்திட்டத்தின் எந்தவொரு தலைப்பைப் பற்றியும் நான் விளக்குவேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' 
            : 'Vanakkam! I am your AI Preceptor. I can explain complex TNPSC syllabus topics from History to Unit 9. How can I help you today?' 
        }
      ]);
      setSavedIndices(new Set());
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-120px)] md:h-[calc(100vh-160px)] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-[#003366] p-4 md:p-5 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#FFD700] flex items-center justify-center shadow-lg">
            <Sparkles className="text-[#003366]" size={24} />
          </div>
          <div>
            <h3 className={`font-bold transition-all ${
              language === 'TN' ? 'text-xs md:text-base' : 'text-sm md:text-lg'
            }`}>{s.aiPreceptor}</h3>
            <p className="text-[10px] md:text-xs text-blue-200 font-bold tracking-widest uppercase">{language === 'TN' ? 'தனிப்பட்ட பயிற்றுவிப்பாளர்' : 'Personal AI Tutor'}</p>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white" title={language === 'TN' ? 'அழிக்கவும்' : 'Clear Chat'}>
          <Trash2 size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[92%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#FFD700] text-[#003366]' : 'bg-[#003366] text-white'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="flex flex-col gap-2">
                <div className={`rounded-2xl leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' ? 'bg-[#003366] text-white rounded-tr-none shadow-[#003366]/10' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                } ${
                  language === 'TN' ? 'text-xs md:text-sm p-3 md:p-4' : 'text-sm md:text-base p-4 md:p-5'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text || (isTyping && i === messages.length - 1 ? (language === 'TN' ? "சிந்திக்கிறது..." : "Thinking...") : "")}</div>
                </div>
                {msg.role === 'model' && msg.text && (
                  <div className="flex items-center gap-4 ml-1">
                    <button onClick={() => copyToClipboard(msg.text, i)} className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 hover:text-[#003366] uppercase tracking-[0.15em] transition-colors">
                      {copiedIndex === i ? <><Check size={12} className="text-green-500" /> {language === 'TN' ? 'நகலெடுக்கப்பட்டது' : 'Copied'}</> : <><Copy size={12} /> {language === 'TN' ? 'நகலெடு' : 'Copy'}</>}
                    </button>
                    <button onClick={() => saveToKnowledgeBank(msg.text, i)} className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] transition-colors ${savedIndices.has(i) ? 'text-green-600' : 'text-slate-400 hover:text-[#003366]'}`}>
                      {savedIndices.has(i) ? <><Check size={12} /> {language === 'TN' ? 'சேமிக்கப்பட்டது' : 'Saved'}</> : <><Bookmark size={12} /> {language === 'TN' ? 'சேமி' : 'Save'}</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#003366] text-white flex items-center justify-center shadow-md shadow-[#003366]/20">
                <Bot size={18} />
              </div>
              <div className="p-4 bg-slate-100 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-3">
                <Loader2 size={18} className="animate-spin text-[#003366]" />
                <span className="text-[11px] font-black text-[#003366] uppercase tracking-[0.2em]">{language === 'TN' ? 'தகவல் சேகரிக்கிறது' : 'Thinking'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 shrink-0">
        <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-200 focus-within:ring-2 focus-within:ring-[#003366]/30 transition-all max-w-4xl mx-auto">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder={s.placeholderChat} 
            className={`flex-1 px-4 py-3 outline-none text-slate-700 bg-transparent transition-all ${
              language === 'TN' ? 'text-xs md:text-sm' : 'text-sm md:text-base'
            }`} 
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping} 
            className="bg-[#003366] text-white p-3 md:p-4 rounded-xl hover:bg-[#004080] transition-all disabled:opacity-50 shadow-lg active:scale-95"
          >
            <Send size={22} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
          <AlertCircle size={12} className="text-[#003366]" />
          <p className="text-[9px] md:text-[10px] text-center text-slate-500 uppercase font-black tracking-[0.25em]">
            {language === 'TN' ? 'Gemini 3 Flash மூலமாக' : 'Powered by Gemini-3 with Search'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPreceptor;
