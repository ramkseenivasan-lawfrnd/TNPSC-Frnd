
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Save, 
  X, 
  Target, 
  Layers, 
  CalendarDays,
  Info,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { StudyTask } from '../types.ts';

interface StudyPlanProps {
  language: 'EN' | 'TN';
}

const StudyPlan: React.FC<StudyPlanProps> = ({ language }) => {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [exam, setExam] = useState('');
  const [unit, setUnit] = useState('');
  const [topic, setTopic] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tnpsc_study_plan');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const saveTasks = (updated: StudyTask[]) => {
    setTasks(updated);
    localStorage.setItem('tnpsc_study_plan', JSON.stringify(updated));
    // Trigger storage event for dashboard sync if needed, though dashboard uses polling/intervals
    window.dispatchEvent(new Event('storage'));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exam || !unit || !topic) return;

    if (editingId) {
      const updated = tasks.map(t => 
        t.id === editingId ? { ...t, exam, unit, topic } : t
      );
      saveTasks(updated);
      setEditingId(null);
    } else {
      const newTask: StudyTask = {
        id: Date.now().toString(),
        exam,
        unit,
        topic,
        isCompleted: false,
        createdAt: Date.now()
      };
      saveTasks([newTask, ...tasks]);
    }

    setExam('');
    setUnit('');
    setTopic('');
  };

  const toggleComplete = (id: string) => {
    const updated = tasks.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    // Ensuring the delete logic is solid
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const confirmMsg = language === 'TN' ? 'முடிக்கப்பட்ட அனைத்து பணிகளையும் நீக்கவா?' : 'Remove all completed tasks?';
    if (window.confirm(confirmMsg)) {
      saveTasks(tasks.filter(t => !t.isCompleted));
    }
  };

  const startEdit = (task: StudyTask) => {
    setExam(task.exam);
    setUnit(task.unit);
    setTopic(task.topic);
    setEditingId(task.id);
  };

  const exams = ['Group 1', 'Group 2', 'Group 2A', 'Group 4', 'VAO', 'Group 5A'];
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-black text-[#003366] font-scholarly">
          {language === 'TN' ? 'படிப்புத் திட்டம்' : 'Aspirant Study Plan'}
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          {language === 'TN' ? 'உங்கள் தினசரி தயாரிப்பை இங்கே திட்டமிடுங்கள்.' : 'Build your personalized roadmap to success.'}
        </p>
      </div>

      {/* Visual Progress & Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#003366] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
          <Zap size={150} className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-blue-200">Current Progress</h3>
               <span className="text-3xl font-black text-[#FFD700]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-[#FFD700] h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)]" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-blue-200">
              <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> {completedCount} Done</div>
              <div className="flex items-center gap-1.5"><Circle size={14} className="text-white/40" /> {tasks.length - completedCount} Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-lg flex flex-col justify-center gap-4">
           <div className="flex items-center gap-2 mb-2">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><HelpCircle size={20} /></div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aspirant Guide</h4>
           </div>
           <ul className="space-y-3">
             <li className="flex gap-2 text-[11px] font-bold text-slate-600 leading-relaxed">
               <span className="text-[#FFD700]">•</span> 
               {language === 'TN' ? 'வட்டத்தைக் கிளிக் செய்து ஒரு பாடத்தை "முடிந்தது" எனக் குறிக்கவும்.' : 'Click the circle to mark a topic as "Completed".'}
             </li>
             <li className="flex gap-2 text-[11px] font-bold text-slate-600 leading-relaxed">
               <span className="text-[#FFD700]">•</span> 
               {language === 'TN' ? 'முடிக்கப்பட்ட பணிகளை "Clear Completed" மூலம் நீக்கலாம்.' : 'Use "Clear Completed" to clean up finished tasks.'}
             </li>
           </ul>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 relative">
        {editingId && <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD700] rounded-t-full"></div>}
        <form onSubmit={addTask} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {language === 'TN' ? 'தேர்வு' : 'Target Exam'}
              </label>
              <select 
                value={exam} 
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                required
              >
                <option value="">{language === 'TN' ? 'தேர்வைத் தேர்ந்தெடுக்கவும்' : 'Select Exam'}</option>
                {exams.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {language === 'TN' ? 'அலகு' : 'Unit (1-10)'}
              </label>
              <input 
                value={unit} 
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., Unit 8"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {language === 'TN' ? 'தலைப்பு' : 'Specific Topic'}
              </label>
              <input 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Sangam Literature"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-[#003366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#004080] transition-all shadow-lg active:scale-95"
            >
              {editingId ? <Save size={20} /> : <Plus size={20} />}
              {editingId 
                ? (language === 'TN' ? 'திட்டத்தைப் புதுப்பி' : 'Update Task') 
                : (language === 'TN' ? 'புதிய திட்டம் சேர்' : 'Add New Task')}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setExam(''); setUnit(''); setTopic(''); }}
                className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                {language === 'TN' ? 'இரத்து செய்' : 'Cancel'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Task List Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
          {language === 'TN' ? `உங்கள் பணிகள் (${tasks.length})` : `Your Tasks (${tasks.length})`}
        </h3>
        {tasks.some(t => t.isCompleted) && (
          <button 
            onClick={clearCompleted}
            className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-1.5 transition-colors"
          >
            <Trash2 size={12} /> {language === 'TN' ? 'முடிக்கப்பட்டவைகளை நீக்கு' : 'Clear Completed'}
          </button>
        )}
      </div>

      {/* Task List Content */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-white p-6 rounded-[2rem] border transition-all shadow-sm flex items-center justify-between group ${
              task.isCompleted ? 'border-green-100 bg-slate-50/50 opacity-70' : 'border-slate-200 hover:border-[#003366]/20'
            }`}
          >
            <div className="flex items-center gap-5 flex-1 min-w-0">
              <button 
                onClick={() => toggleComplete(task.id)}
                className={`p-3 rounded-2xl transition-all shadow-inner ${
                  task.isCompleted ? 'bg-green-500 text-white rotate-[360deg]' : 'bg-slate-100 text-slate-300 hover:bg-[#003366] hover:text-white'
                }`}
                title={task.isCompleted ? "Mark Pending" : "Mark Completed"}
              >
                {task.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${task.isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}`}>{task.exam}</span>
                  <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">{task.unit}</span>
                  {task.isCompleted && (
                    <span className="text-[8px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={10} /> DONE
                    </span>
                  )}
                </div>
                <h4 className={`text-lg font-bold text-[#003366] truncate transition-all ${task.isCompleted ? 'line-through decoration-green-500/50' : ''}`}>
                  {task.topic}
                </h4>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => startEdit(task)}
                className="p-3 text-slate-400 hover:text-[#003366] hover:bg-blue-50 rounded-xl transition-all"
                title="Edit Task"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => deleteTask(task.id)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Delete Task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="p-24 text-center flex flex-col items-center bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-slate-200 mb-6">
               <CalendarDays size={40} />
            </div>
            <p className="text-slate-500 font-bold max-w-xs leading-relaxed">
              {language === 'TN' ? 'இன்னும் திட்டங்கள் ஏதுமில்லை. உங்கள் அரசுப்பணி பயணத்தைத் தொடங்க ஒரு புதிய திட்டத்தைச் சேர்க்கவும்.' : 'No study tasks yet. Add a new task above to start your journey!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
