
import React, { useState, useEffect } from 'react';
import { AppView } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import CurrentAffairs from './components/CurrentAffairs.tsx';
import ChatPreceptor from './components/ChatPreceptor.tsx';
import PYQAnalyzer from './components/PYQAnalyzer.tsx';
import ExamPredictor from './components/ExamPredictor.tsx';
import SavedAnswers from './components/SavedAnswers.tsx';
import ExamStructure from './components/ExamStructure.tsx';
import ExamSyllabus from './components/ExamSyllabus.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import OfflineOverlay from './components/OfflineOverlay.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'TN'>('TN');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSetView = (newView: AppView) => {
    setView(newView);
    setIsSidebarOpen(false);
  };

  const checkConnectivity = () => {
    // Basic connectivity check
    setIsOnline(navigator.onLine);
  };

  const renderView = () => {
    const onlineOnlyViews: AppView[] = ['chat', 'current-affairs', 'pyq', 'predictor'];
    
    if (!isOnline && onlineOnlyViews.includes(view)) {
      return <OfflineOverlay language={language} setView={handleSetView} onRetry={checkConnectivity} />;
    }

    switch (view) {
      case 'dashboard': return <Dashboard setView={setView} language={language} setLanguage={setLanguage} />;
      case 'current-affairs': return <CurrentAffairs language={language} />;
      case 'chat': return <ChatPreceptor language={language} />;
      case 'pyq': return <PYQAnalyzer language={language} />;
      case 'predictor': return <ExamPredictor language={language} />;
      case 'saved-answers': return <SavedAnswers language={language} />;
      case 'exams': return <ExamStructure language={language} />;
      case 'syllabus': return <ExamSyllabus language={language} />;
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
