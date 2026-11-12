/**
 * Crash Bit | Aviator & Crash Flight Radar Matrix
 * Supported Platforms: 1xBet, MELBET, spinbetter
 * Universal Promo Code: MXG1
 */
import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { SplashScreen } from './components/SplashScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { CrashPredictor } from './components/CrashPredictor';
import { InfoModal } from './components/InfoModal';
import { ScreenState, PlatformType, Language } from './types';
import { sound } from './services/sound';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [language, setLanguage] = useState<Language>('ar');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('1xbet');
  const [userId, setUserId] = useState<string>('');
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // Sync document direction and font with language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Unlock audio on initial interaction
  useEffect(() => {
    const handleFirstClick = () => {
      sound.resume();
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    window.addEventListener('touchstart', handleFirstClick);
    return () => {
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
    };
  }, []);

  const handleSplashComplete = () => {
    setScreen('settings');
  };

  const handleVerificationComplete = (validatedUserId: string) => {
    setUserId(validatedUserId);
    setScreen('crash_game');
  };

  const handleBackToSettings = () => {
    setScreen('settings');
  };

  return (
    <div
      className={`min-h-screen bg-black text-white relative overflow-x-hidden ${
        language === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background Cyber Particles */}
      <ParticleBackground count={80} />

      {/* Splash Screen */}
      {screen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} language={language} />
      )}

      {/* Main Views Container */}
      <main
        className={`min-h-screen w-full relative z-10 transition-opacity duration-700 ${
          screen === 'splash' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {screen === 'settings' && (
          <SettingsScreen
            onComplete={handleVerificationComplete}
            selectedPlatform={selectedPlatform}
            onSelectPlatform={(plat) => setSelectedPlatform(plat)}
            language={language}
            onLanguageChange={(lang) => setLanguage(lang)}
            onOpenInfo={() => setIsInfoOpen(true)}
          />
        )}

        {screen === 'crash_game' && (
          <CrashPredictor
            onBack={handleBackToSettings}
            userId={userId}
            selectedPlatform={selectedPlatform}
            language={language}
          />
        )}
      </main>

      {/* Info & Disclaimer Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        language={language}
      />
    </div>
  );
}
