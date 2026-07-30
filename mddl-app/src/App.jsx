import React, { useState, useEffect } from 'react';
import { logUserAction } from './utils/logger';

// Placeholder imports for components we will build next
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import SearchExplorer from './components/SearchExplorer';
import Practice from './components/Practice';
import AITutor from './components/AITutor';
import CorpusManager from './components/CorpusManager';
import LabRoom from './components/LabRoom';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Shared state
  const [savedMWEs, setSavedMWEs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCorpus, setCustomCorpus] = useState([]);

  // Check if onboarding was already completed in a previous session
  useEffect(() => {
    const onboarded = localStorage.getItem('mddl_onboarded');
    if (onboarded) {
      setHasCompletedOnboarding(true);
      setCurrentScreen('home');
    }
  }, []);

  const navigate = (screen) => {
    logUserAction('NAVIGATE', { from: currentScreen, to: screen });
    setCurrentScreen(screen);
  };

  const handleFinishOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('mddl_onboarded', 'true');
    navigate('home');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate('search');
  };

  const handleSaveMWE = (mweData) => {
    if (!savedMWEs.some(item => item.id === mweData.id)) {
      setSavedMWEs(prev => [...prev, mweData]);
      logUserAction('SAVE_MWE', { mwe: mweData.mwe });
    }
  };

  const handleCorpusLoaded = (corpusData) => {
    setCustomCorpus(corpusData);
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface text-on-surface">
      {currentScreen === 'onboarding' && <Onboarding onFinish={handleFinishOnboarding} />}
      {currentScreen === 'home' && <Home onNavigate={navigate} onSearch={handleSearch} />}
      {currentScreen === 'search' && (
        <SearchExplorer 
          initialQuery={searchQuery} 
          onNavigate={navigate} 
          onSave={handleSaveMWE}
          savedMWEs={savedMWEs}
          customCorpus={customCorpus}
        />
      )}
      {currentScreen === 'practice' && (
        <Practice 
          onNavigate={navigate} 
          savedMWEs={savedMWEs} 
        />
      )}
      {currentScreen === 'ai_tutor' && (
        <AITutor onNavigate={navigate} />
      )}
      {currentScreen === 'corpus-manager' && (
        <CorpusManager
          onNavigate={navigate}
          onCorpusLoaded={handleCorpusLoaded}
          customCorpus={customCorpus}
        />
      )}
      {currentScreen === 'lab_room' && (
        <LabRoom onNavigate={navigate} />
      )}
    </div>
  );
}

export default App;
