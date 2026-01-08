
import React, { useState } from 'react';
import { AppView } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import CurrentAffairs from './components/CurrentAffairs.tsx';
import ChatPreceptor from './components/ChatPreceptor.tsx';
import PYQAnalyzer from './components/PYQAnalyzer.tsx';
import ExamPredictor from './components/ExamPredictor.tsx';
import SavedAnswers from './components/SavedAnswers.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed on mobile
  const [language, setLanguage] = useState<'EN' | 'TN'>('TN'); // Default to Tamil (TN)

  const handleSetView = (newView: AppView) => {
    setView(newView);
    setIsSidebarOpen(false); // Auto-close sidebar on mobile after navigation
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard setView={setView} language={language} setLanguage={setLanguage} />;
      case 'current-affairs': return <CurrentAffairs language={language} />;
      case 'chat': return <ChatPreceptor language={language} />;
      case 'pyq': return <PYQAnalyzer language={language} />;
      case 'predictor': return <ExamPredictor language={language} />;
      case 'saved-answers': return <SavedAnswers language={language} />;
      default: return <Dashboard setView={setView} language={language} setLanguage={setLanguage} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 relative">
      <Sidebar 
        currentView={view} 
        setView={handleSetView} 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        language={language}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        <Header 
          viewId={view}
          language={language}
          setLanguage={setLanguage}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
