
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
import StudyPlan from './components/StudyPlan.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import OfflineOverlay from './components/OfflineOverlay.tsx';
import InstallPrompt from './components/InstallPrompt.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'TN'>('TN');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Global view switcher for non-prop-passing components
    const handleSwitchView = (e: any) => {
      setView(e.detail);
    };
    window.addEventListener('switch-view', handleSwitchView);

    // Persistence of login for session
    const loginStatus = sessionStorage.getItem('tnpsc_officer_logged_in');
    if (loginStatus === 'true') {
      setIsOfficerLoggedIn(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('switch-view', handleSwitchView);
    };
  }, []);

  const handleOfficerLogin = () => {
    setIsOfficerLoggedIn(true);
    sessionStorage.setItem('tnpsc_officer_logged_in', 'true');
    setView('admin-dashboard');
  };

  const handleOfficerLogout = () => {
    setIsOfficerLoggedIn(false);
    sessionStorage.removeItem('tnpsc_officer_logged_in');
    setView('dashboard');
  };

  const handleSetView = (newView: AppView) => {
    // Redirect logic for officer dashboard
    if (newView === 'admin-dashboard' && !isOfficerLoggedIn) {
      setView('admin-login');
      return;
    }
    setView(newView);
    setIsSidebarOpen(false);
  };

  const checkConnectivity = () => {
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
      // Removed the invalid 'init-study-plan' case as it does not exist in the AppView union type.
      case 'study-plan': return <StudyPlan language={language} />;
      case 'admin-login': return <AdminLogin onLoginSuccess={handleOfficerLogin} setView={handleSetView} />;
      case 'admin-dashboard': return <AdminDashboard onLogout={handleOfficerLogout} />;
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

      <InstallPrompt language={language} />
    </div>
  );
};

export default App;
