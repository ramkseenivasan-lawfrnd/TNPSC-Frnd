
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
import ContactUs from './components/ContactUs.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import OfflineOverlay from './components/OfflineOverlay.tsx';
import Onboarding from './components/Onboarding.tsx';
import LandingPage from './components/LandingPage.tsx';
import InstallPrompt from './components/InstallPrompt.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'TN'>('TN');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // Check first-time setup
    const isSetupComplete = localStorage.getItem('tnpsc_setup_complete');
    if (!isSetupComplete) {
      setShowLanding(true);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA Install Event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleSwitchView = (e: any) => {
      setView(e.detail);
    };
    window.addEventListener('switch-view', handleSwitchView);

    const loginStatus = sessionStorage.getItem('tnpsc_officer_logged_in');
    if (loginStatus === 'true') {
      setIsOfficerLoggedIn(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('switch-view', handleSwitchView);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  const handleStartOnboarding = () => {
    setShowLanding(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (userName: string) => {
    localStorage.setItem('tnpsc_user_name', userName);
    localStorage.setItem('tnpsc_setup_complete', 'true');
    setShowOnboarding(false);
  };

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
      case 'study-plan': return <StudyPlan language={language} />;
      case 'admin-login': return <AdminLogin onLoginSuccess={handleOfficerLogin} setView={handleSetView} />;
      case 'admin-dashboard': return <AdminDashboard onLogout={handleOfficerLogout} />;
      case 'contact': return <ContactUs language={language} />;
      default: return <Dashboard setView={setView} language={language} setLanguage={setLanguage} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 relative">
      {showLanding && (
        <LandingPage language={language} onStart={handleStartOnboarding} />
      )}
      
      {showOnboarding && (
        <Onboarding 
          language={language} 
          onComplete={handleOnboardingComplete} 
        />
      )}
      
      <InstallPrompt 
        language={language} 
        onInstall={handleInstall} 
        canInstall={showInstallBtn} 
      />
      
      <Sidebar 
        currentView={view} 
        setView={handleSetView} 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        language={language}
        onInstall={handleInstall}
        canInstall={showInstallBtn}
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

        <div className="px-4 py-2 sm:px-6 lg:px-8 bg-white border-t border-slate-100 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Ads</span>
            </div>
            <div 
              id="container-e11c6c3115d78d5625791ad00fd6ebc1" 
              className="w-full aspect-[4/1] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center text-slate-100 text-[8px] font-black uppercase tracking-[0.3em] border border-slate-100 shadow-sm"
            >
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
