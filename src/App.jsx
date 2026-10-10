import { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { Toaster } from 'react-hot-toast';
import FakeWarningToast from './components/ui/FakeWarningToast';
import ErrorBoundary from './components/ui/ErrorBoundary';

import SplashScreen from './components/screens/SplashScreen';
import CityRevealScreen from './components/screens/CityRevealScreen';
import WarningScreen from './components/screens/WarningScreen';
import AllocationScreen from './components/screens/AllocationScreen';
import OutcomeScreen from './components/screens/OutcomeScreen';
import FinalScoreScreen from './components/screens/FinalScoreScreen';
import LeaderboardScreen from './components/screens/LeaderboardScreen';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('SplashScreen');

  return (
    <>
      <FakeWarningToast />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(5, 15, 29, 0.95)',
            color: '#b8e1fc',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '12px',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)',
          },
        }}
      />
      
      {currentScreen === 'SplashScreen' && <SplashScreen onNext={() => setCurrentScreen('CityRevealScreen')} />}
      {currentScreen === 'CityRevealScreen' && <CityRevealScreen onNext={() => setCurrentScreen('WarningScreen')} />}
      {currentScreen === 'WarningScreen' && <WarningScreen onNext={() => setCurrentScreen('AllocationScreen')} />}
      {currentScreen === 'AllocationScreen' && <AllocationScreen onNext={() => setCurrentScreen('OutcomeScreen')} />}
      {currentScreen === 'OutcomeScreen' && <OutcomeScreen onNext={(next) => setCurrentScreen(next)} />}
      {currentScreen === 'FinalScoreScreen' && <FinalScoreScreen onNext={() => setCurrentScreen('LeaderboardScreen')} />}
      {currentScreen === 'LeaderboardScreen' && <LeaderboardScreen onNext={() => setCurrentScreen('SplashScreen')} />}
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </ErrorBoundary>
  );
}
