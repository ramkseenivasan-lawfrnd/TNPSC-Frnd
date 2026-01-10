
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertCircle, Copy, Bookmark, Check, Trash2, X } from 'lucide-react';
import { streamExamChat, cleanMarkdown } from '../services/gemini.ts';
import { Message, SavedItem } from '../types.ts';
import { UI_STRINGS } from '../constants.ts';

interface ChatPreceptorProps {
  language: 'EN' | 'TN';
}

const ChatPreceptor: React.FC<ChatPreceptorProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  
  const getDefaultMessage = (lang: 'EN' | 'TN'): Message => ({
    role: 'model',
    text: lang === 'TN' 
      ? 'வணக்கம்! நான் உங்கள் AI பயிற்றுவிப்பாளர். TNPSC பாடத்திட்டத்தின் தலைப்புகளை நான் விளக்குவேன். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?' 
      : 'Vanakkam! I am your AI Preceptor. I can explain complex TNPSC syllabus topics. How can I help you today?'
  });

  // Lazy initializer to read from localStorage on the very first render
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('tnpsc_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return []; 
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to calculate words in an array of messages
  const calculateTotalWords = (msgs: Message[]) => {
    return msgs.reduce((total, msg) => {
      const words = msg.text.trim().split(/\s+/).filter(w => w.length > 0).length;
      return total + words;
    }, 0);
  };

  // Sync stats and local storage
  const syncStorageAndStats = (updatedMessages: Message[]) => {
    localStorage.setItem('tnpsc_chat_history', JSON.stringify(updatedMessages));
    
    // Recalculate word count based on CURRENT messages to satisfy the requirement
    // that deleted chats don't count towards usage stats.
    const totalWords = calculateTotalWords(updatedMessages);
    localStorage.setItem('tnpsc_words_chat', totalWords.toString());
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
  };

  // Ensure we always have at least the default message if the chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      const defaultMsg = [getDefaultMessage(language)];
      setMessages(defaultMsg);
      syncStorageAndStats(defaultMsg);
    }
  }, [messages.length, language]);

  // Sync language change for default message ONLY IF it's the only message in the list
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      const defaultCurrent = getDefaultMessage(language);
      if (messages[0].text !== defaultCurrent.text) {
        const newMsgs = [defaultCurrent];
        setMessages(newMsgs);
        syncStorageAndStats(newMsgs);
      }
    }
  }, [language]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsgText = input.trim();
    const userMsg: Message = { role: 'user', text: userMsgText };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);
    syncStorageAndStats(updatedMessages);

    try {
      const history = updatedMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const streamResponse = await streamExamChat(history);
      let fullText = '';
      
      // Placeholder for the incoming bot response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of streamResponse) {
        const text = chunk.text || '';
        fullText += text;
        const cleanedText = cleanMarkdown(fullText);
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1].text = cleanedText;
          }
          return updated;
        });
      }

      // Final sync once stream is done
      setMessages(prev => {
        syncStorageAndStats(prev);
        return prev;
      });

    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = language === 'TN' 
        ? "மன்னிக்கவும், தகவல் சேகரிப்பதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சி செய்யவும்."
        : "I encountered an error. This might be due to API limits or network issues. Please try again.";
      setMessages(prev => {
        const updated = [...prev, { role: 'model', text: errorMsg }];
        syncStorageAndStats(updated);
        return updated;
      });
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
    const confirmMsg = language === 'TN' ? 'அனைத்து அரட்டைகளையும் நிச்சயமாக அழிக்க வேண்டுமா?' : 'Permanently delete all chat history?';
    if (window.confirm(confirmMsg)) {
      localStorage.removeItem('tnpsc_chat_history');
      localStorage.setItem('tnpsc_words_chat', '0');
      const reset = [getDefaultMessage(language)];
      setMessages(reset);
      syncStorageAndStats(reset);
      setSavedIndices(new Set());
    }
  };

  const deleteMessage = (index: number) => {
    const updated = messages.filter((_, i) => i !== index);
    if (updated.length === 0) {
      setMessages([getDefaultMessage(language)]);
    } else {
      setMessages(updated);
      syncStorageAndStats(updated);
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
        <button 
          onClick={clearChat} 
          className="p-3 hover:bg-white/10 rounded-xl transition-all text-white/80 hover:text-white active:scale-90" 
          title={language === 'TN' ? 'அனைத்தையும் அழிக்க' : 'Delete All Chats'}
        >
          <Trash2 size={22} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar bg-slate-50/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group/row`}>
            <div className={`flex gap-3 max-w-[92%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-[#FFD700] text-[#003366]' : 'bg-[#003366] text-white'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative group">
                  <div className={`rounded-2xl leading-relaxed shadow-sm transition-all ${
                    msg.role === 'user' ? 'bg-[#003366] text-white rounded-tr-none shadow-[#003366]/10' : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  } ${
                    language === 'TN' ? 'text-xs md:text-sm p-3 md:p-4' : 'text-sm md:text-base p-4 md:p-5'
                  }`}>
                    <div className="whitespace-pre-wrap font-medium">{msg.text || (isTyping && i === messages.length - 1 ? (language === 'TN' ? "சிந்திக்கிறது..." : "Thinking...") : "")}</div>
                  </div>
                  
                  {/* Individual Delete Button */}
                  <button 
                    onClick={() => deleteMessage(i)}
                    className={`absolute top-0 ${msg.role === 'user' ? '-left-8' : '-right-8'} p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm`}
                    title={language === 'TN' ? 'நீக்கு' : 'Delete Message'}
                  >
                    <X size={14} />
                  </button>
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
              <div className="p-4 bg-white rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-3">
                <Loader2 size={18} className="animate-spin text-[#003366]" />
                <span className="text-[11px] font-black text-[#003366] uppercase tracking-[0.2em]">{language === 'TN' ? 'தகவல் சேகரிக்கிறது' : 'Thinking'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-slate-200 shrink-0">
        <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl shadow-inner border border-slate-200 focus-within:ring-2 focus-within:ring-[#003366]/30 transition-all max-w-4xl mx-auto">
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
