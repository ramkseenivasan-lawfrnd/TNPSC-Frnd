
import React, { useState, useRef } from 'react';
import { 
  FileQuestion, 
  Upload, 
  CheckCircle2, 
  Info, 
  BookOpen, 
  Loader2, 
  Bookmark, 
  Check, 
  FileText, 
  ImageIcon, 
  X, 
  HelpCircle,
  FileSearch,
  Zap,
  MousePointerClick
} from 'lucide-react';
import { getGeminiClient, cleanMarkdown } from '../services/gemini.ts';
import { SavedItem } from '../types.ts';
import { SYSTEM_INSTRUCTION, UI_STRINGS } from '../constants.ts';

interface PYQAnalyzerProps {
  language: 'EN' | 'TN';
}

const PYQAnalyzer: React.FC<PYQAnalyzerProps> = ({ language }) => {
  const s = UI_STRINGS[language];
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const updateWordCount = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const current = parseInt(localStorage.getItem('tnpsc_words_pyq') || '0', 10);
    localStorage.setItem('tnpsc_words_pyq', (current + wordCount).toString());
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert(language === 'TN' ? "கோப்பு 20MB-க்கும் அதிகமாக உள்ளது." : "File size exceeds 20MB limit.");
      return;
    }
    setFile(selectedFile);
    setReport(null);
    setIsSaved(false);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async (customPrompt?: string) => {
    const finalInput = customPrompt || input;
    if (!finalInput.trim() && !file) return;
    
    setIsAnalyzing(true);
    setIsSaved(false);
    setUploadProgress(10);

    // Track input words
    updateWordCount(finalInput);

    try {
      const ai = getGeminiClient();
      let prompt = "";
      let parts: any[] = [];

      if (file) {
        setUploadProgress(40);
        const base64Data = await fileToBase64(file);
        parts.push({ inlineData: { data: base64Data, mimeType: file.type } });

        prompt = `You are an expert TNPSC examiner. Analyze this document. User request: "${finalInput || 'Identify all questions, provide answers, and link to TNPSC syllabus unit.'}"`;
      } else {
        prompt = `Analyze this TNPSC question: "${finalInput}". Respond in ${language === 'TN' ? 'Tamil' : 'English'}. Include answer, unit, and study logic.`;
      }

      parts.push({ text: prompt });
      setUploadProgress(70);

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });

      setUploadProgress(100);
      const rawText = response.text || "";
      const cleanedResponse = cleanMarkdown(rawText);
      setReport(cleanedResponse);

      // Track AI output words
      updateWordCount(rawText);

    } catch (e) {
      console.error(e);
      alert("Analysis failed.");
    } finally {
      setTimeout(() => { setIsAnalyzing(false); setUploadProgress(0); }, 500);
    }
  };

  const suggestions = language === 'TN' 
    ? ["அனைத்து வினாக்களுக்கும் விடையளி", "கடினமான சொற்களைக் கண்டறி", "பாடத்திட்டத்துடன் ஒப்பிடு"]
    : ["Solve all questions", "Find difficult terms", "Link to syllabus"];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center">
        <h2 className={`font-black text-[#003366] font-scholarly transition-all ${language === 'TN' ? 'text-2xl' : 'text-3xl'}`}>
          {s.pyqAnalyzer}
        </h2>
        <p className={`text-slate-500 mt-2 ${language === 'TN' ? 'text-sm' : 'text-base'}`}>
          {language === 'TN' ? 'வினாத்தாள்களை எளிதாக ஆய்வு செய்து விடை காணுங்கள்.' : 'Transform question papers into smart study guides in seconds.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Upload */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 bg-[#003366] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">{language === 'TN' ? 'ஆதாரத்தை வழங்கவும்' : 'Provide Source'}</h3>
          </div>
          
          <div 
            onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 min-h-[220px] rounded-3xl border-3 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group
              ${dragActive ? 'border-[#FFD700] bg-[#FFD700]/5 scale-[1.02]' : 'border-slate-200 bg-white hover:border-[#003366]/30 hover:bg-slate-50'}
            `}
          >
            {file ? (
              <div className="space-y-4 w-full animate-in zoom-in-95">
                {filePreview ? (
                  <div className="relative mx-auto w-24 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <FileText size={32} />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-800 text-sm truncate max-w-[200px] mx-auto">{file.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); setFilePreview(null); }}
                  className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black hover:bg-red-50 hover:text-red-500 transition-all uppercase tracking-widest"
                >
                  {language === 'TN' ? 'மாற்றவும்' : 'Change File'}
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Upload size={28} />
                </div>
                <h4 className="font-bold text-slate-700 mb-1">{language === 'TN' ? 'கோப்பை இங்கே இழுக்கவும்' : 'Drop your file here'}</h4>
                <p className="text-xs text-slate-400 max-w-[180px] leading-relaxed">
                  {language === 'TN' ? 'அல்லது உங்கள் கணினியிலிருந்து தேர்ந்தெடுக்கவும் (PDF/Image)' : 'or click to browse from your device (PDF or Image)'}
                </p>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" accept="image/*,application/pdf" />
          </div>
        </div>

        {/* Step 2: Ask */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 bg-[#003366] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">{language === 'TN' ? 'கேள்வியைக் கேட்கவும்' : 'What should AI do?'}</h3>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'TN' ? "எ.கா: 'கேள்வி 5-ஐ விளக்கு' அல்லது 'முக்கியமான பாடங்களை பட்டியலிடு'..." : "e.g., 'Explain question 5' or 'List important topics found here'..."}
                className={`w-full h-full min-h-[140px] p-5 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-[#003366]/5 focus:border-[#003366]/30 outline-none resize-none transition-all text-slate-700 shadow-sm ${language === 'TN' ? 'text-sm' : 'text-base'}`}
              />
              <HelpCircle className="absolute top-4 right-4 text-slate-300" size={20} />
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{language === 'TN' ? 'விரைவு கட்டளைகள்' : 'Quick Actions'}</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setInput(sug); handleAnalyze(sug); }}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50 transition-all flex items-center gap-1.5"
                  >
                    <Zap size={12} className="text-amber-500" /> {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          onClick={() => handleAnalyze()}
          disabled={isAnalyzing || (!input.trim() && !file)}
          className="w-full md:w-auto min-w-[280px] bg-[#003366] text-white px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#004080] hover:shadow-2xl hover:shadow-[#003366]/20 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {isAnalyzing ? <Loader2 className="animate-spin" size={24} /> : <FileSearch size={24} />}
          <span className={language === 'TN' ? 'text-lg' : 'text-xl'}>{s.analyzeBtn}</span>
        </button>
        
        {isAnalyzing && (
          <div className="w-full max-w-sm space-y-2">
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#003366] h-full transition-all duration-500 ease-out" style={{ width: `${uploadProgress}%` }} />
             </div>
             <p className="text-[10px] font-black text-center text-slate-400 uppercase tracking-widest animate-pulse">
               {language === 'TN' ? 'AI ஆழ்ந்த பகுப்பாய்வு செய்கிறது' : 'AI is processing your document'}
             </p>
          </div>
        )}
      </div>

      {report && !isAnalyzing && (
        <div className="animate-in slide-in-from-top-6 duration-700 space-y-6">
          <div className="bg-white border-l-[12px] border-[#FFD700] p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-[#003366]">
                  <div className="p-2 bg-blue-50 rounded-lg"><BookOpen size={28} /></div>
                  <h3 className={`font-black font-scholarly transition-all ${language === 'TN' ? 'text-xl' : 'text-2xl'}`}>
                    {language === 'TN' ? 'பகுப்பாய்வு அறிக்கை' : 'Analysis Report'}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    const items: SavedItem[] = JSON.parse(localStorage.getItem('tnpsc_frnd_saved_items') || '[]');
                    items.unshift({ id: Date.now().toString(), type: 'pyq', title: file ? file.name : input.substring(0, 30), content: report, timestamp: Date.now() });
                    localStorage.setItem('tnpsc_frnd_saved_items', JSON.stringify(items));
                    setIsSaved(true);
                  }}
                  disabled={isSaved}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-sm uppercase tracking-widest ${isSaved ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {isSaved ? <><Check size={16} /> {language === 'TN' ? 'சேமிக்கப்பட்டது' : 'Saved'}</> : <><Bookmark size={16} /> {s.saveBtn}</>}
                </button>
             </div>
             
             <div className="prose prose-slate max-w-none">
               {report.split('\n').map((line: string, i: number) => {
                 const isHeader = line.toUpperCase() === line && line.trim().length > 3;
                 const isAnswer = line.toLowerCase().includes('answer') || line.toLowerCase().includes('பதில்') || line.toLowerCase().includes('விடை');
                 
                 return (
                   <div key={i} className={`
                     ${isHeader ? 'text-[#003366] font-black mt-6 mb-3 flex items-center gap-2' : 'text-slate-600 mb-2'}
                     ${isAnswer ? 'bg-green-50 border border-green-100 p-4 rounded-2xl my-4 text-green-800 font-bold' : ''}
                     ${language === 'TN' ? 'text-[15px]' : 'text-base'}
                   `}>
                     {isHeader && <MousePointerClick size={16} className="text-[#FFD700]" />}
                     {line}
                   </div>
                 );
               })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PYQAnalyzer;
