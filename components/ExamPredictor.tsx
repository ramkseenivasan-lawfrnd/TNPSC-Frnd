
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Loader2, 
  Bookmark, 
  Check, 
  X, 
  Zap, 
  Sparkles, 
  Printer, 
  ShieldCheck, 
  Eye,
  Clock,
  Download
} from 'lucide-react';
import { getGeminiClient, cleanMarkdown } from '../services/gemini.ts';
import { SavedItem } from '../types.ts';
import { UI_STRINGS, PREDICTOR_SYSTEM_INSTRUCTION } from '../constants.ts';

interface ExamPredictorProps { language: 'EN' | 'TN'; }

const ExamPredictor: React.FC<ExamPredictorProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = language === 'TN' 
    ? [`தரவுகளைப் பகுப்பாய்வு செய்கிறது...`, `கொள்கைகளைத் தேடுகிறது (${currentYear})...`, "வினாத்தாள் முறையைக் கணிக்கிறது...", "100 வினாக்களை உருவாக்குகிறது..."]
    : ["Analyzing data...", `Fetching ${currentYear} Policies...`, "Predicting patterns...", "Generating 100 Items..."];

  useEffect(() => {
    let timer: number;
    if (isProcessing && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isProcessing, timeLeft]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 5) return alert("Max 5 files.");
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (err) => reject(err);
    });
  };

  const runPrediction = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setPrediction(null);
    setIsSaved(false);
    setStep(0);
    setTimeLeft(180);

    try {
      const ai = getGeminiClient();
      const parts: any[] = [];
      for (const file of files) {
        const base64 = await fileToBase64(file);
        parts.push({ inlineData: { data: base64, mimeType: file.type } });
      }

      setStep(1);
      const prompt = `STRICT REQUIREMENT: GENERATE EXACTLY 100 PREDICTED QUESTIONS FOR THE ${currentYear} TNPSC EXAM CYCLE.
      
      ATOMIC FORMAT (ONE LINE PER QUESTION):
      [Number]. Q: [English Question] / வி: [Tamil Question] | Ans: [Short Answer]
      
      RULES:
      1. NO MARKDOWN (no **, no ##).
      2. Keep questions concise to ensure all 100 fit.
      3. Categorize into: UNIT 8/9 (30), GS (50), CA ${currentYear} (20).
      4. DO NOT STOP until question #100.`;

      parts.push({ text: prompt });
      setStep(2);

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: { 
          systemInstruction: PREDICTOR_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 30000 },
          // Removed maxOutputTokens to prevent conflicts with thinkingBudget
          temperature: 0.1
        },
      });

      setStep(3);
      setPrediction(cleanMarkdown(response.text || ""));
    } catch (e) {
      console.error(e);
      alert("AI Generation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * NEW ISOLATED PRINT STRATEGY
   * Opens a new window, clones the content, and injects clean styles.
   */
  const handlePrintAsPDF = () => {
    if (!prediction) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert("Please allow pop-ups to export PDF.");

    // Format the lines for the print window
    const lines = prediction.split('\n').filter(l => l.trim()).map(line => {
      const isHeading = line === line.toUpperCase() && line.length > 5;
      if (isHeading) return `<h2 class="text-[#003366] font-black text-xl mt-10 mb-4 border-b-2 border-slate-200 pb-2 uppercase">${line}</h2>`;
      return `<div class="mb-4 p-4 border border-slate-100 rounded-lg text-slate-700 leading-relaxed break-inside-avoid">
                <p class="text-sm font-medium">${line}</p>
              </div>`;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TNPSC_Predictor_${currentYear}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; background: white; }
            h1, h2 { font-family: 'Merriweather', serif; }
            @page { size: A4; margin: 20mm; }
            .break-inside-avoid { page-break-inside: avoid; break-inside: avoid; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body onload="window.print();">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12 pb-8 border-b-4 border-[#003366]">
              <h1 class="text-3xl font-black text-[#003366] uppercase tracking-tight">TNPSC_Frnd Prediction Report</h1>
              <p class="text-xl font-bold text-slate-500 mt-2">${currentYear} High-Probability Questions (100 Items)</p>
              <div class="mt-4 flex justify-center gap-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <span>Analysis: AI Trend Extraction</span>
                <span>Date: ${new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div class="space-y-2">${lines}</div>
            <div class="mt-20 pt-8 border-t border-slate-100 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
              Official Preparation Guide - TNPSC_Frnd
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Search/Upload Interface */}
      <div className="text-center animate-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 text-[#003366] rounded-2xl mb-4 border border-[#FFD700]/30">
          <Sparkles size={16} className="text-amber-500" />
          <span className="text-xs font-black uppercase tracking-widest">Future Predictor {currentYear}</span>
        </div>
        <h2 className="text-3xl font-black text-[#003366] font-scholarly leading-tight">Predict 100 Exam Questions</h2>
        <p className="text-slate-500 mt-2 font-medium">Analyze history against latest policies for exactly 100 high-probability items.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 md:p-12 space-y-8">
        <div className="space-y-4">
           <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Upload PYQ References (Optional)</h4>
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group"
           >
             <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
               <Upload size={32} />
             </div>
             <p className="font-bold text-slate-700">Add Question Papers (PDF)</p>
             <input type="file" multiple accept="application/pdf" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
           </div>

           {files.length > 0 && (
             <div className="flex flex-wrap gap-2">
               {files.length > 0 && files.map((f, i) => (
                 <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
                   <FileText size={14} /> <span className="truncate max-w-[100px]">{f.name}</span>
                   <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}><X size={14} /></button>
                 </div>
               ))}
             </div>
           )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={runPrediction}
            disabled={isProcessing}
            className="w-full md:w-auto min-w-[320px] bg-[#003366] text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-[#004080] transition-all disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
            Generate 100 Predicted Items
          </button>
          {isProcessing && (
            <div className="w-full max-w-sm space-y-3">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#003366] h-full transition-all duration-1000" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
              </div>
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">{steps[step]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Card */}
      {prediction && !isProcessing && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden animate-in">
          <div className="bg-[#003366] p-8 flex items-center justify-between">
             <div className="flex items-center gap-4 text-white">
                <div className="p-3 bg-[#FFD700] rounded-2xl text-[#003366] shadow-lg"><ShieldCheck size={32} /></div>
                <div>
                  <h3 className="text-2xl font-black font-scholarly leading-tight">100 Future Questions {currentYear}</h3>
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">AI EXAM ANALYTICS REPORT</p>
                </div>
             </div>
             <div className="flex gap-3">
                <button 
                  onClick={handlePrintAsPDF}
                  className="flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-[#003366] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-lg active:scale-95"
                >
                  <Printer size={20} /> Export Report (PDF)
                </button>
             </div>
          </div>

          <div className="p-8 md:p-12 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {prediction.split('\n').filter(l => l.trim()).map((line, i) => {
              const isHeading = line === line.toUpperCase() && line.length > 5;
              return (
                <div key={i} className={`p-4 rounded-2xl border ${isHeading ? 'bg-[#003366]/5 border-slate-200 text-[#003366] font-black mt-6' : 'bg-white border-slate-100 text-slate-700'}`}>
                  {line}
                </div>
              );
            })}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
               <Eye size={14} /> AI Analysis Complete for {currentYear} Cycle
             </div>
             <button onClick={handlePrintAsPDF} className="flex items-center gap-2 text-[#003366] font-black text-xs uppercase tracking-widest hover:underline">
               Download Full Report <Download size={14} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPredictor;
