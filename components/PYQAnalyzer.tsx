
import React, { useState, useRef } from 'react';
import { FileQuestion, Upload, CheckCircle2, Info, BookOpen, Loader2, Bookmark, Check, FileText, ImageIcon, AlertCircle, X, HelpCircle } from 'lucide-react';
import { getGeminiClient } from '../services/gemini.ts';
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
  
  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        const errorMsg = language === 'TN' ? "கோப்பு 20MB-க்கும் அதிகமாக உள்ளது." : "File size exceeds 20MB limit.";
        alert(errorMsg);
        return;
      }
      setFile(selectedFile);
      setReport(null);
      setIsSaved(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!input.trim() && !file) return;
    
    setIsAnalyzing(true);
    setIsSaved(false);
    setUploadProgress(10);

    try {
      const ai = getGeminiClient();
      let prompt = "";
      let parts: any[] = [];

      if (file) {
        setUploadProgress(30);
        const base64Data = await fileToBase64(file);
        setUploadProgress(50);
        
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        });

        if (input.trim()) {
          prompt = `You are an expert TNPSC examiner. Analyze the attached document based on this specific user request: "${input}". 
          Ensure responses match the language of the request.
          For any questions you answer:
          - Provide the correct answer.
          - Explain the logic/facts behind it.
          - Identify the specific TNPSC Syllabus Unit.
          Maintain high precision and focus on the Tamil Nadu context.`;
        } else {
          prompt = `Analyze this TNPSC document/image. 
          Respond in ${language === 'TN' ? 'Tamil' : 'English'}.
          1. Identify and extract up to 10 questions.
          2. For each question:
             - Provide the full text of the question.
             - Provide the correct answer.
             - Explain the logic/facts behind it.
             - Identify the specific TNPSC Syllabus Unit.
          3. Format each question clearly with numbers and use bold headings for readability.`;
        }
      } else {
        prompt = `Analyze this TNPSC Previous Year Question: "${input}". 
        Respond in ${language === 'TN' ? 'Tamil' : 'English'}.
        1. Provide the correct answer clearly.
        2. Explain the logic/facts behind it.
        3. Identify which specific TNPSC Syllabus Unit it belongs to.
        4. Suggest a related concept to study.`;
      }

      parts.push({ text: prompt });
      setUploadProgress(70);

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      setUploadProgress(100);
      setReport(response.text || "No analysis generated.");
    } catch (e) {
      console.error(e);
      alert("Analysis failed. Please try again.");
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const saveResult = () => {
    if (!report) return;
    const items: SavedItem[] = JSON.parse(localStorage.getItem('tnpsc_frnd_saved_items') || '[]');
    const title = file ? `Document Analysis: ${file.name}` : (input.length > 50 ? input.substring(0, 50) + '...' : input);
    
    const newItem: SavedItem = {
      id: Date.now().toString(),
      type: 'pyq',
      title: title,
      content: report,
      timestamp: Date.now()
    };
    items.unshift(newItem);
    localStorage.setItem('tnpsc_frnd_saved_items', JSON.stringify(items));
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className={`font-bold text-[#003366] font-scholarly transition-all ${
          language === 'TN' ? 'text-xl' : 'text-2xl'
        }`}>{s.pyqAnalyzer}</h2>
        <p className={`text-slate-500 mt-2 transition-all ${
          language === 'TN' ? 'text-xs' : 'text-sm md:text-base'
        }`}>{language === 'TN' ? 'வினாத்தாள்களை பதிவேற்றி AI மூலம் விடைகளை பெறவும்.' : 'Upload papers and ask the AI for specific answers.'}</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 shadow-sm">
        <Info size={20} className="text-blue-600 mt-0.5 shrink-0" />
        <div className={`transition-all ${language === 'TN' ? 'text-xs' : 'text-sm'} text-blue-800`}>
          <p className="font-bold mb-1 uppercase tracking-wider">{s.instructions}:</p>
          <ul className="list-disc list-inside space-y-1 opacity-90">
            {s.pyqInstructions.map((ins, i) => <li key={i}>{ins}</li>)}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#003366]">
            <FileQuestion size={24} />
            <h3 className={`font-bold transition-all ${
              language === 'TN' ? 'text-base' : 'text-lg'
            }`}>{file ? s.instructions : (language === 'TN' ? 'வினாவைப் பதிவிடவும்' : 'Input Question')}</h3>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={file 
              ? (language === 'TN' ? 'எ.கா: "1 முதல் 10 வரை விடையளி"' : "e.g., 'Solve questions 1 to 10'") 
              : s.placeholderChat}
            className={`w-full h-32 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:bg-white outline-none resize-none transition-all text-slate-700 ${
              language === 'TN' ? 'text-sm' : 'text-base'
            }`}
          />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {!file ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200"
                >
                  <Upload size={18} />
                  {language === 'TN' ? 'பதிவேற்றவும்' : 'Upload File'}
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-[#003366]/5 border border-[#003366]/20 px-3 py-2 rounded-lg">
                  {file.type.includes('pdf') ? <FileText size={18} className="text-red-500" /> : <ImageIcon size={18} className="text-blue-500" />}
                  <span className="text-[11px] font-bold text-slate-700 truncate max-w-[150px]">{file.name}</span>
                  <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,application/pdf"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!input.trim() && !file)}
              className="w-full md:w-auto bg-[#003366] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#004080] transition-all shadow-md disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
              <span className={language === 'TN' ? 'text-sm' : ''}>{s.analyzeBtn}</span>
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>{uploadProgress < 100 ? (language === 'TN' ? 'பகுப்பாய்வு செய்கிறது...' : 'Analyzing...') : 'Complete'}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#003366] h-full transition-all duration-500 ease-out" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {report && !isAnalyzing && (
        <div className="animate-in slide-in-from-top-4 duration-500 space-y-6">
          <div className="bg-white border-l-8 border-[#FFD700] p-6 md:p-8 rounded-2xl shadow-lg">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#003366]">
                  <BookOpen size={24} />
                  <h3 className={`font-bold font-scholarly transition-all ${
                    language === 'TN' ? 'text-lg' : 'text-xl'
                  }`}>{language === 'TN' ? 'பகுப்பாய்வு முடிவுகள்' : 'Analysis Results'}</h3>
                </div>
                <button 
                  onClick={saveResult}
                  disabled={isSaved}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-sm font-bold transition-all shadow-sm ${
                    isSaved ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSaved ? <><Check size={16} /> {language === 'TN' ? 'சேமிக்கப்பட்டது' : 'Saved'}</> : <><Bookmark size={16} /> {s.saveBtn}</>}
                </button>
             </div>
             <div className="prose prose-slate max-w-none">
               {report.split('\n').map((line: string, i: number) => {
                 const isAnswer = line.toLowerCase().includes('answer') || line.toLowerCase().includes('பதில்') || line.toLowerCase().includes('விடை');
                 if (isAnswer) {
                    return <div key={i} className={`bg-green-50 text-green-800 p-4 rounded-lg font-bold my-4 border border-green-200 ${language === 'TN' ? 'text-sm' : ''}`}>{line}</div>;
                 }
                 return <p key={i} className={`text-slate-700 leading-relaxed mb-4 ${language === 'TN' ? 'text-sm' : ''}`}>{line}</p>;
               })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PYQAnalyzer;
